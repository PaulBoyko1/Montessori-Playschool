# Montessori Playschool Website

Responsive multi-page website for Montessori Playschool in Carmichael, California.

## Included pages

- Home
- Programs
- About / Our Approach
- Meals
- Gallery
- Tuition & Assistance
- Location
- Enrollment
- Contact
- Privacy

## Current public program information

- Infant Program: birth through 24 months
- Preschool Program: age 2 through entry into kindergarten
- School-Age Program: kindergarten through 9th grade
- Hours: Monday–Saturday, 7:00 AM–10:00 PM
- Location: 2925 Root Ave, Carmichael, CA 95608

Program capacity, admission dates, final rates, and licensing details should be
confirmed before enrollment is finalized.

## Photography

The public-facing Home, About, Programs, Meals, and Gallery experiences use
selected real classroom photography stored under `public/images/photos/`.
Image placement includes responsive focal-point rules so faces and activities
remain visible across desktop, tablet, and mobile layouts.

## Development

Requires Node.js 22.13 or newer.

```bash
npm run install:ci
npm run dev
```

Validation commands:

```bash
npm run lint
npm test
```

Pull requests and pushes to `main` also run the repository's validation workflow.
The site uses Next-compatible routing through Vinext and is configured for
Cloudflare-compatible deployment.
