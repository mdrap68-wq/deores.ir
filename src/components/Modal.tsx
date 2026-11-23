import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export function Modal({ children, close, variant, identity }: { children: React.ReactNode; close: () => void; variant?: string; identity: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const closeRef = useRef(close)
  useEffect(() => { closeRef.current = close }, [close])
  useEffect(() => {
    const oldFocus = document.activeElement as HTMLElement | null
    const previous = document.body.style.overflow
    const appRoot = document.getElementById('root')
    const wasInert = appRoot?.inert ?? false
    if (appRoot) appRoot.inert = true
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current()
      if (e.key !== 'Tab' || !ref.current) return
      const nodes = Array.from(ref.current.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, select, textarea, [tabindex="0"]')).filter(n => n.offsetParent !== null)
      if (!nodes.length) { e.preventDefault(); return }
      const first = nodes[0], last = nodes[nodes.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = previous
      if (appRoot) appRoot.inert = wasInert
      document.removeEventListener('keydown', handler)
      oldFocus?.focus({ preventScroll: true })
    }
  }, [])
  useEffect(() => { if (ref.current) { ref.current.scrollTop = 0; ref.current.focus({ preventScroll: true }) } }, [identity])
  return createPortal(<div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) close() }}><div ref={ref} className={`modal ${variant || ''}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex={-1} dir="rtl"><button className="modal-close" onClick={close} aria-label="بستن پنجره"><X size={19}/></button>{children}</div></div>, document.body)
}
