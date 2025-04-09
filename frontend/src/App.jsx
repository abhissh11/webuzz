import React from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Chatroom from "./pages/Chatroom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ChatPage from "./pages/ChatPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="">
      <Header />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#0d9488",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "500",
            padding: "12px 16px",
            borderRadius: "8px",
          },
          duration: 3000,
        }}
      />
      <main className="">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/chat" element={<Chatroom />}></Route>
          <Route path="/chatroom" element={<ChatPage />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </main>
    </div>
  );
}
