import { useState, useEffect } from "react";
import { Plus, Layers, Target, History, Check, Coffee, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useTodoStore } from "../todo/store";
import { TodoItem } from "../todo/components/TodoItem";
import { useToastStore } from "../../lib/toast";
import clsx from "clsx";

const CircularProgress = ({ value }: { value: number }) => {
  const radius = 20; 
  const circumference = 2 * Math.PI * radius;
  const displayValue = Math.min(100, Math.max(0, value));
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;

  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="24" cy="24" r={radius}
          stroke="currentColor" strokeWidth="5" fill="transparent"
          className="text-[var(--bg-subtle)]" 
        />
        <circle
          cx="24" cy="24" r={radius}
          stroke="currentColor" strokeWidth="5" fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={displayValue === 100 
            ? "text-green-500 transition-all duration-1000 ease-out" 
            : "text-[var(--accent-primary)] transition-all duration-1000 ease-out"
          }
        />
      </svg>
      
      {/* Teks Tengah: Kalau 100% muncul Check Icon, kalau belum muncul Angka */}
      <span className="absolute text-[10px] font-bold text-[var(--text-main)]">
        {displayValue === 100 ? (
          <Check size={14} className="text-green-600" strokeWidth={3} />
        ) : (
          `${displayValue}%`
        )}
      </span>
    </div>
  );
};

export function TasksPage() {
  const { todos, loadTodos, addTodo, isLoading } = useTodoStore();
  const { addToast } = useToastStore();
  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await addTodo(input);
    addToast("Added to Backlog", "info");
    setInput("");
  };

  const todayTodos = todos.filter(t => t.status === 'today');
  const backlogTodos = todos.filter(t => t.status === 'backlog');
  const doneTodos = todos.filter(t => t.status === 'done');

  // --- LOGIC TARGET FIX ---
  const DAILY_TARGET = 3; 
  
  const doneTodayCount = doneTodos.filter(t => {
    const todayStr = new Date().toISOString().slice(0, 10);
    return t.completed_at?.startsWith(todayStr);
  }).length;
  
  // Hitung persentase murni
  const rawPercentage = Math.round((doneTodayCount / DAILY_TARGET) * 100);

  return (
    <div className="w-full max-w-6xl fade-in pb-12">
      
      {/* HEADER SECTION */}
      <header className="mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-7 pb-1">
          <h1 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Task Manager</h1>
          <p className="text-[var(--text-muted)] mt-1 text-sm">Design your day, organize your life.</p>
        </div>
        <div className="lg:col-span-5 translate-y-3">
          <div className="bg-[var(--bg-card)] border border-[var(--bg-subtle)] px-4 py-3 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            
            {/* PROGRESS CIRCLE (Otomatis Max 100%) */}
            <CircularProgress value={rawPercentage} />
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Daily Goal</p>
                {/* Teks tetap jujur: "4 / 3 Tasks" */}
                <p className="text-xs font-bold text-[var(--text-main)]">
                  {doneTodayCount} <span className="text-[var(--text-muted)] font-normal">/ {DAILY_TARGET} Tasks</span>
                </p>
              </div>
              
              {/* Motivasi tetap menghargai overachievement */}
              <p className="text-xs text-[var(--accent-primary)] font-medium truncate">
                {rawPercentage >= 100 
                  ? `Target crushed! ${rawPercentage > 100 ? 'Extra effort! 🔥' : 'Well done! 🎉'}` 
                  : rawPercentage >= 60 
                  ? "Almost there, finish strong!" 
                  : "Focus on your big 3 today."}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* KOLOM KIRI (7/12): BACKLOG */}
        <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
          <form onSubmit={handleAdd} className="relative group z-10">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Plus className="text-[var(--text-muted)] group-focus-within:text-[var(--accent-primary)] transition-colors" size={20} />
            </div>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full bg-[var(--bg-card)] border border-[var(--bg-subtle)] text-[var(--text-main)] py-4 pl-14 pr-4 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all placeholder:text-[var(--text-muted)] font-medium"
            />
          </form>

          <section className="bg-[var(--bg-card)] border border-[var(--bg-subtle)] rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-[var(--bg-subtle)] flex justify-between items-center bg-[var(--bg-subtle)]/30">
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-[var(--text-muted)]" />
                <h2 className="font-bold text-[var(--text-main)] text-sm">Backlog</h2>
              </div>
              <span className="bg-[var(--bg-card)] border border-[var(--bg-subtle)] text-[var(--text-muted)] text-xs px-2.5 py-1 rounded-md font-mono">
                {backlogTodos.length} items
              </span>
            </div>

            <div className="p-4 h-[65vh] overflow-y-auto custom-scrollbar flex flex-col">
              {isLoading ? (
                <div className="space-y-3 p-2">
                   <div className="h-12 bg-[var(--bg-subtle)] rounded-xl animate-pulse" />
                   <div className="h-12 bg-[var(--bg-subtle)] rounded-xl animate-pulse" />
                </div>
              ) : backlogTodos.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 py-10 text-center animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 bg-[var(--accent-secondary)] bg-opacity-10 text-[var(--accent-secondary)] rounded-full flex items-center justify-center mb-4">
                    <Sparkles size={28} />
                  </div>
                  <p className="text-[var(--text-main)] font-medium">Backlog Clear!</p>
                  <p className="text-[var(--text-muted)] text-sm mt-1 max-w-xs">
                    Pikiranmu bersih. Saatnya istirahat atau fokus ke tugas hari ini.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {backlogTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* KOLOM KANAN (5/12): TODAY & HISTORY */}
        <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
          <div className="sticky top-6 space-y-6">
            
            {/* Today Focus Card */}
            <section className="bg-[#FFF7ED] border border-orange-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)] opacity-10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />

              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2 text-[var(--accent-primary)]">
                  <div className="p-1.5 bg-[var(--bg-card)] rounded-lg shadow-sm text-[var(--accent-primary)]">
                    <Target size={18} />
                  </div>
                  <h2 className="font-bold text-base text-gray-800">Today's Focus</h2>
                </div>
                <span className={clsx(
                  "text-xs px-2.5 py-1 rounded-full font-bold border shadow-sm",
                  todayTodos.length >= 3 
                    ? "bg-[var(--bg-card)] text-[var(--accent-danger)] border-red-100" 
                    : "bg-[var(--bg-card)] text-[var(--accent-primary)] border-orange-100"
                )}>
                  {todayTodos.length} / 3
                </span>
              </div>

              <div className="space-y-3 relative z-10 min-h-[120px]">
                {todayTodos.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-8 text-center border-2 border-dashed border-orange-200/50 rounded-xl">
                    <Coffee className="text-[var(--accent-primary)] opacity-50 mb-2" size={24} />
                    <p className="text-sm font-medium text-[var(--text-main)]">Siap produktif?</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1 px-4">
                      Pilih tugas dari Backlog untuk mulai fokus hari ini.
                    </p>
                  </div>
                ) : (
                  todayTodos.map(todo => (
                    <div key={todo.id} className="shadow-sm shadow-orange-200/50 bg-[var(--bg-card)] rounded-xl">
                      <TodoItem todo={todo} />
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Completed Tasks */}
            <section className="bg-[var(--bg-card)] border border-[var(--bg-subtle)] rounded-2xl overflow-hidden transition-all duration-300">
               <button 
                 onClick={() => setShowHistory(!showHistory)}
                 className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[var(--bg-subtle)] transition-colors group"
               >
                 <div className="flex items-center gap-3">
                   <div className="p-1.5 bg-[var(--bg-subtle)] rounded text-[var(--text-muted)] group-hover:text-[var(--text-main)]">
                      <History size={16} />
                   </div>
                   <span className="text-sm font-bold text-[var(--text-muted)] group-hover:text-[var(--text-main)]">
                     Completed Tasks
                   </span>
                 </div>
                 
                 <div className="flex items-center gap-3">
                    <span className="bg-[var(--bg-subtle)] text-[var(--text-muted)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {doneTodos.length}
                    </span>
                    {showHistory ? <ChevronUp size={16} className="text-[var(--text-muted)]"/> : <ChevronDown size={16} className="text-[var(--text-muted)]"/>}
                 </div>
               </button>

               <div className={clsx(
                  "transition-all duration-700 ease-in-out bg-[var(--bg-subtle)]/30",
                  showHistory ? "h-[35vh] opacity-100 border-t border-[var(--bg-subtle)]" : "max-h-0 opacity-0"
               )}>
                  <div className="p-3 space-y-2 h-full overflow-y-auto custom-scrollbar">
                    {doneTodos.length === 0 ? (
                       <p className="text-center text-xs text-[var(--text-muted)] py-4 italic">No completed tasks yet.</p>
                    ) : (
                       doneTodos.map(todo => (
                          <div key={todo.id} className="opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 bg-[var(--bg-card)] rounded-xl border border-[var(--bg-subtle)]">
                            <TodoItem todo={todo} />
                          </div>
                       ))
                    )}
                  </div>
               </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}