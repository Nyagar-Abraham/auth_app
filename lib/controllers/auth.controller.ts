import User from "@/database/user.model";

import dbConnect from "../mongoose";

export const signup = async (request: Request) => {
  try {
    await dbConnect();
    const userDetails = await request.json();
    console.log({ userDetails });
    const newUser = await User.create(userDetails);

    return {
      status: "success",
      data: {
        user: newUser,
      },
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
