# Montessori Playschool Website

A warm, responsive multi-page website starter for Montessori Playschool in
Carmichael, California.

## Included pages

- Home
- Programs
- About / Our Approach
- Meals
- Gallery
- Enrollment
- Contact
- Privacy

## Current program information

- Infant and toddler care: planned capacity of 15
- Preschool and school-age care: planned capacity of 30
- Planned hours: Monday–Saturday, 7:00 AM–11:00 PM
- Location: Carmichael, California

Capacity and public-facing facility information are marked as pending until the
licensing and opening details are final.

## Before public launch

Update the following throughout `app/`:

1. Street address, phone number, and public email
2. License numbers and final capacity
3. Opening date, tuition, accepted subsidy programs, and enrollment availability
4. Final meal policies, menus, and allergy procedures
5. Real facility and classroom photography
6. Form delivery integration and privacy disclosures
7. Social links, map, analytics, and search-verification metadata

The generated classroom images are original concept images for this starter and
are labeled as such on the Gallery page.

## Development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Other useful checks:

```bash
npm run lint
npm run build
```

The site uses Next-compatible routing through Vinext and is configured for
Cloudflare-compatible deployment.
