export function getHostnameFromUrl(url: string): string | null {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (e) {
    console.error("Invalid URL:", url, e);
    return null;
  }
}
