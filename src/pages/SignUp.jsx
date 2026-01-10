import '../index.css';
import quizLogo from '../assets/quizgen.png';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from '../lib/supabaseClient';

function SignInput() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create the user in Supabase
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message || 'Sign up failed');
        setLoading(false);
        return;
      }

      // After creating account, sign in to get a session
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message || 'Sign in after sign up failed');
        setLoading(false);
        return;
      }

      // Optionally, you could update user metadata with the name here.

      // Navigate to dashboard on success
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Unexpected error');
      setLoading(false);
    }
  };

  return(
    <div className="flex flex-col h-screen items-center justify-center bg-linear-to-b from-blue-100 to-blue-200 text-center">
          <img src={quizLogo} alt="Quiz Generator Logo" className="h-60 max-w-lg mx-auto" />

    <div className="flex flex-col items-center mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800"></h2>

        <form
          onSubmit={handleSignUp}
          className="flex flex-col w-72 bg-white p-6 rounded-lg shadow-md"
        >
          <label className="text-gray-700 mb-1 font-medium">Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />


          <label className="text-gray-700 mb-1 font-medium">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="text-gray-700 mb-1 font-medium">Password:</label>
          <input
             type="password"
            placeholder="set your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition-colors duration-300"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        </div>
      </div>
  );
}

export default SignInput;