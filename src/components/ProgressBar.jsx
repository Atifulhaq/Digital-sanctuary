import React from "react";

export default function ProgressBar({ step, total }) {
  const pct = Math.round((step / total) * 100);

  return (
    <div className="my-6 w-full">
      {/* Step text */}
      <div className="text-xs font-semibold text-gray-600 mb-1 tracking-wide">
        Step {step} of {total}
      </div>

      {/* Progress background */}
      <div className="w-full h-3 bg-gray-200/60 rounded-full overflow-hidden shadow-inner">
        
        {/* Animated gradient fill */}
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7446d8] via-[#09aa9d] to-[#f4a623] transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Percent label */}
      <div className="text-right text-xs text-gray-500 mt-1 font-medium">
        {pct}% complete
      </div>
    </div>
  );
}
