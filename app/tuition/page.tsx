import type { Metadata } from "next";
import { InnerHero, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Tuition & Fees",
  description:
    "Review Montessori Playschool's standard full-time day and evening tuition rates, registration fees, and payment policies.",
};

const rates = [
  ["0–5 months", "$2,500", "$2,700"],
  ["6–11 months", "$2,200", "$2,400"],
  ["12–17 months", "$1,950", "$2,100"],
  ["18–23 months", "$1,750", "$1,900"],
  ["24–35 months", "$1,450", "$1,600"],
  ["3–5 years", "$1,350", "$1,500"],
  ["6–13 years", "$1,250", "$1,400"],
];

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
      <SiteHeader current="/tuition" />
      <main>
        <InnerHero
          eyebrow="Tuition & fees"
          title="Clear costs."
          accent="No guessing."
          description="The current Admission Agreement includes standard full-time monthly reference rates for day and evening programs. Your final schedule and rate are documented before care begins."
          image="/images/preschool-program.png"
          imageAlt="Children concentrating on Montessori learning materials"
        />

        <section className="tuition-intro content-section">
          <div>
            <p className="section-label">Monthly rate reference</p>
            <h2>Full-time care by age and schedule.</h2>
          </div>
          <p>
            Day-program rates cover 7:00 AM–5:00 PM. Evening-program rates
            cover 5:00 PM–10:00 PM. Optional half-day, after-school, and
            extended-care arrangements are discussed individually.
          </p>
        </section>

        <section className="rate-section content-section">
          <div className="rate-table-wrap">
            <table className="rate-table">
              <caption>Standard full-time monthly tuition</caption>
              <thead>
                <tr>
                  <th scope="col">Age group</th>
                  <th scope="col">
                    Day program
                    <span>7 AM–5 PM</span>
                  </th>
                  <th scope="col">
                    Evening program
                    <span>5 PM–10 PM</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rates.map(([age, day, evening]) => (
                  <tr key={age}>
                    <th scope="row">{age}</th>
                    <td>{day}<span>/ month</span></td>
                    <td>{evening}<span>/ month</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="rate-note">
            These are the standard reference rates in the current Admission
            Agreement. Montessori Playschool provides at least 30 calendar
            days&apos; written notice before a change to the basic tuition rate.
            Final rates and services are confirmed in a signed agreement.
          </p>
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
              Scheduled closures and child absences are included in the annual
              tuition calculation and do not receive make-up days or credits.
            </li>
          </ul>
        </section>

        <section className="simple-cta">
          <p className="section-label">Build your schedule</p>
          <h2>Tell us your child&apos;s age and the hours you need.</h2>
          <a className="button button-light" href="/enrollment">
            Start an enrollment inquiry <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
