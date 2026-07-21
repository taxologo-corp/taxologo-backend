# Taxologo backend guidance

This repository contains the Taxologo NestJS modular monolith.

## Stack and boundaries

- Use TypeScript on the current Node.js LTS release.
- Use NestJS with the Fastify adapter. Do not introduce Express-only middleware.
- Keep the application a modular monolith. Add infrastructure only for a present requirement.
- Keep all secrets and local configuration in `../taxologo-cicd/.env`; never add a backend `.env` file.
- Store monetary amounts as integer centavos. Use `decimal.js` for rate calculations and never binary floating point for money.
- Put tax calculations only in the isolated tax service and cover them with CPA-verified golden files.
- Treat tenant and `business_scope` isolation as mandatory. Centralized application scoping is primary, with RLS and isolation tests as safety nets.
- Require human approval before financial posting or consequential external actions.

## Local validation

Run these checks before handing off a change:

```sh
npm run lint
npm test -- --runInBand
npm run test:e2e -- --runInBand
npm run build
```

Keep this file and `README.md` aligned with the implementation. Follow the shared principles in `~/.codex/taxologo/ENGINEERING_PRINCIPLES.md`.
