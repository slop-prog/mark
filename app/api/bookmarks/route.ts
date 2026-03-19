import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { extractDomain } from '@/lib/screenshot'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const tag = searchParams.get('tag')
  const q = searchParams.get('q')

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      ...(tag && tag !== 'all' ? { tag } : {}),
      ...(q ? {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { domain: { contains: q, mode: 'insensitive' } },
          { tag: { contains: q, mode: 'insensitive' } },
        ]
      } : {})
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(bookmarks)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { url, tag = 'tools' } = body

  if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })

  const fullUrl = url.startsWith('http') ? url : `https://${url}`
  const domain = extractDomain(fullUrl)

  const bookmark = await prisma.bookmark.create({
    data: {
      url: fullUrl,
      domain,
      title: domain,
      tag,
    },
  })

  return NextResponse.json(bookmark, { status: 201 })
}
