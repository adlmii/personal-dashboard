import { create } from 'zustand';

type View = 'dashboard' | 'settings';

interface NavState {
  currentView: View;
  setView: (view: View) => void;
}

export const useNavStore = create<NavState>((set) => ({
  currentView: 'dashboard',
  setView: (view) => set({ currentView: view }),
}));