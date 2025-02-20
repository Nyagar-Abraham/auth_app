// components/LoadingSpinner.tsx
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-rose-500 rounded-full border-t-transparent animate-spin" />
        <div className="absolute top-1 left-1 w-10 h-10 border-4 border-green-500 rounded-full border-t-transparent animate-spin-reverse" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
