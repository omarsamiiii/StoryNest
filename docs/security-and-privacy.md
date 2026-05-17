# Security and Privacy

StoryNest is parent-controlled. The MVP intentionally avoids child-facing account flows and public sharing.

## Data Minimization

Child profiles only store:

- Nickname
- Age range
- Interests
- Preferred tone
- Bedtime-safe default

No legal child names, birth dates, school data, addresses, images, or direct messages are required.

## Content Safety

Generated story prompts include bedtime-safe constraints when enabled. The mock safety layer blocks terms associated with graphic, frightening, or unsafe content and records safety metadata with each story.

## Production Notes

Use secure, HTTP-only cookies, provider-side auth sessions, encrypted secrets, audit logging for billing events, and object storage policies that keep generated assets private by default.
