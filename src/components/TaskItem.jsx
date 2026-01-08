import { CheckCircle2, Circle, Trash2 } from "lucide-react";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="group flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-transparent hover:border-slate-800 transition-all">
      <button
        onClick={() => onToggle(task.id)}
        className={`transition-colors ${
          task.completed ? "text-emerald-500" : "text-slate-600 hover:text-emerald-400"
        }`}
      >
        {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
      </button>

      <span
        onClick={() => onToggle(task.id)}
        className={`flex-1 cursor-pointer transition-all select-none ${
          task.completed ? "text-slate-600 line-through decoration-slate-700" : "text-slate-300"
        }`}
      >
        {task.text}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-rose-400 hover:bg-rose-400/10 p-2 rounded-lg transition-all"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}