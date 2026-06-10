import { useState } from "react";
import "./Login.css";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:3000/login",

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,

          password,
        }),
      },
    );

    const data = await response.json();
    console.log(data);
    if (data.message === "Login successful") {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    }
    if (data.message === "User not found") {
      alert("User does not exist");

      return;
    }

    if (data.message === "Wrong password") {
      alert("Wrong password");

      return;
    }
  }

  return (
    <>
      <Navbar />

      <div className="auth-page">
        <form className="auth-box" onSubmit={handleLogin}>
          <h1>Welcome Back ✨</h1>

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

          <button className="login" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
