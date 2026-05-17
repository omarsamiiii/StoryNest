# StoryNest

StoryNest is a parent-focused SaaS MVP for creating personalized bedtime stories, optional coloring pages, and print-friendly story pages. It is built to be safe-by-design for parents: no public child profiles, no child chat, and no sensitive child data collection.

## Features

- Local mock sign up, login, logout, and protected dashboard.
- Child profiles with nickname, age range, interests, tone, and bedtime-safe defaults.
- Story generation through an `AIProvider` interface with a deterministic mock provider.
- Story library with search, filters, sorting, and favorites.
- Printable story view and mock black-and-white coloring page generation.
- Pricing, plan limits, usage tracking, and mock billing upgrades.
- PostgreSQL-compatible schema for future Supabase or Neon persistence.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local shadcn/ui-style components
- Zod validation
- Vitest and React Testing Library
- Mock Supabase-style auth/storage and Stripe-style billing seams

## Local Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

Copy `.env.example` to `.env.local` for local configuration. The default MVP works with mock providers and does not require OpenAI, Stripe, Supabase, or Sentry credentials.

## Useful Commands

```bash
npm test
npm run test:watch
npm run lint
npm run typecheck
npm run format:check
```

## Project Structure

- `src/app` - App Router pages and route handlers.
- `src/components` - UI, marketing, dashboard, child, story, and billing components.
- `src/lib` - Provider interfaces, services, repositories, validation helpers, and local data store.
- `src/types` - Shared domain types.
- `tests` - Unit, integration, component, and fixture tests.
- `db` - PostgreSQL schema and seed data.
- `docs` - Product, architecture, privacy, testing, deployment, and roadmap notes.

## Roadmap

The MVP is intentionally self-contained. Production next steps are real auth, durable database repositories, real billing checkout, generated asset storage, monitoring, and PDF export.
