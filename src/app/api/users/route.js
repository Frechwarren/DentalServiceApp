import dbConnect from "@/lib/dbConnect";
import Users from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// signup route
export async function POST(req) {
  const { firstName, lastName, email, password } = await req.json();

  // Connect to the database
  await dbConnect();

  // Check if the user already exists
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return NextResponse.json({
      success: false,
      email: ["Email already in use"],
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new Users({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await user.save();

  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "24h" });

  // Await the cookies() function
  const cookieStore = await cookies();

  cookieStore.set("dentalserviceapp", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: "strict",
    secure: true,
  });

  return NextResponse.json({
    message: "User created",
    success: true,
  });
}
