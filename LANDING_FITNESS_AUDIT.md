# NGX HYBRID Landing — Auditoría Visual: Fitness & Longevity Gap

## Estado actual: 80% Tech, 20% Fitness

La landing comunica tecnología + IA con éxito. Pero el positioning es
"Performance & Longevity" — y la mitad fitness/salud/cuerpo está subrepresentada.

---

## MEJORAS PRIORIZADAS POR IMPACTO

### P0 — Impacto inmediato (cambios en page.tsx, sin assets nuevos)

#### 1. KPI BAR → FITNESS METRICS CON CONTEXTO
**Qué**: Los 3 KPIs del hero (91%, 12+, Semana 2) necesitan sub-etiquetas fitness.
**Cómo**: Agregar un micro-icono SVG o emoji-style indicator:
- 91% → icono de streak/fuego + "adherencia al programa"
- 12+ → icono de peso/mancuerna + "semanas de Season"
- Semana 2 → icono de gráfica ascendente + "primeros datos medibles"
**Impacto**: Los números pasan de "métricas SaaS" a "progreso fitness real"

#### 2. CREENCIAS → TIPOGRAFÍA DE IMPACTO + STAT CALLOUT
**Qué**: Las 3 cards de creencias tienen copy A+ pero diseño B-
**Cómo**:
- Headline de cada card: subir a `text-2xl font-bold` (actualmente se ve como body text)
- Agregar un stat callout antes de cada card:
  - Card 1: "3-8% de masa muscular perdida por década después de los 30"
  - Card 2: "El 73% abandona porque el plan no se adapta a su vida"
  - Card 3: "Solo el 12% mantiene resultados después de 6 meses sin sistema"
- Los stats van en `text-3xl font-bold text-[#6D00FF]` como anchor visual
**Impacto**: Las creencias pegan emocionalmente. La sección deja de ser "info cards"

#### 3. DIAGNÓSTICO → URGENCIA FÍSICA
**Qué**: Las 3 señales necesitan sentirse como alertas del cuerpo, no features
**Cómo**:
- Agregar un accent bar izquierdo en cada card: `border-l-2 border-amber-500/60`
- El "01, 02, 03" actual cambiarlo a un icono de alerta sutil
- Color hint: amber (#F59E0B) al 30% opacity como color de "señal del cuerpo"
**Impacto**: Sección se siente como diagnóstico médico, no como lista de features

---

### P1 — Impacto alto (nuevas secciones o componentes)

#### 4. NUEVA SECCIÓN: "RESULTADOS QUE SE MIDEN" (Dashboard visual)
**Dónde**: Entre Garantía y Oferta (o después del Proceso)
**Qué**: Mini-dashboard con 4-6 métricas visuales de un participante tipo:
```
┌─────────────────────────────────────────────────────┐
│  RESULTADOS QUE SE MIDEN                            │
│  Participante tipo: 38 años, 3 días/semana          │
│                                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐           │
│  │+12kg │  │-8%   │  │-0.8% │  │+34%  │           │
│  │masa  │  │grasa │  │HbA1c │  │fuerza│           │
│  │magra │  │corp. │  │      │  │press │           │
│  │      │  │      │  │      │  │      │           │
│  │ ▲▲▲  │  │ ▼▼▼  │  │ ▼▼   │  │ ▲▲▲▲ │           │
│  └──────┘  └──────┘  └──────┘  └──────┘           │
│                                                     │
│  "12 semanas. Datos reales. Sin atajos."            │
└─────────────────────────────────────────────────────┘
```
**Implementación**: 4 glass-cards con el número grande, label, y un mini
sparkline o progress bar. Colores:
- Performance metrics (músculo, fuerza): violeta (#6D00FF)
- Health metrics (HbA1c, grasa): verde esmeralda (#10B981) como accent
**Impacto**: Esta sería la sección más poderosa de la landing. Muestra
visualmente que NGX produce resultados MEDIBLES en dos dimensiones.

#### 5. NUEVA SECCIÓN: "TIMELINE DE LONGEVIDAD"
**Dónde**: Antes del CTA final (como penúltima sección)
**Qué**: Timeline horizontal que muestra progresión compuesta:
```
Semana 2          Mes 3            Año 1            Año 5
─────●──────────────●────────────────●────────────────●───
Primeros datos    Composición      Biomarcadores    Longevidad
medibles          corporal         transformados    compuesta
                  visible
```
**Implementación**: CSS grid con 4 nodos conectados por línea. Cada nodo tiene:
- Timestamp label en violet
- Título corto
- 1-2 métricas específicas
- Gradient line que va de violet → emerald (performance → longevity)
**Impacto**: Visualiza la promesa de longevidad. Hace tangible "Vive mejor mañana"

#### 6. COLOR ACCENT: EMERALD PARA HEALTH/LONGEVITY
**Qué**: Introducir #10B981 (emerald) como color secundario EXCLUSIVO para
métricas de salud y longevidad
**Dónde aplicar**:
- Stats de salud en la sección de Resultados (HbA1c, grasa corporal)
- Nodos de longevidad en el Timeline
- El badge de "En línea" del widget conversacional
- Subtle emerald glow en las cards de diagnóstico (señal del cuerpo)
**Regla**: Violet = tech/performance. Emerald = health/longevity. Ambos = NGX.
**Impacto**: La paleta deja de ser monocromática SaaS y comunica dos dimensiones

---

### P2 — Impacto medio (requiere assets o contenido nuevo)

#### 7. FOTOGRAFÍA HUMANA REAL (O RENDERS CON FOCO EN LA PERSONA)
**Qué**: Al menos 2-3 imágenes donde el HUMANO sea protagonista, no GENESIS
**Opciones**:
- Generar nuevos renders con Nano Banana Pro focalizados en la PERSONA
  (GENESIS en background, persona haciendo squat/press en foreground)
- Usar fotografía stock premium de personas 35-50 entrenando
  (en dark environments que matcheen la paleta)
**Dónde**: Sección diagnóstico (reemplazar una imagen) + Sección creencias (hero image)
**Impacto**: El visitante se ve reflejado. Actualmente solo ve a un androide.

#### 8. VIDEO MICRO-TESTIMONIALS O METRICS REEL
**Qué**: Un reel corto (15-30s) mostrando dashboards reales de participantes
con métricas cambiando semana a semana
**Dónde**: Como embed en la sección de Resultados
**Herramienta**: VEO 3.1 o screen recording estilizado
**Impacto**: Proof point visual definitivo

---

## RESUMEN DE PRIORIDADES

| # | Mejora | Esfuerzo | Impacto |
|---|--------|----------|---------|
| 1 | KPI bar contexto fitness | 30 min | Alto |
| 2 | Creencias tipografía + stats | 45 min | Alto |
| 3 | Diagnóstico urgencia física | 20 min | Medio |
| 4 | Sección Resultados dashboard | 2-3 hrs | MUY ALTO |
| 5 | Timeline Longevidad | 1-2 hrs | Alto |
| 6 | Emerald accent color | 30 min | Alto |
| 7 | Fotografía humana | Variable | Alto |
| 8 | Video metrics reel | Variable | Medio |

**Recomendación de ejecución**: Hacer P0 (1-3) + #6 primero → la página mejora
dramáticamente en 2 horas. Luego #4 y #5 que son las secciones nuevas que más
impacto van a tener para comunicar Performance & Longevity.

---

## INSPIRACIÓN DRIBBBLE — PATRONES CLAVE

1. **Performance Metrics como Visual Anchors**: Páginas fitness premium usan stats
   grandes ("+12kg", "-0.8%") como anclas visuales que jalan al usuario por el scroll.
   No los esconden en copy — los hacen protagonistas.

2. **Dual-Color para Performance + Health**: Las plataformas de longevity más
   exitosas usan un color para rendimiento/intensidad y otro para
   salud/recuperación. Apple Fitness+ usa rojo + verde. Whoop usa azul + amarillo.

3. **Progress Rings / Sparklines**: Los dashboards fitness siempre incluyen
   micro-visualizaciones (donut charts, sparklines, progress bars) que hacen
   tangibles las métricas. No basta con el número.

4. **Tipografía de impacto en statements**: Las mejores landing pages fitness
   usan headlines enormes (48-64px) para las frases más poderosas. No todo
   tiene que ser del mismo tamaño.

5. **Human Photography in Dark Environments**: Los mejores landings de fitness
   premium muestran personas reales (35-50 años) entrenando en ambientes
   oscuros con iluminación dramática. El cuerpo humano ES el contenido.
