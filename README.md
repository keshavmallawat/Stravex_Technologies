# Stravex Technologies

React + Firebase version of the Stravex Technologies company website: a public marketing site with a protected admin area for publishing news and managing enquiries and job postings.

A server-rendered rebuild with a full CMS lives in [stravex-technologies](https://github.com/keshavmallawat/stravex-technologies).

## Features

- **Public site:** home, about, products, technologies, team, careers, contact and a news section with individual article pages.
- **Admin dashboard (`/admin`):** blog editor with rich text, media library and SEO panel, a contact-form inbox, and careers management. Access is limited to approved Google accounts.
- **SEO basics:** per-page meta tags, sitemap, robots file and a single-page-app fallback for deep links on static hosting.
- **Firestore security rules** (`firestore.rules`): public reads, admin-only writes, public create for contact submissions.

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 18, TypeScript, Tailwind CSS, shadcn/ui (Radix) |
| Routing and data | React Router, TanStack Query, React Hook Form with Zod |
| Backend services | Firebase Authentication (Google sign-in) and Cloud Firestore |
| Media | Cloudinary (unsigned uploads from the admin media library) |
| Editor | Tiptap |
| Tooling | Vite, ESLint, Prettier |
| Delivery | GitHub Actions to GitHub Pages; optional Docker and Nginx image |

## Getting started

Requirements: Node.js 20 or newer.

```bash
git clone https://github.com/keshavmallawat/Stravex_Technologies.git
cd Stravex_Technologies
npm ci
cp .env.example .env   # add your Cloudinary values
npm run dev
```

The dev server runs on port 8080.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build into `dist/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type check |
| `npm run format` | Format with Prettier |

### Configuration

Only the Cloudinary values are read from the environment (see `.env.example`). The Firebase web config in `src/lib/firebase.ts` is public by design and access is enforced by the Firestore rules and Firebase Auth.

## Deployment

Every push to `main` runs the `CI` workflow (lint, type check, build) and the `Deploy` workflow, which publishes `dist/` to GitHub Pages. The Cloudinary values are supplied to the build as repository variables:

- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

A multi-stage `Dockerfile` (Node build, Nginx runtime, config in `nginx.conf`) is included for container hosting.

## Project structure

```text
src/
  components/   shared UI, layout and admin components
  contexts/     auth context
  hooks/
  lib/          Firebase client, helpers
  pages/        public pages and admin/ screens
public/         static assets, sitemap, robots
firestore.rules, firestore.indexes.json   Firestore configuration
```
