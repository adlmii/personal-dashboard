import { Flame, CheckCircle, Target } from "lucide-react";
import { useDashboardStore } from "../store";
import { useEffect } from "react";

export function StatsCard() {
  const { stats, loadStats } = useDashboardStore();

  useEffect(() => {
    loadStats();
  }, []);

  const cardStyle = "bg-[var(--bg-card)] border border-[var(--bg-subtle)] p-4 rounded-xl flex items-center gap-4 shadow-sm";

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      
      {/* 1. FOCUS MINUTES */}
      <div className={cardStyle}>
        <div className="p-3 bg-orange-100 text-(--accent-primary) rounded-lg">
          <Flame size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-(--text-main)">{stats.focusMinutes}</p>
          <p className="text-xs text-(--text-muted) uppercase tracking-wider">Mins Focused</p>
        </div>
      </div>

      {/* 2. TASKS COMPLETED */}
      <div className={cardStyle}>
        <div className="p-3 bg-green-100 text-(--accent-success) rounded-lg">
          <CheckCircle size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-(--text-main)">{stats.tasksCompleted}</p>
          <p className="text-xs text-(--text-muted) uppercase tracking-wider">Tasks Done</p>
        </div>
      </div>

      {/* 3. DAILY PROGRESS */}
      <div className={cardStyle}>
        <div className="p-3 bg-blue-100 text-(--accent-secondary) rounded-lg">
          <Target size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-(--text-main)">
            {stats.tasksTotal === 0 ? 0 : Math.round((stats.tasksCompleted / stats.tasksTotal) * 100)}%
          </p>
          <p className="text-xs text-(--text-muted) uppercase tracking-wider">Daily Goal</p>
        </div>
      </div>

    </div>
  );
}