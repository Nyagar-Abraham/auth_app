import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { signToken } from "@/lib/utils";
import User from "@/database/user.model";
import { handleError } from "@/lib/handlers/error";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    console.log(token);
    //get by token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("invalid token");
    }

    const { password, passwordConfirm } = await request.json();
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const jwt = signToken(user._id);

    const response = NextResponse.json(
      {
        status: "success",
        data: {
          user,
        },
      },
      { status: 201 }
    );
    response.cookies.set("jwt", jwt, {
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
