import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import Question from "../components/Question";

export default function Questionnaire() {
  const { register, handleSubmit } = useForm();
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([
    {
      id: "organisation",
      text: "What is the name of your church or charity?",
      type: "text",
    },
    {
      id: "cookie_policy",
      text: "Do you have a cookies policy?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: "cookie_banner",
      text: "Does your website show a cookie consent banner?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: "data_map",
      text: "Do you maintain a personal data inventory?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: "special_data",
      text: "Do you process special category data?",
      type: "radio",
      options: ["Yes", "No", "Not sure"],
    },
  ]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const onSubmit = async (answers) => {
    const res = await fetch("http://127.0.0.1:8000/api/questionnaire/submit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answers }),
    });

    const data = await res.json();
    navigate(`/report/${data.id}`);
  };

  const currentQuestion = questions[index];

  return (
    <div className="max-w-xl mx-auto">
      <ProgressBar step={index + 1} total={questions.length} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Question q={currentQuestion} register={register} />
        <div className="flex justify-between mt-6">
          <button type="button" onClick={() => setIndex(Math.max(0, index - 1))}>
            Back
          </button>
          {index === questions.length - 1 ? (
            <button type="submit">Generate Report</button>
          ) : (
            <button onClick={(e) => { e.preventDefault(); setIndex(Math.min(questions.length - 1, index + 1)); }}>
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
