# Montessori Playschool Website

Production website for Montessori Playschool in Carmichael, California.

## Public pages

- Home
- About Us
- Programs
- Gallery
- Meals
- Tuition & Assistance
- Location
- Enrollment
- Contact
- Privacy

## Current program information

- Infant Program: birth–23 months
- Preschool Program: 24 months through entry into kindergarten
- School-Age Program: kindergarten through 9th grade
- Hours: Monday–Saturday, 7:00 AM–10:00 PM
- Location: 2925 Root Ave, Carmichael, CA 95608

## Photography

The site uses a verified set of classroom photos stored in
`photo-source/photo-assets-final.tgz`. Before development and production
builds, `npm run photos:prepare` validates the archive checksum and
materializes the selected images under `public/images/photos/selected/`.

## Inquiry delivery

Enrollment inquiries are posted to the Cloudflare Worker endpoint at
`/api/inquiry`. The Worker forwards the inquiry to the configured Google Apps
Script email webhook. SMS notification is optional and is used only when the
Twilio environment variables are configured.

## Development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Validation:

```bash
npm run lint
npm test
```

The application uses Next-compatible routing through Vinext and the Cloudflare
Vite plugin. Pushes and pull requests to `main` run the validation workflow.
