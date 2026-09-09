# Selected website photography

The six selected website photos are stored here as lossless Base64 source parts so the repository can preserve the supplied WebP bytes exactly. `scripts/materialize-photo-assets.mjs` reconstructs and SHA-256-verifies them into `public/images/photos/selected/` before development or production builds.

Do not edit individual `part-*.b64` files by hand. Replace the source photo and regenerate all of its parts together if a photograph is updated.

Selected uses:

- `home-hero` — educator interacting with two children; primary homepage hero
- `about-hero` — educator and child at an art table; About hero
- `programs-hero` — children holding model airplanes; Programs hero
- `meals-hero` — child working with play dough at a table; Meals hero
- `tuition-hero` — children and an adult smiling together; Tuition & Assistance hero
- `classroom-group` — educator working with a group of children; supporting classroom image

The four other supplied photos were intentionally not forced into prominent placements because the selected six provide the strongest and most varied website set.