const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }
  return res.json();
}

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

export async function createCheckoutSession(customerEmail: string) {
  const res = await fetch(`${BACKEND_BASE_URL}/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer_email: customerEmail }),
  });
  return handleResponse(res);
}
