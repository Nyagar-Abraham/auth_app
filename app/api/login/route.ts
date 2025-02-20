import User from "@/database/user.model";

import { handleError } from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import { signToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    // check if user exist && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("incorrect email or password");
    }

    const token = signToken(user._id);

    const response = NextResponse.json(
      {
        status: "success",
        data: {
          user,
        },
      },
      { status: 201 }
    );
    response.cookies.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 60 * 60 * 24 * 7, // 1 week expiration
      path: "/", // Ensures it's available on all routes
    });

    return response;
  } catch (error) {
    const response = handleError(error, "api");
    return response;
  }
}
