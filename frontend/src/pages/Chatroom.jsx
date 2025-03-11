import React from "react";
import AppUsers from "../components/AppUsers";
import ChatUI from "../components/ChatUI";

export default function Chatroom() {
  return (
    <div className="grid grid-cols-[40%_60%] gap-4  h-screen py-2 px-10">
      <div className="border border-indigo-950 rounded-lg px-4 py-2 overflow-y-auto">
        <AppUsers />
      </div>
      <div className="border border-indigo-950 rounded-xl w-full p-2 h-[90%]">
        <ChatUI />
      </div>
    </div>
  );
}
