# Architecture

StoryNest uses Next.js App Router with server-rendered pages, server actions for form workflows, and route handlers for API seams.

## Layers

- Components render product surfaces and local UI primitives.
- Validation uses Zod schemas at form and API boundaries.
- Services orchestrate domain behavior such as story generation and usage checks.
- Repositories isolate data access behind local in-memory implementations.
- Providers abstract auth, billing, AI text generation, and image generation.

## Replacement Seams

- `AuthProvider` can be replaced with Supabase Auth or Clerk.
- `BillingProvider` can be replaced with Stripe checkout and webhooks.
- `AIProvider` can be replaced with OpenAI or another text model.
- `ImageProvider` can be replaced with an image generation service and object storage.
- Repositories can be backed by PostgreSQL using `db/schema.sql`.
