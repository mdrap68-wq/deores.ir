// Some preview deployments provide only the public database credential.
// The existing shared client then runs with the database's limited RLS role.
// An explicitly configured server credential is never replaced.
if (!process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}
