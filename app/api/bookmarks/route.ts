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
  try {
    const body = await req.json()
    const { url, tag = 'tools' } = body

    if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 })

    const fullUrl = url.startsWith('http') ? url : `https://${url}`
    const domain = extractDomain(fullUrl)

    // Generate screenshot URL once and store it — never called again on page load
    const key = process.env.APIFLASH_KEY
    const screenshot = key
      ? `https://api.apiflash.com/v1/urltoimage?access_key=${key}&url=${encodeURIComponent(fullUrl)}&width=1280&height=800&format=jpeg&quality=80&full_page=true&no_cookie_banners=true&no_ads=true&delay=2`
      : null

    const bookmark = await prisma.bookmark.create({
      data: {
        url: fullUrl,
        domain,
        title: domain,
        tag,
        screenshot,
      },
    })

    return NextResponse.json(bookmark, { status: 201 })
  } catch (err) {
    console.error('[POST /api/bookmarks]', err)
    return NextResponse.json({ error: 'Failed to save bookmark' }, { status: 500 })
  }
}
