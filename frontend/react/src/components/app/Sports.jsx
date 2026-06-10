import { useState } from "react";
import Navbar from "./NavBar";
import "./Sports.css";
import axios from "axios";
import RecommendedUsers from "./RecommendedUsers";

const sports = [
  "Gym",
  "Football",
  "Basketball",
  "Tennis",
  "Swimming",
  "Running",
  "Cycling",
  "Boxing",
  "Yoga",
  "Pilates",
  "Hiking",
  "Surfing",
];

const levels = [
  "Beginner 🌱",
  "Casual 😊",
  "Regular 💪",
  "Dedicated 🔥",
  "Competitive 🏆",
];

export default function Sports() {
  const [selectedSports, setSelectedSports] = useState([]);
  const [openSport, setOpenSport] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [savedInterest, setSavedInterest] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const addInterests = async () => {
    try {
      const userId = user.id;

      if (!openSport || !selectedLevel) {
        alert("Please choose a level first");
        return;
      }

      await axios.post("http://localhost:3000/interests", {
        userId,
        category: "Sports",
        interest: openSport,
        level: selectedLevel,
      });
    } catch (error) {
      console.log(error);
    }
    setSelectedSports([
      ...selectedSports,
      {
        name: openSport,
        level: selectedLevel,
      },
    ]);
    setSavedInterest(openSport);
    setOpenSport(null);
    setSelectedLevel("");
    alert("Sports interest saved");
  };

  return (
    <>
      <Navbar />
      <div className="sports-page">
        <h1>Sports</h1>
        <p>Add sports you enjoy and your experience level</p>

        <div className="sports-grid">
          {sports.map((sport) => (
            <button
              disabled={!user}
              key={sport}
              className={`sport-bubble ${
                openSport === sport ? "active-sport" : ""
              }`}
              onClick={() => setOpenSport(sport)}
            >
              {sport}
            </button>
          ))}
        </div>
        {openSport && (
          <div className="sport-details-panel">
            <h2>{openSport}</h2>

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

            <button onClick={addInterests} className="save-level-btn">
              Save 🌊
            </button>
          </div>
        )}
        {savedInterest && (
          <RecommendedUsers interest={savedInterest} userId={user.id} />
        )}
      </div>
    </>
  );
}
