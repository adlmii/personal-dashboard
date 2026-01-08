import { useState, useEffect } from "react";
import { CheckCircle2, Plus, StickyNote, Timer, Play, Pause, RotateCcw } from "lucide-react";
import { isPermissionGranted, requestPermission, sendNotification } from "@tauri-apps/plugin-notification";

// Import UI Components
import WeatherWidget from "../components/WeatherWidget";
import TaskItem from "../components/TaskItem";

export default function Dashboard({ userName }) {
  // --- 1. CLOCK LOGIC ---
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const timeString = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const dateString = date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  // --- 2. WEATHER LOGIC ---
  const [weather, setWeather] = useState({ temp: 0, code: 0, loading: true, isJakarta: false });
  useEffect(() => {
    const fetchWeather = async (lat, long, isDefault = false) => {
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`);
        const data = await response.json();
        setWeather({ temp: data.current_weather.temperature, code: data.current_weather.weathercode, loading: false, isJakarta: isDefault });
      } catch (error) { setWeather((prev) => ({ ...prev, loading: false })); }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => fetchWeather(p.coords.latitude, p.coords.longitude),
        () => fetchWeather(-6.2088, 106.8456, true)
      );
    } else {
      fetchWeather(-6.2088, 106.8456, true);
    }
  }, []);

  // --- 3. TASKS LOGIC ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("dashboard_tasks");
    return saved ? JSON.parse(saved) : [{ id: 1, text: "Selamat Datang!", completed: false }];
  });
  const [newTaskInput, setNewTaskInput] = useState("");

  useEffect(() => localStorage.setItem("dashboard_tasks", JSON.stringify(tasks)), [tasks]);

  const addTask = (e) => {
    if (e.key === "Enter" && newTaskInput.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTaskInput, completed: false }]);
      setNewTaskInput("");
    }
  };
  const toggleTask = (id) => setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  // --- 4. TIMER LOGIC ---
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const BEEP_SOUND = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU";

  const toggleTimer = async () => {
    if (!isTimerActive) {
      let permission = await isPermissionGranted();
      if (!permission) {
        const result = await requestPermission();
        permission = result === "granted";
      }
      setIsTimerActive(true);
    } else {
      setIsTimerActive(false);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      new Audio(BEEP_SOUND).play().catch(() => {});
      sendNotification({ title: "Waktu Habis!", body: "Saatnya istirahat sebentar." });
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
      
      {/* 1. Greeting */}
      <div className="col-span-1 md:col-span-2 bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800 flex flex-col justify-between group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Halo, {userName}!</h2>
          <p className="text-slate-400 text-lg">Siap produktif hari ini?</p>
        </div>
        <div className="mt-6 flex flex-col md:flex-row md:items-end gap-2">
          <span className="text-6xl font-mono font-medium text-blue-400 tracking-tighter drop-shadow-lg">{timeString}</span>
          <span className="text-xl pb-2 text-slate-500 font-medium">{dateString}</span>
        </div>
      </div>

      {/* 2. Weather */}
      <WeatherWidget weather={weather} />

      {/* 3. Task List */}
      <div className="col-span-1 md:col-span-2 lg:row-span-2 bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Fokus Utama
          </h3>
          <div className="bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-300">
            {tasks.filter((t) => !t.completed).length} Pending
          </div>
        </div>
        <div className="mb-4 relative group">
          <input
            type="text"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all placeholder-slate-600"
            placeholder="Tulis tugas..."
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            onKeyDown={addTask}
          />
          <Plus className="absolute right-4 top-3.5 w-5 h-5 text-slate-500" />
        </div>
        <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-75">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))}
        </div>
      </div>

      {/* 4. Timer (Langsung di-render di sini sesuai request) */}
      <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-full h-1 bg-linear-to-r from-rose-500 to-orange-500 ${isTimerActive ? "opacity-100" : "opacity-0"} transition-opacity`}></div>
        <div className="flex items-center gap-2 mb-2 font-bold text-rose-400">
          <Timer className={`w-5 h-5 ${isTimerActive ? "animate-pulse" : ""}`} /> <span>Focus Timer</span>
        </div>
        <div className="flex flex-col items-center justify-center my-2">
          <span className={`text-6xl font-mono font-bold tracking-tighter ${isTimerActive ? "text-white" : "text-slate-500"}`}>{formatTime(timeLeft)}</span>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{isTimerActive ? "Fokus Sedang Berjalan" : "Siap Mulai?"}</p>
        </div>
        <div className="flex gap-3 mt-2">
          <button onClick={toggleTimer} className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg ${isTimerActive ? "bg-slate-800 text-white" : "bg-rose-600 text-white"}`}>
            {isTimerActive ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start</>}
          </button>
          <button onClick={() => { setIsTimerActive(false); setTimeLeft(25 * 60); }} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. Note */}
      <div className="bg-amber-100 text-amber-900 rounded-3xl p-6 shadow-xl flex flex-col relative focus-within:bg-amber-50">
        <div className="flex items-center gap-2 mb-2 font-bold opacity-70">
          <StickyNote className="w-5 h-5" /> <span>Catatan</span>
        </div>
        <textarea
          className="flex-1 w-full bg-transparent border-none resize-none focus:ring-0 placeholder-amber-900/40 text-lg leading-relaxed font-medium min-h-30 custom-scrollbar"
          placeholder="Ide..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}