import type { Metadata } from "next";
import CurriculumAccordion from "../components/CurriculumAccordion";
import { programs } from "../site-data";
import { InnerHero, SiteFooter, SiteHeader } from "../site-chrome";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore infant, toddler, preschool, school-age, Montessori curriculum, and enrichment programs for children ages 6 weeks to 13 years.",
};

const programDetails = [
  {
    ...programs[0],
    title: "Security first. Discovery follows.",
    points: [
      "Responsive care and family communication",
      "Individual feeding, rest, and diapering rhythms",
      "Safe movement, sensory discovery, songs, and language",
      "A calm environment that supports trust and connection",
    ],
  },
  {
    ...programs[1],
    title: "Independence begins with everyday practice.",
    points: [
      "Practical-life activities and child-sized routines",
      "Language, movement, music, and hands-on exploration",
      "Early recognition of colors, shapes, quantity, and sequence",
      "Guided play that supports confidence and social development",
    ],
  },
  {
    ...programs[2],
    title: "Curiosity becomes capability.",
    points: [
      "Montessori-inspired, play-based learning",
      "Early literacy, math, science, culture, art, and movement",
      "Problem-solving, teamwork, creativity, and concentration",
      "Preparation for the next stage of school",
    ],
  },
  {
    ...programs[3],
    title: "A supportive place after the school day.",
    points: [
      "Homework support and quiet work space",
      "Hands-on projects, games, and creative activities",
      "Movement, friendships, and age-appropriate enrichment",
      "A welcoming environment for children ages 6 through 13",
    ],
  },
];

const enrichment = [
  {
    title: "Modeling-Clay Classes",
    text: "Children shape, roll, join, and sculpt clay while developing hand strength, fine-motor control, patience, and imagination.",
  },
  {
    title: "Art Classes",
    text: "Open-ended drawing, painting, collage, and mixed-media experiences encourage observation, creativity, and personal expression.",
  },
  {
    title: "Cooking Classes",
    text: "Age-appropriate food preparation introduces measuring, sequencing, practical-life skills, cooperation, and confidence in the kitchen.",
  },
  {
    title: "Chess Classes",
    text: "Guided chess activities introduce planning, pattern recognition, patience, focus, and respectful competition.",
  },
  {
    title: "Dance Classes for Girls",
    text: "Music and guided movement support rhythm, coordination, confidence, expression, and joyful physical activity.",
  },
  {
    title: "Gymnastics Classes for Girls",
    text: "Developmentally appropriate movement activities encourage balance, flexibility, strength, coordination, and body awareness.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <SiteHeader current="/programs" />
      <main>
        <InnerHero
          eyebrow="Programs · Ages 6 weeks–13 years"
          title="A place for"
          accent="every stage."
          description="Responsive care, meaningful work, joyful play, and age-appropriate enrichment meet children where they are and help them grow with confidence."
          image="/images/preschool-program.png"
          imageAlt="Children collaborating with Montessori learning materials"
        />

        <section className="page-intro content-section">
          <p className="section-label">Four age groups</p>
          <div>
            <h2>Clear programs for every stage of early childhood and beyond.</h2>
            <p>
              Each program has its own developmental focus while sharing the
              same foundation: respect, independence, hands-on exploration,
              creativity, and a welcoming sense of community.
            </p>
          </div>
        </section>

        <section className="program-age-grid content-section" aria-label="Program age groups">
          {programDetails.map((program, index) => (
            <article id={program.slug} key={program.slug}>
              <div className="program-age-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{program.age}</p>
              </div>
              <h2>{program.name}</h2>
              <h3>{program.title}</h3>
              <p>{program.summary}</p>
              <ul className="check-list">
                {program.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <a className="button button-primary" href="/enrollment#inquiry">
                Ask about this program <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </section>

        <section className="curriculum-section" id="curriculum">
          <div className="content-section curriculum-layout">
            <div>
              <p className="section-label">The curriculum</p>
              <h2>Learning with head, heart, and hands.</h2>
              <p>
                Select a curriculum area to see the activities, developmental
                benefits, and skills children practice.
              </p>
            </div>
            <CurriculumAccordion />
          </div>
        </section>

        <section className="enrichment-section content-section" id="enrichment">
          <div className="section-heading">
            <div>
              <p className="section-label">Enrichment classes</p>
              <h2>More ways to discover and create.</h2>
            </div>
            <p>
              Offerings may vary by season, enrollment, age group, and
              instructor availability.
            </p>
          </div>
          <div className="enrichment-grid">
            {enrichment.map((item, index) => (
              <article key={item.title}>
                <header>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                </header>
                <div className="enrichment-image-placeholder" aria-hidden="true" />
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className="section-note">
            Class schedules and any related costs will be confirmed directly
            with families; no schedule or price is implied by this overview.
          </p>
        </section>

        <section className="simple-cta">
          <p className="section-label">Find the right fit</p>
          <h2>Tell us your child&apos;s age and the schedule you need.</h2>
          <a className="button button-light" href="/contact#tour">
            Schedule a Tour <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
