"use client";

import { signup } from "@/actions/useUserAction";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod"; // Import Zod
import Image from "next/image";

// Define the Zod schema for validation
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "User",
  });
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await signup(formData);
      console.log(response);
      if (response.success === false) {
        setError(response);
      } else {
        router.push("/login?success=true");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
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
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Create an Account
            </h2>
            {/* Form Fields */}
            <div className="mb-4 text-gray-700 font-medium">
              {error && (
                <span className="my-2 text-red-500 text-sm">
                  {error?.firstName}
                </span>
              )}
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
            <div className="mb-4 text-gray-700 font-medium">
              {error && (
                <span className="my-2 text-red-500 text-sm">
                  {error?.lastName}
                </span>
              )}
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
            <div className="mb-4 text-gray-700 font-medium">
              {error && (
                <span className="my-2 text-red-500 text-sm">
                  {error?.message}
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
            <div className="mb-4 text-gray-700 font-medium">
              {error && (
                <span className="my-2 text-red-500 text-sm">
                  {error?.password}
                </span>
              )}
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
      </section>
    </div>
  );
};

export default SignupForm;
