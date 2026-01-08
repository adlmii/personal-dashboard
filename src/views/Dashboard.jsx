import { useState, useEffect } from "react";
import { 
  TrendingUp, Target, Plus, Timer, Pause, Play, RotateCcw, StickyNote 
} from "lucide-react";
import WeatherWidget from "../components/WeatherWidget";
import TaskItem from "../components/TaskItem";

export default function Dashboard({ userName }) {
  // --- 1. CLOCK & DATE LOGIC ---
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  // --- 2. WEATHER LOGIC ---
  const [weather, setWeather] = useState({ temp: 0, code: 0, loading: true });
  useEffect(() => {
    const fetchWeather = async (lat, long) => {
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`);
        const data = await response.json();
        setWeather({ temp: Math.round(data.current_weather.temperature), code: data.current_weather.weathercode, loading: false });
      } catch { setWeather((prev) => ({ ...prev, loading: false })); }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => fetchWeather(p.coords.latitude, p.coords.longitude),
        () => fetchWeather(-6.2088, 106.8456)
      );
    } else { fetchWeather(-6.2088, 106.8456); }
  }, []);

  // --- 3. TASKS LOGIC ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("dashboard_tasks");
    return saved ? JSON.parse(saved) : [{ id: 1, text: "Cek email & jadwal", completed: false }];
  });
  const [newTaskInput, setNewTaskInput] = useState("");
  useEffect(() => localStorage.setItem("dashboard_tasks", JSON.stringify(tasks)), [tasks]);

  const addTask = (e) => {
    if (e.key === "Enter" && newTaskInput.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTaskInput, completed: false }]);
      setNewTaskInput("");
    }
  };
  const editTask = (id, newText) => {
  setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
};
  const toggleTask = (id) => setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  // --- 4. TIMER LOGIC ---
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU").play().catch(()=>{});
      alert("Waktu Habis!");
      setTimeLeft(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // --- 5. NOTE LOGIC ---
  const [note, setNote] = useState(() => localStorage.getItem("dashboard_note") || "");
  useEffect(() => localStorage.setItem("dashboard_note", note), [note]);

  // --- UI HELPERS ---
  const timeString = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const dateString = date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* ROW 1: Greeting & Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Greeting Card */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-sm">
          {/* Subtle Glow Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 text-xs font-bold mb-4">
                <TrendingUp className="w-3 h-3" />
                <span>{progress}% Produktivitas Hari Ini</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Halo, <span className="text-indigo-400">{userName}</span>!
              </h1>
              <p className="text-slate-400">{dateString}</p>
            </div>
            <div className="mt-8">
              <span className="text-6xl font-bold text-white tracking-tight">{timeString}</span>
              <span className="text-xl text-slate-500 ml-2 font-medium">WIB</span>
            </div>
          </div>
        </div>

        {/* Weather Widget Component */}
        <WeatherWidget weather={weather} />
      </div>

      {/* ROW 2: Tasks, Timer, Note */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Task List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col h-105">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Target className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Fokus Utama</h2>
                <p className="text-xs text-slate-500">{tasks.filter(t => !t.completed).length} tugas tertunda</p>
              </div>
            </div>
            {/* Progress Bar Mini */}
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mb-4 relative group">
            <input
              type="text"
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
              onKeyDown={addTask}
              placeholder="Tambah tugas baru..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <Plus className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
            {tasks.map((task) => (
              <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask}
              onEdit={editTask}
              onDelete={deleteTask} 
              />
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-10 text-slate-600 text-sm">Belum ada tugas. Yuk mulai produktif!</div>
            )}
          </div>
        </div>

        {/* Right Column: Timer & Note */}
        <div className="space-y-6">
          
          {/* Timer */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
             {/* Progress Background */}
            <div className={`absolute bottom-0 left-0 h-1 bg-indigo-500 transition-all duration-1000`} style={{ width: isTimerActive ? '100%' : '0%' }}></div>
            
            <div className="flex items-center gap-2 mb-4 text-slate-300">
              <Timer className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Focus Timer</h3>
            </div>
            
            <div className="text-center py-4">
              <div className={`text-5xl font-mono font-bold mb-2 tracking-tighter ${isTimerActive ? "text-white" : "text-slate-500"}`}>
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {isTimerActive ? "FOKUS SEDANG BERJALAN" : "SIAP MULAI?"}
              </p>
            </div>

            <div className="flex gap-2 mt-2 mb-2">
              <button 
                onClick={() => { setIsTimerActive(false); setTimeLeft(25 * 60); }} 
                className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700">
                25m
              </button>
              <button 
                onClick={() => { setIsTimerActive(false); setTimeLeft(50 * 60); }} 
                className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700">
                50m
              </button>
              <button 
                onClick={() => { setIsTimerActive(false); setTimeLeft(5 * 60); }} 
                className="px-2 py-1 text-xs rounded bg-slate-800 text-slate-400 hover:text-emerald-400 hover:bg-slate-700">
                5m Break
              </button>
            </div>
          </div>

          {/* Quick Note */}
          <div className="bg-amber-400/5 border border-amber-500/20 rounded-3xl p-6 flex flex-col h-45">
            <div className="flex items-center gap-2 mb-3 text-amber-500">
              <StickyNote className="w-5 h-5" />
              <h3 className="font-bold text-sm uppercase tracking-wider">Catatan</h3>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tulis ide cepat..."
              className="flex-1 w-full bg-transparent border-none resize-none focus:ring-0 text-slate-300 placeholder-slate-600 text-sm leading-relaxed custom-scrollbar p-0"
            />
          </div>

        </div>
      </div>
    </div>
  );
}