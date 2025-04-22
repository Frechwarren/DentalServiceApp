import dbConnect from "@/lib/dbConnect";
import Bookings from "@/models/Booking";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = await params;
  const { status } = await req.json();

  // Validate the ID format
  if (!id) {
    return NextResponse.json({
      message: "Invalid Booking ID format",
    });
  }

  try {
    await dbConnect();
    const data = await Bookings.findByIdAndUpdate(id, {
      status: status,
    });

    if (!data) {
      return NextResponse.json({
        message: "Booking not found",
      });
    }

    return NextResponse.json({
      message: "Booking updated",
      data,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error updating booking",
      error,
    });
  }
}
