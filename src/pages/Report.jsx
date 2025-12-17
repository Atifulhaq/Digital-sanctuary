import React from "react";
import { useParams } from "react-router-dom";
import ResultChart from "../components/ResultChart";

export default function Report() {
  const { id } = useParams();
  const raw = localStorage.getItem(`report_${id}`);

  // ---------- NOT FOUND STATE ----------
  if (!raw) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7ff] via-[#f9fcff] to-[#fffdfa]" />
        <div className="absolute top-10 -left-40 w-[450px] h-[450px] bg-[#7446d8] opacity-30 rounded-full blur-3xl" />
        <div className="absolute top-32 -right-48 w-[550px] h-[550px] bg-[#09aa9d] opacity-30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#f4a623] opacity-40 rotate-45 rounded-xl blur-xl" />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Report not found
            </h2>
            <p className="text-gray-500 text-sm">
              We couldn&apos;t find a saved report for this link. Please go back
              to the questionnaire and generate a new report.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ---------- NORMAL REPORT ----------
  const report = JSON.parse(raw);
  const { answers, scores, overall } = report;

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background FULL SCREEN */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7ff] via-[#f9fcff] to-[#fffdfa]" />
      <div className="absolute top-10 -left-40 w-[450px] h-[450px] bg-[#7446d8] opacity-30 rounded-full blur-3xl" />
      <div className="absolute top-32 -right-48 w-[550px] h-[550px] bg-[#09aa9d] opacity-30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#f4a623] opacity-40 rotate-45 rounded-xl blur-xl" />

      {/* CONTENT */}
      <div className="relative z-10 flex justify-center items-start pt-20 pb-20 px-4 min-h-screen">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 space-y-8">
          {/* Header / summary */}
          <div className="bg-gradient-to-r from-[#e2f2ff] to-[#fef6e7] p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-dsBlue uppercase">
                Digital Sanctuary
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                Compliance Report for{" "}
                {answers.organisation || "Organisation"}
              </h2>
              <p className="text-gray-600 text-xs md:text-sm mt-1">
                Generated: {new Date(report.created).toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md px-6 py-4 text-center">
              <div className="text-4xl font-extrabold text-[#09aa9d]">
                {overall}%
              </div>
              <p className="text-gray-600 text-xs mt-1">Overall Compliance</p>
            </div>
          </div>

          {/* Chart card */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
            <ResultChart scores={scores} />
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Recommendations
            </h3>
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
              {scores.GDPR < 70 && (
                <li>
                  Review your cookies policy and data inventory to improve GDPR
                  alignment.
                </li>
              )}
              {scores.PECR < 70 && (
                <li>
                  Implement a compliant cookie consent banner to meet PECR
                  requirements.
                </li>
              )}
              {scores.DUAA < 70 && (
                <li>
                  Assess how special category data is processed and ensure
                  safeguards.
                </li>
              )}
              {/* if all are fine, still show something */}
              {scores.GDPR >= 70 &&
                scores.PECR >= 70 &&
                scores.DUAA >= 70 && (
                  <li>
                    Your key compliance areas look strong. Continue to review
                    policies regularly and keep records up to date.
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
