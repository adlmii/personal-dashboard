import { useState } from "react";
import Calendar from "react-calendar";
import { Calendar as CalendarIcon, Plus } from "lucide-react";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
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
      <div className="bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col">
        <h3 className="text-xl font-bold text-slate-200 mb-4 flex justify-between">
          <span>Agenda</span>
          <span className="text-sm font-normal text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
            {date.toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
          </span>
        </h3>
        <div className="space-y-4 overflow-y-auto pr-2 flex-1 custom-scrollbar">
          <div className="p-4 rounded-2xl bg-slate-950 border-l-4 border-blue-500 shadow-sm">
            <p className="text-xs text-blue-400 font-bold mb-1">09:00 - 10:30</p>
            <h4 className="text-slate-200 font-semibold">Meeting</h4>
          </div>
          <button className="w-full py-3 border-2 border-dashed border-slate-800 text-slate-500 rounded-xl hover:border-slate-600 transition-all flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" /> Tambah
          </button>
        </div>
      </div>
    </div>
  );
}