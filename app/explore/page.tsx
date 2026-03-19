'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import BookmarkCard from '@/components/BookmarkCard'
import AddModal from '@/components/AddModal'
import DeleteModal from '@/components/DeleteModal'
import Toast from '@/components/Toast'
import { Bookmark, Tag } from '@/lib/types'

export default function ExplorePage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [addOpen, setAddOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const fetchAll = async () => {
    const res = await fetch('/api/bookmarks')
    setBookmarks(await res.json())
  }

  useEffect(() => { fetchAll() }, [])

  const handleAdd = async (url: string, tag: Tag) => {
    const res = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, tag }),
    })
    if (res.ok) { setAddOpen(false); await fetchAll(); setToast('Bookmark saved') }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await fetch(`/api/bookmarks/${deleteId}`, { method: 'DELETE' })
    setDeleteId(null); await fetchAll(); setToast('Bookmark removed')
  }

  return (
    <>
      <Nav onAdd={() => setAddOpen(true)} />
      <main style={{ maxWidth: '1420px', margin: '0 auto', padding: '0 2.5rem 5rem' }}>
        <div style={{ padding: '3.5rem 0 2.5rem' }}>
          <h1 style={{ fontFamily: 'Inter', fontSize: '72px', fontWeight: 600, letterSpacing: '-0.045em', color: '#f0f0f0', lineHeight: 0.95 }}>
            Explore
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 300, color: '#555', marginTop: '14px', letterSpacing: '-0.01em', lineHeight: 1.6 }}>
            Browse and discover across your collection.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 416px)', gap: '2rem' }}>
          {bookmarks.map(b => (
            <BookmarkCard key={b.id} bookmark={b} onDelete={id => setDeleteId(id)} />
          ))}
        </div>
      </main>
      <AddModal open={addOpen} onClose={() => setAddOpen(false)} onSave={handleAdd} />
      <DeleteModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} />
      <Toast message={toast} onDone={() => setToast(null)} />
    </>
  )
}
