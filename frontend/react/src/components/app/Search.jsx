import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";
import "./Search.css";

function Search() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);

  async function searchUsers(value) {
    setSearch(value);

    if (!value) {
      setUsers([]);

      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/users?search=${value}`,
      );

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />

      <div className="search-page">
        <h1>Find Creators ✨</h1>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => searchUsers(e.target.value)}
          className="search-input"
        />

        <div className="search-results">
          {users.map((user) => (
            <Link to={`/user/${user.id}`} key={user.id} className="user-card">
              <div className="user-avatar">{user.username[0]}</div>

              <div>
                <h2>{user.username}</h2>

                <p>{user.email}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
