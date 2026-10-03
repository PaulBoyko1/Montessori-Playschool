/** Cloudflare Worker entry point for the Montessori Playschool website. */
import handler from "vinext/server/app-router-entry";

interface Env {
  GOOGLE_WEBHOOK_SECRET?: string;
  INQUIRY_TO_PHONE?: string;
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_FROM_NUMBER?: string;
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
  additionalChildren?: unknown;
  smsConsent?: unknown;
  emailConsent?: unknown;
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

function normalizeAge(value: unknown): string {
  const raw = clean(value, 80);
  if (!raw) return "";

  const lower = raw.toLowerCase().replace(/\s+/g, " ");

  const combined = lower.match(
    /^(\d+(?:\.\d+)?)\s*(?:years?|yrs?|yr|y)\s*(\d+)\s*(?:months?|mos?|mo|m)$/,
  );
  if (combined) {
    const years = Number(combined[1]);
    const months = Number(combined[2]);
    return `${Number.isInteger(years) ? years : Number(years.toFixed(1))} ${
      years === 1 ? "year" : "years"
    } ${months} ${months === 1 ? "month" : "months"}`;
  }

  const monthsMatch = lower.match(
    /^(\d+(?:\.\d+)?)\s*(?:months?|mos?|mo|m)$/,
  );
  if (monthsMatch) {
    const months = Number(monthsMatch[1]);
    return `${Number.isInteger(months) ? months : Number(months.toFixed(1))} ${
      months === 1 ? "month" : "months"
    }`;
  }

  const yearsMatch = lower.match(
    /^(\d+(?:\.\d+)?)\s*(?:years?|yrs?|yr|y)$/,
  );
  if (yearsMatch) {
    const years = Number(yearsMatch[1]);
    return `${Number.isInteger(years) ? years : Number(years.toFixed(1))} ${
      years === 1 ? "year" : "years"
    }`;
  }

  if (/^\d+(?:\.\d+)?$/.test(lower)) {
    const years = Number(lower);
    return `${Number.isInteger(years) ? years : Number(years.toFixed(1))} ${
      years === 1 ? "year" : "years"
    }`;
  }

  return raw;
}

type AdditionalChild = {
  name: string;
  age: string;
  program: string;
  schedule: string[];
};

function cleanAdditionalChildren(value: unknown): AdditionalChild[] {
  if (!Array.isArray(value)) return [];

  return value.slice(0, 8).map((item) => {
    const child =
      item && typeof item === "object"
        ? (item as Record<string, unknown>)
        : {};

    return {
      name: clean(child.name, 120),
      age: normalizeAge(child.age),
      program: clean(child.program, 180),
      schedule: cleanSchedule(child.schedule),
    };
  });
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
  "https://script.google.com/macros/s/AKfycbywO9BTHRR7Gb6VrPJrBUTx3Hq8jIlOnQcpywR6Zzmv6FGextY3GmvONryb_lNu5SB7bA/exec";

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
    smsConsent: boolean;
    emailConsent: boolean;
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
  const age = normalizeAge(raw.age);
  const program = clean(raw.program, 180);
  const schedule = cleanSchedule(raw.schedule);
  const customDays = clean(raw.customDays, 240);
  const message = clean(raw.message, 1800);
  const additionalChildren = cleanAdditionalChildren(raw.additionalChildren);
  const smsConsent = raw.smsConsent === true;
  const emailConsent = raw.emailConsent === true;

  if (!guardian || !email || !phone || !child || !age || !program) {
    return jsonResponse({ ok: false, error: "Please complete all required fields" }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ ok: false, error: "Invalid email address" }, 400);
  }

  if (
    additionalChildren.some(
      (child) => !child.name || !child.age || !child.program,
    )
  ) {
    return jsonResponse(
      { ok: false, error: "Please complete all added child fields" },
      400,
    );
  }

  if (!smsConsent || !emailConsent) {
    return jsonResponse(
      { ok: false, error: "SMS and email consent are required" },
      400,
    );
  }

  const smsText = [
    "New Montessori Playschool website inquiry.",
    `Parent: ${guardian}`,
    `Phone: ${phone}`,
    `Child: ${child}, age ${age}`,
    `Program: ${program}`,
    additionalChildren.length
      ? `Additional children: ${additionalChildren.length}`
      : "",
    `Email: ${email}`,
    "Full details sent by email.",
  ]
    .filter(Boolean)
    .join("\n");

  const additionalChildrenText = additionalChildren.length
    ? [
        "ADDITIONAL CHILDREN",
        ...additionalChildren.flatMap((child, index) => [
          `Child ${index + 2}: ${child.name}`,
          `Age: ${child.age}`,
          `Program: ${child.program}`,
          `Schedule needs: ${child.schedule.join(", ") || "Not specified"}`,
          "",
        ]),
      ].join("\n").trim()
    : "";

  const emailMessage = [
    additionalChildrenText,
    message ? `ADDITIONAL INFORMATION\n${message}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

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
      message: emailMessage,
      smsConsent,
      emailConsent,
    });
    outcomes.email = true;
  } catch (error) {
    const deliveryError =
      error instanceof Error ? error.message : "Email delivery failed";
    console.error("Inquiry email error:", deliveryError);
    return jsonResponse(
      {
        ok: false,
        channels: outcomes,
        error: "Your inquiry could not be delivered. Please try again or contact the school.",
      },
      503,
    );
  }

  // SMS is only a notification; the complete inquiry must arrive by email first.
  if (env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_FROM_NUMBER) {
    try {
      await sendSms(env, smsText);
      outcomes.sms = true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "SMS delivery failed";
      console.error("Inquiry SMS error:", message);
    }
  }

  return jsonResponse({ ok: true, channels: outcomes });
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/inquiry") {
      return handleInquiry(request, env);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
