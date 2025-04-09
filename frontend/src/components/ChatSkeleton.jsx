// components/ChatSkeleton.jsx
import React from "react";

export default function ChatSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 h-full animate-pulse">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className="bg-indigo-800 rounded-2xl px-4 py-2 max-w-xs w-1/2 h-5" />
        </div>
      ))}
    </div>
  );
}
