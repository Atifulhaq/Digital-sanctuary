import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/30 shadow-lg 
      bg-gradient-to-r from-[#f5f7ff]/60 via-[#f9fcff]/70 to-[#fffdfa]/60">
      
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r 
            from-[#7446d8] via-[#09aa9d] to-[#f4a623] 
            bg-clip-text text-transparent drop-shadow-sm"
        >
          Digital Sanctuary
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center text-sm font-medium text-gray-700">

          <Link
            to="/questionnaire"
            className="hover:text-[#7446d8] transition-all"
          >
            Questionnaire
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-[#7446d8] transition-all"
          >
            Reports
          </Link>

          {/* Auth Section */}
          {user ? (
            <>
              <span className="text-gray-600 font-semibold">{user.name}</span>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 
                transition font-semibold shadow"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="px-5 py-2 bg-gradient-to-r from-[#7446d8] to-[#09aa9d] 
              hover:brightness-110 text-white rounded-xl shadow-lg 
              transition transform hover:scale-105"
            >
              Login / Sign up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
