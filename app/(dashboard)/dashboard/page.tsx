"use client";

import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import { useSession } from "next-auth/react";

interface Task {
  _id: string;
  title: string;
  notes: string;
  completed: boolean;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="relative z-10 animate-fade-in-up">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="mb-12 text-center sm:text-left relative">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
          Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{session?.user?.name?.split(" ")[0] || "User"}</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
          Let's crush your goals today.
        </p>
      </div>

      <TaskForm onSuccess={fetchTasks} />

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Your Tasks
            <span className="text-sm px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-full font-medium border border-cyan-500/20">
              {tasks.length}
            </span>
          </h2>
        </div>
        
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse glass-panel h-32 rounded-2xl"></div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-3xl border-dashed border-2 border-border/50">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/10 mb-5">
              <svg className="w-10 h-10 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">You're all caught up!</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Add a new task above to get started.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {tasks.map((task, i) => (
              <div key={task._id} style={{ animationDelay: `${i * 100}ms` }} className="animate-fade-in-up" style={{animationFillMode: 'both'}}>
                <TaskCard task={task} onUpdate={fetchTasks} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
