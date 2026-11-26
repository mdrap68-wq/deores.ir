import { ArrowLeft, ArrowUpLeft, Layers3, Blocks, Smile } from 'lucide-react'
import { Eyebrow, Spark } from './Brand'
import type { Editorial, OpenDialog } from '../lib/studio'

export function Hero({ open }: { open: OpenDialog }) {
  return <section className="hero page-width" aria-labelledby="hero-title">
    <div className="hero-copy"><Eyebrow>WEBSITE DESIGN</Eyebrow>
      <h1 id="hero-title">طراحی سایت،<br/><span className="hero-accent">برای موفقیت آنلاین<svg viewBox="0 0 195 12" preserveAspectRatio="none" aria-hidden="true"><path d="M3 9C42 4 101 1 191 4 M20 10C65 7 112 5 164 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg></span></h1>
      <p className="hero-description">یک وب‌سایت حرفه‌ای، اولین قدم برای موفقیت آنلاین است. در دیورس، طراحی خلاقانه را با تکنولوژی همراه می‌کنیم تا برند شما متفاوت دیده شود.</p>
      <div className="hero-actions"><button className="button button-dark" onClick={() => open({ type: 'consultation' })}>شروع یک پروژه <ArrowUpLeft size={19}/></button><a href="#work" className="text-action">مشاهده نمونه‌کارها <ArrowLeft size={17}/></a></div>
    </div>
    <div className="hero-art"><img className="hero-render" src="/images/hero-studio.webp?v=bite4" alt="نمونه‌کار فارسی واکنش‌گرا روی نمایشگر دسکتاپ و موبایل — وب‌سایت بایت" width="1400" height="933" fetchPriority="high"/></div>
  </section>
}
export function Achievements({ metrics, loading, error, retry }: { metrics: Editorial[]; loading: boolean; error: boolean; retry: () => void }) {
  return <section className="achievements page-width" aria-label="دیورس در یک نگاه"><div className="achievement-intro"><Spark className="stats-spark"/><div><span className="microtype" dir="ltr">AT A GLANCE</span><h2>دیورس در یک نگاه</h2></div></div>
    {loading ? <div className="metric-skeleton skeleton"/> : error ? <button className="inline-retry" onClick={retry}>دریافت دوباره آمار</button> : metrics.map((m, i) => { const Icon = i === 0 ? Layers3 : i === 1 ? Blocks : Smile; return <div className="metric" key={m.id}><div className="metric-value" dir="ltr">{m.english}<span>{m.detail}</span></div><span className="metric-label"><Icon size={15} strokeWidth={1.5}/>{m.title}</span></div> })}
  </section>
}
