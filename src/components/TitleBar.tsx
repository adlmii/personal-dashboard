import { Window } from "@tauri-apps/api/window";
import { X, Minus, Expand } from "lucide-react";

const appWindow = new Window("main");

export function TitleBar() {
  return (
    <div className="titlebar border-b border-[var(--bg-subtle)] bg-[var(--bg-card)] flex items-center h-8 fixed top-0 left-0 right-0 z-[9999]">
      {/* Container Tombol macOS */}
      <div className="flex items-center px-4 z-10">
        <button onClick={() => appWindow.close()} className="mac-btn mac-close">
          <X size={8} strokeWidth={4} />
        </button>
        <button onClick={() => appWindow.minimize()} className="mac-btn mac-min">
          <Minus size={8} strokeWidth={4} />
        </button>
        <button onClick={() => appWindow.toggleMaximize()} className="mac-btn mac-max">
          <Expand size={8} strokeWidth={4} />
        </button>
      </div>
      
      {/* Area Drag + Tulisan Tengah */}
      <div className="titlebar-drag absolute inset-0 flex justify-center items-center pointer-events-none">
        <span className="text-[11px] font-medium text-[var(--text-muted)] tracking-tight">
          Personal Dashboard
        </span>
      </div>
    </div>
  );
}