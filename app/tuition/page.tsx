import type { Metadata } from "next";
import { InnerHero, SiteFooter } from "../site-chrome";
import RateTable from "./RateTable";

export const metadata: Metadata = {
  title: "Tuition & Assistance",
  description:
    "Review Montessori Playschool tuition, fees, CalWORKs childcare assistance, Child Action support, and payment policies.",
};

const fees = [
  {
    amount: "$150",
    title: "Registration fee",
    text: "A one-time fee due at enrollment.",
  },
  {
    amount: "$95",
    title: "Annual materials fee",
    text: "Due at re-enrollment during the March 1–June 5 period.",
  },
  {
    amount: "$50",
    title: "Summer activity fee",
    text: "Due at summer enrollment during the March 1–June 5 period.",
  },
];

export default function TuitionPage() {
  return (
    <>
      <main className="tuition-page">
        <InnerHero
          eyebrow="Tuition & financial assistance"
          title="Clear costs."
          accent="More ways to pay."
          description="Review standard tuition reference rates and learn how eligible families may use CalWORKs or Child Action assistance."
          image="/images/photos/selected/home-hero.webp"
          imageAlt="An educator engaging with two young children at their level in a bright classroom"
        />

        <section className="tuition-intro content-section">
          <div>
            <p className="section-label">Monthly and weekly rate reference</p>
            <h2>Full-time care by age and schedule.</h2>
          </div>
          <p>
            Day-program rates cover 7:00 AM–5:00 PM. Evening-program rates
            cover 5:00 PM–10:00 PM. Optional half-day, after-school, and
            extended-care arrangements are discussed individually.
          </p>
        </section>

        <section className="rate-section content-section">
          <RateTable />
          <p className="rate-note">
            These are the standard reference rates in the current Admission
            Agreement. Weekly reference rates are one-quarter of the listed
            monthly rate. Weekly schedules are subject to availability and
            school approval. Montessori Playschool provides at least 30
            calendar days&apos; written notice before a change to the basic tuition
            rate. Final rates and services are confirmed in a signed agreement.
          </p>
        </section>

        <section className="assistance-section" id="assistance">
          <div className="content-section">
            <div className="section-heading">
              <div>
                <p className="section-label">Childcare assistance</p>
                <h2>Eligible families can use CalWORKs or Child Action.</h2>
              </div>
              <p>
                Montessori Playschool accepts eligible families using approved
                childcare assistance. Eligibility and authorization are
                determined by the administering program, not by the school.
              </p>
            </div>
            <div className="assistance-grid">
              <a
                href="https://www.cdss.ca.gov/inforesources/calworks-child-care/program-eligibility"
                target="_blank"
                rel="noreferrer"
              >
                <span>California program</span>
                <h3>CalWORKs Child Care</h3>
                <p>
                  Families receiving or transitioning from CalWORKs cash aid
                  may qualify when they also have an approved need for care.
                </p>
                <strong>Review eligibility information <span aria-hidden="true">↗</span></strong>
              </a>
              <a
                href="https://childaction.org/apply-for-subsidized-care/"
                target="_blank"
                rel="noreferrer"
              >
                <span>Sacramento County resource</span>
                <h3>Child Action</h3>
                <p>
                  Child Action offers financial assistance and an eligibility
                  list for qualifying Sacramento County families.
                </p>
                <strong>Explore subsidized care <span aria-hidden="true">↗</span></strong>
              </a>
            </div>
            <div className="assistance-help">
              <div>
                <p className="section-label">Need help?</p>
                <h3>Contact us before enrollment.</h3>
              </div>
              <p>
                Tell us which assistance program you are using. We can explain
                what authorization or provider information Montessori
                Playschool needs to complete your enrollment.
              </p>
              <a className="button button-primary" href="/contact">
                Ask about assistance <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="fee-section">
          <div className="content-section">
            <div className="section-heading">
              <div>
                <p className="section-label">Additional fees</p>
                <h2>What families can plan for.</h2>
              </div>
              <p>
                The Admission Agreement lists three standard enrollment-related
                fees in addition to monthly tuition.
              </p>
            </div>
            <div className="fee-grid">
              {fees.map((fee, index) => (
                <article key={fee.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{fee.amount}</strong>
                  <h3>{fee.title}</h3>
                  <p>{fee.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="payment-details content-section">
          <div>
            <p className="section-label">Payment details</p>
            <h2>Simple monthly expectations.</h2>
          </div>
          <ul>
            <li>Tuition is due on the first day of each month.</li>
            <li>Payments received after the fifth are subject to a $50 late fee.</li>
            <li>Returned payments are subject to a $50 fee.</li>
            <li>Family and sibling discounts are not currently offered.</li>
            <li>
              Child absences do not receive make-up days or tuition credits.
            </li>
          </ul>
        </section>

        <section className="simple-cta">
          <p className="section-label">Build your schedule</p>
          <h2>Tell us your child&apos;s age and the hours you need.</h2>
          <a className="button button-light" href="/contact#tour">
            Schedule a Tour <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
