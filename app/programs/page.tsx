import type { Metadata } from "next";
import CurriculumAccordion from "../components/CurriculumAccordion";
import { programs } from "../site-data";
import { InnerHero, SiteFooter } from "../site-chrome";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore infant, preschool, school-age, Montessori curriculum, and enrichment programs from birth through 9th grade.",
};

const programDetails = [
  {
    ...programs[0],
    title: "Responsive care and safe exploration.",
    points: [
      "Responsive care and family communication",
      "Individual feeding, rest, and diapering rhythms",
      "Safe movement, sensory discovery, songs, and language",
      "A calm environment that supports trust and connection",
    ],
  },
  {
    ...programs[1],
    title: "Independence, learning, and school readiness.",
    points: [
      "Practical-life activities and child-sized routines",
      "Language, movement, music, and hands-on exploration",
      "Early literacy, math, science, culture, art, and creativity",
      "Guided play, problem-solving, cooperation, and school readiness",
    ],
  },
  {
    ...programs[2],
    title: "Homework, projects, movement, and enrichment.",
    points: [
      "Homework support and quiet work space",
      "Hands-on projects, games, and creative activities",
      "Movement, friendships, and age-appropriate enrichment",
      "A welcoming environment from kindergarten through 9th grade",
    ],
  },
];

const enrichment = [
  {
    title: "Modeling-Clay Classes",
    text: "Fine-motor skills, patience, and creativity through clay work.",
  },
  {
    title: "Art Classes",
    text: "Drawing, painting, collage, and mixed-media projects.",
  },
  {
    title: "Cooking Classes",
    text: "Measuring, sequencing, practical-life skills, and teamwork.",
  },
  {
    title: "Chess Classes",
    text: "Planning, pattern recognition, focus, and respectful competition.",
  },
  {
    title: "Dance Classes for Girls",
    text: "Rhythm, coordination, confidence, and movement.",
  },
  {
    title: "Gymnastics Classes for Girls",
    text: "Balance, flexibility, strength, coordination, and body awareness.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <main className="programs-page">
        <InnerHero
          eyebrow="Programs · Birth through 9th grade"
          title="A place for"
          accent="every stage."
          image="/images/photos/selected/teacher-group.webp"
          imageAlt="An educator leading a group of children in a classroom activity"
        />

        <section className="page-intro content-section">
          <p className="section-label">Three program groups</p>
          <div>
            <h2>Infant, Preschool, and School-Age.</h2>
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
              <h2>Practical life, language, math, art, movement, nature, and culture.</h2>
            </div>
            <CurriculumAccordion />
          </div>
        </section>

        <section className="enrichment-section content-section" id="enrichment">
          <div className="section-heading">
            <div>
              <p className="section-label">Enrichment classes</p>
              <h2>Clay, art, cooking, chess, dance, and gymnastics.</h2>
            </div>
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
<p className="section-note">Class schedules and any fees are confirmed with families.</p>
        </section>

        <section className="program-photo-band" aria-label="Classroom activity">
          <img
            src="/images/photos/selected/airplanes.webp"
            alt="Children proudly holding red model airplanes during a classroom activity"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="section-label">Learning through participation</p>
            <h2>Hands-on experiences make the day memorable.</h2>
          </div>
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
