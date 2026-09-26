/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  GOOGLE_WEBHOOK_SECRET?: string;
  INQUIRY_TO_PHONE?: string;
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_FROM_NUMBER?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type InquiryPayload = {
  guardian?: unknown;
  email?: unknown;
  phone?: unknown;
  child?: unknown;
  age?: unknown;
  program?: unknown;
  schedule?: unknown;
  customDays?: unknown;
  message?: unknown;
  website?: unknown;
};

function clean(value: unknown, maxLength = 300): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanSchedule(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, 80))
    .filter(Boolean)
    .slice(0, 12);
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}


const GOOGLE_INQUIRY_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbw_eO1rrIXEi9OuxyubyHhwOyI6LXlx-_fxfe5yvG42rvk9CbUPQAZPc3MwFuhn4K1TRg/exec";

async function sendInquiryEmail(
  env: Env,
  inquiry: {
    guardian: string;
    email: string;
    phone: string;
    child: string;
    age: string;
    program: string;
    schedule: string[];
    customDays: string;
    message: string;
  },
): Promise<void> {
  const secret = env.GOOGLE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("Google inquiry webhook secret is not configured");
  }

  const response = await fetch(GOOGLE_INQUIRY_WEBHOOK, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      secret,
      ...inquiry,
    }),
    redirect: "follow",
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Google inquiry webhook failed (${response.status}): ${responseText.slice(0, 300)}`,
    );
  }

  try {
    const result = JSON.parse(responseText) as { ok?: boolean; error?: string };
    if (!result.ok) {
      throw new Error(result.error || "Google inquiry webhook rejected the request");
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Google inquiry webhook returned an invalid response");
    }
    throw error;
  }
}

async function sendSms(env: Env, body: string): Promise<void> {
  const accountSid = env.TWILIO_ACCOUNT_SID;
  const authToken = env.TWILIO_AUTH_TOKEN;
  const from = env.TWILIO_FROM_NUMBER;
  const to = env.INQUIRY_TO_PHONE || "+19168444242";

  if (!accountSid || !authToken || !from) {
    throw new Error("Twilio SMS is not configured");
  }

  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Messages.json`;
  const encoded = new URLSearchParams({ To: to, From: from, Body: body });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: encoded.toString(),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Twilio SMS failed (${response.status}): ${details.slice(0, 300)}`);
  }
}

async function handleInquiry(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 20_000) {
    return jsonResponse({ ok: false, error: "Request too large" }, 413);
  }

  let raw: InquiryPayload;
  try {
    raw = (await request.json()) as InquiryPayload;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request" }, 400);
  }

  // Honeypot: bots often populate fields hidden from real visitors.
  if (clean(raw.website, 100)) {
    return jsonResponse({ ok: true });
  }

  const guardian = clean(raw.guardian, 120);
  const email = clean(raw.email, 180);
  const phone = clean(raw.phone, 80);
  const child = clean(raw.child, 120);
  const age = clean(raw.age, 80);
  const program = clean(raw.program, 180);
  const schedule = cleanSchedule(raw.schedule);
  const customDays = clean(raw.customDays, 240);
  const message = clean(raw.message, 1800);

  if (!guardian || !email || !phone || !child || !age || !program) {
    return jsonResponse({ ok: false, error: "Please complete all required fields" }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ ok: false, error: "Invalid email address" }, 400);
  }

  const smsText = [
    "New Montessori Playschool website inquiry.",
    `Parent: ${guardian}`,
    `Phone: ${phone}`,
    `Child: ${child}, age ${age}`,
    `Program: ${program}`,
    `Email: ${email}`,
    "Full details sent by email.",
  ].join("\n");

  const outcomes = { email: false, sms: false };

  try {
    await sendInquiryEmail(env, {
      guardian,
      email,
      phone,
      child,
      age,
      program,
      schedule,
      customDays,
      message,
    });
    outcomes.email = true;
  } catch (error) {
    const deliveryError =
      error instanceof Error ? error.message : "Email delivery failed";
    console.error("Inquiry email error:", deliveryError);
  }

  try {
    await sendSms(env, smsText);
    outcomes.sms = true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "SMS delivery failed";
    console.error("Inquiry SMS error:", message);
  }

  if (!outcomes.email && !outcomes.sms) {
    return jsonResponse({ ok: false, channels: outcomes, error: "Notifications are not configured" }, 503);
  }

  return jsonResponse({ ok: true, channels: outcomes });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/inquiry") {
      return handleInquiry(request, env);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
