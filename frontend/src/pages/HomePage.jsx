import { MoveRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-[70svh] md:min-h-screen mx-4">
      <div className="flex flex-col gap-16 justify-between items-center">
        <div className="flex flex-col gap-4 max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-slate-300 leading-none text-center">
            <span className="text-4xl md:text-6xl text-blue-600">Webuzz</span>,
            where
            <br /> conversations flow!
          </h1>
          <p className="text-lg text-center font-medium text-slate-300">
            Whether you're brainstorming with a team, catching up with friends,
            or sharing passions in a community, Webuzz keeps the vibe alive
          </p>
        </div>
        <Link to="/chat">
          <button
            className="group flex gap-3 items-center text-lg  text-slate-200 font-medium px-6 py-3 border border-blue-600 text-center bg-blue-600 rounded-full
        hover:bg-blue-700"
          >
            Let's Buzz{" "}
            <span>
              <MoveRight
                size={26}
                className="group-hover:translate-x-2 transition-all duration-100"
              />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
