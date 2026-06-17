import { useState } from "react";

import "./Login.css";

import Navbar from "./NavBar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    const response = await fetch(
      `${API_URL}/signup`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          email,
          password,
        }),
      },
    );

    const data = await response.json();
    console.log(data);
    if (data.message === "Email already exists") {
      alert("Email already exists");

      return;
    }

    if (data.message === "Signup successful") {
      alert("Account created!");

      localStorage.setItem(
        "user",

        JSON.stringify(data.user),
      );

      navigate("/");
    }
  }

  return (
    <>
      <Navbar />

      <div className="auth-page">
        <form className="auth-box" onSubmit={handleSignup}>
          <h1>Create Account 💖</h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
