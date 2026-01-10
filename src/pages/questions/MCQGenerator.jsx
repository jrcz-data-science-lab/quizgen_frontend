import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

export default function MCQGenerator() {
  const location = useLocation();
  const text = location.state?.text;
  const type = location.state?.type;

  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const generateMCQ = useCallback(async () => {
    setError(null);
    setQuiz(null); 

    try {
      const res = await fetch("http://localhost:8000/generate/mcq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

// Read JSON safely
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("Failed to parse JSON from backend:", jsonErr);
        throw new Error("Backend did not return valid JSON.");
      }

console.log("BACKEND RESPONSE:", data);

// Accept both shapes
if (!data.quiz || !data.quiz.mcq) {
  throw new Error("Unexpected response format from backend.");
}

setQuiz(data.quiz.mcq);

setError(null);
    } catch (err) {
      console.error("MCQ generation error:", err);
      setError(err.message || "Unknown error");
      setQuiz([]); // Prevent crashing UI
    }
  }, [text, type]);

  useEffect(() => {
    if (text) generateMCQ();
  }, [text, generateMCQ]);

  const handleExportToWord = async () => {
    if (!quiz) return;
    
    setIsExporting(true);
    try {
      const res = await fetch("http://localhost:8000/generate/export-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz: { mcq: quiz } }),
      });

      if (!res.ok) {
        throw new Error(`Export failed: ${res.status} ${res.statusText}`);
      }

      // Create a blob from the response
      const blob = await res.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quiz.docx';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export quiz: " + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  if (error)
    return <p className="p-6 text-center text-red-600">Error: {error}</p>;

  if (quiz === null)
    return <p className="p-6 text-center">Generating MCQs...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">
          Generated Multiple Choice Questions
        </h1>
        
        <button
          onClick={handleExportToWord}
          disabled={isExporting || !quiz || quiz.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {isExporting ? "Exporting..." : "Export to Word"}
        </button>
      </div>

      {quiz.map((q, index) => (
        <div key={index} className="mb-4 border p-4 rounded">
          <p className="font-semibold">
            {index + 1}. {q.question}
          </p>

          <ul className="mt-2 ml-4 list-disc">
            {q.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>

          <p className="mt-2 text-green-600">Correct answer: {q.answer}</p>
        </div>
      ))}
    </div>
  );
}
