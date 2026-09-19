import type { Metadata } from "next";
import { SiteFooter } from "../site-chrome";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See real classroom moments, activities, educators, and children at Montessori Playschool.",
};

const galleryImages = [
  {
    src: "/images/photos/selected/home-hero.webp",
    alt: "An educator engaging with two young children at their level in a bright classroom",
    className: "photo-card photo-card-wide",
    position: "66% 48%",
  },
  {
    src: "/images/photos/selected/teacher-art.webp",
    alt: "An educator and child smiling together during an art activity",
    className: "photo-card photo-card-tall",
    position: "50% 30%",
  },
  {
    src: "/images/photos/selected/child-playdough.webp",
    alt: "A smiling young child enjoying a hands-on table activity",
    className: "photo-card",
    position: "42% 43%",
  },
  {
    src: "/images/photos/selected/airplanes.webp",
    alt: "Children proudly holding red model airplanes during a classroom activity",
    className: "photo-card photo-card-wide",
    position: "center 48%",
  },
  {
    src: "/images/photos/selected/teacher-group.webp",
    alt: "An educator leading a group of children in a classroom activity",
    className: "photo-card photo-card-wide",
    position: "50% 43%",
  },
  {
    src: "/images/photos/selected/teacher-sensory.webp",
    alt: "An educator guiding children through a colorful hands-on sensory activity",
    className: "photo-card",
    position: "50% 38%",
  },
  {
    src: "/images/photos/selected/group-circle.webp",
    alt: "Children gathered in a circle for a lively group activity",
    className: "photo-card photo-card-tall",
    position: "50% 44%",
  },
  {
    src: "/images/photos/selected/child-classroom.webp",
    alt: "A child smiling during a classroom activity",
    className: "photo-card",
    position: "50% 42%",
  },
  {
    src: "/images/photos/selected/community.webp",
    alt: "Two children and a caring adult smiling together",
    className: "photo-card photo-card-wide",
    position: "50% 40%",
  },
  {
    src: "/images/photos/selected/school-age.webp",
    alt: "Two school-age children smiling together during a classroom activity",
    className: "photo-card",
    position: "center 42%",
  },
];

export default function GalleryPage() {
  return (
    <>
      <main className="gallery-page">
        <section className="gallery-heading content-section">
          <h1>Gallery</h1>
        </section>

        <section className="photo-gallery-grid photo-gallery-grid-simple" aria-label="Montessori Playschool photo gallery">
          {galleryImages.map((image) => (
            <figure className={image.className} key={image.src}>
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: image.position }}
              />
            </figure>
          ))}
        </section>

        <section className="simple-cta">
          <h2>Schedule a tour.</h2>
          <a className="button button-light" href="/contact#tour">
            Schedule a Tour <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
