import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  // Connect to the database
  await dbConnect();

  const booked = new Booking(body);
  await booked.save();

  return NextResponse.json({
    message: "Booking created",
    success: true,
    status: 201,
  });
}
