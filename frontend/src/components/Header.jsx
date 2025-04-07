import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../redux/slices/authSlice";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(clearUser());
  };

  return (
    <div className="flex justify-between px-6 border-b py-3 border-slate-700">
      <Link to="/">
        <h1 className="text-2xl font-serif font-bold text-blue-600 hover:text-blue-700">
          Webuzz
        </h1>
      </Link>
      <nav className="flex gap-8 items-center">
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
        <Link to="/" className="hover:underline text-slate-200">
          Linkedin
        </Link>
        <Link to="/" className="hover:underline text-slate-200">
          X / Twitter
        </Link>
      </nav>
    </div>
  );
}
