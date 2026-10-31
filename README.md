# SassProject

A small Nx monorepo containing a Next.js web app, an Expo mobile app, an
Express/Apollo GraphQL API, and a PostgreSQL database accessed through Prisma.
The web and mobile apps use the same todo API and shared GraphQL operations.

> The todo app is currently a local-development example. It has no user
> accounts, authorization, or production deployment configuration. Do not
> expose the development database credentials or local API directly to the
> public internet.

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
- Persist todos in PostgreSQL.
- Use the same GraphQL API from the Next.js and Expo apps.
- Share GraphQL schema and operation strings through the contracts library.
- Run projects and tasks through Nx.
- Build and run the local database with Docker Compose.

## Technology

- **Workspace:** Nx with npm workspaces
- **Web:** Next.js, React, TypeScript
- **Mobile:** Expo, React Native, TypeScript
- **API:** Express 5, Apollo Server, GraphQL
- **Database:** PostgreSQL 16, Prisma ORM 7
- **End-to-end testing:** Cypress and Nx/Jest project targets

## Repository structure

```text
.
├── apps/
│   ├── backend/             # Express server, Apollo GraphQL API, todo resolvers
│   ├── backend-e2e/         # Backend end-to-end test project
│   ├── frontend/            # Next.js todo web application
│   ├── frontend-e2e/        # Cypress end-to-end test project
│   └── mobile/              # Expo / React Native application
│       ├── index.js         # Expo entry point
│       └── src/app/         # Mobile screen and GraphQL API client
├── libs/
│   ├── auth/                # Authentication library placeholder
│   ├── contracts/           # Shared GraphQL schema and todo operations
│   ├── database/            # Prisma schema, migrations, and database client
│   └── shared/              # Shared library placeholder
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
2. **Node.js and npm.** Use a current Node.js LTS release compatible with the
   installed Nx and Expo packages.
3. **Docker Desktop** (Windows/macOS) or Docker Engine with the Compose plugin
   (Linux), with Docker running when you start the database.
4. **For native mobile testing:** Android Studio and an Android emulator, or
   Xcode and an iOS simulator (iOS simulator builds require macOS). Alternatively,
   use Expo Go on a physical device.

Check that the tools are available:

```sh
git --version
node --version
npm --version
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

Install the locked npm workspace dependencies:

```sh
npm ci
```

Use the root `package-lock.json` and `npm ci` so workspace packages install
consistently. You do not need to install each app or library separately.

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
development CORS origins. The connection settings must match the PostgreSQL
service in `compose.yaml` (database `saas_project`, user `devuser`, host port
`5433`). Keep the generated `.env` local; it is ignored by Git. Do not commit
credentials, production connection strings, or private API keys.

The web app uses `http://localhost:3333/graphql` by default. To use a different
GraphQL URL for the web app, add this to the root `.env` before starting Next.js:

```dotenv
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3333/graphql
```

Restart the frontend after changing environment variables.

## Start the database and apply migrations

Start PostgreSQL and wait for its health check:

```sh
npm run db:up
```

Apply the migration files already present in the repository:

```sh
npm run db:migrate
```

Generate the Prisma client if required:

```sh
npm run db:generate
```

The migration creates the `Todo` table. Migration and client-generation
commands read `DATABASE_URL` from the root `.env`.

## Run the applications

### Web app and backend together

After the database is ready and migrations are applied:

```sh
npm run dev
```

Open:

- **Web app:** <http://localhost:3000>
- **GraphQL API:** <http://localhost:3333/graphql>
- **API health endpoint:** <http://localhost:3333/api>

Todos are stored in the shared local database. The example app does not require
sign-in.

### Start the web app or backend separately

In separate terminals, run:

```sh
npm run dev:backend
```

```sh
npm run dev:frontend
```

The database must be running before starting the backend. The backend prints
the GraphQL URL when it starts. If a required service is stopped, start it and
reload the relevant app.

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
| `npm ci` | Install dependencies from the npm lockfile |
| `npm run dev` | Run the web app and backend together |
| `npm run dev:frontend` | Run only the Next.js app |
| `npm run dev:backend` | Run only the GraphQL backend |
| `npx nx start mobile` | Start the Expo application |
| `npm run db:up` | Start the local PostgreSQL container |
| `npm run db:down` | Stop the container and network, retaining database data |
| `npm run db:logs` | Follow PostgreSQL logs |
| `npm run db:migrate` | Create/apply Prisma development migrations |
| `npm run db:generate` | Generate Prisma Client from the schema |
| `npm run db:push` | Push schema changes without creating a migration |
| `npm run db:studio` | Open Prisma Studio |
| `npm run build:frontend` | Build the web app |
| `npm run build:backend` | Build the backend |
| `npm run build:all` | Run Nx build targets across projects |
| `npm run format` | Format files using Nx formatting |
| `npx nx show projects` | List Nx projects |
| `npx nx graph` | Visualize project dependencies |

For a project-specific target, Nx uses:

```sh
npx nx <target> <project>
```

For example:

```sh
npx nx build frontend
npx nx build backend
```

Use `npx nx show project <project>` to inspect the targets available for a
project. A continuous development server should run in its own terminal.

## Database development

The Prisma schema is at `libs/database/prisma/schema.prisma`; committed
migration files are at `libs/database/prisma/migrations`.

When changing the schema, create and apply a named migration:

```sh
npm run db:migrate -- --name describe_your_change
```

Review and commit the generated migration along with the schema change. The
Prisma client is generated under `libs/database/src/generated/prisma`; it is
generated output and should not be edited by hand.

`npm run db:push` is available for local prototyping when you intentionally do
not want a migration. Prefer migrations for changes that should be reviewed,
shared, or deployed.

Stop the local database without deleting its data:

```sh
npm run db:down
```

The Docker Compose configuration uses a named volume. Avoid
`docker compose down -v` unless you intentionally want to delete the local
database and all of its data.

## Troubleshooting

### The API cannot be reached

1. Confirm PostgreSQL is running with `npm run db:up`.
2. Confirm migrations have been applied with `npm run db:migrate`.
3. Start the backend with `npm run dev:backend` or `npm run dev`.
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
- Inspect container output with `npm run db:logs`.
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
- Use `npm ci` after cloning or when restoring a clean dependency installation.
- Check `npx nx show projects` to confirm Nx can discover the workspace apps
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

