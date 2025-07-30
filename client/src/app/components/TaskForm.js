import { useState } from "react";
import api from "../library/api";
import { getToken } from "../library/auth";

export default function TaskForm({ setTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await api.post(
      "/tasks",
      { title, description },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    setTasks((prev) => [...prev, res.data]);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleAdd}
      className="flex flex-col gap-4 bg-gray-700 p-6 rounded-lg shadow text-white"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description...."
        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="self-center w-[100%] px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Add Task
      </button>
    </form>
  );
}
