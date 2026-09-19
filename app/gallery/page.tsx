import type { Metadata } from "next";
import { SiteFooter } from "../site-chrome";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See real classroom moments, activities, educators, and children at Montessori Playschool.",
};

const galleryGroups = [
  {
    id: "teachers-and-children",
    eyebrow: "Teachers & children",
    title: "Caring relationships in the classroom.",
    images: [
      {
        src: "/images/photos/selected/home-hero.webp",
        alt: "An educator engaging with two young children at their level in a bright classroom",
        caption: "Meeting children where they are",
        className: "photo-card photo-card-wide",
      },
      {
        src: "/images/photos/selected/teacher-art.webp",
        alt: "An educator and child smiling together during an art activity",
        caption: "Caring guidance",
        className: "photo-card photo-card-tall",
      },
      {
        src: "/images/photos/selected/teacher-group.webp",
        alt: "An educator leading a group of children in a classroom activity",
        caption: "Learning together",
        className: "photo-card photo-card-wide",
      },
      {
        src: "/images/photos/selected/teacher-sensory.webp",
        alt: "An educator guiding children through a colorful hands-on sensory activity",
        caption: "Exploring side by side",
        className: "photo-card",
      },
    ],
  },
  {
    id: "learning-and-activities",
    eyebrow: "Learning & activities",
    title: "Children absorbed in meaningful activity.",
    images: [
      {
        src: "/images/photos/selected/child-playdough.webp",
        alt: "A smiling young child enjoying a hands-on table activity",
        caption: "Hands-on discovery",
        className: "photo-card",
      },
      {
        src: "/images/photos/selected/airplanes.webp",
        alt: "Children proudly holding red model airplanes during a classroom activity",
        caption: "Creative projects",
        className: "photo-card photo-card-wide",
      },
      {
        src: "/images/photos/selected/group-circle.webp",
        alt: "Children gathered in a circle for a lively group activity",
        caption: "Learning as a group",
        className: "photo-card photo-card-tall",
      },
      {
        src: "/images/photos/selected/child-classroom.webp",
        alt: "A child smiling during a classroom activity",
        caption: "Joy in the everyday",
        className: "photo-card",
      },
    ],
  },
  {
    id: "community-and-school-age",
    eyebrow: "Community & school-age",
    title: "A welcoming place to grow together.",
    images: [
      {
        src: "/images/photos/selected/community.webp",
        alt: "Two children and a caring adult smiling together",
        caption: "A warm community",
        className: "photo-card photo-card-wide",
      },
      {
        src: "/images/photos/selected/school-age.webp",
        alt: "Two school-age children smiling together during a classroom activity",
        caption: "Growing together",
        className: "photo-card",
      },
    ],
  },
];

export default function GalleryPage() {
  return (
    <>
      <main className="gallery-page">
        <section className="gallery-heading content-section">
          <p className="section-label">Gallery</p>
          <h1>
            Moments of focus,
            <br />
            <em>joy, and belonging.</em>
          </h1>
          <nav className="gallery-jump-links" aria-label="Gallery categories">
            {galleryGroups.map((group) => (
              <a href={`#${group.id}`} key={group.id}>{group.eyebrow}</a>
            ))}
          </nav>
        </section>

        <div className="photo-gallery-groups">
          {galleryGroups.map((group) => (
            <section className="photo-gallery-group" id={group.id} key={group.id}>
              <div className="photo-gallery-heading content-section">
                <div>
                  <p className="section-label">{group.eyebrow}</p>
                  <h2>{group.title}</h2>
                </div>
              </div>
              <div className="photo-gallery-grid">
                {group.images.map((image) => (
                  <figure className={image.className} key={image.src}>
                    <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                    <figcaption>{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="simple-cta">
          <p className="section-label">Picture your child here</p>
          <h2>Schedule a tour.</h2>
          <a className="button button-light" href="/enrollment">
            Explore enrollment <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
