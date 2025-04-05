"use client";

import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-6 lg:px-8 py-12 bg-white">
      {/* Left Section: Text Content */}
      <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Your Smile,</span>
          <span className="block text-blue-600">Our Priority</span>
        </h1>
        <p className="text-base text-gray-500 sm:text-lg md:text-xl">
          Experience exceptional dental care with our team of professionals. We
          provide comprehensive dental services to keep your smile healthy and
          beautiful.
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
          <Link
            href="/booking"
            className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
          >
            Book Appointment
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
          >
            Our Services
          </Link>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="hidden lg:flex justify-center">
        <Image
          src="/images/homePageImage.jpg"
          alt="Dental care illustration"
          width={600}
          height={400}
          className="object-cover rounded-lg shadow-lg"
          priority
        />
      </div>
    </div>
  );
};

export default HomePage;
