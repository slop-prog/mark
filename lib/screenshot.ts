export function screenshotUrl(url: string): string {
  return `/api/screenshot?url=${encodeURIComponent(url)}`
}

export function extractDomain(url: string): string {
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`)
      .hostname.replace('www.', '')
  } catch {
    return url
  }
}
