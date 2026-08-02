import { school } from "../site-data";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" className="social-dot" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M14 8h3V4.2c-.7-.1-2-.2-3.5-.2C10 4 8 6.1 8 9.8V12H5v4h3v8h4v-8h3.4l.6-4H12V10c0-1.2.4-2 2-2Z" />
    </svg>
  );
}

export default function SocialLinks({ showNames = true }: { showNames?: boolean }) {
  return (
    <div className="social-links" aria-label="Montessori Playschool social media">
      <a
        href={school.instagramUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Follow ${school.instagramName} on Instagram`}
      >
        <InstagramIcon />
        {showNames && <span>{school.instagramName}</span>}
      </a>
      <a
        href={school.facebookUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${school.facebookName} on Facebook`}
      >
        <FacebookIcon />
        {showNames && <span>{school.facebookName}</span>}
      </a>
    </div>
  );
}

