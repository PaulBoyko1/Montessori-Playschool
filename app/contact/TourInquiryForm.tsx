"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { school } from "../site-data";

type InquiryType = "Tour" | "Enrollment" | "General question";

export default function TourInquiryForm() {
  const [emailDraft, setEmailDraft] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>("Tour");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const type = String(data.get("inquiryType") || "Tour");
    const subject = `${type} inquiry - Montessori Playschool`;
    const body = [
      `Inquiry type: ${type}`,
      `Parent or guardian: ${data.get("guardian")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Child's age: ${data.get("age") || "Not provided"}`,
      `Program: ${data.get("program") || "Not sure yet"}`,
      ...(type === "Tour"
        ? [
            `Preferred tour date: ${data.get("tourDate") || "Not specified"}`,
            `Preferred tour time: ${data.get("tourTime") || "Not specified"}`,
          ]
        : []),
      "",
      `Question or note: ${data.get("message") || "None provided"}`,
    ].join("\n");

    setEmailDraft(
      `${school.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  }

  if (emailDraft) {
    return (
      <div className="form-success" role="status">
        <span aria-hidden="true">✓</span>
        <h2>Your request is ready.</h2>
        <p>
          Open the prepared email, review the details, and press Send in your
          email app to complete your request.
        </p>
        <a className="button button-primary" href={emailDraft}>
          Open email draft <span aria-hidden="true">↗</span>
        </a>
        <button type="button" onClick={() => setEmailDraft("")}>
          Edit this request
        </button>
      </div>
    );
  }

  return (
    <form className="enrollment-form form-compact" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="contact-inquiry-type">Inquiry type</label>
        <select
          id="contact-inquiry-type"
          name="inquiryType"
          value={inquiryType}
          onChange={(event) => setInquiryType(event.target.value as InquiryType)}
        >
          <option>Tour</option>
          <option>Enrollment</option>
          <option>General question</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="contact-guardian">Parent or guardian name</label>
        <input id="contact-guardian" name="guardian" autoComplete="name" required />
      </div>

      <div className="form-split">
        <div className="form-field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-phone">Phone</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
          />
        </div>
      </div>

      <div className="form-split">
        <div className="form-field">
          <label htmlFor="contact-age">Child&apos;s age</label>
          <input id="contact-age" name="age" inputMode="numeric" />
        </div>
        <div className="form-field">
          <label htmlFor="contact-program">Program of interest</label>
          <select id="contact-program" name="program" defaultValue="">
            <option value="">Not sure yet</option>
            <option>Infant Program · Birth–24 months</option>
            <option>Preschool Program · Age 2–entry into kindergarten</option>
            <option>School-Age Program · Kindergarten–9th grade</option>
          </select>
        </div>
      </div>

      {inquiryType === "Tour" && (
        <>
          <div className="form-split">
            <div className="form-field">
              <label htmlFor="contact-tour-date">Preferred tour date</label>
              <input id="contact-tour-date" name="tourDate" type="date" required />
            </div>
            <div className="form-field">
              <label htmlFor="contact-tour-time">Preferred tour time</label>
              <input id="contact-tour-time" name="tourTime" type="time" required />
            </div>
          </div>
          <p className="schedule-disclaimer">
            Requested tour times are not confirmed until Montessori Playschool
            replies.
          </p>
        </>
      )}

      <div className="form-field">
        <label htmlFor="contact-message">Question or note</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Anything you would like us to know before we reply"
        />
      </div>

      <button className="button button-primary form-submit" type="submit">
        Prepare email request <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">
        Nothing is sent automatically. Your information stays in your browser
        until you choose to open and send the prepared email.
      </p>
    </form>
  );
}
