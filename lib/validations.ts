import { z } from "zod";

export const userSchema = z
  .object({
    name: z
      .string()
      .min(4, "Name must be at least 4 characters")
      .max(200)
      .optional(),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .optional(),
  })
  .refine(
    (data) => !data.passwordConfirm || data.password === data.passwordConfirm,
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );

export const PasswordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    passwordConfirm: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
  })
  .refine(
    (data) => !data.passwordConfirm || data.password === data.passwordConfirm,
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );

export const userLogInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
});

export const userResetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});
