"use client";

import Link from "next/link";
import { useState } from "react";
import { userLogin } from "@/actions/useUserAction";
import Image from "next/image";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false); // State to track success
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
    console.log(response);

    if (response?.success === false || response.data?.success === false) {
      setError(response.message);
      setPending(false);
    } else {
      setSuccess(true); // Show success state
      setTimeout(() => {
        if (response.data.role !== "Admin") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/admin";
        }
      }, 1500);
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-white">
      <section className="hidden h-screen items-center justify-center lg:flex lg:justify-center lg:w-1/2">
        <Image
          src="/images/homePageImage.jpg"
          alt="login"
          height={1000}
          width={1000}
          className="object-cover h-screen backdrop-blur-3xl z-10"
          priority
        />
      </section>
      <section className="w-screen items-center justify-center p-5 lg:p-10 lg:flex lg:justify-center lg:w-1/2">
        <div className="flex flex-col justify-center item-center bg-white lg:w-[500px] w-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
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
                disabled={pending || success}
                type="submit"
                className={`w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-2xl text-white ${
                  success
                    ? `bg-green-600 hover:bg-green-700 `
                    : `bg-blue-600 hover:bg-blue-700 `
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  success ? `focus:ring-green-500` : `focus:ring-blue-500`
                }`}
              >
                {pending ? (
                  success ? (
                    <div className="flex items-center">Success</div>
                  ) : (
                    <div className="lds-ellipsis mr-2">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  )
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
