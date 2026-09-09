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
        src: "/images/photos/teacher-child-hug.webp",
        alt: "A teacher sharing a warm hug with a child",
        caption: "Connection and trust",
        className: "photo-card photo-card-wide",
      },
      {
        src: "/images/photos/classroom-teacher-group.webp",
        alt: "A teacher leading a hands-on activity with a group of children",
        caption: "Learning together",
        className: "photo-card",
      },
      {
        src: "/images/photos/teacher-guided-art.webp",
        alt: "A teacher helping a child during an art activity",
        caption: "Guidance when it matters",
        className: "photo-card",
      },
    ],
  },
  {
    id: "learning-and-creativity",
    eyebrow: "Learning & creativity",
    title: "Children absorbed in meaningful activity.",
    description:
      "Art, sensory work, fine-motor practice, and collaborative projects give children room to concentrate and create.",
    images: [
      {
        src: "/images/photos/child-painting.webp",
        alt: "A child concentrating on a watercolor painting",
        caption: "Focused creative work",
        className: "photo-card photo-card-wide",
      },
      {
        src: "/images/photos/happy-child-classroom.webp",
        alt: "A smiling child enjoying a classroom activity",
        caption: "Joy in the everyday",
        className: "photo-card photo-card-tall",
      },
      {
        src: "/images/photos/teacher-child-art.webp",
        alt: "A teacher and child smiling together during an art activity",
        caption: "Creating side by side",
        className: "photo-card photo-card-tall",
      },
    ],
  },
  {
    id: "music-movement-play",
    eyebrow: "Music, movement & play",
    title: "Learning that gets children moving.",
    description:
      "Group activities invite children to sing, move, imagine, take turns, and enjoy being part of a community.",
    images: [
      {
        src: "/images/photos/airplane-group-activity.webp",
        alt: "Children holding model airplanes during a group activity",
        caption: "Imagination in motion",
        className: "photo-card photo-card-wide",
      },
      {
        src: "/images/photos/music-and-singing.webp",
        alt: "Children singing with a teacher during music time",
        caption: "Music together",
        className: "photo-card",
      },
      {
        src: "/images/photos/rhythm-sticks-activity.webp",
        alt: "Two children participating in a rhythm-stick activity",
        caption: "Rhythm and coordination",
        className: "photo-card",
      },
      {
        src: "/images/photos/children-movement-activity.webp",
        alt: "Children smiling and moving together during a group activity",
        caption: "Movement and friendship",
        className: "photo-card photo-card-wide",
      },
    ],
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
