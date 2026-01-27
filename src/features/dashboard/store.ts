import { create } from 'zustand';
import { initDB } from '../../lib/db';

interface DailyStats {
  focusMinutes: number;
  tasksCompleted: number;
  tasksTotal: number;
}

interface DashboardState {
  stats: DailyStats;
  isLoading: boolean;
  loadStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: {
    focusMinutes: 0,
    tasksCompleted: 0,
    tasksTotal: 0
  },
  isLoading: false,

  loadStats: async () => {
    set({ isLoading: true });
    const db = await initDB();

    try {
      // Total Menit Fokus Hari Ini
      const sessionResult = await db.select<any[]>(`
        SELECT SUM(duration) as total 
        FROM sessions 
        WHERE date(started_at) = date('now', 'localtime')
      `);
      const focusMinutes = sessionResult[0]?.total || 0;

      // Task Selesai Hari Ini
      const doneResult = await db.select<any[]>(`
        SELECT COUNT(*) as count 
        FROM todos 
        WHERE status = 'done' 
        AND date(completed_at) = date('now', 'localtime')
      `);
      const tasksCompleted = doneResult[0]?.count || 0;

      // Sisa Task (Backlog + Today)
      const activeResult = await db.select<any[]>(`
        SELECT COUNT(*) as count 
        FROM todos 
        WHERE status != 'done'
      `);
      const tasksRemaining = activeResult[0]?.count || 0;

      set({ 
        stats: {
          focusMinutes,
          tasksCompleted,
          tasksTotal: tasksCompleted + tasksRemaining
        }, 
        isLoading: false 
      });

    } catch (err) {
      console.error("Gagal load stats:", err);
      set({ isLoading: false });
    }
  }
}));