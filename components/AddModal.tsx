'use client'
import { useState, useEffect, useRef } from 'react'
import { TAGS, Tag } from '@/lib/types'

interface AddModalProps {
  open: boolean
  onClose: () => void
  onSave: (url: string, tag: Tag) => Promise<void>
}

export default function AddModal({ open, onClose, onSave }: AddModalProps) {
  const [url, setUrl] = useState('')
  const [tag, setTag] = useState<Tag>('tools')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80)
    else { setUrl(''); setTag('tools') }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSave = async () => {
    if (!url.trim()) return
    setLoading(true)
    try { await onSave(url.trim(), tag) } finally { setLoading(false) }
  }

  if (!open) return null

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(16px)',
        zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{
        background: '#111', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', padding: '22px', width: '400px', maxWidth: '92vw',
      }}>
        <p style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '-0.03em', color: '#f0f0f0', marginBottom: '12px' }}>
          Save a bookmark
        </p>

        <input
          ref={inputRef}
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          placeholder="https://example.com"
          type="url"
          style={{
            width: '100%', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            color: '#f0f0f0', fontFamily: 'Inter', fontSize: '13px',
            padding: '9px 12px', borderRadius: '6px', outline: 'none',
            marginBottom: '12px', letterSpacing: '-0.01em',
          }}
          onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)'; e.target.style.background = 'rgba(255,255,255,0.06)' }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
        />

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 0 12px' }} />

        <p style={{ fontSize: '10px', fontWeight: 500, color: '#333', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          Tag
        </p>

        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {TAGS.map(t => (
            <button
              key={t}
              onClick={() => setTag(t)}
              style={{
                fontFamily: 'Inter', fontSize: '12px', fontWeight: 400,
                color: tag === t ? '#f0f0f0' : '#555',
                background: tag === t ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: `1px solid ${tag === t ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.07)'}`,
                padding: '4px 11px', borderRadius: '4px', cursor: 'pointer',
                letterSpacing: '-0.01em', textTransform: 'capitalize',
                transition: 'all 0.12s',
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={loading || !url.trim()}
          style={{
            width: '100%', fontFamily: 'Inter', fontSize: '13px', fontWeight: 500,
            color: '#080808', background: loading ? '#aaa' : '#efefef',
            border: 'none', padding: '11px', borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            letterSpacing: '-0.01em', transition: 'opacity 0.12s',
          }}
        >
          {loading ? 'Saving…' : 'Save bookmark'}
        </button>
      </div>
    </div>
  )
}
