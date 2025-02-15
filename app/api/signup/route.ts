import { signup } from "@/lib/controllers/auth.controller";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await signup(request);
  if (data.token) {
    const response = NextResponse.json(
      { status: data.status },
      { status: 201 }
    );
    response.cookies.set("jwt", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 60 * 60 * 24 * 7, // 1 week expiration
      path: "/", // Ensures it's available on all routes
    });

    return response;
  } else {
    return NextResponse.json(data, { status: 500 });
  }
}
