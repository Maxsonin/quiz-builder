# Quiz Builder

## Prerequisites

- pnpm (`npm i -g pnpm`)
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

To create quiz, using nav-bar go to "Create". There you can create a quiz and when you a ready, click "Create quiz" and it will redirect you to a newly created quiz in read only mode.
