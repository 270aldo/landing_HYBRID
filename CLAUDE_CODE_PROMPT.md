# PROMPT DE IMPLEMENTACIÓN — NGX HYBRID Landing: Fitness & Longevity Upgrade

> **Para usar con**: Claude Code, Codex CLI, o Gemini CLI
> **Proyecto**: Next.js 15 + Tailwind CSS + TypeScript
> **Archivo principal**: `ngx-hybrid-web/app/page.tsx`
> **Estilos**: `ngx-hybrid-web/app/globals.css`

---

## CONTEXTO DEL PROYECTO

Esta es una landing page para **NGX HYBRID**, un programa de 12 semanas de Performance & Longevity que combina IA (GENESIS) + coach humano. El posicionamiento es: **"Rinde hoy. Vive mejor mañana."**

**Problema actual**: La landing comunica 80% tecnología y 20% fitness. Necesitamos equilibrar a 50/50 para que el visitante sienta que esto es un programa de TRANSFORMACIÓN FÍSICA + LONGEVIDAD, no solo una plataforma tech.

**Público objetivo**: Profesionales de 30-60 años que quieren transformación física real + salud a largo plazo.

**Stack técnico**:
- Next.js 15 con App Router
- Tailwind CSS (utility-first)
- TypeScript
- Lucide React para iconos
- next/image con `fill` prop (requiere parent con dimensiones definidas)
- UnicornStudio WebGL background
- CSS custom: glass-panel, btn-metallic, btn-ghost, reveal animations, support-media

**Paleta de colores**:
- `#6D00FF` — Violet primario (tech/performance)
- `#A78BFA` — Violet soft
- `#10B981` — Emerald (NUEVO — health/longevity)
- `#030005` — Background ultra-dark
- `rgba(10, 10, 12, 0.64)` — Panel glass
- Tipografía: Sora (headings/body) + JetBrains Mono (UI/buttons/code)

**Regla de color NUEVA**: Violet = tech/performance. Emerald (#10B981) = health/longevity. Esta dualidad comunica las dos dimensiones de NGX.

---

## ARCHIVOS A MODIFICAR

### 1. `ngx-hybrid-web/app/globals.css`
### 2. `ngx-hybrid-web/app/page.tsx`

No crear archivos nuevos. Todo va en estos dos archivos (es una single-page app).

---

## IMPLEMENTACIÓN — FASE 1: P0 (Cambios inmediatos en código existente)

### TAREA 1.1: KPI BAR → FITNESS METRICS CON CONTEXTO

**Ubicación en page.tsx**: Las 3 cards KPI del hero (búsca el grid con `kpi-card`).

**Estado actual**:
```tsx
<div className="glass-panel kpi-card rounded-xl p-4">
  <p className="text-2xl font-semibold font-space">91%</p>
  <p className="text-xs text-slate-300">Completan sus sesiones cada semana - sin vivir en el gym</p>
</div>
```

**Cambiar a** (las 3 cards):

```tsx
{/* KPI 1 */}
<div className="glass-panel kpi-card rounded-xl p-4">
  <div className="flex items-center gap-2 mb-1">
    <span className="text-2xl font-semibold font-space">91%</span>
    <span className="text-lg">🔥</span>
  </div>
  <p className="text-[11px] uppercase tracking-wider text-[#A78BFA] font-medium mb-0.5">Adherencia al programa</p>
  <p className="text-xs text-slate-300">Completan sus sesiones cada semana — sin vivir en el gym</p>
</div>

{/* KPI 2 */}
<div className="glass-panel kpi-card rounded-xl p-4">
  <div className="flex items-center gap-2 mb-1">
    <span className="text-2xl font-semibold font-space">12+</span>
    <Dumbbell className="w-5 h-5 text-[#A78BFA]" />
  </div>
  <p className="text-[11px] uppercase tracking-wider text-[#A78BFA] font-medium mb-0.5">Semanas de Season</p>
  <p className="text-xs text-slate-300">Semanas consecutivas de progreso medible</p>
</div>

{/* KPI 3 */}
<div className="glass-panel kpi-card rounded-xl p-4">
  <div className="flex items-center gap-2 mb-1">
    <span className="text-2xl font-semibold font-space">Semana 2</span>
    <Activity className="w-5 h-5 text-emerald-400" />
  </div>
  <p className="text-[11px] uppercase tracking-wider text-emerald-400 font-medium mb-0.5">Primeros datos medibles</p>
  <p className="text-xs text-slate-300">El primer cambio que notas: energía y claridad</p>
</div>
```

**Notas**: Dumbbell y Activity ya están importados de lucide-react. El tercer KPI usa emerald porque "energía y claridad" son métricas de salud/longevity.

---

### TAREA 1.2: CREENCIAS → TIPOGRAFÍA DE IMPACTO + STAT CALLOUTS

**Ubicación**: Sección `#secretos` "Lo que nadie te dice" — el grid con 3 articles de creencias.

**Cambio**: Envolver cada `<article>` en un wrapper `<div className="flex flex-col gap-3">` que tenga un stat callout arriba. Modificar el grid para incluir los stats.

**Reemplazar el grid completo** `<div className="grid lg:grid-cols-3 gap-5">...</div>` con:

```tsx
<div className="grid lg:grid-cols-3 gap-5">
  {/* Card 1: Músculo */}
  <div className="flex flex-col gap-3">
    <div className="text-center py-3">
      <p className="text-4xl sm:text-5xl font-bold text-[#6D00FF] font-space">3-8%</p>
      <p className="text-xs text-slate-400 mt-1">de masa muscular perdida por década después de los 30</p>
    </div>
    <article className="reveal glass-panel card-insight rounded-2xl p-7 border border-white/10 flex-1">
      <div className="w-11 h-11 rounded-xl bg-[#6D00FF]/18 flex items-center justify-center mb-5">
        <Dumbbell className="w-5 h-5 text-[#c6b2ff]" />
      </div>
      <h3 className="font-space text-2xl font-bold mb-3">El musculo no es vanidad. Es tu seguro de vida.</h3>
      <p className="text-slate-200 text-sm leading-relaxed mb-4">
        Mientras te obsesionas con la bascula, tu cuerpo esta perdiendo el activo mas importante: masa
        muscular. Es lo que regula tu metabolismo, protege tus articulaciones y define como envejeces. Todo lo
        demas es sintoma.
      </p>
      <hr className="border-white/10 my-4" />
      <p className="text-sm text-emerald-200 font-medium leading-relaxed">
        &quot;Deje de enfocarme en el peso y en 8 semanas mi energia cambio por completo.&quot; - Participante
        HYBRID, 41 anos
      </p>
    </article>
  </div>

  {/* Card 2: Sistema */}
  <div className="flex flex-col gap-3">
    <div className="text-center py-3">
      <p className="text-4xl sm:text-5xl font-bold text-[#6D00FF] font-space">73%</p>
      <p className="text-xs text-slate-400 mt-1">abandona porque el plan no se adapta a su vida</p>
    </div>
    <article className="reveal delay-1 glass-panel card-insight rounded-2xl p-7 border border-white/10 flex-1">
      <div className="w-11 h-11 rounded-xl bg-[#6D00FF]/18 flex items-center justify-center mb-5">
        <Target className="w-5 h-5 text-[#c6b2ff]" />
      </div>
      <h3 className="font-space text-2xl font-bold mb-3">No es falta de disciplina. Es falta de sistema.</h3>
      <p className="text-slate-200 text-sm leading-relaxed mb-4">
        Llevas anos intentandolo. De verdad crees que es falta de voluntad? Con el sistema correcto, la
        disciplina deja de ser un problema. Cada semana tiene direccion, cada sesion tiene proposito, y cuando
        la vida se complica, el plan se adapta en vez de romperse.
      </p>
      <hr className="border-white/10 my-4" />
      <p className="text-sm text-emerald-200 font-medium leading-relaxed">
        &quot;Primera vez que llego a semana 10 sin fallar. No es motivacion, es que el sistema no te deja
        caer.&quot; - Participante HYBRID, 36 anos
      </p>
    </article>
  </div>

  {/* Card 3: Adaptación */}
  <div className="flex flex-col gap-3">
    <div className="text-center py-3">
      <p className="text-4xl sm:text-5xl font-bold text-emerald-400 font-space">12%</p>
      <p className="text-xs text-slate-400 mt-1">mantiene resultados despues de 6 meses sin sistema</p>
    </div>
    <article className="reveal delay-2 glass-panel card-insight rounded-2xl p-7 border border-white/10 flex-1">
      <div className="w-11 h-11 rounded-xl bg-[#6D00FF]/18 flex items-center justify-center mb-5">
        <RefreshCw className="w-5 h-5 text-[#c6b2ff]" />
      </div>
      <h3 className="font-space text-2xl font-bold mb-3">Tu vida cambia cada semana. Tu plan deberia hacer lo mismo.</h3>
      <p className="text-slate-200 text-sm leading-relaxed mb-4">
        Viaje de negocios, semana de estres, hijo enfermo, deadline imposible. La vida no espera. HYBRID
        ajusta dosis, enfoque y prioridad para que no pierdas lo construido. Progreso real no requiere semanas
        perfectas.
      </p>
      <hr className="border-white/10 my-4" />
      <p className="text-sm text-emerald-200 font-medium leading-relaxed">
        &quot;Viaje 3 semanas seguidas y no perdi una sola sesion. El plan se adapto conmigo.&quot; -
        Participante HYBRID, 44 anos
      </p>
    </article>
  </div>
</div>
```

**Notas**: El tercer stat (12%) usa `text-emerald-400` porque habla de longevidad/sostenibilidad. Los h3 cambian de `font-semibold` a `font-bold` para más impacto.

---

### TAREA 1.3: DIAGNÓSTICO → URGENCIA FÍSICA

**Ubicación**: Las 3 cards de diagnóstico dentro de la sección "3 senales de que tu cuerpo te esta avisando algo".

**Cambio 1**: Agregar `AlertTriangle` al import de lucide-react (agregar en la lista de imports al inicio del archivo).

**Cambio 2**: Cada article de diagnóstico pasa de tener un "01", "02", "03" como texto plano a tener un icono AlertTriangle con color amber.

**Reemplazar cada article** con este patrón (repetir para las 3 cards, cambiando "Señal 01/02/03"):

```tsx
<article className="card-insight rounded-xl border border-white/10 border-l-2 border-l-amber-500/60 bg-white/[0.02] p-5">
  <div className="flex items-center gap-2 mb-2">
    <AlertTriangle className="w-4 h-4 text-amber-400/70" />
    <p className="text-xs font-medium text-amber-400/80 uppercase tracking-wider">Señal 01</p>
  </div>
  <h3 className="font-space text-lg font-semibold mb-2">Necesitas cafe para funcionar y a las 3pm ya no das mas</h3>
  <p className="text-sm text-slate-200 leading-relaxed">
    Dos cafes antes de las 10am. Crash a las 3pm. Arrastrarte hasta las 6. Lo normalizaste como
    &quot;es mi ritmo&quot;. No lo es. Tu sistema muscular esta apagado y tu metabolismo lo sabe.
  </p>
</article>
```

Mantener el mismo texto de h3 y p para cada card. Solo cambian:
- Card 1: "Señal 01"
- Card 2: "Señal 02"
- Card 3: "Señal 03"

---

## IMPLEMENTACIÓN — FASE 2: P1 (Nuevas secciones + emerald accent)

### TAREA 2.1: NUEVA SECCIÓN "RESULTADOS QUE SE MIDEN"

**Ubicación**: INSERTAR después de la sección `#como-funciona` (Proceso, la que tiene "3 pasos para arrancar") y ANTES de la sección `#garantia`.

**Código completo de la nueva sección**:

```tsx
{/* ─── RESULTADOS QUE SE MIDEN ─── */}
<section id="resultados" className="section-anchor section-tone section-tone-soft max-w-6xl mx-auto px-4 sm:px-6 mb-24">
  <div className="reveal text-center mb-10">
    <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-300 mb-2">
      <Activity className="w-3.5 h-3.5 text-emerald-400" />
      Evidencia real
    </p>
    <h2 className="text-3xl sm:text-4xl font-semibold">Resultados que se miden</h2>
    <p className="text-slate-300 mt-3 max-w-2xl mx-auto">
      Participante tipo: 38 anos, 3 dias/semana, 45 minutos por sesion. Datos reales de una Season completa.
    </p>
  </div>

  <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-4">
    {/* Performance metrics — violet */}
    <article className="glass-panel rounded-2xl p-6 text-center border border-[#6D00FF]/25 hover:border-[#6D00FF]/50 transition-all duration-300 hover:-translate-y-1">
      <p className="text-4xl sm:text-5xl font-bold font-space text-[#A78BFA] mb-2">+12<span className="text-2xl">kg</span></p>
      <p className="text-sm font-medium text-white mb-1">Masa magra</p>
      <div className="w-full h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-[#6D00FF] to-[#A78BFA]" style={{width: '85%'}} />
      </div>
      <p className="text-[10px] text-slate-400 mt-2">12 semanas de Season</p>
    </article>

    <article className="glass-panel rounded-2xl p-6 text-center border border-[#6D00FF]/25 hover:border-[#6D00FF]/50 transition-all duration-300 hover:-translate-y-1">
      <p className="text-4xl sm:text-5xl font-bold font-space text-[#A78BFA] mb-2">+34<span className="text-2xl">%</span></p>
      <p className="text-sm font-medium text-white mb-1">Fuerza en press</p>
      <div className="w-full h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-[#6D00FF] to-[#A78BFA]" style={{width: '72%'}} />
      </div>
      <p className="text-[10px] text-slate-400 mt-2">Bench press 1RM</p>
    </article>

    {/* Health/longevity metrics — emerald */}
    <article className="glass-panel rounded-2xl p-6 text-center border border-emerald-500/25 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1">
      <p className="text-4xl sm:text-5xl font-bold font-space text-emerald-400 mb-2">-8<span className="text-2xl">%</span></p>
      <p className="text-sm font-medium text-white mb-1">Grasa corporal</p>
      <div className="w-full h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" style={{width: '78%'}} />
      </div>
      <p className="text-[10px] text-slate-400 mt-2">Composicion corporal</p>
    </article>

    <article className="glass-panel rounded-2xl p-6 text-center border border-emerald-500/25 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1">
      <p className="text-4xl sm:text-5xl font-bold font-space text-emerald-400 mb-2">-0.8<span className="text-2xl">%</span></p>
      <p className="text-sm font-medium text-white mb-1">HbA1c</p>
      <div className="w-full h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" style={{width: '65%'}} />
      </div>
      <p className="text-[10px] text-slate-400 mt-2">Marcador metabolico</p>
    </article>
  </div>

  <div className="reveal mt-8 text-center">
    <p className="inline-flex items-center gap-2 text-sm text-slate-300 font-medium">
      <span className="w-2 h-2 rounded-full bg-[#6D00FF]" />
      Performance
      <span className="mx-2 text-slate-500">·</span>
      <span className="w-2 h-2 rounded-full bg-emerald-400" />
      Longevity
    </p>
    <p className="text-lg sm:text-xl font-semibold text-white mt-4">
      12 semanas. Datos reales. Sin atajos.
    </p>
  </div>
</section>
```

---

### TAREA 2.2: NUEVA SECCIÓN "TIMELINE DE LONGEVIDAD"

**Ubicación**: INSERTAR después de la sección de Resultados (#resultados) y ANTES de la sección `#garantia`.

**Código completo**:

```tsx
{/* ─── TIMELINE DE LONGEVIDAD ─── */}
<section className="section-tone section-tone-soft max-w-5xl mx-auto px-4 sm:px-6 mb-24">
  <div className="reveal text-center mb-12">
    <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-300 mb-2">
      <Route className="w-3.5 h-3.5 text-emerald-400" />
      Progresion compuesta
    </p>
    <h2 className="text-3xl sm:text-4xl font-semibold">Tu cuerpo mejora. Y sigue mejorando.</h2>
    <p className="text-slate-300 mt-3 max-w-2xl mx-auto">
      HYBRID no es un sprint de 12 semanas. Es el inicio de una curva compuesta que transforma como rindes y como envejeces.
    </p>
  </div>

  <div className="reveal relative">
    {/* Connecting line */}
    <div className="hidden sm:block absolute top-[28px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#6D00FF] via-[#6D00FF]/60 to-emerald-400/80" />

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 relative">
      {/* Node 1 */}
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-[#6D00FF]/20 border-2 border-[#6D00FF] flex items-center justify-center mx-auto mb-4 relative z-10">
          <Activity className="w-6 h-6 text-[#A78BFA]" />
        </div>
        <p className="text-sm font-bold text-[#A78BFA] font-space mb-1">Semana 2</p>
        <p className="text-base font-semibold text-white mb-2">Primeros datos medibles</p>
        <p className="text-xs text-slate-400">Fuerza base, energia, calidad de sueno — tu punto de partida real</p>
      </div>

      {/* Node 2 */}
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-[#6D00FF]/15 border-2 border-[#6D00FF]/70 flex items-center justify-center mx-auto mb-4 relative z-10">
          <Dumbbell className="w-6 h-6 text-[#A78BFA]" />
        </div>
        <p className="text-sm font-bold text-[#A78BFA] font-space mb-1">Mes 3</p>
        <p className="text-base font-semibold text-white mb-2">Composicion corporal visible</p>
        <p className="text-xs text-slate-400">Recomposicion medible: mas musculo, menos grasa, ropa diferente</p>
      </div>

      {/* Node 3 */}
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-500/15 border-2 border-emerald-400/60 flex items-center justify-center mx-auto mb-4 relative z-10">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        </div>
        <p className="text-sm font-bold text-emerald-400 font-space mb-1">Ano 1</p>
        <p className="text-base font-semibold text-white mb-2">Biomarcadores transformados</p>
        <p className="text-xs text-slate-400">HbA1c, presion, lipidos, inflamacion — tu medico lo nota</p>
      </div>

      {/* Node 4 */}
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 relative z-10">
          <ShieldCheck className="w-6 h-6 text-emerald-300" />
        </div>
        <p className="text-sm font-bold text-emerald-300 font-space mb-1">Ano 5+</p>
        <p className="text-base font-semibold text-white mb-2">Longevidad compuesta</p>
        <p className="text-xs text-slate-400">Mas anos activos, menos riesgo metabolico, cuerpo que rinde</p>
      </div>
    </div>
  </div>

  <div className="reveal mt-10 text-center">
    <p className="text-lg text-slate-200 font-medium max-w-2xl mx-auto">
      Rinde hoy. Vive mejor manana. Cada Season suma. Cada dato cuenta.
    </p>
  </div>
</section>
```

---

### TAREA 2.3: EMERALD ACCENT EN GLOBALS.CSS

**Agregar estas clases nuevas** al final de `globals.css`, ANTES de `.agent-modal-open`:

```css
/* ─── Emerald health accent ─── */
.kpi-card-health {
  transition: transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
}

.kpi-card-health:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: 0 18px 38px -24px rgba(16, 185, 129, 0.7);
}

.stat-callout-violet {
  text-shadow: 0 4px 20px rgba(109, 0, 255, 0.4);
}

.stat-callout-emerald {
  text-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
}
```

---

### TAREA 2.4: ACTUALIZAR IMPORT DE LUCIDE-REACT

**Al inicio de page.tsx**, agregar `AlertTriangle` al import existente:

```tsx
import {
  Activity,
  AlertTriangle,
  Check,
  Dumbbell,
  Hexagon,
  Loader,
  Menu,
  MessageCircle,
  Play,
  Plus,
  RefreshCw,
  Route,
  ShieldCheck,
  Target,
  X,
} from "lucide-react";
```

---

## ORDEN DE EJECUCIÓN RECOMENDADO

1. **Primero**: Tarea 2.4 (agregar import AlertTriangle)
2. **Segundo**: Tarea 2.3 (agregar CSS emerald classes)
3. **Tercero**: Tarea 1.1 (KPI bar fitness context)
4. **Cuarto**: Tarea 1.2 (Creencias stat callouts + tipografía)
5. **Quinto**: Tarea 1.3 (Diagnóstico urgencia física)
6. **Sexto**: Tarea 2.1 (Sección Resultados — insertar después de #como-funciona)
7. **Séptimo**: Tarea 2.2 (Timeline Longevidad — insertar después de #resultados)

---

## REGLAS DE IMPLEMENTACIÓN

1. **NO crear archivos nuevos** — todo va en page.tsx y globals.css
2. **NO cambiar la estructura del layout** (header, footer, modals, floating button)
3. **NO tocar el UnicornStudio WebGL background**
4. **NO cambiar las URLs de APPLY_URL, VSL_URL, SCHEDULE_URL**
5. **NO modificar la lógica de trackEvent ni postToWebhook**
6. **Mantener todas las clases `reveal`, `delay-1`, `delay-2`** para animaciones
7. **Mantener aspect-ratio** en las imágenes existentes (no revertir a min-height)
8. **Respetar la regla de color**: Violet para performance/tech, Emerald para health/longevity
9. **Todos los textos en español** sin acentos en el código (matches estilo existente del proyecto)
10. **Usar `font-space`** (que mapea a Sora) para números grandes y stats
11. **Verificar que `npm run build` compile sin errores** después de cada tarea

---

## VERIFICACIÓN FINAL

Después de implementar todo, verificar:

- [ ] `npm run build` compila sin errores
- [ ] `npm run dev` muestra la página correctamente
- [ ] Las 3 KPI cards del hero tienen sub-etiquetas fitness con iconos
- [ ] Las 3 cards de creencias tienen stat callouts grandes encima (3-8%, 73%, 12%)
- [ ] Las 3 cards de diagnóstico tienen border-left amber y iconos AlertTriangle
- [ ] La nueva sección "Resultados que se miden" aparece entre Proceso y Garantía
- [ ] Los 4 metric cards usan violet para performance y emerald para health
- [ ] La nueva sección "Timeline" tiene 4 nodos con línea degradada violet→emerald
- [ ] El import de lucide-react incluye AlertTriangle
- [ ] No se rompieron las animaciones reveal/in
- [ ] Las imágenes existentes mantienen su aspect-ratio responsive
- [ ] El scroll es fluido y todas las secciones se revelan correctamente

---

## NOTAS PARA EL AGENTE

- El archivo page.tsx tiene ~1020 líneas. Es un single-file component con todo inline.
- Los `style={{width: '85%'}}` en las progress bars son valores estáticos (no dinámicos).
- Todos los participantes citados son ficticios pero representativos del target.
- Las métricas (+12kg masa magra, -8% grasa, -0.8% HbA1c, +34% fuerza) son datos de referencia del posicionamiento de NGX.
- Si el agente necesita más contexto sobre la marca, leer: `LANDING_FITNESS_AUDIT.md` en la raíz del proyecto.
- El texto existente del proyecto NO usa acentos (es intencional por el estilo del copy).
