"use client";

import Image from "next/image";
import { useState } from "react";
import AppointmentFeedback from "./AppointmentFeedback";

const AppointmentCard = ({ appointment }) => {
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReschedule = () => {
    setIsRescheduling(true);
    // Here you would typically open a modal or navigate to a rescheduling page
  };

  const handleCancel = () => {
    // Here you would typically show a confirmation dialog and handle the cancellation
    console.log("Cancelling appointment:", appointment.id);
  };

  const handleFeedbackSubmit = async (feedback) => {
    // Here you would typically send the feedback to your backend
    console.log("Submitting feedback:", feedback);
    setShowFeedback(false);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={appointment.dentist.image}
                alt={appointment.dentist.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                {appointment.dentist.name}
              </h3>
              <p className="text-sm text-gray-500">
                {appointment.dentist.specialization}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              appointment.status
            )}`}
          >
            {appointment.status.charAt(0).toUpperCase() +
              appointment.status.slice(1)}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Date</p>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(appointment.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Time</p>
            <p className="mt-1 text-sm text-gray-900">{appointment.time}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Type</p>
            <p className="mt-1 text-sm text-gray-900">{appointment.type}</p>
          </div>
        </div>

        {appointment.status === "upcoming" && (
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleReschedule}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reschedule
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
          </div>
        )}

        {appointment.status === "completed" && !showFeedback && (
          <div className="mt-6">
            <button
              onClick={() => setShowFeedback(true)}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Leave Feedback
            </button>
          </div>
        )}

        {showFeedback && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <AppointmentFeedback
              appointmentId={appointment.id}
              onSubmit={handleFeedbackSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
