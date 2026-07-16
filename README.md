# Stravex Technologies

A corporate website and content management application.

## Overview

This repository contains the front-end application and backend configuration for the Stravex Technologies website. It is a Single Page Application (SPA) built using React and Vite, featuring public-facing informational pages and a protected administrative dashboard for managing content and contacts. The application relies on Firebase for authentication, database, and hosting.

## Features

- **Public Website:** Provides pages for Home, About, Products, Team, Technologies, News, Careers, and Contact.
- **Dynamic Blog:** Displays news articles fetched from the database with individual post views.
- **Admin Dashboard:** A protected area accessible only to authorized administrators.
- **Content Management:** Interface for administrators to create, edit, and manage blog posts.
- **Contact Management:** Interface for administrators to view and manage contact submissions.
- **Authentication:** Google Sign-In with email whitelisting for admin access.

## Technology Stack

**Frontend:** React, TypeScript, React Router, React Query
**Backend / Services:** Firebase SDK
**Database:** Firebase Firestore
**Authentication:** Firebase Auth (Google Provider)
**Styling:** Tailwind CSS, Radix UI (shadcn/ui), Lucide React
**Deployment:** Firebase Hosting
**Developer Tooling:** Vite, ESLint, Prettier, TypeScript Compiler (tsc)

## Project Structure

```
├── .firebase/           # Firebase hosting cache and configurations
├── dist/                # Production build output
├── public/              # Static assets (images, icons, manifests)
├── src/                 # Application source code
│   ├── assets/          # Application assets
│   ├── components/      # Reusable React components (UI, Admin, Layout)
│   ├── contexts/        # React contexts (e.g., AuthContext)
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # External service integrations
│   ├── lib/             # Utility functions and Firebase configuration
│   ├── pages/           # Route-level components (Public and Admin)
│   └── utils/           # Helper functions
├── .env                 # Environment variables (local)
├── env.example          # Template for environment variables
├── firebase.json        # Firebase configuration (hosting, emulators, etc.)
├── firestore.rules      # Firestore security rules
├── package.json         # Project metadata, dependencies, and scripts
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript compiler configuration
└── vite.config.ts       # Vite configuration
```

## Prerequisites

- Node.js (maintained versions supported)
- npm or another compatible package manager
- Firebase CLI (for deployment)

## Installation

### Clone

```bash
git clone <repository-url>
cd Stravex_Technologies
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Duplicate `env.example` to `.env` and fill in the required values:

```bash
cp env.example .env
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

For a local preview of the production build:

```bash
npm run build:prod
npm run preview
```

## Environment Variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production using Vite.
- `npm run build:dev`: Builds the application in development mode.
- `npm run build:prod`: Builds the application in production mode.
- `npm run lint`: Runs ESLint to identify code issues.
- `npm run lint:fix`: Runs ESLint and automatically fixes fixable issues.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors without emitting files.
- `npm run format`: Formats code using Prettier.
- `npm run format:check`: Checks if files are formatted according to Prettier rules.
- `npm run preview`: Locally previews the production build.
- `npm run migrate:supabase-to-firebase`: Executes the `migrate-to-firebase.js` script to migrate data.

## Architecture

The application follows a standard React Single Page Application architecture. Routing is handled client-side by `react-router-dom`. State and data fetching are managed primarily by `@tanstack/react-query` and React Context (e.g., `AuthContext`). The UI is composed of functional components using hooks, styled with Tailwind CSS and Radix UI primitives. The application communicates directly with Firebase services (Firestore and Auth) using the Firebase Client SDK.

## Routes

### Public Routes

- `/`: Home
- `/about`: About Us
- `/products`: Products
- `/team`: Team
- `/technologies`: Technologies
- `/contact`: Contact Us
- `/news`: News/Blog listing
- `/news/:id`: Individual Blog Post
- `/careers`: Careers
- `*`: Catch-all (Not Found)

### Protected Admin Routes

- `/admin`: Admin Dashboard (Index)
- `/admin/contacts`: Contact Submissions Manager
- `/admin/blogs`: Blog Manager
- `/admin/blogs/new`: Create New Blog Post
- `/admin/blogs/:id/edit`: Edit Blog Post

## API

The application does not expose a custom backend REST API. It interacts directly with Firebase services via the Firebase Client SDK.

## Database

The application uses Firebase Firestore as its primary database. It stores application data such as blog posts and contact submissions. Firestore security rules are defined in `firestore.rules`, and indexes are specified in `firestore.indexes.json`.

## Authentication

Authentication is implemented using Firebase Auth with the Google Sign-In provider. The application enforces role-based access control by restricting admin privileges to a hardcoded list of authorized email addresses. The authentication state is managed and provided throughout the application via a custom `AuthContext`.

## Deployment

Deployment is configured for Firebase Hosting. The `firebase.json` file dictates that the `dist` directory is served publicly. It also configures URL rewrites to direct all navigation to `index.html` to support client-side routing, and sets security headers (Cache-Control, X-Content-Type-Options, X-Frame-Options, X-XSS-Protection).

## Development

- **Linting:** Configured with ESLint and various plugins for React.
- **Formatting:** Code formatting is enforced by Prettier.
- **Type Checking:** TypeScript is used strictly (`typecheck` script).
- **Build Process:** Uses Vite for fast development server and optimized production builds.

## Contributing

1. Ensure the development environment is properly set up.
2. Create a new feature branch for your work.
3. Ensure code passes linting (`npm run lint:fix`) and formatting (`npm run format`) checks.
4. Verify TypeScript compilation (`npm run typecheck`).
5. Submit a pull request for review.

## License

License not specified.
