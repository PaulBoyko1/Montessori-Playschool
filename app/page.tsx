import Link from "next/link";
import CurriculumAccordion from "./components/CurriculumAccordion";
import { programs, school } from "./site-data";
import { SiteFooter } from "./site-chrome";

const parentEssentials = [
  {
    href: "/meals",
    label: "Meals",
    title: "See the weekly menu",
    text: "Review breakfast, snacks, lunch, dietary notes, and the Saturday sample menu.",
  },
  {
    href: "/tuition",
    label: "Tuition & assistance",
    title: "Plan the cost of care",
    text: "See tuition references and learn about CalWORKs and Child Action assistance.",
  },
  {
    href: "/location",
    label: "Location",
    title: "Find us in Carmichael",
    text: `${school.address}. Open the map and get directions in one tap.`,
  },
];

export default function Home() {
  return (
    <>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="/images/hero-classroom.png"
            alt="Children working with Montessori materials in a warm classroom"
          />
          <div className="hero-wash" />
          <div className="hero-content">
            <h1 id="hero-title">
              A thoughtful place
              <br />
              <em>to grow.</em>
            </h1>
            <p className="hero-lede">
              Warm, age-appropriate care for infants, toddlers, preschoolers,
              and school-age children from 6 weeks through 13 years.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/contact#tour">
                Schedule a Tour <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="quick-facts" aria-label="School highlights">
          <div>
            <span className="fact-label">Ages</span>
            <strong>6 weeks–13 years</strong>
          </div>
          <div>
            <span className="fact-label">Schedule</span>
            <strong>{school.days}</strong>
          </div>
          <div>
            <span className="fact-label">Hours</span>
            <strong>{school.hours}</strong>
          </div>
          <div>
            <span className="fact-label">Location</span>
            <strong>Carmichael, CA</strong>
          </div>
        </section>

        <section className="home-programs content-section" aria-labelledby="program-heading">
          <div className="section-heading">
            <div>
              <p className="section-label">Programs</p>
              <h2 id="program-heading">Care that grows with your child.</h2>
            </div>
            <p>
              Four clear age groups make it easy to find the program that fits
              your family right now.
            </p>
          </div>
          <div className="home-program-grid">
            {programs.map((program, index) => (
              <Link
                className={`home-program-card program-color-${index + 1}`}
                href={`/programs#${program.slug}`}
                key={program.slug}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{program.age}</p>
                <h3>{program.name}</h3>
                <strong>View program <span aria-hidden="true">→</span></strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-curriculum">
          <div className="content-section curriculum-layout">
            <div>
              <p className="section-label">Montessori curriculum</p>
              <h2>Tap a learning area to explore.</h2>
              <p>
                Purposeful, hands-on experiences help children build practical
                skills, communication, early academics, creativity, and care
                for their world.
              </p>
              <Link className="inline-arrow" href="/programs#curriculum">
                See the full program approach <span aria-hidden="true">→</span>
              </Link>
            </div>
            <CurriculumAccordion compact />
          </div>
        </section>

        <section className="parent-priorities content-section" aria-labelledby="essentials-heading">
          <div className="section-kicker">
            <span>Parent essentials</span>
            <i aria-hidden="true" />
          </div>
          <h2 id="essentials-heading">The information families need most.</h2>
          <div className="parent-priority-grid">
            {parentEssentials.map((item) => (
              <Link href={item.href} key={item.href}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <strong>Learn more <span aria-hidden="true">→</span></strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="assistance-teaser">
          <div>
            <p className="section-label">Help with childcare costs</p>
            <h2>CalWORKs and Child Action are welcome.</h2>
            <p>
              Eligible families may use approved childcare assistance. We can
              help you understand what information the school needs from your
              program.
            </p>
          </div>
          <Link className="button button-light" href="/tuition#assistance">
            View assistance options <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className="quote-band home-quote">
          <blockquote>
            <p>“The child is both a hope and a promise for mankind.”</p>
            <cite>— Maria Montessori, <em>Education and Peace</em></cite>
          </blockquote>
        </section>

        <section className="contact-cta" id="contact">
          <div className="contact-cta-inner">
            <p className="section-label">Begin the conversation</p>
            <h2>
              Come see where your child
              <br />
              could <em>feel at home.</em>
            </h2>
            <p>
              Tell us your child&apos;s age, the schedule you need, and any
              questions you have. We&apos;ll help you plan the next step.
            </p>
            <div className="cta-actions">
              <Link className="button button-light" href="/contact#tour">
                Schedule a Tour <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
