import User from "@/database/user.model";
import { handleError } from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-error";
import dbConnect from "@/lib/mongoose";
import { sendMail } from "@/lib/sendEmails";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // get user based on email
  await dbConnect();

  const { email } = await request.json();

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("User");
  }

  // generate token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // send to users email

  const resetUrl = `${request.url
    .split("/")
    .slice(0, 3)
    .join("/")}/resetPassword/${resetToken}`;

  const message = `Reset your password here:${resetUrl}`;

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Password Reset Request</h2>
    <p>You recently requested to reset your password. Click the button below to reset it:</p>
    <p>
      <a href="${resetUrl}" style="
          display: inline-block;
          padding: 10px 20px;
          margin: 10px 0;
          font-size: 16px;
          color: #fff;
          background-color: #3498db;
          text-decoration: none;
          border-radius: 5px;">
        Reset Password
      </a>
    </p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>For any questions, please contact our support.</p>
  </div>
`;

  try {
    await sendMail({
      subject: "Reset your Password",
      sendTo: user.email,
      html,
      text: message,
    });

    return NextResponse.json(
      { status: "success", message: "password reset email sent" },
      { status: 201 }
    );
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return handleError(error, "api");
  }
}
