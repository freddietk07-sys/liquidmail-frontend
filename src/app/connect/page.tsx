"use client";

import { useState } from "react";
import { getGmailOAuthURL } from "@/lib/api";

export default function ConnectPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleConnect() {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await getGmailOAuthURL();

      if (!res.oauth_url) {
        setErrorMsg("Error: No OAuth URL returned.");
        setLoading(false);
        return;
      }

      // Redirect user to Google OAuth
      window.location.href = res.oauth_url;

    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to start OAuth.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-[#0D0D10] text-white">
      <h1 className="text-4xl font-bold mb-4">Connect Gmail</h1>

      <p className="text-gray-400 mb-6 text-center max-w-md">
        Link your Gmail account so LiquidMail can automatically send AI-powered replies for you.
      </p>

      {errorMsg && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg mb-4">
          {errorMsg}
        </div>
      )}

      <button
        onClick={handleConnect}
        disabled={loading}
        className={`px-6 py-3 rounded-lg font-semibold transition
          ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
        `}
      >
        {loading ? "Redirecting…" : "Connect Gmail"}
      </button>
    </div>
  );
}
