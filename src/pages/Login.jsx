import '../index.css';
import quizLogo from '../assets/quizgen.png';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="flex flex-col h-screen items-center justify-center text-center overscroll-behavior-none">
      <img src={quizLogo} alt="Quiz Generator Logo" className="h-60 max-w-lg mx-auto" />
      <button>
      <div className="hover:bg-blue-200 flex items-center space-x-2 mb-6 bg-white px-4 py-2 rounded-full shadow">
        <Link
          to="/login"
           >
          Login
        </Link>
        </div>
        </button>
        <p className="mt-4 text-sm">
        New here?{" "}
        <Link 
        className="text-blue-600 font-semibold hover:underline" 
        to="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
