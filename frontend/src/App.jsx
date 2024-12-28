import React from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "./pages/About";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </div>
  );
}
