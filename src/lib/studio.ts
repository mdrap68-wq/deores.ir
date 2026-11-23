import { useCallback, useEffect, useState } from 'react'

export interface Project {
  id: number
  slug: string
  name: string
  brand: string
  category: string
  headline: string
  description: string
  solution: string
  deliverables: string[]
  image: string
  color: string
  sort_order: number
  websiteUrl?: string
}
export interface Editorial {
  id: number
  kind: string
  slug: string
  title: string
  english: string
  summary: string
  detail: string
  media: string
  sort_order: number
}
export type DialogState = { type: 'consultation'; service?: string; brief?: string } | { type: 'project'; project: Project; fromGallery?: boolean } | { type: 'gallery' } | { type: 'about' } | { type: 'contact' } | null
export type OpenDialog = (state: DialogState) => void
export const faNumber = (n: number | string) => String(n).replace(/\d/g, c => '۰۱۲۳۴۵۶۷۸۹'[Number(c)])
export const latinDigits = (s: string) => s.replace(/[۰-۹]/g, c => String(c.charCodeAt(0) - 1776)).replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 1632))
export function useList<T>(endpoint: string) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [revision, setRevision] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    fetch(endpoint, { signal: controller.signal }).then(async res => {
      if (!res.ok) throw new Error('Read failed')
      const data = await res.json()
      if (!Array.isArray(data)) throw new Error('Invalid response')
      setItems(data)
    }).catch(() => { if (!controller.signal.aborted) setError(true) }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [endpoint, revision])
  const retry = useCallback(() => {
    setError(false)
    setLoading(true)
    setRevision(n => n + 1)
  }, [])
  return { items, loading, error, retry }
}
