import { create } from 'zustand';

export type NavView = 'dashboard' | 'focus' | 'tasks' | 'settings';

interface NavState {
  currentView: NavView;
  setView: (view: NavView) => void;
}

export const useNavStore = create<NavState>((set) => ({
  currentView: 'dashboard',
  setView: (view) => set({ currentView: view }),
}));