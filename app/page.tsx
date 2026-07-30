import { SiteFooter, SiteHeader } from "./site-chrome";

const features = [
  {
    number: "01",
    title: "Prepared environments",
    text: "Calm, beautiful classrooms place purposeful materials within reach so children can choose, practice, and master meaningful work.",
  },
  {
    number: "02",
    title: "Whole-child learning",
    text: "Practical life, language, early mathematics, culture, movement, art, and social-emotional growth are woven into each day.",
  },
  {
    number: "03",
    title: "Warm guidance",
    text: "Attentive educators observe closely, demonstrate with care, and give each child room to develop confidence and independence.",
  },
  {
    number: "04",
    title: "Family partnership",
    text: "Open communication helps families and teachers create a consistent, encouraging circle of support around every child.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader current="/" />

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="/images/hero-classroom.png"
            alt="Children working with Montessori materials in a warm classroom"
          />
          <div className="hero-wash" />
          <div className="hero-content">
            <p className="eyebrow">
              <span aria-hidden="true" />
              A Montessori-inspired community
            </p>
            <h1 id="hero-title">
              A thoughtful place
              <br />
              <em>to grow.</em>
            </h1>
            <p className="hero-lede">
              A warm, carefully prepared learning environment where children
              build independence, curiosity, and a genuine love of learning.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/enrollment">
                Explore enrollment
                <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="/programs">
                Discover our programs
              </a>
            </div>
          </div>
          <div className="hero-note">
            <span className="hero-note-icon" aria-hidden="true">✦</span>
            <p>
              <strong>Learning through meaningful work</strong>
              <span>Hands-on discovery, at each child&apos;s pace.</span>
            </p>
          </div>
        </section>

        <section className="quick-facts" aria-label="School highlights">
          <div>
            <span className="fact-label">Programs</span>
            <strong>Birth–Grade 9</strong>
          </div>
          <div>
            <span className="fact-label">Schedule</span>
            <strong>Monday–Saturday</strong>
          </div>
          <div>
            <span className="fact-label">Hours</span>
            <strong>7 AM–10 PM</strong>
          </div>
          <div>
            <span className="fact-label">Community</span>
            <strong>Carmichael, CA</strong>
          </div>
        </section>

        <section className="welcome content-section">
          <div className="section-kicker">
            <span>Welcome</span>
            <i aria-hidden="true" />
          </div>
          <div className="welcome-grid">
            <h2>
              Childhood is not a race.
              <br />
              It&apos;s a <em>beautiful beginning.</em>
            </h2>
            <div className="welcome-copy">
              <p>
                Montessori Playschool is being shaped as a caring community
                where children are known, trusted, and invited to participate
                fully in the life of the classroom.
              </p>
              <p>
                Our approach pairs Montessori principles with joyful play,
                nourishing routines, creative expression, and respectful
                relationships.
              </p>
              <a className="inline-arrow" href="/about">
                Read about our approach <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="learning-pills" aria-label="Learning areas">
            <span>Practical life</span>
            <span>Language</span>
            <span>Early math</span>
            <span>Art &amp; movement</span>
            <span>Nature &amp; culture</span>
          </div>
        </section>

        <section className="approach-section" id="approach">
          <div className="content-section">
            <div className="section-heading">
              <div>
                <p className="section-label">Why families choose us</p>
                <h2>Care with intention.</h2>
              </div>
              <p>
                Every part of the day is designed to help children feel secure,
                capable, and excited to discover what comes next.
              </p>
            </div>
            <div className="feature-grid">
              {features.map((feature) => (
                <article key={feature.number} className="feature-card">
                  <span className="feature-number">{feature.number}</span>
                  <div className="feature-symbol" aria-hidden="true">
                    {feature.number === "01" && "⌂"}
                    {feature.number === "02" && "◎"}
                    {feature.number === "03" && "◡"}
                    {feature.number === "04" && "∞"}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="programs content-section" id="programs">
          <div className="section-kicker">
            <span>Our Programs</span>
            <i aria-hidden="true" />
          </div>
          <div className="programs-intro">
            <h2>Room to become.</h2>
            <p>
              Consistent care and thoughtfully prepared experiences support
              every stage—from first discoveries to growing independence.
            </p>
          </div>
          <div className="program-grid">
            <article className="program-card program-card-image">
              <img
                src="/images/toddler-program.png"
                alt="Toddlers practicing pouring and sorting with wooden materials"
              />
              <div className="program-overlay">
                <p>Infant &amp; Toddler</p>
                <h3>Gentle care. Big discoveries.</h3>
                <a href="/enrollment" aria-label="Ask about infant and toddler care">
                  Ask about this program <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
            <article className="program-card program-card-text">
              <span className="program-age">Age 3–Grade 9</span>
              <div>
                <p className="section-label">Preschool &amp; School Age</p>
                <h3>Curiosity becomes capability.</h3>
                <p>
                  Rich classroom work, creative projects, movement, practical
                  skills, and age-appropriate academic support help children
                  grow with confidence.
                </p>
                <a className="inline-arrow" href="/enrollment">
                  Ask about this program <span aria-hidden="true">→</span>
                </a>
              </div>
              <span className="program-shape" aria-hidden="true" />
            </article>
          </div>
        </section>

        <section className="rhythm-section" id="meals">
          <div className="rhythm-image" id="gallery">
            <img
              src="/images/hero-classroom.png"
              alt="A calm Montessori classroom prepared for hands-on learning"
            />
          </div>
          <div className="rhythm-copy">
            <p className="section-label">A full, nourishing day</p>
            <h2>Care lives in the rhythm.</h2>
            <p>
              Children thrive when their day feels predictable yet spacious.
              Focused work, active play, shared meals, rest, and creative
              experiences each have a meaningful place.
            </p>
            <ul>
              <li><span>01</span> Hands-on morning work</li>
              <li><span>02</span> Outdoor movement and play</li>
              <li><span>03</span> Shared meals and snacks</li>
              <li><span>04</span> Rest, stories, and creative projects</li>
            </ul>
          </div>
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
              Tell us about your family, the program you&apos;re exploring, and
              the schedule you need. We&apos;ll help you plan the next step.
            </p>
            <a className="button button-light" href="/enrollment">
              Start an enrollment inquiry <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="contact-orbit" aria-hidden="true">
            <span>PLAY • DISCOVER • GROW • BELONG •</span>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
