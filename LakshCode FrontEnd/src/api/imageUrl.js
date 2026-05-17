const BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:8080'

export function imgUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return BASE + path
}