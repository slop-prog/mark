'use client'
import { useEffect, useRef, useState } from 'react'
import { Bookmark, TECH_MAP } from '@/lib/types'
import { screenshotUrl } from '@/lib/screenshot'

interface CardProps {
  bookmark: Bookmark
  onDelete: (id: string) => void
}

const iconExternal = (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
    <path d="M5.5 2.5H3a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V9M8.5 2.5H12m0 0V6m0-3.5L6 9" />
  </svg>
)
const iconX = (
  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ width: 10, height: 10 }}>
    <line x1="2" y1="2" x2="8" y2="8" /><line x1="8" y1="2" x2="2" y2="8" />
  </svg>
)

export default function BookmarkCard({ bookmark, onDelete }: CardProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [scale, setScale] = useState(0.3)

  const tech = TECH_MAP[bookmark.domain]
  const imgSrc = bookmark.screenshot || screenshotUrl(bookmark.url)

  useEffect(() => {
    const applyScale = () => {
      if (!outerRef.current || !innerRef.current) return
      const w = outerRef.current.getBoundingClientRect().width
      if (w > 0) setScale(w / 1280)
    }
    applyScale()
    window.addEventListener('resize', applyScale)
    return () => window.removeEventListener('resize', applyScale)
  }, [])

  return (
    <div style={{
      width: '416px', height: '500px',
      background: '#0e0e0e',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '10px', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      padding: '8px', gap: '8px',
      transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(255,255,255,0.13)'
        el.style.transform = 'translateY(-3px)'
        el.style.boxShadow = '0 14px 40px rgba(0,0,0,0.55)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Chrome bar */}
      <div style={{
        flexShrink: 0, height: '44px',
        background: '#0a0a0a', borderRadius: '6px',
        padding: '0 10px', display: 'flex', alignItems: 'center', gap: '8px',
        border: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: '#282828' }} />
          ))}
        </div>
        <div style={{
          flex: 1, minWidth: 0,
          background: '#070707', border: '1px solid rgba(255,255,255,0.04)',
          borderRadius: '4px', padding: '4px 10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {bookmark.domain}
          </span>
        </div>
        <button
          onClick={() => window.open(bookmark.url, '_blank')}
          style={{ width: 26, height: 26, flexShrink: 0, borderRadius: '4px', background: 'transparent', border: '1px solid rgba(255,255,255,0.05)', color: '#2c2c2c', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#2c2c2c'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
        >
          {iconExternal}
        </button>
        <button
          onClick={() => onDelete(bookmark.id)}
          style={{ width: 26, height: 26, flexShrink: 0, borderRadius: '4px', background: 'transparent', border: '1px solid rgba(255,255,255,0.05)', color: '#2c2c2c', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#e74c3c'; e.currentTarget.style.borderColor = 'rgba(231,76,60,0.3)'; e.currentTarget.style.background = 'rgba(231,76,60,0.07)' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#2c2c2c'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'transparent' }}
        >
          {iconX}
        </button>
      </div>

      {/* Screenshot */}
      <div ref={outerRef} style={{ flex: 1, position: 'relative', borderRadius: '6px', overflow: 'hidden', background: '#090909', minHeight: 0 }}>
        {/* Skeleton */}
        {!imgLoaded && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7, padding: 20, zIndex: 2 }}>
            {[100, 78, 100, 55, 70, 40, 65].map((w, i) => (
              <div key={i} className="shimmer" style={{ width: `${w}%`, height: i === 2 ? 48 : 7, borderRadius: 3 }} />
            ))}
          </div>
        )}

        {/* Scaled screenshot inner */}
        <div ref={innerRef} style={{ position: 'absolute', top: 0, left: 0, width: '1280px', transformOrigin: 'top left', transform: `scale(${scale})` }}>
          <img
            src={imgSrc}
            alt={bookmark.domain}
            style={{ width: '1280px', height: 'auto', display: 'block', opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
            onLoad={() => setImgLoaded(true)}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>

        {/* Tech badge */}
        {tech && imgLoaded && (
          <div style={{
            position: 'absolute', bottom: 10, right: 10, zIndex: 3,
            width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.78)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '7px', backdropFilter: 'blur(10px)',
          }}>
            <img
              src={tech.icon} alt={tech.name}
              style={{ width: 18, height: 18, objectFit: 'contain', filter: tech.invert ? 'invert(1)' : 'none' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
