import { useState } from "react";
import { Trash2, RefreshCw, Info, Github } from "lucide-react";
import { initDB } from "../../lib/db";
import { useToastStore } from "../../lib/toast";

export function SettingsPage() {
  const { addToast } = useToastStore();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    if (!isResetting) {
      setIsResetting(true);
      setTimeout(() => setIsResetting(false), 3000);
      return;
    }

    // Eksekusi Reset
    try {
      const db = await initDB();
      // Hapus data (Truncate logic)
      await db.execute("DELETE FROM todos");
      await db.execute("DELETE FROM sessions");
      
      addToast("All data wiped successfully", "info");
      
      // Reload app biar fresh
      setTimeout(() => window.location.reload(), 1000);
    } catch (e) {
      addToast("Failed to reset data", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--text-main)]">Settings</h2>
        <p className="text-[var(--text-muted)]">Preferences & Application Data</p>
      </div>

      {/* Section 1: App Info (Read-Only) */}
      <div className="bg-[var(--bg-card)] border border-[var(--bg-subtle)] rounded-xl p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2 text-[var(--text-main)]">
          <Info size={18} /> About App
        </h3>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[var(--text-muted)]">Version</p>
            <p className="font-medium">v0.1.0 (MVP)</p>
          </div>
          <div>
            <p className="text-[var(--text-muted)]">Theme</p>
            <p className="font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]"></span>
              Warm Focus
            </p>
          </div>
          <div>
            <p className="text-[var(--text-muted)]">Developer</p>
            <p className="font-medium">You</p>
          </div>
          <div>
            <p className="text-[var(--text-muted)]">Tech Stack</p>
            <p className="font-medium">Tauri v2 + React</p>
          </div>
        </div>
      </div>

      {/* Section 2: Danger Zone */}
      <div className="bg-red-50/50 border border-red-100 rounded-xl p-6">
        <h3 className="font-semibold flex items-center gap-2 text-red-900 mb-2">
          Danger Zone
        </h3>
        <p className="text-sm text-red-700 mb-4">
          Actions here cannot be undone. Be careful.
        </p>
        
        <button 
          onClick={handleReset}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
            isResetting 
              ? "bg-red-600 text-white border-red-600 hover:bg-red-700" 
              : "bg-white text-red-600 border-red-200 hover:bg-red-50"
          }`}
        >
          {isResetting ? (
            <>
              <Trash2 size={16} /> Click again to CONFIRM WIPE
            </>
          ) : (
            <>
              <RefreshCw size={16} /> Reset All Data
            </>
          )}
        </button>
      </div>

    </div>
  );
}