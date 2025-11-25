"use client";

import { useEffect, useState } from "react";
import {
  getConnectionStatus,
  sendTestEmail,
  generateReply,
  createBillingPortalSession,
} from "@/lib/api";
import { useRouter } from "next/navigation";

type ConnectionStatus = "connected" | "not_connected" | "unknown";

export default function DashboardPage() {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("unknown");
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [testEmailLoading, setTestEmailLoading] = useState(false);

  const [emailText, setEmailText] = useState("");
  const [toneHint, setToneHint] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  const [billingLoading, setBillingLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await getConnectionStatus();
        setConnectionStatus(res.status);
      } catch (err) {
        console.error(err);
        setConnectionStatus("unknown");
      } finally {
        setLoadingStatus(false);
      }
    }

    fetchStatus();
  }, []);

  async function handleSendTestEmail() {
    try {
      setTestEmailLoading(true);
      const res = await sendTestEmail();
      alert(res.detail ?? "Test email sent.");
    } catch (err) {
      console.error(err);
      alert("Failed to send test email. Please try again.");
    } finally {
      setTestEmailLoading(false);
    }
  }

  async function handleGenerateReply() {
    if (!emailText.trim()) {
      alert("Please paste an email to reply to.");
      return;
    }

    try {
      setReplyLoading(true);
      setGeneratedReply("");

      const res = await generateReply({
        email_text: emailText,
        tone_hint: toneHint || undefined,
      });

      setGeneratedReply(res.reply);
    } catch (err) {
      console.error(err);
      alert("Failed to generate reply. Please try again.");
    } finally {
      setReplyLoading(false);
    }
  }

  async function handleManageBilling() {
    try {
      setBillingLoading(true);
      const res = await createBillingPortalSession();
      window.location.href = res.portal_url;
    } catch (err) {
      console.error(err);
      alert("Could not open billing portal. Please try again.");
    } finally {
      setBillingLoading(false);
    }
  }

  const statusLabel =
    connectionStatus === "connected"
      ? "Connected"
      : connectionStatus === "not_connected"
      ? "Not connected"
      : "Unknown";

  const statusColor =
    connectionStatus === "connected"
      ? "bg-green-500"
      : connectionStatus === "not_connected"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-10 space-y-8">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
            <p className="mt-1 text-gray-400">
              Manage your Gmail connection, generate replies, and handle billing.
            </p>
          </div>

          <button
            onClick={() => router.push("/pricing")}
            className="mt-3 inline-flex items-center justify-center rounded-xl border border-blue-500 px-4 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/10 md:mt-0"
          >
            View plans
          </button>
        </header>

        {/* Top row: Gmail status + Billing */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Gmail connection card */}
          <section className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Gmail connection</h2>
            <p className="mt-1 text-sm text-gray-400">
              Check whether LiquidMail is connected to your Gmail account.
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className={`h-2.5 w-2.5 rounded-full ${statusColor}`} />
              <span className="font-medium">
                {loadingStatus ? "Checking status..." : statusLabel}
              </span>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              You can reconnect or change the linked account from the{" "}
              <span
                onClick={() => router.push("/connect")}
                className="cursor-pointer text-blue-400 hover:underline"
              >
                Connect
              </span>{" "}
              page.
            </p>

            <button
              onClick={handleSendTestEmail}
              disabled={testEmailLoading}
              className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {testEmailLoading ? "Sending test email..." : "Send test email"}
            </button>
          </section>

          {/* Billing card */}
          <section className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Billing & subscription</h2>
            <p className="mt-1 text-sm text-gray-400">
              Manage your LiquidMail subscription, update payment details, or
              cancel at any time.
            </p>

            <ul className="mt-4 text-sm text-gray-300 space-y-1.5">
              <li>• Secure Stripe billing</li>
              <li>• Update card details and invoices</li>
              <li>• Change plan or cancel instantly</li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={handleManageBilling}
                disabled={billingLoading}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {billingLoading ? "Opening portal..." : "Manage billing"}
              </button>

            </div>

            <p className="mt-3 text-xs text-gray-500">
              To upgrade or switch plans, you can also visit the{" "}
              <button
                type="button"
                onClick={() => router.push("/pricing")}
                className="text-blue-400 hover:underline"
              >
                pricing page
              </button>
              .
            </p>
          </section>
        </div>

        {/* Reply generator */}
        <section className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black p-6 shadow-lg">
          <h2 className="text-lg font-semibold">Generate a reply</h2>
          <p className="mt-1 text-sm text-gray-400">
            Paste an email you&apos;ve received and let LiquidMail draft a
            reply for you.
          </p>

          <div className="mt-4 space-y-3">
            <textarea
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder="Paste the email text here..."
              className="w-full min-h-[140px] rounded-xl border border-gray-700 bg-black/40 p-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              value={toneHint}
              onChange={(e) => setToneHint(e.target.value)}
              placeholder="Optional: e.g. 'polite but firm', 'friendly and casual'"
              className="w-full rounded-xl border border-gray-700 bg-black/40 p-2.5 text-sm outline-none focus:border-blue-500"
            />

            <button
              onClick={handleGenerateReply}
              disabled={replyLoading}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {replyLoading ? "Generating..." : "Generate reply"}
            </button>
          </div>

          {generatedReply && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-200">
                Suggested reply
              </h3>
              <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-gray-700 bg-black/40 p-3 text-sm text-gray-100">
                {generatedReply}
              </pre>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
