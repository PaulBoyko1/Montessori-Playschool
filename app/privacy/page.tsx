import type { Metadata } from "next";
import { SiteFooter } from "../site-chrome";

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
        <p className="legal-updated">Last updated · July 2026</p>
        <section>
          <h2>Information you provide</h2>
          <p>
            The enrollment and contact forms prepare email drafts in your
            browser using the contact, child, scheduling, tour, and message
            information you enter. The website does not send or store that
            information automatically. You decide whether to open and send the
            draft through your email provider.
          </p>
        </section>
        <section>
          <h2>How information may be used</h2>
          <p>
            Information you choose to email may be used to answer questions,
            discuss program availability, plan a visit, and support the
            enrollment process. It will not be sold.
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
            Privacy questions may be sent to enroll@montessori-playschool.com. This notice
            will be updated before any server-side form provider, analytics
            service, or other data-collection tool is added.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
