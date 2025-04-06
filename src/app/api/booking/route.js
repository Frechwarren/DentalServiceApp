import dbConnect from "@/lib/dbConnect";
import Bookings from "@/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Connect to the database
    await dbConnect();

    const booked = new Bookings(body);
    await booked.save();

    return NextResponse.json({
      message: "Booking created",
      success: true,
      status: 201,
    });
  } catch (error) {
    console.error("Error creating booking:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          message: "Validation error. Please check your input.",
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "An unexpected error occurred. Please try again later.",
        success: false,
      },
      { status: 500 }
    );
  }
}
