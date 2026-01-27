import { useEffect } from "react";
import { Play, Pause, RotateCcw, Coffee, Brain, Zap } from "lucide-react";
import { sendNotification } from "@tauri-apps/plugin-notification";
import { useTimerStore } from "../store";
import { useTimerTick } from "../hooks";
import { cn } from "../../../lib/utils";
import { useToastStore } from "../../../lib/toast";

export function TimerWidget() {
  useTimerTick();
  const { timeLeft, status, mode, setMode, start, pause, reset } = useTimerStore();
  const { addToast } = useToastStore();

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getModeColor = () => {
    if (mode === 'focus') return "text-[var(--accent-primary)] border-orange-200 bg-orange-50";
    if (mode === 'short-break') return "text-[var(--accent-success)] border-green-200 bg-green-50";
    return "text-[var(--accent-secondary)] border-blue-200 bg-blue-50";
  };

  useEffect(() => {
    if (timeLeft !== 0) return;
    if (status !== 'idle') return;
    if (timeLeft === 0 && status === 'idle') {
      
      const audio = new Audio('/bell.mp3');
      audio.play().catch(e => console.error("Gagal putar audio:", e));

      try {
        sendNotification({
          title: "Personal Dashboard",
          body: mode === 'focus' ? "Sesi Fokus Selesai! Kerja bagus. 🎉" : "Istirahat Selesai! Yuk gas lagi. 🚀",
        });
      } catch (err) {
        console.log("Notifikasi skip (plugin belum setup)");
      }
      addToast(
        mode === 'focus' ? "Focus session finished! Time to break. ☕" : "Break finished! Back to work. 🚀",
        "info"
      );
    }
  }, [timeLeft, status, mode]);

  return (
    <div className="bg-(--bg-card) border border-(--bg-subtle) rounded-2xl p-6 sticky top-6 shadow-sm">
      
      {/* Mode Selector */}
      <div className="flex justify-center gap-2 mb-8 bg-gray-50 p-1.5 rounded-xl border border-gray-100 w-full">
        <button 
          onClick={() => setMode('focus')}
          disabled={status === 'running'}
          className={cn(
            "flex-1 p-2 rounded-lg transition-all flex justify-center", 
            mode === 'focus' 
              ? "bg-white text-(--accent-primary) shadow-sm border border-gray-100" 
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100",
            status === 'running' && "opacity-50 cursor-not-allowed"
          )}
          title="Focus Mode"
        >
          <Brain size={20} />
        </button>

        <button 
          onClick={() => setMode('short-break')}
          disabled={status === 'running'}
          className={cn(
            "flex-1 p-2 rounded-lg transition-all flex justify-center", 
            mode === 'short-break' 
              ? "bg-white text-(--accent-success) shadow-sm border border-gray-100" 
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100",
            status === 'running' && "opacity-50 cursor-not-allowed"
          )}
          title="Short Break"
        >
          <Coffee size={20} />
        </button>

        <button 
          onClick={() => setMode('long-break')}
          disabled={status === 'running'}
          className={cn(
            "flex-1 p-2 rounded-lg transition-all flex justify-center", 
            mode === 'long-break' 
              ? "bg-white text-(--accent-secondary) shadow-sm border border-gray-100" 
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100",
            status === 'running' && "opacity-50 cursor-not-allowed"
          )}
          title="Long Break"
        >
          <Zap size={20} />
        </button>
      </div>

      {/* TIMER DISPLAY */}
      <div className={cn(
        "text-center mb-8 py-10 rounded-2xl border transition-all duration-300",
        getModeColor()
      )}>
        <div className={cn("text-7xl font-bold font-mono tracking-tighter transition-opacity", 
          status === 'running' ? "opacity-100" : "opacity-80"
        )}>
          {formatTime(timeLeft)}
        </div>
        <p className="text-sm font-bold uppercase tracking-widest opacity-60 mt-2">
          {mode.replace('-', ' ')}
        </p>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-center gap-4">
        {status === 'running' ? (
          <button 
            onClick={pause}
            className="h-16 w-16 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-(--text-main) rounded-full transition-all border border-gray-200 shadow-sm"
          >
            <Pause size={28} fill="currentColor" />
          </button>
        ) : (
          <button 
            onClick={start}
            className={cn(
              "h-16 w-16 flex items-center justify-center rounded-full text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
              // Tombol Play warnanya ngikutin Mode
              mode === 'focus' ? "bg-(--accent-primary) hover:bg-orange-600" :
              mode === 'short-break' ? "bg-(--accent-success) hover:bg-green-600" :
              "bg-(--accent-secondary) hover:bg-blue-600"
            )}
          >
            <Play size={28} fill="currentColor" className="ml-1" />
          </button>
        )}

        <button 
          onClick={reset}
          className="h-12 w-12 flex items-center justify-center text-gray-400 hover:text-(--text-main) hover:bg-gray-100 rounded-full transition-all"
          title="Reset Timer"
        >
          <RotateCcw size={20} />
        </button>
      </div>

    </div>
  );
}