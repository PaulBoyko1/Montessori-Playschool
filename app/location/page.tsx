import type { Metadata } from "next";
import { school } from "../site-data";
import { SiteFooter } from "../site-chrome";

export const metadata: Metadata = {
  title: "Location",
  description:
    "Find Montessori Playschool at 2925 Root Ave, Carmichael, CA 95608, view the map, and open turn-by-turn directions.",
};

export default function LocationPage() {
  return (
    <>
      <main>
        <section className="location-hero">
          <div>
            <p className="section-label">Location</p>
            <h1>
              Easy to find.
              <br />
              <em>Easy to visit.</em>
            </h1>
            <a
              className="location-address"
              href={school.directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              {school.streetAddress}
              <span>{school.locality}</span>
            </a>
            <p>
              Open the exact destination in Google Maps for turn-by-turn
              directions. On mobile, the link will open the Google Maps app
              when it is available.
            </p>
            <a
              className="button button-primary button-large"
              href={school.directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Get Directions <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="location-facts">
            <div><span>Days</span><strong>{school.days}</strong></div>
            <div><span>Hours</span><strong>{school.hours}</strong></div>
            <div><span>Phone</span><a href={school.phoneHref}>{school.phone}</a></div>
          </div>
        </section>

        <section className="map-section content-section" aria-label="Map to Montessori Playschool">
          <iframe
            src={school.mapUrl}
            title="Google Map showing Montessori Playschool at 2925 Root Ave in Carmichael"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="map-help">
            <div>
              <p className="section-label">Plan your visit</p>
              <h2>Questions before you arrive?</h2>
              <p>
                Contact us to schedule a tour and confirm the best arrival time
                for your family.
              </p>
            </div>
            <a className="button button-primary" href="/contact#tour">
              Schedule a Tour <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
