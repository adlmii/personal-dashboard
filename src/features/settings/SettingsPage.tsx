import { useState } from "react";
import { 
  Trash2, Shield, AlertTriangle, ChevronDown, 
  Terminal, Cpu, Heart, Database, Code 
} from "lucide-react";
import { initDB } from "../../lib/db";
import { useToastStore } from "../../lib/toast";
import clsx from "clsx";

const AccordionItem = ({ icon: Icon, title, subtitle, children, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg ${isOpen ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'} transition-colors`}>
            <Icon size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">{title}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
          </div>
        </div>
        <div className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      
      <div className={clsx(
        "bg-gray-50/50 border-t border-gray-100 text-sm text-gray-600 transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "max-h-96 opacity-100 p-5" : "max-h-0 opacity-0 p-0"
      )}>
        {children}
      </div>
    </div>
  );
};

export function SettingsPage() {
  const { addToast } = useToastStore();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleHardReset = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    try {
      const db = await initDB();
      await db.execute("DELETE FROM todos");
      await db.execute("DELETE FROM sessions");
      addToast("System reset successful. Rebooting...", "success");
      setTimeout(() => window.location.reload(), 1500);
    } catch (e) {
      addToast("Reset failed.", "error");
    }
  };

  return (
    <div className="w-full max-w-5xl fade-in pb-12">
      
      {/* HEADER */}
      <header className="mb-8 pl-1">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Preferences & Application Info</p>
      </header>

      <div className="space-y-5">

        {/* GROUP 1: GENERAL INFO */}
        <section className="space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">General</p>
          
          <AccordionItem 
            icon={Heart} 
            title="App Philosophy" 
            subtitle="Why FocusDeck exists"
          >
             <p className="leading-relaxed mb-3 text-sm">
               FocusDeck dibangun dengan prinsip <strong>"Subtract to Add"</strong>. 
               Kami menghilangkan notifikasi cloud, fitur sosial, dan analitik rumit agar kamu bisa mendapatkan kembali fokusmu.
             </p>
             <p className="leading-relaxed text-sm">
               Simple tools for complex work.
             </p>
          </AccordionItem>

          <AccordionItem 
            icon={Code} 
            title="Tech Specifications" 
            subtitle="Version 1.0.0 (Stable)"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Engine</p>
                <div className="flex items-center gap-2 font-medium text-gray-800 p-2.5 bg-white border border-gray-200 rounded-lg text-sm">
                  <Terminal size={16} className="text-gray-500" /> Tauri v2
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">UI Library</p>
                <div className="flex items-center gap-2 font-medium text-gray-800 p-2.5 bg-white border border-gray-200 rounded-lg text-sm">
                  <Cpu size={16} className="text-gray-500" /> React + TypeScript
                </div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem 
            icon={Shield} 
            title="Data & Privacy" 
            subtitle="Local-first storage architecture"
          >
             <div className="flex gap-3 items-start">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md shrink-0 mt-0.5">
                  <Database size={16} />
                </div>
                <div>
                   <p className="font-bold text-gray-800 mb-1 text-sm">100% Offline Database</p>
                   <p className="leading-relaxed text-xs text-gray-600">
                     Semua data disimpan dalam file <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-700 font-mono">SQLite</code> lokal.
                     Tidak ada data yang dikirim ke cloud. Aman & Privat.
                   </p>
                </div>
             </div>
          </AccordionItem>
        </section>

        {/* GROUP 2: DANGER ZONE */}
        <section className="space-y-3 pt-4">
           <div className="flex items-center gap-2 px-1 mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Advanced Actions</span>
              <div className="h-px bg-gray-200 flex-1"></div>
           </div>

           <div className="bg-white border border-red-100 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all duration-300 group">
              <div className="flex gap-4">
                 <div className="p-3 bg-red-50 text-red-600 rounded-lg h-fit group-hover:scale-105 transition-transform duration-300">
                    <AlertTriangle size={20} />
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900 text-sm">Factory Reset</h3>
                    <p className="text-xs text-gray-500 max-w-md mt-1 leading-relaxed">
                       Menghapus database lokal secara permanen. Aplikasi akan di-restart dan data hilang selamanya.
                    </p>
                 </div>
              </div>

              <button
                onClick={handleHardReset}
                onMouseLeave={() => setConfirmDelete(false)}
                className={`shrink-0 px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  confirmDelete
                    ? "bg-red-600 text-white shadow-lg shadow-red-200 transform scale-105"
                    : "bg-white border border-red-200 text-red-600 hover:bg-red-50"
                }`}
              >
                <Trash2 size={16} />
                {confirmDelete ? "Click to Confirm" : "Reset Database"}
              </button>
           </div>
        </section>

      </div>
    </div>
  );
}