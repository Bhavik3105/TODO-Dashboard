"use client";

import { useState } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface TaskProps {
  task: {
    _id: string;
    title: string;
    notes: string;
    completed: boolean;
  };
  onUpdate: () => void;
}

export default function TaskCard({ task, onUpdate }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [notes, setNotes] = useState(task.notes);
  const [isLoading, setIsLoading] = useState(false);

  const toggleCompletion = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (res.ok) {
        onUpdate();
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, notes }),
      });
      if (res.ok) {
        setIsEditing(false);
        onUpdate();
        toast.success("Task updated");
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onUpdate();
        toast.success("Task deleted");
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="glass-panel rounded-2xl p-6 shadow-xl shadow-cyan-900/5 transition-all duration-300 animate-fade-in-up">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-xl font-bold bg-transparent border-b-2 border-border/50 focus:outline-none focus:border-cyan-500 mb-4 pb-2 text-gray-900 dark:text-white transition-colors"
          placeholder="Task title"
          disabled={isLoading}
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full text-base bg-white/10 dark:bg-black/20 border border-border/50 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 min-h-[100px] mb-4 text-gray-700 dark:text-gray-200 resize-none"
          placeholder="Notes (optional)"
          disabled={isLoading}
        />
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setIsEditing(false)}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/25 disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
            disabled={isLoading}
          >
            <FaCheck /> Save Changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`group glass-panel rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fade-in-up relative overflow-hidden ${task.completed ? 'opacity-80 hover:opacity-100 hover:shadow-cyan-900/10' : 'hover:shadow-cyan-500/10'}`}>
      
      {/* Decorative gradient blur */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 blur-3xl rounded-full opacity-20 transition-all duration-500 ${task.completed ? 'bg-green-500' : 'bg-cyan-500 group-hover:bg-purple-500'}`} />

      <div className="flex items-start justify-between gap-5 relative z-10">
        <div className="flex items-start gap-4 flex-1">
          <button 
            onClick={toggleCompletion}
            disabled={isLoading}
            className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 disabled:opacity-50 hover:scale-110 ${task.completed ? 'bg-gradient-to-br from-green-400 to-emerald-600 border-transparent text-white shadow-lg shadow-green-500/30' : 'border-gray-400 dark:border-gray-500 hover:border-cyan-500 dark:hover:border-cyan-400'}`}
          >
            {task.completed && <FaCheck size={12} className="animate-fade-in-up" />}
          </button>
          <div className="flex-1">
            <h3 className={`text-xl font-bold transition-all duration-300 ${task.completed ? 'text-gray-400 dark:text-gray-500 line-through decoration-2 decoration-gray-400/50' : 'text-gray-900 dark:text-white'}`}>
              {task.title}
            </h3>
            {task.notes && (
              <p className={`mt-2 text-sm leading-relaxed transition-all duration-300 ${task.completed ? 'text-gray-400 dark:text-gray-600' : 'text-gray-600 dark:text-gray-300'}`}>
                {task.notes}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
            className="p-2.5 text-gray-500 hover:text-cyan-500 bg-white/50 dark:bg-black/30 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 rounded-xl transition-all duration-200 disabled:opacity-50 hover:scale-110 shadow-sm"
            aria-label="Edit task"
          >
            <FaEdit size={16} />
          </button>
          <button 
            onClick={handleDelete}
            disabled={isLoading}
            className="p-2.5 text-gray-500 hover:text-red-500 bg-white/50 dark:bg-black/30 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 disabled:opacity-50 hover:scale-110 shadow-sm"
            aria-label="Delete task"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
