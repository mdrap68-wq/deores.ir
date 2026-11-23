import '../server/runtime-config.js';
import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { data, error } = await supabase.from('ws_editorial').select('id, kind, slug, title, english, summary, detail, media, sort_order').order('sort_order', { ascending: true });
    if (error) throw error;
    res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=600');
    return res.status(200).json(data);
  } catch (err) {
    console.error('Editorial read failed:', err.message);
    return res.status(500).json({ error: 'اطلاعات این بخش در دسترس نیست. دوباره تلاش کنید.' });
  }
}
