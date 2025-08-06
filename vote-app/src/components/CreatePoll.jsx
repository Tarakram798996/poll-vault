import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isLoggedIn, hasRole } from "../utils/auth";
import { Plus, X, CheckCircle } from "lucide-react";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn() || !hasRole("ROLE_ADMIN")) {
      alert("Access denied. Admins only.");
      navigate("/login");
    }
  }, [navigate]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredOptions = options
      .filter((opt) => opt.trim() !== "")
      .map((opt) => ({ voteOption: opt.trim(), voteCount: 0 }));

    const poll = {
      question: question.trim(),
      options: filteredOptions,
    };

    console.log("Submitting Poll:", poll); // 👈 ADD THIS

    if (filteredOptions.length < 2) {
      setMessage("❌ Please enter at least 2 valid options.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.post("http://localhost:8080/api/polls", poll, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      setMessage("✅ Poll created successfully!");
      setQuestion("");
      setOptions(["", ""]);
    } catch (error) {
      console.error("Error while creating poll:", error); // 👈 ADD THIS
      setMessage("❌ Failed to create poll.");
    }
  };


  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-800 dark:to-gray-900 p-6">
      <div className="w-full max-w-2xl backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-gray-300/20 dark:border-gray-600/40 p-8 rounded-2xl shadow-2xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-300">
          Create a New Poll
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-indigo-300 dark:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/70 dark:bg-gray-700/50"
            required
          />

          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-grow px-4 py-3 rounded-xl border border-indigo-300 dark:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/70 dark:bg-gray-700/50"
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="p-2 rounded-full bg-red-100/60 dark:bg-red-800/20 hover:bg-red-300/80 text-red-700 dark:text-red-300 transition"
                  title="Remove option"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}

          <div className="flex justify-between mt-4 gap-4 flex-wrap">
            <button
              type="button"
              onClick={handleAddOption}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/60 dark:bg-blue-800/20 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-600 hover:bg-blue-300/70 dark:hover:bg-blue-700/40 transition"
            >
              <Plus size={18} />
              Add Option
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-green-100/60 dark:bg-green-800/20 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-600 hover:bg-green-300/70 dark:hover:bg-green-700/40 transition"
            >
              <CheckCircle size={18} />
              Create Poll
            </button>
          </div>
        </form>

        {message && (
          <div className="text-center text-md font-medium text-indigo-700 dark:text-indigo-300 mt-4">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePoll;
