'use client'
import { useEffect, useState } from 'react'

interface ToastProps {
  message: string | null
  onDone: () => void
}

export default function Toast({ message, onDone }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!message) return
    setVisible(true)
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300) }, 2200)
    return () => clearTimeout(t)
  }, [message, onDone])

  return (
    <div style={{
      position: 'fixed', bottom: '28px', left: '50%',
      transform: `translateX(-50%) translateY(${visible ? '0' : '70px'})`,
      background: '#f0f0f0', color: '#080808',
      fontFamily: 'Inter', fontSize: '13px', fontWeight: 500,
      padding: '9px 18px', borderRadius: '4px',
      transition: 'transform 0.32s cubic-bezier(0.34,1.56,0.64,1)',
      zIndex: 400, whiteSpace: 'nowrap', pointerEvents: 'none',
      letterSpacing: '-0.02em',
    }}>
      {message}
    </div>
  )
}
