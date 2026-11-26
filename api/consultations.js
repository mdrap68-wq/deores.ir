import { randomUUID } from 'node:crypto';
import '../server/runtime-config.js';
import supabase from './db-client.js';
import { hasDatabaseConfig } from './local-fallback.js';
import { hasMailConfig, sendConsultationMail } from './mail.js';

const clean = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const digits = (value) => value.replace(/[۰-۹]/g, n => String(n.charCodeAt(0) - 1776)).replace(/[٠-٩]/g, n => String(n.charCodeAt(0) - 1632));

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(204).end();
  try {
    if (req.method === 'GET') {
      const reference = clean(req.query.reference, 40);
      if (!/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(reference)) return res.status(400).json({ error: 'کد پیگیری معتبر نیست.' });
      if (!hasDatabaseConfig()) return res.status(404).json({ error: 'درخواستی با این کد پیدا نشد.' });
      const { data, error } = await supabase.from('ws_consultations').select('reference, status, created_at').eq('reference', reference).setHeader('x-consultation-reference', reference).maybeSingle();
      if (error) throw error;
      if (!data) return res.status(404).json({ error: 'درخواستی با این کد پیدا نشد.' });
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const name = clean(body.name, 90);
      const phone = digits(clean(body.phone, 22)).replace(/[\s()-]/g, '').replace(/^(\+98|0098)/, '0');
      const service = clean(body.service, 110);
      const brief = clean(body.brief, 1400);
      if (name.length < 2) return res.status(400).json({ error: 'نام و نام خانوادگی را وارد کنید.' });
      if (!/^09\d{9}$/.test(phone)) return res.status(400).json({ error: 'شماره همراه معتبر وارد کنید.' });
      if (!service) return res.status(400).json({ error: 'خدمت موردنظر را انتخاب کنید.' });

      const canMail = hasMailConfig();
      const canStore = hasDatabaseConfig();
      if (!canMail && !canStore) {
        return res.status(500).json({ error: 'ثبت درخواست فعلاً در دسترس نیست. لطفاً بعداً تلاش کنید.' });
      }

      const reference = randomUUID();
      const created_at = new Date().toISOString();
      let stored = null;

      if (canStore) {
        try {
          const { data, error } = await supabase.from('ws_consultations').insert({ reference, name, phone, service, brief, status: 'received' }).select('reference, created_at, status').setHeader('x-consultation-reference', reference).single();
          if (error) throw error;
          stored = data;
        } catch (err) {
          console.error('Consultation DB save failed:', err.message);
          if (!canMail) throw err;
        }
      }

      if (canMail) {
        try {
          await sendConsultationMail({ name, phone, service, brief, reference });
        } catch (err) {
          console.error('Consultation mail failed:', err.message);
          if (!stored) throw err;
        }
      }

      return res.status(201).json(stored || { reference, created_at, status: 'received' });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    if (err instanceof SyntaxError) return res.status(400).json({ error: 'اطلاعات فرم معتبر نیست.' });
    console.error('Consultation request failed:', err.message);
    return res.status(500).json({ error: 'ثبت درخواست ممکن نشد. لطفاً دوباره تلاش کنید.' });
  }
}
