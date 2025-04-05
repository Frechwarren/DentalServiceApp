import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  const failObject = NextResponse.json({
    success: false,
    errors: { message: "Invalid email or password" },
  });
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
  const token = jwt.sign({ userId: existingUser._id }, secretKey, {
    expiresIn: "24h",
  });

  const cookieStore = await cookies();
  cookieStore.set("dentalserviceapp", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: "strict",
    secure: true,
  });

  return NextResponse.json({
    success: true,
    message: "Log in successfully",
  });
}
