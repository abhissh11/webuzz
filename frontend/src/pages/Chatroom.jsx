import React from "react";
import AppUsers from "../components/AppUsers";

export default function Chatroom() {
  return (
    <div className=" h-screen">
      <div className="grid grid-cols-2 h-full gap-4 px-4">
        <div className="border border-indigo-950 max-w-[80%] rounded-lg px-10 flex flex-col gap-2 py-2 overflow-y-auto">
          <AppUsers />
        </div>
        <div className="border border-indigo-950 rounded-xl h-[90svh]">
          <div className="flex flex-col justify-between h-full">
            <h2 className="px-4 py-3 bg-indigo-800 rounded-xl rounded-b-none">
              active person
            </h2>
            <div className="w-full flex justify-between">
              <input
                placeholder="type your message.."
                className="w-full rounded-lg px-6 text-gray-200 bg-indigo-950 outline-none border-indigo-900"
              />
              <button className="text-base semibold px-6 py-3 rounded-lg bg-indigo-800">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
