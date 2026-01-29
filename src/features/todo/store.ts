import { create } from 'zustand';
import { initDB } from '../../lib/db';
import { Todo, TodoStatus } from './types';
import { useDashboardStore } from '../dashboard/store';
import { useToastStore } from "../../lib/toast";

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  
  loadTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  updateStatus: (id: string, status: TodoStatus) => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  restoreTodo: (todo: Todo) => Promise<void>;
  resetTodayTasks: () => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  isLoading: false,

  loadTodos: async () => {
    set({ isLoading: true });
    const db = await initDB();
    const result = await db.select<Todo[]>(`
      SELECT * FROM todos 
      ORDER BY 
        CASE status 
          WHEN 'today' THEN 1 
          WHEN 'backlog' THEN 2 
          WHEN 'done' THEN 3 
        END,
        created_at DESC
    `);
    set({ todos: result, isLoading: false });
  },

  addTodo: async (title) => {
    if (!title.trim()) return;
    const db = await initDB();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      status: 'backlog',
      priority: 1,
      created_at: new Date().toISOString(),
      completed_at: null
    };

    await db.execute(
      `INSERT INTO todos (id, title, status, priority, created_at) VALUES ($1, $2, $3, $4, $5)`,
      [newTodo.id, newTodo.title, newTodo.status, newTodo.priority, newTodo.created_at]
    );

    await get().loadTodos(); 
    useDashboardStore.getState().loadStats();
  },

  toggleStatus: async (id) => {
    const todo = get().todos.find((t) => t.id === id);
    if (!todo) return;
    const newStatus = todo.status === 'done' ? 'today' : 'done';
    await get().updateStatus(id, newStatus);
  },

  updateStatus: async (id, status) => {
    const db = await initDB();
    const state = get();

    if (status === 'today') {
      const todayCount = state.todos.filter(t => t.status === 'today').length;
      const isAlreadyToday = state.todos.find(t => t.id === id)?.status === 'today';
      
      if (todayCount >= 3 && !isAlreadyToday) {
        useToastStore.getState().addToast("Maksimal 3 fokus utama per hari!", "error");
        return; 
      }
    }

    const completedAt = status === 'done' ? new Date().toISOString() : null;

    await db.execute(
      `UPDATE todos SET status = $1, completed_at = $2 WHERE id = $3`,
      [status, completedAt, id]
    );

    await get().loadTodos();
    useDashboardStore.getState().loadStats();
  },

  deleteTodo: async (id) => {
    const db = await initDB();
    await db.execute("DELETE FROM todos WHERE id = $1", [id]);
    await get().loadTodos();
    useDashboardStore.getState().loadStats();
  },

  restoreTodo: async (todo) => {
    const db = await initDB();
    await db.execute(
      `INSERT INTO todos (id, title, status, priority, created_at, completed_at) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [todo.id, todo.title, todo.status, todo.priority, todo.created_at, todo.completed_at]
    );
    await get().loadTodos();
    useDashboardStore.getState().loadStats();
  },

  resetTodayTasks: async () => {
    const db = await initDB();
    // Pindahkan semua yang statusnya 'today' kembali ke 'backlog'
    await db.execute(`
      UPDATE todos 
      SET status = 'backlog' 
      WHERE status = 'today'
    `);
    
    // Refresh UI
    await get().loadTodos();
  }

}));