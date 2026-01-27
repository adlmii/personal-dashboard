import { useEffect, useState } from "react";
import { initDB } from "./lib/db";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./features/dashboard/Dashboard";
import { SettingsPage } from "./features/settings/SettingsPage";
import { ToastContainer } from "./components/ToastContainer";
import { useNavStore } from "./lib/nav";

function App() {
  const [isDbReady, setIsDbReady] = useState(false);
  const { currentView } = useNavStore();

  useEffect(() => {
    initDB().then(() => setIsDbReady(true));
  }, []);

  if (!isDbReady) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[var(--bg-main)] text-[var(--text-muted)] animate-pulse">
        Initializing FocusDeck...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden font-sans">
      
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
        
        {currentView === 'dashboard' && (
           <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-orange-100/40 to-transparent pointer-events-none" />
        )}

        <div className="relative z-10 max-w-5xl mx-auto">
          
          {/* Dashboard */}
          {currentView === 'dashboard' && (
            <header className="mb-8">
              <h2 className="text-3xl font-bold text-[var(--text-main)] mb-1">Good Morning, Maker.</h2>
              <p className="text-[var(--text-muted)]">Ready to find your flow?</p>
            </header>
          )}

          {/* ROUTER SWITCHER */}
          {currentView === 'dashboard' ? <Dashboard /> : <SettingsPage />}

        </div>
      </main>

      <ToastContainer />
    </div>
  );
}

export default App;