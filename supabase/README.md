# Local Supabase database workflow

This directory is Taxologo's database source of truth. It is intentionally empty of
application tables until the first backend data slice is designed and approved.

## What belongs here

- `schemas/` contains the desired current database definition in declarative SQL. Edit
  these files for every schema change; do not make database-definition changes in
  Supabase Studio, the hosted SQL editor, or directly with `psql`.
- `migrations/` contains append-only SQL migrations generated from the declared schema.
  Do not hand-edit or create them except when a Supabase declarative-schema caveat
  requires a reviewed manual migration.
- `seed.sql` contains synthetic local and test data only. A newly initialized local database is
  seeded on `supabase start`; `supabase db reset --local` is the deterministic way to rerun it
  after migrations. It must never contain production, customer, receipt, or financial data.
- `config.toml` configures the local Supabase CLI stack. It contains no secrets.

The service uses a Prisma client for application data access when that client is added.
Prisma models and the generated client will be derived from this database definition;
do not introduce Prisma Migrate as a second migration system.

## Prerequisites

- Supabase CLI installed globally (`brew install supabase/tap/supabase`)
- Docker Desktop running, with its Docker daemon available to the CLI

The local stack uses Docker images and binds the default Supabase local ports (including
API `54321`, Postgres `54322`, and Studio `54323`). Stop any conflicting local services
before starting it. These commands are local only: they do not log in, link a cloud
project, or change a remote Supabase project.

## Clean-slate validation

From the sibling `taxologo-cicd` repository:

```sh
make supabase-start
make supabase-reset
make supabase-stop
```

`make supabase-reset` recreates the database from the committed migrations and then runs
the synthetic seed. The initial seed is deliberately a documented no-op because no
Taxologo application tables exist yet.

## Every schema change

1. Update or add a `.sql` file in `schemas/`. Files run in lexicographic order, so use
   numeric prefixes when ordering dependencies matters (for example,
   `0100_identity.sql` before `0200_accounting.sql`).
2. Generate a descriptive migration:

   ```sh
   supabase db diff -f add_receipt_source
   ```

3. Review the generated migration, especially drops, grants, functions, and RLS policies.
   Declarative diffs have known limitations; data changes and some policy/grant changes
   can require a deliberately written, reviewed migration.
4. Verify the full history with `make -C ../taxologo-cicd supabase-reset`.
5. Commit the declarative schema and its generated migration together.

Do not run `supabase login`, `supabase link`, `supabase db push`, or any command with
`--linked` as part of normal local work. A reviewed cloud migration is a separate,
human-approved operation.
