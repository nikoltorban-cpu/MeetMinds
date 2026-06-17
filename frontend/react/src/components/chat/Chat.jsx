import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../app/NavBar";

import API_URL from "../config"

import "./Chat.css";

function Chat() {
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  async function fetchMessages() {
    try {
      const response = await fetch(
        `${API_URL}/messages/${user.id}/${id}`,
      );

      const data = await response.json();

      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function markMessagesAsRead() {
    try {
      await fetch(`${API_URL}/messages/read`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: user.id,
          otherUserId: id,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMessages();
    markMessagesAsRead();
  }, [id]);

  async function sendMessage() {
    if (!text) return;

    try {
      const response = await fetch(
        `${API_URL}/messages`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            senderId: user.id,

            receiverId: id,

            message: text,
          }),
        },
      );

      const data = await response.json();

      setMessages([...messages, data.data]);

      setText("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />

      <div className="chat-page">
        <div className="chat-box">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={
                msg.sender_id === user.id ? "my-message" : "other-message"
              }
            >
              {msg.message}
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}

export default Chat;
