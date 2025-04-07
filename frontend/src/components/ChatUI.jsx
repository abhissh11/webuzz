import React, { useEffect, useRef, useState } from "react";
import { SendHorizonal } from "lucide-react";
import socket from "../utils/socket";
import { axiosInstance } from "../utils/constants";
import { getLoggedInUser } from "../utils/getLoggedinUser";

export default function ChatUI({ activeUser }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const user = getLoggedInUser();

  const userId = user && user._id;

  useEffect(() => {
    if (!activeUser || !userId) return;

    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(
          `/messages/${userId}/${activeUser._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages");
      }
    };

    fetchMessages();

    socket.emit("joinRoom", userId);

    const handleReceiveMessage = (newMessage) => {
      const isCurrentChat =
        (newMessage.senderId === userId &&
          newMessage.receiverId === activeUser._id) ||
        (newMessage.senderId === activeUser._id &&
          newMessage.receiverId === userId);

      if (isCurrentChat) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [activeUser, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      senderId: userId,
      receiverId: activeUser._id,
      message,
    };

    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <h2 className="px-4 py-3 bg-indigo-800 rounded-xl rounded-b-none text-white font-semibold">
        {activeUser?.username || "Select a user to chat"}
      </h2>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 max-w-xs p-2 rounded-lg text-white ${
              msg.senderId === userId
                ? "bg-indigo-700 ml-auto"
                : "bg-teal-700 mr-auto"
            }`}
          >
            <p>{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {activeUser && (
        <div className="w-full flex gap-2 justify-between p-4">
          <input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg px-6 text-gray-200 bg-indigo-950 outline-none border-indigo-900"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="group flex gap-1 items-center text-lg semibold px-6 py-3 rounded-lg bg-indigo-800 hover:bg-indigo-700"
          >
            Send
            <SendHorizonal
              size={24}
              className="group-hover:-rotate-45 transition-all duration-75"
            />
          </button>
        </div>
      )}
    </div>
  );
}
