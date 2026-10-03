"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { school } from "../site-data";

type SubmitState = "idle" | "submitting" | "sent" | "error";

type ExtraChild = {
  id: number;
  name: string;
  age: string;
  months: string;
  program: string;
  schedule: string[];
};

const INFANT_PROGRAM = "Infant Program · Birth–23 months";
const PRESCHOOL_PROGRAM = "Preschool Program · 24 months–entry into kindergarten";
const SCHOOL_AGE_PROGRAM = "School-Age Program · Kindergarten–9th grade";

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(1)));
}

function normalizeAgeInput(input: string, monthsAfterBirthday = "") {
  const raw = input.trim();
  if (!raw) return { normalized: "", totalMonths: null as number | null };

  const lower = raw.toLowerCase().replace(/\s+/g, " ");

  const combinedYearsMonths = lower.match(
    /^(\d+(?:\.\d+)?)\s*(?:years?|yrs?|yr|y)\s*(\d+)\s*(?:months?|mos?|mo|m)$/,
  );
  if (combinedYearsMonths) {
    const years = Number(combinedYearsMonths[1]);
    const months = Number(combinedYearsMonths[2]);
    const totalMonths = years * 12 + months;
    const yearLabel = years === 1 ? "year" : "years";
    const monthLabel = months === 1 ? "month" : "months";
    return {
      normalized: `${formatNumber(years)} ${yearLabel} ${months} ${monthLabel}`,
      totalMonths,
    };
  }

  const explicitMonths = lower.match(
    /^(\d+(?:\.\d+)?)\s*(?:months?|mos?|mo|m)$/,
  );
  if (explicitMonths) {
    const months = Number(explicitMonths[1]);
    return {
      normalized: `${formatNumber(months)} ${months === 1 ? "month" : "months"}`,
      totalMonths: months,
    };
  }

  const explicitYears = lower.match(
    /^(\d+(?:\.\d+)?)\s*(?:years?|yrs?|yr|y)$/,
  );
  if (explicitYears) {
    const years = Number(explicitYears[1]);
    const extraMonths = /^\d+$/.test(monthsAfterBirthday)
      ? Math.min(11, Math.max(0, Number(monthsAfterBirthday)))
      : 0;
    const totalMonths = years * 12 + extraMonths;
    const yearLabel = years === 1 ? "year" : "years";
    const monthSuffix =
      extraMonths > 0
        ? ` ${extraMonths} ${extraMonths === 1 ? "month" : "months"}`
        : "";

    return {
      normalized: `${formatNumber(years)} ${yearLabel}${monthSuffix}`,
      totalMonths,
    };
  }

  if (/^\d+(?:\.\d+)?$/.test(lower)) {
    const years = Number(lower);
    const extraMonths = /^\d+$/.test(monthsAfterBirthday)
      ? Math.min(11, Math.max(0, Number(monthsAfterBirthday)))
      : 0;
    const totalMonths = years * 12 + extraMonths;
    const yearLabel = years === 1 ? "year" : "years";
    const monthSuffix =
      extraMonths > 0
        ? ` ${extraMonths} ${extraMonths === 1 ? "month" : "months"}`
        : "";

    return {
      normalized: `${formatNumber(years)} ${yearLabel}${monthSuffix}`,
      totalMonths,
    };
  }

  return { normalized: raw, totalMonths: null as number | null };
}

function programForAge(input: string, monthsAfterBirthday = "") {
  const { totalMonths } = normalizeAgeInput(input, monthsAfterBirthday);
  if (totalMonths === null) return "";
  if (totalMonths < 24) return INFANT_PROGRAM;
  if (totalMonths < 60) return PRESCHOOL_PROGRAM;
  return "";
}

function shouldShowMonths(input: string) {
  const lower = input.trim().toLowerCase();
  return /^(1|2)(?:\.0+)?(?:\s*(?:years?|yrs?|yr|y))?$/.test(lower);
}

function normalizeExtraChildren(children: ExtraChild[]) {
  return children.map((child) => ({
    name: child.name.trim(),
    age: normalizeAgeInput(child.age, child.months).normalized,
    program: child.program,
    schedule: child.schedule,
  }));
}

function buildMailto(data: FormData, children: ReturnType<typeof normalizeExtraChildren>) {
  const schedule = data.getAll("schedule").join(", ") || "Not specified";
  const subject = `Enrollment inquiry for ${data.get("child")}`;
  const body = [
    `Parent or guardian: ${data.get("guardian")}`,
    `Email: ${data.get("email")}`,
    `Phone: ${data.get("phone")}`,
    "",
    `Child: ${data.get("child")}`,
    `Child's age: ${data.get("age")}`,
    `Program: ${data.get("program")}`,
    `Schedule needs: ${schedule}`,
    ...children.flatMap((child, index) => [
      "",
      `Additional child ${index + 2}: ${child.name}`,
      `Age: ${child.age}`,
      `Program: ${child.program}`,
      `Schedule needs: ${child.schedule.join(", ") || "Not specified"}`,
    ]),
    "",
    `Additional information: ${data.get("message") || "None provided"}`,
    "",
    `Calls/texts consent: ${data.get("smsConsent") ? "Yes" : "No"}`,
    `Email consent: ${data.get("emailConsent") ? "Yes" : "No"}`,
  ].join("\n");

  return `${school.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function EnrollmentForm({ compact = false }: { compact?: boolean }) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [emailDraft, setEmailDraft] = useState("");
  const [program, setProgram] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [ageMonths, setAgeMonths] = useState("");
  const [extraChildren, setExtraChildren] = useState<ExtraChild[]>([]);

  function updatePrimaryAge(value: string, months = ageMonths) {
    setAgeValue(value);
    setProgram(programForAge(value, months));
    if (!shouldShowMonths(value)) setAgeMonths("");
  }

  function updateExtraChild(id: number, updates: Partial<ExtraChild>) {
    setExtraChildren((children) =>
      children.map((child) => {
        if (child.id !== id) return child;
        const next = { ...child, ...updates };
        if ("age" in updates && !shouldShowMonths(next.age)) {
          next.months = "";
        }
        if ("age" in updates || "months" in updates) {
          next.program = programForAge(next.age, next.months);
        }
        return next;
      }),
    );
  }

  function toggleExtraChildSchedule(id: number, option: string) {
    setExtraChildren((children) =>
      children.map((child) => {
        if (child.id !== id) return child;
        const selected = child.schedule.includes(option);
        return {
          ...child,
          schedule: selected
            ? child.schedule.filter((item) => item !== option)
            : [...child.schedule, option],
        };
      }),
    );
  }

  function addChild() {
    setExtraChildren((children) => [
      ...children,
      {
        id: Date.now(),
        name: "",
        age: "",
        months: "",
        program: "",
        schedule: [],
      },
    ]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const normalizedChildren = normalizeExtraChildren(extraChildren);
    const fallback = buildMailto(data, normalizedChildren);
    setEmailDraft(fallback);
    setSubmitState("submitting");

    const schedule = data.getAll("schedule").map(String);
    const payload = {
      guardian: String(data.get("guardian") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      child: String(data.get("child") || ""),
      age: String(data.get("age") || ""),
      program: String(data.get("program") || ""),
      schedule,
      customDays: "",
      message: String(data.get("message") || ""),
      additionalChildren: normalizedChildren,
      smsConsent: data.get("smsConsent") === "yes",
      emailConsent: data.get("emailConsent") === "yes",
      website: String(data.get("website") || ""),
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Inquiry delivery failed");
      }

      setSubmitState("sent");
      form.reset();
      setProgram("");
      setAgeValue("");
      setAgeMonths("");
      setExtraChildren([]);
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "sent") {
    return (
      <div className="inquiry-success-overlay" role="status" aria-live="polite">
        <div className="inquiry-success-panel">
          <span className="inquiry-success-mark" aria-hidden="true">✓</span>
          <p className="inquiry-success-eyebrow">Enrollment inquiry</p>
          <h1>Your inquiry was sent.</h1>
          <p>
            Thank you for contacting Montessori Playschool. We received your
            enrollment information and will follow up using the contact methods
            you provided.
          </p>
          <button
            className="button button-primary"
            type="button"
            onClick={() => setSubmitState("idle")}
          >
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  const scheduleOptions = [
    "Weekdays",
    "Saturday",
    "Mornings",
    "Evenings",
    "Full day",
    "Other",
  ];

  const normalizedPrimaryAge = normalizeAgeInput(ageValue, ageMonths).normalized;

  return (
    <form className={`enrollment-form ${compact ? "form-compact" : ""}`} onSubmit={handleSubmit}>
      {submitState === "error" && (
        <p className="form-note" role="alert">
          We couldn&apos;t send your inquiry. Your information is still here;
          you can edit it and try again, or{" "}
          <a href={emailDraft}>open the prepared email</a>.
        </p>
      )}

      <input
        aria-hidden="true"
        autoComplete="off"
        name="website"
        tabIndex={-1}
        type="text"
        style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", opacity: 0 }}
      />

      <div className="form-field">
        <label htmlFor={`guardian-${compact}`}>Parent or guardian name</label>
        <input id={`guardian-${compact}`} name="guardian" autoComplete="name" required />
      </div>

      <div className="form-split">
        <div className="form-field">
          <label htmlFor={`email-${compact}`}>Email</label>
          <input
            id={`email-${compact}`}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor={`phone-${compact}`}>Phone</label>
          <input
            id={`phone-${compact}`}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
          />
        </div>
      </div>

      <div className="form-split">
        <div className="form-field">
          <label htmlFor={`child-${compact}`}>Child&apos;s name</label>
          <input id={`child-${compact}`} name="child" required />
        </div>

        <div className="form-field">
          <label htmlFor={`age-input-${compact}`}>Child&apos;s age (years or months)</label>
          <input
            id={`age-input-${compact}`}
            type="text"
            inputMode="text"
            autoComplete="off"
            value={ageValue}
            onChange={(event) => updatePrimaryAge(event.target.value)}
            required
          />
          <input type="hidden" name="age" value={normalizedPrimaryAge} />
          <p className="form-note">
            For example: 18 months, 2 years, or 2 years 6 months.
          </p>

          {shouldShowMonths(ageValue) && (
            <div className="months-reveal">
              <label htmlFor={`age-months-${compact}`}>Months past birthday</label>
              <input
                id={`age-months-${compact}`}
                type="number"
                min="0"
                max="11"
                step="1"
                inputMode="numeric"
                value={ageMonths}
                onChange={(event) => {
                  const value = event.target.value;
                  setAgeMonths(value);
                  setProgram(programForAge(ageValue, value));
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor={`program-${compact}`}>Program of interest</label>
        <select
          id={`program-${compact}`}
          name="program"
          value={program}
          required
          onChange={(event) => setProgram(event.target.value)}
        >
          <option value="" disabled>
            Choose a program
          </option>
          <option value={INFANT_PROGRAM}>{INFANT_PROGRAM}</option>
          <option value={PRESCHOOL_PROGRAM}>{PRESCHOOL_PROGRAM}</option>
          <option value={SCHOOL_AGE_PROGRAM}>{SCHOOL_AGE_PROGRAM}</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <fieldset>
        <legend>Schedule needs</legend>
        <div className="checkbox-grid">
          {scheduleOptions.map((option) => (
            <label key={option}>
              <input type="checkbox" name="schedule" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className="schedule-disclaimer">
        Schedule requests are subject to availability and school approval.
        Selecting an option does not guarantee placement or specific days
        and hours.
      </p>

      {extraChildren.map((child, index) => (
        <section className="additional-child-card" key={child.id}>
          <div className="additional-child-heading">
            <strong>Child {index + 2}</strong>
            <button
              type="button"
              className="remove-child-button"
              onClick={() =>
                setExtraChildren((children) =>
                  children.filter((item) => item.id !== child.id),
                )
              }
            >
              Remove
            </button>
          </div>

          <div className="form-split">
            <div className="form-field">
              <label htmlFor={`extra-child-name-${child.id}`}>Child&apos;s name</label>
              <input
                id={`extra-child-name-${child.id}`}
                value={child.name}
                onChange={(event) =>
                  updateExtraChild(child.id, { name: event.target.value })
                }
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor={`extra-child-age-${child.id}`}>Child&apos;s age (years or months)</label>
              <input
                id={`extra-child-age-${child.id}`}
                type="text"
                inputMode="text"
                autoComplete="off"
                value={child.age}
                onChange={(event) =>
                  updateExtraChild(child.id, { age: event.target.value })
                }
                required
              />
              <p className="form-note">
                For example: 18 months, 2 years, or 2 years 6 months.
              </p>
              {shouldShowMonths(child.age) && (
                <div className="months-reveal">
                  <label htmlFor={`extra-child-months-${child.id}`}>
                    Months past birthday
                  </label>
                  <input
                    id={`extra-child-months-${child.id}`}
                    type="number"
                    min="0"
                    max="11"
                    step="1"
                    inputMode="numeric"
                    value={child.months}
                    onChange={(event) =>
                      updateExtraChild(child.id, { months: event.target.value })
                    }
                  />
                </div>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor={`extra-child-program-${child.id}`}>Program</label>
            <select
              id={`extra-child-program-${child.id}`}
              value={child.program}
              onChange={(event) =>
                updateExtraChild(child.id, { program: event.target.value })
              }
              required
            >
              <option value="" disabled>
                Choose a program
              </option>
              <option value={INFANT_PROGRAM}>{INFANT_PROGRAM}</option>
              <option value={PRESCHOOL_PROGRAM}>{PRESCHOOL_PROGRAM}</option>
              <option value={SCHOOL_AGE_PROGRAM}>{SCHOOL_AGE_PROGRAM}</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <fieldset>
            <legend>Schedule needs</legend>
            <div className="checkbox-grid">
              {scheduleOptions.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={child.schedule.includes(option)}
                    onChange={() => toggleExtraChildSchedule(child.id, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>
      ))}

      <button type="button" className="add-child-button" onClick={addChild}>
        <span aria-hidden="true">+</span> Add Child
      </button>

      <div className="form-field additional-info-field">
        <label htmlFor={`message-${compact}`}>Additional information</label>
        <textarea
          id={`message-${compact}`}
          name="message"
          rows={4}
          placeholder="Any other details we should know about your child, schedule, or enrollment needs?"
        />
      </div>

      <fieldset className="consent-fieldset">
        <legend>Contact consent</legend>
        <div className="consent-list">
          <label>
            <input type="checkbox" name="smsConsent" value="yes" required />
            <span>
              I agree to receive calls and text messages about enrollment at the
              phone number provided. Message and data rates may apply. Reply STOP
              to opt out of text messages.
            </span>
          </label>
          <label>
            <input type="checkbox" name="emailConsent" value="yes" required />
            <span>
              I agree to receive emails about enrollment at the email address
              provided.
            </span>
          </label>
        </div>
      </fieldset>

      <button
        className="button button-primary form-submit"
        type="submit"
        disabled={submitState === "submitting"}
      >
        {submitState === "submitting" ? "Sending…" : "Send enrollment inquiry"}{" "}
        <span aria-hidden="true">→</span>
      </button>

      <p className="form-note">
        Both contact consent boxes are required before submitting this inquiry.
      </p>
    </form>
  );
}
