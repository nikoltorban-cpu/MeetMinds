import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "./NavBar";

import "./Following.css";

import API_URL from "../config"

function Following() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [following, setFollowing] = useState([]);

  async function fetchFollowing() {
    try {
      const response = await fetch(
        `${API_URL}/following/${user.id}`,
      );

      const data = await response.json();

      setFollowing(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      fetchFollowing();
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="following-page">
        <h1>Your Following ✨</h1>

        <div className="following-list">
          {following.length === 0 ? (
            <h2 className="no-following">
              You are not following anyone yet
            </h2>
          ) : (
            following.map((person) => (
              <Link
                to={`/user/${person.id}`}
                key={person.id}
                className="following-card"
              >
                <div className="following-avatar">{person.username[0]}</div>

                <div>
                  <h2>{person.username}</h2>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Following;
