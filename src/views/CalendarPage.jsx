import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { Calendar as CalendarIcon, Plus, Trash2, Clock } from "lucide-react";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  
  // 1. Load data agenda dari LocalStorage
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("dashboard_events");
    return saved ? JSON.parse(saved) : {};
  });

  // 2. Simpan otomatis setiap ada perubahan
  useEffect(() => {
    localStorage.setItem("dashboard_events", JSON.stringify(events));
  }, [events]);

  // Helper untuk membuat key tanggal unik (format: DD/MM/YYYY)
  const getDateKey = (d) => d.toLocaleDateString("id-ID");
  const selectedKey = getDateKey(date);
  const todaysEvents = events[selectedKey] || [];

  // 3. Fungsi Tambah Agenda
  const addEvent = () => {
    const title = prompt("Mau melakukan apa?");
    if (!title) return;
    const time = prompt("Jam berapa? (Cth: 09:00 - 10:00)") || "Sepanjang hari";

    const newEvent = { id: Date.now(), title, time };
    
    setEvents((prev) => ({
      ...prev,
      [selectedKey]: [...(prev[selectedKey] || []), newEvent],
    }));
  };

  // 4. Fungsi Hapus Agenda
  const deleteEvent = (eventId) => {
    if(!window.confirm("Hapus agenda ini?")) return;
    setEvents((prev) => ({
      ...prev,
      [selectedKey]: prev[selectedKey].filter((e) => e.id !== eventId),
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Kolom Kalender */}
      <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <CalendarIcon className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Jadwal Bulanan</h2>
        </div>
        <div className="flex-1 flex justify-center items-start pt-4">
          <Calendar onChange={setDate} value={date} className="w-full max-w-xl" locale="id-ID" />
        </div>
      </div>

      {/* Kolom Daftar Agenda */}
      <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col">
        <h3 className="text-xl font-bold text-slate-200 mb-4 flex justify-between items-center">
          <span>Agenda</span>
          <span className="text-sm font-normal text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
            {date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
          </span>
        </h3>
        
        <div className="space-y-3 overflow-y-auto pr-2 flex-1 custom-scrollbar min-h-50">
          {todaysEvents.length === 0 ? (
            <div className="text-center text-slate-600 py-10 italic">Tidak ada agenda.</div>
          ) : (
            todaysEvents.map((ev) => (
              <div key={ev.id} className="group p-4 rounded-2xl bg-slate-950 border-l-4 border-blue-500 shadow-sm relative hover:bg-slate-950/80 transition-colors">
                <p className="text-xs text-blue-400 font-bold mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {ev.time}
                </p>
                <h4 className="text-slate-200 font-semibold">{ev.title}</h4>
                <button 
                  onClick={() => deleteEvent(ev.id)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-opacity">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <button 
          onClick={addEvent}
          className="w-full mt-4 py-3 border-2 border-dashed border-slate-800 text-slate-500 rounded-xl hover:border-slate-600 hover:text-slate-300 transition-all flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" /> Tambah Agenda
        </button>
      </div>
    </div>
  );
}