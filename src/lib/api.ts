// src/lib/api.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://liquid-mail-backend-production.up.railway.app";

// Generic GET request
export async function apiGet(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

// Generic POST request
export async function apiPost(path: string, body: any) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`POST ${path} failed: ${err}`);
  }

  return res.json();
}

// -------------------------------------------
// OAuth: Get Gmail login URL
// -------------------------------------------
export function getGmailOAuthURL() {
  return apiGet("/oauth/gmail/login");
}

// -------------------------------------------
// NEW: Gmail connection status
// -------------------------------------------
export function getGmailStatus() {
  return apiGet("/auth/status");
}

// -------------------------------------------
// Send email through backend
// -------------------------------------------
export function sendEmail(data: {
  user_email: string;
  to: string;
  subject: string;
  message: string;
}) {
  return apiPost("/gmail/send", data);
}
