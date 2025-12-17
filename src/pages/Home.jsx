import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f7ff] via-[#f9fcff] to-[#fffdfa]" />

      {/* Purple circle left */}
      <div className="absolute top-32 -left-40 w-[450px] h-[450px] bg-[#7446d8] opacity-30 rounded-full blur-3xl" />

      {/* Teal circle right */}
      <div className="absolute top-10 -right-56 w-[600px] h-[600px] bg-[#09aa9d] opacity-30 rounded-full blur-3xl" />

      {/* Orange accent */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#f4a623] opacity-40 rotate-45 rounded-xl blur-xl" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">

        {/* Mini badge */}
        <div className="bg-teal-600 text-white px-4 py-1 rounded-full text-xs font-semibold tracking-wide mb-4 shadow">
          Empowering UK Faith Organisations
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Digital compliance for UK<br />
          <span className="text-[#7446d8]">churches</span> and{" "}
          <span className="text-[#09aa9d]">charities</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mt-4 max-w-xl text-[15px]">
          Get GDPR, PECR & DUAA compliance assessment in minutes using AI-assisted analysis.
          Simple, fast, and built for small organisations.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/questionnaire"
            className="bg-dsGreen hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg transition transform hover:scale-105"
          >
            Start Assessment →
          </Link>

          <a
            href="#learn-more"
            className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-xl text-lg font-semibold shadow transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
