import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) return NextResponse.json({ error: 'url required' }, { status: 400 })

  const key = process.env.APIFLASH_KEY
  const apiUrl = `https://api.apiflash.com/v1/urltoimage?access_key=${key}&url=${encodeURIComponent(url)}&width=1280&height=800&format=jpeg&quality=80&full_page=true&no_cookie_banners=true&no_ads=true&delay=2`

  const res = await fetch(apiUrl)
  const buffer = await res.arrayBuffer()

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=604800',
    },
  })
}
