import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components & Views
import Sidebar from "./components/Sidebar";
import Dashboard from "./views/Dashboard";
import CalendarPage from "./views/CalendarPage";
import SettingsPage from "./views/SettingsPage";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [userName, setUserName] = useState(() => localStorage.getItem("dashboard_username") || "Developer");
  useEffect(() => localStorage.setItem("dashboard_username", userName), [userName]);

  // Animasi Variabel
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-blue-500 selection:text-white">
      
      {/* 1. Sidebar (Dumb Component) */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-950 relative custom-scrollbar">
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-full">
          
          <AnimatePresence mode="wait">
            
            {/* RENDER DASHBOARD */}
            {activeTab === "home" && (
              <motion.div
                key="home"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 flex items-center gap-3 opacity-80 lg:hidden">
                  <h1 className="text-xl font-bold tracking-wide">Personal Dashboard</h1>
                </div>
                {/* Dashboard Smart View */}
                <Dashboard userName={userName} />
              </motion.div>
            )}

            {/* RENDER CALENDAR */}
            {activeTab === "calendar" && (
              <motion.div
                key="calendar"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <CalendarPage />
              </motion.div>
            )}

            {/* RENDER SETTINGS */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {/* Settings Smart View (Pass props untuk ubah nama) */}
                <SettingsPage userName={userName} setUserName={setUserName} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;