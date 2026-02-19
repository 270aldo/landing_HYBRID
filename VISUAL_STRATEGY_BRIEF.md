# NGX HYBRID Landing — Visual Strategy Brief
## "Dark Tech Fitness" — El oro entre tecnología y fitness

---

## INVENTARIO DE ASSETS DISPONIBLES

### Ya en proyecto (`/public/images/brand/`)
| ID | Archivo | Descripción | Tipo |
|----|---------|-------------|------|
| A1 | `genesis-duo.png` | Aldo + GENESIS portrait, sunset/smoke cinematic | Founder + AI |
| A2 | `genesis-solo.png` | GENESIS en lab oscuro manipulando holograma DNA violeta | Tech puro |

### Nuevos assets compartidos (7 imágenes — necesitan subirse a `/public/images/brand/`)
| ID | Nombre sugerido | Descripción | Tipo |
|----|----------------|-------------|------|
| B1 | `genesis-gym-data.png` | GENESIS en gym con displays holográficos de datos, racks visibles | Tech + Fitness |
| B2 | `genesis-gym-team.png` | GENESIS + 2 personas en gym futurista circular, data wall, skyline | Comunidad + Tech |
| B3 | `genesis-coaching-squat.png` | GENESIS escaneando/coaching durante squat con barra, violet beams | ACCIÓN fitness + Tech |
| B4 | `gym-premium-empty.png` | Gym premium dark, sin personas, skyline nocturno, mancuernas | Ambiente aspiracional |
| B5 | `genesis-hologram-panels.png` | GENESIS full body en server room con paneles holográficos fitness | Tech dashboard |
| B6 | `genesis-programming.png` | GENESIS con hologramas de programación, volumen, biomecánica | Tech programming |
| B7 | `aldo-genesis-portrait.png` | Aldo (con gorra) + GENESIS cinematic portrait | Founder + AI v2 |

### Video a generar (VEO 3.1)
| ID | Tipo | Descripción |
|----|------|-------------|
| V1 | Hero background loop | Mood reel: GENESIS + entrenamiento + datos |
| V2 | VSL placeholder | Teaser 30-60s del mecanismo HYBRID |

---

## PRINCIPIO VISUAL: "DARK TECH FITNESS"

**Regla de oro**: Cada imagen tiene que comunicar DOS cosas simultáneamente:
1. **Tecnología/IA** — Holograms, data, GENESIS, código, métricas
2. **Cuerpo/Fitness** — Movimiento, gym, músculo, esfuerzo, resultados

**Nunca** solo tech (parece SaaS). **Nunca** solo gym (parece app genérica).

**Color bridge**: El violeta (#6D00FF) es lo que conecta ambos mundos — aparece en los ojos de GENESIS, en los hologramas, y en el glow del equipment.

---

## MAPA DE COLOCACIÓN POR SECCIÓN

### 1. HERO (líneas ~274-341)
**Estado actual**: Sin imagen, solo texto + KPIs + UnicornStudio background
**Propuesta**: Mantener limpio. El UnicornStudio ya da el mood tech. NO agregar imagen aquí — dejar que el copy respire.
**Cambio opcional**: Agregar un sutil badge visual con el logo GENESIS al lado del cohort badge.

### 2. DIAGNÓSTICO — Slot Foto 01 + 02 (líneas ~384-419)
**Estado actual**: Usa `genesis-duo.png` y `genesis-solo.png` con badges "Slot foto 01/02"
**Propuesta**:

| Slot | Asset actual | Asset nuevo | Razón |
|------|-------------|-------------|-------|
| Foto 01 (izq) | `genesis-duo.png` | **B3** `genesis-coaching-squat.png` | ACCIÓN real de fitness + tech scanning. Comunica "sistema que trabaja contigo" |
| Foto 02 (der) | `genesis-solo.png` | **B4** `gym-premium-empty.png` | Ambiente aspiracional, "vida real premium". Contraste: el gym existe en TU mundo |

**Copy overlay actualizado**:
- Foto 01: "Sistema activo" → "GENESIS analizando biomecánica en tiempo real durante tu sesión"
- Foto 02: "Vida real" → "Tu espacio. Tu ritmo. Sin reglas genéricas."

### 3. CAMBIO DE CREENCIAS (líneas ~442-503)
**Estado actual**: Solo texto, sin imágenes
**Propuesta**: Agregar iconografía fitness dentro de cada card (no fotos completas — mantener el layout limpio)

**Implementación**: Reemplazar los iconos genéricos de Lucide por iconos que reflejen el contenido:
| Card | Icono actual | Icono propuesto | Concepto |
|------|-------------|----------------|----------|
| "Músculo es seguro de vida" | Activity | `Dumbbell` (lucide) o custom SVG de bícep | Fuerza muscular |
| "Falta de sistema" | Route | `Target` o `Crosshair` | Sistema con dirección |
| "Plan debería adaptarse" | RefreshCw | `Calendar` + `RefreshCw` combinado | Adaptación temporal |

### 4. MECANISMO — El Sistema + Video VSL (líneas ~505-578)
**Estado actual**: Mini demo código + video thumbnail con `genesis-duo.png`
**Propuesta**: Esta es la sección más crítica visualmente.

| Elemento | Asset actual | Asset nuevo | Razón |
|----------|-------------|-------------|-------|
| Video thumbnail | `genesis-duo.png` | **B5** `genesis-hologram-panels.png` | Muestra literalmente lo que GENESIS hace: analiza, programa, ajusta. Perfecto para VSL thumbnail |
| Debajo del código | Nada | **B1** `genesis-gym-data.png` (pequeño, como support-media) | Refuerza: "esto pasa en un gym real, no solo en una pantalla" |

**Cambio estructural sugerido**: Agregar una tercera mini-imagen debajo del code block en la columna izquierda:
```
[Código demo contextual]
[Mini imagen: B1 - GENESIS en gym con datos]
Caption: "Así se ve en la práctica"
```

### 5. PROCESO — 3 Pasos + Slot Foto 03 (líneas ~581-650)
**Estado actual**: 3 cards de pasos + 2 support-media images
**Propuesta**:

| Slot | Asset actual | Asset nuevo | Razón |
|------|-------------|-------------|-------|
| Foto izq (sistema adaptativo) | `genesis-solo.png` | **B6** `genesis-programming.png` | GENESIS mostrando la programación/periodización — más específico y fitness |
| Foto der (Slot 03) | `genesis-duo.png` | **B2** `genesis-gym-team.png` | Comunidad, gym futurista, datos en pared. Comunica "no estás solo + tech embedded" |

### 6. GARANTÍA (líneas ~653-676)
**Estado actual**: Solo texto con ícono ShieldCheck
**Propuesta**: Mantener limpio. La garantía debe ser TEXTO PURO para máxima credibilidad. Sin imágenes.

### 7. OFERTA — 12 Semanas (líneas ~678-726)
**Estado actual**: Lista de valor + CTA
**Propuesta**: Agregar una imagen sutil junto a la lista de valor.

**Implementación**: Después de la lista de checkmarks, antes del CTA, agregar una tira horizontal:
```
[B7: aldo-genesis-portrait.png] con gradient overlay
Caption: "Aldo + GENESIS. El equipo detrás de tu Season."
```
Esto humaniza la oferta. El comprador ve quién está detrás.

### 8. AGENTE / GENESIS (líneas ~728-786)
**Estado actual**: Widget conversacional placeholder
**Propuesta**: En la columna izquierda (copy), agregar un pequeño avatar de GENESIS.

**Asset**: Crop circular de **A2** `genesis-solo.png` (close-up del rostro) como avatar de 48x48px junto al título "Habla con GENESIS".

### 9. FAQ (líneas ~789-821)
**Estado actual**: Solo texto
**Propuesta**: Sin cambios. FAQ debe ser funcional, no visual.

### 10. CTA FINAL (líneas ~823-856)
**Estado actual**: Texto + 2 botones
**Propuesta**: Agregar fondo con imagen sutil.

**Implementación**: Background image con heavy gradient overlay:
- Asset: **B3** `genesis-coaching-squat.png`
- Opacity: ~8-12% con gradient to black
- Efecto: El visitante siente "acción" subliminalmente sin que la imagen compita con el copy

### 11. FLOATING CTA + MODAL (líneas ~908-968)
**Estado actual**: Botón flotante + modal de texto
**Propuesta**: En el modal, agregar avatar de GENESIS (mismo crop circular de A2) en el header junto a "GENESIS - NGX".

---

## RESUMEN DE ASSET MAPPING

```
SECCIÓN          → ASSET PRINCIPAL      → ASSET SECUNDARIO
─────────────────────────────────────────────────────────
Hero             → (limpio, sin imagen)  → UnicornStudio bg
Diagnóstico L    → B3 coaching-squat     → —
Diagnóstico R    → B4 gym-premium        → —
Creencias        → (iconos mejorados)    → —
Mecanismo Video  → B5 hologram-panels    → —
Mecanismo Code   → B1 gym-data (mini)    → —
Proceso L        → B6 programming        → —
Proceso R        → B2 gym-team           → —
Garantía         → (limpio)              → —
Oferta           → B7 aldo-genesis v2    → —
Agente           → A2 crop (avatar)      → —
FAQ              → (limpio)              → —
CTA Final        → B3 bg sutil (8%)      → —
Modal            → A2 crop (avatar)      → —
```

---

## PRODUCCIÓN DE VIDEO — VEO 3.1

### V1: Hero Mood Reel (Background Loop)
**Objetivo**: Loop ambiental de 8-16s que se reproduce detrás del hero text.
**NO recomendado para ahora** — el UnicornStudio ya cumple esta función y agregar video pesaría el load time.

### V2: VSL Teaser — "Cómo Funciona HYBRID en 90 Segundos"
**Objetivo**: Placeholder video para el slot VSL hasta que se grabe el video real de Aldo.
**Duración**: 30-60 segundos (extend chains de 8s)
**Estilo**: Cinematic, dark, GENESIS como narrador visual

#### PROMPTS VEO 3.1 (JSON — máxima consistencia)

**Shot 1 — Hook (0-8s)**
```json
{
  "version": "veo-3.1",
  "output": {"duration_sec": 8, "resolution": "1080p", "aspect": "16:9"},
  "global_style": {
    "look": "photorealistic cinematic dark",
    "color": "violet (#6D00FF) dominant, deep blacks, no cyan or blue",
    "grade": "high contrast, dark shadows, violet highlights"
  },
  "scenes": [{
    "shot": {"type": "medium_close_up", "camera": "slow dolly forward"},
    "subject": "GENESIS, a powerful muscular humanoid AI with smooth black metallic surface, no mouth, brilliant violet (#6D00FF) glowing eyes, glowing X-DNA symbol on chest. Athletic build.",
    "action": "GENESIS turns slowly toward camera, eyes intensify with violet glow, holographic data particles emerge around hands",
    "setting": "Ultra-dark premium gym environment, barely visible weight racks in background, violet LED accent strips on ceiling, slight haze in air",
    "lighting": "Strong violet (#6D00FF) key light from front-left, deep purple fill from right, edge rim light from behind",
    "audio": "Deep sub-bass drone 40Hz, subtle electronic pulse, confident voice says: 'Tu cuerpo te está hablando. La pregunta es: estás escuchando?'"
  }]
}
```

**Shot 2 — Problema (8-16s)**
```json
{
  "version": "veo-3.1",
  "output": {"duration_sec": 8, "resolution": "1080p", "aspect": "16:9"},
  "global_style": {
    "look": "photorealistic cinematic dark",
    "color": "muted, desaturated with subtle violet accents",
    "grade": "slightly cold, clinical feel"
  },
  "scenes": [{
    "shot": {"type": "wide", "camera": "slow pan right"},
    "subject": "Professional man in his late 30s, business casual, standing alone in an empty generic gym",
    "action": "Man looks at phone with confused expression, puts it away, looks at generic equipment around him with uncertainty. Subtle fatigue in posture.",
    "setting": "Bright fluorescent-lit generic gym, harsh white light, boring equipment, empty and impersonal",
    "lighting": "Flat harsh overhead fluorescent, no dramatic lighting, clinical and unflattering",
    "audio": "Ambient gym noise, generic music, no voice. Feeling of disconnection."
  }]
}
```

**Shot 3 — Mecanismo (16-24s)**
```json
{
  "version": "veo-3.1",
  "output": {"duration_sec": 8, "resolution": "1080p", "aspect": "16:9"},
  "global_style": {
    "look": "photorealistic cinematic dark",
    "color": "violet (#6D00FF) dominant, emerald (#4ade80) accents on data",
    "grade": "high contrast, rich blacks, neon data overlays"
  },
  "scenes": [{
    "shot": {"type": "over_shoulder_to_medium", "camera": "crane up slowly"},
    "subject": "GENESIS standing next to a man performing controlled barbell squat in premium dark gym",
    "action": "GENESIS extends hand, holographic violet data panels materialize showing: heart rate graph, muscle activation zones glowing on the man's body, weekly periodization chart. Man completes squat with proper form.",
    "setting": "Premium dark gym with floor-to-ceiling windows showing city skyline at night, violet LED strips, matte black equipment",
    "lighting": "Violet key light from GENESIS's eyes casting glow, warm practical light from city outside, subtle emerald glow from data panels",
    "audio": "Controlled breath of athlete, subtle electronic scan sound, GENESIS voice: 'Semana 3. Volumen ajustado. Tu cuerpo respondió.'"
  }]
}
```

**Shot 4 — Resultado / CTA (24-32s)**
```json
{
  "version": "veo-3.1",
  "output": {"duration_sec": 8, "resolution": "1080p", "aspect": "16:9"},
  "global_style": {
    "look": "photorealistic cinematic dark",
    "color": "violet (#6D00FF) with warm golden undertones for triumph",
    "grade": "high contrast, cinematic warmth, heroic feel"
  },
  "scenes": [{
    "shot": {"type": "medium_wide", "camera": "slow push in"},
    "subject": "The same man, now standing confident with good posture. GENESIS stands beside him, both facing camera. Man looks transformed - better posture, energy visible in stance.",
    "action": "Man crosses arms with confident smile. GENESIS's chest X-DNA symbol pulses with bright violet light. Holographic '12 WEEKS' text materializes between them, then transforms into 'YOUR SEASON STARTS NOW'.",
    "setting": "Same premium dark gym but now alive - other people training in background (blurred), warmth and energy in the space",
    "lighting": "Dramatic violet from GENESIS, warm golden fill from environment, heroic rim light on man's shoulders",
    "audio": "Triumphant subtle electronic score building, GENESIS voice: 'Descubre si HYBRID es para ti. Habla conmigo.' NGX logo sound sting."
  }]
}
```

#### REFERENCE IMAGES para consistencia GENESIS:
Usar `genesis-solo.png` y `genesis-coaching-squat.png` como reference images en Flow para mantener consistencia del personaje a través de los 4 shots.

#### WORKFLOW en Flow:
1. Generar Shot 1 con 3 reference images de GENESIS
2. Usar último frame de Shot 1 como reference para Shot 2 (transición suave)
3. Generar Shot 3 con GENESIS references + Shot 2 last frame
4. Generar Shot 4 encadenando desde Shot 3
5. Extend cada shot si necesitas transiciones
6. Export → Post-producción ligera (crossfades en cortes, logo final)

---

## IMPLEMENTACIÓN TÉCNICA

### Paso 1: Subir assets
Copiar las 7 imágenes nuevas a `/public/images/brand/` con los nombres sugeridos.

### Paso 2: Actualizar VISUAL_ASSETS
```tsx
const VISUAL_ASSETS = {
  // Diagnóstico
  diagnosticTraining: "/images/brand/genesis-coaching-squat.png",  // B3
  diagnosticRecovery: "/images/brand/gym-premium-empty.png",       // B4
  // Mecanismo
  videoThumbnail: "/images/brand/genesis-hologram-panels.png",     // B5
  mechanismContext: "/images/brand/genesis-gym-data.png",           // B1
  // Proceso
  processAdaptive: "/images/brand/genesis-programming.png",        // B6
  processContext: "/images/brand/genesis-gym-team.png",             // B2
  // Oferta
  offerFounder: "/images/brand/aldo-genesis-portrait.png",         // B7
  // Agent avatar (crop del original)
  genesisAvatar: "/images/brand/genesis-solo.png",                 // A2
  // CTA Final background
  ctaBackground: "/images/brand/genesis-coaching-squat.png",       // B3 reutilizado
} as const;
```

### Paso 3: Actualizar copy de overlays
Remover los badges "Slot foto 01/02/03" — reemplazar con copy descriptivo real.

### Paso 4: Agregar imagen en Oferta
Tira horizontal con B7 y gradient overlay antes del CTA.

### Paso 5: Mejorar iconos de Creencias
Importar `Dumbbell`, `Target` de lucide-react.

### Paso 6: Avatar GENESIS en modal
Crop circular de genesis-solo.png como avatar en header del modal.

### Paso 7: CTA Final background
Agregar B3 como background-image con opacity ~10% y gradient overlay.

---

## PRIORIDAD DE EJECUCIÓN

| # | Tarea | Impacto | Esfuerzo |
|---|-------|---------|----------|
| 1 | Subir 7 assets + actualizar VISUAL_ASSETS | Alto | Bajo |
| 2 | Swap fotos diagnóstico (B3 + B4) | Alto | Bajo |
| 3 | Swap foto VSL thumbnail (B5) | Alto | Bajo |
| 4 | Swap fotos proceso (B6 + B2) | Alto | Bajo |
| 5 | Agregar tira founder en oferta (B7) | Medio | Medio |
| 6 | Mejorar iconos creencias | Medio | Bajo |
| 7 | Avatar GENESIS en modal | Medio | Bajo |
| 8 | Background sutil CTA final | Bajo | Bajo |
| 9 | Generar video VEO 3.1 | Alto | Alto |
| 10 | Remover badges "Slot foto" | Bajo | Bajo |

---

## NOTAS FINALES

- **NO agregar más de 2 imágenes por sección** — el glassmorphism ya es visualmente denso
- **Todas las imágenes necesitan gradient overlay** — nunca imagen cruda, siempre integrada al dark theme
- **Los badges "Slot foto"** fueron útiles como placeholder, eliminarlos en producción
- **El video VEO 3.1** es para MIENTRAS grabas el VSL real — no es el final
- **Consistencia cromática**: Todas las fotos ya tienen el violeta como color dominante, lo cual es perfecto. No necesitan color grading adicional.
