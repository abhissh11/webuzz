import React from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Chatroom from "./pages/Chatroom";
import Signin from "./pages/Signin";

export default function App() {
  return (
    <div className="">
      <Header />
      <main className="mx-4">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/chat" element={<Chatroom />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </main>
    </div>
  );
}
