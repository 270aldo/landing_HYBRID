# VEO 3.1 — Prompts para NGX HYBRID Landing

> **Generados con JSON prompting (300%+ consistency)**
> Genera los 3 videos en Google Flow → labs.google.com/flow
> Usa los archivos de referencia: `genesis-solo.png` como reference image con influence_weight 0.8

---

## VIDEO 1: Hero Loop — "GENESIS + Gym Premium"

**Destino**: Panel derecho del Hero (reemplaza `genesis-coaching-squat.png`)
**Duración**: 8s base → extender +8s para loop de 16s natural
**Aspect ratio**: 16:9 | **Resolution**: 1080p | **Audio**: Muted
**Env var**: `NEXT_PUBLIC_HERO_VIDEO_SRC=/videos/hero-loop.mp4`

```json
{
  "version": "veo-3.1",
  "output": {
    "duration_sec": 8,
    "fps": 24,
    "resolution": "1080p",
    "aspect_ratio": "16:9"
  },
  "global_style": {
    "look": "photorealistic cinematic, 8K quality, deep blacks",
    "color": "violet (#6D00FF) dominant with purple accents (#7D1AFF), zero cyan or blue",
    "mood": "powerful, focused, premium performance",
    "safety": "no celebrities, no trademarks, no text overlays, no subtitles"
  },
  "continuity": {
    "characters": [
      {
        "id": "genesis",
        "description": "athletic humanoid AI, brilliant violet glowing eyes (#6D00FF), futuristic dark metallic surface, X-DNA symbol on chest glowing violet, NO MOUTH — smooth minimalist face, muscular build",
        "reference_images": ["genesis-solo.png"],
        "influence_weight": 0.8
      }
    ],
    "props": [
      "floating holographic training data panels in violet (#6D00FF)",
      "olympic barbell with plates",
      "professional gym rack system"
    ],
    "lighting": "violet key light (#6D00FF) from left 45°, purple fill (#7D1AFF) from right 30%, dark environment #050505"
  },
  "scenes": [
    {
      "id": "s1_genesis_stance",
      "start_time": 0.0,
      "end_time": 3.5,
      "shot": {
        "type": "medium shot",
        "framing": "GENESIS centered, full torso visible, slightly low angle",
        "camera": "slow dolly-in 8% over 3.5 seconds",
        "stabilization": "smooth gimbal"
      },
      "action": "GENESIS stands powerfully in a premium dark gym, arms at sides with fists slightly clenched, violet eyes scanning forward, X-DNA symbol on chest pulses with soft glow, holographic training data panels float around the figure showing performance metrics",
      "environment": "ultra-premium dark gym, matte black equipment, violet LED accent strips on walls, high ceiling, cinematic bokeh background",
      "lighting": "violet key light (#6D00FF) from left 45°, purple fill right 30% intensity, dark ambient #050505",
      "audio": "muted"
    },
    {
      "id": "s2_training_transition",
      "start_time": 3.5,
      "end_time": 8.0,
      "shot": {
        "type": "medium close-up",
        "framing": "athletic person executing a deep barbell squat, shoulders and torso framing, rule of thirds",
        "camera": "static with very subtle slow push-in 3%",
        "stabilization": "smooth gimbal"
      },
      "action": "Athletic male professional (30s, dark athletic wear) performing a controlled heavy barbell squat descent, focused intense expression. GENESIS holographic scan beam (violet #6D00FF) sweeps over the movement from the side tracking biomechanics in real time.",
      "environment": "same premium dark gym, violet LED strips, rack system visible, depth of field creates cinematic bokeh",
      "lighting": "violet rim light defining athlete silhouette, warm practical overhead lights, violet scan beam sweeping right to left at mid-frame",
      "audio": "muted"
    }
  ]
}
```

**Extension strategy**: Una vez generado el clip base de 8s, usar la función **Extend** de Flow (+7s). Repetir hasta tener 16s total. El clip debe terminar con GENESIS de pie (mismo encuadre que el inicio) para que el loop sea limpio. Aplicar cross-dissolve en post si hay salto visible.

---

## VIDEO 2: VSL Mechanism Teaser — "El Mecanismo HYBRID"

**Destino**: Panel derecho de la sección Mecanismo (reemplaza `genesis-hologram-panels.png`)
**Duración**: 8s | **Aspect ratio**: 16:9 | **Resolution**: 1080p | **Audio**: Muted (autoplay)
**Env var**: `NEXT_PUBLIC_VSL_TEASER_VIDEO_SRC=/videos/vsl-teaser.mp4`

```json
{
  "version": "veo-3.1",
  "output": {
    "duration_sec": 8,
    "fps": 24,
    "resolution": "1080p",
    "aspect_ratio": "16:9"
  },
  "global_style": {
    "look": "photorealistic cinematic, split-composition data visualization aesthetic",
    "color": "left: violet (#6D00FF) tech world / right: emerald (#10B981) training world, dark base #050505",
    "mood": "analytical, powerful, intelligent, systems in motion",
    "safety": "no celebrities, no trademarks, no text overlays, no subtitles"
  },
  "continuity": {
    "characters": [
      {
        "id": "genesis",
        "description": "athletic humanoid AI, brilliant violet glowing eyes (#6D00FF), futuristic dark metallic surface, X-DNA symbol on chest, NO MOUTH — smooth minimalist face",
        "reference_images": ["genesis-solo.png"],
        "influence_weight": 0.8
      }
    ],
    "props": [
      "floating holographic data panels with performance charts in violet",
      "olympic barbell",
      "holographic body scan overlay"
    ],
    "lighting": "split lighting: violet (#6D00FF) left half, emerald (#10B981) right half accent, dark base"
  },
  "scenes": [
    {
      "id": "s1_split_world",
      "start_time": 0.0,
      "end_time": 5.0,
      "shot": {
        "type": "wide shot",
        "framing": "symmetrical split composition — vertical center divider implied by light change",
        "camera": "static with very subtle crane up 3%",
        "stabilization": "smooth"
      },
      "action": "LEFT HALF: GENESIS at holographic interface, fingers touching floating data panels showing periodization curves and load graphs in violet. RIGHT HALF: athletic professional (30s male, dark athletic wear) mid-rep on heavy barbell row, controlled powerful movement. Both figures visible simultaneously in their respective halves of frame.",
      "environment": "seamless transition from ultra-dark tech lab left (#050505) to premium dark gym right — transition is light-based not physical",
      "lighting": "LEFT: violet (#6D00FF) key light 45°, purple fill. RIGHT: warm overhead gym practicals, emerald rim light on athlete silhouette",
      "audio": "muted"
    },
    {
      "id": "s2_merge",
      "start_time": 5.0,
      "end_time": 8.0,
      "shot": {
        "type": "medium shot",
        "framing": "center frame, both worlds converging",
        "camera": "slow dolly-in 5%",
        "stabilization": "smooth gimbal"
      },
      "action": "The invisible divider dissolves — holographic data panels from GENESIS side float over and surround the training athlete. Violet scan lines sweep across athlete form. GENESIS eyes glow brighter as systems connect. Emerald and violet light merge at center frame.",
      "environment": "gym with holographic data overlay merging, depth of field background bokeh",
      "lighting": "violet and emerald lights blend in center frame, rim lighting on athlete from both colors simultaneously",
      "audio": "muted"
    }
  ]
}
```

---

## VIDEO 3: Results Bridge — "Métricas en Tiempo Real"

**Destino**: Nueva sección visual entre Resultados y Timeline de Longevidad
**Duración**: 8s | **Aspect ratio**: 21:9 cinematic | **Resolution**: 1080p | **Audio**: Muted
**Env var**: `NEXT_PUBLIC_RESULTS_VIDEO_SRC=/videos/results-bridge.mp4`
**Nota**: Esta sección solo aparece en la landing cuando el env var está configurado

```json
{
  "version": "veo-3.1",
  "output": {
    "duration_sec": 8,
    "fps": 24,
    "resolution": "1080p",
    "aspect_ratio": "16:9"
  },
  "global_style": {
    "look": "data visualization cinematic, holographic UI aesthetic, photorealistic",
    "color": "violet (#6D00FF) and emerald (#10B981) data elements on ultra-dark background (#050505)",
    "mood": "transformative, evidence-based, satisfying achievement",
    "safety": "no celebrities, no trademarks, no text overlays, no subtitles"
  },
  "continuity": {
    "props": [
      "holographic dashboard display: floating metric panels with changing live numbers",
      "body composition scan hologram: silhouette with data layers in violet and emerald",
      "muscle fiber visualization",
      "trend line charts animating in real-time"
    ],
    "lighting": "dark base (#050505), panels emit violet (#6D00FF) and emerald (#10B981) self-glow, no harsh shadows"
  },
  "scenes": [
    {
      "id": "s1_data_dashboard",
      "start_time": 0.0,
      "end_time": 4.0,
      "shot": {
        "type": "medium close-up",
        "framing": "holographic dashboard centered, slightly low angle for authority",
        "camera": "slow orbital arc 15 degrees left to right",
        "stabilization": "smooth"
      },
      "action": "Floating holographic dashboard in dark space — multiple metric panels visible and actively changing: body composition chart showing fat percentage line dropping (emerald trend line going down), muscle mass bars rising (violet bars going up), strength metrics increasing. Numbers on panels visibly animate — the dashboard feels alive, processing, intelligent. No readable text — just visual data changing in the right direction.",
      "environment": "infinite dark void (#050505) with subtle atmospheric depth haze, no floor or ceiling visible",
      "lighting": "panels self-illuminate with violet (#6D00FF) and emerald (#10B981) data glow, soft ambient halo around each panel, deep dramatic shadows",
      "audio": "muted"
    },
    {
      "id": "s2_athlete_revelation",
      "start_time": 4.0,
      "end_time": 8.0,
      "shot": {
        "type": "medium shot pulling to wide",
        "framing": "starts medium on chest/face, pulls back to reveal full body with data overlay",
        "camera": "slow dolly-out 15% over 4 seconds with slight crane up",
        "stabilization": "smooth gimbal"
      },
      "action": "Athletic male professional (35-40s, dark athletic wear, post-workout — composed satisfied expression) gazing at his holographic data panels with quiet confidence — not celebration, the quiet satisfaction of someone whose data confirms their progress. As camera pulls back, holographic body scan overlay appears: violet lines mapping muscle structure, emerald bio-markers floating alongside. All data synchronized and glowing.",
      "environment": "premium dark gym space transitioning to data-scan holographic environment, violet LED accent strips in background bokeh",
      "lighting": "violet (#6D00FF) hologram light illuminates face from front, emerald accent from left, dramatic dark background",
      "audio": "muted"
    }
  ]
}
```

---

## Workflow completo en Flow

1. Ir a **labs.google.com/flow**
2. Crear nuevo proyecto → **"NGX HYBRID Landing Videos"**
3. Subir `genesis-solo.png` como reference image
4. Generar Video 1 (Hero Loop) → pegar JSON → Generate
5. Si salió bien → **Extend** +7s → repetir hasta 16s
6. Generar Video 2 (VSL Teaser) → pegar JSON → Generate
7. Generar Video 3 (Results Bridge) → pegar JSON → Generate
8. Exportar los 3 como `.mp4`
9. Colocar en `/ngx-hybrid-web/public/videos/`:
   - `hero-loop.mp4`
   - `vsl-teaser.mp4`
   - `results-bridge.mp4`
10. Agregar en `.env.local`:
    ```
    NEXT_PUBLIC_HERO_VIDEO_SRC=/videos/hero-loop.mp4
    NEXT_PUBLIC_VSL_TEASER_VIDEO_SRC=/videos/vsl-teaser.mp4
    NEXT_PUBLIC_RESULTS_VIDEO_SRC=/videos/results-bridge.mp4
    ```
11. La landing automáticamente activa los videos con fallback a las imágenes estáticas mientras no existan.

---

*Generados: Feb 18, 2026*
*Skill: ngx-veo31-content-factory (JSON prompting mode)*
