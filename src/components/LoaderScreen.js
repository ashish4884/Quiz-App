import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoaderScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/email");
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1e002e] text-white">
      <div className="relative w-40 h-40 mb-6">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-gray-400"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="70"
            cx="80"
            cy="80"
          />
          <circle
            className="text-pink-500"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="70"
            cx="80"
            cy="80"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 70}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
          {progress}%
        </div>
      </div>
      <p className="text-center text-lg">Finding collections for you...</p>
    </div>
  );
};

export default LoaderScreen;
