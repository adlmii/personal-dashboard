export type TimerMode = 'focus' | 'short-break' | 'long-break';

export interface PomodoroSession {
  id: string;
  todoId?: string | null; // Bisa null kalau user fokus tanpa pilih tugas
  duration: number;       // Dalam menit (misal: 25)
  startedAt: string;
  endedAt: string;
  completed: boolean;     // True kalau timer selesai full, False kalau di-stop paksa
}