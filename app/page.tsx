'use client'
import { useState, useEffect, useCallback } from 'react'
import Nav from '@/components/Nav'
import BookmarkCard from '@/components/BookmarkCard'
import AddModal from '@/components/AddModal'
import DeleteModal from '@/components/DeleteModal'
import Toast from '@/components/Toast'
import { Bookmark, Tag, TAGS } from '@/lib/types'

const ALL_TAGS = ['all', ...TAGS] as const
type FilterTag = 'all' | Tag

export default function LibraryPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [activeTag, setActiveTag] = useState<FilterTag>('all')
  const [sort, setSort] = useState<'latest' | 'az'>('latest')
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchBookmarks = useCallback(async () => {
    const params = new URLSearchParams()
    if (activeTag !== 'all') params.set('tag', activeTag)
    if (search) params.set('q', search)
    const res = await fetch(`/api/bookmarks?${params}`)
    const data = await res.json()
    setBookmarks(data)
    setLoading(false)
  }, [activeTag, search])

  useEffect(() => { fetchBookmarks() }, [fetchBookmarks])

  // Keyboard shortcut ⌘K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setAddOpen(true) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleAdd = async (url: string, tag: Tag) => {
    const res = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, tag }),
    })
    if (res.ok) {
      setAddOpen(false)
      await fetchBookmarks()
      setToast('Bookmark saved')
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await fetch(`/api/bookmarks/${deleteId}`, { method: 'DELETE' })
    setDeleteId(null)
    await fetchBookmarks()
    setToast('Bookmark removed')
  }

  const displayed = [...bookmarks].sort((a, b) =>
    sort === 'az' ? a.title.localeCompare(b.title) : 0
  )

  return (
    <>
      <Nav onAdd={() => setAddOpen(true)} />

      <main style={{ maxWidth: '1420px', margin: '0 auto', padding: '0 2.5rem 5rem' }}>
        {/* Page header */}
        <div style={{ padding: '3.5rem 0 2.5rem' }}>
          <h1 style={{ fontFamily: 'Inter', fontSize: '72px', fontWeight: 600, letterSpacing: '-0.045em', color: '#f0f0f0', lineHeight: 0.95 }}>
            Library
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 300, color: '#555', marginTop: '14px', letterSpacing: '-0.01em', lineHeight: 1.6 }}>
            All your saved sites, visually.
          </p>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {ALL_TAGS.map(t => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                style={{
                  fontFamily: 'Inter', fontSize: '16px', fontWeight: 400,
                  color: activeTag === t ? '#f0f0f0' : '#555',
                  background: activeTag === t ? 'rgba(255,255,255,0.03)' : 'transparent',
                  border: `1px solid ${activeTag === t ? 'rgba(255,255,255,0.26)' : 'rgba(255,255,255,0.07)'}`,
                  padding: '5px 13px', borderRadius: '4px', cursor: 'pointer',
                  letterSpacing: '-0.02em', textTransform: 'capitalize', transition: 'all 0.15s',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {(['latest', 'az'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSort(s)}
                style={{
                  fontFamily: 'Inter', fontSize: '16px', fontWeight: 400,
                  color: sort === s ? '#f0f0f0' : '#555',
                  background: 'transparent',
                  border: `1px solid ${sort === s ? 'rgba(255,255,255,0.26)' : 'rgba(255,255,255,0.07)'}`,
                  padding: '5px 14px', borderRadius: '4px', cursor: 'pointer',
                  letterSpacing: '-0.02em', transition: 'all 0.15s',
                }}
              >
                {s === 'latest' ? 'Latest' : 'A – Z'}
              </button>
            ))}
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              style={{
                width: '200px', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f0f0f0', fontFamily: 'Inter', fontSize: '16px',
                padding: '5px 13px', outline: 'none', borderRadius: '4px',
                letterSpacing: '-0.02em', transition: 'border-color 0.15s, width 0.2s',
              }}
              onFocus={e => { e.target.style.borderColor = 'rgba(255,255,255,0.28)'; e.target.style.width = '260px' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.width = '200px' }}
            />
          </div>
        </div>

        {/* Section label */}
        <p style={{ fontFamily: 'Inter', fontSize: '10.5px', fontWeight: 500, letterSpacing: '0.09em', color: '#242424', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          {sort === 'az' ? 'A – Z' : 'Recent'}
        </p>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 416px)', gap: '2rem' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ width: 416, height: 500, background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px' }} />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6rem 0', gap: '8px' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '22px', fontWeight: 500, color: '#f0f0f0', letterSpacing: '-0.03em' }}>Nothing here yet</p>
            <p style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 300, color: '#555', textAlign: 'center', maxWidth: '260px', lineHeight: 1.7 }}>
              Add your first bookmark or try a different filter.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 416px)', gap: '2rem' }}>
            {displayed.map(b => (
              <BookmarkCard key={b.id} bookmark={b} onDelete={id => setDeleteId(id)} />
            ))}
          </div>
        )}
      </main>

      <AddModal open={addOpen} onClose={() => setAddOpen(false)} onSave={handleAdd} />
      <DeleteModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} />
      <Toast message={toast} onDone={() => setToast(null)} />
    </>
  )
}
