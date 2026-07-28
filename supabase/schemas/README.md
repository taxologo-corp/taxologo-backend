# Declarative schema files

Add one or more `.sql` files here when the first Taxologo data model is introduced.
These files describe the intended current database state and are applied in lexicographic
order when generating a migration with `supabase db diff`.

Keep dependencies ordered with numeric prefixes. A table that owns a foreign key must
sort after the table it references. Every tenant-scoped table must include an RLS policy
and an accompanying cross-tenant isolation test in the backend.
