import React, { useEffect, useState, useRef } from "react";
import { Send } from "lucide-react";
import { axiosInstance } from "../utils/constants";
import socket from "../utils/socket";
import { getLoggedInUser } from "../utils/getLoggedinUser";

export default function ChatUI({
  activeUser,
  currentChat,
  messages,
  setMessages,
}) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const loggedInUser = getLoggedInUser();
  const userId = loggedInUser?._id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ Join the chat room when currentChat changes
  useEffect(() => {
    if (currentChat?._id) {
      socket.emit("joinChat", currentChat._id);
    }
  }, [currentChat?._id]);

  // ✅ Listen for real-time incoming messages
  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      if (newMessage.chat._id === currentChat?._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("messageReceived", handleReceiveMessage);

    return () => {
      socket.off("messageReceived", handleReceiveMessage);
    };
  }, [currentChat, setMessages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !activeUser || !userId || !currentChat?._id) return;

    const newMessage = {
      chatId: currentChat._id,
      senderId: userId,
      receiverId: activeUser._id,
      content: message,
    };

    try {
      const res = await axiosInstance.post("/messages", newMessage);

      setMessages((prev) => [...prev, res.data]);
      setMessage("");
      socket.emit("newMessage", res.data);
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-indigo-900 p-3 text-white font-semibold rounded-lg shadow mb-2">
        {activeUser
          ? `Chatting with ${activeUser.username}`
          : "Select a user to start chatting"}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 px-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No messages yet</p>
        )}
        {messages.map((msg, idx) => {
          const isOwn = msg.sender?._id === userId || msg.senderId === userId;
          return (
            <div
              key={idx}
              className={`p-2 rounded-xl max-w-sm ${
                isOwn
                  ? "bg-blue-600 text-white self-end ml-auto"
                  : "bg-teal-600 text-white self-start mr-auto"
              }`}
            >
              {msg.content?.message || msg.content}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {activeUser && (
        <div className="mt-auto flex items-center gap-2 pt-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type a message..."
            className="w-full rounded-lg p-2 px-4 text-blue-950 resize-none border border-indigo-300 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-600 p-2 rounded-lg text-white hover:bg-indigo-700"
          >
            <Send />
          </button>
        </div>
      )}
    </div>
  );
}
