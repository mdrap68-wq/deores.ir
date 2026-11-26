import nodemailer from 'nodemailer';

export function hasMailConfig() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export async function sendConsultationMail({ name, phone, service, brief, reference }) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONSULTATION_NOTIFY_EMAIL || user;
  if (!user || !pass || !to) throw new Error('Gmail is not configured');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  const when = new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' });
  const text = [
    'درخواست مشاوره جدید از وب‌سایت خاص لایف استایل',
    '',
    `نام: ${name}`,
    `شماره تماس: ${phone}`,
    `خدمت: ${service}`,
    `توضیح: ${brief || '—'}`,
    `کد پیگیری: ${reference}`,
    `زمان: ${when}`,
  ].join('\n');

  await transporter.sendMail({
    from: `"خاص لایف استایل — درخواست مشاوره" <${user}>`,
    to,
    subject: `درخواست مشاوره جدید — ${name}`,
    text,
    html: `
      <div style="font-family:Tahoma,Arial,sans-serif;line-height:1.9;color:#222;direction:rtl;text-align:right">
        <h2 style="margin:0 0 12px">درخواست مشاوره جدید</h2>
        <p style="margin:0 0 18px;color:#666">یک نفر از وب‌سایت خاص لایف استایل فرم مشاوره را پر کرده است.</p>
        <table style="border-collapse:collapse;width:100%;max-width:560px">
          <tr><td style="padding:8px 0;color:#777;width:120px">نام</td><td style="padding:8px 0;font-weight:700">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#777">شماره تماس</td><td style="padding:8px 0;font-weight:700;direction:ltr;text-align:right">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding:8px 0;color:#777">خدمت</td><td style="padding:8px 0">${escapeHtml(service)}</td></tr>
          <tr><td style="padding:8px 0;color:#777;vertical-align:top">توضیح</td><td style="padding:8px 0">${escapeHtml(brief || '—')}</td></tr>
          <tr><td style="padding:8px 0;color:#777">کد پیگیری</td><td style="padding:8px 0;direction:ltr;text-align:right">${escapeHtml(reference)}</td></tr>
          <tr><td style="padding:8px 0;color:#777">زمان</td><td style="padding:8px 0">${escapeHtml(when)}</td></tr>
        </table>
      </div>
    `,
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
