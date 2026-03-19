export function screenshotUrl(url: string): string {
  return `https://image.thum.io/get/width/1280/crop/5000/noanimate/${encodeURIComponent(url)}`
}

export function extractDomain(url: string): string {
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`)
      .hostname.replace('www.', '')
  } catch {
    return url
  }
}
