import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-between px-6 border-b py-3 border-slate-700">
      <Link to="/">
        <h1 className="text-2xl font-serif font-bold text-blue-600 hover:text-blue-700">
          Webuzz
        </h1>
      </Link>
      <nav className="flex gap-8">
        <Link to="/" className="hover:underline">
          Linkedin
        </Link>
        <Link to="/" className="hover:underline">
          X / Twitter
        </Link>
      </nav>
    </div>
  );
}
