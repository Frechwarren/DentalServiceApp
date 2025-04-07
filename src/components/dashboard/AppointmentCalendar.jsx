"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";

const AppointmentCalendar = ({ appointments, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const tileContent = ({ date }) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const dayAppointments = appointments.filter(
      (apt) => apt.date === dateStr && apt.status === "upcoming"
    );

    if (dayAppointments.length > 0) {
      return (
        <div className="text-xs text-blue-600 font-medium">
          {dayAppointments.length} appointment
          {dayAppointments.length > 1 ? "s" : ""}
        </div>
      );
    }
    return null;
  };

  const handleDateClick = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      onDateSelect(value);
    }
  };

  return (
    <div className="bg-white text-gray-800 p-4 rounded-lg shadow">
      <Calendar
        onChange={handleDateClick}
        value={selectedDate}
        tileContent={tileContent}
        className="w-full border-none"
        minDate={new Date()}
        tileClassName="hover:bg-blue-50"
      />
    </div>
  );
};

export default AppointmentCalendar;
