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
    description:
      "Attentive educators join children at their level—guiding, encouraging, and sharing in the work of the day.",
    images: [
      {
        src: "/images/photos/selected/home-hero.webp",
        alt: "An educator engaging with two young children at their level in a bright classroom",
        caption: "Meeting children where they are",
        className: "photo-card photo-card-wide",
      },
      {
        src: "/images/photos/selected/about-hero.webp",
        alt: "An educator and child smiling together during a classroom activity",
        caption: "Caring guidance",
        className: "photo-card",
      },
      {
        src: "/images/photos/selected/programs-hero.webp",
        alt: "An educator reading with a group of attentive children",
        caption: "Learning together",
        className: "photo-card",
      },
    ],
  },
  {
    id: "learning-and-community",
    eyebrow: "Learning & community",
    title: "Real moments of focus, joy, and belonging.",
    description:
      "Children explore, create, participate, and build relationships across a school day designed around care and curiosity.",
    images: [
      {
        src: "/images/photos/selected/meals-hero.webp",
        alt: "A smiling young child enjoying a hands-on table activity",
        caption: "Hands-on discovery",
        className: "photo-card",
      },
      {
        src: "/images/photos/selected/tuition-hero.webp",
        alt: "Two children and a caring adult smiling together in the classroom",
        caption: "A welcoming community",
        className: "photo-card photo-card-wide",
      },
    ],
  },
]

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
          <p>
            Real classroom moments from our daycare community—children learning,
            creating, moving, and building relationships with the educators who
            care for them each day.
          </p>
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
                <p>{group.description}</p>
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
