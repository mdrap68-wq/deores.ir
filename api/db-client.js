import { createClient } from '@supabase/supabase-js';
import { triggerRestore } from './db-wake.js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = url && key
  ? createClient(url, key, {
      global: {
        fetch: async (requestUrl, options) => {
          const res = await fetch(requestUrl, options);
          if (!res.ok && res.status >= 500) triggerRestore();
          return res;
        },
      },
    })
  : {
      from() {
        return {
          select() {
            return {
              order: async () => ({ data: null, error: new Error('Database is not configured') }),
              eq() {
                return {
                  setHeader() {
                    return {
                      maybeSingle: async () => ({ data: null, error: new Error('Database is not configured') }),
                    };
                  },
                };
              },
            };
          },
          insert() {
            return {
              select() {
                return {
                  single: async () => ({ data: null, error: new Error('Database is not configured') }),
                };
              },
            };
          },
        };
      },
    };

export default supabase;
