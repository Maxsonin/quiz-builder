# Quiz Builder

## Prerequisites

- [pnpm](https://pnpm.io/installation)
- Docker (for PostgreSQL)

## Getting started

1. Create the env files from the examples:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   ```

2. Start PostgreSQL:

   ```bash
   docker compose up -d
   ```

3. Install dependencies, apply migrations and seed a sample quiz:

   ```bash
   pnpm bootstrap
   ```

4. Start the backend and frontend:

   ```bash
   pnpm dev
   ```

- Frontend: http://localhost:3000
- API: http://localhost:4000

## Quiz Creation

To create a quiz:

1. Click "Create" in the navigation bar.
2. Add a title and some questions.
3. Click "Create quiz". You'll be redirected to the new quiz in read-only mode.
