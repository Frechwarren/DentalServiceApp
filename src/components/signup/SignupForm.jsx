"use client";

import { registerUser } from "@/actions/userController";
import { useActionState } from "react";
import { useState } from "react";

const SignupForm = () => {
  const [state, action, pending] = useActionState(registerUser, {});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("State", state);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col gap-8 w-full max-w-full p-6 lg:p-12">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Sign Up
          </h2>
          <form action={(formData) => action(formData)} className="space-y-6">
            {/* First Name*/}
            <div className="mb-4 text-black font-medium">
              <input
                type="firstName"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your first name"
                required
              />
            </div>
            {/* Last Name*/}
            <div className="mb-4 text-black font-medium">
              <input
                type="lastName"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your last name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4 text-black font-medium">
              {state.errors?.email && (
                <span className="text-red-500 text-sm">
                  {state.errors.email._errors
                    ? state.errors.email._errors[0]
                    : state.errors.email.message}
                </span>
              )}
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

            {/* Password Input */}
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
              {state.errors?.password && (
                <span className="text-red-500 text-sm">
                  {state.errors.password._errors[0]}
                </span>
              )}
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {pending ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
