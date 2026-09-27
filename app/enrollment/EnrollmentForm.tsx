"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type SubmitState = "idle" | "submitting" | "sent" | "error";

const INFANT_PROGRAM = "Infant Program · Birth–24 months";
const PRESCHOOL_PROGRAM = "Preschool Program · Age 2–entry into kindergarten";
const SCHOOL_AGE_PROGRAM = "School-Age Program · Kindergarten–9th grade";

function programForAge(age: string) {
  if (age === "Under 1 year" || age === "1 year") {
    return INFANT_PROGRAM;
  }

  const numericAge = Number.parseInt(age, 10);
  if (Number.isNaN(numericAge)) return "";
  if (numericAge >= 2 && numericAge <= 4) return PRESCHOOL_PROGRAM;
  if (numericAge >= 5) return SCHOOL_AGE_PROGRAM;
  return "";
}

function buildMailto(data: FormData) {
  const schedule = data.getAll("schedule").join(", ") || "Not specified";
  const customDays = data.get("customDays") || "Not specified";
  const subject = `Enrollment inquiry for ${data.get("child")}`;
  const body = [
    `Parent or guardian: ${data.get("guardian")}`,
    `Email: ${data.get("email")}`,
    `Phone: ${data.get("phone")}`,
    `Child: ${data.get("child")}`,
    `Child's age: ${data.get("age")}`,
    `Program: ${data.get("program")}`,
    `Schedule needs: ${schedule}`,
    `Other schedule details: ${customDays}`,
    `SMS consent: ${data.get("smsConsent") ? "Yes" : "No"}`,
    `Email consent: ${data.get("emailConsent") ? "Yes" : "No"}`,
    "",
    `Additional notes: ${data.get("message") || "None provided"}`,
  ].join("\n");

  return `mailto:enrollment@montessori-playschool.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function EnrollmentForm({ compact = false }: { compact?: boolean }) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [emailDraft, setEmailDraft] = useState("");
  const [customSchedule, setCustomSchedule] = useState(false);
  const [program, setProgram] = useState("");

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
      customDays: String(data.get("customDays") || ""),
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
      setCustomSchedule(false);
      setProgram("");
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
          phone number or email you provided to follow up.
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

  const ageOptions = [
    "Under 1 year",
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
    "7 years",
    "8 years",
    "9 years",
    "10 years",
    "11 years",
    "12 years",
    "13 years",
    "14 years",
    "15+ years",
  ];

  const scheduleOptions = [
    "Weekdays",
    "Saturday",
    "Morning",
    "Afternoon",
    "Evening",
    "Full day",
    "After school",
    "Early drop-off",
    "Late pick-up",
    "Flexible schedule",
    "Other",
  ];

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
          <select
            id={`age-${compact}`}
            name="age"
            defaultValue=""
            required
            onChange={(event) => setProgram(programForAge(event.target.value))}
          >
            <option value="" disabled>
              Choose age
            </option>
            {ageOptions.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
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
              <input
                type="checkbox"
                name="schedule"
                value={option}
                checked={option === "Other" ? customSchedule : undefined}
                onChange={
                  option === "Other"
                    ? (event) => setCustomSchedule(event.target.checked)
                    : undefined
                }
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {customSchedule && (
        <div className="form-field custom-schedule-field">
          <label htmlFor={`custom-days-${compact}`}>Other schedule needs</label>
          <input
            id={`custom-days-${compact}`}
            name="customDays"
            placeholder="Example: Tuesday and Thursday, 8 AM–3 PM"
            required
          />
        </div>
      )}

      <p className="schedule-disclaimer">
        Schedule requests are subject to availability and school approval.
        Selecting an option does not guarantee placement or specific days
        and hours.
      </p>

      {!compact && (
        <div className="form-field">
          <label htmlFor="message">What would you like us to know?</label>
          <textarea id="message" name="message" rows={5} />
        </div>
      )}

      <fieldset className="consent-fieldset">
        <legend>Contact consent</legend>
        <div className="consent-list">
          <label>
            <input type="checkbox" name="smsConsent" value="yes" required />
            <span>
              I agree to receive SMS messages about my enrollment inquiry at the
              phone number provided. Message and data rates may apply. Reply STOP
              to opt out.
            </span>
          </label>
          <label>
            <input type="checkbox" name="emailConsent" value="yes" required />
            <span>
              I agree to receive emails about my enrollment inquiry at the email
              address provided.
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
