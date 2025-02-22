# RT Stack

A modern [turborepo](https://turbo.build/repo/docs) template for building
fullstack projects with modular components, shared configs, containerised
deployments and 100% type-safety.

## About

### Stack overview

Below is an overview of all the components in the stack:

```
apps
  ├─ web
  |   ├─ react (vite)
  |   ├─ tanstack (router, query, form)
  |   └─ tailwindcss
  ├─ server
  |   └─ hono (wrapper for api & auth)
packages
  ├─ api
  |   └─ trpc with zod
  ├─ auth
  |   └─ better auth
  ├─ db
  |   └─ drizzle orm (postgresql database)
  ├─ ui
  |   ├─ tailwindcss
  |   └─ shadcn & radix ui
tools
  ├─ eslint
  ├─ prettier
  ├─ tailwind
  └─ typescript
```

View all catalog dependencies in [pnpm-workspace.yaml](pnpm-workspace.yaml).

### Base Functionalities

The following features are implemented out-of-the-box:

- login/register (using [better-auth email/password](https://www.better-auth.com/docs/authentication/email-password)) credentials provider
- themes (dark/light mode using [next-themes](github.com/pacocoursey/next-themes))
- web/server integration ([trpc](https://trpc.io/docs/quickstart) API example for creating/listing posts)

### Inspirations & Goals

Many aspects of the RT Stack were derived from the
[t3-oss/create-t3-turbo](https://github.com/t3-oss/create-t3-turbo). However,
there is a preference for:

- [tanstack router](https://tanstack.com/router/latest) (web) + [hono](https://hono.dev) (server) instead of [nextjs](https://nextjs.org) (fullstack)
- [better auth](https://www.better-auth.com) for authentication instead [auth.js (next auth)](https://authjs.dev)
- [zod](https://zod.dev) for input validation instead of [zod](https://zod.dev)
- [tanstack form](https://tanstack.com/form/latest) instead of [react-hook-form](https://react-hook-form.com)
- using `.env` in each application/package instead of globally, as per [turborepo's recommendations](https://turbo.build/repo/docs/crafting-your-repository/using-environment-variables#best-practices)

Additionally, the aim of this project is to always adopting the latest releases
of dependencies and tools. For example:

- react v19
- tailwindcss v4 & shadcn-ui (canary)
- trpc v11
- eslint v9
- pnpm v10

## Quick Start

### Prerequisites

Ensure the following tools are available on your system:

1. [node](https://nodejs.org/en/download) (version 22+)
1. [pnpm](https://pnpm.io/installation) (version 10+)
1. [postgres](https://www.postgresql.org) database, which you can easily run using tools like:
   - [docker](https://docs.docker.com/engine/install) and [docker-compose](https://docs.docker.com/compose)
   - [podman](https://podman.io/docs/installation) and [podman-compose](https://github.com/containers/podman-compose)
   - [supabase](https://supabase.com)'s free tier cloud database

### Setup

```bash
# Create a repository using the rt-stack template (replace YOUR_PROJECT)
pnpm dlx create-turbo@latest -m pnpm -e https://github.com/nktnet1/rt-stack YOUR_PROJECT

# Enter the directory or open in your IDE (replace YOUR_PROJECT)
cd YOUR_PROJECT

# Install all dependencies for apps and packages
pnpm install

# Set up environment variables in packages/db (for migration) and apps/*
pnpm copy-example-env

# Start a local postgres instance in the background (e.g. using docker)
docker compose up db --detach

# Push drizzle schema to your database
pnpm db:push
```

If you use an external postgres database, you will need to modify the following
environment variables:

1. `SERVER_POSTGRES_URL` in the file `apps/server/.env`

   - used at runtime by the backend server

1. `DB_POSTGRES_URL` in the file `packages/db/.env`
   - used in database schema migrations with `pnpm db:push`

You can then start all applications with

```bash
pnpm dev
```

By default the following URLs will be accesibile:

- web application: http://localhost:8085
- backend server: http://localhost:3035

## Developing

### Working with a single package

Use [`pnpm --filter=<name>`](https://pnpm.io/filtering) (where `<name>` is defined in the `package.json` of each package).

Example usage:

```bash
# Install the nuqs package for our web application:
pnpm --filter=web install nuqs

# Format only the ui package:
pnpm --filter=@repo/ui format
```

You can get a list of all package names using the command below:

```bash
find . -maxdepth 3 -name "package.json" -exec grep '"name":' {} \;
```

### Adding new shadcn components

To install a single Shadcn/UI component, e.g. `button`, use the command

```bash
pnpm ui-add button
```

You can also open an intera

```bash
pnpm ui-add
```

- press `i` to enter interactive mode on startup
- use `j/k` (or arrow keys) to navigate up and down.
- use `<Space>` to toggle select your desired component(s)
- hit `<Enter>` to install all selected components

### Tooling Scripts:

All scripts are defined in [package.json](package.json) and
[turbo.json](turbo.json):

```bash
pnpm typecheck              # repot typescript isses

pnpm format                 # report prettier issues
pnpm format:fix             # auto-fix prettier issues

pnpm lint                   # report eslint issues
pnpm lint:fix               # auto-fix eslint issues

pnpm clean                  # remove all .cache, .turbo, dist, node_modules

pnpx codemod pnpm/catalog   # migrate dependencies to pnpm-workspace.yaml
```

## Containerisation (Docker/Podman)

Both the `web` and `server` applications have been containerised. You can start
see this in action by running the commands:

```bash
# Start all applications
docker-compose up

# Push drizzle schema to your database - while you can use `pnpm db:push` on
# the host machine if you have installed all the required dependencies, it is
# also possible to do everything within docker.
# Open a second terminal and run the command:
docker compose run --rm drizzle

# Upon completion, you will be inside the `drizzle` docker container instead
# of the host machine. It is now possible to push the schema with:
pnpm db:push
```

You can then open the web link below in your browser:

- http://localhost:8085

Please note that these containers are run in production mode. For further
details, see

- [compose.yaml](compose.yaml)
- [apps/server/Dockerfile](apps/server/Dockerfile)
- [apps/web/Dockerfile](apps/web/Dockerfile)
- [apps/web/nginx.conf](apps/web/nginx.conf)

## Caveats

### Tanstack Router Layout

The following is configured in [vite.config.ts](apps/web/vite.config.ts) web application:

```ts
TanStackRouterVite({
  routeToken: 'layout',
}),
```

This is to allow for a `layout.tsx` file in each directory similar to NextJS.
You can read more about this
[here](https://github.com/TanStack/router/discussions/1102#discussioncomment-10946603).

### Server API

There is an artificial delay added in development mode to simulate API usage in
real-world environments. You can disable this by removing the `timingMiddleware`
in [./packages/api/src/server/trpc.ts](./packages/api/src/server/trpc.ts)
