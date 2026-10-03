import type { Metadata } from "next";
import { SiteFooter } from "../site-chrome";
import { school } from "../site-data";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice for the Montessori Playschool website.",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="legal-page content-section">
        <p className="section-label">Privacy</p>
        <h1>Website privacy notice</h1>
        <p className="legal-updated">Last updated · October 2026</p>
        <section>
          <h2>Information you provide</h2>
          <p>
            When you submit the enrollment inquiry form, the website sends the
            contact, child, scheduling, consent, and message information you
            provide to Montessori Playschool so we can respond to your inquiry.
            Submitted information may be retained in the school&apos;s email and
            communication systems as part of the enrollment process.
          </p>
        </section>
        <section>
          <h2>How information may be used</h2>
          <p>
            Information you submit may be used to answer questions, discuss
            program availability, plan a visit, follow up about enrollment,
            and provide communications you consented to receive. It will not be
            sold.
          </p>
        </section>
        <section>
          <h2>Children&apos;s information</h2>
          <p>
            Parents and guardians should submit only the information reasonably
            needed for an enrollment inquiry. The public website is intended
            for adults and is not designed for children to submit information
            directly.
          </p>
        </section>
        <section>
          <h2>Contact and future updates</h2>
          <p>
            Privacy questions may be sent to{" "}
            <a href={school.emailHref}>{school.email}</a>. This notice will be updated
            if the website&apos;s data-collection or communication practices
            materially change.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
