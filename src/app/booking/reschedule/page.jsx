"use client";

import {
  getBookedSchedule,
  rescheduleBooking,
} from "@/actions/useBookServiceAction";
import RescheduleDate from "@/components/booking/reschedule/RescheduleDate";
import { getUserIdFromCookie } from "@/lib/userData";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("id");
  const [appointment, setAppointment] = useState(null);
  const [dateAndTime, setDateAndTime] = useState(null);

  useEffect(() => {
    const getAppointment = async () => {
      const userId = await getUserIdFromCookie();
      if (!userId) {
        window.location.href = "/login";
      }

      const data = await getBookedSchedule(userId);
      if (!data) {
        console.error("BookedSchedule data not found");
        return;
      }
      setAppointment(data.data);
    };
    getAppointment();
  }, []);

  const handleRescheduleDateAndTimeSelect = (dateAndTime) => {
    setDateAndTime(dateAndTime);
  };

  const handleReschedule = async () => {
    const userId = await getUserIdFromCookie();
    if (!userId) {
      window.location.href = "/login";
    }
    const data = await rescheduleBooking(appointmentId, dateAndTime);
    if (!data) {
      console.error("Rescheduling data not found");
      return;
    }
    window.location.href = "/dashboard";
  };

  return (
    <div className="w-screen items-center justify-center overflow-y-auto">
      <RescheduleDate
        onSelectDateAndTime={handleRescheduleDateAndTimeSelect}
        onReschedule={handleReschedule}
      />
    </div>
  );
};

export default page;
