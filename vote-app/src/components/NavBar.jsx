import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Home,
  LogIn,
  LogOut,
  PlusCircle,
  Vote,
  UserPlus,
  Moon,
  Sun,
} from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const isLoggedIn = !!token;
  const isAdmin = roles.includes("ROLE_ADMIN");

  const [username, setUsername] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    navigate("/login");
  };

  return (
   <nav className="bg-indigo-600 dark:bg-gray-900 text-white py-4 px-8 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <Vote size={24} /> PollVault
      </div>

      <div className="flex items-center gap-6 text-base">
        <Link to="/" className="flex items-center gap-1 hover:underline">
          <Home size={18} /> Home
        </Link>

        {isLoggedIn && isAdmin && (
          <Link to="/create" className="flex items-center gap-1 hover:underline">
            <PlusCircle size={18} /> Create Poll
          </Link>
        )}

        {isLoggedIn && (
          <Link to="/vote" className="flex items-center gap-1 hover:underline">
            <Vote size={18} /> Vote
          </Link>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login" className="flex items-center gap-1 hover:underline">
              <LogIn size={18} /> Login
            </Link>
            <Link to="/register" className="flex items-center gap-1 hover:underline">
              <UserPlus size={18} /> Register
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <span className="font-semibold text-white dark:text-gray-200">
              Hi, {username}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </>
        )}

        {/* 🌙 Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-indigo-500 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
