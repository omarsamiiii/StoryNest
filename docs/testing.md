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
