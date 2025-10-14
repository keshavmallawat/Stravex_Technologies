# Stravex Technologies

Advanced tactical detection and interception systems for mission-critical operations.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Font**: Inter

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── hooks/         # Custom React hooks
├── integrations/  # External service integrations
└── lib/          # Utility functions
```

## 🌐 Features

- **Responsive Design**: Works on all devices
- **Contact Form**: Integrated with Supabase database
- **Admin Dashboard**: Manage form submissions
- **Modern UI**: Professional defense industry design
- **Type Safety**: Full TypeScript implementation

## 🔧 Environment Setup

Create a `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

## 📄 License

© 2024 Stravex Technologies. All rights reserved.

---

## 📦 NPM Scripts

- **dev**: Start Vite dev server on port defined in `vite.config.ts` (currently 8080)
- **build**: Production build with Vite
- **build:dev**: Build with development mode flags
- **build:prod**: Explicit production build alias
- **preview**: Preview the production build locally
- **lint**: Run ESLint across the repo
- **lint:fix**: Auto-fix lint issues where possible
- **typecheck**: Run TypeScript type checking without emit
- **format**: Format code with Prettier
- **format:check**: Check formatting without writing

## 🔐 Environment Variables

All client-side variables must be prefixed with `VITE_`.
Use `env.example` as a template and copy to `.env` for local development.
Runtime schema validation is implemented in `src/lib/env.ts` using Zod.

## 🧱 Production Build

```bash
npm ci
npm run build:prod
npm run preview # optional: serve locally for QA
```

Production optimizations in `vite.config.ts` include:
- Disabled sourcemaps in production
- Vendor chunk splitting for faster loads
- Alias `@` to `src/`

## 🐳 Docker

Build and run the production image served by NGINX:

```bash
docker build -t stravex-web .
docker run -p 8080:80 stravex-web
# Open http://localhost:8080
```

## 🔁 Continuous Integration (GitHub Actions)

Workflow at `.github/workflows/ci.yml` runs on pushes and PRs to `main`:
- Install dependencies with cache
- Lint and typecheck
- Production build
- Upload `dist` as an artifact

## 🧹 Code Style

- Prettier configuration in `.prettierrc`
- Editor preferences in `.editorconfig`
- ESLint config in `eslint.config.js`

## 🕸️ PWA & Metadata

- PWA manifest at `public/manifest.webmanifest`
- Linked in `index.html` with `<link rel="manifest">`
- `theme-color` meta tag set for better mobile UX
