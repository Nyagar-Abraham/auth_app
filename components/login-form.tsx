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
import { useState } from "react";

interface UserDetails {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleLogIn = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formData = {
      userName: userDetails.name.trim(),
      email: userDetails.email.trim(),
      password: userDetails.password.trim(),
      passwordConfirm: userDetails.passwordConfirm.trim(),
    };

    console.log(formData);
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="#" method="POST">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="John Doe"
                  value={userDetails.name}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      name: e.target.value,
                    });
                  }}
                  required
                />
              </div>{" "}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={userDetails.email}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      email: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={userDetails.password}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Confirm Password</Label>
                <Input
                  id="passwordConfirm"
                  type="password"
                  value={userDetails.passwordConfirm}
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      passwordConfirm: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <Button type="submit" onClick={handleLogIn} className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
