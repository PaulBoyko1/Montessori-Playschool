"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type SubmitState = "idle" | "submitting" | "sent" | "error";

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
    `Custom days or hours: ${customDays}`,
    "",
    `Additional notes: ${data.get("message") || "None provided"}`,
  ].join("\n");

  return `mailto:enroll@montessori-playschool.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function EnrollmentForm({ compact = false }: { compact?: boolean }) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [emailDraft, setEmailDraft] = useState("");
  const [customSchedule, setCustomSchedule] = useState(false);

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
          <input id={`age-${compact}`} name="age" required />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor={`program-${compact}`}>Program of interest</label>
        <select id={`program-${compact}`} name="program" defaultValue="" required>
          <option value="" disabled>
            Choose a program
          </option>
          <option>Infant Program · Birth–24 months</option>
          <option>Preschool Program · Age 2–entry into kindergarten</option>
          <option>School-Age Program · Kindergarten–9th grade</option>
          <option>Not sure yet</option>
        </select>
      </div>
      {!compact && (
        <>
          <fieldset>
            <legend>Schedule needs</legend>
            <div className="checkbox-grid">
              {[
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
                "Custom days",
              ].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    name="schedule"
                    value={option}
                    checked={option === "Custom days" ? customSchedule : undefined}
                    onChange={
                      option === "Custom days"
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
              <label htmlFor="custom-days">Requested days and hours</label>
              <input
                id="custom-days"
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
          <div className="form-field">
            <label htmlFor="message">What would you like us to know?</label>
            <textarea id="message" name="message" rows={5} />
          </div>
        </>
      )}
      <button
        className="button button-primary form-submit"
        type="submit"
        disabled={submitState === "submitting"}
      >
        {submitState === "submitting" ? "Sending…" : "Send enrollment inquiry"}{" "}
        <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">
        Submitting sends these details directly to Montessori Playschool.
      </p>
    </form>
  );
}
