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
    <main style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </main>
  );
}
