"use client";

import { useState } from "react";
import {
  createCheckoutSession,
  PlanId,
  STRIPE_PRICE_IDS,
} from "@/lib/api";

const plans: {
  id: PlanId;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  popular?: boolean;
}[] = [
  {
    id: "basic",
    name: "LiquidMail Basic",
    price: "£9.99 / month",
    tagline: "Perfect for individuals and freelancers.",
    features: [
      "Up to 500 AI-generated replies / month",
      "Connect 1 Gmail account",
      "Standard support",
      "Basic tone presets",
    ],
  },
  {
    id: "pro",
    name: "LiquidMail Pro",
    price: "£19.99 / month",
    tagline: "For power users and busy professionals.",
    features: [
      "Up to 2,000 AI-generated replies / month",
      "Connect up to 3 Gmail accounts",
      "Priority support",
      "Advanced tone & style controls",
      "Saved reply templates",
    ],
    popular: true,
  },
  {
    id: "business",
    name: "LiquidMail Business",
    price: "£34.99 / month",
    tagline: "Teams and small businesses.",
    features: [
      "Unlimited AI-generated replies*",
      "Team workspaces",
      "Centralised billing",
      "Dedicated onboarding",
      "SLA-backed priority support",
    ],
  },
];

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);

  async function handleSubscribe(planId: PlanId) {
    try {
      setLoadingPlan(planId);
      const res = await createCheckoutSession(STRIPE_PRICE_IDS[planId]);
      window.location.href = res.url;
    } catch (err) {
      console.error(err);
      alert("There was a problem starting checkout. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">Pricing</h1>
          <p className="mt-3 text-gray-400">
            Choose the LiquidMail plan that fits the way you work.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black p-6 shadow-lg ${
                plan.popular ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.popular && (
                <span className="mb-3 inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                  Most popular
                </span>
              )}

              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="mt-1 text-sm text-gray-400">{plan.tagline}</p>

              <p className="mt-4 text-2xl font-bold">{plan.price}</p>
              {plan.id === "business" && (
                <p className="mt-1 text-xs text-gray-500">
                  *Fair use limits may apply.
                </p>
              )}

              <ul className="mt-5 flex-1 space-y-2 text-sm text-gray-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loadingPlan === plan.id}
                className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingPlan === plan.id ? "Redirecting..." : "Get started"}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          You can manage or cancel your subscription at any time from your
          dashboard billing portal.
        </p>
      </div>
    </div>
  );
}
