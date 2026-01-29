import { X } from "lucide-react";
import { useToastStore } from "../lib/toast";
import { cn } from "../lib/utils";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border min-w-[320px] animate-in slide-in-from-right-full fade-in duration-300",
            toast.type === 'error' ? "bg-red-50 border-red-200 text-red-800" : 
            toast.type === 'success' ? "bg-white border-gray-200 text-gray-800" : 
            "bg-gray-900 text-white border-gray-800"
          )}
        >
          {/* Indikator Warna */}
          <div className={cn("w-2 h-2 rounded-full shrink-0", 
             toast.type === 'error' ? "bg-red-500" : 
             toast.type === 'success' ? "bg-[var(--accent-success)]" : "bg-blue-400"
          )} />
          
          <p className="text-sm font-medium flex-1">{toast.message}</p>

          {/* UNDO */}
          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                removeToast(toast.id);
              }}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors border border-gray-200"
            >
              {toast.action.label}
            </button>
          )}

          {/* Tombol Close (X) */}
          <button onClick={() => removeToast(toast.id)} className="opacity-50 hover:opacity-100 p-1">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}