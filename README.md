# SassProject

A small Nx monorepo containing a Next.js web app, an Expo mobile app, an
Express/Apollo GraphQL API, and a PostgreSQL database accessed through Prisma.
The MedPrep web app uses Better Auth and the GraphQL API for its learning
features; the mobile app currently uses the shared todo API.

> This workspace is configured for local development. Do not expose
> development database credentials or the local API directly to the public
> internet.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Repository structure](#repository-structure)
- [Requirements](#requirements)
- [Clone and install](#clone-and-install)
- [Configure the environment](#configure-the-environment)
- [Start the database and apply migrations](#start-the-database-and-apply-migrations)
- [Run the applications](#run-the-applications)
- [Expo device and emulator setup](#expo-device-and-emulator-setup)
- [GraphQL API](#graphql-api)
- [Common commands](#common-commands)
- [Database development](#database-development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Features

- Create, list, complete, and delete todos.
- Practice and review medical entrance questions.
- Save bookmarks, attempts, and learning progress in PostgreSQL.
- Sign in with email/password or optional Google OAuth using Better Auth.
- Use the GraphQL API from the web app and mobile todo app.
- Share GraphQL schema and operation strings through the contracts library.
- Run projects and tasks through Nx.
- Build and run the local database with Docker Compose.

## Technology

- **Workspace:** Nx with Yarn workspaces
- **Web:** Next.js, React, TypeScript, Better Auth
- **Mobile:** Expo, React Native, TypeScript
- **API:** Express 5, Apollo Server, GraphQL
- **Database:** PostgreSQL 16, Prisma ORM 7
- **End-to-end testing:** Cypress and Nx/Jest project targets

## Repository structure

```text
.
├── apps/
│   ├── backend/             # Express server, Apollo GraphQL API and resolvers
│   ├── backend-e2e/         # Backend end-to-end test project
│   ├── frontend/            # Next.js MedPrep learning application
│   ├── frontend-e2e/        # Cypress end-to-end test project
│   └── mobile/              # Expo / React Native application
│       ├── index.js         # Expo entry point
│       └── src/app/         # Mobile screen and GraphQL API client
├── libs/
│   ├── auth/                # Better Auth server, client, sessions and guards
│   ├── contracts/           # Shared GraphQL schema and operations
│   ├── database/            # Prisma schema, migrations, and database client
│   └── shared/              # Framework-independent roles, permissions and contracts
├── tools/                   # Workspace scripts and tooling
├── compose.yaml             # Local PostgreSQL service
├── .env.example             # Root local-development environment template
├── nx.json                  # Nx plugins and workspace configuration
├── package.json             # Workspace scripts and dependencies
└── README.md
```

## Requirements

Install the following before setting up the project:

1. **Git** to clone the repository.
2. **Node.js and Yarn.** Use a current Node.js LTS release compatible with the
   installed Nx and Expo packages; enable Yarn through Corepack if needed.
3. **Docker Desktop** (Windows/macOS) or Docker Engine with the Compose plugin
   (Linux), with Docker running when you start the database.
4. **For native mobile testing:** Android Studio and an Android emulator, or
   Xcode and an iOS simulator (iOS simulator builds require macOS). Alternatively,
   use Expo Go on a physical device.

Check that the tools are available:

```sh
git --version
node --version
yarn --version
docker --version
docker compose version
```

## Clone and install

Clone the GitHub repository. Replace the URL with the clone URL shown on the
repository's GitHub page:

```sh
git clone https://github.com/OWNER/REPOSITORY.git
cd REPOSITORY
```

Install the locked Yarn workspace dependencies:

```sh
yarn install --frozen-lockfile
```

Use the root `yarn.lock` so workspace packages install consistently. You do not
need to install each app or library separately.

## Configure the environment

Create a root `.env` file from the checked-in example.

**macOS/Linux/Git Bash:**

```sh
cp .env.example .env
```

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

The root `.env.example` contains the local PostgreSQL connection string and
development CORS origins. Better Auth requires `BETTER_AUTH_SECRET` (at least
32 random characters) and `BETTER_AUTH_URL`; `FRONTEND_ORIGINS` accepts only
explicit comma-separated origins. In production, set HTTPS origins and provide
`BETTER_AUTH_URL` explicitly; session cookies are secure in production. Google
sign-in is optional; configure both `GOOGLE_CLIENT_ID` and
`GOOGLE_CLIENT_SECRET` and register
`http://localhost:3000/api/auth/callback/google` as an authorized redirect URI
in Google Cloud to enable it. The connection settings must match the PostgreSQL
service in `compose.yaml` (database `saas_project`, user `devuser`, host port
`5433`). Keep the generated `.env` local; it is ignored by Git. Do not commit
credentials, production connection strings, or private API keys.

The web app uses `http://localhost:3333/graphql` by default. To use a different
GraphQL URL for the web app, add this to the root `.env` before starting Next.js:

```dotenv
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3333/graphql
```

Restart the frontend after changing environment variables.

The Contact page and account verification/password recovery use Resend. Configure
these server-only variables in the root `.env` and in the deployment environment:

```dotenv
RESEND_API_KEY=re_...
CONTACT_EMAIL=your-inbox@example.com
CONTACT_FROM_EMAIL=MedPrep AI Nepal <contact@your-verified-domain.example>
```

Verify the sender domain with Resend before using the form. Never expose or
commit the Resend API key. The form returns a configuration error until all
three variables are set.

Set `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true` only when both Google OAuth server
credentials are configured. Account creation requires a verified email address;
verification and password recovery links use the same verified Resend sender.
New accounts always receive the `student` role, which cannot be supplied by
sign-up input. To bootstrap the first superadmin, create and verify an account
normally, set `BOOTSTRAP_SUPERADMIN_EMAIL` to its address, then run
`yarn db:seed`. The seed refuses unknown or unverified accounts and never
creates users.

## Start the database and apply migrations

Start PostgreSQL and wait for its health check:

```sh
yarn db:up
```

Apply the migration files already present in the repository:

```sh
yarn db:migrate
```

Generate the Prisma client if required:

```sh
yarn db:generate
```

The migrations create the Better Auth tables and MedPrep learning data tables
alongside the existing `Todo` table. Migration and client-generation commands
read `DATABASE_URL` from the root `.env`. The role migration maps existing
`user` roles to `student`, changes the default for new accounts, and restricts
persisted roles to `superadmin`, `admin`, or `student`.

## Run the applications

### Web app and backend together

After the database is ready and migrations are applied:

```sh
yarn dev
```

Open:

- **Web app:** <http://localhost:3000>
- **GraphQL API:** <http://localhost:3333/graphql>
- **API health endpoint:** <http://localhost:3333/api>

MedPrep accounts, questions, attempts, and bookmarks are stored in local
PostgreSQL and accessed through the GraphQL API. Practice questions are not
seeded automatically; add them through the admin workspace after granting your
account the `admin` role in Prisma Studio.

### Start the web app or backend separately

In separate terminals, run:

```sh
yarn dev:backend
```

```sh
yarn dev:frontend
```

The database must be running before starting either app. The frontend needs
the backend running for learning data and authenticated GraphQL requests. The
backend prints the GraphQL URL when it starts.

### Start the Expo mobile app

With the database and backend running, start Expo:

```sh
npx nx start mobile
```

Use the Expo terminal shortcuts to open the app in a browser or on a configured
emulator. For Android, start an emulator in Android Studio first. The iOS
simulator requires macOS and Xcode. If Metro or Expo reports a stale bundle or
cannot resolve an app file, stop the Expo process and restart it from the
workspace root.

## Expo device and emulator setup

The mobile app calls the same `http://<host>:3333/graphql` API as the web app.
During development, it attempts to detect the Expo development server host for
native devices; platform defaults are used when no host is available.

- **Android emulator:** Android's `localhost` is the emulator itself. The
  standard host alias for reaching the development computer is `10.0.2.2`.
- **iOS simulator:** `localhost` generally points to the development computer.
- **Expo Web:** the API must be reachable from the browser, and its origin must
  be permitted by the backend's development CORS configuration.
- **Physical device:** the phone and computer must be on the same network, and
  the computer firewall must allow the development ports.

If a device cannot reach the API, create `apps/mobile/.env` from
`apps/mobile/.env.example` and set an address that is reachable from that
device. For example:

```dotenv
EXPO_PUBLIC_GRAPHQL_URL=http://192.168.1.20:3333/graphql
```

Replace `192.168.1.20` with your computer's actual LAN IPv4 address. Restart
Expo after changing the setting. Do not use `localhost` as the API host on a
physical phone; it refers to the phone itself.

Expo's public environment variables are bundled into the app. Only put
non-secret configuration such as a local API URL in `EXPO_PUBLIC_*` variables.

## GraphQL API

The API is implemented in `apps/backend` and exposed at `/graphql`.
`libs/contracts` provides the schema and operations used by the backend and
clients.

### Todo operations

```graphql
query Todos {
  todos {
    id
    title
    completed
    createdAt
    updatedAt
  }
}
```

```graphql
mutation CreateTodo($title: String!) {
  createTodo(title: $title) {
    id
    title
    completed
    createdAt
    updatedAt
  }
}
```

```graphql
mutation UpdateTodo($id: ID!, $title: String, $completed: Boolean) {
  updateTodo(id: $id, title: $title, completed: $completed) {
    id
    title
    completed
    createdAt
    updatedAt
  }
}
```

```graphql
mutation DeleteTodo($id: ID!) {
  deleteTodo(id: $id)
}
```

Todo titles must contain between 1 and 200 non-whitespace characters. The
database orders incomplete todos first, then newest first.

## Common commands

Run commands from the repository root:

| Command | Purpose |
| --- | --- |
| `yarn install --frozen-lockfile` | Install dependencies from `yarn.lock` |
| `yarn dev` | Run the web app and backend together |
| `yarn dev:frontend` | Run only the Next.js app |
| `yarn dev:backend` | Run only the GraphQL backend |
| `yarn nx start mobile` | Start the Expo application |
| `yarn db:up` | Start the local PostgreSQL container |
| `yarn db:down` | Stop the container and network, retaining database data |
| `yarn db:logs` | Follow PostgreSQL logs |
| `yarn db:migrate` | Create/apply Prisma development migrations |
| `yarn db:migrate:deploy` | Apply committed migrations in a deployment |
| `yarn db:seed` | Promote an existing verified bootstrap account to superadmin |
| `yarn db:generate` | Generate Prisma Client from the schema |
| `yarn db:push` | Push schema changes without creating a migration |
| `yarn db:studio` | Open Prisma Studio |
| `yarn build:frontend` | Build the web app |
| `yarn build:backend` | Build the backend |
| `yarn build:all` | Run Nx build targets across projects |
| `yarn format` | Format files using Nx formatting |
| `yarn nx show projects` | List Nx projects |
| `yarn nx graph` | Visualize project dependencies |

Vercel builds only the Next.js frontend; it does not build the separate backend
or mobile app. The build command generates Prisma Client and uses build-only
placeholder values for `DATABASE_URL` and `BETTER_AUTH_SECRET`, so no database
connection or production auth secret is needed at build time. Configure real
runtime values in Vercel for frontend server routes that use them, such as
authentication or `/api/visual`.

For a project-specific target, Nx uses:

```sh
yarn nx <target> <project>
```

For example:

```sh
yarn nx build frontend
yarn nx build backend
```

Use `yarn nx show project <project>` to inspect the targets available for a
project. A continuous development server should run in its own terminal.

## Database development

The Prisma schema is at `libs/database/prisma/schema.prisma`; committed
migration files are at `libs/database/prisma/migrations`.

When changing the schema, create and apply a named migration:

```sh
yarn db:migrate --name describe_your_change
```

Use `yarn db:migrate:deploy` in deployment environments to apply committed
migrations without creating new migration files.

Review and commit the generated migration along with the schema change. The
Prisma client is generated under `libs/database/src/generated/prisma`; it is
generated output and should not be edited by hand.

`yarn db:push` is available for local prototyping when you intentionally do
not want a migration. Prefer migrations for changes that should be reviewed,
shared, or deployed.

Stop the local database without deleting its data:

```sh
yarn db:down
```

The Docker Compose configuration uses a named volume. Avoid
`docker compose down -v` unless you intentionally want to delete the local
database and all of its data.

## Troubleshooting

### The API cannot be reached

1. Confirm PostgreSQL is running with `yarn db:up`.
2. Confirm migrations have been applied with `yarn db:migrate`.
3. Start the backend with `yarn dev:backend` or `yarn dev`.
4. Open <http://localhost:3333/api> on the development computer. It should
   return a JSON welcome message.
5. On a physical mobile device, use the computer's LAN address in
   `EXPO_PUBLIC_GRAPHQL_URL`, check the firewall, and restart Expo.

An HTTP 403 response indicates that the request origin is not allowed by
`FRONTEND_ORIGINS`. Add a trusted development origin to the root `.env` and
restart the backend. Do not add broad or untrusted origins to production
configuration.

### PostgreSQL does not start

- Make sure Docker is running.
- Check whether another process is using port `5433`.
- Inspect container output with `yarn db:logs`.
- Confirm `.env` has a `DATABASE_URL` consistent with the Compose database,
  user, password, and host port.

### Expo does not load the latest code

- Stop the Expo/Metro process and restart `npx nx start mobile` from the
  workspace root.
- If Metro cannot resolve an import, confirm the referenced file exists and
  that its path and filename casing match.
- After changing an Expo environment variable, restart Metro so the value is
  included in the app bundle.

### Nx or dependency installation issues

- Run commands from the repository root.
- Use `yarn install --frozen-lockfile` after cloning or when restoring a clean dependency installation.
- Check `yarn nx show projects` to confirm Nx can discover the workspace apps
  and libraries.

## Contributing

1. Create a feature branch.
2. Make the change in the owning app or shared library.
3. Run the smallest relevant build, test, or lint target available for the
   project.
4. Include Prisma migrations when changing the database schema.
5. Update this README when setup, commands, or project structure changes.
6. Never commit `.env` files, credentials, generated secrets, or production
   connection strings.

Shared GraphQL schema and operations belong in `libs/contracts`; database
access belongs in `libs/database`; API resolver and server behavior belongs in
`apps/backend`. The web and mobile clients should consume the shared contracts
rather than maintaining separate copies of the GraphQL operation strings.
