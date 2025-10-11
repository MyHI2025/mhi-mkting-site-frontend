# My Health Integral - Frontend

Public-facing marketing website for the My Health Integral healthcare platform.

## Overview

This is the main marketing website showcasing:
- Landing pages for different user types (Patients, Providers, Partners)
- Content hub (Blog articles, videos)
- Career opportunities
- Contact forms
- About page with founder story
- Pricing information

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS + ShadCN/UI
- **Build**: Vite
- **State**: TanStack Query for server state
- **Forms**: React Hook Form + Zod validation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (`.env.local`):
```env
VITE_API_URL=http://localhost:5000
VITE_GA_MEASUREMENT_ID=your_ga_id
```

3. Start development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── layout/     # Header, Footer, etc.
│   ├── sections/   # Page sections
│   ├── cms/        # CMS components
│   └── ui/         # ShadCN components
├── modules/
│   └── marketing/  # Marketing pages
├── pages/          # Top-level pages
├── hooks/          # Custom React hooks
├── lib/            # Utilities & config
└── contexts/       # React contexts
```

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## Environment Variables

- `VITE_API_URL` - Backend API URL
- `VITE_GA_MEASUREMENT_ID` - Google Analytics ID (optional)

## Features

- Responsive design (mobile-first)
- Dark/light mode support
- SEO optimized
- Analytics tracking
- Cookie consent (GDPR compliant)
- Professional stock imagery
- Accessible components
