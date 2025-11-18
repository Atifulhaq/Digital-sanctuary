import React from "react";

export default function Question({ q, register }) {
  if (!q) return null; // safety check

  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="font-medium">{q.text}</p>

      {/* RADIO QUESTIONS */}
      {q.type === "radio" && Array.isArray(q.options) && (
        <>
          {q.options.map((opt, index) => (
            <label key={index} className="block mt-2">
              <input
                type="radio"
                value={opt}
                {...register(q.id)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </>
      )}

      {/* HANDLE NO OPTIONS SAFELY */}
      {q.type === "radio" && (!Array.isArray(q.options) || q.options.length === 0) && (
        <p className="mt-2 text-red-600 text-sm">
          ⚠ No options provided for this question.
        </p>
      )}

      {/* TEXT INPUT */}
      {q.type === "text" && (
        <input
          className="border p-2 rounded w-full mt-3"
          {...register(q.id)}
        />
      )}

      {/* FILE INPUT */}
      {q.type === "file" && (
        <input type="file" className="mt-3" {...register(q.id)} />
      )}
    </div>
  );
}