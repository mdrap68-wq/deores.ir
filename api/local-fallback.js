import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const localData = require('./local-data.json');

export function hasDatabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));
}

export function localProjects() {
  return localData.projects || [];
}

export function localEditorial() {
  return localData.editorial || [];
}
