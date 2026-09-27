"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type SubmitState = "idle" | "submitting" | "sent" | "error";
type AgeUnit = "months" | "years";

const INFANT_PROGRAM = "Infant Program · Birth–23 months";
const PRESCHOOL_PROGRAM = "Preschool Program · 24 months–entry into kindergarten";
const SCHOOL_AGE_PROGRAM = "School-Age Program · Kindergarten–9th grade";

function formatAge(value: string, unit: AgeUnit) {
  if (!value) return "";
  const numericAge = Number(value);
  const singular = numericAge === 1;
  return `${value} ${unit === "months" ? (singular ? "month" : "months") : singular ? "year" : "years"}`;
}

function programForAge(value: string, unit: AgeUnit) {
  const numericAge = Number(value);
  if (!value || Number.isNaN(numericAge) || numericAge < 0) return "";

  if (unit === "months") {
    if (numericAge < 24) return INFANT_PROGRAM;
    if (numericAge < 60) return PRESCHOOL_PROGRAM;
    return SCHOOL_AGE_PROGRAM;
  }

  if (numericAge < 2) return INFANT_PROGRAM;
  if (numericAge < 5) return PRESCHOOL_PROGRAM;
  return SCHOOL_AGE_PROGRAM;
}

function buildMailto(data: FormData) {
  const schedule = data.getAll("schedule").join(", ") || "Not specified";
  const subject = `Enrollment inquiry for ${data.get("child")}`;
  const body = [
    `Parent or guardian: ${data.get("guardian")}`,
    `Email: ${data.get("email")}`,
    `Phone: ${data.get("phone")}`,
    `Child: ${data.get("child")}`,
    `Child's age: ${data.get("age")}`,
    `Program: ${data.get("program")}`,
    `Schedule needs: ${schedule}`,
    `Calls/texts consent: ${data.get("smsConsent") ? "Yes" : "No"}`,
    `Email consent: ${data.get("emailConsent") ? "Yes" : "No"}`,
    "",
    `Additional information: ${data.get("message") || "None provided"}`,
  ].join("\n");

  return `mailto:enrollment@montessori-playschool.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function EnrollmentForm({ compact = false }: { compact?: boolean }) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [emailDraft, setEmailDraft] = useState("");
  const [program, setProgram] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [ageUnit, setAgeUnit] = useState<AgeUnit>("years");

  function updateAgeProgram(value: string, unit: AgeUnit) {
    setProgram(programForAge(value, unit));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const fallback = buildMailto(data);
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
      setAgeUnit("years");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "sent") {
    return (
      <div className="form-success" role="status">
        <span aria-hidden="true">✓</span>
        <h2>Thank you. Your inquiry was sent.</h2>
        <p>
          Montessori Playschool received your information. We&apos;ll use the
          phone number, text messaging, or email you provided to follow up.
        </p>
        <button type="button" onClick={() => setSubmitState("idle")}>
          Send another inquiry
        </button>
      </div>
    );
  }

  if (submitState === "error") {
    return (
      <div className="form-success" role="alert">
        <span aria-hidden="true">!</span>
        <h2>Automatic delivery is not available yet.</h2>
        <p>
          You can still send the same information using the prepared email
          below.
        </p>
        <a className="button button-primary" href={emailDraft}>
          Open prepared email <span aria-hidden="true">↗</span>
        </a>
        <button type="button" onClick={() => setSubmitState("idle")}>
          Edit this inquiry
        </button>
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

  const formattedAge = formatAge(ageValue, ageUnit);

  return (
    <form className={`enrollment-form ${compact ? "form-compact" : ""}`} onSubmit={handleSubmit}>
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
          <label htmlFor={`age-${compact}`}>Child&apos;s age</label>
          <div className="age-input-row">
            <input
              id={`age-${compact}`}
              type="number"
              inputMode="decimal"
              min="0"
              max={ageUnit === "months" ? "216" : "18"}
              step={ageUnit === "months" ? "1" : "0.1"}
              placeholder={ageUnit === "months" ? "Example: 18" : "Example: 3"}
              value={ageValue}
              onChange={(event) => {
                const value = event.target.value;
                setAgeValue(value);
                updateAgeProgram(value, ageUnit);
              }}
              required
            />
            <select
              aria-label="Age unit"
              value={ageUnit}
              onChange={(event) => {
                const unit = event.target.value as AgeUnit;
                setAgeUnit(unit);
                updateAgeProgram(ageValue, unit);
              }}
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
          <input type="hidden" name="age" value={formattedAge} />
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
