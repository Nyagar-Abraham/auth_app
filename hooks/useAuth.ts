"use client";

import { useState } from "react";
import { LoginParams, SignupParams } from "../lib/types";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  async function signup(userDetails: SignupParams) {
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
        credentials: "include", // This ensures cookies are included in the request
      });

      if (!res.ok) throw new Error("Signup failed");

      return await res.json();
    } finally {
      setLoading(false);
    }
  }

  async function login(userDetails: LoginParams) {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
        credentials: "include", // Include cookies in response
      });

      if (!res.ok) throw new Error("Login failed");
      return await res.json();
    } finally {
      setLoading(false);
    }
  }

  return { signup, login, loading };
}
