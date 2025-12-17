import React from "react";

export default function Question({ q, register }) {
  return (
    <div>
      {/* Question text */}
      <p className="font-semibold text-gray-900 text-base mb-3">
        {q.text}
      </p>

      {/* RADIO OPTIONS */}
      {q.type === "radio" && (
        <div className="space-y-2 mt-2">
          {q.options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-3 px-4 py-2 rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-[#7446d8] hover:bg-[#f5f2ff] transition"
            >
              <input
                type="radio"
                value={opt}
                {...register(q.id)}
                className="h-4 w-4 text-[#7446d8] border-gray-300 focus:ring-[#7446d8]"
              />
              <span className="text-sm text-gray-800">{opt}</span>
            </label>
          ))}
        </div>
      )}

      {/* TEXT INPUT */}
      {q.type === "text" && (
        <input
          className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7446d8] focus:border-transparent"
          {...register(q.id)}
        />
      )}

      {/* FILE INPUT */}
      {q.type === "file" && (
        <div className="mt-3">
          <label className="inline-flex items-center px-4 py-2 rounded-xl border border-dashed border-gray-300 bg-white text-sm text-gray-700 cursor-pointer hover:border-[#09aa9d] hover:bg-[#f0fffc] transition">
            <span className="mr-2">📎 Upload file</span>
            <input
              type="file"
              className="hidden"
              {...register(q.id)}
            />
          </label>
          <p className="text-xs text-gray-400 mt-1">
            Optional: upload policies, screenshots, or supporting evidence.
          </p>
        </div>
      )}
    </div>
  );
}
