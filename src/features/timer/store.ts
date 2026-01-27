import { create } from 'zustand';
import { initDB } from '../../lib/db';
import { TimerMode } from './types';
import { useDashboardStore } from '../dashboard/store';

interface TimerState {
  timeLeft: number;
  initialDuration: number;
  status: 'idle' | 'running' | 'paused';
  mode: TimerMode;
  activeTodoId: string | null;

  setMode: (mode: TimerMode) => void;
  setTodoId: (id: string | null) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  completeSession: () => Promise<void>;
}

const DURATIONS = {
  'focus': 25,
  'short-break': 5,
  'long-break': 15
};

export const useTimerStore = create<TimerState>((set, get) => ({
  timeLeft: 25 * 60, 
  initialDuration: 25 * 60,
  status: 'idle',
  mode: 'focus',
  activeTodoId: null,

  setMode: (mode) => {
    if (get().status === 'running') return; 

    const durationInSeconds = DURATIONS[mode] * 60;
    set({ 
      mode, 
      timeLeft: durationInSeconds, 
      initialDuration: durationInSeconds,
      status: 'idle' 
    });
  },

  setTodoId: (id) => set({ activeTodoId: id }),
  start: () => set({ status: 'running' }),
  pause: () => set({ status: 'paused' }),
  
  reset: () => {
    const { initialDuration } = get();
    set({ timeLeft: initialDuration, status: 'idle' });
  },

  tick: () => {
    const { timeLeft, status } = get();

    if (status !== 'running') return;

    if (timeLeft > 0) {
      set({ timeLeft: timeLeft - 1 });
    } else {
      // Waktu habis: Stop timer dulu biar UI update instan
      set({ status: 'idle', timeLeft: 0 });
      get().completeSession();
    }
  },


  completeSession: async () => {
    const { mode, initialDuration, activeTodoId } = get();
    const durationMinutes = Math.floor(initialDuration / 60);
    const startedAt = new Date(Date.now() - initialDuration * 1000).toISOString();
    const endedAt = new Date().toISOString();

    try {
      const db = await initDB();
      await db.execute(
        `INSERT INTO sessions (id, todo_id, duration, started_at, ended_at, completed) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [crypto.randomUUID(), activeTodoId, durationMinutes, startedAt, endedAt, true]
      );
      console.log(`✅ Session Saved: ${mode}`);
      useDashboardStore.getState().loadStats();
    } catch (err) {
      console.error("❌ Failed to save session:", err);
    }
  },
}));