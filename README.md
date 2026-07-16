# Stravex Technologies

A full-stack corporate web application featuring a public-facing informational site and a secure administrative dashboard for content management.

## Overview

Stravex Technologies serves as a primary digital storefront and an internal tool for managing company content. Built as a Single Page Application (SPA), it provides visitors with a fast, responsive interface to explore products, team members, and news. Under the hood, it features a protected admin portal where authorized users can publish blog posts and manage contact submissions in real-time.

## Key Features

- **Public Portal:** Responsive informational pages for company details, product showcases, and news articles.
- **Custom Blog Platform:** Dynamic article rendering with an integrated editor for content creation.
- **Admin Dashboard:** Secure, role-based area restricted to authorized personnel for site management.
- **Lead Management:** Real-time contact form submission handling and review interface.

## Technology Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Radix UI (shadcn/ui), React Router, React Query
- **Backend & Database:** Firebase SDK, Firestore
- **Authentication:** Firebase Auth (Google Sign-In with email whitelisting)
- **Tooling & Deployment:** Vite, Firebase Hosting

## Getting Started

### Prerequisites
- Node.js (maintained versions supported)

### Local Development

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd Stravex_Technologies
   npm install
   ```

2. **Environment setup**
   Configure your local variables by duplicating the example file:
   ```bash
   cp env.example .env
   ```

3. **Run the application**
   ```bash
   npm run dev
   ```

## Project Structure

```text
├── public/              # Static assets (images, branding)
├── src/
│   ├── components/      # Reusable UI components and layout wrappers
│   ├── contexts/        # Application state (e.g., AuthContext)
│   ├── lib/             # Firebase configuration and utility functions
│   └── pages/           # Public and protected route components
└── vite.config.ts       # Build configuration
```
