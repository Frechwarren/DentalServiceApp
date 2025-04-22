"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarMenu = ({ authenticate }) => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative flex-wrap justify-center item-center py-3 sm:hidden">
      <div className="flex justify-end items-center sm:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-500"
        >
          <span className="sr-only">Open main menu</span>
          {!isMenuOpen ? (
            <svg
              className="block h-6 w-6 stroke-zinc-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6 stroke-zinc-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="relative sm:hidden justify-center items-center bg-white border-2 border-zinc-400 py-3 rounded-md shadow-lg">
          <div className="pt-2 pb-3 space-y-1 text-end">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-zinc-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/booking"
              className={`block px-3 py-2 text-base font-medium ${
                path.split("/")[1] === "booking"
                  ? "text-blue-600"
                  : "text-gray-700"
              } hover:text-blue-600 hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Book Appointment
            </Link>
            <Link
              href="/services"
              className={`block px-3 py-2 text-base font-medium ${
                path.split("/")[1] === "services"
                  ? "text-blue-600"
                  : "text-gray-700"
              } hover:text-blue-600 hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Service
            </Link>
            <Link
              href="/login"
              className={`block px-3 py-2 text-base font-medium ${
                path.split("/")[1] === "login"
                  ? "text-blue-600"
                  : "text-gray-700"
              } hover:text-blue-600 hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMenu;
