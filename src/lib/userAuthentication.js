"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function authUser() {
  const secretKey = process.env.JWT_SECRET;

  // Check if the secret key is defined
  if (!secretKey) {
    console.error("JWT_SECRET is not defined");
    return null;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("dentalserviceapp")?.value;

  // Return null if no token is found
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
