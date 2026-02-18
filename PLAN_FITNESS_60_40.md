# PLAN: Landing NGX HYBRID — Upgrade Visual Fitness 60/40

> **Objetivo**: Transformar la percepción visual de "plataforma tech con componente fitness" a "sistema de transformación física + longevidad potenciado por IA"
> **Ratio target**: 60% fitness/performance/longevidad — 40% tech/IA/HYBRID
> **Archivos**: `page.tsx` + `globals.css` (single-page app)

---

## DIAGNÓSTICO ESTRATÉGICO

### Lo que ya funciona (no tocar)
- ✅ Sistema de color dual Violet (tech) / Emerald (longevity)
- ✅ KPIs del hero con contexto fitness (91%, 12+, Semana 2)
- ✅ Stat callouts en creencias (3-8%, 73%, 12%)
- ✅ Sección "Resultados que se miden" con 4 métricas reales
- ✅ Semana Real HYBRID con ejercicios específicos (sentadilla, press, carries)
- ✅ Timeline de Longevidad (Semana 2 → Año 5+)
- ✅ 9 imágenes brand ya colocadas en secciones correctas

### Lo que falta (las 3 palancas de mayor impacto)

| Gap | Impacto | Por qué importa |
|-----|---------|-----------------|
| **Sin video** | 🔴 Crítico | Video es el medio #1 para comunicar cuerpo, movimiento y transformación. Sin video, la página se lee, no se siente. |
| **Hero media es estático** | 🟡 Alto | El panel derecho del hero es una imagen con overlay. Es el primer contacto visual — debería MOVER. |
| **Imágenes en "support-media" se sienten pequeñas** | 🟡 Alto | Las imágenes de gym y GENESIS existen pero están contenidas en cards pequeñas con overlays oscuros. No respiran. |

---

## PLAN DE EJECUCIÓN

### FASE 1: Video (la palanca que más mueve la aguja)

#### 1.1 — Hero Video Loop (reemplazar imagen estática)
**Qué**: Reemplazar el panel derecho del hero (actualmente `genesis-coaching-squat.png` con overlay) por un `<video autoplay loop muted playsinline>` con fallback a imagen.

**Video a generar (VEO 3.1)**:
- **Duración**: 8s base → extender a 16s para loop natural
- **Concepto**: "GENESIS + Entrenamiento en Gym Premium Oscuro"
- **Contenido**: GENESIS de pie en gym dark premium, hologramas de datos de entrenamiento flotando, transición a persona ejecutando squat con barra, GENESIS escaneando biomecánica con violet beams
- **Mood**: Cinematográfico, oscuro, violeta dominante, movimiento lento
- **Aspect ratio**: 16:9
- **Audio**: Muted (el hero tiene copy que necesita atención)

**Impacto**: El hero pasa de "landing page tech" a "experiencia inmersiva de performance"

#### 1.2 — VSL Mechanism Video (reemplazar thumbnail estático)
**Qué**: Reemplazar el thumbnail del VSL en la sección "Mecanismo" por un teaser autoplay de 8s que invite a ver el video completo.

**Video a generar (VEO 3.1)**:
- **Duración**: 8s
- **Concepto**: "El Mecanismo HYBRID en acción"
- **Contenido**: Split visual — izquierda: GENESIS analizando datos en hologramas (métricas, periodización) / derecha: persona entrenando con intensidad controlada. Transición donde ambos mundos se fusionan.
- **Audio**: Nativo — sonido ambiente de gym + subtle electronic hum

**Impacto**: La sección de mecanismo deja de sentirse como documentación y se vuelve demo visual.

#### 1.3 — Results Montage Micro-Video (nuevo, entre resultados y timeline)
**Qué**: Insertar un micro-video (8s) entre la sección de Resultados y el Timeline de Longevidad.

**Video a generar (VEO 3.1)**:
- **Duración**: 8s
- **Concepto**: "Métricas que cambian en tiempo real"
- **Contenido**: Close-up de dashboard holográfico mostrando números cambiando (grasa bajando, músculo subiendo, HbA1c mejorando), pull-back para revelar a persona post-entrenamiento mirando sus métricas con satisfacción.
- **Estilo**: Data visualization cinematográfica con violet/emerald

**Impacto**: Bridge visual entre los números estáticos de "Resultados" y la promesa futura del "Timeline"

---

### FASE 2: Upgrade Visual de Imágenes (código, sin assets nuevos)

#### 2.1 — Imágenes diagnóstico → Full-bleed con parallax
**Qué**: Las 2 imágenes en diagnóstico (`genesis-coaching-squat` + `gym-premium-empty`) están en `aspect-[4/3]` contenidas. Cambiar a full-width con efecto parallax sutil.

**Cambio técnico**:
- De `aspect-[4/3] sm:aspect-[3/2]` → `aspect-[16/9]` para más presencia
- Agregar CSS `background-attachment: fixed` simulado con transform en scroll
- Reducir overlay oscuro de `support-media-overlay` para que las imágenes respiren más

#### 2.2 — Imagen de mecanismo → Más grande y protagonista
**Qué**: `genesis-gym-data.png` en la sección mecanismo está en un `support-media aspect-video` pequeño. Darle más espacio visual.

**Cambio técnico**:
- Aumentar el aspect ratio
- Agregar un caption descriptivo que refuerce el mensaje fitness

#### 2.3 — CTA Final → Background image más visible
**Qué**: La imagen de fondo del CTA final (`genesis-gym-team.png`) está al 12% de opacidad. Casi invisible.

**Cambio técnico**:
- Subir opacidad de `opacity-[0.12]` → `opacity-[0.22]`
- Ajustar gradient overlay para mantener legibilidad pero mostrar más la imagen

#### 2.4 — Nueva: Imagen full-width "break" entre Creencias y Mecanismo
**Qué**: Insertar una imagen full-width de `genesis-coaching-squat.png` o `genesis-gym-team.png` como visual break entre secciones de texto pesado.

**Implementación**: Sección nueva ultra-simple:
```
[Full-width image, aspect 21:9, con gradient fade top/bottom]
[Caption centrado: "Tu cuerpo merece un sistema que funcione."]
```

**Impacto**: Rompe la monotonía de glass-panels y mete al visitante en el mood fitness

---

### FASE 3: Micro-interacciones Performance (CSS/JS)

#### 3.1 — Contadores animados en Resultados
**Qué**: Los números de la sección "Resultados que se miden" (+12kg, +34%, -8%, -0.8%) son estáticos. Animarlos con counter-up cuando entran en viewport.

**Implementación**: IntersectionObserver + requestAnimationFrame. Los números arrancan en 0 y suben al valor final en ~1.5s con easing.

**Impacto**: Cada número se siente como un logro desbloqueado. Premium feel.

#### 3.2 — Progress bars animados
**Qué**: Las barras de progreso en Resultados y en "Semana Real" se cargan con animación al scroll.

**Implementación**: CSS `transition: width 1.2s ease-out` activado por IntersectionObserver

#### 3.3 — Timeline dots con pulse animation
**Qué**: Los 4 nodos del Timeline de Longevidad tienen un pulse sutil cuando entran en viewport.

**Implementación**: CSS `@keyframes pulse` en los circles del timeline, activado por `.in`

---

## FLUJO DE IMPLEMENTACIÓN

```
FASE 1 (Video)
├── 1. Generar 3 prompts VEO 3.1 (JSON format para máxima consistencia)
├── 2. Tú generas los videos en Flow
├── 3. Yo implemento <video> tags en page.tsx con fallback a imágenes actuales
│
FASE 2 (Imágenes) — Paralelo mientras se generan videos
├── 1. Upgrade CSS de support-media (parallax, aspect ratios, overlays)
├── 2. Nueva sección visual break full-width
├── 3. CTA background upgrade
│
FASE 3 (Micro-interacciones) — Después de Fase 2
├── 1. Animated counters
├── 2. Progress bars animados
├── 3. Timeline pulse
```

---

## QUÉ NO INCLUYO (y por qué)

| Descartado | Razón |
|-----------|-------|
| Cambiar copy/texto | El copy ya es A+. No es el problema. |
| Nuevas secciones de contenido | Ya hay suficientes secciones. El issue es visual, no de información. |
| Fotografía real de personas | Requiere photoshoot o stock. Las imágenes GENESIS-en-gym ya comunican el punto. Se puede iterar después. |
| Cambiar UnicornStudio background | Ya funciona bien como base. Los videos van ENCIMA de eso. |

---

## RESULTADO ESPERADO

**Antes**: Visitante scrollea → lee mucho texto en glass panels → ve imágenes pequeñas de un robot → piensa "esto es una app de IA"

**Después**: Visitante llega → video de gym + GENESIS lo engancha → imágenes grandes de entrenamiento lo meten en el mood → números que se animan le dan proof → timeline le muestra la visión → toma acción

**El shift**: De "leo sobre un producto tech" a "siento que esto transforma mi cuerpo"

---

## MÉTRICAS DE ÉXITO (post-deploy)

- Tiempo en página: debería subir (video retiene)
- Scroll depth: debería mejorar (visual breaks invitan a seguir)
- Click en CTA principal: debería mejorar (mood fitness → urgencia física)
- Bounce rate: debería bajar (primera impresión es video, no texto)

---

*Plan generado: Feb 18, 2026*
*Pendiente: Aprobación de Aldo antes de ejecutar*
