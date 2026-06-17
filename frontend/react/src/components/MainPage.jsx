import Navbar from "./app/NavBar.jsx";
import Recommended from "./app/Recommended.jsx";
import "./MainPage.css";
import { motion } from "framer-motion";
import { useState } from "react";

function Home() {
  const [focused, setFocused] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
    >
      {focused && <div className="search-overlay" />}

      <Navbar
        focused={focused}
        setFocused={setFocused}
      />

      {!user && (
        <div className="welcome-section">
          <h1>🌊 Welcome to MeetMinds</h1>

          <p>
            Discover people with similar interests,
            share your hobbies, follow creators,
            review movies, music and much more.
          </p>

          <p>
            Sign up to start connecting with the
            community ✨
          </p>
        </div>
      )}

      {user && <Recommended />}
    </motion.div>
  );
}

export default Home;