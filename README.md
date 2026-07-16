# Stravex Technologies

Corporate website and content management application.

## Overview

Stravex Technologies is a Single Page Application (SPA) built to serve as the primary public-facing corporate website and an internal administrative platform. It provides a fast, responsive user experience for visitors to explore products, team members, and news. Authorized administrators can access a protected dashboard to manage blog content and view contact submissions.

## Features

- Public informational pages for company details, products, and news
- Dynamic blog platform with article management
- Protected administrative dashboard with role-based access
- Contact form submission handling and review interface
- Responsive design tailored for all device sizes

## Technology Stack

**Frontend**
- React
- TypeScript
- Tailwind CSS
- Radix UI (shadcn/ui)
- React Router
- React Query

**Backend / Services**
- Firebase SDK

**Database**
- Firebase Firestore

**Authentication**
- Firebase Auth (Google Sign-In)

**Deployment**
- Firebase Hosting

**Developer Tooling**
- Vite
- ESLint
- Prettier

## Screenshots

<!-- TODO: Add screenshots of the public website and admin dashboard here -->

## Getting Started

### Clone

```bash
git clone <repository-url>
cd Stravex_Technologies
```

### Install dependencies

```bash
npm install
```

### Environment setup

Duplicate the example environment file and configure the necessary variables.

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

## Project Structure

```text
├── public/              # Static assets (images, icons)
├── src/                 # Application source code
│   ├── components/      # Reusable UI and layout components
│   ├── contexts/        # React contexts (e.g., Auth)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configurations
│   ├── pages/           # Route-level components
│   └── main.tsx         # Application entry point
├── package.json         # Project metadata and dependencies
└── vite.config.ts       # Vite configuration
```

## Contributing

1. Create a new feature branch.
2. Ensure code passes linting and formatting checks.
3. Submit a pull request for review.

## License

License not specified.
