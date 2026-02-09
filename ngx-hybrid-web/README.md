# NGX HYBRID Web

Landing oficial de NGX HYBRID construida en Next.js (App Router) con base visual en la variante tipografica A (`Sora + JetBrains Mono`).

## Stack

- Next.js 16
- React 19
- Tailwind CSS v4
- `lucide-react` para iconografia

## Setup local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrir: `http://localhost:3000`

## Variables de entorno

Definidas en `.env.example`:

- `NEXT_PUBLIC_APPLY_URL`
- `NEXT_PUBLIC_TEAM_CONTACT_URL`
- `NEXT_PUBLIC_VSL_URL`
- `NEXT_PUBLIC_SCHEDULE_URL`
- `NEXT_PUBLIC_N8N_WEBHOOK_FUNNEL` (opcional)
- `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` (reservada)

## Funnel events (n8n)

La landing envia eventos de conversion a `window.dataLayer` y, opcionalmente, al webhook de n8n cuando `NEXT_PUBLIC_N8N_WEBHOOK_FUNNEL` esta configurado.

Payload base:

```json
{
  "event": "cta_apply_hero",
  "payload": {
    "section": "hero",
    "href": "https://..."
  },
  "ts": "2026-02-08T23:10:00.000Z",
  "source": "ngx-hybrid-web"
}
```

## Deploy (Vercel)

1. Importar carpeta `ngx-hybrid-web` en Vercel.
2. Configurar variables de entorno del proyecto.
3. Deploy a preview/production.

## Siguientes integraciones

1. Embed de agente conversacional ElevenLabs en `#elevenlabs-convai-container`.
2. Flujo n8n para enrutamiento de leads (funnel, agenda, llamadas).
3. Conexion CRM (fase siguiente).
