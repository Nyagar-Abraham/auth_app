"use client";

import { useState } from "react";
import {
  ForgotPasswordParams,
  LoginParams,
  ResetPasswordparams,
  SignupParams,
} from "../lib/types";
import axios from "axios";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  async function signup(userDetails: SignupParams) {
    setLoading(true);
    try {
      const res = await axios.post("/api/signup", userDetails, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return await res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function login(userDetails: LoginParams) {
    setLoading(true);
    try {
      const res = await axios.post("/api/login", userDetails, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return await res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function forgotPassword(userDetails: ForgotPasswordParams) {
    setLoading(true);
    try {
      const res = await axios.post("/api/forgotPassword", userDetails, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return await res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(params: ResetPasswordparams) {
    setLoading(true);
    try {
      const res = await axios.patch(
        `/api/resetPassword/${params.token}`,
        params.userDetails,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      return await res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return { resetPassword, forgotPassword, signup, login, loading };
}
