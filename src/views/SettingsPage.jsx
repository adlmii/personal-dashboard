import { User, CheckCircle2 } from "lucide-react";

export default function SettingsPage({ userName, setUserName }) {
  const handleResetApp = () => {
    if (window.confirm("⚠️ This will delete ALL your data. Continue?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-slate-400">Manage your dashboard preferences</p>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Profile Settings</h3>
              <p className="text-sm text-slate-400">Update your personal information</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Display Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              Changes saved automatically
            </div>
          </div>
        </div>

        <div className="bg-rose-500/5 border border-rose-500/20 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-rose-400 mb-4">Danger Zone</h3>
          <div className="flex items-center justify-between p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
            <div>
              <p className="font-medium text-white">Reset Application</p>
              <p className="text-sm text-slate-400">This will delete all your data permanently</p>
            </div>
            <button
              onClick={handleResetApp}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-all"
            >
              Reset Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}