"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../library/api";
import { setToken } from "../library/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { name, email, password });
      setToken(res.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.msg || "Register failed");
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-10 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-gray-700 text-white rounded-md px-4 py-3 outline-none 
                     focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 transition-shadow"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          className="bg-gray-700 text-white rounded-md px-4 py-3 outline-none 
                     focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 transition-shadow"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-700 text-white rounded-md px-4 py-3 outline-none 
                     focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 transition-shadow"
        />
        <button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold 
                     rounded-md py-3 transition"
        >
          Register
        </button>
      </form>
    </main>
  );
}
