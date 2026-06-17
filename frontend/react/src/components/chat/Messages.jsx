import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "../app/NavBar";

import API_URL from "../config"

import "./Messages.css";

function Messages() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [conversations, setConversations] = useState([]);

  async function fetchConversations() {
    try {
      const response = await fetch(
        `${API_URL}/conversations/${user.id}`,
      );

      const data = await response.json();

      setConversations(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <>
      <Navbar />

      <div className="messages-page">
        <h1>Messages 💬</h1>

        <div className="messages-list">
          {conversations.map((chat) => (
            <Link
              to={`/chat/${chat.other_user_id}`}
              key={chat.id}
              className="message-card"
            >
              <div className="message-avatar">{chat.username[0]}</div>

              <div className="message-info">
                <h2>{chat.username}</h2>

                <p>{chat.last_message}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Messages;
