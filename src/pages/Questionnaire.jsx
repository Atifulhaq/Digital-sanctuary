import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import Question from "../components/Question";

const QUESTIONS = [
  { id: "organisation", text: "What is the name of your church or charity?", type: "text" },
  { id: "cookie_policy", text: "Do you have a cookies policy published on your website?", type: "radio", options: ["Yes", "No"] },
  { id: "cookie_banner", text: "Does your website show a cookie consent banner?", type: "radio", options: ["Yes", "No"] },
  { id: "data_map", text: "Do you maintain a personal data inventory?", type: "radio", options: ["Yes", "No"] },
  { id: "special_data", text: "Do you process any special category data?", type: "radio", options: ["Yes", "No", "Not sure"] },
  { id: "evidence", text: "Upload supporting evidence (optional)", type: "file" }
];

export default function Questionnaire() {
  const { register, handleSubmit } = useForm();
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const onSubmit = (answers) => {
    const scores = {
      GDPR: (answers.cookie_policy === "Yes" ? 40 : 15) + (answers.data_map === "Yes" ? 40 : 10),
      PECR: answers.cookie_banner === "Yes" ? 80 : 30,
      DUAA: answers.special_data === "Yes" ? 40 : 80
    };

    Object.keys(scores).forEach(k => scores[k] = Math.min(100, Math.max(0, Math.round(scores[k]))));
    const overall = Math.round((scores.GDPR + scores.PECR + scores.DUAA) / 3);

    const report = {
      id: Date.now(),
      created: new Date().toISOString(),
      answers,
      scores,
      overall
    };

    localStorage.setItem(`report_${report.id}`, JSON.stringify(report));
    navigate(`/report/${report.id}`);
  };

  const currentQuestion = QUESTIONS[index];

  return (
    <div className="min-h-screen w-full relative overflow-hidden">

      {/* Background gradient FULL SCREEN */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7ff] via-[#f9fcff] to-[#fffdfa]"></div>

      {/* Purple circle */}
      <div className="absolute top-10 -left-40 w-[450px] h-[450px] bg-[#7446d8] opacity-30 rounded-full blur-3xl"></div>

      {/* Teal circle */}
      <div className="absolute top-32 -right-48 w-[550px] h-[550px] bg-[#09aa9d] opacity-30 rounded-full blur-3xl"></div>

      {/* Orange accent */}
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#f4a623] opacity-40 rotate-45 rounded-xl blur-xl"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex justify-center items-start pt-20 pb-20 px-4 min-h-screen">

        <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Compliance Questionnaire
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Answer the questions to generate a compliance report for your organisation.
          </p>

          <ProgressBar step={index + 1} total={QUESTIONS.length} />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">

            <div className="bg-gray-50 rounded-2xl p-5 shadow-inner hover:shadow-md transition">
              <Question q={currentQuestion} register={register} />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIndex(prev => Math.max(0, prev - 1))}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl shadow transition">
                Back
              </button>

              {index === QUESTIONS.length - 1 ? (
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105">
                  Generate Report
                </button>
              ) : (
                <button
                  onClick={(e) => { e.preventDefault(); setIndex(prev => Math.min(QUESTIONS.length - 1, prev + 1)); }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105">
                  Next
                </button>
              )}
            </div>

            <p className="text-gray-500 text-xs text-center mt-4">
              Question {index + 1} of {QUESTIONS.length}
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}
