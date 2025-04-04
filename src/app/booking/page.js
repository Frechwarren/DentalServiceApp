"use client";

import { useState } from "react";
import DentistSelection from "@/components/booking/DentistSelection";
import TimeSlotPicker from "@/components/booking/TimeSlotPicker";
import AppointmentForm from "@/components/booking/AppointmentForm";

export default function BookingPage() {
  const [bookingData, setBookingData] = useState({
    dentist: {
      id: "",
      name: "",
      specialization: "",
      image: "",
      rating: 0,
      experience: "",
    },
    date: null,
    time: null,
    formData: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      reason: "",
      notes: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleDentistSelect = (dentist) => {
    setBookingData((prev) => ({ ...prev, dentist }));
    setCurrentStep(2);
  };

  const handleTimeSelect = (time) => {
    setBookingData((prev) => ({ ...prev, time }));
    setCurrentStep(3);
  };

  const handleFormSubmit = (formData) => {
    setBookingData((prev) => ({ ...prev, formData }));
    // Here you would typically send the data to your backend
    console.log("Booking completed:", { ...bookingData, formData });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Steps */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  Choose Dentist
                </div>
                <div className="text-sm text-gray-500">
                  Select your preferred dentist
                </div>
              </div>
            </div>

            <div className="flex items-center mx-8">
              <div className="w-16 h-0.5 bg-gray-200" />
            </div>

            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  Select Time
                </div>
                <div className="text-sm text-gray-500">
                  Pick your appointment time
                </div>
              </div>
            </div>

            <div className="flex items-center mx-8">
              <div className="w-16 h-0.5 bg-gray-200" />
            </div>

            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  Fill Details
                </div>
                <div className="text-sm text-gray-500">
                  Complete your information
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Components */}
      <div className="py-8">
        {currentStep === 1 && (
          <DentistSelection onSelectDentist={handleDentistSelect} />
        )}
        {currentStep === 2 && (
          <TimeSlotPicker onSelectTime={handleTimeSelect} />
        )}
        {currentStep === 3 && <AppointmentForm onSubmit={handleFormSubmit} />}
      </div>
    </div>
  );
}
