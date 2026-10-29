# transcribe

CLI que baixa a transcrição (legendas) de vídeos e playlists do YouTube.

## Instalar

Requer [Bun](https://bun.sh).

```bash
git clone https://github.com/DIEGOHORVATTI/transcribe.git
cd transcribe
bun install
bun link
```

## Usar

```bash
transcribe 'https://www.youtube.com/watch?v=ID' > video.txt
transcribe 'https://www.youtube.com/playlist?list=ID' > playlist.txt
```

- Vídeo: imprime o texto da transcrição.
- Playlist: imprime cada vídeo com `# título`, URL e texto; pula os que não têm legenda.
- Link de vídeo dentro de playlist (`watch?v=...&list=...`) transcreve só o vídeo.

Limite: só a primeira página da playlist (~100 vídeos).

## Licença

MIT
