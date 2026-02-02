import { useEffect, useState } from "react";
import { initDB } from "./lib/db";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./features/dashboard/Dashboard";
import { SettingsPage } from "./features/settings/SettingsPage";
import { FocusPage } from "./features/focus/FocusPage";
import { TasksPage } from "./features/tasks/TasksPage";
import { ToastContainer } from "./components/ToastContainer";
import { useNavStore } from "./lib/nav";
import { useTodoStore } from "./features/todo/store";
import { useToastStore } from "./lib/toast";
import { useDashboardStore } from "./features/dashboard/store";
import { TitleBar } from "./components/TitleBar";

function App() {
  const [isDbReady, setIsDbReady] = useState(false);
  const { currentView } = useNavStore();
  const { resetTodayTasks } = useTodoStore();

useEffect(() => {
  const init = async () => {
    await initDB();
  
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now.getTime() - offset)).toISOString().slice(0, 10);
    const today = localISOTime; 

    const lastOpened = localStorage.getItem("last_opened_date");

    if (lastOpened && lastOpened !== today) {
      console.log(`🌞 New day detected! Resetting. Last: ${lastOpened}, Today: ${today}`);

      // 1. Ambil Stats
      const stats = await useDashboardStore.getState().getStatsForDate(lastOpened);
      
      console.log("📊 Stats found:", stats); // <--- CEK CONSOLE

      // 2. Tampilkan Toast (KITA HAPUS IF-NYA SEMENTARA UNTUK TESTING)
      // if (stats.tasksCompleted > 0 || stats.focusMinutes > 0) {  <--- KOMENTARI INI
         useToastStore.getState().addToast(
           `Daily Closure (${lastOpened}): ${stats.focusMinutes} mins focus · ${stats.tasksCompleted} tasks done.`,
           "info"
         );
      // } <--- KOMENTARI INI JUGA

      // 3. Reset Task Harian
      await resetTodayTasks();
    }
    
    localStorage.setItem("last_opened_date", today);
    setIsDbReady(true);
  };

  init();
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
      <TitleBar />
      
      <div className="flex flex-1 mt-8 overflow-hidden">
        <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
        
        {/* Background */}
        {currentView === 'dashboard' && (
           <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-orange-100/40 to-transparent pointer-events-none" />
        )}

        <div className="relative z-10 max-w-5xl mx-auto">
          
          {/* Header Dashboard */}
          {currentView === 'dashboard' && (
            <header className="mb-8">
              <h2 className="text-3xl font-bold text-[var(--text-main)] mb-1">Good Morning, Maker.</h2>
              <p className="text-[var(--text-muted)]">Ready to find your flow?</p>
            </header>
          )}

          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'focus' && <FocusPage />}
          {currentView === 'tasks' && <TasksPage />}
          {currentView === 'settings' && <SettingsPage />}

        </div>
      </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;