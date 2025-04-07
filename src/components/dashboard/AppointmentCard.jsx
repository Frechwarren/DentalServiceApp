import Image from "next/image";
import { useState } from "react";
import AppointmentFeedback from "./AppointmentFeedback";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/lib/useSendEmail";
import { confirmBooking, notifyPatient } from "@/actions/useBookServiceAction";

// check if the appointment is upcoming
function isUpcoming(dateString) {
  const inputDate = new Date(dateString);
  const today = new Date();

  // Strip time from both dates
  const input = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffInDays = (input - now) / (1000 * 60 * 60 * 24);

  return diffInDays === 1 ? "" : "upcoming";
}

const AppointmentCard = ({ appointment, userRole }) => {
  const router = useRouter();
  const [showFeedback, setShowFeedback] = useState(false);
  const [actionStatus, setActionStatus] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "notified":
        return "bg-violet-100 text-violet-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReschedule = () => {
    router.push(
      `/booking/reschedule?id=${appointment._id}`
    );
  };

  const handleCancel = () => {
    router.push(
      `/dashboard?open=true&type=cancel&id=${appointment._id}&userRole=${userRole.role}`
    );
  };

  const handleDelete = async () => {
    router.push(
      `/dashboard?open=true&type=delete&id=${appointment._id}&userRole=${userRole.role}`
    );
  };

  const handleFeedbackSubmit = async (feedback) => {
    console.log("Submitting feedback:", feedback);
    setShowFeedback(false);
  };

  const handleNotifyPatient = async (e) => {
    e.preventDefault();
    setActionStatus("notified");
    try {
      await notifyPatient({ bookingId: appointment._id, status: "notified" });
      await sendEmail(e.target);
    } catch (error) {
      setError("Failed on sending an email. Please try again.");
    }
    setTimeout(() => {
      setActionStatus("");
    }, 3000);
  };

  const handleConfirmAppointment = async (e) => {
    e.preventDefault();
    setActionStatus("confirmed");
    await confirmBooking({
      bookingId: appointment._id,
      status: "confirmed",
    });
    setTimeout(() => {
      setActionStatus("");
    }, 3000);
  };
  // Ensure consistent date formatting
  const formattedDate = new Date(appointment.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={appointment.dentist.image}
                alt={appointment.dentist.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
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
            {appointment.status}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Date</p>
            <p className="mt-1 text-sm text-gray-900">{formattedDate}</p>
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
        <div
          className="flex mt-4 justify-end items-end"
          hidden={actionStatus === ""}
        >
          <p
            className={`text-sm font-medium ${
              actionStatus === "notified" ? "text-violet-500" : "text-green-500"
            }`}
          >
            {actionStatus === "notified"
              ? "Notified patient via email"
              : "Appointment confirmed"}
          </p>
        </div>

        <div className="mt-6 flex justify-end items-center space-x-4">
          <button
            suppressHydrationWarning={true}
            onClick={handleReschedule}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reschedule
          </button>
          {/* hidden input */}
          <form onSubmit={handleNotifyPatient}>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={appointment?.email}
              hidden
            />
            <input
              type="text"
              id="reason"
              name="reason"
              defaultValue={appointment?.type}
              hidden
            />
            <input
              type="text"
              id="date"
              name="date"
              defaultValue={formattedDate}
              hidden
            />
            <input
              type="text"
              id="dentist"
              name="dentist"
              defaultValue={appointment?.dentist.name}
              hidden
            />
            <button
              suppressHydrationWarning={true}
              type="submit"
              hidden={userRole?.role !== "Admin"}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-violet-800 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Notify Patient
            </button>
          </form>
          <button
            suppressHydrationWarning={true}
            onClick={handleConfirmAppointment}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Confirm
          </button>
          <button
            suppressHydrationWarning={true}
            onClick={
              appointment.status === "cancelled" ? handleDelete : handleCancel
            }
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {appointment.status === "cancelled" ? "Delete" : "Cancel"}
          </button>
        </div>

        {appointment?.status === "completed" && !showFeedback && (
          <div className="mt-6">
            <button
              suppressHydrationWarning={true}
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
