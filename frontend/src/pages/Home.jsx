import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-16 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-dsBlue">
        Digital compliance for UK churches and charities
      </h1>
      <p className="text-gray-600 mt-4">
        Get GDPR, PECR & DUAA compliance assessment in minutes.
      </p>

      <Link
        to="/questionnaire"
        className="inline-block mt-6 bg-dsGreen text-white px-6 py-3 rounded-lg"
      >
        Start Assessment
      </Link>
    </div>
  );
}
