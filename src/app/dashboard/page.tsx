"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { getConnectionStatus, sendTestEmail } from "@/lib/api";

type ConnectionStatus = "connected" | "not_connected" | "unknown";

export default function DashboardPage() {
  const [status, setStatus] = useState<ConnectionStatus>("unknown");
  const [loading, setLoading] = useState(true);
  const [sendingTest, setSendingTest] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadStatus() {
      try {
        const res = await getConnectionStatus();
        // Expecting { status: "connected" | "not_connected" }
        setStatus(res.status ?? "unknown");
      } catch (err) {
        console.error(err);
        setStatus("unknown");
      } finally {
        setLoading(false);
      }
    }

    loadStatus();
  }, []);

  async function handleSendTest() {
    try {
      setMessage(null);
      setSendingTest(true);
      const res = await sendTestEmail();
      setMessage(res.detail);
    } catch (err: any) {
      console.error(err);
      setMessage(err.message ?? "Failed to send test email.");
    } finally {
      setSendingTest(false);
    }
  }

  return (
    <div className="px-6 py-10 md:px-12 lg:px-24">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-slate-300 mb-8">
        Check your Gmail connection and send a quick test email.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="font-semibold mb-2">Connection status</h2>
          {loading ? (
            <p className="text-sm text-slate-400">Checking connection...</p>
          ) : (
            <>
              {status === "connected" && (
                <p className="text-sm text-emerald-400">
                  Gmail is connected and ready.
                </p>
              )}
              {status === "not_connected" && (
                <p className="text-sm text-amber-400">
                  Gmail is not connected. Go to the{" "}
                  <a
                    href="/connect"
                    className="underline underline-offset-2 hover:text-amber-300"
                  >
                    connect page
                  </a>{" "}
                  to finish setup.
                </p>
              )}
              {status === "unknown" && (
                <p className="text-sm text-slate-400">
                  We could not determine your connection status. Check the
                  backend or try again.
                </p>
              )}
            </>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="font-semibold mb-3">Quick test email</h2>
          <p className="text-sm text-slate-300 mb-4">
            Once you&apos;re connected, LiquidMail can send a test email to{" "}
            <span className="font-mono text-slate-100">
              {process.env.NEXT_PUBLIC_TEST_RECIPIENT ?? "your address"}
            </span>{" "}
            (configured on the backend).
          </p>
          <Button onClick={handleSendTest} disabled={sendingTest}>
            {sendingTest ? "Sending..." : "Send test email"}
          </Button>
          {message && (
            <p className="mt-3 text-sm text-slate-200">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
