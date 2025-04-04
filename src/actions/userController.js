"use server";

import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function registerUser(previousState, formData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate the input using zod
  const validationResult = userSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
  });

  if (!validationResult.success) {
    // Return validation errors
    return {
      success: false,
      errors: validationResult.error.format(),
    };
  }

  // Connect to the database
  await dbConnect();

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      success: false,
      errors: { email: { message: "Email already in use" } },
    };
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({
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
  });

  return redirect("/pages/login");
}

export async function loginUser(previousState, formData) {
  const failLogin = {
    success: false,
    errors: { error: { message: "Invalid email or password" } },
  };

  const email = formData.get("email");
  const password = formData.get("password");

  // Connect to the database
  await dbConnect();

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return failLogin;
  }

  // Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    return failLogin;
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
  });

  return redirect("/pages/dashboard");
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("dentalserviceapp");
  return redirect("/pages/login");
}
