/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";
import {
  PasswordResetSchema,
  userLogInSchema,
  userResetPasswordSchema,
  userSchema,
} from "@/lib/validations";

export function AuthForm({
  isLogIn,
  className,
  isForgotPassword,
  isResetPassword,
}: {
  isForgotPassword?: boolean;
  isResetPassword?: boolean;
  isLogIn?: boolean;
  className?: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { loading, signup, login, forgotPassword, resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      isLogIn
        ? userLogInSchema
        : isForgotPassword
        ? userResetPasswordSchema
        : isResetPassword
        ? PasswordResetSchema
        : userSchema
    ),
  });

  // SUBMIT
  const onSubmit = async (data: any) => {
    if (isResetPassword) {
      const response = await resetPassword({
        userDetails: data,
        token: pathname.split("/").at(2)!,
      });

      if (response.status === "success") {
        toast({ title: "Password reset successfully", variant: "default" });
        router.push("/dashboard");
      } else {
        toast({
          title: "Something went wrong",
          description: response.error || "Please try again.",
        });
      }

      return;
    }

    if (isForgotPassword) {
      const response = await forgotPassword(data);
      console.log(response);
      if (response.status === "success") {
        toast({
          title: `Password reset link sent to ${data.email}`,
          variant: "default",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: response.error || "Please try again.",
        });
      }
      return;
    }

    const response = isLogIn ? await login(data) : await signup(data);

    console.log({ response });

    if (response.status === "success") {
      router.push("/dashboard");
      toast({ title: "Welcome!", variant: "default" });
    } else {
      toast({
        title: "Something went wrong",
        description: response.error || "Please try again.",
      });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle data-testid="card-title" className="text-2xl">
            {isLogIn ? "Login" : isForgotPassword ? "Reset Password" : "Signup"}
          </CardTitle>
          <CardDescription>
            {isLogIn
              ? "Enter your email below to login."
              : isForgotPassword
              ? "Enter your email"
              : "Enter your details to sign up."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              {!isLogIn && !isForgotPassword && !isResetPassword && (
                <div className="grid gap-2">
                  <Label htmlFor="name">Username</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>
              )}
              {!isResetPassword && (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>
              )}
              {!isForgotPassword && (
                <div className="grid gap-2">
                  <div className="flex justify-between items-center ">
                    <Label htmlFor="password">Password</Label>
                    {!isResetPassword && (
                      <Link
                        href="/forgotPassword"
                        className="underline underline-offset-2 hover:text-blue-600"
                      >
                        Forgot password
                      </Link>
                    )}
                  </div>

                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>
              )}
              {!isLogIn && !isForgotPassword && (
                <div className="grid gap-2">
                  <Label htmlFor="passwordConfirm">Confirm Password</Label>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    {...register("passwordConfirm")}
                  />
                  {errors.passwordConfirm && (
                    <p className="text-red-500 text-sm">
                      {errors.passwordConfirm.message as string}
                    </p>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full">
                {isLogIn
                  ? "Login"
                  : isForgotPassword || isResetPassword
                  ? "Reset Password"
                  : "Signup"}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  if (isForgotPassword || isResetPassword) {
                    router.push("/");
                  }
                }}
                className="w-full"
              >
                {isLogIn
                  ? "Login"
                  : isForgotPassword || isResetPassword
                  ? "Cancel"
                  : "Signup"}
                {!isForgotPassword && !isResetPassword && " with Google"}
              </Button>
            </div>
            {!isForgotPassword && !isResetPassword && (
              <div className="mt-4 text-center text-sm">
                {isLogIn ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <Link href="/" className="underline">
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                      Log in
                    </Link>
                  </>
                )}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
