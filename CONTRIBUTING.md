# Contributing to The Detonators

Thank you for your interest in contributing. This document describes how to
report bugs, propose features, and submit changes.

## Reporting bugs

Before opening a new issue, please search existing issues. When filing a bug
report, use the bug report template and include:

- A clear, descriptive title
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (browser, OS, Node version)
- Relevant logs or screenshots (redact secrets)

Never include credentials, tokens, or personal data in issue text.

## Proposing features

Use the feature request template. Describe the problem first, then the proposed
solution, and which project principle the change advances.

## Development standards

- Follow the existing code style and project conventions.
- Write tests for new behavior; aim for 80%+ coverage.
- Run the full test suite before submitting: `npm test`.
- Run type checks: `npm run typecheck` (if available) or `npx tsc --noEmit`.
- Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, etc.

## Pull requests

- Keep PRs focused and small.
- Link the related issue.
- Ensure CI (when available) passes.
- Complete the PR template checklist.

## Code of Conduct

This project follows the [Contributor Covenant 2.1](CODE_OF_CONDUCT.md). By
participating, you agree to uphold it.

## Contact

Questions about contributing? Open a discussion or email
hello@detonators.dev.