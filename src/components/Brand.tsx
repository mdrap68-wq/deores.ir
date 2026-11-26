export function BrandMark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 52 52" fill="none" aria-hidden="true"><rect width="52" height="52" rx="17" fill="#F2622A"/><path d="M14 37.6C11.6 27.8 15.1 15.4 27.1 11.4L32.5 7.9L32 14.3L39 18.3L36.5 23.1L29.7 22.4C25.3 27.5 26.5 33.8 33.2 42.1C26 43.6 19.5 42.1 14 37.6Z" fill="#22231F"/><path d="M28 13.3C20.4 17.3 18.3 22 17.7 29.8C20.8 24.9 23.4 22.7 27.4 21.5L29.9 17.6L34.7 18.5L30.6 15.2L31 11.2L28 13.3Z" fill="#FFF8ED"/></svg>
}
export function Brand({ light = false }: { light?: boolean }) {
  return <span className={`brand ${light ? 'brand-light' : ''}`}><BrandMark className="brand-mark"/><span className="brand-lockup"><span className="brand-word">خاص<span className="brand-word-dot">.</span></span><span className="brand-tag" dir="ltr">khaslifestyle</span></span></span>
}
export function Spark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 48 48" fill="currentColor" aria-hidden="true"><path d="M20 1h8l-1.3 15.4L36.5 4.8 42.7 10 31.9 21l15.1-1v8l-15.1-1.3 10.7 11.1-6.2 5.2-9.7-12.2L28 47h-8l1.2-16.2-9.7 12.1-6.2-5.2 10.8-11L1 28v-8l15.1 1L5.3 10l6.2-5.2 9.8 11.6L20 1Z"/></svg>
}
export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span className="eyebrow-rule"/><span dir="ltr">{children}</span></div>
}
