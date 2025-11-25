// src/lib/api.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

console.log("FRONTEND USING BASE_URL =", BASE_URL);

// Simple helper for all requests
async function api(method: string, path: string, body?: any) {
  const url = `${BASE_URL}${path}`;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(url, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `${method} ${path} failed (${res.status}): ${text}`
    );
  }

  return res.json();
}

// 1) Get Gmail OAuth URL
export function getGmailOAuthURL(userEmail: string) {
  return api(
    "GET",
    `/gmail/connect?user_email=${encodeURIComponent(userEmail)}`
  );
}

// 2) Get Gmail status (fixed)
export function getGmailStatus(userEmail: string) {
  return api(
    "GET",
    `/gmail/status?user_email=${encodeURIComponent(userEmail)}`
  );
}

// 3) Send email
export function sendEmail(data: {
  user_email: string;
  to: string;
  subject: string;
  message: string;
}) {
  return api("POST", "/gmail/send", data);
}
