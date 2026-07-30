import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-chrome";
import EnrollmentForm from "./EnrollmentForm";

export const metadata: Metadata = {
  title: "Enrollment",
  description:
    "Start an enrollment inquiry for Montessori Playschool in Carmichael, California.",
};

const steps = [
  ["Share your needs", "Tell us your child’s age, program interest, and preferred schedule."],
  ["Connect with us", "We’ll discuss availability, opening plans, and whether the program may fit."],
  ["Plan a visit", "When tours begin, see the environment and bring your questions."],
  ["Complete enrollment", "Receive the required forms, policies, and confirmed start information."],
];

const familyEssentials = [
  {
    title: "Individual rhythms",
    text: "Infant feeding, sleeping, diapering, and care routines are individualized from the information families provide.",
  },
  {
    title: "Positive guidance",
    text: "Educators use calm modeling, redirection, reassurance, clear expectations, and family communication.",
  },
  {
    title: "Rest and movement",
    text: "Preschool rest or quiet time is offered daily, with outdoor or gross-motor activity built into each age group’s routine.",
  },
  {
    title: "Transportation",
    text: "The center does not provide transportation. Families arrange all drop-off, pickup, and school transportation.",
  },
];

export default function EnrollmentPage() {
  return (
    <>
      <SiteHeader />
      <main className="enrollment-page">
        <section className="enrollment-heading">
          <div>
            <p className="section-label">Enrollment inquiry</p>
            <h1>
              Let&apos;s learn about
              <br />
              <em>your family.</em>
            </h1>
            <p>
              Enrollment inquiries are welcome while Montessori Playschool
              prepares for opening. Share what you need and we&apos;ll help you
              understand the next step.
            </p>
          </div>
          <div className="enrollment-facts">
            <div>
              <span>Programs</span>
              <p>Infant, Toddler, Preschool &amp; School Age</p>
            </div>
            <div>
              <span>Days</span>
              <p>Monday–Saturday</p>
            </div>
            <div>
              <span>Hours</span>
              <p>7:00 AM–10:00 PM</p>
            </div>
            <div>
              <span>Location</span>
              <p>2925 Root Ave, Carmichael, CA</p>
            </div>
          </div>
        </section>

        <section className="enrollment-body content-section">
          <div className="form-wrap">
            <p className="section-label">Tell us about your needs</p>
            <EnrollmentForm />
          </div>
          <aside>
            <p className="section-label">What happens next</p>
            <ol>
              {steps.map(([title, text], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2>{title}</h2>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="enrollment-note">
              <strong>Please note</strong>
              <p>
                An inquiry does not guarantee placement. Program capacity,
                admission dates, rates, and licensing details will be confirmed
                before enrollment is finalized.
              </p>
            </div>
          </aside>
        </section>

        <section className="family-essentials content-section">
          <div className="section-heading">
            <div>
              <p className="section-label">Family handbook highlights</p>
              <h2>Helpful details before you inquire.</h2>
            </div>
            <p>
              These practical policies come directly from the facility&apos;s
              infant, toddler, preschool, and school-age family handbooks.
            </p>
          </div>
          <div className="family-essential-grid">
            {familyEssentials.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="closure-note">
            <div>
              <p className="section-label">Scheduled holiday closures</p>
              <h3>
                New Year&apos;s Day, Memorial Day, Independence Day, Labor Day,
                Thanksgiving and the following Friday, and Christmas Day
              </h3>
            </div>
            <p>
              Teacher-preparation closures are communicated in advance. Families
              receive an annual event calendar and updates as needed.
            </p>
          </div>
        </section>

        <section className="tuition-teaser">
          <div>
            <p className="section-label">Tuition transparency</p>
            <h2>See the full day and evening rate schedule.</h2>
          </div>
          <a className="button button-light" href="/tuition">
            View tuition &amp; fees <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
