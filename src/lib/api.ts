// -------------------- Base URL --------------------
const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }
  return res.json();
}

// -------------------- Gmail OAuth --------------------
export async function getGmailOAuthURL(): Promise<{ oauth_url: string }> {
  const res = await fetch(`${BACKEND_BASE_URL}/oauth/gmail/url`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(res);
}

export async function getConnectionStatus(): Promise<{
  status: "connected" | "not_connected" | "unknown";
}> {
  const res = await fetch(`${BACKEND_BASE_URL}/connection-status`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    return { status: "unknown" };
  }

  return res.json();
}

export async function sendTestEmail(): Promise<{ detail: string }> {
  const res = await fetch(`${BACKEND_BASE_URL}/test-email`, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse(res);
}

export async function generateReply(input: {
  sender_name?: string;
  email_text: string;
  tone_hint?: string;
}): Promise<{ reply: string }> {
  const res = await fetch(`${BACKEND_BASE_URL}/generate-reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  return handleResponse(res);
}

// -------------------- Stripe Billing --------------------

export type PlanId = "basic" | "pro" | "business";

// ⚠️ Replace these with your REAL Stripe Price IDs
export const STRIPE_PRICE_IDS: Record<PlanId, string> = {
  basic: "price_1SXOsoKxEJuMtn8GwV0gVNMJ",
  pro: "price_1SXP3kKxEJuMtn8GwWDj4clw",
  business: "price_1SXOtCKxEJuMtn8GmF1dibBg",
};

export async function createCheckoutSession(
  price_id: string
): Promise<{ url: string }> {

  const res = await fetch(`${BACKEND_BASE_URL}/stripe/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ price_id }),
  });

  if (!res.ok) {
    throw new Error("Failed to create checkout session");
  }

  return res.json();
}

export async function createBillingPortalSession(): Promise<{
  portal_url: string;
}> {
  const res = await fetch(`${BACKEND_BASE_URL}/stripe/create-portal-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to create billing portal session");
  }

  return res.json();
}
