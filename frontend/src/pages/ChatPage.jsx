import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../utils/constants";
import socket from "../utils/socket";
import ChatBox from "../components/ChatBox";
import UsersList from "../components/UsersList";

export default function ChatPage() {
  const currentUser = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // { chatId, receiver }
  const [messages, setMessages] = useState([]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/users");
        const otherUsers = res.data.filter((u) => u._id !== currentUser._id);
        setUsers(otherUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, [currentUser]);

  // Socket listener
  useEffect(() => {
    socket.on("receive_message", (msg) => {
      if (msg.chatId === activeChat?.chatId) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => socket.off("receive_message");
  }, [activeChat]);

  // Start or get chat room
  const startChat = async (receiver) => {
    try {
      const res = await axiosInstance.post("/chats ", {
        senderId: currentUser._id,
        receiverId: receiver._id,
      });
      const { chatId, messages } = res.data;
      setActiveChat({ chatId, receiver });
      setMessages(messages);
    } catch (err) {
      console.error("Error initiating chat:", err);
    }
  };

  return (
    <div className="flex h-[85vh]">
      <UsersList
        users={users}
        activeReceiver={activeChat?.receiver}
        onUserClick={startChat}
      />
      <ChatBox
        activeChat={activeChat}
        messages={messages}
        setMessages={setMessages}
        currentUser={currentUser}
      />
    </div>
  );
}
