import '../server/runtime-config.js';
import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { data, error } = await supabase.from('ws_projects').select('id, slug, name, brand, category, headline, description, solution, deliverables, image, color, sort_order, website_url').order('sort_order', { ascending: true });
    if (error) throw error;
    const projects = (data || []).map((row) => {
      const { website_url, ...rest } = row;
      return website_url ? { ...rest, websiteUrl: website_url } : rest;
    });
    res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=600');
    return res.status(200).json(projects);
  } catch (err) {
    console.error('Portfolio read failed:', err.message);
    return res.status(500).json({ error: 'دریافت نمونه‌کارها ممکن نشد. لطفاً دوباره تلاش کنید.' });
  }
}
