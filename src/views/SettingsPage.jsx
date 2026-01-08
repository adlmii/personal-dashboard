import { User, Save, AlertTriangle, Trash2 } from "lucide-react";

export default function SettingsPage({ userName, setUserName }) {
  const handleResetApp = () => {
    if (window.confirm("PERINGATAN: Hapus SEMUA data?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Pengaturan</h2>
      </div>
      <div className="space-y-6">
        {/* Profile */}
        <div className="bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-600/20 rounded-xl text-blue-500">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Profil</h3>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nama</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <div className="px-4 py-3 bg-emerald-500/10 text-emerald-500 rounded-xl text-sm font-bold flex items-center gap-2 border border-emerald-500/20">
                <Save className="w-4 h-4" /> Tersimpan
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-slate-900 rounded-3xl p-8 shadow-xl border border-red-900/30">
          <div className="flex items-center justify-between p-4 bg-red-950/30 border border-red-900/50 rounded-2xl">
            <div className="pr-4">
              <h4 className="font-bold text-red-200">Hapus Data</h4>
            </div>
            <button
              onClick={handleResetApp}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}