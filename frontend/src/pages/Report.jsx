import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultChart from "../components/ResultChart";

export default function Report() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReport = async () => {
      const res = await fetch(
        `http://127.0.0.1:8000/api/questionnaire/my/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) return;

      const data = await res.json();

      // data is an array directly, find the matching report
      const s = data.find((x) => x.id === parseInt(id));
      setSubmission(s);
    };

    fetchReport();
  }, [id, token]);

  if (!submission) {
    return (
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
        Loading report...
      </div>
    );
  }

  const { answers, scores, overall, created_at } = submission;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-white p-4 rounded shadow flex justify-between">
        <div>
          <h2 className="text-lg font-bold">
            Compliance Report for {answers.organisation || "Organisation"}
          </h2>
          <p className="text-sm text-gray-600">
            Generated: {new Date(created_at).toLocaleString()}
          </p>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold">{overall}%</div>
          <p className="text-gray-600 text-sm">Overall Compliance</p>
        </div>
      </div>

      <ResultChart scores={scores} />

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Recommendations</h3>
        <ul className="list-disc pl-6 text-sm">
          {scores.GDPR < 70 && (
            <li>
              Review your cookies policy and data inventory to improve GDPR alignment.
            </li>
          )}
          {scores.PECR < 70 && (
            <li>
              Implement a compliant cookie consent banner to meet PECR requirements.
            </li>
          )}
          {scores.DUAA < 70 && (
            <li>
              Assess how special category data is processed and ensure safeguards.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}