import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { BarChart, Eye, Pencil, Trash2 } from "lucide-react";


const PollList = () => {
  const [polls, setPolls] = useState([]);
  const token = localStorage.getItem("authToken");
  const [error, setError] = useState("");
  const isLoggedIn = !!token;
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const isAdmin = roles.includes("ROLE_ADMIN");

  useEffect(() => {
    if (isLoggedIn) {
      api.get("/polls")
        .then((res) => setPolls(res.data))
        .catch((err) => {
          console.error("API Error:", err);
          setError("Could not fetch polls");
        });
    } else {
      setError("Please Login to view polls");
    }
  }, [isLoggedIn]);


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this poll?")) {
      api.delete(`/polls/${id}`)
        .then(() => {
          alert("Poll deleted successfully!");
          setPolls(prev => prev.filter(p => p.id !== id));
        })
        .catch((err) => {
          console.error("Delete Error:", err);
          alert("Failed to delete the poll.");
        });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-5xl font-extrabold text-center text-indigo-700 dark:text-indigo-300 mb-12 drop-shadow-md flex justify-center items-center gap-2">
        <BarChart className="w-8 h-8" />
        Live Polls Dashboard
      </h2>

      {error && (
        <p className="text-red-500 dark:text-red-300 text-center mb-6 text-lg">{error}</p>
      )}

      {polls.length === 0 && !error && (
        <p className="text-gray-400 dark:text-gray-300 text-center text-lg">No polls available. Create one to get started!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {polls.map((poll) => (
          <div
            key={poll.id}
            className="flex flex-col justify-between bg-white dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 p-6 border border-gray-100 dark:border-gray-700 min-h-[340px]"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 line-clamp-2">
                {poll.question}
              </h3>

              <ul className="space-y-2 mb-6">
                {poll.options.map((opt, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm"
                  >
                    <span className="font-medium text-gray-700 dark:text-gray-300">{opt.voteOption}</span>
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {opt.voteCount} votes
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 mt-auto">
              <Link
                to={`/polls/${poll.id}`}
                className="inline-flex items-center gap-2 backdrop-blur-md bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-indigo-800 dark:text-indigo-300 font-semibold text-sm px-4 py-2 rounded-full shadow transition"
              >
                <Eye className="w-4 h-4" />
                View
              </Link>
              {isAdmin && (
                <>
                  <Link
                    to={`/polls/edit/${poll.id}`}
                    className="inline-flex items-center gap-2 backdrop-blur-md bg-yellow-200/30 hover:bg-yellow-300/40 border border-yellow-300/40 text-yellow-800 dark:text-yellow-200 font-semibold text-sm px-4 py-2 rounded-full shadow transition"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(poll.id)}
                    className="inline-flex items-center gap-2 backdrop-blur-md bg-red-200/30 hover:bg-red-300/40 border border-red-300/40 text-red-800 dark:text-red-300 font-semibold text-sm px-4 py-2 rounded-full shadow transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollList;
