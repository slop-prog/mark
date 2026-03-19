'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavProps {
  onAdd: () => void
}

const AVATAR_COLORS = [
  { bg: '#4285F4', text: '#fff' },
  { bg: '#EA4335', text: '#fff' },
  { bg: '#34A853', text: '#fff' },
  { bg: '#FBBC04', text: '#1a1a1a' },
  { bg: '#FF6D00', text: '#fff' },
  { bg: '#7C3AED', text: '#fff' },
  { bg: '#0EA5E9', text: '#fff' },
  { bg: '#10B981', text: '#fff' },
]
const avatarColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]

export default function Nav({ onAdd }: NavProps) {
  const pathname = usePathname()

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      padding: '0 2.5rem', height: '52px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <Link href="/" style={{
        fontFamily: 'Inter', fontSize: '17px', fontWeight: 600,
        letterSpacing: '-0.03em', color: '#f0f0f0',
        display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none',
      }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#f0f0f0' }} />
        mark
      </Link>

      <div style={{ display: 'flex', alignItems: 'stretch', height: '52px' }}>
        {[{ label: 'Library', href: '/' }, { label: 'Explore', href: '/explore' }].map(({ label, href }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} style={{
              fontFamily: 'Inter', fontSize: '16px', fontWeight: 400,
              color: active ? '#f0f0f0' : '#555',
              padding: '0 16px', display: 'flex', alignItems: 'center',
              position: 'relative', textDecoration: 'none', transition: 'color 0.15s',
              letterSpacing: '-0.02em',
            }}>
              {label}
              {active && (
                <span style={{
                  position: 'absolute', bottom: 0, left: 16, right: 16,
                  height: 2, background: '#f0f0f0', borderRadius: '2px 2px 0 0',
                }} />
              )}
            </Link>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button onClick={onAdd} style={{
          fontFamily: 'Inter', fontSize: '16px', fontWeight: 400,
          color: '#080808', background: '#f0f0f0', border: 'none',
          padding: '0 16px', height: '32px', borderRadius: '4px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px',
          letterSpacing: '-0.02em',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="6" y1="1" x2="6" y2="11" /><line x1="1" y1="6" x2="11" y2="6" />
          </svg>
          Add
        </button>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: avatarColor.bg, color: avatarColor.text,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
        }}>
          H
        </div>
      </div>
    </nav>
  )
}
