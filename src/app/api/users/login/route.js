import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Bookings from "@/models/Booking";

export async function POST(req) {
  const { email, password } = await req?.json();
  
  if (!email || !password) {
    return NextResponse.json({
      success: false,
      message: "Email and password are required",
      role: "",
    });
  }

  const failObject = NextResponse.json({
    success: false,
    message: "Invalid email or password",
    role: "",
  });
  try {
    // Connect to the database
    await dbConnect();

    // Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return failObject;
    }

    // match the password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return failObject;
    }

    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(
      { userId: existingUser._id, role: existingUser.role },
      secretKey,
      {
        expiresIn: "24h",
      }
    );

    const cookieStore = await cookies();
    cookieStore.set("dentalserviceapp", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict",
      secure: true,
    });

    const findBooking = await Bookings.find({ email: existingUser.email });

    for (const booking of findBooking) {
      await Bookings.findByIdAndUpdate(booking._id, {
        userId: existingUser._id,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Log in successfully",
      data: {
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
