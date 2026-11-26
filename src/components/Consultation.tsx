import { useState, type FormEvent } from 'react'
import { ArrowUpLeft, Check, LoaderCircle, Phone, ShieldCheck, ChevronDown } from 'lucide-react'
import { Eyebrow } from './Brand'
import { latinDigits, type Editorial } from '../lib/studio'

export function Consultation({ services, initialService, initialBrief, close }: { services: Editorial[]; initialService?: string; initialBrief?: string; close: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState(initialService || '')
  const [brief, setBrief] = useState(initialBrief || '')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [reference, setReference] = useState('')
  const clearError = (key: string) => setErrors(e => ({ ...e, [key]: '', general: '' }))
  async function submit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return
    const next: Record<string, string> = {}
    const normalPhone = latinDigits(phone.trim()).replace(/[\s()-]/g, '').replace(/^(\+98|0098)/, '0')
    if (name.trim().length < 2) next.name = 'لطفاً نام و نام خانوادگی خود را وارد کنید.'
    if (!/^09\d{9}$/.test(normalPhone)) next.phone = 'شماره همراه را به‌صورت ۰۹۱۲۱۲۳۴۵۶۷ وارد کنید.'
    if (!service) next.service = 'لطفاً یک خدمت را انتخاب کنید.'
    setErrors(next)
    if (Object.keys(next).length) { document.getElementById(`consult-${Object.keys(next)[0]}`)?.focus(); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/consultations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone: normalPhone, service, brief }) })
      const response = await res.json()
      if (!res.ok) throw new Error(response.error || 'درخواست ثبت نشد. لطفاً دوباره تلاش کنید.')
      setReference(response.reference)
      const receipt = await fetch(`/api/consultations?reference=${encodeURIComponent(response.reference)}`)
      if (receipt.ok) { const updated = await receipt.json(); setReference(updated.reference) }
    } catch (err) { setErrors({ general: err instanceof Error && /[\u0600-\u06FF]/.test(err.message) ? err.message : 'ارتباط برقرار نشد. لطفاً اتصال خود را بررسی و دوباره تلاش کنید.' }) }
    finally { setSubmitting(false) }
  }
  if (reference) return <div className="confirmation"><span className="success-symbol"><Check size={29}/></span><Eyebrow>REQUEST RECEIVED</Eyebrow><h2 id="dialog-title">اولین قدم را برداشتیم!</h2><p>{name.trim()} عزیز، درخواست مشاوره شما ثبت شد. تیم خاص لایف استایل برای گفت‌وگو درباره «{service}» با شماره <bdi>{phone}</bdi> تماس می‌گیرد.</p><div className="receipt"><span>کد پیگیری درخواست</span><strong dir="ltr">KL–{reference.slice(0, 8).toUpperCase()}</strong></div><button className="button button-dark" onClick={close}>بازگشت به وب‌سایت <ArrowUpLeft size={17}/></button></div>
  return <div className="consultation-content"><Eyebrow>LET’S WORK TOGETHER</Eyebrow><h2 id="dialog-title" className="dialog-title">درباره پروژه‌تان بگویید<span className="orange-period">.</span></h2><p className="dialog-description">از یک ایده شروع می‌کنیم. اطلاعاتتان را بنویسید تا برای مشاوره با شما تماس بگیریم.</p><form onSubmit={submit} noValidate><div className="form-grid"><div className="field"><label htmlFor="consult-name">نام و نام خانوادگی <i>*</i></label><input id="consult-name" name="name" autoComplete="name" maxLength={90} placeholder="نام شما" value={name} onChange={e => { setName(e.target.value); clearError('name') }} aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined}/>{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</div><div className="field"><label htmlFor="consult-phone">شماره همراه <i>*</i></label><input id="consult-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={22} placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷" dir="ltr" value={phone} onChange={e => { setPhone(e.target.value); clearError('phone') }} aria-required="true" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined}/>{errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}</div></div><div className="field"><label htmlFor="consult-service">خدمت موردنظر <i>*</i></label><div className="select-wrapper"><select id="consult-service" name="service" value={service} onChange={e => { setService(e.target.value); clearError('service') }} aria-required="true" aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined}><option value="" disabled>انتخاب کنید</option>{services.map(s => <option value={s.title} key={s.id}>{s.title}</option>)}{initialService && !services.some(s => s.title === initialService) && <option>{initialService}</option>}<option>برای انتخاب خدمت راهنمایی می‌خواهم</option></select><ChevronDown size={15}/></div>{errors.service && <span className="field-error" id="service-error">{errors.service}</span>}</div><div className="field"><label htmlFor="consult-brief">کمی درباره پروژه <span className="optional">(اختیاری)</span></label><textarea id="consult-brief" name="brief" rows={3} maxLength={1400} value={brief} onChange={e => setBrief(e.target.value)} placeholder="کسب‌وکارتان را معرفی کنید و از ایده‌هایتان بگویید…"/></div>{errors.general && <div className="form-error" role="alert">{errors.general}</div>}<button type="submit" className="button button-dark submit-button" disabled={submitting}>{submitting ? <><LoaderCircle size={18} className="spinning"/>در حال ثبت درخواست</> : <>ثبت درخواست مشاوره<ArrowUpLeft size={18}/></>}</button><p className="privacy-note"><ShieldCheck size={14}/>اطلاعات شما فقط برای پیگیری همین درخواست استفاده می‌شود.</p></form><div className="consultation-direct"><span>ترجیح می‌دهید تماس بگیرید؟</span><a href="tel:+989965442168" dir="ltr">0996 544 2168 <Phone size={14}/></a></div></div>
}
