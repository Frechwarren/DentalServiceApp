"use client";

import Image from "next/image";
import Link from "next/link";
import ServiceContainer from "../services/ServiceContainer";

const HomePage = () => {
  return (
    <main className="m-h-screen ">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-6 lg:px-8 py-12">
        {/* Left Section: Text Content */}
        <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your Smile,</span>
            <span className="block text-blue-600">Our Priority</span>
          </h1>
          <p className="text-base text-gray-500 sm:text-lg md:text-xl">
            Experience exceptional dental care with our team of professionals.
            We provide comprehensive dental services to keep your smile healthy
            and beautiful.
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

      {/* Services Section */}
      <ServiceContainer />

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best dental care experience with our
              state-of-the-art facilities and experienced team of professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-zinc-600 text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Our experienced dentists and staff are dedicated to providing
                the best care.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-zinc-600 text-xl font-semibold mb-2">Modern Facilities</h3>
              <p className="text-gray-600">
                State-of-the-art equipment and comfortable environment for your
                dental care.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-zinc-600 text-xl font-semibold mb-2">Flexible Hours</h3>
              <p className="text-gray-600">
                Convenient appointment times to fit your busy schedule.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
