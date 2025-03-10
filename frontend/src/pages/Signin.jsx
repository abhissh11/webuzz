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

export default function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/signin", formData);
      const { user } = res.data;
      console.log({ user });

      toast.success("Signin Successful!", toastOptions);

      // Reset fields on success
      setFormData({ email: "", password: "" });
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Signin failed. Please try again.";
      setError(errorMsg);

      toast.error(errorMsg, toastOptions);

      // Reset fields on error
      setFormData({ email: "", password: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 w-full flex flex-col gap-10 justify-center items-center">
      <h1 className="text-2xl font-bold text-blue-500">Sign In</h1>
      <form
        onSubmit={handleSignin}
        className="w-3/4 md:w-[40%] lg:w-[30%] flex flex-col gap-4 p-10 rounded-lg shadow-lg shadow-blue-900 hover:shadow-2xl hover:shadow-indigo-900"
      >
        {/* Email Input */}
        <div className="w-full flex flex-col gap-2 items-start">
          <label className="text-lg font-semibold text-gray-200">Email</label>
          <input
            type="email"
            name="email"
            placeholder="name@webuzz.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-sm font-normal text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            placeholder="xyr@549"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-sm font-normal text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-indigo-100 text-sm">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="hover:underline cursor-pointer hover:text-indigo-500">
                Signup
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
