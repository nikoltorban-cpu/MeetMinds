import { useState } from "react";
import axios from "axios";
import API_URL from "../config"

import Navbar from "./NavBar";
import "./Sports.css";
import RecommendedUsers from "./RecommendedUsers";

const travels = [
  "Beach Trips",
  "Road Trips",
  "Backpacking",
  "Luxury Travel",
  "Nature",
  "Camping",
  "Cruises",
  "Food Tourism",
  "Photography Travel",
  "City Breaks",
  "Mountains",
  "Adventure Travel",
];

const levels = [
  "Dreaming About It 🌱",
  "Occasional Traveler 😊",
  "Frequent Traveler ✈️",
  "Travel Enthusiast 🔥",
  "World Explorer 🌍",
];

export default function Travel() {
  const [openTravel, setOpenTravel] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [savedInterest, setSavedInterest] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const addInterest = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post(`${API_URL}/interests`, {
        userId: user.id,
        category: "Travel",
        interest: openTravel,
        level: selectedLevel,
      });

      setSavedInterest(openTravel);
      setOpenTravel(null);
      setSelectedLevel("");

      alert("Travel interest saved ");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="sports-page">
        <h1>Travel</h1>

        <p>Add travel styles you enjoy and your experience level</p>

        <div className="sports-grid">
          {travels.map((travel) => (
            <button
              disabled={!user}
              key={travel}
              className={`sport-bubble ${
                openTravel === travel ? "active-sport" : ""
              }`}
              onClick={() => setOpenTravel(travel)}
            >
              🎮 {travel}
            </button>
          ))}
        </div>

        {openTravel && (
          <div className="sport-details-panel">
            <h2>{openTravel}</h2>

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
              Save 🎮
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
