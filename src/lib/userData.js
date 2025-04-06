"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserIdFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("dentalserviceapp")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
