// src/pages/Dashboard.jsx
import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import quizLogo from "../assets/quizgen.png";


function Dashboard() {
  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-4 italic">WELCOME TO</h2>

      <img 
        src={quizLogo} 
        alt="Quiz Generator Logo" 
        className="w-64 mb-6 rounded-lg"
      />

      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link
          to="/upload"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-md text-lg text-center"
        >
          Upload Learning Materials
        </Link>
        <button className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg shadow-md text-lg">
          Generate Quiz with Prompts
        </button>
      </div>
    </Layout>
  );
}

export default Dashboard;
