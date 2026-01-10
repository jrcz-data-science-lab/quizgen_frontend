import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const originalText = location.state?.extractedText || "";
  const [text, setText] = useState(originalText);

  if (!originalText) {
    return (
      <div className="p-6">
        <p>No extracted text found.</p>
        <button 
          onClick={() => navigate("/upload")} 
          className="underline text-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleSave = async () => {
    // Later: save to Supabase or backend
    console.log("Saving:", text);

    alert("Saved successfully!");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white p-6 border rounded shadow">

        <h1 className="text-xl font-semibold mb-3">Edit Extracted Text</h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[400px] p-3 border rounded text-sm whitespace-pre-wrap"
        />

        <button
          onClick={handleSave}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>

        <button
          onClick={() => navigate("/upload")}
          className="mt-4 bg-amber-300 text-white px-4 py-2 rounded hover:bg-red-400 ml-35"
        >
          Back to Upload
        </button>

        <button
          onClick={() => navigate("/choose", { state: { text } })}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded ml-40 hover:bg-blue-700"
      >
          Continue 
        </button>

      </div>
    </div>
  );
}

export default EditPage;
