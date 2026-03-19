import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'url param required' }, { status: 400 })
  }

  const fullUrl = url.startsWith('http') ? url : `https://${url}`

  try {
    const chromium = (await import('@sparticuz/chromium-min')).default
    const puppeteer = (await import('puppeteer-core')).default

    chromium.setHeadlessMode = true
    chromium.setGraphicsMode = false

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1280, height: 800 },
      executablePath: await chromium.executablePath(
        'https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar'
      ),
      headless: true,
    })

    const page = await browser.newPage()

    await page.goto(fullUrl, {
      waitUntil: 'networkidle2',
      timeout: 15000,
    })

    await new Promise(r => setTimeout(r, 1000))

    const screenshot = await page.screenshot({
      type: 'jpeg',
      quality: 80,
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    })

    await browser.close()

    return new NextResponse(screenshot, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    })
  } catch (err) {
    console.error('[screenshot]', err)
    return NextResponse.json({ error: 'Screenshot failed' }, { status: 500 })
  }
}
