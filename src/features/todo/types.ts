export type TodoStatus = 'backlog' | 'today' | 'done';

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  priority: number;
  created_at: string;
  completed_at?: string | null;
}