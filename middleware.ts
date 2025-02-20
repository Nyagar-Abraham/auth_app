import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get("jwt")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // try {
    //   // const secretKey = new TextEncoder().encode(secret);
    //   const payload = await jwtVerify(token, process.env.JWT_SECRET);
    //   console.log("Verified payload:", payload);
    //   return payload;
    // } catch (error) {
    //   console.error("JWT verification failed:", error);

    //   return NextResponse.redirect(new URL("/login", req.url));
    // }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect dashboard routes
};
