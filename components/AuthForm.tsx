"use client";

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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";

const userSchema = z
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

export function AuthForm({
  isLogIn,
  className,
}: {
  isLogIn?: boolean;
  className?: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const { loading, signup, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    const response = isLogIn ? await login(data) : await signup(data);

    if (response.status === "success") {
      toast({ title: "Welcome!", variant: "default" });
      router.push("/dashboard");
    } else {
      toast({
        title: "Something went wrong",
        description: response.error || "Please try again.",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {isLogIn ? "Login" : "Signup"}
          </CardTitle>
          <CardDescription>
            {isLogIn
              ? "Enter your email below to login."
              : "Enter your details to sign up."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              {!isLogIn && (
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
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center ">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="underline underline-offset-2 hover:text-blue-600"
                  >
                    Forgot password
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {!isLogIn && (
                <div className="grid gap-2">
                  <Label htmlFor="passwordConfirm">Confirm Password</Label>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    {...register("passwordConfirm")}
                  />
                  {errors.passwordConfirm && (
                    <p className="text-red-500 text-sm">
                      {errors.passwordConfirm.message}
                    </p>
                  )}
                </div>
              )}
              <Button type="submit" className="w-full">
                {isLogIn ? "Login" : "Signup"}
              </Button>
              <Button variant="outline" className="w-full">
                {isLogIn ? "Login" : "Signup"} with Google
              </Button>
            </div>
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
