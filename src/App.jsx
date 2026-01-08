import { useState, useEffect } from "react";

// Import Components
import Sidebar from "./components/Sidebar";
import Dashboard from "./views/Dashboard";
import SettingsPage from "./views/SettingsPage";
import CalendarPage from "./views/CalendarPage";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [userName, setUserName] = useState(() => localStorage.getItem("dashboard_username") || "Developer");
  
  useEffect(() => localStorage.setItem("dashboard_username", userName), [userName]);

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          {activeTab === "home" && <Dashboard userName={userName} />}
          {activeTab === "calendar" && <CalendarPage />}
          {activeTab === "settings" && <SettingsPage userName={userName} setUserName={setUserName} />}
        </div>
      </main>
    </div>
  );
}