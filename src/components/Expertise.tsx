import { useState } from 'react'
import { ArrowLeft, ArrowUpLeft, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Eyebrow, Spark } from './Brand'
import { faNumber, type Editorial, type OpenDialog } from '../lib/studio'
import { LoadError } from './Portfolio'

export function Expertise({ services, selected, select, open, loading, error, retry }: { services: Editorial[]; selected: string; select: (slug: string) => void; open: OpenDialog; loading: boolean; error: boolean; retry: () => void }) {
  const active = services.find(s => s.slug === selected) || services[0]
  const expanded = selected === '' ? null : active?.id
  return <section className="expertise-section page-width" id="services"><div className="section-heading"><div><Eyebrow>OUR EXPERTISE</Eyebrow><h2>تخصص ما، رشد برند شما<span className="orange-period">.</span></h2></div><span className="section-side-note">از استراتژی تا تجربه‌ای ماندگار</span></div>
    {loading ? <div className="section-skeleton skeleton"/> : error ? <LoadError retry={retry}/> : active && <div className="expertise-grid">
      <div className="service-list">{services.map((s, i) => <div className={`service-row ${s.id === expanded ? 'active' : ''}`} key={s.id}>
        <h3><button aria-expanded={s.id === expanded} aria-controls={`service-${s.slug}`} onClick={() => select(s.id === expanded ? '' : s.slug)}><span className="service-number" dir="ltr">0{i + 1}</span><span>{s.title}</span><span className="row-toggle">{s.id === expanded ? <Minus size={17}/> : <Plus size={17}/>}</span></button></h3>
        <div hidden={s.id !== expanded} className="service-answer" id={`service-${s.slug}`}><h4>{s.summary}</h4><p>{s.detail}</p><button className="text-action" onClick={() => open({ type: 'consultation', service: s.title })}>مشاوره این خدمت <ArrowLeft size={16}/></button></div>
      </div>)}</div>
      <div className="expertise-art" key={active.media}><img src={active.media} alt={active.summary} loading="lazy" width="900" height="650"/><span className="expertise-art-label" dir="ltr"><i/>{active.english}</span></div>
    </div>}
  </section>
}
export function Process({ steps, open }: { steps: Editorial[]; open: OpenDialog }) {
  const [index, setIndex] = useState(0)
  const step = steps[index]
  return <section id="process" className="process-section"><div className="page-width"><div className="section-heading"><div><Eyebrow>THE PROCESS</Eyebrow><h2>یک مسیر روشن، از ایده تا اجرا<span className="orange-period">.</span></h2></div><span className="process-decoration"><Spark/></span></div><p className="process-description">یک وب‌سایت حرفه‌ای به برنامه‌ای دقیق نیاز دارد. در هر قدم، هم‌مسیر شما هستیم.</p><div className="process-steps" role="tablist" aria-label="مراحل همکاری">{steps.map((s, i) => <button key={s.id} role="tab" id={`step-tab-${i}`} aria-selected={index === i} aria-controls="step-panel" className={index === i ? 'active' : ''} onClick={() => setIndex(i)} onKeyDown={e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); const next = (index + (e.key === 'ArrowLeft' ? 1 : -1) + steps.length) % steps.length; setIndex(next); document.getElementById(`step-tab-${next}`)?.focus() } }}><span className="step-index" dir="ltr">0{i + 1}</span><span>{s.title}</span><span className="step-dot"/></button>)}</div>{step && <div className="process-panel" id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${index}`}><div className="step-en" dir="ltr"><i/> {step.english}</div><h3>{step.summary}</h3><p>{step.detail}</p><div className="process-controls"><button aria-label="مرحله قبلی" disabled={index === 0} onClick={() => setIndex(i => Math.max(i - 1, 0))}><ChevronRight size={17}/></button><span>{faNumber(index + 1)} از {faNumber(steps.length)}</span><button aria-label="مرحله بعدی" disabled={index === steps.length - 1} onClick={() => setIndex(i => Math.min(i + 1, steps.length - 1))}><ChevronLeft size={17}/></button></div></div>}<div className="process-foot"><span>نقطه شروع پروژه شما، یک گفت‌وگوی خوب است.</span><button onClick={() => open({ type: 'consultation' })}>شروع گفت‌وگو <ArrowUpLeft size={16}/></button></div></div></section>
}
export function Faq({ faqs, open }: { faqs: Editorial[]; open: OpenDialog }) {
  const [expanded, setExpanded] = useState<number | null>(null)
  return <section className="faq-section page-width" id="faq"><div className="faq-intro"><Eyebrow>GOOD TO KNOW</Eyebrow><h2>پرسش‌های<br/>پرتکرار<span className="orange-period">.</span></h2><p>هر آنچه پیش از شروع همکاری<br/>لازم است بدانید.</p><button className="text-action" onClick={() => open({ type: 'contact' })}>پرسش دیگری دارید؟ <ArrowUpLeft size={16}/></button></div><div className="faq-list">{faqs.map((f, i) => <div className={`faq-item ${expanded === f.id ? 'expanded' : ''}`} key={f.id}><h3><button onClick={() => setExpanded(expanded === f.id ? null : f.id)} aria-expanded={expanded === f.id} aria-controls={`faq-answer-${f.id}`}><span className="faq-number" dir="ltr">0{i + 1}</span>{f.title}<span className="faq-icon">{expanded === f.id ? <Minus size={16}/> : <Plus size={16}/>}</span></button></h3><div className="faq-answer" id={`faq-answer-${f.id}`} hidden={expanded !== f.id}><p>{f.detail}</p></div></div>)}</div></section>
}
