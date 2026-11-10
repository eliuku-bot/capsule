import { drizzle } from 'drizzle-orm/sqlite-proxy';
import * as schema from './schema';

// Vercel runs Node.js functions; D1 is accessed over HTTPS instead of a Worker binding.
export function getDb() {
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  const database = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const token = process.env.CLOUDFLARE_D1_API_TOKEN;
  if (!account || !database || !token) throw new Error('Waitlist database connection is not configured.');
  return drizzle(async (sql, params) => {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(account)}/d1/database/${encodeURIComponent(database)}/query`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql, params }),
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!response.ok) throw new Error('Waitlist database request failed.');
    const data = await response.json() as {success:boolean;result?:{success:boolean;results?:Record<string,unknown>[]}[]};
    if (!data.success || !data.result?.[0]?.success) throw new Error('Waitlist query failed.');
    return {rows:(data.result[0].results ?? []).map(row=>Object.values(row))};
  }, { schema });
}
