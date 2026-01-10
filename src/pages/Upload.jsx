import '../index.css';
import React, { useState } from "react";
import quizLogo from "../assets/quizgen.png";
import folder from "../assets/folder-open.png";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(""); // <- extracted text
  const navigate = useNavigate();

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];

  const handleFileSelect = (event) => {
    const selected = event.target.files[0];
    validateFile(selected);
  };

  const validateFile = (selected) => {
    if (!selected) return;

    if (!allowedTypes.includes(selected.type)) {
      setError("Only PDF, DOCX, and PPTX files are allowed.");
      setFile(null);
      return;
    }

    if (selected.size > 80 * 1024 * 1024) {
      setError("File size must be less than 80MB.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selected);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const dropped = event.dataTransfer.files[0];
    validateFile(dropped);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  /** Upload to backend */
  const uploadFile = async () => {
    if (!file) return;

    setLoading(true);
    setResult("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      // extract_text backend runs on port 8001 by default; update if you run it elsewhere
      const res = await fetch("http://localhost:8001/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload");

      const data = await res.json();
        navigate("/edit", {
        state: { extractedText: data.extracted_text },
});
    } catch (err) {
      console.error(err);
      setError(err?.message || "Upload failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">

      {/* Logo */}
      <img src={quizLogo} alt="Quiz Generator Logo" className="h-32 mb-4" />

      <div className="w-full max-w-lg bg-white border p-6 rounded shadow-md">

        <label className="flex items-center gap-3 font-medium mb-3">
          <img src={folder} alt="file icon" className="h-6 w-6" />
          <span className="text-gray-700">Select files from local device</span>
        </label>

        <input
          type="file"
          accept=".pdf, .pptx, .docx"
          onChange={handleFileSelect}
          className="hidden"
          id="fileUpload"
        />

        <label
          htmlFor="fileUpload"
          className="cursor-pointer border-2 border-dashed border-gray-400 rounded-md p-8 flex flex-col items-center text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="text-5xl mb-2">⬇</div>
          <p className="text-gray-600">
            Click to select a file, or drag and drop it here.
          </p>
        </label>

        {file && (
          <div className="mt-3 flex items-center justify-between bg-white-50 p-3 rounded border border-black-300">
            <span className="text-gray-500 underline text-sm"> {file.name}</span>
            <button
              onClick={removeFile}
              className="text-red-600 text-xs underline hover:text-red-800"
            >
              Remove
            </button>
          </div>
        )}

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}

        <div className="mt-4 text-sm text-gray-600">
          <p>Maximum file size: <strong>80 MB</strong></p>
          <p>Maximum number of files: <strong>1</strong></p>
          <p>Accepted file types: <strong>.pdf, .pptx, .docx</strong></p>
        </div>

        {/* Upload Button */}
        <button
          disabled={!file || loading}
          onClick={uploadFile}
          className={`w-full mt-5 py-2 text-white rounded 
            ${file && !loading ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
          `}
        >
          {loading ? "Uploading…" : "Upload File"}
        </button>
      </div>

      {/* Show extracted text */}
      {result && (
        <div className="mt-6 w-full max-w-lg bg-white p-4 border rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2">Extracted Text</h2>
          <pre className="text-sm whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}

export default UploadPage;
