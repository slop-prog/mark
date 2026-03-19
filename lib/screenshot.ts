export function screenshotUrl(url: string): string {
  const key = process.env.NEXT_PUBLIC_APIFLASH_KEY
  return `https://api.apiflash.com/v1/urltoimage?access_key=${key}&url=${encodeURIComponent(url)}&width=1280&height=800&format=jpeg&quality=80&full_page=true`
}

export function extractDomain(url: string): string {
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`)
      .hostname.replace('www.', '')
  } catch {
    return url
  }
}
