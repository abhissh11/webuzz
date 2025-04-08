import React from "react";

export default function UsersList({ users, activeReceiver, onUserClick }) {
  return (
    <div className="w-1/4 bg-gray-900 text-white p-4 overflow-y-auto border-r border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => onUserClick(user)}
          className={`p-2 cursor-pointer rounded hover:bg-indigo-700 ${
            activeReceiver?._id === user._id ? "bg-indigo-800" : ""
          }`}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}
