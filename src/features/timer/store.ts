import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initDB } from '../../lib/db';
import { TimerMode } from './types';
import { useDashboardStore } from '../dashboard/store';
import { sendNotification, isPermissionGranted, requestPermission } from '@tauri-apps/plugin-notification';

interface TimerState {
  timeLeft: number;
  initialDuration: number;
  status: 'idle' | 'running' | 'paused';
  mode: TimerMode;
  activeTodoId: string | null;
  endTime: number | null;
  hasSavedSession: boolean;

  setMode: (mode: TimerMode) => void;
  setTodoId: (id: string | null) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
  saveSession: (completed: boolean) => Promise<void>;
}

const DURATIONS = {
  'focus': 25,
  'short-break': 0.1,
  'long-break': 15
};

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      timeLeft: 25 * 60, 
      initialDuration: 25 * 60,
      status: 'idle',
      mode: 'focus',
      activeTodoId: null,
      endTime: null,
      hasSavedSession: false,

      setMode: (mode) => {
        if (get().status === 'running') return; 

        const durationInSeconds = DURATIONS[mode] * 60;
        set({ 
          mode, 
          timeLeft: durationInSeconds, 
          initialDuration: durationInSeconds,
          status: 'idle',
          endTime: null,
          hasSavedSession: false
        });
      },

      setTodoId: (id) => set({ activeTodoId: id }),
      
      start: () => {
        const { timeLeft, initialDuration } = get();
        
        let durationToUse = timeLeft;
        if (timeLeft <= 0) {
            durationToUse = initialDuration;
            set({ timeLeft: initialDuration });
        }

        const targetTime = Date.now() + (durationToUse * 1000);

        set({ 
          status: 'running', 
          endTime: targetTime,
          hasSavedSession: false
         });
      },

      pause: () => set({ status: 'paused', endTime: null }),
      
      reset: () => {
        const { status, initialDuration, hasSavedSession } = get();

        // Hanya save kalau belum pernah save di sesi ini
        if (status !== 'idle' && !hasSavedSession) {
          get().saveSession(false);
          set({ hasSavedSession: true });
        }

        set({ timeLeft: initialDuration, status: 'idle', endTime: null });
      },

      tick: () => {
        const { endTime, status, saveSession, hasSavedSession } = get();

        if (status !== 'running' || !endTime) return;

        const now = Date.now();
        const secondsRemaining = Math.ceil((endTime - now) / 1000);

        if (secondsRemaining > 0) {
          set({ timeLeft: secondsRemaining });
        } else {
          set({ status: 'idle', timeLeft: 0, endTime: null });
          if (!hasSavedSession) {
            saveSession(true); 
          }
        }
      },

      saveSession: async (completed) => {
        if (get().hasSavedSession) return;
        set({ hasSavedSession: true });

        const { mode, initialDuration, activeTodoId, timeLeft, status, endTime } = get();
        
        // --- Notifikasi ---
        if (completed) {
          // Audio
          try {
            const audio = new Audio('/bell.mp3');
            audio.play().catch(e => console.error("Gagal putar suara:", e));
          } catch (e) { console.error("Audio error:", e); }

          // OS Notification
          try {
            let permission = await isPermissionGranted();
            if (!permission) {
              permission = await requestPermission() === 'granted';
            }

            if (permission) {
              sendNotification({
                title: mode === 'focus' ? 'Focus Selesai! 🎉' : 'Istirahat Selesai! ⚡️',
                body: mode === 'focus' 
                  ? 'Kerja bagus! Waktunya istirahat sejenak.' 
                  : 'Siap untuk kembali fokus?',
              });
            }
          } catch (e) { console.error("Notification error:", e); }
        }

        let calculatedTimeLeft = timeLeft;

        if (status === 'running' && endTime) {
            const now = Date.now();
            // Hitung selisih waktu nyata
            const msRemaining = endTime - now;
            calculatedTimeLeft = Math.max(0, Math.ceil(msRemaining / 1000));
        }

        // Hitung durasi aktual
        const elapsedSeconds = completed ? initialDuration : (initialDuration - calculatedTimeLeft);
        const durationMinutes = Math.floor(elapsedSeconds / 60);

        // Junk Filter (< 1 menit)
        if (durationMinutes < 1) {
            console.log("⚠️ Session too short, discarded.");
            return;
        }

        const startedAt = new Date(Date.now() - elapsedSeconds * 1000).toISOString();
        const endedAt = new Date().toISOString();

        try {
          const db = await initDB();
          await db.execute(
            `INSERT INTO sessions (id, todo_id, duration, started_at, ended_at, completed) 
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [crypto.randomUUID(), activeTodoId, durationMinutes, startedAt, endedAt, completed]
          );
          console.log(`✅ Session Saved: ${mode} | Completed: ${completed}`);
          
          useDashboardStore.getState().loadStats();
        } catch (err) {
          console.error("❌ Failed to save session:", err);
        }
      },
    }),
    {
      name: 'pomodoro-timer-storage', // Nama key di LocalStorage
      partialize: (state) => ({ 
        timeLeft: state.timeLeft,
        initialDuration: state.initialDuration,
        status: state.status,
        mode: state.mode,
        activeTodoId: state.activeTodoId,
        endTime: state.endTime,
        hasSavedSession: state.hasSavedSession
      }),
    }
  )
);