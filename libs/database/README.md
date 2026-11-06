# Database

Shared PostgreSQL access for the workspace, using Prisma ORM 7.

## Local PostgreSQL setup

1. Add the `DATABASE_URL` from the root `.env.example` to your existing root
   `.env`. Do not replace other application environment variables.
2. Start the local PostgreSQL container:

   ```sh
   npm run db:up
   ```

3. Generate Prisma Client and sync the current schema:

   ```sh
   npm run db:generate
   npm run db:push
   ```

The schema includes the Better Auth persistence models and the existing LMS
entities. Migrations live under `prisma/migrations`. When changing the schema,
create and apply a migration:

```sh
npm run db:migrate -- --name describe_your_change
```

The generated client is exported as `prisma` from `@sass-project/database`.
The local todo UI is shared and currently has no authentication.
Run `yarn db:seed` only after creating and verifying the account you intend to
bootstrap as superadmin and setting `BOOTSTRAP_SUPERADMIN_EMAIL`. The seed never
creates a user or accepts a role from a request.
`npm run db:down` stops and removes the container/network but keeps the named
volume and its data. Do not use `docker compose down -v` unless you intend to
delete the local database.
