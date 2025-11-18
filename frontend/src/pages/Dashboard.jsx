import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const staticReports = [
  { id: 1, org: "St Peters Church", score: 82, static: true },
  { id: 2, org: "Hope Community", score: 57, static: true },
];

export default function Dashboard() {
  const [savedReports, setSavedReports] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/questionnaire/my/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          setSavedReports([]); // fallback
          return;
        }

        const data = await res.json();

        // Ensure ALWAYS an array
        const arr = Array.isArray(data) ? data : data.results || [];

        const formatted = arr.map((r) => ({
          id: r.id,
          org: r.answers?.organisation || "Unnamed organisation",
          score: r.overall || 0,
          static: false,
        }));

        setSavedReports(formatted);
      } catch (e) {
        console.error("Failed loading reports:", e);
        setSavedReports([]);
      }
    };

    loadReports();
  }, [token]);

  const allReports = [...savedReports, ...staticReports];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Start New Compliance Check</h3>
        <Link
          to="/questionnaire"
          className="mt-3 inline-block bg-dsGreen text-white px-4 py-2 rounded"
        >
          Start
        </Link>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Reports</h3>

        {allReports.length === 0 && (
          <p className="text-sm text-gray-500">
            No reports yet. Start a questionnaire to generate your first report.
          </p>
        )}

        {allReports.map((r) => (
          <div
            key={`${r.static ? "static" : "dyn"}-${r.id}`}
            className="border-b p-3 flex justify-between items-center last:border-b-0"
          >
            <div>
              <div className="font-medium">{r.org}</div>
              {r.static && (
                <div className="text-xs text-gray-400">Example report</div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span>{r.score}%</span>
              {!r.static ? (
                <Link to={`/report/${r.id}`} className="text-dsBlue text-sm">
                  View
                </Link>
              ) : (
                <button className="text-gray-400 text-sm" disabled>
                  Demo
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}