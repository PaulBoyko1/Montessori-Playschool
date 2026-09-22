import Link from "next/link";
import CurriculumAccordion from "./components/CurriculumAccordion";
import { programs, school } from "./site-data";
import { SectionDivider, SiteFooter } from "./site-chrome";

const heroLogo = "data:image/webp;base64,UklGRthDAABXRUJQVlA4IMxDAABQ5QCdASoIAggCPhkMhUGhBC41MQQAYSxt346HkXrOuBE8L8b+bfir+8HliUJ5l/b/1H/uv+v/y/zU8J9OXX3uF/bP8v/heuxsfzCPDvx7+yf2T/C/5v+8f/X5OfsB7l/z//mvcA/hP8R/p/9X/tP9n/rv/y+ZT9mfc1/Zf95/tf0A+AH8j/mn91/t37dfv//1PyV/v3+w/qXuW/uX9y/3/+j/4HyAf1b+k/P/95f/n9g394fYC/mH9q/3nsz/5X+JvT+ld7f9H+vfrT/O7+T/+/83+N/av97/rv7d9mv9N+dn7af1X+k/df8f/hn9t/Yp/4d+1T3a/7D+t/9B/q/7D+Xf6r+b/4P3FfLH8V/FX8k/3H9i/zP4t+7v4r+Rf/X+H/o77L/av3X/+/wX+7fr7/O/9P+v/9N/pP7v+vf97/fL5ev+H/1/977nP8V/wfYD/qP9s/5X58d5X+8PsC/0//R/+H2gP+n/7v+P+////0+03+m/7X/2/6j/gf//6FP5p/bv+X+f//E+gD/w+1j/AP/t6gHqL8Y/yG+H3xr98/w35a/2/yOfSv3L8l/8D/6PW39RvW3mf/Hvtb+D/uf7f/3n9u/mX/n+D/yL/r/zI/x/yEfi38r/tX9m/bT/B/+3/ie5n9hO7b3b/e/971Bfaf6V/nP7v/ef+l/dPTr/u/8R6qfYr/P/mV/ovsB/nv9J/w/90/uv/O/vX///9vxgeCZ+I/6/+t9wL+P/07/b/4L8t/pv+p/+x/kP9L+5XuG/Pv8R/zv8r/ofkN/lP9W/1/98/zn/r/1////+f3k///3nfuP7JP7Q//YsBu0La2Fb7Ct9hW+wrfYVvsKwraDwRbLshvMiTYSsaWN3rEf12qbKSA3Y+1UPuixP/Q0QNvR42CUxVjQ71+ZyGpW+eib57hlZbRmd33AeqYwgeqYjOrcTmlFskX6alONkkSEuRbLZ6XX0UZJxE1O77gPVMRmd32/0kNSaEmeSyBR1YW5e+X8ZfVTZ5gazQp2u8BEVmxE5pRdXguRbRvsMdaOa77e+HR1aUem8kQMvHbv3d/cpTGJj0PHgeUCid2nU7vuA8ePYuE6Hcx3XST4i8YNeEnbgxEVXE0sTvKBR...";

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
                src={heroLogo}
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
