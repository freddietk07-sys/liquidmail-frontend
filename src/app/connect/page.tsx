"use client";

import { useState } from "react";
import { getGmailOAuthURL } from "@/lib/api";
import Button from "@/components/Button";

export default function ConnectPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConnect() {
    try {
      setError(null);
      setLoading(true);

      const res = await getGmailOAuthURL();

      if (!res.oauth_url) {
        setError("No OAuth URL returned from backend.");
        setLoading(false);
        return;
      }

      // Redirect to Google OAuth
      window.location.href = res.oauth_url;
    } catch (err) {
      console.error(err);
      setError("Failed to start OAuth. Check the backend URL and logs.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
        <h1 className="text-2xl font-bold mb-2">Connect your Gmail</h1>
        <p className="text-sm text-slate-300 mb-6">
          We use Google's official OAuth flow. LiquidMail only gets the
          permissions it needs to draft and send emails on your behalf.
        </p>

        <Button onClick={handleConnect} disabled={loading} fullWidth>
          {loading ? "Redirecting to Google..." : "Continue with Google"}
        </Button>

        {error && (
          <p className="mt-3 text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg p-2">
            {error}
          </p>
        )}

        <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">
          By continuing, you agree that LiquidMail may access your Gmail account
          to draft and send emails you approve. You can revoke access any time
          in your Google account settings.
        </p>
      </div>
    </div>
  );
}
