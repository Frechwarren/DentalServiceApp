"use client";

import Link from "next/link";
import { authUser, logoutUser } from "@/lib/userAuthentication";
import NavbarMenu from "./NavbarMenu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const { route } = useRouter();
  const [authenticate, setAuthenticate] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticatedUser = await authUser();
      if (authenticatedUser) {
        setAuthenticate(true);
        setUserRole(authenticatedUser.role);
      } else {
        setAuthenticate(false);
      }
    };
    checkAuth();
  }, [route]);

  const handleLogoutUser = async () => {
    const response = await logoutUser();
    if (response?.success) {
      window.location.href = "/";
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <a
              href={
                userRole === "Admin"
                  ? "/admin"
                  : authenticate
                  ? "/dashboard"
                  : "/"
              }
              className="flex items-center"
            >
              <span className="text-2xl font-bold text-blue-600">
                DentalCare
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {userRole !== "Admin" && (
              <>
                <Link
                  href="/booking"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/services"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Services
                </Link>
                <Link
                  href="#contactInfo"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact Us
                </Link>
              </>
            )}

            {authenticate && (
              <button
                onClick={handleLogoutUser}
                className="bg-blue-600 text-white px-4 py-[10px] rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Logout
              </button>
            )}

            {!authenticate && (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-[10px] rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}

          <NavbarMenu authenticate={authenticate} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
