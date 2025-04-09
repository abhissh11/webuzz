import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Users, BellRing, MessageSquare } from "lucide-react";

export default function Homepage() {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate("/chat");
  };

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-indigo-300" />,
      title: "One-on-One Chat",
      description:
        "Have private, secure conversations with anyone in your network.",
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-300" />,
      title: "Group Chats",
      description:
        "Create and manage group conversations for teams, friends, or communities.",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-indigo-300" />,
      title: "Real-Time Messaging",
      description:
        "Send and receive messages instantly with Webuzz’s lightning-fast engine.",
    },
    {
      icon: <BellRing className="w-8 h-8 text-indigo-300" />,
      title: "Typing & Notifications",
      description:
        "See when others are typing and get notified of new messages in real time.",
    },
  ];

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-950 via-indigo-950 to-indigo-950 text-white py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 px-6">
        <h1 className="text-5xl font-bold mb-4 tracking-wide">
          Welcome to <span className="text-indigo-300">Webuzz</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
          Connect instantly with anyone — create private chats, group
          conversations, and stay in sync in real time.
        </p>
        <button
          onClick={handleStartChat}
          className="bg-indigo-800 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
        >
          Start Chatting
        </button>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 mx-5 gap-8 max-w-4xl">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group cursor-pointer bg-indigo-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left">
      <div className="mb-4 group-hover:bg-indigo-950  w-fit p-2 rounded">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
