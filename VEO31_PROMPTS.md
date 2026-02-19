# VEO 3.1 — Prompts NGX HYBRID Landing
## Kit: Cinematic Plain English × Frames to Video × Audio Nativo

> **VEO 3.1 (Feb 2026) — Lo que hay que saber antes de empezar:**
> - Frames to Video ahora genera **audio nativo sincronizado** — ya no necesitas agregarlo en post
> - Output disponible en **4K (3840×2160)** desde la update de enero 2026
> - Estructura de prompt que da mejores resultados: **Cinematografía → Sujeto → Acción → Ambiente → Mood → Audio**
> - La cinematografía (tipo de cámara, composición, lente) es el parámetro más poderoso
> - **NO uses JSON** — texto en inglés directo da mejor adherencia con VEO 3.1

---

## PALETA — No desviarse

| Rol | Hex |
|-----|-----|
| Violeta primario | `#6D00FF` |
| Violeta eléctrico | `#7D1AFF` |
| Esmeralda | `#10B981` *(solo videos 2 y 3)* |
| Fondo | `#050505` |
| **PROHIBIDOS** | cyan, azul, naranja, amarillo, cualquier tono cálido |

---

## EJERCICIO — Por qué cambiamos de sentadilla

La sentadilla trasera requiere que el modelo entienda barra sobre trapecios, profundidad de cadera, ángulo de rodillas — demasiadas variables simultáneas. Los modelos actuales tienden a romper la forma, el ángulo de espalda o la posición de la barra.

**En su lugar usamos:**
- **Video 1 y 2:** Curl de bíceps con mancuerna (standing dumbbell curl) — movimiento en un plano, brazo aislado, postura recta. El modelo lo rinde bien casi siempre.
- **Video 3:** Atleta parado, sin movimiento de ejercicio. Solo postura y scan.

---

## FLUJO EN FLOW (recordatorio)

```
1. Genera Frame 1 en Nano Banana Pro → descarga 2K+
2. Sube Frame 1 como referencia → genera Frame 2 (chaining)
3. En Flow → Frames to Video → Frame 1 = "First frame", Frame 2 = "Last frame"
4. Pega el prompt de texto en el campo principal
5. Generate → revisa audio y motion → Extend si necesitas más duración
6. Export 4K o 1080p → coloca en /ngx-hybrid-web/public/videos/
```

---

---

## VIDEO 1 — Hero Loop
### "GENESIS ve al atleta"

**Sección**: Panel derecho del Hero
**Concepto**: La IA que analiza. El humano que ejecuta. Un sistema.
**Env var**: `NEXT_PUBLIC_HERO_VIDEO_SRC=/videos/hero-loop.mp4`
**Duración**: 8s base → Extend +8s para loop suave

---

### FRAME 1 (Inicio) — Nano Banana Pro

```
Ultra-cinematic photograph. 16:9 aspect ratio. 2K minimum resolution. No letterboxing, no borders.

Camera: 85mm prime lens, f/1.4 aperture. Low angle — lens positioned at hip height looking upward at 15 degrees. Locked static tripod. Centered frame with slight left bias.

Subject: A powerful synthetic humanoid figure. Smooth matte-black biomechanical exostructure with subtle surface detail — seams, micro-panels, carbon texture. Two oval violet glowing optical sensors (color #6D00FF) are the only facial feature. No mouth, no nose, no human facial features whatsoever. Smooth featureless surface from the cheekbones down. An X-shaped emblem on the chest glowing with contained violet energy. Arms at sides, fists lightly closed. Posture: absolute stillness with contained power.

Floating beside the figure: three semi-transparent holographic data panels at different depths. Each panel is ultra-thin dark glass with violet (#6D00FF) line graph data — no readable text, pure visual data curves. One panel at shoulder-left, one at waist-right, one slightly behind at head level.

Environment: Ultra-premium dark gym interior. Background: pure #050505. Ceiling 5 meters high. Matte-black olympic equipment in extreme bokeh blur (f/1.4 falloff) in the background. Violet LED strips recessed horizontally into the walls creating light ribbons. Polished concrete floor that mirrors the violet light perfectly like liquid glass.

Lighting: Single hard violet (#6D00FF) key light from 45 degrees camera-left. Deep violet (#5B21B6) rim light tight behind the figure creating clean edge separation. Very soft purple (#7D1AFF) fill from the right at 20% intensity barely lifting shadows. Holographic panels are self-illuminated at low intensity.

Mood: Contained intelligence. The presence before it acts. Dark, premium, cinematic.

Forbidden: No warm tones. No cyan. No blue. No readable text anywhere. No mouth on the figure. The background must stay pure dark.
```

**Tip si Nano Banana bloquea el término**: Cambia "synthetic humanoid figure" por "a tall athletic being in a smooth dark full-body suit, face completely covered by a dark visor with two oval violet glowing lights where eyes would be."

---

### FRAME 2 (Fin) — Nano Banana Pro
*Sube Frame 1 como imagen de referencia antes de generar este.*

```
Ultra-cinematic photograph. 16:9 aspect ratio. 2K minimum resolution. No letterboxing.

[REFERENCE IMAGE: Use the exact same gym environment from the uploaded reference — same walls, same violet LED strips, same polished floor reflection, same camera angle at 15 degrees upward from hip height, same 85mm lens perspective. The environment must be identical.]

New subject in the same environment: Athletic male, early 30s. Dark premium compression tank top, dark training shorts. Functional athlete build — strong but lean, not bodybuilder mass. Jaw set, focused gaze forward. Expression of concentrated effort, not strain.

Action: Standing dumbbell bicep curl. Right arm mid-curl — forearm at approximately 45 degrees on the way up, elbow pinned tight to the side of the torso, wrist in neutral position. The dumbbell is in a supinated grip (palm facing up). Left arm hanging naturally at the side with dumbbell at rest. Posture: upright, shoulders back and down, no shoulder shrug. This is controlled, precise form — the movement of someone who has done this ten thousand times.

Overlaid on the athlete: A single horizontal violet laser scan plane (#6D00FF) — a flat, razor-thin sheet of light — sweeping slowly upward from the waist toward the chest. Where the scan plane intersects the curling arm, small violet particle data points briefly appear (not readable, purely visual). The scan beam adds gentle violet ambient light to the torso.

The three holographic panels from the reference image are still present in the background, slightly repositioned around the athlete at different depths.

Lighting: Same violet (#6D00FF) key light at 45 degrees from left, now at 60% intensity to reveal the athlete's musculature. Purple (#7D1AFF) fill from right at 30%. Violet rim light behind defining the shoulder and back contour. The scan beam adds a thin violet ambient strip across the torso. Dumbbell surface picks up key light highlight.

Mood: Human performance being precisely measured. Excellence in motion. The body as a system.

Forbidden: No warm tones. No cyan. No readable text. The scan must be a flat horizontal plane, not a sphere or circle around the body.
```

---

### PROMPT PARA FLOW (texto directo)

```
Locked static camera. Zero camera movement of any kind. The camera is physically fixed — treat it as a surveillance camera bolted to the floor, incapable of any pan, tilt, zoom, or dolly.

The scene begins with a powerful synthetic humanoid figure standing in a dark premium gym. Violet LED strips line the walls. Three holographic data panels float around the figure, their violet light pulsing gently in a slow rhythm. The figure's oval violet optical sensors glow with quiet intensity.

Over the first three and a half seconds, the holographic panels shift positions slightly, reorganizing around the space. The figure's violet optical sensors intensify in glow — as if focusing attention on something just arrived.

At three and a half seconds, a smooth cross-dissolve begins. The synthetic figure gradually becomes transparent and fades into the darkness while an athletic male gradually materializes in the same exact position in the same gym space. The environment never changes — same walls, same floor reflection, same panels — only the central subject changes.

By five seconds, the athlete is fully visible, standing and performing a controlled standing dumbbell bicep curl with his right arm. Elbow pinned to his side, forearm curling upward in a slow deliberate movement. A thin violet laser scan plane sweeps upward across his torso — flat, horizontal, precise. Where the beam crosses his curling arm, faint violet data points flare briefly.

The final three seconds hold on the athlete mid-curl as the scan plane completes its sweep. The holographic panels have repositioned to orbit the athlete. Everything is still. The only movement is the athlete's controlled arm curl and the subtle breathing of the holographic displays.

Environment throughout: ultra-premium dark gym, #050505 background, violet LED wall strips, liquid glass polished floor. Only violet accent color — no cyan, no blue, no warm tones at any point.

Audio: The first three seconds carry a deep electronic hum at the threshold of hearing — 40Hz drone, almost subsonic. At the moment of transition, a clean ascending synthetic tone signals the shift. During the scan sweep, a precise linear electronic pass sound — clinical, not aggressive. When the data points flare, a brief soft confirmation ping. The final seconds: the low drone returns, the gym exists in quiet power.
```

**Extend strategy**: Solicita extend con: "Continue the scene. The athlete lowers the dumbbell in a slow controlled negative. The holographic panels register the movement. A final pulse of violet light from the panels. The athlete looks up — the same contained intensity as the synthetic figure before him. Hold for two seconds. Fade to the first frame of the loop."

---
---

## VIDEO 2 — VSL Mechanism Teaser
### "El mecanismo HYBRID"

**Sección**: Panel derecho de la sección Mecanismo / VSL
**Concepto**: IA y humano como dos fuerzas que se fusionan en un sistema.
**Env var**: `NEXT_PUBLIC_VSL_TEASER_VIDEO_SRC=/videos/vsl-teaser.mp4`
**Duración**: 8s

---

### FRAME 1 (Inicio) — Nano Banana Pro

```
Ultra-cinematic photograph. 16:9 aspect ratio. 2K minimum resolution. No letterboxing.

Camera: 35mm wide prime lens, f/1.4. Eye-level — lens at 150cm from floor. Static locked tripod. Perfect symmetrical framing — both subjects equally weighted in frame.

Composition: Vertical split. The frame is divided at the exact center by light temperature alone — no visible wall or border. Left half and right half are two simultaneous realities in the same dark space.

LEFT HALF — Intelligence:
The same synthetic humanoid figure from Video 1 (smooth matte-black biomechanical surface, no facial features except two oval violet glowing optical sensors #6D00FF, X-shaped emblem on chest). Positioned left of center, facing the camera, with right arm extended forward touching a large floating holographic panel. The panel shows a periodization curve (violet #6D00FF line graph, no readable labels) and a load-volume training pyramid (violet bars). Head tilted 5 degrees downward toward the data.

RIGHT HALF — Performance:
Athletic male, early 30s (same man from Video 1 — dark premium compression top, functional lean build). He is performing a standing dumbbell bicep curl with his left arm, mid-curl, facing slightly toward the left half of the frame — toward the synthetic figure. This creates visual tension: human facing AI, a conversation of systems. Focused expression, jaw set, controlled effort.

The dividing center: only illumination separates the two realities. Left half lit entirely by violet (#6D00FF) from far left. Right half defined by emerald (#10B981) rim light from far right tracing the athlete's shoulder and arm silhouette. At the center, the two light colors create a subtle blend zone where violet and emerald coexist for a few pixels.

Environment: #050505 background. Dark gym space implied by minimal bokeh shapes of equipment at far left and far right. Polished floor reflects both figures. No ceiling visible — both subjects emerge from pure darkness.

Mood: Two forces acknowledging each other. Tension before fusion. The moment before systems merge.

Forbidden: No warm tones. No cyan. No text. The two halves must feel like one photograph, not two separate images placed side by side.
```

---

### FRAME 2 (Fin) — Nano Banana Pro
*Sube Frame 1 como imagen de referencia antes de generar este.*

```
Ultra-cinematic photograph. 16:9 aspect ratio. 2K minimum resolution. No letterboxing.

[REFERENCE IMAGE: Match the exact same dark gym environment, same camera position (35mm lens, eye-level 150cm, same tripod angle). The same athlete and same synthetic figure from the reference must appear here but in a new relationship.]

The split has dissolved. The two systems have become one.

The ATHLETE (same man from the reference — dark compression top, lean athletic build) stands centered in the full frame. He is between sets — standing, controlled breathing, looking directly at the camera. Expression: quiet confidence. Not pride. The look of someone who has shown up consistently for months and is simply measuring the result.

The SYNTHETIC FIGURE from the reference is now a semi-transparent presence overlaid behind and slightly to the left of the athlete. Visible at approximately 40% opacity — a ghost in the system. Its violet optical sensors (#6D00FF) glow brightly through the translucency. Its X-shaped chest emblem is visible through the athlete's upper torso, creating the metaphor: the intelligence is inside the human system now, not beside it.

Orbiting the athlete at different depths — the holographic panels from the reference image's left half have migrated rightward:
- A vertical biometric column panel floats at face level, slightly to the athlete's left (violet #6D00FF lines, no readable text).
- A load progression graph panel floats at shoulder level (violet bars, upward progression).
- An emerald (#10B981) recovery indicator panel floats at hip level to the right — this is the health/longevity data, distinct from the performance data.
- Thin violet skeletal mapping lines trace over the athlete's visible arm and shoulder — an anatomical data overlay at very low opacity.
- Small emerald dots mark the athlete's shoulder joint, elbow joint, and wrist joint — biomechanical tracking markers with a soft glow.

Lighting: Both colors now illuminate the athlete simultaneously. Violet (#6D00FF) key light from the left. Emerald (#10B981) rim light from the right. The transparent synthetic figure receives only the violet light. This dual illumination is the visual confirmation that the systems have merged.

Mood: Integration. The intelligence and the human are now one optimized system.

Forbidden: No warm tones. No cyan. The synthetic figure overlay must be clearly translucent — see-through, not ghostly white. The dual light colors must feel like a single coherent scene, not two composited images.
```

---

### PROMPT PARA FLOW (texto directo)

```
Locked static camera. Zero camera movement. 35mm equivalent lens, eye-level, locked tripod. The camera does not move a single pixel in any direction at any point in this clip.

The clip opens on a perfect vertical split composition. On the left side of the frame stands a synthetic humanoid figure in a dark premium gym — smooth matte-black surface, violet glowing oval optical sensors, one hand touching a floating holographic panel displaying performance data curves in violet. On the right side, an athletic male performs a controlled standing dumbbell bicep curl, facing slightly toward the figure across the invisible divide. Left side lit entirely in violet. Right side defined by an emerald rim light on the athlete's shoulder. The two halves feel like a single world separated only by light temperature.

For the first second, the split holds. Both sides breathe — the holographic panels pulse gently, the athlete completes one slow controlled curl repetition.

From one second to five seconds, the invisible divide begins dissolving. The holographic panels from the left side slowly drift rightward, as if migrating toward the athlete. Simultaneously, the synthetic figure begins losing opacity — not disappearing, but becoming transparent, like a ghost settling into a new space. The athlete stays fixed, between sets now, recovering, standing composed. The emerald rim light remains on him throughout. By four seconds the synthetic figure is clearly semi-transparent, visibly overlapping with the space behind and beside the athlete. The panels have begun orbiting the athlete.

From five seconds to eight seconds, the unified system is visible. The athlete stands centered. The synthetic figure is present as a 40% opacity overlay behind him — its violet optical sensors glowing through the translucency. The data panels orbit the athlete at different depths. Small emerald dots of light appear one by one at the athlete's shoulder, elbow, and wrist — biomechanical tracking markers. Both violet and emerald light now illuminate the athlete simultaneously from opposite sides. Everything holds.

Environment: #050505 dark premium gym throughout. Polished floor reflects both figures and the data panels. Only violet (#6D00FF) and emerald (#10B981) as accent colors. No cyan, no blue, no warm tones at any point in the clip.

Audio: The opening second plays two distinct tonal signatures simultaneously — a deep violet drone from the left speaker, a bright emerald tone from the right speaker, separated in stereo. As the panels drift and the figure begins dissolving, the two audio signatures begin converging in the stereo field, moving from wide stereo toward center mono. By five seconds, both tones have merged into a single unified harmonic chord, centered. For the final three seconds, this chord sustains — one sound, two frequencies, one system. A final soft pulse at the last frame signals completion.
```

---
---

## VIDEO 3 — Results Bridge
### "Los datos eres tú"

**Sección**: Visual break entre Resultados y Timeline
**Concepto**: Los datos no son abstractos — son una persona. El sistema te ve entero.
**Env var**: `NEXT_PUBLIC_RESULTS_VIDEO_SRC=/videos/results-bridge.mp4`
**Duración**: 8s

---

### FRAME 1 (Inicio) — Nano Banana Pro

```
Ultra-cinematic data visualization. 16:9 aspect ratio. 2K minimum resolution. No letterboxing.

Camera: 50mm prime lens, f/1.4. Slightly elevated angle — lens at 180cm from floor, tilted 10 degrees downward. Static locked tripod. No human subjects in this frame.

Scene: A pure data environment. An orbital arrangement of floating holographic dashboard panels suspended in absolute black void (#050505). No floor surface, no ceiling, no walls — only infinite darkness and self-illuminated data.

Panel arrangement:
LARGE CENTER PANEL — 60 by 40 centimeters of floating dark glass. Displays a smooth falling line chart: an emerald (#10B981) line descending 35% from left to right across the time axis. This represents body composition improving — a metric going in the right direction. No readable numbers. The visual shape tells the story.

LEFT PANEL (positioned 30 degrees to the left, slightly behind the center) — A vertical bar chart. Six violet (#6D00FF) bars rising from the base, each one taller than the previous. Performance capacity increasing over time.

RIGHT PANEL (positioned 20 degrees to the right, slightly in front of the center) — A circular gauge, 270 degree arc. Emerald fill (#10B981) at 87% completion. Dark glass inside the circle.

SMALL FLOATING ELEMENTS — Eight to twelve smaller data fragments orbiting the main panels at various depths and angles: tiny sparkline graphs, single-digit percentage badges, small ring gauges. Each is self-illuminated in either violet or emerald. They drift very slowly in different directions.

Each panel has an ultra-thin bezel, two pixels wide. Dark glass background at 60% opacity. The UI elements are only the colored lines and fills — no solid backgrounds, no white areas.

Illumination: The panels are the only light sources. The center panel casts soft violet ambient light into the surrounding darkness. The left panel adds violet glow. The right panel adds emerald glow. The result is a mostly dark space with warm pockets of violet and emerald light radiating from the panels, fading quickly into the void. Deep volumetric depth created by panels at different z-positions.

Mood: Pure intelligence. The universe of someone's performance data floating in space, waiting for its owner. Beautiful, precise, slightly lonely without its human.

Forbidden: No text readable at any zoom level. No warm tones. No cyan or blue. No floor or ceiling visible.
```

---

### FRAME 2 (Fin) — Nano Banana Pro
*Sube Frame 1 como imagen de referencia antes de generar este.*

```
Ultra-cinematic photograph. 16:9 aspect ratio. 2K minimum resolution. No letterboxing.

[REFERENCE IMAGE: The holographic panels from the uploaded reference must appear in this frame, repositioned around the human subject. Match their visual style, panel sizes, colors, and glass texture exactly.]

Same void (#050505). Now a human subject has appeared at center.

The ATHLETE: Male professional, late 30s. Dark fitted athletic top, dark training pants. Standing posture — arms slightly away from the torso, open stance, as if presenting himself to measurement. Expression: quiet satisfaction. Not triumph — this is the look of someone who has been consistent for months and simply knows it. Eyes forward, chin level.

Overlaid on the athlete — a complete biomechanical analysis:

SKELETAL TRACE: Thin violet (#6D00FF) luminous lines trace the major skeletal structure as if visible through the body without any invasion. Femur, tibia, fibula, spine, clavicle, humerus, radius, ulna — all mapped in thin violet light lines. These lines are at 15% opacity where they cross the body interior, and brighter where they emerge at the edges. This is poetic data, not clinical imaging.

JOINT MARKERS: Small emerald (#10B981) dots with a soft outer glow mark twelve joints: both ankles, both knees, both hips, lumbar, thoracic, both shoulders, both elbows, both wrists. Each dot pulses once slowly — a single heartbeat of green light.

MUSCLE ACTIVATION ZONES: Semi-transparent emerald fills at very low opacity (10%) on the quadriceps and core area — barely visible, like a heat signature just above the skin surface.

REPOSITIONED PANELS from the reference image now orbit the athlete:
The emerald line chart panel has moved to the athlete's left at shoulder height — the falling line now has a small upward arrow at its end, signaling the trend has reversed and health is improving.
The violet bar chart panel has moved to the athlete's right at hip height — all six bars are now at peak height.
The circular gauge now floats in front of the athlete at chest level, semi-transparent so the athlete is visible through it — the gauge now reads 94%, the emerald arc nearly complete.

Lighting: Dual source. Violet (#6D00FF) from the left panel illuminates the athlete's left side. Emerald (#10B981) from the right panel illuminates the right side. The skeletal overlay adds its own diffuse violet ambient from within. The circular gauge at chest level adds soft violet holographic fill from the front. The athlete exists in a perfectly balanced light between intelligence and vitality.

Camera: IDENTICAL to Frame 1. Same 50mm lens. Same elevated tripod at 180cm tilted 10 degrees down. The athlete appears in the center where the center panel was in Frame 1.

Mood: The data has found its person. The person is the data. One complete system.

Forbidden: No warm tones. No cyan or blue. No readable text anywhere. The skeleton overlay must feel luminous and poetic, not like an X-ray or medical diagram. The athlete's expression must read dignity, not victorious.
```

---

### PROMPT PARA FLOW (texto directo)

```
Locked static camera. Zero camera movement. 50mm equivalent lens, elevated slightly looking down at 10 degrees, locked tripod. The camera is immovable. No zoom, no tilt, no pan, no drift whatsoever.

The clip opens on a pure data environment: an orbital array of floating holographic panels suspended in absolute black (#050505 void). No floor, no ceiling, no walls. The panels breathe gently in place — a large center panel with a falling emerald line chart, a violet bar chart to the left showing rising performance, a circular emerald gauge to the right at 87% complete. Smaller data fragments orbit the arrangement slowly. The panels are the only light sources, casting soft violet and emerald glows that fade quickly into the darkness. There is no human present yet.

For the first second and a half, the data environment simply exists and breathes. The panels oscillate slightly, each at its own slow rhythm, as if waiting.

From one and a half seconds to four seconds, the panels begin drifting outward and apart, creating negative space at the center of the frame. As they move, the darkness in that center space begins to change — a faint violet skeleton outline materializes in the void. First barely visible, then slowly gaining definition — the skeletal structure of a standing human figure traced in thin violet light lines, appearing from nothing in the exact center of the frame.

At four seconds, the human form fills the skeleton from the inside out. An athletic male materializes inside the violet skeletal outline — dark athletic wear, standing in a composed open stance, arms slightly away from the body. His expression is quiet satisfaction. The skeleton overlay persists at very low opacity, luminous lines visible on his surface. The floating panels drift back inward and take new positions orbiting him.

From four seconds to six seconds, the system completes its mapping. Small emerald dots of light appear sequentially at his joints — starting at both ankles, moving upward through knees and hips and spine and shoulders — each dot pulsing once with a single soft heartbeat of green light. Simultaneously, the repositioned panels update: the emerald line chart now shows an upward arrow at its end, the violet bars reach peak height, the circular gauge fills to 94%.

The final two seconds hold the complete picture: athlete at center, panels orbiting, skeletal overlay glowing softly, joint markers all lit. Both violet and emerald light illuminate him from opposite sides simultaneously. Everything is still and resolved.

Environment: #050505 absolute void throughout. No floor, no ceiling, no walls at any point. Only violet (#6D00FF) and emerald (#10B981) as accent colors. No cyan, no blue, no warm tones.

Audio: For the first second and a half, the data panels each hum at their own frequency — a soft harmonic chord of different tones coexisting, the sound of information at rest. As the panels drift apart and the void opens, the harmonic drops to a single low tone — anticipation. At the moment the skeleton appears, a single crystalline chime, delicate and precise. As the athlete materializes, a deeper resonance builds beneath — like something abstract becoming real and physical. The twelve joint markers each produce a brief soft ping as they appear in sequence from ankle to shoulder, twelve soft pings ascending in pitch. The final two seconds resolve in a full sustained chord — violet and emerald frequencies merged into one harmonic. The sound of a complete system.
```

---
---

## CHECKLIST DE PRODUCCIÓN

### Por cada video — orden exacto:

```
NANO BANANA PRO (Frame 1):
[ ] Gemini App → "Create images" → modo Thinking activado
[ ] Pegar prompt de Frame 1 sin modificar
[ ] Solicitar: 2K resolution, 16:9 ratio, no letterboxing
[ ] Revisar: ¿Colores correctos? ¿Sin cyan ni cálidos? ¿Sin texto?
[ ] Para Video 1/2: ¿El form del curl se ve correcto? Codo fijo al costado.
[ ] Guardar: frame1_v1.png, frame1_v2.png, frame1_v3.png (según video)

NANO BANANA PRO (Frame 2 — chaining):
[ ] En Nano Banana → subir frame1_v[N].png como imagen de referencia
[ ] Pegar prompt de Frame 2 que dice [REFERENCE IMAGE]
[ ] Verificar: ¿mismo espacio? ¿mismo ángulo de cámara? ¿misma temperatura de luz?
[ ] Guardar: frame2_v1.png, frame2_v2.png, frame2_v3.png

FLOW — Frames to Video:
[ ] labs.google.com/flow → New Project → Frames to Video
[ ] Frame 1 → campo "First frame"
[ ] Frame 2 → campo "Last frame"
[ ] Pegar el prompt de texto del video en el campo principal
[ ] Output: seleccionar 4K si disponible, si no 1080p | 24fps | 16:9
[ ] Generate → esperar resultado

REVISIÓN:
[ ] ¿Cámara se movió? → Agregar al inicio: "ABSOLUTELY STATIC CAMERA.
    Surveillance camera. Physically bolted. Cannot move."
[ ] ¿Colores derivaron? → Agregar: "FORBIDDEN colors: cyan, blue, teal,
    any warm tones. ONLY violet #6D00FF and emerald #10B981 as accents."
[ ] ¿Transición brusca? → Agregar: "All changes happen imperceptibly
    gradually. Like watching ice melt, never like a cut."
[ ] ¿Form del bicep curl raro? → Agregar: "The athlete's elbow stays
    pinned to his torso throughout the curl. Only the forearm moves."
[ ] Si necesitas más duración → Extend con instrucción específica

EXPORT Y COLOCACIÓN:
[ ] Export .mp4 H.264 | 1080p o 4K
[ ] hero-loop.mp4     → /ngx-hybrid-web/public/videos/
[ ] vsl-teaser.mp4    → /ngx-hybrid-web/public/videos/
[ ] results-bridge.mp4 → /ngx-hybrid-web/public/videos/
```

### .env.local para activar:

```bash
NEXT_PUBLIC_HERO_VIDEO_SRC=/videos/hero-loop.mp4
NEXT_PUBLIC_VSL_TEASER_VIDEO_SRC=/videos/vsl-teaser.mp4
NEXT_PUBLIC_RESULTS_VIDEO_SRC=/videos/results-bridge.mp4
```

---

## TABLA DE TROUBLESHOOTING

| Problema | Fix exacto |
|---------|-----------|
| Cámara se mueve | Iniciar el prompt con: "ABSOLUTELY STATIC CAMERA. Surveillance camera bolted to the floor. Zero movement of any kind." |
| Deriva de colores a cyan/azul | Agregar: "FORBIDDEN: cyan, blue, teal, turquoise. ONLY violet #6D00FF or emerald #10B981 as accent colors, nothing else." |
| Frame 2 pierde el ambiente del Frame 1 | Subir Frame 1 como referencia Y agregar: "The environment, camera angle, and lens perspective are identical to the reference image. Only the subject changes." |
| GENESIS tiene boca | Agregar: "CRITICAL: The face is completely smooth below the cheekbones. No mouth. No lips. No teeth. No nose bridge. The feature area below the eyes is a flat smooth dark surface with zero detail." |
| Curl de bíceps mal ejecutado | Agregar: "The athlete's upper arm stays completely vertical and stationary throughout. His elbow is pinned to the side of his torso and does not move forward or backward. Only the forearm rotates upward from the elbow." |
| Hologramas se ven sólidos | Agregar: "Each holographic panel is semi-transparent dark glass — like looking through a tinted car window. The background is partially visible through each panel." |
| Transición muy abrupta | Agregar: "The entire transition must be imperceptibly gradual. No element changes quickly. Imagine the slowest possible dissolve — like watching a sunrise, not a light switch." |
| Audio no se genera bien | Agregar al final del prompt como oración separada: "Audio: [descripción específica del audio que quieres]" |

---

*Feb 18, 2026 — VEO 3.1 (4K nativo, audio en Frames to Video) × Cinematic Reveal Studio × NGX Visual DNA*
*Ejercicio actualizado: curl de bíceps (rendering más confiable que sentadilla trasera)*
