import type { Metadata } from "next";
import { InnerHero, SiteFooter } from "../site-chrome";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Montessori-inspired philosophy and family-centered values of Montessori Playschool.",
};

const principles = [
  ["Respect", "We speak and act with care, honoring each child as a capable person."],
  ["Independence", "Children are given useful work, real choices, and time to practice."],
  ["Observation", "Educators prepare the next invitation by watching what each child is ready for."],
  ["Community", "Grace, courtesy, cooperation, and contribution make the classroom feel like home."],
];

export default function AboutPage() {
  return (
    <>
      <main className="about-page">
        <InnerHero
          eyebrow="About Montessori Playschool"
          title="Rooted in respect."
          accent="Made for childhood."
          image="/images/photos/selected/teacher-art.webp"
          imageAlt="An educator and child smiling together during an art activity"
        />

        <section className="story-section content-section">
          <div>
            <p className="section-label">Our approach</p>
            <h2>Montessori-inspired care built around the child.</h2>
          </div>
          <div className="story-copy">
<p className="lead">Children learn best when they feel safe, respected, and involved.</p>
<p>Montessori-inspired learning, play, creative work, outdoor movement, and practical life are part of each day.</p>
          </div>
        </section>

        <section className="quote-band">
          <blockquote>
            <p>“The child is both a hope and a promise for mankind.”</p>
            <cite>— Maria Montessori, <em>Education and Peace</em></cite>
          </blockquote>
        </section>

        <section className="principles content-section">
          <div className="section-heading">
            <div>
              <p className="section-label">What guides us</p>
              <h2>Four principles, present in every room.</h2>
            </div>
          </div>
          <div className="principle-grid">
            {principles.map(([title, text], index) => (
              <article key={title}>
                <div className="principle-ring">
                  <span>{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="image-statement">
          <img
            src="/images/photos/selected/teacher-sensory.webp"
            alt="An educator guiding children through a colorful hands-on sensory activity"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="section-label">The role of the educator</p>
            <h2>Observe closely. Guide gently. Trust deeply.</h2>
<p>Educators prepare the environment, model respectful behavior, observe readiness, and guide children toward meaningful work.</p>
            <a className="inline-arrow" href="/programs">
              Explore our programs <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className="simple-cta">
          <p className="section-label">Come meet us</p>
          <h2>Come see the classroom.</h2>
          <a className="button button-light" href="/contact#tour">
            Schedule a Tour <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
