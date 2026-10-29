#!/usr/bin/env bun
import { fetchPlaylist, fetchTranscript } from './youtube'

const url = process.argv[2]
if (!url) {
  console.error('uso: transcribe <url do vídeo ou playlist do YouTube>')
  process.exit(1)
}

try {
  const parsed = new URL(url)
  const list = parsed.searchParams.get('list')
  if (list && !parsed.searchParams.has('v')) {
    for (const t of await fetchPlaylist(list)) console.log(`# ${t.title}\n${t.url}\n\n${t.text}\n`)
  } else {
    console.log((await fetchTranscript(url)).text)
  }
} catch (e) {
  console.error((e as Error).message)
  process.exit(1)
}
