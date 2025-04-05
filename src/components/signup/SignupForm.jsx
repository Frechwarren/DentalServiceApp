"use client";

import { signup } from "@/actions/useUserAction";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await signup(formData);

      if (!response.success) {
        setError("An error occurred during signup.");
      } else {
        router.push("/login");
      }
    } catch (validationError) {
      setError("An unexpected error occurred.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col gap-8 w-full max-w-full p-6 lg:p-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Sign Up
          </h2>
          {/* Form Fields */}
          <div className="mb-4 text-black font-medium">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-4 text-black font-medium">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="mb-4 text-black font-medium">
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4 text-black font-medium">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-3 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {pending ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
