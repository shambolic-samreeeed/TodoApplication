import { useState } from "react";
import {
  MdCheckCircle,
  MdCancel,
  MdDelete,
  MdEdit,
  MdSave,
} from "react-icons/md";
import api from "../library/api";
import { getToken } from "../library/auth";

export default function TaskItem({ task, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleToggle = async () => {
    const res = await api.put(
      `/tasks/${task._id}`,
      { completed: !task.completed },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    setTasks((prev) =>
      prev.map((t) => (t._id === res.data._id ? res.data : t))
    );
  };

  const handleDelete = async () => {
    await api.delete(`/tasks/${task._id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setTasks((prev) => prev.filter((t) => t._id !== task._id));
  };

  const handleSaveEdit = async () => {
    const res = await api.put(
      `/tasks/${task._id}`,
      { title: editTitle, description: editDescription },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    setTasks((prev) =>
      prev.map((t) => (t._id === res.data._id ? res.data : t))
    );
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-gray-700 text-white p-4 rounded shadow mb-2">
      <div className="flex flex-col flex-1 mr-4">
        {isEditing ? (
          <>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="mb-1 bg-gray-600 text-white rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 transition-shadow"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={2}
              className="bg-gray-600 text-white rounded-md px-3 py-2 resize-none outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 transition-shadow"
            />
          </>
        ) : (
          <>
            <h3
              className={`text-xl font-semibold ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </h3>
            <p className="text-gray-300 text-[12px] font-extralight">
              {task.description}
            </p>
          </>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-3 py-1 rounded-full ${
            task.completed
              ? "bg-yellow-600 hover:bg-yellow-700"
              : "bg-green-600 hover:bg-green-700"
          } transition`}
        >
          {task.completed ? (
            <MdCancel size={24} />
          ) : (
            <MdCheckCircle size={24} />
          )}
        </button>

        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 transition"
            >
              <MdSave size={24} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-500 hover:bg-gray-600 transition"
            >
              <MdCancel size={24} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-600 hover:bg-yellow-700 transition"
          >
            <MdEdit size={24} />
          </button>
        )}

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 transition"
        >
          <MdDelete size={24} />
        </button>
      </div>
    </div>
  );
}
