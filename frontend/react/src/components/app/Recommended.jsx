import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Recommended.css";
import API_URL from "../config";

function Recommended() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);

  async function fetchRecommendedUsers() {
    if (!user) return;
    try {
      const response = await fetch(
        `${API_URL}/recommended-users/${user.id}`,
      );

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchNewUsers() {
    try {
      const response = await fetch(`${API_URL}/new-users`);
      const data = await response.json();
      const user = JSON.parse(localStorage.getItem("user"));

      const filteredUsers = user
        ? data.filter((person) => person.id !== user.id)
        : data;
      setNewUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchNewUsers();
    if (user) {
      fetchRecommendedUsers();
    }
  }, []);

  const showRecommended = users.length > 0;
  const showNewUsers = newUsers.length > 0;

  return (
    <div className="recommended-section">
      {showRecommended && (
        <>
          <h2 className="recommended-title">🌊 Recommended People</h2>

          <h4 className="recommended-subtitle">With Similar Interests</h4>

          <div className="recommended-scroll">
            {users.map((person) => (
              <Link
                key={person.id}
                to={`/user/${person.id}`}
                className="recommended-card"
              >
                <div className="recommended-avatar">{person.username[0]}</div>

                <div className="post-info">
                  <h3>{person.username}</h3>

                  <div className="interest-card">
                    <span>{person.interests?.join(" • ")}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
      <div className="recommended-divider"></div>

      {showNewUsers && (
        <>
          <h2 className="recommended-title">✨ New Members</h2>

          <h4 className="recommended-subtitle">
            Say hello to the newest people on MeetMinds
          </h4>

          <div className="recommended-scroll">
            {newUsers.map((person) => (
              <Link
                key={person.id}
                to={`/user/${person.id}`}
                className="recommended-card"
              >
                <div className="recommended-avatar">{person.username[0]}</div>

                <div className="post-info">
                  <h3>{person.username}</h3>
                  <p>New Member ✨</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Recommended;
