import type { Metadata } from "next";
import SocialLinks from "../components/SocialLinks";
import EnrollmentForm from "../enrollment/EnrollmentForm";
import { school } from "../site-data";
import { SiteFooter } from "../site-chrome";

export const metadata: Metadata = {
  title: "Contact & Schedule a Tour",
  description:
    "Contact Montessori Playschool, schedule a tour, get directions, and follow school updates in Carmichael, California.",
};

export default function ContactPage() {
  return (
    <>
      <main>
        <section className="contact-heading" id="tour">
          <div>
            <p className="section-label">Contact &amp; tours</p>
            <h1>
              We&apos;d love to meet
              <br />
              <em>your family.</em>
            </h1>
          </div>
          <p>
            Ask about programs, schedules, tuition, assistance, enrollment, or
            a tour. Call, email, or prepare an inquiry below.
          </p>
        </section>

        <section className="contact-grid content-section">
          <div className="contact-cards">
            <a
              className="contact-card-link"
              href={school.directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>01</span>
              <p className="section-label">Location</p>
              <h2>{school.streetAddress}</h2>
              <p>{school.locality}</p>
              <strong>Get directions <span aria-hidden="true">↗</span></strong>
            </a>
            <article>
              <span>02</span>
              <p className="section-label">Hours</p>
              <h2>{school.days}</h2>
              <p>{school.hours}</p>
            </article>
            <a className="contact-card-link" href={school.phoneHref}>
              <span>03</span>
              <p className="section-label">Call</p>
              <h2>{school.phone}</h2>
              <strong>Call Montessori Playschool <span aria-hidden="true">→</span></strong>
            </a>
            <a className="contact-card-link" href={school.emailHref}>
              <span>04</span>
              <p className="section-label">Email</p>
              <h2>{school.email}</h2>
              <strong>Start an email <span aria-hidden="true">→</span></strong>
            </a>
          </div>
          <div className="contact-form-wrap">
            <p className="section-label">Tour or enrollment inquiry</p>
            <h2>Start the conversation.</h2>
            <EnrollmentForm compact />
          </div>
        </section>

        <section className="contact-map-section">
          <iframe
            src={school.mapUrl}
            title="Google Map showing Montessori Playschool at 2925 Root Ave in Carmichael"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div>
            <p className="section-label">Visit Montessori Playschool</p>
            <h2>{school.address}</h2>
            <a
              className="button button-primary button-large"
              href={school.directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Get Directions <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="follow-section content-section">
          <div>
            <p className="section-label">Follow us</p>
            <h2>See classroom activities, announcements, events, and updates.</h2>
          </div>
          <SocialLinks />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
