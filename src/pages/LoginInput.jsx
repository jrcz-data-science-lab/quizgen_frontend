import '../index.css';
import quizLogo from '../assets/quizgen.png';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

function LoginInput() {
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Use Supabase auth to sign in
    try {
      const { data: session, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message || 'Login failed');
        setShowPopup(true);
        return;
      }

      // On success, supabase returns session data; navigate to dashboard
      if (session) navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Unexpected error');
      setShowPopup(true);
    }
  };
  
  return(
    <div className="flex flex-col h-screen items-center justify-center bg-linear-to-b from-blue-100 to-blue-200 text-center">
          <img src={quizLogo} alt="Quiz Generator Logo" className="h-60 max-w-lg mx-auto" />

    <div className="flex flex-col items-center mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800"></h2>

        <form
          onSubmit={handleLogin}
          className="flex flex-col w-72 bg-white p-6 rounded-lg shadow-md"
        >
          <label className="text-gray-700 mb-1 font-medium">Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="text-gray-700 mb-1 font-medium">Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

    {showPopup && (
      <div className="fixed inset-0 flex items-center justify-center">

      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            
            <h3 className="text-lg font-bold text-red-600 mb-2">Login Failed</h3>
            <p className="text-gray-700 mb-4">{error}</p>

            <p className="text-sm text-gray-600 mb-4">
              Dont have an account?
              <Link to="/signup" className="text-blue-600 font-semibold hover:underline ml-1">
                Register here
              </Link>
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Close
            </button>

          </div>

        </div>
      )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition-colors duration-300"
          >
            Login
          </button>
        </form>
        </div>

      </div>
  );
}

export default LoginInput;