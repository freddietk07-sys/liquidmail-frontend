"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConnectSuccessPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Finishing setup…");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Your Gmail account is now connected to LiquidMail.");
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  function goToDashboard() {
    router.push("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D0D10] text-white px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 border border-green-500/40">
          <span className="text-3xl">✅</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-3 text-green-400">
          Gmail Connected Successfully!
        </h1>

        {/* Message */}
        <p className="text-gray-400 mb-6">
          {message}
        </p>

        {/* Old-page improved paragraph */}
        <p className="text-gray-500 mb-8 text-center">
          Your Gmail account is now linked to LiquidMail.  
          AI-powered automated replies can now be generated and sent for you.
        </p>

        {/* Button */}
        <button
          onClick={goToDashboard}
          className="w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition"
        >
          Go to Dashboard
        </button>

        {/* Optional settings link */}
        <button
          onClick={() => router.push("/connect")}
          className="mt-3 w-full text-sm text-gray-400 hover:text-gray-200 underline underline-offset-4"
        >
          Back to connection settings
        </button>
      </div>
    </div>
  );
}
