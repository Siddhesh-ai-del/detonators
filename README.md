# The Detonators

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-0F172A?style=for-the-badge&logo=apache&logoColor=white&labelColor=0F172A&color=0F172A)](LICENSE)
[![Status: Pre-release](https://img.shields.io/badge/Status-Pre--release-0F172A?style=for-the-badge&logo=rocket&logoColor=white&labelColor=0F172A&color=0F172A)](#project-status)
[![Platform: Next.js](https://img.shields.io/badge/Platform-Next.js-0F172A?style=for-the-badge&logo=nextdotjs&logoColor=white&labelColor=0F172A&color=0F172A)](#architecture)
[![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript-0F172A?style=for-the-badge&logo=typescript&logoColor=white&labelColor=0F172A&color=0F172A)](#repository-layout)

**A neo-brutalist team portfolio and timeline for The Detonators.**

## Overview

The Detonators is a portfolio website that documents the team's progress through
events, hackathons, and posts on a unified timeline. It supports member
authentication, allowing contributors to publish new entries, while visitors
can browse the timeline.

| Principle | Description |
|---|---|
| Honesty over hype | Features are labeled by status; nothing is claimed before it ships. |
| Neo-brutalist design | Thick borders, hard shadows, high-contrast blocks, minimal radius. |
| Content-first | Entries are authored as Markdown/MDX with structured frontmatter. |
| Member authoring | Authenticated members can publish; visitors read-only. |

## Why The Detonators

Teams often lose track of their own progress. Events, hackathons, and posts
end up scattered across chats and documents. The Detonators centralizes this
history into a single, readable timeline that is easy to share.

## Planned capabilities

> None of these are shipped yet beyond the current implementation.

- Search and filtering across the timeline
- RSS feed for posts
- Image uploads for entries
- Admin-only publishing controls
- Analytics and view counts

## Project status

Pre-release. The site runs locally and is under active development.

### Roadmap

| Phase | Scope | Status |
|---|---|---|
| 1 | Core site, timeline, detail pages | Shipped |
| 2 | Member authentication and authoring | Shipped |
| 3 | Liquid-glass navigation | Shipped |
| 4 | Search, RSS, image uploads | Planned |
| 5 | Deployment and production hardening | Planned |

## Installation

```bash
git clone https://github.com/Siddhesh-ai-del/detonators.git
cd detonators
npm install
npm run dev
```

Open http://localhost:3000.

## Architecture

The site is built with Next.js (App Router), TypeScript, and Tailwind CSS.
Content is stored as Markdown files with frontmatter for static entries, and
in SQLite for member-authored entries. Authentication uses Better Auth with
email and password.

## Repository layout

```
detonators/
├── content/          # Static entries (events, hackathons, posts)
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js routes and API handlers
│   ├── components/   # UI components
│   └── lib/          # Content, auth, database helpers
├── data/             # SQLite database (gitignored)
└── ...
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md).

## Support

See [SUPPORT.md](SUPPORT.md).

## License

[Apache License 2.0](LICENSE).