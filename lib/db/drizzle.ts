import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

const legacyLocalFallbackDatabaseUrl =
  'postgres://postgres:postgres@localhost:54322/postgres';

function resolveDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    throw new Error(
      'DATABASE_URL is required for Vercel runtime. Attach Neon Postgres in the Vercel project before deploying.'
    );
  }

  if (process.env.POSTGRES_URL) {
    // Legacy fallback kept only for local migration/bootstrap compatibility.
    return process.env.POSTGRES_URL;
  }

  return legacyLocalFallbackDatabaseUrl;
}

function createDb() {
  const sql = neon(resolveDatabaseUrl());
  return drizzleNeon(sql, { schema });
}

export type AppDb = ReturnType<typeof createDb>;

let dbInstance: AppDb | null = null;

export function getDb(): AppDb {
  if (!dbInstance) {
    dbInstance = createDb();
  }

  return dbInstance;
}

export const isUsingFallbackDatabaseUrl =
  !process.env.DATABASE_URL && !process.env.POSTGRES_URL;
export const isUsingLegacyPostgresUrl =
  !process.env.DATABASE_URL && Boolean(process.env.POSTGRES_URL);

// Use an explicit facade instead of a Proxy so Drizzle/Auth consumers can
// inspect the object without the lazy initialization causing subtle runtime bugs.
export const db = {
  get query() {
    return getDb().query;
  },
  get $client() {
    return getDb().$client;
  },
  select: (...args: Parameters<AppDb['select']>) => getDb().select(...args),
  selectDistinct: (...args: Parameters<AppDb['selectDistinct']>) =>
    getDb().selectDistinct(...args),
  selectDistinctOn: (...args: Parameters<AppDb['selectDistinctOn']>) =>
    getDb().selectDistinctOn(...args),
  insert: (...args: Parameters<AppDb['insert']>) => getDb().insert(...args),
  update: (...args: Parameters<AppDb['update']>) => getDb().update(...args),
  delete: (...args: Parameters<AppDb['delete']>) => getDb().delete(...args),
  with: (...args: Parameters<AppDb['with']>) => getDb().with(...args),
  execute: (...args: Parameters<AppDb['execute']>) => getDb().execute(...args),
  refreshMaterializedView: (...args: Parameters<AppDb['refreshMaterializedView']>) =>
    getDb().refreshMaterializedView(...args),
  $count: (...args: Parameters<AppDb['$count']>) => getDb().$count(...args),
} as unknown as AppDb;
