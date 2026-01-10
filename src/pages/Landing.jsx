import quizLogo from "../assets/quizgen.png";
import "../index.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-linear-to-br from-blue-100 via-white to-blue-200 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">


      {/* Logo */}
      <img 
        src={quizLogo}
        alt="Quiz Generator"
        className="h-48 mb-4 animate-fadeIn"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeInSlow">
        Welcome to BetterLearn
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-md mb-6 animate-fadeInSlow">
        Upload your notes and instantly generate engaging quizzes to improve your learning experience.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => navigate("/view")}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 animate-fadeInSlow"
      >
        Get Started →
      </button>
    </div>
  );
}

export default Landing;
