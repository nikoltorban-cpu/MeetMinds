import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecommendedUsers.css";

function RecommendedUsers({ userId, interest }) {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const response = await fetch(
        `http://localhost:3000/recommended-users/${userId}/${interest}`,
      );

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [userId]);

  if (users.length === 0) return null;

  return (
    <div className="recommended-users">
      <h2>🌊 People With Similar interests</h2>

      <div className="recommended-grid">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/user/${user.id}`}
            className="recommended-card"
          >
            <div className="recommended-avatar">{user.username[0]}</div>

            <div className="recommended-info">
              <h3>{user.username}</h3>

              <div className="interests-list">
                <div className="interest-card">
                  <span>{user.interest}</span>
                  <small>{user.level}</small>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecommendedUsers;
