# Repository Submission Checklist

Use this when preparing StoryNest for Silver repository upload.

## Required

- Upload a zip that includes the `.git/` directory.
- Keep the repository private on GitHub, or do not publish it on GitHub.
- Include the root `Dockerfile`.
- Do not exclude `.git/` in `.dockerignore`.
- Confirm no real secrets are committed.
- Confirm the Dockerfile uses `COPY . .` for the source tree.

## Local Verification

```bash
npm run typecheck
npm test
npm run lint
npm run build
docker build -t storynest:repo-check .
```

## Notes

The Dockerfile is intentionally lockfile-driven with `npm ci`, uses a pinned Node base image, avoids `apt-get`, and copies only to `/app`, matching the repository image static-check rules.
