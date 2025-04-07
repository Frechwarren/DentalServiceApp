"use client";

import { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import AppointmentCalendar from "./AppointmentCalendar";
import { format, parseISO } from "date-fns";

const AppointmentList = ({ searchQuery = "", appointmentData, userRole }) => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-asc");
  const [viewMode, setViewMode] = useState("card");
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredAppointments = appointmentData?.filter((appointment) => {
    const matchesFilter = filter === "all" || appointment.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      appointment.dentist.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase());

    // Format the date to YYYY-MM-DD if needed
    const initialData = new Date(appointment?.date);
    initialData.setDate(initialData.getDate() + 1);
    const formattedDate = initialData.toISOString().split("T")[0];

    const matchesDate =
      !selectedDate || formattedDate === format(selectedDate, "yyyy-MM-dd");
    return matchesFilter && matchesSearch && matchesDate;
  });

  const sortedAppointments = filteredAppointments?.sort((a, b) => {
    switch (sortBy) {
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "time-asc":
        return (
          parseISO(`2000-01-01T${a.time}`).getTime() -
          parseISO(`2000-01-01T${b.time}`).getTime()
        );
      case "time-desc":
        return (
          parseISO(`2000-01-01T${b.time}`).getTime() -
          parseISO(`2000-01-01T${a.time}`).getTime()
        );
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-1xl lg:text-2xl font-bold text-gray-900">
            My Appointments
          </h2>
          <select
            suppressHydrationWarning={true}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-48 pl-3 pr-10 py-2 text-gray-900 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All Appointments</option>
            <option value="scheduled">Scheduled</option>
            <option value="rescheduled">Rescheduled</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <select
            suppressHydrationWarning={true}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block w-48 pl-3 pr-10 py-2 text-gray-900 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="date-asc">Date (Earliest)</option>
            <option value="date-desc">Date (Latest)</option>
            <option value="time-asc">Time (Earliest)</option>
            <option value="time-desc">Time (Latest)</option>
            <option value="status">Status</option>
          </select>

          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => {
                setViewMode("card");
                setSelectedDate(null);
              }}
              suppressHydrationWarning={true}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                viewMode === "card"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Card
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              suppressHydrationWarning={true}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                viewMode === "calendar"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>

      {viewMode === "calendar" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AppointmentCalendar
              appointments={appointmentData}
              onDateSelect={setSelectedDate}
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              {selectedDate
                ? `Appointments for ${format(selectedDate, "MMMM d, yyyy")}`
                : "Select a date"}
            </h3>
            {selectedDate && (
              <div className="space-y-4">
                {sortedAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment?._id}
                    appointment={appointment}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {sortedAppointments.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500">No appointments found</p>
            </div>
          ) : (
            sortedAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment?._id}
                appointment={appointment}
                userRole={userRole}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
