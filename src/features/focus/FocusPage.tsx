import { useEffect, useState } from "react";
import { CheckCircle, ArrowLeft, Target} from "lucide-react";
import { useTodoStore } from "../todo/store";
import { useNavStore } from "../../lib/nav";
import { TimerWidget } from "../timer/components/TimerWidget";
import { useToastStore } from "../../lib/toast";

export function FocusPage() {
  const { todos, loadTodos, toggleStatus } = useTodoStore();
  const { setView } = useNavStore();
  const { addToast } = useToastStore();
  
  // State lokal untuk melacak tugas yang sedang dikerjakan "detik ini"
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  // Filter hanya tugas 'today'
  const todayTodos = todos.filter(t => t.status === 'today');
  const activeTodo = todayTodos.find(t => t.id === activeTaskId);

  // Handle Complete Task
  const handleComplete = async (id: string) => {
    await toggleStatus(id); // Status berubah jadi 'done', otomatis hilang dari list 'today'
    setActiveTaskId(null); // Reset pilihan
    addToast("Task completed! Well done. 🎉", "success");
  };

  return (
    <div className="max-w-2xl mx-auto py-6 fade-in min-h-[80vh] flex flex-col justify-center">
      
      {/* HEADER: TOMBOL KEMBALI */}
      <div className="mb-8">
        <button 
          onClick={() => setActiveTaskId(null)} 
          className={`flex items-center text-sm text-gray-400 hover:text-gray-600 transition-colors ${!activeTaskId ? 'hidden' : ''}`}
        >
          <ArrowLeft size={16} className="mr-1" />
          Pilih tugas lain
        </button>
      </div>

      {/* CASE 1: BELUM ADA TUGAS HARI INI */}
      {todayTodos.length === 0 && (
        <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
          <div className="inline-flex p-4 bg-orange-100 text-orange-500 rounded-full mb-4">
            <Target size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Target Hari Ini Kosong</h2>
          <p className="text-gray-500 mb-6">Kamu belum memindahkan tugas apa pun ke "Today".</p>
  
          <button 
            onClick={() => setView('tasks')}
            className="px-6 py-2 bg-[var(--accent-primary)] text-[var(--text-inverted)] rounded-lg hover:bg-[var(--accent-primary-hover)] transition-all font-medium shadow-md shadow-[var(--accent-primary)]/20"
          >
            Pergi ke Tasks Manager
          </button>
        </div>
      )}

      {/* CASE 2: ADA TUGAS, TAPI BELUM DIPILIH (SELECTION MODE) */}
      {todayTodos.length > 0 && !activeTodo && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Apa prioritasmu sekarang?</h2>
            <p className="text-gray-500">Pilih satu tugas untuk mulai Deep Work.</p>
          </div>

          <div className="grid gap-3">
            {todayTodos.map(todo => (
              <button
                key={todo.id}
                onClick={() => setActiveTaskId(todo.id)}
                className="w-full text-left p-4 bg-white border border-gray-200 hover:border-[var(--accent-primary)] hover:shadow-md rounded-xl transition-all group flex items-center justify-between"
              >
                <span className="font-medium text-gray-700 group-hover:text-gray-900">{todo.title}</span>
                {/* === HOVER EFFECT PADA BADGE DI UPDATE === */}
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-lg group-hover:bg-[var(--accent-primary)]/10 group-hover:text-[var(--accent-primary)] transition-colors">
                  Mulai
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CASE 3: DEEP FOCUS MODE (HERO) */}
      {activeTodo && (
        <div className="flex flex-col gap-8 items-center text-center animate-in zoom-in-95 duration-300">
          
          {/* ACTIVE TASK TITLE */}
          <div className="space-y-2 max-w-lg">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">Currently Focusing On</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {activeTodo.title}
            </h1>
          </div>

          {/* TIMER HERO */}
          <div className="w-full max-w-md">
            <TimerWidget />
          </div>

          {/* COMPLETE ACTION */}
          <div className="mt-4">
            <button
              onClick={() => handleComplete(activeTodo.id)}
              className="flex items-center gap-2 px-8 py-3 bg-green-100 text-green-700 hover:bg-green-200 rounded-full font-bold transition-all transform hover:scale-105"
            >
              <CheckCircle size={20} />
              Selesai & Lanjut
            </button>
          </div>
        </div>
      )}
    </div>
  );
}