import React from "react";

export default function ProgressBar({ step, total }) {
  const pct = Math.round((step / total) * 100);

  return (
    <div className="my-4">
      <div className="text-sm mb-1">
        Step {step} of {total}
      </div>
      <div className="w-full bg-gray-200 h-3 rounded">
        <div
          className="h-3 bg-dsGreen rounded"
          style={{ width: `${pct}%` }}
        ></div>
      </div>
    </div>
  );
}
