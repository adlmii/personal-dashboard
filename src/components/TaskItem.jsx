import { useState } from "react";
import { CheckCircle2, Circle, Trash2, Pencil } from "lucide-react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() !== "") {
      onEdit(task.id, editText);
    } else {
      setEditText(task.text); // Reset jika kosong
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };

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

      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-slate-900 text-white px-2 py-1 rounded outline-none border border-blue-500/50"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          onClick={() => onToggle(task.id)}
          className={`flex-1 cursor-pointer transition-all select-none truncate ${
            task.completed ? "text-slate-600 line-through decoration-slate-700" : "text-slate-300"
          }`}
          title="Klik 2x untuk edit"
        >
          {task.text}
        </span>
      )}

      {/* Tombol Edit Manual (Opsional, agar user sadar bisa edit) */}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-blue-400 p-2 transition-all"
        >
          <Pencil className="w-4 h-4" />
        </button>
      )}

      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-rose-400 hover:bg-rose-400/10 p-2 rounded-lg transition-all"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}