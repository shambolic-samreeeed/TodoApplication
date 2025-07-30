"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../library/api";
import { getToken, removeToken } from "../library/auth";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };
    fetchTasks();
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <header className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-3xl font-bold text-green-400 ">Task Manager</h1>
          <p className="text-gray-300 text-sm">Stay organized and get things done!</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>
      <section className="mb-8">
        <TaskForm setTasks={setTasks} />
      </section>
      <section>
        <TaskList tasks={tasks} setTasks={setTasks} />
      </section>
    </main>
  );
}
