  import React from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import PollList from "./components/PollList";
  import CreatePoll from "./components/CreatePoll";
  import VotePoll from "./components/VotePoll";
  import PollDetails from "./components/PollDetails";
  import EditPoll from "./components/EditPoll";
  import Login from "./components/Login";
  import NavBar from "./components/NavBar";
  import Register from "./components/Register";

  function App() {
    return (
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
          <NavBar />

          <div className="pt-20 p-6">
            <Routes>
              <Route path="/" element={<PollList />} />
              <Route path="/create" element={<CreatePoll />} />
              <Route path="/vote" element={<VotePoll />} />
              <Route path="/polls/:id" element={<PollDetails />} />
              <Route path="/polls/edit/:id" element={<EditPoll />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }

  export default App;
