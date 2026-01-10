import React, { useState, useEffect } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";


function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");
  const [editing, setEditing] = useState(false);
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        // Try Supabase auth first
        const { data } = await supabase.auth.getUser();
        const user = data?.user;
        if (user && mounted) {
          const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email || "Guest";
          setUserName(name);
        } else if (mounted) {
          // fallback to localStorage if not logged in or supabase not configured
          const stored = localStorage.getItem("app_user_name");
          if (stored) setUserName(stored);
        }
      } catch (err) {
        const stored = localStorage.getItem("app_user_name");
        if (stored && mounted) setUserName(stored);
      }
    }

    loadUser();

    // listen for auth changes to update name
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (user) {
        const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email || "Guest";
        setUserName(name);
      } else {
        const stored = localStorage.getItem("app_user_name") || "Guest";
        setUserName(stored);
      }
    });

    return () => {
      mounted = false;
      if (listener && listener.subscription) listener.subscription.unsubscribe();
    };
  }, []);

  const startEdit = () => {
    setInputName(userName === "Guest" ? "" : userName);
    setEditing(true);
  };

  const saveName = async () => {
    const newName = inputName.trim();
    if (!newName) return;

    // try to update Supabase user metadata; if not available, save to localStorage
    try {
      const { data, error } = await supabase.auth.updateUser({ data: { full_name: newName } });
      if (error) {
        // fallback to localStorage
        localStorage.setItem("app_user_name", newName);
      } else if (data?.user) {
        // updated successfully
        // nothing else needed; supabase client persists session
      }
    } catch (err) {
      localStorage.setItem("app_user_name", newName);
    }

    setUserName(newName);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-blue-50">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center py-4 px-6 shadow-md bg-white">
        <h1 className="text-xl font-semibold">QuizGenerator</h1>

        {/* Right User Menu */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">👤</div>
            {!editing ? (
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-sm font-medium" title="Open menu">
                {userName}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <button onClick={saveName} className="text-sm text-blue-600">Save</button>
                <button onClick={() => setEditing(false)} className="text-sm text-gray-600">Cancel</button>
              </div>
            )}
          </div>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 z-50">
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded">Edit Profile</Link>
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded">Saved quiz</Link>
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded">Settings</Link>
              <Link className="block px-3 py-2 hover:bg-gray-100 rounded">Tags</Link>
              <button onClick={startEdit} className="ml-2 text-xs text-blue-500">Edit</button>

              <hr className="my-1" />
              <button className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 rounded" onClick={() => navigate("/login")}>
                
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="p-6 flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}

export default Layout;