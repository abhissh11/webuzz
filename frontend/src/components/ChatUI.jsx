import React, { useEffect, useState } from "react";
import { SendHorizonal } from "lucide-react";
import socket from "../utils/socket";
import { axiosInstance } from "../utils/constants";

export default function ChatUI({ activeUser }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (activeUser) {
      // Fetch chat history
      const fetchMessages = async () => {
        const res = await axiosInstance.get(
          `/messages/${localStorage.getItem("userId")}/${activeUser._id}`
        );
        setMessages(res.data);
      };
      fetchMessages();

      // Join the room
      socket.emit("joinRoom", localStorage.getItem("userId"));

      // Listen for new messages
      socket.on("receiveMessage", (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
      });
    }

    return () => {
      socket.off("receiveMessage");
    };
  }, [activeUser]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        senderId: localStorage.getItem("userId"),
        receiverId: activeUser._id,
        message,
      };
      socket.emit("sendMessage", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <h2 className="px-4 py-3 bg-indigo-800 rounded-xl rounded-b-none">
        {activeUser?.username}
      </h2>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg ${
              msg.senderId === localStorage.getItem("userId")
                ? "bg-indigo-700 ml-auto"
                : "bg-indigo-900 mr-auto"
            }`}
          >
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="w-full flex gap-2 justify-between p-4">
        <input
          placeholder="Type your message.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg px-6 text-gray-200 bg-indigo-950 outline-none border-indigo-900"
        />
        <button
          onClick={handleSendMessage}
          className="group flex gap-1 items-center text-lg semibold px-6 py-3 rounded-lg bg-indigo-800"
        >
          Send{" "}
          <span>
            <SendHorizonal
              size={24}
              className="group-hover:-rotate-45 transition-all duration-75"
            />
          </span>
        </button>
      </div>
    </div>
  );
}
