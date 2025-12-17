import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const staticReports = [
  { id: 1, org: "St Peters Church", score: 82, static: true },
  { id: 2, org: "Hope Community", score: 57, static: true },
];

export default function Dashboard() {
  const [savedReports, setSavedReports] = useState([]);

  useEffect(() => {
    const reports = [];
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith("report_")) {
        try {
          const r = JSON.parse(localStorage.getItem(key));
          reports.push({
            id: r.id,
            org: r.answers?.organisation || "Unnamed organisation",
            score: r.overall || 0,
            static: false,
          });
        } catch (e) {
          // ignore parse errors
        }
      }
    }
    setSavedReports(reports);
  }, []);

  const allReports = [...savedReports, ...staticReports];

  const getScoreBadgeClass = (score) => {
    if (score >= 80) return "bg-emerald-50 text-emerald-700";
    if (score >= 60) return "bg-amber-50 text-amber-700";
    return "bg-rose-50 text-rose-700";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Low risk";
    if (score >= 60) return "Medium risk";
    return "High risk";
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7ff] via-[#f9fcff] to-[#fffdfa]" />
      <div className="absolute top-16 -left-40 w-[420px] h-[420px] bg-[#7446d8] opacity-30 rounded-full blur-3xl" />
      <div className="absolute top-20 -right-52 w-[520px] h-[520px] bg-[#09aa9d] opacity-30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#f4a623] opacity-40 rotate-45 rounded-xl blur-xl" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-20 pb-16 space-y-8">
        {/* Header / intro */}
        <div className="mb-2">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#7446d8]">
            Dashboard
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
            Compliance overview
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Start a new assessment or review saved reports for your churches and charities.
          </p>
        </div>

        {/* Start new card */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              Start new compliance check
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md">
              Launch the guided questionnaire to generate a fresh AI-assisted assessment
              for a new church or charity website.
            </p>
          </div>
          <Link
            to="/questionnaire"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#09aa9d] hover:bg-teal-700 text-white text-sm font-semibold rounded-xl shadow-lg transition transform hover:scale-105"
          >
            Start assessment →
          </Link>
        </div>

        {/* Reports list */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Reports</h3>
            {allReports.length > 0 && (
              <span className="text-xs text-gray-500">
                {allReports.length} total reports
              </span>
            )}
          </div>

          {allReports.length === 0 && (
            <p className="text-sm text-gray-500">
              No reports yet. Start a questionnaire to generate your first report.
            </p>
          )}

          <div className="divide-y divide-gray-100 mt-2">
            {allReports.map((r) => (
              <div
                key={`${r.static ? "static" : "dyn"}-${r.id}`}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <div className="font-medium text-gray-900">{r.org}</div>
                  <div className="flex items-center gap-2 mt-1">
                    {r.static && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                        Example report
                      </span>
                    )}
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${getScoreBadgeClass(
                        r.score
                      )}`}
                    >
                      {getScoreLabel(r.score)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {r.score}%
                  </span>
                  {!r.static ? (
                    <Link
                      to={`/report/${r.id}`}
                      className="text-xs font-semibold text-[#7446d8] hover:text-[#5b34af] transition"
                    >
                      View report
                    </Link>
                  ) : (
                    <button
                      className="text-xs text-gray-400 cursor-default"
                      disabled
                    >
                      Demo
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
