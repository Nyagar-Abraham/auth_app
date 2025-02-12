"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Home</h1>
      <p data-testId="desc">Description</p>
      <button
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        dashboard
      </button>
    </div>
  );
};

export default Home;
