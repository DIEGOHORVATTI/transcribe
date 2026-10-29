import { YoutubeTranscript } from 'youtube-transcript'

export type Transcript = { title: string; text: string; url: string }

const fetchTitle = async (url: string): Promise<string | null> => {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`)
    if (!res.ok) return null
    const json = (await res.json()) as { title?: string }
    return json.title ?? null
  } catch {
    return null
  }
}

// ponytail: só a 1ª página da playlist (~100 vídeos); seguir a continuation token se precisar de mais
const listPlaylistVideoIds = async (list: string): Promise<string[]> => {
  const res = await fetch(`https://www.youtube.com/playlist?list=${encodeURIComponent(list)}`)
  const html = await res.text()
  const ids = [...new Set([...html.matchAll(/"videoId":"([\w-]{11})"/g)].map((m) => m[1] as string))]
  if (!ids.length) throw new Error('Nenhum vídeo encontrado na playlist (privada ou vazia?)')
  return ids
}

export const fetchTranscript = async (url: string): Promise<Transcript> => {
  const parts = await YoutubeTranscript.fetchTranscript(url)
  const text = parts.map((p) => p.text).join(' ')
  return { title: (await fetchTitle(url)) ?? url, text, url }
}

export const fetchPlaylist = async (list: string): Promise<Transcript[]> => {
  const ids = await listPlaylistVideoIds(list)
  const results = await Promise.all(
    ids.map((id) => fetchTranscript(`https://www.youtube.com/watch?v=${id}`).catch(() => null)),
  )
  return results.filter((t): t is Transcript => t !== null && t.text.trim() !== '')
}
