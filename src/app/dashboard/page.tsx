"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGmailStatus } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [gmailConnected, setGmailConnected] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const status = await getGmailStatus();
        setGmailConnected(status.gmailConnected);
      } catch (err) {
        console.error("Failed to load Gmail status:", err);
        setGmailConnected(false);
      }
    }

    fetchStatus();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-6">
        Welcome to your LiquidMail dashboard.
      </p>

      {/* If we're still loading status */}
      {gmailConnected === null && (
        <p className="text-gray-500">Checking Gmail connection…</p>
      )}

      {/* If Gmail is NOT connected */}
      {gmailConnected === false && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-400/40 rounded-lg">
          <p className="text-red-300 mb-3">
            Gmail is not connected. LiquidMail cannot send emails yet.
          </p>

          <button
            onClick={() => router.push("/connect")}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            Connect Gmail
          </button>
        </div>
      )}

      {/* If Gmail IS connected */}
      {gmailConnected === true && (
        <div className="mt-4 p-4 bg-green-500/20 border border-green-400/40 rounded-lg">
          <p className="text-green-300">
            Gmail is connected! You're ready to send automated email replies.
          </p>
        </div>
      )}
    </div>
  );
}
