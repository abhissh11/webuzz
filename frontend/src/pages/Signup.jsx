import React, { useState } from "react";
import { axiosInstance } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

// Toast notification configuration
const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      const { message } = res.data;

      toast.success(message || "Signup successful!", toastOptions);

      // Reset form fields
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Signup failed. Try again.";
      toast.error(errorMsg, toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 w-full flex flex-col gap-10 justify-center items-center">
      <h1 className="text-2xl font-bold text-blue-500">Sign Up</h1>
      <form
        onSubmit={handleSignup}
        className="w-3/4 md:w-[40%] lg:w-[30%] flex flex-col gap-4 p-10 rounded-lg shadow-lg shadow-blue-900 hover:shadow-2xl hover:shadow-indigo-900"
      >
        {/* Username Input */}
        <div className="w-full flex flex-col gap-2 items-start">
          <label className="text-lg font-semibold text-gray-200">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="TylerDurden"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-sm font-normal text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Email Input */}
        <div className="w-full flex flex-col gap-2 items-start">
          <label className="text-lg font-semibold text-gray-200">Email</label>
          <input
            type="email"
            name="email"
            placeholder="tyler@webuzz.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-sm font-normal text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Password Input */}
        <div className="w-full flex flex-col gap-2 items-start">
          <label className="text-lg font-semibold text-gray-200">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="do-not-talk-about-it"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-sm font-normal text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex flex-col gap-2 items-start w-full">
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded-lg text-white font-semibold transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p className="text-indigo-100 text-sm">
            Already have an account?{" "}
            <Link to="/signin">
              <span className="hover:underline cursor-pointer hover:text-indigo-500">
                Signin
              </span>
            </Link>
          </p>
        </div>
      </form>

      {/* Toast Container (Required for toast notifications) */}
      <ToastContainer />
    </div>
  );
}
