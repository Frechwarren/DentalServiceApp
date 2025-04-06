import dbConnect from "@/lib/dbConnect";
import Users from "@/models/User";
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
    const user = await Users.findById(userId);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "User found",
      user,
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
  const { userId } = params;
  console.log(userId);
  return NextResponse.json({ message: "User updated" });
}

export async function DELETE(req, { params }) {
  const { userId } = params;
  console.log(userId);
  return NextResponse.json({ message: "User deleted" });
}
