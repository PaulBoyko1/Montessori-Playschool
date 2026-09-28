"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SocialLinks from "./components/SocialLinks";
import { school } from "./site-data";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/meals", label: "Meals" },
  { href: "/tuition", label: "Tuition & Assistance" },
  { href: "/location", label: "Location" },
  { href: "/enrollment", label: "Enrollment" },
  { href: "/contact", label: "Contact" },
];

function rememberNavigationDirection(currentPath: string, targetPath: string) {
  const currentIndex = navigation.findIndex((item) => item.href === currentPath);
  const targetIndex = navigation.findIndex((item) => item.href === targetPath);

  if (currentIndex < 0 || targetIndex < 0 || currentIndex === targetIndex) {
    window.sessionStorage.removeItem("montessori-nav-direction");
    return;
  }

  window.sessionStorage.setItem(
    "montessori-nav-direction",
    JSON.stringify({
      direction: targetIndex > currentIndex ? "right" : "left",
      target: targetPath,
      createdAt: Date.now(),
    }),
  );
}

export function SiteHeader({ current }: { current?: string }) {
  const pathname = usePathname();
  const activePath = current ?? pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeBrandVisible, setHomeBrandVisible] = useState(false);
  const [homeScrolled, setHomeScrolled] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (pathname !== "/") return;

    const updateHomeScrollState = () => {
      setHomeScrolled(window.scrollY > 16);
    };

    const frame = window.requestAnimationFrame(updateHomeScrollState);
    window.addEventListener("scroll", updateHomeScrollState, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHomeScrollState);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const heroLogo = document.getElementById("home-hero-logo");
    if (!heroLogo) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHomeBrandVisible(!entry.isIntersecting),
      { threshold: 0.01 },
    );

    observer.observe(heroLogo);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className={[
        "site-header",
        pathname === "/" ? "home-site-header" : "",
        pathname === "/" && homeScrolled ? "is-home-scrolled" : "",
        pathname === "/" && menuOpen ? "is-menu-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Link
        className={`brand${pathname === "/" ? ` home-header-brand ${homeBrandVisible ? "is-visible" : "is-hidden"}` : ""}`}
        href="/"
        aria-label="Montessori Playschool home"
        onClick={() => rememberNavigationDirection(pathname, "/")}
      >
        <img
          className="brand-logo"
          src="/images/montessori-playschool-logo-horizontal.png"
          alt="Montessori Playschool"
        />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <ul>
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={activePath === item.href ? "page" : undefined}
                onClick={() => {
                  rememberNavigationDirection(pathname, item.href);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link
        className="header-cta"
        href="/contact#tour"
        onClick={() => rememberNavigationDirection(pathname, "/contact")}
      >
        Schedule a Tour
        <span aria-hidden="true">→</span>
      </Link>
      <div className="mobile-menu">
        <button
          className="mobile-menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="mobile-menu-icon" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
        <nav
          id="mobile-navigation"
          className={menuOpen ? "is-open" : ""}
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={activePath === item.href ? "page" : undefined}
              onClick={() => {
                rememberNavigationDirection(pathname, item.href);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="mobile-tour-link"
            href="/contact#tour"
            onClick={() => {
              rememberNavigationDirection(pathname, "/contact");
              setMenuOpen(false);
            }}
          >
            Schedule a Tour
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link className="footer-logo-link" href="/" aria-label="Montessori Playschool home">
          <img
            className="footer-logo"
            src="/images/montessori-playschool-brand.webp"
            alt="Montessori Playschool"
          />
        </Link>
        <p>A thoughtful place to learn, play, and grow.</p>
      </div>
      <div className="footer-column">
        <span>Visit</span>
        <a href={school.directionsUrl} target="_blank" rel="noreferrer">
          {school.streetAddress}
          <br />
          {school.locality}
        </a>
        <a
          className="footer-directions"
          href={school.directionsUrl}
          target="_blank"
          rel="noreferrer"
        >
          Get directions ↗
        </a>
      </div>
      <div className="footer-column">
        <span>Hours</span>
        <p>{school.days}</p>
        <p>{school.hours}</p>
      </div>
      <div className="footer-column">
        <span>Contact</span>
        <a href={school.phoneHref}>{school.phone}</a>
        <a href={school.emailHref}>{school.email}</a>
      </div>
      <div className="footer-column">
        <span>Explore</span>
        <Link href="/programs">Programs</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/meals">Meals</Link>
        <Link href="/tuition">Tuition &amp; assistance</Link>
        <Link href="/enrollment">Enrollment</Link>
        <Link href="/privacy">Privacy</Link>
      </div>
      <div className="footer-column footer-social">
        <span>Follow Us</span>
        <SocialLinks />
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
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <>
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
        </div>
        <div className="inner-hero-image">
          <img src={image} alt={imageAlt} />
        </div>
      </section>
      <SectionDivider className="hero-section-divider" />
    </>
  );
}

export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`section-divider ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
