'use client'
import { useEffect } from 'react'

interface DeleteModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteModal({ open, onClose, onConfirm }: DeleteModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(16px)',
        zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{
        background: '#111', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', padding: '14px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '16px', minWidth: '320px', maxWidth: '400px',
      }}>
        <p style={{ fontSize: '13px', fontWeight: 400, color: '#f0f0f0', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
          Delete bookmark?
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              fontFamily: 'Inter', fontSize: '12px', fontWeight: 400,
              color: '#555', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '6px 12px', borderRadius: '5px', cursor: 'pointer',
              letterSpacing: '-0.01em', transition: 'all 0.12s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f0f0f0'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              fontFamily: 'Inter', fontSize: '12px', fontWeight: 500,
              color: '#fff', background: '#c0392b',
              border: 'none', padding: '6px 12px', borderRadius: '5px',
              cursor: 'pointer', letterSpacing: '-0.01em', transition: 'opacity 0.12s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
