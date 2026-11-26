# KHAS LIFESTYLE — Persian creative studio

A responsive Persian RTL studio landing page built with React, TypeScript, Vite, and Tailwind. The visual system combines warm white surfaces, orange accents, charcoal portfolio sections, custom studio imagery, and self-hosted Persian typography.

## Experience

- Responsive desktop/mobile product hero and reference-based achievements.
- Six project case studies, a searchable archive, and category filters.
- Service accordions with distinct product illustrations and contextual consultation requests.
- Keyboard-navigable project process, FAQ accordion, about and contact dialogs.
- Persian form validation, Persian/Arabic digit normalization, saved consultation requests, and database-backed receipts.
- Focus-managed, dismissible dialogs; reduced-motion support; keyboard navigation.

## Data and APIs

Content is fetched through Vercel functions using the existing shared Supabase client. No database credentials are embedded in the frontend.

| Table | Purpose |
| --- | --- |
| `ws_projects` | Project identity, category, description, solution, deliverables, artwork, and editorial ordering. |
| `ws_editorial` | Typed records for services, achievement metrics, process stages, and FAQs. |
| `ws_consultations` | Private consultation requests, a high-entropy receipt, creation time, and request status. |

- `GET /api/projects`: ordered public project archive.
- `GET /api/editorial`: ordered public editorial content.
- `POST /api/consultations`: validate and save a request.
- `GET /api/consultations?reference=…`: return only the matching receipt, timestamp, and status; never contact information.

Database policies allow public reads for published content. Consultation access uses a unique per-request receipt; there is no public customer directory. The runtime prefers an existing server credential and can work with the public credential under the scoped database policies.

## Verification

```sh
npm run build
npm run lint
node --env-file=.env tests/verify-api.mjs
python tests/browser-check.py
```

The browser suite serves built assets inside Playwright and invokes the real API handlers. It verifies search, filtering, case studies, service selections, process steps, FAQs, keyboard focus, Persian form validation, successful persistence, receipt retrieval, and mobile layouts. A successful end-to-end run prints the unique reference of its clearly labeled test submission for cleanup.

## Assets

All product renders are newly created visual interpretations, not captured client websites. Optimized WebP images and locally hosted font files are in `public/`. Font licenses are included alongside the assets. The user's original reference image is not published or embedded.

Consultation requests are stored for the studio to follow up; email and SMS delivery are not part of this application.
