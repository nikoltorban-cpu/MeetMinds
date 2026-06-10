import { useState } from "react";
import axios from "axios";

import Navbar from "./NavBar";
import "./Sports.css";
import RecommendedUsers from "./RecommendedUsers";

const books = [
  "Fantasy",
  "Romance",
  "Mystery",
  "Thriller",
  "Science Fiction",
  "History",
  "Biography",
  "Psychology",
  "Self Development",
  "Business",
  "Manga",
  "Young Adult",
];

const levels = [
  "Just Starting 🌱",
  "Casual Reader 😊",
  "Book Lover 📚",
  "Avid Reader 🔥",
  "Bookworm 🏆",
];

export default function Books() {
  const [openBook, setOpenBook] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [savedInterest, setSavedInterest] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const addInterest = async () => {
    if (!openBook || !selectedLevel) {
      alert("Please choose a genre and level");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post("http://localhost:3000/interests", {
        userId: user.id,
        category: "Books",
        interest: openBook,
        level: selectedLevel,
      });

      setSavedInterest(openBook);
      setOpenBook(null);
      setSelectedLevel("");

      alert("Book interest saved 📚");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="sports-page">
        <h1>Books</h1>

        <p>Add book genres you enjoy and your reading level</p>

        <div className="sports-grid">
          {books.map((book) => (
            <button
              disabled={!user}
              key={book}
              className={`sport-bubble ${
                openBook === book ? "active-sport" : ""
              }`}
              onClick={() => setOpenBook(book)}
            >
              📚 {book}
            </button>
          ))}
        </div>

        {openBook && (
          <div className="sport-details-panel">
            <h2>{openBook}</h2>

            <p>How much are you into this genre?</p>

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
              Save 📚
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
