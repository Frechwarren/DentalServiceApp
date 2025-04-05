import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { userId } = params;
  console.log(userId);
  return NextResponse.json({ message: "User found" });
}

export async function PUT(req, { params }) {
  const { userId } = params;
  console.log(userId);
  return NextResponse.json({ message: "User updated" });
}

export async function DELETE(req, { params }) {
  const { userId } = params;
  console.log(userId);
  return NextResponse.json({ message: "User deleted" });
}


