import type { Metadata } from "next";
import { InnerHero, SiteFooter } from "../site-chrome";
import RateTable from "./RateTable";

export const metadata: Metadata = {
  title: "Tuition & Assistance",
  description:
    "Review Montessori Playschool monthly tuition, fees, federal-holiday policies, and childcare assistance options.",
};

const fees = [
  {
    amount: "$150",
    title: "Registration fee",
    text: "Per child, due upon enrollment.",
  },
  {
    amount: "$95",
    title: "School supplies fee",
    text: "Annual, per child, from birth through 9th grade. First payment is due upon enrollment.",
  },
  {
    amount: "$50",
    title: "Summer activity fee",
    text: "Due at summer enrollment.",
  },
];

const federalHolidays = [
  ["January 1", "New Year’s Day"],
  ["Third Monday in January", "Martin Luther King Jr. Day"],
  ["Third Monday in February", "Presidents’ Day (Washington’s Birthday)"],
  ["Last Monday in May", "Memorial Day"],
  ["July 4", "Independence Day"],
  ["First Monday in September", "Labor Day"],
  ["Second Monday in October", "Columbus Day"],
  ["November 11", "Veterans Day"],
  ["Fourth Thursday in November", "Thanksgiving Day"],
  ["December 25", "Christmas Day"],
];

const ratePolicies = [
  {
    title: "Open on federal holidays",
    text: "The center remains open year-round, including the federal holidays listed below. The center is closed on Sundays.",
  },
  {
    title: "Federal holiday rate",
    text: "If a child attends on one of the listed federal holidays, an additional $75 per day is charged.",
  },
  {
    title: "Absences",
    text: "Tuition remains due regardless of a child’s attendance, including vacation, illness, or other absences.",
  },
  {
    title: "Schedule overlap",
    text: "If a child’s schedule overlaps the day and evening programs, the evening-program rate applies.",
  },
  {
    title: "Discounts",
    text: "Family discounts are not offered.",
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
          description="Review current monthly tuition, fees, holiday policies, and childcare assistance options."
          image="/images/photos/selected/community.webp"
          imageAlt="Two children and a caring adult smiling together in the classroom"
        />

        <section className="tuition-intro content-section">
          <div>
            <p className="section-label">Rate sheet effective September 23, 2026</p>
            <h2>Monthly care by age and schedule.</h2>
          </div>
          <p>
            Day-program rates cover 7:00 AM–5:00 PM. Evening-program rates
            cover 5:00 PM–10:00 PM. Montessori Playschool is open
            Monday–Saturday from 7:00 AM–10:00 PM and is closed on Sundays.
          </p>
        </section>

        <section className="rate-sheet-facts content-section" aria-label="Rate sheet details">
          <article>
            <span>Effective date</span>
            <strong>09/23/2026</strong>
          </article>
          <article>
            <span>Hours of operation</span>
            <strong>Monday–Saturday</strong>
            <p>7:00 AM–10:00 PM</p>
          </article>
          <article>
            <span>License</span>
            <strong>#343628256</strong>
          </article>
        </section>

        <section className="rate-section content-section">
          <RateTable />
          <p className="rate-note">
            Preschool tuition applies beginning at 24 months through entry into
            kindergarten. If a schedule overlaps the day and evening programs,
            the evening-program rate applies. Part-time schedules and pricing
            are discussed directly with the center.
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
                These enrollment and activity fees are listed on the current
                childcare rate sheet.
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

        <section className="holiday-section">
          <div className="content-section">
            <div className="section-heading">
              <div>
                <p className="section-label">Federal holidays</p>
                <h2>Open year-round, including listed federal holidays.</h2>
              </div>
              <p>
                Montessori Playschool is open on the listed federal holidays.
                Attendance on one of these days carries an additional
                <strong> $75 per day</strong> charge.
              </p>
            </div>

            <div className="holiday-layout">
              <div className="rate-table-wrap">
                <table className="rate-table holiday-rate-table">
                  <caption>Federal holidays covered by the holiday rate</caption>
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Holiday name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {federalHolidays.map(([date, holiday]) => (
                      <tr key={holiday}>
                        <th scope="row">{date}</th>
                        <td>{holiday}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="rate-policy-grid" aria-label="Tuition and holiday policies">
                {ratePolicies.map((policy, index) => (
                  <article key={policy.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{policy.title}</h3>
                    <p>{policy.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
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
