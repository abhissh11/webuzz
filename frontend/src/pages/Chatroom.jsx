import React from "react";

export default function Chatroom() {
  const chats = [
    {
      name: "Stranger Sharma",
      message: "hello, it's your friend",
    },
    {
      name: "Stranger Sharma",
      message: "hello, it's your friend",
    },
    {
      name: "Stranger Sharma",
      message: "hello, it's your friend",
    },
    {
      name: "Stranger Sharma",
      message: "hello, it's your friend",
    },
    {
      name: "Stranger Sharma",
      message: "hello, it's your friend",
    },
    {
      name: "Stranger Sharma",
      message: "hello, it's your friend",
    },
    {
      name: "Stranger Sharma",
      message: "hello, it's your friend",
    },
    {
      name: "Stranger Sharma",
      message: "hello, it's your friend",
    },
  ];

  return (
    <div className="h-screen ">
      <div className="grid grid-cols-2 h-full gap-4 p-4">
        <div className="border border-indigo-950 max-w-[80%] rounded-lg px-10 flex flex-col gap-2 py-2 overflow-y-auto">
          {chats.map((cht, index) => (
            <div
              key={index}
              className="bg-indigo-900 hover:bg-indigo-800 flex flex-col gap-1 p-1 rounded-xl rounded-br-none transition-all duration-100 cursor-pointer"
            >
              <h2 className="px-2 text-base font-semibold text-white">
                {cht.name}
              </h2>
              <p className="px-6 text-gray-300">{cht.message}</p>
            </div>
          ))}
        </div>
        <div className="border border-indigo-950 rounded-xl">
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
