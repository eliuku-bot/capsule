# Vercel deployment

This repository builds with Next.js for Vercel. Keep the project Root Directory at the repository root.

## Launch-list database

Connect Neon through Vercel Storage to the capsule project, select Production, and use the DATABASE prefix. The integration supplies the server-only DATABASE_URL environment variable. Never commit its value or use a NEXT_PUBLIC_ prefix.

The build runs scripts/setup-database.mjs before Next.js. This creates the waitlist table if it is absent and preserves existing rows. Production builds fail if DATABASE_URL is missing or database setup fails. Local and Preview builds without a database skip setup; signup requests return HTTP 503 until storage is connected.

The signup API uses Neon Postgres through Drizzle. Email is the primary key; repeated signups update the selected finish and consent version. The original SQLite migrations in drizzle/ are retained as history only; future Postgres migrations use drizzle-postgres/. No historical Cloudflare signup rows are migrated automatically.

After connecting the database, deploy the latest main commit. Submit a test signup, confirm the row in Neon's SQL Editor, and remove the test signup using the site's privacy controls. This stores signups but does not send emails.
