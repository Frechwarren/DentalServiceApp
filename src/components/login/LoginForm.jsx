"use client";

import Link from "next/link";
import { useState } from "react";
import { userLogin } from "@/actions/useUserAction";
import { useSearchParams, useRouter } from "next/navigation";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") || false;
  const router = useRouter();

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
    console.log(response);

    if (response?.success === false || response.data?.success === false) {
      setError(response.message);
    } else if (response.data.role !== "Admin") {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/admin";
    }
    setPending(false);
  };

  return (
    <>
      <SuccessDialog open={success} router={router} />
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
    </>
  );
};

const SuccessDialog = ({ open, router }) => {
  const handleConfirm = () => {
    router.push("/login");
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      hidden={!open}
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    You have successfully registered your account
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      To check your appointment details, please login to your
                      account
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={handleConfirm}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
