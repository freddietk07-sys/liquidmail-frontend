"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { createCheckoutSession, STRIPE_PRICE_IDS } from "@/lib/api";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleCheckout() {
    try {
      setCheckoutError(null);
      setCheckoutLoading(true);
      const res = await createCheckoutSession(STRIPE_PRICE_IDS.basic);
      if (!res.url) {
        setCheckoutError("No checkout URL returned.");
        setCheckoutLoading(false);
        return;
      }
      window.location.href = res.url;
    } catch (err: any) {
      setCheckoutError(err.message ?? "Failed to start checkout.");
      setCheckoutLoading(false);
    }
  }

  return (
    <div className="px-6 py-12 md:px-12 lg:px-24">
      {/* Hero */}
      <section className="grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Turn your inbox into{" "}
            <span className="text-blue-400">autopilot mode.</span>
          </h1>
          <p className="text-slate-300 mb-6 max-w-xl">
            LiquidMail connects to your Gmail and drafts high-quality, on-brand
            replies for you. You review, tweak, and send. Save hours every week
            without sounding like a robot.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/connect">
              <Button>Connect Gmail</Button>
            </Link>
            <Link
              href="#pricing"
              className="text-slate-300 hover:text-white underline-offset-4 hover:underline"
            >
              View pricing
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            No credit card required. Google OAuth secure.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl">
          <p className="text-xs font-mono text-blue-300 mb-2">
            LIVE PREVIEW - LiquidMail
          </p>
          <div className="space-y-4 text-sm">
            <div className="rounded-xl bg-slate-950/70 p-4 border border-slate-800">
              <p className="text-[11px] text-slate-400 mb-1">Incoming email</p>
              <p className="font-semibold">
                Re: Follow-up on our design meeting
              </p>
              <p className="text-slate-300 mt-1">
                Hey Freddie, thanks again for the call. Could you send over a
                summary of what we discussed and the next steps?
              </p>
            </div>

            <div className="rounded-xl bg-slate-950/70 p-4 border border-blue-500/40">
              <p className="text-[11px] text-blue-300 mb-1">LiquidMail draft</p>
              <p className="text-slate-100">
                Thanks for the call - I have summarised the key points and next
                steps below. Let me know if I have missed anything or if you
                would like to adjust timelines...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <FeatureCard
          title="Gmail-native"
          body="Connect securely with Google OAuth. No passwords, no weird IMAP setup, just click connect."
        />
        <FeatureCard
          title="On-brand replies"
          body="Teach LiquidMail your tone once. It uses that to keep every email sounding like you."
        />
        <FeatureCard
          title="Human in the loop"
          body="You stay in control. LiquidMail drafts, you review, edit, and send in a couple of clicks."
        />
      </section>

      {/* Pricing */}
      <section id="pricing" className="mt-20">
        <h2 className="text-3xl font-semibold mb-6">Simple pricing</h2>
        <div className="max-w-xl rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-blue-300 mb-1">
              Starter
            </p>
            <p className="text-3xl font-bold mb-2">
              GBP 9
              <span className="text-lg font-normal text-slate-400">/month</span>
            </p>
            <p className="text-slate-300">
              Perfect while you're testing LiquidMail with your inbox.
            </p>
          </div>

          <ul className="space-y-2 text-sm text-slate-200">
            <li>- Up to 500 AI-drafted replies / month</li>
            <li>- Custom tone and signature</li>
            <li>- Priority support during UK hours</li>
          </ul>

          <div className="space-y-2">
            <label className="text-xs text-slate-400" htmlFor="email">
              Email for checkout
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          {checkoutError && (
            <p className="text-sm text-red-400">{checkoutError}</p>
          )}

          <Button onClick={handleCheckout} disabled={!email || checkoutLoading} fullWidth>
            {checkoutLoading ? "Starting checkout..." : "Get started"}
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-300">{body}</p>
    </div>
  );
}
