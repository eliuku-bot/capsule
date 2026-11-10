import { neon } from '@neondatabase/serverless';

const url = process.env.DATABASE_URL;
if (!url) {
  if (process.env.VERCEL_ENV === 'production') {
    console.error('Connect Neon to Production with the DATABASE prefix before deploying.');
    process.exit(1);
  }
  console.log('DATABASE_URL is absent; skipping waitlist database setup.');
} else {
  try {
    const sql = neon(url);
    await sql`CREATE TABLE IF NOT EXISTS waitlist (
      email TEXT PRIMARY KEY NOT NULL,
      finish TEXT NOT NULL,
      created_at TEXT NOT NULL,
      consent_version TEXT NOT NULL
    )`;
    console.log('Waitlist database is ready.');
  } catch {
    // Never include connection strings or driver errors in public build logs.
    console.error('Waitlist database setup failed. Check the Neon connection in Vercel.');
    process.exit(1);
  }
}
