# Testing

Tests live under `tests/` and cover domain logic, service integration, repositories, and key React components.

## Commands

```bash
npm test
npm run test:watch
npm run typecheck
npm run lint
```

The test suite uses mock providers by default, so it does not require network calls, payment keys, auth services, or database credentials.

## Coverage Focus

- Prompt building and bedtime-safe metadata.
- Plan limits and monthly usage enforcement.
- Repository behavior over the local development store.
- Mock auth, story generation, and coloring page generation.
- Reusable UI components that carry important empty, pricing, and usage states.
