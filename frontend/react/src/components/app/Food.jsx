import { useState } from "react";
import axios from "axios";
import API_URL from "../config"

import Navbar from "./NavBar";
import "./Sports.css";
import RecommendedUsers from "./RecommendedUsers";

const foods = [
  "Japanese",
  "Chinese",
  "Korean",
  "Mexican",
  "Mediterranean",
  "American",
  "BBQ",
  "Healthy Food",
  "Trying New Restaurants",
  "Cooking",
  "Baking",
  "Coffee",
  "Desserts",
  "Street Food",
  "Italian Food",
  "Asian Food",
  "Healthy Eating",
  "BBQ",
  "Vegan Food",
];

const levels = [
  "Curious Taster 🌱",
  "Food Lover 😊",
  "Home Cook 👨‍🍳",
  "Passionate Foodie 🔥",
  "Food Expert 🏆",
];

export default function Food() {
  const [openFood, setOpenFood] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [savedInterest, setSavedInterest] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const addInterest = async () => {
    if (!openFood || !selectedLevel) {
      alert("Please choose a food category and level");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post(`${API_URL}/interests`, {
        userId: user.id,
        category: "Food",
        interest: openFood,
        level: selectedLevel,
      });

      setSavedInterest(openFood);
      setOpenFood(null);
      setSelectedLevel("");

      alert("Food interest saved 🍜");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="sports-page">
        <h1>Food</h1>

        <p>Add cuisines and food interests you enjoy</p>

        <div className="sports-grid">
          {foods.map((food) => (
            <button
              disabled={!user}
              key={food}
              className={`sport-bubble ${
                openFood === food ? "active-sport" : ""
              }`}
              onClick={() => setOpenFood(food)}
            >
              🍜 {food}
            </button>
          ))}
        </div>

        {openFood && (
          <div className="sport-details-panel">
            <h2>{openFood}</h2>

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
              Save 🍜
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
