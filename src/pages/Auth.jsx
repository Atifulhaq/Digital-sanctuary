import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = (d) => {
    login({ name: d.fullName || "User", email: d.email });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background gradient + shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7ff] via-[#f9fcff] to-[#fffdfa]" />
      <div className="absolute top-20 -left-40 w-[450px] h-[450px] bg-[#7446d8] opacity-30 rounded-full blur-3xl" />
      <div className="absolute top-32 -right-52 w-[550px] h-[550px] bg-[#09aa9d] opacity-30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#f4a623] opacity-40 rotate-45 rounded-xl blur-xl" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-100">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#7446d8] mb-1">
            Digital Sanctuary
          </p>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Register / Login
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Create a session to save and revisit your compliance reports. No real
            authentication is performed in this prototype.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                {...register("fullName")}
                className="mt-1 border border-gray-300 w-full rounded-xl px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7446d8] focus:border-transparent"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...register("email")}
                required
                className="mt-1 border border-gray-300 w-full rounded-xl px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7446d8] focus:border-transparent"
                placeholder="Email"
                type="email"
              />
            </div>

            <button
              className="w-full mt-2 bg-[#7446d8] hover:bg-[#5f36b0] text-white py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
            >
              Continue
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            This is a prototype. Authentication will be connected to the backend in a later sprint.
          </p>
        </div>
      </div>
    </div>
  );
}
