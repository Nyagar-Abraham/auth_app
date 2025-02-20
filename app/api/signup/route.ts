import User from "@/database/user.model";

import { handleError } from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-error";
import dbConnect from "@/lib/mongoose";
import { sendMail } from "@/lib/sendEmails";
import { signToken } from "@/lib/utils";
import { userSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const userDetails = await request.json();

    const validateData = userSchema.safeParse(userDetails);

    if (validateData.success === false) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }

    let user;
    user = await User.findOne({ email: userDetails.email });

    if (user) {
      throw new Error("Email is already registerd");
    }

    user = await User.findOne({ name: userDetails.name });

    if (user) {
      throw new Error("Username is already taken");
    }

    const newUser = await User.create({
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
      passwordConfirm: userDetails.passwordConfirm,
    });

    sendMail({
      sendTo: newUser.email,
      subject: "Welcome to my website",
      text: "successfully created your account",
      html: `<h1>Welcome ${newUser.name} to my Auth App</h1>`,
    });

    const token = signToken(newUser._id);

    const response = NextResponse.json(
      {
        status: "success",
        data: {
          user: newUser,
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
