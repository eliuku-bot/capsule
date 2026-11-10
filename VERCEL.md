# Vercel deployment

This repository now builds with Next.js for Vercel. `vercel.json` explicitly sets the Next.js framework, `npm run build`, and `.next` output. Keep the project Root Directory at the repository root. The separate original Sites deployment is not changed by this migration.

## Launch-list database

The page renders without database credentials. Signups deliberately return HTTP 503 when storage is unavailable; they never report success without saving.

To enable launch-list storage, configure these server-only Vercel environment variables for Production (and Preview if needed):

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_D1_DATABASE_ID`
- `CLOUDFLARE_D1_API_TOKEN`: a Cloudflare API token with D1 write access scoped to the intended account.

Use a D1 database you control. Apply the schema in `drizzle/0000_burly_retro_girl.sql` once to a new database before enabling signups. Do not assume the original Sites-managed database is accessible through your own Cloudflare account, and do not replay migrations on a database that already has them. No existing signup records are migrated by this code change.

Redeploy after adding environment variables. Submit a test signup and confirm the stored row before announcing the launch list.

Never commit tokens or place these values in `NEXT_PUBLIC_` variables.
