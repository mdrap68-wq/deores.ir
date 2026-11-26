import { useEffect, useRef, useState } from 'react'
import { ArrowUpLeft, ChevronDown, Menu, X, PanelsTopLeft, Store, PenTool } from 'lucide-react'
import { Brand } from './Brand'
import type { Editorial, OpenDialog } from '../lib/studio'

export function Header({ services, open, chooseService }: { services: Editorial[]; open: OpenDialog; chooseService: (slug: string) => void }) {
  const [menu, setMenu] = useState(false)
  const [drop, setDrop] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const outside = (e: PointerEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setDrop(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setDrop(false); setMenu(false) } }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', esc) }
  }, [])
  const closeNav = () => { setMenu(false); setDrop(false) }
  return <header className="site-header"><div className="page-width header-inner">
    <a href="#top" className="brand-link" aria-label="خاص لایف استایل؛ صفحه اصلی" onClick={closeNav}><Brand/></a>
    <nav className="desktop-nav" aria-label="ناوبری اصلی">
      <div className="nav-dropdown" ref={navRef}><button className={`nav-item service-nav ${drop ? 'is-open' : ''}`} type="button" aria-expanded={drop} aria-controls="services-dropdown" onClick={() => setDrop(v => !v)}>خدمات خاص لایف استایل <ChevronDown size={13}/></button>
        {drop && <div className="dropdown-panel" id="services-dropdown"><span className="dropdown-kicker" dir="ltr">OUR EXPERTISE</span>{services.map((service, i) => { const Icon = i === 0 ? PanelsTopLeft : i === 1 ? Store : PenTool; return <button key={service.id} onClick={() => { chooseService(service.slug); closeNav() }}><span className="dropdown-icon"><Icon size={18}/></span>{service.title}<ArrowUpLeft size={15}/></button> })}<a href="#services" onClick={closeNav}>آشنایی با خدمات خاص لایف استایل <ArrowUpLeft size={14}/></a></div>}
      </div>
      <a className="nav-item" href="#work">نمونه‌کارها</a><a className="nav-item" href="#process">فرآیند همکاری</a><button className="nav-item" onClick={() => open({ type: 'about' })}>درباره ما</button><button className="nav-item" onClick={() => open({ type: 'contact' })}>تماس با ما</button>
    </nav>
    <div className="header-actions"><button className="header-cta" onClick={() => { closeNav(); open({ type: 'consultation' }) }}>درخواست مشاوره <span className="cta-icon"><ArrowUpLeft size={17}/></span></button><button className="menu-toggle" onClick={() => setMenu(v => !v)} aria-label={menu ? 'بستن منو' : 'باز کردن منو'} aria-expanded={menu} aria-controls="mobile-nav">{menu ? <X size={22}/> : <Menu size={22}/>}</button></div>
  </div>{menu && <nav className="mobile-nav" id="mobile-nav" aria-label="منوی موبایل"><a href="#services" onClick={closeNav}>خدمات خاص لایف استایل <ArrowUpLeft size={17}/></a><a href="#work" onClick={closeNav}>نمونه‌کارها <ArrowUpLeft size={17}/></a><a href="#process" onClick={closeNav}>فرآیند همکاری <ArrowUpLeft size={17}/></a><button onClick={() => { closeNav(); open({ type: 'about' }) }}>درباره ما <ArrowUpLeft size={17}/></button><button onClick={() => { closeNav(); open({ type: 'contact' }) }}>تماس با ما <ArrowUpLeft size={17}/></button></nav>}</header>
}
