import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const onSubmit = async (d) => {
    setError("");
    const res = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: d.username, password: d.password }),
    });

    if (!res.ok) {
      setError("Invalid email or password.");
      return;
    }

    const data = await res.json();
    login(data.access); // <-- update auth context
    localStorage.setItem("refresh", data.refresh);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("username")}
          required
          className="border p-2 w-full rounded"
          placeholder="username"
        />
        <input
          {...register("password")}
          type="password"
          required
          className="border p-2 w-full rounded"
          placeholder="Password"
        />
        <button className="w-full bg-dsBlue text-white py-2 rounded">
          Continue
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
