import { useEffect } from "react";
import { ArrowRight, Play, ListTodo, Brain, Clock } from "lucide-react";
import { useNavStore } from "../../lib/nav";
import { useTimerStore } from "../timer/store";
import { useTodoStore } from "../todo/store";
import { StatsCard } from "./components/StatsCard";

export function Dashboard() {
  const { setView } = useNavStore();
  const { timeLeft, status, mode } = useTimerStore();
  const { todos, loadTodos } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, []);

  const todayCount = todos.filter(t => t.status === 'today').length;
  const backlogCount = todos.filter(t => t.status === 'backlog').length;

  // Helper format waktu mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col gap-8 fade-in">
      
      {/* STATS ROW */}
      <section>
        <StatsCard />
      </section>

      {/* ACTION GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* FOCUS MODE */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-orange-300 transition-colors group">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Brain size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Focus Session</h3>
            </div>
            
            <div className="mb-6">
              {status === 'running' ? (
                <div className="text-orange-600 font-mono text-3xl font-bold animate-pulse">
                  {formatTime(timeLeft)}
                </div>
              ) : (
                <p className="text-gray-500">
                  Siap untuk sesi <span className="font-medium text-gray-700">{mode}</span>?
                </p>
              )}
              <p className="text-sm text-gray-400 mt-1">
                {status === 'running' ? "Timer sedang berjalan..." : "Mulai fokus tanpa distraksi."}
              </p>
            </div>
          </div>

          {/* TOMBOL */}
          <button 
            onClick={() => setView('focus')}
            className="w-full flex items-center justify-between px-4 py-3 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-[var(--text-inverted)] rounded-xl transition-all font-medium group-hover:shadow-md"
          >
            <span>{status === 'running' ? "Kembali ke Timer" : "Mulai Fokus"}</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* TASK MANAGEMENT */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-colors group">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <ListTodo size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Task Manager</h3>
            </div>

            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Target Hari Ini</span>
                <span className="font-bold text-gray-800">{todayCount} Tasks</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Pending Backlog</span>
                <span className="font-medium text-gray-600">{backlogCount} Items</span>
              </div>
              
              {todayCount === 0 && (
                <p className="text-xs text-orange-500 mt-2 bg-orange-50 px-2 py-1 rounded-md inline-block">
                  ⚠️ Belum ada target hari ini.
                </p>
              )}
            </div>
          </div>

          <button 
            onClick={() => setView('tasks')}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-gray-100 hover:border-gray-300 text-gray-700 rounded-xl transition-all font-medium"
          >
            <span>Atur Tugas</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </section>

      {/* 3. QUOTE AREA */}
      <section className="mt-4 p-6 rounded-2xl border border-gray-100 bg-gray-50/50 text-center">
         <p className="text-gray-500 italic text-sm">
           "Kejelasan mendahului kompetensi. Tahu apa yang harus dikerjakan adalah 50% pekerjaan."
         </p>
      </section>

    </div>
  );
}