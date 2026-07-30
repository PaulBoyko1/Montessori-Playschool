import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "Our Approach" },
  { href: "/meals", label: "Meals" },
  { href: "/tuition", label: "Tuition" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ current }: { current?: string }) {
  return (
    <>
      <div className="announcement">
        <p>Enrollment inquiries now open</p>
        <span aria-hidden="true">•</span>
        <p>Monday–Saturday</p>
        <span aria-hidden="true">•</span>
        <p>7:00 AM–10:00 PM</p>
      </div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Montessori Playschool home">
          <span className="brand-mark" aria-hidden="true">
            <span>M</span>
          </span>
          <span className="brand-copy">
            <strong>Montessori Playschool</strong>
            <small>Carmichael, California</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={current === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/enrollment">
          Plan a visit
          <span aria-hidden="true">↗</span>
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                aria-current={current === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/enrollment">Enrollment</Link>
          </nav>
        </details>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark brand-mark-light" aria-hidden="true">
          <span>M</span>
        </span>
        <div>
          <strong>Montessori Playschool</strong>
          <p>A thoughtful place to grow.</p>
        </div>
      </div>
      <div className="footer-column">
        <span>Visit</span>
        <a
          href="https://www.google.com/maps/search/?api=1&query=2925+Root+Ave%2C+Carmichael%2C+CA"
          target="_blank"
          rel="noreferrer"
        >
          2925 Root Ave
          <br />
          Carmichael, CA
        </a>
        <a
          className="footer-directions"
          href="https://www.google.com/maps/search/?api=1&query=2925+Root+Ave%2C+Carmichael%2C+CA"
          target="_blank"
          rel="noreferrer"
        >
          Get directions ↗
        </a>
      </div>
      <div className="footer-column">
        <span>Hours</span>
        <p>Monday–Saturday</p>
        <p>7:00 AM–10:00 PM</p>
      </div>
      <div className="footer-column">
        <span>Contact</span>
        <a href="tel:+19164706898">(916) 470-6898</a>
        <a href="mailto:natalia@mn-corp.com">natalia@mn-corp.com</a>
      </div>
      <div className="footer-column">
        <span>Explore</span>
        <Link href="/">Home</Link>
        <Link href="/programs">Programs</Link>
        <Link href="/about">Our approach</Link>
        <Link href="/tuition">Tuition &amp; fees</Link>
        <Link href="/enrollment">Enrollment</Link>
        <Link href="/privacy">Privacy</Link>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Montessori Playschool. All rights reserved.</p>
        <p>Licensing details will be posted after approval.</p>
      </div>
    </footer>
  );
}

export function InnerHero({
  eyebrow,
  title,
  accent,
  description,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="inner-hero">
      <div className="inner-hero-copy">
        <p className="section-label">{eyebrow}</p>
        <h1>
          {title}
          {accent && (
            <>
              <br />
              <em>{accent}</em>
            </>
          )}
        </h1>
        <p>{description}</p>
      </div>
      <div className="inner-hero-image">
        <img src={image} alt={imageAlt} />
      </div>
    </section>
  );
}
