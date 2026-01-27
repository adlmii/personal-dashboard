import { LayoutDashboard, Settings } from "lucide-react";
import { useNavStore } from "../lib/nav";

export function Sidebar() {
  const { currentView, setView } = useNavStore();

  return (
    <aside className="w-64 h-screen bg-[var(--bg-card)] border-r border-[var(--bg-subtle)] flex flex-col">
      
      {/* Header */}
      <div className="p-6 pb-8">
        <h1 className="text-xl font-bold text-[var(--accent-primary)] tracking-tight flex items-center gap-2">
          FocusDeck
          <span className="text-[10px] bg-[var(--accent-primary)] text-white px-1.5 py-0.5 rounded-full font-medium">MVP</span>
        </h1>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-4 space-y-1">
        <button
          onClick={() => setView('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
            currentView === 'dashboard'
              ? "bg-[var(--accent-secondary)] text-white shadow-md shadow-blue-500/20"
              : "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-main)]"
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="text-sm font-medium">Dashboard</span>
        </button>
      </nav>

      {/* Footer Nav (Settings) */}
      <div className="p-4 border-t border-[var(--bg-subtle)]">
        <button 
          onClick={() => setView('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all group ${
            currentView === 'settings'
             ? "bg-gray-100 text-[var(--text-main)]"
             : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-subtle)]"
          }`}
        >
          <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          Settings
        </button>
        
        <p className="mt-4 text-[10px] text-center text-gray-300">
          v0.1.0
        </p>
      </div>

    </aside>
  );
}