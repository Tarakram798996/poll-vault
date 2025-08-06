import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";

const VotePoll = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPollId, setSelectedPollId] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/polls")
      .then((res) => setPolls(res.data))
      .catch((err) => console.error(err));
  }, []);

  const selectedPoll = polls.find(p => p.id === parseInt(selectedPollId));

  const submitVote = () => {
    if (!selectedPollId || selectedOptionIndex === null) {
      setMessage("Please select a poll and an option.");
      return;
    }

    const voteData = {
      pollId: selectedPollId,
      optionIndex: selectedOptionIndex
    };

    api.post("/polls/vote", voteData)
      .then(() => {
        setMessage("✅ Vote submitted successfully!");
        setSelectedOptionIndex(null);
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 409) {
          setMessage("❌ You have already voted in this poll.");
          setTimeout(() => navigate("/"), 1500);
        } else {
          setMessage("❌ Failed to submit vote.");
        }
      });
  };

  return (
    <div className="min-h-[300px] pt-20 flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 pb-8">
      <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">Vote in a Poll</h2>

        {/* Poll Selector */}
        <div className="mb-6">
          <label className="block font-medium mb-2 text-gray-700 dark:text-white">Select Poll:</label>
          <select
            value={selectedPollId || ""}
            onChange={(e) => setSelectedPollId(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">-- Select Poll --</option>
            {polls.map(poll => (
              <option
                key={poll.id}
                value={poll.id}
                className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                {poll.question}
              </option>
            ))}
          </select>
        </div>

        {/* Poll Options */}
        {selectedPoll && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-4">{selectedPoll.question}</h3>
            <div className="space-y-3">
              {selectedPoll.options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-indigo-500 hover:text-white cursor-pointer transition"
                >
                  <input
                    type="radio"
                    name="option"
                    checked={selectedOptionIndex === idx}
                    onChange={() => setSelectedOptionIndex(idx)}
                    className="mr-3"
                  />
                  {opt.voteOption}
                </label>
              ))}
            </div>
          </div>
        )}

        {selectedPoll && (
          <button
            onClick={submitVote}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
          >
            <Send size={18} /> Submit Vote
          </button>
        )}

        {message && (
          <p className="mt-4 text-center text-green-600 dark:text-green-400 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
};

export default VotePoll;
