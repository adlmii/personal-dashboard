import { useEffect, useState } from "react";
import { Plus, Layout } from "lucide-react";
import { useTodoStore } from "../todo/store";
import { useDashboardStore } from "./store";
import { TodoItem } from "../todo/components/TodoItem";
import { TimerWidget } from "../timer/components/TimerWidget";
import { StatsCard } from "./components/StatsCard";
import { useToastStore } from "../../lib/toast";

export function Dashboard() {
  const { todos, loadTodos, addTodo, isLoading } = useTodoStore();
  const { loadStats } = useDashboardStore(); 
  const { addToast } = useToastStore();
  const [input, setInput] = useState("");

  useEffect(() => {
    loadTodos();
    loadStats();
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input);
    addToast("Task added to Backlog", "info");
    setInput("");
  };

  const todayTodos = todos.filter(t => t.status === 'today');
  const backlogTodos = todos.filter(t => t.status === 'backlog');

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col gap-6">
      
      {/* STATS */}
      <section className="shrink-0">
        <StatsCard />
      </section>

      {/* MAIN GRID */}
      <section className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* KOLOM KIRI (TASKS) */}
        <div className="lg:col-span-8 flex flex-col gap-6 min-h-0">
          
          {/* TODAY FOCUS */}
          <div className="bg-linear-to-br from-orange-50 to-white border border-orange-100 p-6 rounded-2xl shrink-0 shadow-sm">
            <h3 className="text-lg font-bold text-(--text-main) mb-4 flex items-center gap-2">
              ☀️ Today Focus 
              <span className="text-xs bg-(--accent-primary) text-white px-2 py-0.5 rounded-full">
                {todayTodos.length}/3
              </span>
            </h3>
            
            {todayTodos.length === 0 ? (
              <div className="p-6 border-2 border-dashed border-orange-200 rounded-xl text-center text-orange-400 bg-orange-50/50">
                <p>Kosong adalah musuh. Pilih 3 prioritas dari Backlog!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {todayTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
              </div>
            )}
          </div>

          {/* BACKLOG CARD */}
          <div className="flex-1 bg-(--bg-card) border border-(--bg-subtle) rounded-2xl flex flex-col min-h-0 shadow-sm">
            
            {/* Backlog Header & Input */}
            <div className="p-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm rounded-t-2xl z-10">
              <div className="flex items-center gap-2 mb-3">
                <Layout size={18} className="text-(--text-muted)" />
                <h3 className="text-sm font-bold text-(--text-main) uppercase tracking-wider">Backlog</h3>
                <span className="text-xs bg-gray-100 text-(--text-muted) px-2 py-0.5 rounded-full border border-gray-200">
                  {backlogTodos.length}
                </span>
              </div>
              
              <form onSubmit={handleAdd} className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="+ Quick add task..."
                  className="w-full bg-gray-50 border border-gray-200 text-(--text-main) py-3 px-4 pr-12 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 transition-all placeholder:text-gray-400"
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 top-2 p-1.5 bg-gray-200 hover:bg-(--accent-primary) hover:text-white text-gray-500 rounded-md disabled:opacity-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </form>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
              {isLoading ? (
                <p className="text-center text-gray-400 py-4">Loading...</p>
              ) : backlogTodos.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                   <p className="text-sm">No tasks pending.</p>
                </div>
              ) : (
                backlogTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
              )}
            </div>

          </div>
        </div>

        {/* KOLOM KANAN (TIMER) */}
        <div className="lg:col-span-4 min-h-0 flex flex-col">
          {/* Timer Widget */}
          <TimerWidget />
          
          {/* Quote / Space Filler */}
          <div className="mt-6 p-6 rounded-2xl border border-(--bg-subtle) bg-white/50 flex-1 flex items-center justify-center text-(--text-muted) text-sm text-center italic">
            "Satu langkah kecil lebih baik daripada rencana besar yang tertunda."
          </div>
        </div>

      </section>
    </div>
  );
}