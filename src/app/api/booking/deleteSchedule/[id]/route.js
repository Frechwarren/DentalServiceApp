import dbConnect from "@/lib/dbConnect";
import Bookings from "@/models/Booking";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id: appointmentId } = await params;
  if (!appointmentId) {
    return NextResponse.json({
      message: "Appointment ID is required",
    });
  }

  try {
    await dbConnect();
    const data = await Bookings.findByIdAndDelete(appointmentId);

    if (!data) {
      return NextResponse.json({
        message: "Booking not found",
      });
    }

    return NextResponse.json({
      message: "Booking deleted",
      data,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting booking",
      error,
    });
  }
}
