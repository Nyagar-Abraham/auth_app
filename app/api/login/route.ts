import { login } from "@/lib/controllers/auth.controller";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await login(request);

  if (data.token) {
    console.log("Token being set:", data.token); // Debugging log

    const response = NextResponse.json(
      { status: data.status },
      { status: 201 }
    );
    response.cookies.set("jwt", data.token, {
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === "production", // Secure flag for HTTPS
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 60 * 60 * 24 * 7, // 1 week expiration
      path: "/", // Ensures it's available on all routes
    });

    return response;
  } else {
    return NextResponse.json(data, { status: 500 });
  }
}
