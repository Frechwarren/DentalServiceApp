import dbConnect from "@/lib/dbConnect";
import Users from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// signup route
export async function POST(req) {
  const { firstName, lastName, email, password } = await req.json();

  try {
    // Connect to the database
    await dbConnect();

    // Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        message: "Email already in use",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new Users({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "User",
    });
    await user.save();

    return NextResponse.json({
      message: "User created",
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
