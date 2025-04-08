import React, { useState } from "react";
import socket from "../utils/socket";
import { axiosInstance } from "../utils/constants";

export default function ChatBox({
  activeChat,
  messages,
  setMessages,
  currentUser,
}) {
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = async () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      senderId: currentUser._id,
      receiverId: activeChat.receiver._id,
      content: messageInput,
      chatId: activeChat.chatId,
    };

    socket.emit("send_message", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");

    try {
      await axiosInstance.post("/messages", newMessage);
    } catch (err) {
      console.error("Message save failed:", err);
    }
  };

  return (
    <div className="w-3/4 flex flex-col bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700">
        {activeChat ? (
          <h2 className="text-lg font-semibold">
            Chat with {activeChat.receiver.username}
          </h2>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 max-w-[60%] rounded-lg ${
              msg.senderId === currentUser._id
                ? "bg-indigo-600 self-end ml-auto text-right"
                : "bg-gray-700 self-start mr-auto text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Message Input */}
      {activeChat && (
        <div className="p-4 border-t border-gray-700 flex items-center gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded bg-gray-900 text-white focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
