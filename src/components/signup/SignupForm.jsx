"use client";

import { signup } from "@/actions/useUserAction";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod"; // Import Zod
import Image from "next/image";
import { modalTriggerContext } from "../context/ModalProvide";

// Define the Zod schema for validation
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(30),
  lastName: z.string().min(1, "Last name is required").max(30),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(50),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignupForm = () => {
  const { openSignUpModalHandler } = modalTriggerContext();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "User",
  });
  const [error, setError] = useState([]);
  const [pending, setPending] = useState(false);
  const formValidation = signupSchema.safeParse(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => prev.filter((i) => i.field !== name));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    if (!formValidation?.success) {
      const errors = formValidation.error.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      }));

      setError(errors);
    } else {
      try {
        const response = await signup(formData);
        if (response.success === false) {
          setError([response]);
        } else {
          openSignUpModalHandler(false);
          router.push("/login");
        }
      } catch (error) {
        console.error("Error signing up:", error);
        setError(error.message);
      }
    }
    setPending(false);
  };

  return (
    <div className="flex items-center min-h-screen bg-white">
      <section className="hidden items-center justify-center lg:flex lg:justify-center lg:w-1/2 lg:h-1/2 overflow-hidden">
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
                  {error?.filter((i) => i.field === "firstName")[0]?.message}
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
                suppressHydrationWarning={true}
              />
            </div>
            <div className="mb-4 text-gray-700 font-medium">
              {error && (
                <span className="my-2 text-red-500 text-sm">
                  {error?.filter((i) => i.field === "lastName")[0]?.message}
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
                suppressHydrationWarning={true}
              />
            </div>
            <div className="mb-4 text-gray-700 font-medium">
              {error && (
                <span className="my-2 text-red-500 text-sm">
                  {error?.filter((i) => i.field === "email")[0]?.message}
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
                suppressHydrationWarning={true}
              />
            </div>
            <div className="mb-4 text-gray-700 font-medium">
              {error && (
                <span className="my-2 text-red-500 text-sm">
                  {error?.filter((i) => i.field === "password")[0]?.message}
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
                suppressHydrationWarning={true}
              />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                disabled={pending}
                type="submit"
                className="w-full flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {pending ? (
                  <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupForm;
