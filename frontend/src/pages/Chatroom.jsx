import React, { useEffect, useState } from "react";
import { axiosInstance } from "./../utils/constants";
import { MessageSquare } from "lucide-react";

import ChatUI from "../components/ChatUI";

export default function Chatroom() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const fetchusers = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/users");
        const data = await res.data;
        setUsers(data);
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchusers();
  }, []);
  return (
    <div className="grid grid-cols-[40%_60%] gap-4  h-screen py-2 px-10">
      <div className="border border-indigo-950 rounded-lg px-4 py-2 overflow-y-auto">
        <div>
          <h2 className="p-2 flex gap-6 items-center bg-indigo-900 border-y rounded border-indigo-800 mb-2">
            <span>
              <MessageSquare />
            </span>
            Tap on user to start a chat{" "}
          </h2>
          {loading && <p>Loading users..</p>}
          {error && <p>{error}</p>}
          {!loading && !error && users.length === 0 && <p>No User Found.</p>}

          {/* users list */}
          <div className="flex flex-col gap-1 w-full">
            {users &&
              users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setActiveUser(user)}
                  className="w-full flex p-1 gap-4 shadow-indigo-600 shadow-sm cursor-pointer hover:shadow-indigo-900 rounded-xl"
                >
                  <img
                    src={user.avtar}
                    alt="avtar"
                    className="w-12 p-1 shadow-md rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {user.username}
                    </h3>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="border border-indigo-950 rounded-xl w-full p-2 h-[90%]">
        <ChatUI activeUser={activeUser} />
      </div>
    </div>
  );
}
