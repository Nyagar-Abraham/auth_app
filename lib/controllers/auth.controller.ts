import User from "@/database/user.model";

import dbConnect from "../mongoose";

import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signup = async (request: NextRequest) => {
  try {
    await dbConnect();

    const userDetails = await request.json();

    const newUser = await User.create({
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
      passwordConfirm: userDetails.passwordConfirm,
    });

    const token = signToken(newUser._id);

    return {
      status: "success",
      token,
      data: {
        user: newUser,
      },
    };
  } catch (error) {
    console.log(error);
    return { status: "error", message: error.message };
  }
};

export const login = async (request: NextRequest) => {
  try {
    await dbConnect();

    const { email, password } = await request.json();
    console.log(password, email);

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    // check if user exist && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("incorrect email or password");
    }

    const token = signToken(user._id);
    return {
      status: "success",
      token,
    };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

// export function middleware(req) {
//   const token = req.cookies.get("token"); // Get the token from cookies
//   if (!token) {
//     return NextResponse.redirect("/login"); // Redirect to login if no token is found
//   }
//   try {
//     jwt.verify(token, process.env.JWT_SECRET); // Verify the token
//     return NextResponse.next(); // Allow request to proceed
//   } catch (error) {
//     return NextResponse.redirect("/login"); // Redirect if the token is invalid
//   }
// }
