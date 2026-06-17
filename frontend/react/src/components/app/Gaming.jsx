import { useState } from "react";
import axios from "axios";
import API_URL from "../config"

import Navbar from "./NavBar";
import "./Sports.css";
import RecommendedUsers from "./RecommendedUsers";

const games = [
  "FPS",
  "Battle Royale",
  "MOBA",
  "MMORPG",
  "RPG",
  "Strategy",
  "Simulation",
  "Sports Games",
  "Racing",
  "Fighting Games",
  "Horror Games",
  "Survival",
  "Sandbox",
  "Puzzle Games",
  "Indie Games",
];

const levels = [
  "Trying It Out 🌱",
  "Casual Player 😊",
  "Regular Gamer 🎮",
  "Hardcore Gamer 🔥",
  "Competitive Player 🏆",
];

export default function Gaming() {
  const [openGame, setOpenGame] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const addInterest = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        `${API_URL}/interests`,
        {
          userId: user.id,
          category: "Gaming",
          interest: openGame,
          level: selectedLevel,
        }
      );

      setOpenGame(null);
      setSelectedLevel("");

      alert("Gaming interest saved 🎮");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="sports-page">
        <h1>Gaming</h1>

        <p>
          Add gaming genres you enjoy and
          your experience level
        </p>

        <div className="sports-grid">
          {games.map((game) => (
            <button
            disabled={!user}
              key={game}
              className={`sport-bubble ${
                openGame === game
                  ? "active-sport"
                  : ""
              }`}
              onClick={() =>
                setOpenGame(game)
              }
            >
              🎮 {game}
            </button>
          ))}
        </div>

        {openGame && (
          <div className="sport-details-panel">
            <h2>{openGame}</h2>

            <p>
              How involved are you?
            </p>

            {levels.map((level) => (
              <button
                key={level}
                className={`level-option ${
                  selectedLevel === level
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedLevel(level)
                }
              >
                {level}
              </button>
            ))}

            <button
              className="save-level-btn"
              onClick={addInterest}
            >
              Save 🎮
            </button>
          </div>
        )}
        {openGame && (
          <RecommendedUsers interest={openGame} userId={user?.id} />
        )}

      </div>
    </>
  );
}