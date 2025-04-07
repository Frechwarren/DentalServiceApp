"use client";

import Link from "next/link";
import { useState } from "react";
import { userLogin } from "@/actions/useUserAction";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const response = await userLogin(formData);
    if (!response.success) {
      setError(response.errors.message);
    } else {
      window.location.href = "/dashboard";
    }
    setPending(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col gap-8 w-full max-w-full p-6 lg:p-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Log In
          </h2>
          <p className="text-center text-[16px] text-gray-900 mb-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-400">
              Sign Up
            </Link>
          </p>

          {/* Email Input */}
          <div className="mb-6 text-gray-700 font-medium">
            {error && (
              <p className="text-center text-red-500 text-sm">{error}</p>
            )}
            <input
              type="email"
              id="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
            />
            <input
              type="password"
              id="password"
              name="password"
              value={formData?.password}
              onChange={handleChange}
              required
              className="mt-3 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {pending ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
