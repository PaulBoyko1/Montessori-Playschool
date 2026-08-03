import type { Metadata } from "next";
import { SiteFooter } from "../site-chrome";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See the warm, child-centered classroom environment of Montessori Playschool.",
};

const gallery = [
  {
    src: "/images/hero-classroom.png",
    alt: "A warm Montessori classroom with children working together",
    caption: "A calm, prepared environment",
    className: "gallery-wide",
  },
  {
    src: "/images/toddler-program.png",
    alt: "Toddlers practicing pouring with wooden materials",
    caption: "Practical life in action",
    className: "gallery-tall",
  },
  {
    src: "/images/preschool-program.png",
    alt: "Children collaborating on hands-on academic work",
    caption: "Learning in community",
    className: "gallery-square",
  },
  {
    src: "/images/hero-classroom.png",
    alt: "Children choosing hands-on work",
    caption: "Independence with guidance",
    className: "gallery-crop-left",
  },
  {
    src: "/images/preschool-program.png",
    alt: "An educator observing children at work",
    caption: "Attentive educators",
    className: "gallery-crop-right",
  },
  {
    src: "/images/toddler-program.png",
    alt: "A thoughtful classroom with child-sized materials",
    caption: "Everything within reach",
    className: "gallery-wide",
  },
];

export default function GalleryPage() {
  return (
    <>
      <main>
        <section className="gallery-heading content-section">
          <p className="section-label">Gallery</p>
          <h1>
            Moments of focus,
            <br />
            <em>joy, and belonging.</em>
          </h1>
          <p>
            These images introduce the warm, natural, and child-centered
            environment families can expect from Montessori Playschool. We
            will add real classroom moments as photography becomes available.
          </p>
        </section>

        <section className="gallery-grid" aria-label="Montessori Playschool gallery">
          {gallery.map((image, index) => (
            <figure className={image.className} key={`${image.caption}-${index}`}>
              <img src={image.src} alt={image.alt} />
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </section>

        <section className="simple-cta">
          <p className="section-label">Picture your child here</p>
          <h2>Let&apos;s start with a conversation.</h2>
          <a className="button button-light" href="/enrollment">
            Explore enrollment <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
