# Migration Notes

The MVP uses an in-memory store for local development and tests. Production persistence should keep the repository interfaces and replace their internals with PostgreSQL queries.

## Suggested Order

1. Apply `db/schema.sql` to Supabase or Neon.
2. Replace each repository with a SQL-backed implementation.
3. Move auth from cookie-stored mock IDs to provider-issued sessions.
4. Store generated assets in private object storage.
5. Add database-backed idempotency for billing and generation jobs.
