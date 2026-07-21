# Taxologo Backend

Taxologo's API is a NestJS modular monolith running on Fastify. The initial slice exposes a health endpoint and contains no business, authentication, database, or tax functionality yet.

## Requirements

- Node.js 24 LTS
- npm
- Docker with Compose, when running through `taxologo-cicd`

## Configuration

Local configuration is centralized in the sibling `taxologo-cicd/.env` file. Do not create an `.env` file in this repository.

| Variable | Default | Purpose |
| --- | --- | --- |
| `HOST` | `127.0.0.1` | Bind address. Compose sets this to `0.0.0.0`. |
| `PORT` | `3000` | HTTP port. |

The loopback host default keeps a directly started development server local to the machine. Configuration for containers is injected by Compose.

## Run directly

```sh
npm ci
npm run start:dev
```

Check the service:

```sh
curl http://127.0.0.1:3000/health
```

The stable response is:

```json
{"status":"ok"}
```

## Run with the local stack

From `../taxologo-cicd`, use its Make targets to start, stop, inspect, or clean the backend and its dependencies. That repository owns the single local `.env` and the Compose file.

## Validation

```sh
npm run lint
npm test -- --runInBand
npm run test:e2e -- --runInBand
npm run build
```

## Container targets

The multi-stage `Dockerfile` provides:

- `development`: installs all dependencies and runs `npm run start:dev`.
- `production`: contains only compiled output and production dependencies and runs as the unprivileged `node` user.
