import { signup } from "@/lib/controllers/auth.controller";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(request);
  const data = await signup(request);

  return NextResponse.json(data, { status: 201 });
}
