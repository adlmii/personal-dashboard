import { LayoutDashboard, Timer, ListTodo, Settings } from "lucide-react";
import { useNavStore, NavView } from "../lib/nav";
import logo from "../assets/logo.png";
import clsx from "clsx";

export function Sidebar() {
  const { currentView, setView } = useNavStore();

  const MenuItem = ({ view, icon: Icon, label }: { view: NavView; icon: any; label: string }) => {
    const isActive = currentView === view;
    const isSettings = label === "Settings";

    return (
      <button
        onClick={() => setView(view)}
        className={clsx(
          "group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out",
          isActive
            ? "bg-[var(--accent-primary)] text-[var(--text-inverted)] shadow-md shadow-[var(--accent-primary)]/25 translate-x-1"
            : "text-[var(--text-muted)] hover:bg-[var(--accent-primary)]/10 hover:text-[var(--accent-primary)] hover:translate-x-1"
        )}
      >
        <Icon 
          size={20} 
          className={clsx(
            "transition-transform duration-500",
            isActive 
              ? "text-[var(--text-inverted)]" 
              : "text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]",
            isSettings && "group-hover:rotate-90"
          )} 
        />
        {label}
      </button>
    );
  };

  return (
    <aside className="w-64 h-screen bg-[var(--bg-card)] border-r border-[var(--bg-subtle)] flex flex-col">
      
      {/* Header / Logo Area */}
      <div className="flex items-center gap-3 px-6 mb-8 mt-6">
        <img 
          src={logo} 
          alt="FocusDeck Logo" 
          className="w-8 h-8 rounded-lg shadow-sm object-contain" 
        />
        <div>
          <h1 className="font-bold text-lg text-[var(--text-main)] tracking-tight leading-none">Personal Dashboard</h1>
        </div>
      </div>

      {/* Menu Utama */}
      <nav className="flex-1 px-4 space-y-2">
        <MenuItem view="dashboard" icon={LayoutDashboard} label="Dashboard" />
        <MenuItem view="focus" icon={Timer} label="Focus Mode" />
        <MenuItem view="tasks" icon={ListTodo} label="Tasks" />
      </nav>

      {/* Footer / Settings */}
      <div className="p-4 border-t border-[var(--bg-subtle)] space-y-4">
        <MenuItem view="settings" icon={Settings} label="Settings" />
      </div>
    </aside>
  );
}