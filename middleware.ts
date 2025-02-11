import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get("jwt")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("X-User-Id", payload.id);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect dashboard routes
};
