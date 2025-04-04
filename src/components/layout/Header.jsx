import Link from "next/link";
import { authUser } from "@/lib/userAuthentication";
import { logoutUser } from "@/actions/userController";
import NavbarMenu from "./NavbarMenu";

const Header = async () => {
  const user = await authUser();

  return (
    <header className="bg-white shadow-sm">
      <nav className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href={user ? "/pages/dashboard" : "/"}
              className="flex items-center"
            >
              <span className="text-2xl font-bold text-blue-600">
                DentalCare
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {!user && (
              <>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/pages/booking"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Services
                </Link>
              </>
            )}
            {user && (
              <form action={logoutUser}>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-[10px] rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Logout
                </button>
              </form>
            )}
            {!user && (
              <Link
                href="/pages/login"
                className="bg-blue-600 text-white px-4 py-[10px] rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}

          <NavbarMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
