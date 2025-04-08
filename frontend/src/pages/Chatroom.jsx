import React, { useEffect, useState } from "react";
import { axiosInstance } from "./../utils/constants";
import {
  MessageSquare,
  Menu,
  PanelTopOpen,
  SquareChevronUp,
} from "lucide-react";
import ChatUI from "../components/ChatUI";
import socket from "../utils/socket";
import { getLoggedInUser } from "../utils/getLoggedinUser";

export default function Chatroom() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showUserList, setShowUserList] = useState(false); // false by default for mobile

  const loggedInUser = getLoggedInUser();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          loggedInUser?._id ? `/users?exclude=${loggedInUser._id}` : "/users"
        );
        setUsers(res.data);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!loggedInUser?._id) return;
    socket.emit("joinRoom", loggedInUser._id);

    const handleReceiveMessage = (newMessage) => {
      if (!activeUser || newMessage.senderId !== activeUser._id) {
        setNotifications((prev) => [...prev, newMessage]);
      }
    };

    socket.on("messageReceived", handleReceiveMessage);
    return () => socket.off("messageReceived", handleReceiveMessage);
  }, [activeUser]);

  const handleUserClick = async (user) => {
    try {
      const res = await axiosInstance.post("/chat", { userId: user._id });
      setCurrentChat(res.data);
      setActiveUser(user);
      setNotifications((prev) =>
        prev.filter((msg) => msg.chatId !== res.data._id)
      );

      const messagesRes = await axiosInstance.get(`/messages/${res.data._id}`);
      setMessages(messagesRes.data);
      setShowUserList(false); // hide on mobile after selecting user
    } catch (error) {
      console.error("Error accessing chat:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-indigo-950 text-white">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare /> Chatroom
        </h2>
        <button
          onClick={() => setShowUserList((prev) => !prev)}
          className="p-2 bg-indigo-700 rounded-lg"
        >
          {showUserList ? <SquareChevronUp /> : <PanelTopOpen />}
        </button>
      </div>

      {/* User List */}
      <div
        className={`${
          showUserList ? "block" : "hidden"
        } md:block w-full md:w-[40%] border border-indigo-950 rounded-lg px-4 py-2 overflow-y-auto bg-indigo-950 text-white`}
      >
        <h2 className="p-2 flex gap-4 items-center bg-indigo-900 border-y rounded border-indigo-800 mb-2">
          <MessageSquare />
          Tap on user to start a chat
        </h2>

        {loading && <p>Loading users..</p>}
        {error && (
          <p className="text-blue-300 text-sm font-semibold">{error}</p>
        )}
        {!loading && !error && users.length === 0 && <p>No User Found.</p>}

        <div className="flex flex-col gap-2 w-full">
          {users.map((user) => {
            const hasNotification = notifications.some(
              (msg) => msg.senderId === user._id
            );

            return (
              <div
                key={user._id}
                onClick={() => handleUserClick(user)}
                className={`relative flex items-center p-2 gap-4 cursor-pointer hover:bg-indigo-800 rounded-xl ${
                  activeUser?._id === user._id ? "bg-indigo-800" : ""
                }`}
              >
                <img
                  src={user.avtar}
                  alt="avatar"
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">{user.username}</h3>
                  <p className="text-sm text-gray-300">{user.email}</p>
                </div>

                {hasNotification && (
                  <span className="absolute top-1 right-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                    New
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat UI */}
      <div className="w-full md:w-[60%] border border-indigo-950 rounded-xl p-2 h-[90vh] overflow-hidden">
        <ChatUI
          activeUser={activeUser}
          currentChat={currentChat}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}
