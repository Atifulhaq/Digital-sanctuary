import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function ResultChart({ scores }) {
  
  const defaultScores = { GDPR: 0, PECR: 0, DUAA: 0 };
  const finalScores = { ...defaultScores, ...scores };

  const labels = Object.keys(finalScores);
  const data = {
    labels,
    datasets: [
      {
        label: "Compliance Score",
        data: labels.map((k) => finalScores[k]),
        fill: true,
        backgroundColor: "rgba(30, 111, 179, 0.3)",
        borderColor: "#1e6fb3",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="font-semibold mb-3">Compliance Radar</h3>
      <Radar data={data} />
    </div>
  );
}
