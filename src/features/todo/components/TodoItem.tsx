import { Trash2, ArrowUpCircle, CheckCircle, XCircle } from "lucide-react";
import { Todo } from "../types";
import { useTodoStore } from "../store";
import { cn } from "../../../lib/utils";
import { useToastStore } from "../../../lib/toast";

export function TodoItem({ todo }: { todo: Todo }) {
  const { updateStatus, deleteTodo, restoreTodo } = useTodoStore();
  const { addToast } = useToastStore();

  const isToday = todo.status === 'today';
  const isDone = todo.status === 'done';

  const handleDelete = () => {
    deleteTodo(todo.id);
    addToast(
      "Task deleted",
      "success",
      {
        label: "Undo", 
        onClick: () => {
          restoreTodo(todo);
        }
      }
    );
  };

  const handleDone = () => {
    updateStatus(todo.id, 'done');
    addToast("Great job! Task completed 🎉", "success");
  }

  return (
    <div className={cn(
      "group flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-200",
      
      isToday 
        ? "bg-orange-50 border-orange-200 shadow-sm"
        : isDone
        ? "bg-gray-50 border-transparent opacity-60"
        : "bg-(--bg-card) border-(--bg-subtle) hover:border-gray-300 shadow-sm"
    )}>
      
      <div className="flex-1">
        <h4 className={cn(
          "font-medium text-sm",
          isDone ? "text-(--text-muted) line-through" : "text-(--text-main)"
        )}>
          {todo.title}
        </h4>
        
        {/* Badge Status Kecil */}
        <span className={cn(
          "text-[10px] uppercase tracking-wider font-bold mt-1 inline-block",
          isToday ? "text-(--accent-primary)" : "text-(--text-muted)"
        )}>
          {todo.status}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm p-1 rounded-lg shadow-sm border border-gray-100">
        
        {/* Move to Backlog */}
        {isToday && (
          <button 
            onClick={() => updateStatus(todo.id, 'backlog')}
            className="p-1.5 text-gray-400 hover:text-(--accent-secondary) rounded-md"
          >
            <XCircle size={16} />
          </button>
        )}

        {/* Move to Today (Focus) */}
        {!isToday && !isDone && (
          <button 
            onClick={() => updateStatus(todo.id, 'today')}
            className="p-1.5 text-gray-400 hover:text-(--accent-primary) rounded-md"
          >
            <ArrowUpCircle size={16} />
          </button>
        )}

        {/* Mark Done */}
        {!isDone && (
          <button 
            onClick={handleDone}
            className="p-1.5 text-gray-400 hover:text-(--accent-success) rounded-md"
          >
            <CheckCircle size={16} />
          </button>
        )}

        {/* Delete */}
        <button 
          onClick={handleDelete}
          className="p-1.5 text-gray-400 hover:text-(--accent-danger) rounded-md"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>

    </div>
  );
}