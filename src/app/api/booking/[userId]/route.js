import dbConnect from "@/lib/dbConnect";
import Bookings from "@/models/Booking";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { userId } = await params;
  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        message: "User ID is required",
      },
      { status: 400 }
    ); // Return 400 if userId is missing
  }

  try {
    await dbConnect();
    const data = await Bookings.find({ userId: userId });

    if (data.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No booked schedule was found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Booked schedule found",
      data,
    });
  } catch (error) {
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

export async function PUT(req, { params }) {
  const { userId } = await params;
  const { dateAndTime } = await req.json();

  if (!userId || !dateAndTime) {
    return NextResponse.json({
      message: "User ID and dateAndTime are required",
    });
  }

  try {
    await dbConnect();
    const data = await Bookings.findByIdAndUpdate(userId, {
      time: dateAndTime.time,
      date: dateAndTime.date,
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
