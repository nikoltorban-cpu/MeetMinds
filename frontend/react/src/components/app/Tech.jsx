import { useState } from "react";
import axios from "axios";
import API_URL from "../config"

import Navbar from "./NavBar";
import "./Sports.css";
import RecommendedUsers from "./RecommendedUsers";

const technologies = [
  "Programming",
  "Web Development",
  "Mobile Development",
  "Artificial Intelligence",
  "Cyber Security",
  "Cloud Computing",
  "Data Science",
  "Game Development",
  "UI/UX Design",
  "DevOps",
  "Open Source",
  "Robotics",
  "Tech News",
  "Hardware",
  "Startups",
];

const levels = [
  "Curious Beginner 🌱",
  "Tech Enthusiast 😊",
  "Builder 💻",
  "Advanced Developer 🔥",
  "Tech Expert 🏆",
];

export default function Tech() {
  const [openTech, setOpenTech] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [savedInterest, setSavedInterest] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const addInterest = async () => {
    if (!openTech || !selectedLevel) {
      alert("Please choose a technology and level");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post(`${API_URL}/interests`, {
        userId: user.id,
        category: "Tech",
        interest: openTech,
        level: selectedLevel,
      });

      setSavedInterest(openTech);
      setOpenTech(null);
      setSelectedLevel("");

      alert("Tech interest saved 💻");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="sports-page">
        <h1>Technology</h1>

        <p>Add technologies and topics you're interested in</p>

        <div className="sports-grid">
          {technologies.map((tech) => (
            <button
            disabled={!user}
              key={tech}
              className={`sport-bubble ${
                openTech === tech ? "active-sport" : ""
              }`}
              onClick={() => setOpenTech(tech)}
            >
              💻 {tech}
            </button>
          ))}
        </div>

        {openTech && (
          <div className="sport-details-panel">
            <h2>{openTech}</h2>

            <p>How involved are you?</p>

            {levels.map((level) => (
              <button
                key={level}
                className={`level-option ${
                  selectedLevel === level ? "selected" : ""
                }`}
                onClick={() => setSelectedLevel(level)}
              >
                {level}
              </button>
            ))}

            <button className="save-level-btn" onClick={addInterest}>
              Save 💻
            </button>
          </div>
        )}
        {savedInterest && (
          <RecommendedUsers interest={savedInterest} userId={user?.id} />
        )}
      </div>
    </>
  );
}
