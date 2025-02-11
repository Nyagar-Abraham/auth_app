import mongoose, { Document, model, models, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  photo?: string;
  password: string;
  passwordConfirm: string;
}

const userSchema: Schema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm password"],
    minlength: 8,
    validate: {
      //only works on save & create
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = function (
  candidatePassword: string,
  userPassword: string
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

const User = models?.User || model<IUser>("User", userSchema);

export default User;
