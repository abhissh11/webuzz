import React from "react";

export default function UserListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-4 p-2 animate-pulse bg-indigo-900 rounded-xl"
        >
          <div className="w-12 h-12 bg-indigo-950 rounded-full" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 bg-purple-900 rounded w-3/4" />
            <div className="h-3 bg-indigo-900 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
