"use client";

import { useState } from "react";

const RescheduleDate = ({ onSelectDateAndTime, onReschedule }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  // Generate time slots for the selected date
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        id: `${hour}:00`,
        time: `${hour}:00`,
        available: Math.random() > 0.3, // Randomly mark some slots as unavailable
      });
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    onSelectDateAndTime({ time, date: selectedDate });
  };

  const handleReschedule = () => {
    onReschedule();
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Select Appointment Time
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Choose a convenient time slot for your appointment.
          </p>
        </div>

        <div className="mt-12">
          {/* Date Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select Date
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(14)].map((_, index) => {
                const date = new Date();
                date.setDate(date.getDate() + index);
                const isSelected =
                  date.toDateString() === selectedDate.toDateString();

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    suppressHydrationWarning={true}
                    className={`p-4 rounded-lg border ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div className="text-sm text-gray-500">
                      {date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Available Time Slots
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  suppressHydrationWarning={true}
                  disabled={!slot.available}
                  className={`p-4 rounded-lg border text-center ${
                    !slot.available
                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                      : selectedTime === slot.time
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 text-gray-700"
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleReschedule}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleDate;
