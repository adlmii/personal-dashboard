import { Home, Calendar as CalendarIcon, Settings, LogOut, LayoutDashboard } from "lucide-react";

export default function Sidebar({ activeTab, onTabChange }) {
  // Helper untuk styling tombol aktif
  const getButtonClass = (tabName) =>
    `p-3 rounded-xl transition-all duration-300 group relative ${
      activeTab === tabName
        ? "bg-slate-800 text-blue-400 shadow-md ring-1 ring-slate-700"
        : "text-slate-500 hover:bg-slate-800/50 hover:text-slate-300"
    }`;

  return (
    <aside className="w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-8 gap-6 z-20 shadow-2xl h-screen">
      {/* Logo */}
      <div className="bg-linear-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl mb-4 shadow-lg shadow-blue-500/20">
        <LayoutDashboard className="w-6 h-6 text-white" />
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4 w-full px-4">
        <button
          onClick={() => onTabChange("home")}
          className={getButtonClass("home")}
          title="Dashboard"
        >
          <Home className="w-6 h-6" />
        </button>

        <button
          onClick={() => onTabChange("calendar")}
          className={getButtonClass("calendar")}
          title="Kalender"
        >
          <CalendarIcon className="w-6 h-6" />
        </button>

        <button
          onClick={() => onTabChange("settings")}
          className={getButtonClass("settings")}
          title="Pengaturan"
        >
          <Settings className="w-6 h-6" />
        </button>
      </nav>

      {/* Footer */}
      <div className="mt-auto">
        <button className="p-3 text-slate-600 hover:text-rose-400 transition-colors">
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </aside>
  );
}