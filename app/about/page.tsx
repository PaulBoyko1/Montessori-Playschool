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
      <main>
        <InnerHero
          eyebrow="About Montessori Playschool"
          title="Rooted in respect."
          accent="Made for childhood."
          description="A warm Carmichael learning community where children can move with purpose, think with curiosity, and belong wholeheartedly."
          image="/images/hero-classroom.png"
          imageAlt="An educator supporting children in a Montessori classroom"
        />

        <section className="story-section content-section">
          <div>
            <p className="section-label">Our approach</p>
            <h2>Care and learning designed around how children grow.</h2>
          </div>
          <div className="story-copy">
            <p className="lead">
              Montessori Playschool begins with a simple belief: children do
              their best learning when they feel safe, respected, and genuinely
              involved in their own growth.
            </p>
            <p>
              Our program brings Montessori-inspired environments
              together with joyful play, nourishing routines, creative
              expression, outdoor movement, and strong family partnership. The
              result is not a hurried childhood—it is a rich one.
            </p>
            <p>
              Our home at 2925 Root Ave reflects the same values: accessible
              materials, age-appropriate spaces, predictable routines, and room
              for movement, creativity, and practical work.
            </p>
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
            <p>
              A beautiful environment matters, but the relationships and habits
              within it matter even more.
            </p>
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
            src="/images/preschool-program.png"
            alt="Children deeply engaged in hands-on learning"
          />
          <div>
            <p className="section-label">The role of the educator</p>
            <h2>Observe closely. Guide gently. Trust deeply.</h2>
            <p>
              Montessori educators do more than deliver lessons. They prepare
              the environment, model respectful behavior, notice readiness,
              protect concentration, and connect each child with meaningful
              work.
            </p>
            <a className="inline-arrow" href="/programs">
              Explore our programs <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className="simple-cta">
          <p className="section-label">Come meet us</p>
          <h2>The best way to understand a classroom is to experience it.</h2>
          <a className="button button-light" href="/contact#tour">
            Schedule a Tour <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
