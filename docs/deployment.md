# Deployment

## Vercel

Deploy the Next.js app to Vercel. Configure environment variables from `.env.example` and enable preview deployments for pull requests.

## Database

Use Supabase Postgres or Neon with the schema in `db/schema.sql`. Replace local repositories with PostgreSQL-backed implementations behind the same repository interfaces.

## Storage

Use Supabase Storage or S3-compatible storage for generated coloring pages and future PDFs. Keep buckets private by default and issue signed URLs for parent sessions.

## Billing

Replace `MockBillingProvider` with Stripe checkout, customer portal, and webhook-driven subscription updates.

## Monitoring

Use Sentry for frontend and server errors. Add structured logs around story generation, billing events, and provider failures without logging sensitive prompt details.
