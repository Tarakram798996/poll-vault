import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { BarChart, Vote } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PollDetails = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/polls/${id}`)
      .then((res) => setPoll(res.data))
      .catch((err) => {
        console.error(err);
        setError("Poll not found or an error occurred.");
      });
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
  if (!poll) return <p className="text-center mt-6">Loading poll details...</p>;

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.voteCount, 0);

  const chartData = {
    labels: poll.options.map((opt) => opt.voteOption),
    datasets: [
      {
        label: "Votes",
        data: poll.options.map((opt) => opt.voteCount),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: poll.options.map((opt) => opt.voteOption),
    datasets: [
      {
        label: "Votes",
        data: poll.options.map((opt) => opt.voteCount),
        backgroundColor: [
          "#f87171",
          "#60a5fa",
          "#fbbf24",
          "#34d399",
          "#a78bfa",
          "#f97316",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Poll Results" },
    },
    scales: {
      x: { barThickness: 20 },
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BarChart className="text-indigo-700 dark:text-indigo-400 w-6 h-6" />
          <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
            Poll Details
          </h2>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          {poll.question}
        </h3>

        <ul className="mb-8 space-y-2">
          {poll.options.map((opt, idx) => (
            <li
              key={idx}
              className="bg-gray-100 dark:bg-white/20 px-4 py-2 rounded-md flex justify-between items-center text-gray-700 dark:text-gray-100"
            >
              <span className="font-medium">{opt.voteOption}</span>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {opt.voteCount} votes
                {totalVotes > 0 && (
                  <> ({((opt.voteCount / totalVotes) * 100).toFixed(1)}%)</>
                )}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="w-full md:w-1/2 h-[300px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="w-full md:w-1/3 h-[300px]">
            <Pie data={pieData} />
          </div>
        </div>

        <p className="text-center mt-8 text-gray-600 dark:text-gray-300 font-semibold flex items-center justify-center gap-1">
          <Vote className="text-indigo-700 dark:text-indigo-400 w-5 h-5" />
          Total Votes:{" "}
          <span className="text-indigo-700 dark:text-indigo-300 ml-1">
            {totalVotes}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PollDetails;
