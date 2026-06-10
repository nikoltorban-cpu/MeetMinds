import Navbar from "./app/NavBar.jsx";
import Recommended from "./app/Recommended.jsx";
import "./MainPage.css";
import { motion } from "framer-motion";
import { useState } from "react";

function Home() {
  const [focused, setFocused] = useState(false);

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
      <Navbar focused={focused} setFocused={setFocused} />
      <Recommended />
    </motion.div>
  );
}
export default Home;
