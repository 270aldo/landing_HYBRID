# Prompt para Claude Code — Visual Integration

Lee el archivo `VISUAL_STRATEGY_BRIEF.md` completo antes de empezar.

## Contexto
El archivo principal es `ngx-hybrid-web/app/page.tsx` (~970 líneas). Ya tiene un `VISUAL_ASSETS` const y slots de imagen con badges "Slot foto 01/02/03". Necesitamos integrar las imágenes reales de fitness+tech.

## Pre-requisito
El usuario debe haber copiado las 7 imágenes nuevas a `/public/images/brand/` con estos nombres exactos:
- `genesis-coaching-squat.png`
- `gym-premium-empty.png`
- `genesis-gym-data.png`
- `genesis-gym-team.png`
- `genesis-hologram-panels.png`
- `genesis-programming.png`
- `aldo-genesis-portrait.png`

Si los archivos no existen, PREGUNTA al usuario antes de continuar.

## Tareas en orden

### 1. Actualizar VISUAL_ASSETS
Reemplazar el const `VISUAL_ASSETS` existente con:
```tsx
const VISUAL_ASSETS = {
  diagnosticTraining: "/images/brand/genesis-coaching-squat.png",
  diagnosticRecovery: "/images/brand/gym-premium-empty.png",
  videoThumbnail: "/images/brand/genesis-hologram-panels.png",
  mechanismContext: "/images/brand/genesis-gym-data.png",
  processAdaptive: "/images/brand/genesis-programming.png",
  processContext: "/images/brand/genesis-gym-team.png",
  offerFounder: "/images/brand/aldo-genesis-portrait.png",
  genesisAvatar: "/images/brand/genesis-solo.png",
  ctaBackground: "/images/brand/genesis-coaching-squat.png",
} as const;
```

### 2. Actualizar copy de overlays en Diagnóstico
En la sección diagnóstico (2 support-media articles):
- Foto 01 (izq): Cambiar alt a "GENESIS analizando biomecánica durante sesión de fuerza". Cambiar copy overlay: label "Sistema activo", text "GENESIS analizando biomecánica en tiempo real durante tu sesión"
- Foto 02 (der): Cambiar alt a "Gym premium adaptado a tu vida real". Cambiar copy overlay: label "Tu espacio", text "Tu espacio. Tu ritmo. Sin reglas genéricas."
- ELIMINAR los badges `<span>` que dicen "Slot foto 01" y "Slot foto 02"

### 3. Actualizar la sección Proceso fotos
- Foto izquierda: Cambiar src a `VISUAL_ASSETS.processAdaptive`. Alt: "GENESIS diseñando periodización personalizada". Copy: label "Programación inteligente", text "GENESIS diseñando tu periodización basada en datos reales"
- Foto derecha: Ya usa `VISUAL_ASSETS.processContext` — cambiar alt a "Comunidad NGX en gym futurista con sistema de datos integrado". Copy: label "Comunidad + Sistema", text "No estás solo. Tu equipo y la tecnología trabajan contigo."
- ELIMINAR el badge "Slot foto 03"

### 4. Actualizar video thumbnail
El video thumbnail ya usa `VISUAL_ASSETS.videoThumbnail` — solo cambiar el alt text a "GENESIS mostrando paneles holográficos de análisis fitness". ELIMINAR el badge "Slot video VSL".

### 5. Agregar mini imagen en sección Mecanismo (columna izquierda)
Después del bloque `<div className="bg-black/30 p-4 rounded-lg...">` (el code demo), agregar:
```tsx
<div className="mt-5 support-media rounded-xl overflow-hidden border border-white/10 min-h-[140px]">
  <Image
    src={VISUAL_ASSETS.mechanismContext}
    alt="GENESIS monitoreando sesión en gym con datos holográficos"
    fill
    sizes="(max-width: 768px) 100vw, 40vw"
    className="object-cover"
  />
  <div className="support-media-overlay" />
  <div className="support-media-copy">
    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-200 mb-1">En la práctica</p>
    <p className="text-sm text-white font-medium">Así se ve el sistema funcionando en tu sesión real</p>
  </div>
</div>
```

### 6. Agregar tira founder en sección Oferta
Después del `<div className="accent-line mb-5" />` y antes del div con flex de CTA, agregar:
```tsx
<div className="support-media rounded-xl overflow-hidden border border-white/10 min-h-[160px] mb-6">
  <Image
    src={VISUAL_ASSETS.offerFounder}
    alt="Aldo y GENESIS — el equipo detrás de tu Season"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover object-[50%_30%]"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-300 mb-1">El equipo detrás de tu Season</p>
      <p className="text-lg text-white font-semibold">Aldo + GENESIS. Decisiones humanas + inteligencia artificial.</p>
    </div>
  </div>
</div>
```

### 7. Mejorar iconos de Creencias
Agregar `Dumbbell, Target` al import de lucide-react. En la sección "Cambio de creencias":
- Card 1 ("músculo es seguro de vida"): Cambiar `<Activity>` por `<Dumbbell>`
- Card 2 ("falta de sistema"): Cambiar `<Route>` por `<Target>`
- Card 3 ("plan debería adaptarse"): Mantener `<RefreshCw>` — ya es correcto

### 8. Avatar GENESIS en modal
En el modal de GENESIS (agentModalOpen), en el header donde dice "GENESIS - NGX", agregar un avatar antes del título:
```tsx
<div className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#6D00FF]/40 flex-shrink-0">
    <Image
      src={VISUAL_ASSETS.genesisAvatar}
      alt="GENESIS"
      width={40}
      height={40}
      className="object-cover object-[50%_20%]"
    />
  </div>
  <h3 className="font-space text-xl font-semibold">GENESIS - NGX</h3>
</div>
```

### 9. Background sutil en CTA Final
En la sección CTA final (la que dice "No necesitas más información"), envolver el contenido en un div con background image:
```tsx
<article className="reveal glass-panel card-offer rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
  {/* Background image sutil */}
  <div className="absolute inset-0 opacity-[0.08]">
    <Image
      src={VISUAL_ASSETS.ctaBackground}
      alt=""
      fill
      className="object-cover"
      aria-hidden="true"
    />
  </div>
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
  <div className="relative z-10">
    {/* ... existing content ... */}
  </div>
</article>
```

### 10. Fix duplicate trackEvent calls
En la sección "agente" (agent_open_click), hay dos trackEvent calls seguidas. Remover la primera (`agent_open_click`) y dejar solo `cta_genesis_agente`.
Lo mismo en los otros lugares donde hay duplicados (`agent_schedule_click` + `cta_schedule_agente`, etc.).

## Verificación
Después de aplicar:
1. Confirma que no hay errores de TypeScript
2. Verifica que todos los `VISUAL_ASSETS.*` references son válidos
3. Confirma que no quedan badges "Slot foto" o "Slot video VSL"
4. Verifica que no hay `trackEvent` duplicados
