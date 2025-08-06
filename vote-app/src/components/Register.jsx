import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const text = await res.text();
      setMessage(text);
      if (res.ok) setTimeout(() => navigate("/login"), 1200);
    } catch {
      setMessage("Registration failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-16 p-8 bg-white text-black dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg"
    >
      <h2 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-6 text-center">
        Register
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <motion.div whileFocus={{ scale: 1.02 }} className="relative">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg focus:border-indigo-500 focus:outline-none transition"
            required
          />
        </motion.div>

        <motion.div whileFocus={{ scale: 1.02 }} className="relative">
          <input
            name="password"
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg focus:border-indigo-500 focus:outline-none transition pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition"
        >
          Sign Up
        </motion.button>
      </form>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300"
        >
          {message}
        </motion.p>
      )}

      <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Login here
        </Link>
      </p>
    </motion.div>
  );
};

export default Register;
