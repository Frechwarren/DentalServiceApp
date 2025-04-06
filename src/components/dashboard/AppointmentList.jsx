"use client";

import { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import AppointmentCalendar from "./AppointmentCalendar";
import { format, parseISO } from "date-fns";

const mockAppointments = [
  {
    id: "1",
    dentist: {
      name: "Dr. Sarah Wilson",
      specialization: "General Dentistry",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    date: "2024-03-25",
    time: "10:00 AM",
    status: "upcoming",
    type: "Dental Cleaning",
  },
  {
    id: "2",
    dentist: {
      name: "Dr. Michael Chen",
      specialization: "Orthodontics",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    date: "2024-03-20",
    time: "2:30 PM",
    status: "completed",
    type: "Consultation",
  },
];

const AppointmentList = ({ searchQuery = "" }) => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-asc");
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredAppointments = mockAppointments.filter((appointment) => {
    const matchesFilter = filter === "all" || appointment.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      appointment.dentist.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate =
      !selectedDate || appointment.date === format(selectedDate, "yyyy-MM-dd");
    return matchesFilter && matchesSearch && matchesDate;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
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
          <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
          <select
            suppressHydrationWarning={true}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All Appointments</option>
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
            className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="date-asc">Date (Earliest)</option>
            <option value="date-desc">Date (Latest)</option>
            <option value="time-asc">Time (Earliest)</option>
            <option value="time-desc">Time (Latest)</option>
            <option value="status">Status</option>
          </select>
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("calendar")}
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
              appointments={mockAppointments}
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
                    key={appointment.id}
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
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
