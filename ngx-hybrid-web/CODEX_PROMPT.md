# PROMPT PARA CODEX CLI — Correcciones Landing NGX HYBRID

> Pega este prompt en Codex CLI. El archivo `app/page.tsx` ya tiene la base funcional de ChatGPT. Este prompt corrige lo que quedó mal y agrega lo que falta.

---

## CONTEXTO

El archivo `app/page.tsx` ya tiene la estructura base de la landing page NGX HYBRID (Next.js 16, React 19, Tailwind 4). Necesito que apliques las siguientes correcciones SIN romper el design system existente (glass-panel, btn-metallic, btn-ghost, card-insight, card-mechanism, brand-photo-frame, reveal). Mantén todos los trackEvent y webhooks existentes. Todo el copy es en español con acentos correctos.

---

## CORRECCIÓN 1 — CTA Principal del Hero

Buscar el botón `#aplicar` del hero que dice "APLICAR A TU SEASON" y cambiarlo a:

```tsx
<a
  id="aplicar"
  href={APPLY_URL}
  className="btn-metallic px-8 py-4 rounded-full text-white font-semibold tracking-wide"
  onClick={() => trackEvent("cta_start_season_hero", { section: "hero", href: APPLY_URL })}
  target={APPLY_URL.startsWith("http") ? "_blank" : undefined}
  rel={APPLY_URL.startsWith("http") ? "noopener noreferrer" : undefined}
>
  EMPEZAR MI SEASON
</a>
```

También cambiar todos los demás CTAs que digan "Aplicar a HYBRID" o "Aplicar ahora" en el body (NO en el header nav) a "EMPEZAR MI SEASON" con evento `cta_start_season_[seccion]`. El botón del header "Aplicar a HYBRID" se MANTIENE igual.

---

## CORRECCIÓN 2 — Eliminar sección #agente completa

Buscar la sección con `id="agente"` (la que dice "Canal conversacional" / "Habla con nuestra guía GENESIS") y ELIMINARLA COMPLETAMENTE. Toda la sección `<section id="agente">...</section>` se borra.

La funcionalidad del agente se mantiene en: (a) botón flotante, (b) modal, (c) botón en CTA final.

---

## CORRECCIÓN 3 — Botón flotante → "Hablar con GENESIS"

Cambiar el botón flotante `#floatingAgentBtn`:

```tsx
<button
  id="floatingAgentBtn"
  type="button"
  className="fixed bottom-5 right-5 z-40 btn-metallic rounded-full px-4 py-3 text-xs font-semibold flex items-center gap-2 agent-pulse"
  onClick={() => {
    setAgentModalOpen(true);
    trackEvent("cta_talk_genesis_floating", { section: "floating_cta" });
  }}
>
  <MessageCircle className="w-4 h-4" />
  Hablar con GENESIS
</button>
```

---

## CORRECCIÓN 4 — Featured Image Section (Card Fundador)

Reemplazar la sección "FEATURED IMAGE SECTION" completa (la que tiene la foto Unsplash genérica y el copy "Las imágenes cuentan historias") con esta card de fundador con liquid glass:

```tsx
{/* ─── CARD FUNDADOR ─── */}
<section className="section-tone section-tone-soft max-w-5xl mx-auto px-4 sm:px-6 mb-24">
  <article className="reveal glass-panel brand-photo-frame rounded-2xl overflow-hidden">
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] min-h-[360px]">
      {/* Imagen — TODO: Reemplazar con /images/brand/aldo-founder.png cuando Aldo lo suba */}
      <div className="relative min-h-[280px] lg:min-h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#170629] via-[#0a0a0c] to-[#030005]" />
        <div className="brand-photo-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#6D00FF]/30 to-[#A78BFA]/20 border border-white/10 flex items-center justify-center">
            <Hexagon className="w-10 h-10 text-[#A78BFA]" />
          </div>
        </div>
      </div>
      {/* Copy */}
      <div className="p-8 sm:p-10 flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.22em] text-[#c6b2ff] mb-3 font-mono">Fundador · NGX GENESIS</p>
        <h2 className="font-space text-2xl sm:text-3xl font-semibold mb-4 leading-tight">
          3 años construyendo el sistema que la industria necesitaba.
        </h2>
        <p className="text-slate-200 text-sm leading-relaxed mb-6">
          10+ certificaciones. 4 iteraciones eliminadas. Sin equipo. Sin capital externo. Con una visión clara: que la salud muscular deje de ser fitness superficial y se convierta en el eje de tu longevidad.
        </p>
        <a
          href={APPLY_URL}
          className="btn-metallic rounded-full px-7 py-3 text-sm font-semibold text-white w-fit inline-flex items-center gap-2"
          onClick={() => trackEvent("cta_start_season_founder", { section: "founder_card", href: APPLY_URL })}
          target={APPLY_URL.startsWith("http") ? "_blank" : undefined}
          rel={APPLY_URL.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          EMPEZAR MI SEASON
        </a>
      </div>
    </div>
  </article>
</section>
```

---

## CORRECCIÓN 5 — Cambio de Creencias con datos de la tesis

Reemplazar el array `secrets` y la lógica de render de las cards de "Cambio de creencias". Cada card debe tener datos científicos de la tesis y un formato de reframe visual:

```tsx
const secrets = useMemo(
  () => [
    {
      icon: Activity,
      title: "El músculo no es estética. Es tu motor.",
      description:
        "El peso suele ser el síntoma. La salud muscular suele ser la causa que nadie está atendiendo. El músculo es el órgano endocrino más grande del cuerpo — 40% de tu peso corporal.",
      oldBelief: "Necesito bajar de peso para estar bien.",
      newBelief: "Necesito construir salud muscular. El peso se ajusta como consecuencia.",
      scienceData: "Baja masa muscular: +30% riesgo mortalidad · Baja fuerza: +66% riesgo mortalidad (Li et al. 2025)",
      delay: "",
    },
    {
      icon: Route,
      title: "No fallas por falta de ganas.",
      description:
        "Fallas por entrenar en modo azar. La salida real combina dosis mínima efectiva, progresión medible y recuperación estratégica. El entrenamiento de resistencia reduce mortalidad por todas las causas un 15%.",
      oldBelief: "Debo tener más disciplina y fuerza de voluntad.",
      newBelief: "Necesito un sistema que ajuste la dosis a mi contexto real.",
      scienceData: "Periodización vs no-periodización: +0.31 effect size (meta-análisis, 35 estudios)",
      delay: "delay-1",
    },
    {
      icon: RefreshCw,
      title: "La consistencia no se exige. Se diseña.",
      description:
        "Tu vida cambia, el sistema también. HYBRID ajusta temprano para proteger el hábito y acumular semanas ganadoras sin depender de motivación perfecta.",
      oldBelief: "Si dejo una semana, perdí todo el progreso.",
      newBelief: "Un sistema inteligente absorbe variabilidad sin romperse.",
      scienceData: "Personalización aumenta adherencia 3x vs programas genéricos (14 factores controlables)",
      delay: "delay-2",
    },
  ],
  [],
);
```

Y el render de cada card:

```tsx
{secrets.map((secret, idx) => {
  const isOpen = openSecret === idx;
  const Icon = secret.icon;
  return (
    <article
      key={idx}
      className={`reveal ${secret.delay} glass-panel card-insight rounded-2xl p-7 border border-white/10 cursor-pointer group transition-all duration-300 ${isOpen ? "border-[#6D00FF]/40 shadow-[0_0_30px_-10px_rgba(109,0,255,0.4)]" : ""}`}
      onClick={() => setOpenSecret(isOpen ? null : idx)}
    >
      <div className="w-11 h-11 rounded-xl bg-[#6D00FF]/18 flex items-center justify-center mb-5">
        <Icon className="w-5 h-5 text-[#c6b2ff]" />
      </div>
      <h3 className="font-space text-2xl font-semibold mb-3">{secret.title}</h3>
      <p className="text-slate-200 text-sm leading-relaxed">{secret.description}</p>

      {/* Belief reframe — visible on click */}
      <div className={`overflow-hidden transition-all duration-400 ${isOpen ? "max-h-[250px] opacity-100 mt-5 pt-4 border-t border-white/10" : "max-h-0 opacity-0"}`}>
        <div className="h-px bg-gradient-to-r from-transparent via-[#6D00FF] to-transparent mb-4" />
        <p className="text-xs text-slate-400 line-through mb-2">❌ &ldquo;{secret.oldBelief}&rdquo;</p>
        <p className="text-sm text-[#c6b2ff] font-medium mb-3">✓ &ldquo;{secret.newBelief}&rdquo;</p>
        <p className="text-xs text-slate-500 italic">📊 {secret.scienceData}</p>
      </div>
    </article>
  );
})}
```

---

## CORRECCIÓN 6 — FAQ con respuestas más completas

Reemplazar el array `faqList` con estas respuestas más fundamentadas:

```typescript
const faqList = [
  {
    q: "¿Esto es solo una app?",
    a: "No. HYBRID es un sistema donde tres fuerzas trabajan juntas: la IA analiza tus datos (sueño, energía, progreso, contexto) y propone ajustes basados en evidencia. El coach humano valida esas propuestas, corrige técnica y aporta criterio. Y tú ejecutas, das feedback y aprendes a leer tu cuerpo. No es una app con rutinas. Es un sistema con control de calidad.",
    event: "faq_open_app",
  },
  {
    q: "¿Y si tengo poco tiempo?",
    a: "Diseñamos dosis mínima efectiva: 30-45 minutos por sesión. La ciencia muestra que entrenar cada grupo muscular 2 veces por semana es suficiente para resultados reales. No necesitas vivir en el gym. Necesitas consistencia inteligente. El objetivo es acumular semanas ganadoras, no ganar la semana más intensa.",
    event: "faq_open_time",
  },
  {
    q: "¿Qué pasa si viajo o tengo semanas difíciles?",
    a: "El sistema ajusta la dosis automáticamente. Si dormiste mal, si tu energía bajó, si viajaste — GENESIS detecta el cambio y adapta. El coach valida. No se rompe el plan por una semana imperfecta. De hecho, esa capacidad de ajuste temprano es lo que evita el ciclo de 'empecé bien y dejé a las 3 semanas'.",
    event: "faq_open_weeks",
  },
  {
    q: "¿Funciona si soy principiante?",
    a: "Sí. Principiantes suelen progresar más rápido con un sistema seguro y consistente. HYBRID arranca con dosis conservadora los primeros 7 días (Kickstart), evalúa tu respuesta real al estímulo, y progresa gradualmente. No necesitas experiencia previa. Necesitas un sistema que respete dónde estás.",
    event: "faq_open_beginner",
  },
  {
    q: "¿Necesito gym completo?",
    a: "No necesariamente. Se adapta a tu contexto: gym completo, home gym o mixto. El sistema diseña con lo que tienes disponible. Lo que importa es el estímulo de resistencia adecuado, no el lugar.",
    event: "faq_open_gym",
  },
  {
    q: "¿Cómo se mide el progreso?",
    a: "Con métricas que realmente importan para tu salud muscular: fuerza (cargas progresivas), medidas corporales, energía percibida y adherencia semanal. Nada de 'peso en la báscula' como única métrica. Checkpoints en semanas 1, 4, 8 y 12. Progreso medible, no promesas vacías.",
    event: "faq_open_progress",
  },
  {
    q: "¿Qué tan estricto es?",
    a: "Es serio, pero no rígido. Buscamos consistencia sostenible, no perfección. El protocolo mínimo es 80% de sesiones completadas + check-ins semanales. Si cumples eso, el sistema funciona. Si no puedes ser perfecto, el sistema se adapta — esa es la diferencia con un plan estático.",
    event: "faq_open_strict",
  },
  {
    q: "¿Qué pasa si no soy fit para HYBRID?",
    a: "Te lo diremos directo. La aplicación de 90 segundos sirve como filtro real. Si tu contexto actual no encaja con HYBRID, te lo decimos con honestidad y te sugerimos el siguiente paso adecuado. Verdad Directa aplica también para esto.",
    event: "faq_open_notfit",
  },
];
```

---

## CORRECCIÓN 7 — Modal del agente limpio con ElevenLabs real

Reemplazar todo el modal (`agentModalOpen`) con esta versión limpia que integra ElevenLabs directamente:

```tsx
{agentModalOpen && (
  <div
    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70"
    role="dialog"
    aria-modal="true"
    onClick={(e) => { if (e.target === e.currentTarget) setAgentModalOpen(false); }}
  >
    <div className="glass-panel rounded-2xl w-full max-w-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6D00FF] to-[#A78BFA] flex items-center justify-center">
            <Hexagon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-space text-lg font-semibold">GENESIS</h3>
            <p className="text-xs text-slate-400">Performance & Longevity</p>
          </div>
        </div>
        <button type="button" className="btn-ghost rounded-lg p-2" aria-label="Cerrar" onClick={() => setAgentModalOpen(false)}>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ElevenLabs Widget — reemplaza placeholder */}
      <div className="min-h-[420px] flex items-center justify-center">
        {process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ? (
          <elevenlabs-convai agent-id={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}></elevenlabs-convai>
        ) : (
          <div className="text-center p-8 text-slate-400">
            <Hexagon className="w-12 h-12 mx-auto mb-4 text-[#6D00FF]/40" />
            <p className="text-sm">Agente GENESIS en configuración</p>
            <p className="text-xs mt-2">Mientras tanto, aplica directamente o agenda una llamada.</p>
            <div className="flex gap-3 justify-center mt-4">
              <a href={APPLY_URL} className="btn-metallic rounded-full px-5 py-2.5 text-xs font-semibold"
                onClick={() => trackEvent("cta_start_season_modal", { section: "agent_modal", href: APPLY_URL })}>
                EMPEZAR MI SEASON
              </a>
              <a href={SCHEDULE_URL} className="btn-ghost rounded-full px-5 py-2.5 text-xs font-semibold"
                onClick={() => trackEvent("agent_schedule_modal", { section: "agent_modal", href: SCHEDULE_URL })}>
                Agendar llamada
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}
```

Y agregar en el `useEffect` existente (donde se carga UnicornStudio), DESPUÉS de ese bloque:

```tsx
// ElevenLabs Conversational AI widget loader
if (!document.querySelector('script[data-elevenlabs-loader]')) {
  const elScript = document.createElement("script");
  elScript.src = "https://elevenlabs.io/convai-widget/index.js";
  elScript.async = true;
  elScript.setAttribute("data-elevenlabs-loader", "1");
  document.head.appendChild(elScript);
}
```

---

## CORRECCIÓN 8 — CTA Final con doble botón

Reemplazar los botones del CTA final con:

```tsx
<div className="flex flex-col sm:flex-row justify-center gap-3">
  <a
    href={APPLY_URL}
    className="btn-metallic rounded-full px-8 py-4 text-sm sm:text-base font-semibold"
    onClick={() => trackEvent("cta_start_season_final", { section: "cta_final", href: APPLY_URL })}
    target={APPLY_URL.startsWith("http") ? "_blank" : undefined}
    rel={APPLY_URL.startsWith("http") ? "noopener noreferrer" : undefined}
  >
    EMPEZAR MI SEASON
  </a>
  <button
    type="button"
    className="btn-ghost rounded-full px-8 py-4 text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2"
    onClick={() => { setAgentModalOpen(true); trackEvent("cta_talk_genesis_final", { section: "cta_final" }); }}
  >
    <Hexagon className="w-4 h-4 text-[#A78BFA]" />
    Hablar con GENESIS
  </button>
</div>
```

---

## CORRECCIÓN 9 — CSS para belief cards (globals.css)

Agregar al final de `app/globals.css`:

```css
/* ── Belief reframe transitions ── */
.belief-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--ngx-violet), transparent);
  margin: 16px 0;
}
```

---

## DESPUÉS DE APLICAR TODAS LAS CORRECCIONES

1. Ejecutar `npm run build` — debe compilar sin errores
2. Verificar que el orden de secciones es: Hero → Card Fundador → Diagnóstico → Cambio de Creencias → Nueva Oportunidad → Cómo Funciona → Oferta → Garantía → Escasez → FAQ → CTA Final → Footer
3. La sección #agente ya NO debe existir
4. Todos los CTAs del body (excepto header) deben decir "EMPEZAR MI SEASON"
5. El botón flotante debe decir "Hablar con GENESIS"
6. El modal debe cargar ElevenLabs o mostrar fallback elegante

---

## ARCHIVOS QUE SE MODIFICAN

| Archivo | Cambios |
|---------|---------|
| `app/page.tsx` | 8 correcciones: CTA hero, eliminar #agente, botón flotante, card fundador, belief cards con ciencia, FAQ completo, modal ElevenLabs, CTA final |
| `app/globals.css` | Agregar `.belief-divider` |

## ARCHIVOS QUE NO SE TOCAN
- `app/layout.tsx`
- `package.json`
- `tailwind.config.ts`
- `next.config.ts`
- `.env.local` (solo se actualiza ELEVENLABS_AGENT_ID cuando se cree el agente)

---

## NOTA PARA DESPUÉS: System Prompt del agente GENESIS en ElevenLabs

Cuando Aldo cree el agente en ElevenLabs Dashboard, usar este system prompt:

```
Eres GENESIS, la inteligencia artificial de NGX — una plataforma de Performance & Longevity.

TU PROPÓSITO: Hablar con visitantes de la landing page de NGX HYBRID para resolver sus dudas, explicar el programa, y guiarlos hacia el siguiente paso correcto.

PERSONALIDAD (INTJ — El Arquitecto):
- Directo pero respetuoso. Nunca agresivo.
- Técnico cuando es necesario, simple cuando se puede.
- Confiado en el sistema, nunca arrogante.
- Empático con las frustraciones del visitante.
- Tono: autoridad calmada. Como un estratega que ya vio el panorama completo.

FILOSOFÍA — VERDAD DIRECTA:
- Confrontar con respeto, fundamentar con ciencia, resolver con sistemas.
- "No te voy a decir lo que quieres escuchar. Te voy a decir lo que necesitas saber."

LO QUE SABES SOBRE NGX HYBRID:
- Sistema de Performance & Longevity: IA + coach humano + usuario
- Seasons de 12 semanas: Fundación → Construcción → Optimización
- Checkpoints en semanas 1, 4, 8 y 12
- La IA propone ajustes basados en datos reales (sueño, energía, progreso, contexto)
- El coach humano valida propuestas, corrige técnica, aporta criterio
- Dosis mínima efectiva: 30-45 min por sesión, cada grupo muscular 2x/semana
- Kickstart guiado de 7 días al iniciar

TESIS CENTRAL — SALUD MUSCULAR:
- Después de los 30, el problema no es el peso. Es la salud muscular.
- El músculo es el órgano endocrino más grande (40% del peso corporal)
- Baja masa muscular: +30% riesgo mortalidad
- Baja fuerza muscular: +66% riesgo mortalidad
- Entrenamiento de resistencia: -15% mortalidad por todas las causas
- Proteína óptima: ≥1.6 g/kg/día con entrenamiento de resistencia
- Sueño: componente no negociable para síntesis proteica

PRECIOS:
- HYBRID: $199-$499/mes según nivel de soporte
- Valor referencia: $4,400+
- Garantía: Progreso Medible a 30 días (80% sesiones + check-ins → 4 semanas extra sin costo si no hay progreso en 2+ métricas)

FLUJO DE CONVERSACIÓN:
1. Saluda directo. Pregunta en qué puedes ayudar.
2. Escucha su situación: ¿qué los trajo aquí? ¿qué han intentado?
3. Identifica nivel:
   - CURIOSOS → Educa sobre salud muscular
   - INTERESADOS → Explica HYBRID en detalle
   - LISTOS → Guía a aplicar o agendar llamada
4. Siempre cierra con siguiente paso claro.

MANEJO DE OBJECIONES:
- "Es caro" → Compara con lo que ya gastaste en lo que no funcionó. Inversión con garantía medible.
- "No tengo tiempo" → 30-45 min. Dosis mínima efectiva.
- "Ya intenté todo" → Programas genéricos no te conocen. HYBRID se adapta a TU contexto.
- "No sé si funciona para mí" → Aplicación de 90 segundos evalúa si eres fit. Sin compromiso.

REGLAS:
- Nunca prometas resultados específicos garantizados
- Nunca des consejo médico
- Sé honesto sobre tu naturaleza como IA si preguntan
- Nunca seas agresivo en ventas
- Si alguien no es fit, dilo directamente
- Habla en español. Usa "tú" para 30-45 años.
- Firma: "El conocimiento te libera."
```

Configuración de voz: Stability 0.65, Clarity 0.80, Style 0.45, modelo eleven_multilingual_v2, idioma español.
