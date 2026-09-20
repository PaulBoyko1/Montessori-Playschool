import Link from "next/link";
import CurriculumAccordion from "./components/CurriculumAccordion";
import { programs, school } from "./site-data";
import { SectionDivider, SiteFooter } from "./site-chrome";

const parentEssentials = [
  {
    href: "/meals",
    label: "Meals",
    title: "See the weekly menu",
    text: "Breakfast, lunch, snack, dinner, and the Saturday menu.",
  },
  {
    href: "/tuition",
    label: "Tuition & assistance",
    title: "Plan the cost of care",
    text: "Tuition rates plus CalWORKs and Child Action.",
  },
  {
    href: "/location",
    label: "Location",
    title: "Find us in Carmichael",
    text: `${school.address}. Map and directions.`,
  },
];

const featuredMoments = [
  {
    src: "/images/photos/selected/airplanes.webp",
    alt: "Children proudly holding red model airplanes during a classroom activity",
    label: "Creative projects",
    className: "home-moment-large",
  },
  {
    src: "/images/photos/selected/teacher-art.webp",
    alt: "An educator and child smiling together during an art activity",
    label: "Caring guidance",
    className: "home-moment-small",
  },
  {
    src: "/images/photos/selected/school-age.webp",
    alt: "Two school-age children smiling together during a classroom activity",
    label: "Growing together",
    className: "home-moment-small",
  },
];

export default function Home() {
  return (
    <>
      <main id="top" className="home-page">
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="/images/photos/selected/group-circle.webp"
            alt="Children gathered together for a lively group learning activity"
            fetchPriority="high"
          />
          <div className="hero-wash" />
          <div className="hero-content">
            <h1 id="hero-title" className="hero-title-sr">Montessori Playschool</h1>
            <div className="hero-brand-lockup" aria-hidden="true">
              <img
                src="/images/montessori-playschool-logo.png"
                alt=""
              />
            </div>
            <div className="hero-actions">
              <a className="button button-call-now" href={school.phoneHref}>
                Call Now
              </a>
              <Link className="button button-primary" href="/contact#tour">
                Schedule a Tour <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="home-programs content-section" aria-labelledby="program-heading">
          <div className="section-heading">
            <div>
              <p className="section-label">Programs</p>
              <h2 id="program-heading">Care that grows with your child.</h2>
            </div>
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

        <SectionDivider />

        <section className="home-curriculum">
          <div className="content-section curriculum-layout">
            <div>
              <p className="section-label">Montessori curriculum</p>
              <h2>Hands-on Montessori learning.</h2>
              <Link className="inline-arrow" href="/programs#curriculum">
                See the full program approach <span aria-hidden="true">→</span>
              </Link>
            </div>
            <CurriculumAccordion compact />
          </div>
        </section>

        <section className="home-moments content-section" aria-labelledby="moments-heading">
          <div className="section-heading home-moments-heading">
            <div>
              <p className="section-label">Inside our classrooms</p>
              <h2 id="moments-heading">Real moments from the school day.</h2>
            </div>
            <div>
              <Link className="inline-arrow" href="/gallery">
                Visit the full gallery <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="home-moment-grid">
            {featuredMoments.map((moment) => (
              <figure className={moment.className} key={moment.src}>
                <img src={moment.src} alt={moment.alt} loading="lazy" decoding="async" />
                <figcaption>{moment.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="parent-priorities content-section" aria-labelledby="essentials-heading">
          <div className="section-kicker">
            <span>Parent essentials</span>
            <i aria-hidden="true" />
          </div>
          <h2 id="essentials-heading">What families need most.</h2>
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
<p>CalWORKs and Child Action accepted for eligible families.</p>
          </div>
          <Link className="button button-light" href="/tuition#assistance">
            View assistance options <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className="quote-band home-quote">
          <blockquote>
            <p>“The child is both a hope and a promise for mankind.”</p>
            <cite>— Maria Montessori, Education and Peace</cite>
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
<p>Tell us your child&apos;s age and the schedule you need.</p>
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
