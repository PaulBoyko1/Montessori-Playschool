"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function EnrollmentForm({ compact = false }: { compact?: boolean }) {
  const [emailDraft, setEmailDraft] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
      "",
      `Additional notes: ${data.get("message") || "None provided"}`,
    ].join("\n");

    setEmailDraft(
      `mailto:natalia@mn-corp.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  }

  if (emailDraft) {
    return (
      <div className="form-success" role="status">
        <span aria-hidden="true">✓</span>
        <h2>Your inquiry is ready.</h2>
        <p>
          Open the prepared email, review the details, and press Send in your
          email app to complete your inquiry.
        </p>
        <a className="button button-primary" href={emailDraft}>
          Open email draft <span aria-hidden="true">↗</span>
        </a>
        <button type="button" onClick={() => setEmailDraft("")}>
          Edit this inquiry
        </button>
      </div>
    );
  }

  return (
    <form className={`enrollment-form ${compact ? "form-compact" : ""}`} onSubmit={handleSubmit}>
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
          <option>Infant Program · 6 weeks–1.5 years</option>
          <option>Toddler Program · 1.5–3 years</option>
          <option>Preschool Program · 3–6 years</option>
          <option>School-Age Program · 6–13 years</option>
          <option>Not sure yet</option>
        </select>
      </div>
      {!compact && (
        <>
          <fieldset>
            <legend>Schedule needs</legend>
            <div className="checkbox-grid">
              {["Weekdays", "Saturday", "Morning", "Afternoon", "Evening"].map(
                (option) => (
                  <label key={option}>
                    <input type="checkbox" name="schedule" value={option} />
                    <span>{option}</span>
                  </label>
                ),
              )}
            </div>
          </fieldset>
          <div className="form-field">
            <label htmlFor="message">What would you like us to know?</label>
            <textarea id="message" name="message" rows={5} />
          </div>
        </>
      )}
      <button className="button button-primary form-submit" type="submit">
        Prepare enrollment inquiry <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">
        Your information stays in your browser until you choose to open and send
        the prepared email.
      </p>
    </form>
  );
}
