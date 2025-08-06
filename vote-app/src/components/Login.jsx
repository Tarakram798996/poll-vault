// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = btoa(`${username}:${password}`);
    try {
      const testRes = await fetch("http://localhost:8080/api/polls", {
        method: "GET",
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      if (!testRes.ok) {
        alert("Invalid credentials");
        return;
      }

      const meRes = await fetch("http://localhost:8080/api/me", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      if (!meRes.ok) {
        alert("Failed to fetch user info");
        return;
      }

      const data = await meRes.json();
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("roles", JSON.stringify(data.roles));

      alert("Login successful");
      navigate("/");
      setTimeout(() => window.location.reload(), 0);
    } catch (err) {
      alert("Error during login");
    }
  };

  return (
    <motion.div
      className="h-[620px] flex items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="transform -translate-y-10 w-full max-w-md backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-white/40 dark:border-gray-700 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-white mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-400 transition-all">
            <User className="text-gray-500 dark:text-gray-300 mr-3" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-400 transition-all">
            <Lock className="text-gray-500 dark:text-gray-300 mr-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
