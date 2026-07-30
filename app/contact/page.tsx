import type { Metadata } from "next";
import EnrollmentForm from "../enrollment/EnrollmentForm";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Montessori Playschool about programs, enrollment, and future visits in Carmichael, California.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader current="/contact" />
      <main>
        <section className="contact-heading">
          <div>
            <p className="section-label">Contact</p>
            <h1>
              We&apos;d love to hear
              <br />
              <em>about your child.</em>
            </h1>
          </div>
          <p>
            Ask about programs, schedules, enrollment, or future tours. Call,
            email, or send an inquiry to our team at 2925 Root Ave in
            Carmichael.
          </p>
        </section>

        <section className="contact-grid content-section">
          <div className="contact-cards">
            <article>
              <span>01</span>
              <p className="section-label">Location</p>
              <h2>2925 Root Ave</h2>
              <p>Carmichael, California</p>
              <a
                className="direction-link"
                href="https://www.google.com/maps/search/?api=1&query=2925+Root+Ave%2C+Carmichael%2C+CA"
                target="_blank"
                rel="noreferrer"
              >
                Get directions <span aria-hidden="true">↗</span>
              </a>
            </article>
            <article>
              <span>02</span>
              <p className="section-label">Hours</p>
              <h2>Monday–Saturday</h2>
              <p>7:00 AM–10:00 PM</p>
            </article>
            <article>
              <span>03</span>
              <p className="section-label">Programs</p>
              <h2>Birth–Grade 9</h2>
              <p>Age-specific care from infancy through ninth grade.</p>
            </article>
            <article>
              <span>04</span>
              <p className="section-label">Call or email</p>
              <h2>
                <a href="tel:+19164706898">(916) 470-6898</a>
              </h2>
              <p>
                <a className="direction-link" href="mailto:natalia@mn-corp.com">
                  natalia@mn-corp.com <span aria-hidden="true">↗</span>
                </a>
              </p>
            </article>
          </div>
          <div className="contact-form-wrap">
            <p className="section-label">Quick inquiry</p>
            <h2>Start the conversation.</h2>
            <EnrollmentForm compact />
          </div>
        </section>

        <section className="contact-map-placeholder">
          <div className="map-rings" aria-hidden="true">
            <span />
            <span />
            <i />
          </div>
          <div>
            <p className="section-label">2925 Root Ave · Carmichael, CA</p>
            <h2>Come visit us in Carmichael.</h2>
            <p>
              We&apos;re building a warm, thoughtfully prepared setting for
              local families seeking flexible, extended-day care.
            </p>
            <a
              className="button button-primary"
              href="https://www.google.com/maps/search/?api=1&query=2925+Root+Ave%2C+Carmichael%2C+CA"
              target="_blank"
              rel="noreferrer"
            >
              Open directions <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
