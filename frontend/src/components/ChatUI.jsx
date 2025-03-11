import { Send, SendHorizonal } from "lucide-react";
import React from "react";

export default function ChatUI() {
  return (
    <div className="w-full h-full flex flex-col justify-between ">
      <h2 className="px-4 py-3 bg-indigo-800 rounded-xl rounded-b-none">
        active person
      </h2>
      <div className="w-full flex gap-2 justify-between">
        <input
          placeholder="Type your message.."
          className="w-full rounded-lg px-6 text-gray-200 bg-indigo-950 outline-none border-indigo-900"
        />
        <button className="group flex gap-1 items-center text-lg semibold px-6 py-3 rounded-lg bg-indigo-800">
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
