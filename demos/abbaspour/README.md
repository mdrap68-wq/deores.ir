# آدرین — Adrin confectionery

A responsive Persian RTL brand landing page inspired by the supplied Abbaspour–Adrin design reference. Built with React, TypeScript, Vite, Tailwind CSS, and Lucide icons.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run lint
npm run build
```

The production site is generated in `dist/`. No environment variables or external API services are required.

## Features

- Custom confectionery campaign artwork, responsive sculpted hero, and locally hosted Persian variable font.
- Category navigation, instant Persian product search, product filtering, and product detail dialogs.
- Downloadable three-page Persian product overview in `public/adrin-catalog.pdf`.
- Brand history, international distribution map, brand family, and readable journal articles.
- Branch information, phone contact links, FAQ accordion, and validated representative inquiry form.
- Native accessible modal dialogs, keyboard dismissal, focus restoration, reduced-motion support, and mobile navigation.

## Representative applications

The inquiry form is intentionally local: it validates the applicant's information and generates a downloadable UTF-8 application document. It does **not** send or store personal details on a server. The interface explains how to coordinate delivery with the brand by phone.

## Content and assets

The requested brand's visual content, statistics, names, packaging, and journal subjects follow the supplied reference. Product and article data are maintained in `src/data.ts`. Optimized artwork, original brand excerpts, and other production images are in `public/images/`.
