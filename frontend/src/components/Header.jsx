import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../redux/slices/authSlice";
import { Menu, X } from "lucide-react";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    dispatch(clearUser());
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-indigo-700 hover:text-blue-700">
            Webuzz
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <NavLinks isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-slate-200 focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4">
          <NavLinks
            isLoggedIn={isLoggedIn}
            handleSignOut={handleSignOut}
            mobile
          />
        </div>
      )}
    </header>
  );
}

function NavLinks({ isLoggedIn, handleSignOut, mobile = false }) {
  const linkClass = `text-slate-200 text-lg font-light hover:text-blue-500 ${
    mobile ? "block" : ""
  }`;

  return (
    <>
      <Link to="/" className={linkClass}>
        Linkedin
      </Link>
      <Link to="/" className={linkClass}>
        X / Twitter
      </Link>
      {isLoggedIn ? (
        <button
          onClick={handleSignOut}
          className="px-6 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500"
        >
          Signout
        </button>
      ) : (
        <Link to="/signin">
          <button className="px-6 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500">
            Signin
          </button>
        </Link>
      )}
    </>
  );
}
