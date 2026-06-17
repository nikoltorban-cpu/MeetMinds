import "./NavBar.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Navbar({ focused, setFocused }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  async function logOut() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  async function searchUsers(value) {
    setSearch(value);

    if (!value) {
      setUsers([]);

      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/users?search=${value}`,
      );

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUnreadMessages() {
    try {
      const response = await fetch(
        `${API_URL}/unread-messages/${user.id}`,
      );

      const data = await response.json();

      setUnreadCount(data.count);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setSearch("");
    setUsers([]);
    setFocused?.(false);

    if (user) {
      fetchUnreadMessages();
    }
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="logo">MeetMinds</div>

      <div className="nav-center">
        <div className="nav-links">
          <Link to="/">
            <button className="nav-btn">Home</button>
          </Link>
          <Link to="/explore">
            <button className="nav-btn">Explore</button>
          </Link>
          <Link to="/about">
            <button className="nav-btn">About</button>
          </Link>
        </div>

        <div className="search-container">
          <input
            className="search"
            type="text"
            placeholder="Search creators..."
            value={search}
            onFocus={() => setFocused?.(true)}
            onBlur={() =>
              setTimeout(() => {
                setFocused?.(false);
              }, 200)
            }
            onChange={(e) => searchUsers(e.target.value)}
          />

          <div className="search-results">
            {users.map((user) => (
              <Link to={`/user/${user.id}`} key={user.id} className="user-card">
                <div className="user-avatar">{user.username[0]}</div>

                <div>
                  <h2>{user.username}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="nav-right">
        <Link to="/messages">
          <button className="nav-btn messages-btn">
            Messages 💬
            {unreadCount > 0 && (
              <span className="notification-dot" style={{ color: "red" }}>
                {" "}
                {unreadCount}
              </span>
            )}
          </button>
        </Link>
        <Link to="/following">
          <button className="nav-btn">Following</button>
        </Link>
        {user && (
          <Link to="/profile">
            <button className="profile">
              {" "}
              <FaUserCircle />{" "}
            </button>
          </Link>
        )}
        <Link to="/login">
          {!user && <button className="login-btn">Login</button>}
        </Link>
        <Link to="/signup">
          {!user && <button className="signup-btn">Sign Up</button>}
        </Link>
        {user && (
          <button className="logout-btn" onClick={() => logOut()}>
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
