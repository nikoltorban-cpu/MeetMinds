import { useState } from "react";
import axios from "axios";

import Navbar from "./NavBar";
import "./Sports.css";
import RecommendedUsers from "./RecommendedUsers";
import API_URL from "../config"

const pets = [
  "Dogs",
  "Cats",
  "Birds",
  "Fish",
  "Reptiles",
  "Rabbits",
  "Hamsters",
  "Guinea Pigs",
  "Pet Training",
  "Animal Rescue",
  "Exotic Pets",
  "Pet Photography",
  "Aquariums",
  "Horse Riding",
  "Animal Care",
];

const levels = [
  "Animal Lover 🌱",
  "Pet Owner 😊",
  "Dedicated Owner 🐾",
  "Pet Enthusiast 🔥",
  "Animal Expert 🏆",
];

export default function Pets() {
  const [openPet, setOpenPet] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [savedInterest, setSavedInterest] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const addInterest = async () => {
    if (!openPet || !selectedLevel) {
      alert("Please choose a pet interest and level");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post(`${API_URL}/interests`, {
        userId: user.id,
        category: "Pets",
        interest: openPet,
        level: selectedLevel,
      });
      setSavedInterest(openPet);
      setOpenPet(null);
      setSelectedLevel("");

      alert("Pet interest saved 🐾");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="sports-page">
        <h1>Pets</h1>

        <p>Add animals and pet-related interests you love</p>

        <div className="sports-grid">
          {pets.map((pet) => (
            <button
              disabled={!user}
              key={pet}
              className={`sport-bubble ${
                openPet === pet ? "active-sport" : ""
              }`}
              onClick={() => setOpenPet(pet)}
            >
              🐾 {pet}
            </button>
          ))}
        </div>

        {openPet && (
          <div className="sport-details-panel">
            <h2>{openPet}</h2>

            <p>How much are you into this?</p>

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
              Save 🐾
            </button>
          </div>
        )}
        {savedInterest && <RecommendedUsers interest={savedInterest} userId={user?.id} />}
      </div>
    </>
  );
}
