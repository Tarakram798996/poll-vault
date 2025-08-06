import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

const EditPoll = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState({ question: "", options: [] });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get(`/polls/${id}`)
      .then((res) => setPoll(res.data))
      .catch(() => setMessage("Failed to fetch poll."));
  }, [id]);

  const updatePoll = () => {
    if (!poll.question.trim() || poll.options.some((opt) => !opt.voteOption.trim())) {
      setMessage("Question and all options are required.");
      return;
    }

    api
      .put(`/polls/${id}`, poll)
      .then(() => {
        setMessage("Poll updated successfully!");
        setTimeout(() => navigate("/"), 1000);
      })
      .catch(() => setMessage("Update failed."));
  };

  const handleOptionChange = (idx, value) => {
    const updatedOptions = [...poll.options];
    updatedOptions[idx].voteOption = value;
    setPoll({ ...poll, options: updatedOptions });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-4">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-indigo-300">
          <Pencil className="w-7 h-7" />
          Edit Poll
        </h2>

        {message && <p className="text-center text-red-400 mb-4">{message}</p>}

        <input
          type="text"
          className="w-full p-3 mb-4 rounded bg-white/20 border border-gray-400 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={poll.question}
          onChange={(e) => setPoll({ ...poll, question: e.target.value })}
          placeholder="Poll Question"
        />

        {poll.options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            className="w-full p-2 mb-3 rounded bg-white/20 border border-gray-400 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={opt.voteOption}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            placeholder={`Option ${idx + 1}`}
          />
        ))}

        <button
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded transition"
          onClick={updatePoll}
        >
          Update Poll
        </button>
      </div>
    </div>
  );
};

export default EditPoll;
