import type { Metadata } from "next";
import { school } from "../site-data";
import { SiteFooter } from "../site-chrome";
import EnrollmentForm from "./EnrollmentForm";

export const metadata: Metadata = {
  title: "Enrollment",
  description:
    "Start an enrollment inquiry for Montessori Playschool in Carmichael, California.",
};

const steps = [
  ["Share your needs", "Child’s age, program, and preferred schedule."],
  ["Connect with us", "We’ll review availability, tuition, and assistance."],
  ["Plan a visit", "Tour the school and meet the team."],
  ["Complete enrollment", "Complete forms and confirm the start date."],
];

const familyEssentials = [
  {
    title: "Individual rhythms",
    text: "Infant feeding, sleep, diapering, and care routines are individualized.",
  },
  {
    title: "Positive guidance",
    text: "Calm modeling, redirection, reassurance, and clear expectations.",
  },
  {
    title: "Rest and movement",
    text: "Daily rest or quiet time plus outdoor or gross-motor activity.",
  },
  {
    title: "Financial assistance",
    text: "Eligible families may use approved CalWORKs or Child Action childcare assistance.",
  },
];

export default function EnrollmentPage() {
  return (
    <>
      <main className="enrollment-page">
        <section className="enrollment-heading">
          <div>
            <p className="section-label">Enrollment inquiry</p>
            <h1>
              Let&apos;s learn about
              <br />
              <em>your family.</em>
            </h1>
          </div>
          <div className="enrollment-facts">
            <div>
              <span>Programs</span>
              <p>Infant, Preschool &amp; School Age</p>
            </div>
            <div>
              <span>Days</span>
              <p>{school.days}</p>
            </div>
            <div>
              <span>Hours</span>
              <p>{school.hours}</p>
            </div>
            <div>
              <span>Location</span>
              <p>{school.address}</p>
            </div>
          </div>
        </section>

        <section className="enrollment-body content-section" id="inquiry">
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
              <h2>What families should know.</h2>
            </div>
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
        </section>

        <section className="tuition-teaser">
          <div>
            <p className="section-label">Tuition transparency</p>
            <h2>Day and evening tuition rates.</h2>
          </div>
          <a className="button button-light" href="/tuition">
            View tuition &amp; assistance <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
