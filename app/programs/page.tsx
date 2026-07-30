import type { Metadata } from "next";
import { InnerHero, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore Montessori Playschool programs for infants, toddlers, preschoolers, and school-age children in Carmichael.",
};

const learningAreas = [
  ["Practical Life", "Purposeful routines that build coordination, focus, and independence."],
  ["Sensorial", "Hands-on materials that sharpen observation and organize experience."],
  ["Language", "Conversation, stories, sound work, and early reading and writing."],
  ["Mathematics", "Concrete materials that make number, quantity, and patterns visible."],
  ["Culture & Science", "Nature, geography, community, art, music, and open-ended discovery."],
  ["Movement", "Daily opportunities for coordination, outdoor activity, and joyful play."],
];

const preparedSpaces = [
  {
    name: "Infant Room",
    age: "Birth–17 months",
    text: "A calm room with approved cribs, a soft movement area, low books and materials, and dedicated feeding space.",
  },
  {
    name: "Toddler Room",
    age: "18–35 months",
    text: "Child-size tables, low shelves, books, practical routines, and rest materials support growing independence.",
  },
  {
    name: "Caterpillar Room",
    age: "Preschool",
    text: "A purposeful preschool classroom with child-size work tables, accessible materials, and a welcoming book collection.",
  },
  {
    name: "Butterfly Room",
    age: "Creative work",
    text: "Art and dramatic-play spaces invite imagination, self-expression, conversation, and collaborative play.",
  },
  {
    name: "Dragonfly Room",
    age: "School age",
    text: "Books, games, work tables, and a dedicated homework area support projects, study, and enrichment.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <SiteHeader current="/programs" />
      <main>
        <InnerHero
          eyebrow="Programs"
          title="A place for"
          accent="every stage."
          description="Responsive care, meaningful work, and a calm rhythm meet children where they are—and help them move forward with confidence."
          image="/images/preschool-program.png"
          imageAlt="Children collaborating with Montessori learning materials"
        />

        <section className="page-intro content-section">
          <p className="section-label">Growing together</p>
          <div>
            <h2>One community, thoughtfully prepared for different ages.</h2>
            <p>
              Children need different things at different stages. Our planned
              programs pair age-appropriate environments and expectations with
              the same consistent values: respect, independence, curiosity, and
              belonging.
            </p>
          </div>
        </section>

        <section className="program-detail content-section">
          <div className="program-detail-image">
            <img
              src="/images/toddler-program.png"
              alt="Toddlers concentrating on practical life activities"
            />
          </div>
          <article>
            <p className="section-label">Infant &amp; Toddler</p>
            <h2>Security first. Discovery follows.</h2>
            <p>
              Gentle, responsive care supports each child&apos;s need for trust
              and connection. The environment invites safe movement, language,
              sensory discovery, practical routines, and the first steps toward
              independence. Infant care serves birth through 17 months, with
              toddler care from 18 through 35 months.
            </p>
            <ul className="check-list">
              <li>Individualized care and family communication</li>
              <li>Individualized feeding, rest, and diapering routines</li>
              <li>Documented safe-sleep practices for infants</li>
              <li>Safe movement and sensory exploration</li>
              <li>Language-rich interactions and music</li>
            </ul>
            <a className="button button-primary" href="/enrollment">
              Ask about availability <span aria-hidden="true">→</span>
            </a>
          </article>
        </section>

        <section className="program-detail program-detail-reverse content-section">
          <article>
            <p className="section-label">Preschool &amp; School Age</p>
            <h2>Confidence grows through real capability.</h2>
            <p>
              Children work with increasingly complex materials, build early
              academic foundations, collaborate, create, and care for their
              community. School-age care adds homework support, projects, and
              enrichment within a welcoming mixed-age setting. Preschool serves
              children age 3 through kindergarten entry; school-age care serves
              kindergarten through ninth grade.
            </p>
            <ul className="check-list">
              <li>Early literacy, mathematics, and cultural studies</li>
              <li>Art, music, movement, and creative projects</li>
              <li>Social-emotional learning and community responsibility</li>
              <li>Homework support and school-age enrichment</li>
            </ul>
            <a className="button button-primary" href="/enrollment">
              Explore enrollment <span aria-hidden="true">→</span>
            </a>
          </article>
          <div className="program-detail-image">
            <img
              src="/images/preschool-program.png"
              alt="Preschool and school-age children working together"
            />
          </div>
        </section>

        <section className="capacity-strip">
          <div>
            <span>15</span>
            <p>Planned Infant &amp; Toddler capacity</p>
          </div>
          <div>
            <span>30</span>
            <p>Planned Preschool &amp; School-Age capacity</p>
          </div>
          <p className="capacity-note">
            Planned capacity is subject to final licensing approval and may
            change before opening.
          </p>
        </section>

        <section className="prepared-spaces content-section">
          <div className="section-heading">
            <div>
              <p className="section-label">Inside the facility</p>
              <h2>Spaces prepared for each stage.</h2>
            </div>
            <p>
              The facility equipment plan gives each age group appropriately
              scaled furniture, accessible materials, books, active play, and
              a place to settle into focused work.
            </p>
          </div>
          <div className="space-grid">
            {preparedSpaces.map((space, index) => (
              <article key={space.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{space.age}</p>
                <h3>{space.name}</h3>
                <div>{space.text}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="learning-section content-section">
          <div className="section-heading">
            <div>
              <p className="section-label">The prepared curriculum</p>
              <h2>Learning with head, heart, and hands.</h2>
            </div>
            <p>
              Development is interconnected. Each learning area strengthens the
              others and gives children another way to understand themselves
              and the world.
            </p>
          </div>
          <div className="learning-grid">
            {learningAreas.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="simple-cta">
          <p className="section-label">Find the right fit</p>
          <h2>Tell us about your child and your schedule.</h2>
          <a className="button button-light" href="/enrollment">
            Begin an inquiry <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
