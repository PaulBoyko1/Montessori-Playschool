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
  ["Share your needs", "Tell us your child’s age, program interest, and preferred schedule."],
  ["Connect with us", "We’ll discuss availability, schedule options, tuition, and assistance programs."],
  ["Plan a visit", "Tour the environment, meet the team, and bring your questions."],
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
            <p>
              Montessori Playschool is welcoming enrollment inquiries from
              birth through 9th grade. Share what you need and we&apos;ll help you
              understand the next step.
            </p>
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
              <h2>Helpful details before you inquire.</h2>
            </div>
            <p>
              These practical policies come directly from the facility&apos;s
              infant and preschool/school-age family handbooks.
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
        </section>

        <section className="tuition-teaser">
          <div>
            <p className="section-label">Tuition transparency</p>
            <h2>See the full day and evening rate schedule.</h2>
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
