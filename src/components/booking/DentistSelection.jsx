"use client";

import { useState } from "react";
import Image from "next/image";
import dentists from "@/mockData/dentist.json";

const DentistSelection = ({ onSelectDentist, dentistData }) => {
  const handleDentistSelect = (dentist) => {
    onSelectDentist(dentist);
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Dentist
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Select a dentist from our experienced team of professionals.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dentists.map((dentist) => (
            <div
              key={dentist.id}
              id="date"
              className={`relative rounded-lg border p-6 cursor-pointer transition-all duration-200 ${
                dentistData.id === dentist.id
                  ? "border-blue-500 shadow-lg"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => handleDentistSelect(dentist)}
            >
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={dentist.image}
                  alt={dentist.name}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover w-full h-full"
                  priority
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {dentist.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {dentist.specialization}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm text-gray-600">
                    {dentist.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {dentist.experience}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DentistSelection;
