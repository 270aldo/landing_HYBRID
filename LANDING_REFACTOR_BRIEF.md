# NGX HYBRID Landing — Refactor Brief (Hormozi + Hybrid Funnel)

**Fecha**: 17 Feb 2026
**Objetivo**: Reescribir copy, reestructurar secciones, y reconfigurar CTAs para un flujo híbrido donde GENESIS pre-califica y rutea al usuario (agendar llamada o aplicar directo).
**Archivo target**: `ngx-hybrid-web/app/page.tsx`
**NO tocar**: `globals.css`, `layout.tsx` (los estilos actuales son correctos)

---

## REGLAS GLOBALES

### Filosofía de copy
- **Hormozi**: Vendemos la TRANSFORMACIÓN, no el vehículo. Pain → Mechanism → Offer → Guarantee.
- **NGX Voice**: Direct but warm, technical but accessible. "Verdad Directa".
- **GENESIS es UNO**: Nunca mencionar agentes separados (BLAZE, METABOL, etc.). Solo "GENESIS".
- **Tagline**: "Rinde hoy. Vive mejor mañana."
- **Target**: Personas de 30-60 años.

### Jerarquía de CTAs (flujo híbrido)
```
PRIMARIO (80% esfuerzo visual):
→ "Descubre si HYBRID es para ti" → Abre GENESIS (setAgentModalOpen(true))
   trackEvent: "cta_genesis_hero" / "cta_genesis_[section]"

SECUNDARIO (para los decididos):
→ "Ya estoy listo — Aplicar directamente" → APPLY_URL
   trackEvent: "cta_apply_[section]"

TERCIARIO (para indecisos):
→ "Agendar llamada con el equipo" → SCHEDULE_URL
   trackEvent: "cta_schedule_[section]"
```

### Regla de precios
- **NO mostrar precios explícitos en la landing** ($199-$499 eliminado)
- La oferta muestra el value stack pero cierra con: "Tu inversión depende de tu nivel de soporte. GENESIS te ayuda a elegir el plan correcto."
- Los precios se revelan después de que GENESIS califique.

---

## ESTRUCTURA DE SECCIONES (NUEVO ORDEN)

El orden actual vs el nuevo:

```
ACTUAL:                          NUEVO:
1. Header/Nav                    1. Header/Nav (simplificado)
2. Hero                          2. Hero (copy nuevo + GENESIS como CTA primario)
3. Diagnóstico (3 señales)       3. Diagnóstico (3 señales - copy más visceral)
4. Cambio de creencias           4. GENESIS CTA intermedio (NUEVO - micro-CTA)
5. Qué es HYBRID + Video         5. Cambio de creencias (copy más punchy)
6. Cómo funciona (3 pasos)       6. Qué es HYBRID + Video
7. Oferta (value stack)          7. Cómo funciona (3 pasos rehecho)
8. Garantía                      8. GARANTÍA (SUBE - antes de oferta)
9. Scarcity banner               9. Oferta (value stack SIN precios)
10. Agente conversacional        10. Scarcity banner (más específico)
11. FAQ                          11. Agente conversacional (copy mejorado)
12. CTA final                    12. FAQ (respuestas más cortas)
13. Footer                       13. CTA final (Hormozi close)
                                 14. Footer
```

---

## CAMBIOS SECCIÓN POR SECCIÓN

### 1. HEADER / NAV

**Cambios:**
- Reducir nav items de 4 a 2: "Cómo funciona" y "Garantía"
- CTA del nav cambia de "Aplicar a HYBRID" a "Hablar con GENESIS" (abre modal)
- Agregar indicador de urgencia al CTA: considerar texto dinámico

```tsx
// menuItems - NUEVO
const menuItems = useMemo(
  () => [
    { id: "como-funciona", label: "Cómo funciona" },
    { id: "garantia", label: "Garantía" },
  ],
  [],
);

// CTA del nav - NUEVO (reemplaza el <a> de "Aplicar a HYBRID")
<button
  type="button"
  className="btn-metallic px-5 py-2.5 rounded-full text-white text-xs font-bold tracking-wide"
  onClick={() => {
    setAgentModalOpen(true);
    trackEvent("cta_genesis_nav", { section: "header" });
  }}
>
  Hablar con GENESIS
</button>
```

---

### 2. HERO

**Badge** (mantener estructura, cambiar copy):
```
ACTUAL: "Cohorte Febrero 2026 - Cupos limitados"
NUEVO:  "Cohorte Febrero 2026 — 8 de 20 cupos disponibles"
```

**H1:**
```
ACTUAL:
Después de los 30,
no es el peso.
Es la salud muscular.

NUEVO:
Después de los 30,
el problema no es el peso.
Es lo que estás perdiendo sin darte cuenta.
```
(La línea gradient "hero-violet" aplica a: "Es lo que estás perdiendo sin darte cuenta.")

**Subtítulo:**
```
ACTUAL:
La salud muscular es el motor de tu energía, tu metabolismo y cómo envejece tu cuerpo. HYBRID es el sistema donde IA, coach humano y tú construyen esa base juntos en Seasons de 12 semanas con progreso medible.

NUEVO:
Cada semana sin un sistema real, tu cuerpo practica envejecer: pierdes músculo, energía y capacidad metabólica. HYBRID detiene eso. IA + coach humano + tú, construyendo en 12 semanas lo que ninguna app puede hacer sola.
```

**CTAs (CAMBIO CRÍTICO):**
```tsx
// CTA Primario - NUEVO (era "APLICAR A LA COHORTE")
<button
  type="button"
  className="btn-metallic px-8 py-4 rounded-full text-white font-semibold tracking-wide"
  onClick={() => {
    setAgentModalOpen(true);
    trackEvent("cta_genesis_hero", { section: "hero" });
  }}
>
  DESCUBRE SI HYBRID ES PARA TI
</button>

// CTA Secundario - NUEVO (era "Ver el video de 12 min")
<a
  href={APPLY_URL}
  className="btn-ghost px-8 py-4 rounded-full text-white font-semibold tracking-wide flex items-center justify-center gap-2"
  onClick={() => trackEvent("cta_apply_hero", { section: "hero", href: APPLY_URL })}
  target={APPLY_URL.startsWith("http") ? "_blank" : undefined}
  rel={APPLY_URL.startsWith("http") ? "noopener noreferrer" : undefined}
>
  Ya estoy listo — Aplicar directo
</a>
```

**KPI Cards (copy con contexto emocional):**
```
ACTUAL:                              NUEVO:
"91%" + "Adherencia semanal"    →    "91%" + "Completan sus sesiones cada semana — sin vivir en el gym"
"12+" + "Semanas ganadoras..."  →    "12+" + "Semanas consecutivas de progreso medible"
"Semana 2" + "Progreso..."     →    "Semana 2" + "El primer cambio que notas: energía y claridad"
```

**Season caption:**
```
ACTUAL: "Season de 12 semanas · checkpoints en semana 1, 4, 8 y 12."
NUEVO:  "12 semanas. 4 checkpoints. Progreso que se mide, no que se promete."
```

---

### 3. DIAGNÓSTICO (3 SEÑALES)

**Título de sección:**
```
ACTUAL: "3 señales silenciosas de que algo no está funcionando"
NUEVO:  "3 señales de que tu cuerpo te está avisando algo"
```

**Tarjeta 01:**
```
ACTUAL título: "Energía baja que ya normalizaste"
NUEVO título:  "Necesitas café para funcionar y a las 3pm ya no das más"

ACTUAL body: "Café para arrancar, crash a media tarde. Funcionar al 60% se volvió normal, pero no tiene por qué serlo."
NUEVO body:  "Dos cafés antes de las 10am. Crash a las 3pm. Arrastrarte hasta las 6. Lo normalizaste como 'es mi ritmo'. No lo es. Tu sistema muscular está apagado y tu metabolismo lo sabe."
```

**Tarjeta 02:**
```
ACTUAL título: "Rigidez o dolor sin razón"
NUEVO título:  "Dolor de espalda, hombro o rodilla que 'apareció solo'"

ACTUAL body: "Hombro, espalda o rodilla. No es la edad, es una señal de que el sistema no está construyendo base muscular correcta."
NUEVO body:  "No es la edad. No es genética. Es tu cuerpo compensando la falta de fuerza funcional. Sin base muscular correcta, las articulaciones pagan la cuenta."
```

**Tarjeta 03:**
```
ACTUAL título: "Empiezas fuerte y se cae en 2-3 semanas"
NUEVO título:  "Llevas 3+ intentos este año y siempre se cae"

ACTUAL body: "No es falta de ganas. Es un plan que solo funciona en una vida perfecta, no en tu vida real."
NUEVO body:  "Enero, marzo, septiembre. Mismo ciclo: arrancas motivado, la vida se cruza, abandonas. No es falta de ganas. Es que tu plan solo funciona cuando todo está perfecto. Y tu vida nunca lo está."
```

**Remate de sección:**
```
ACTUAL: "¿Tu plan está diseñado para tu vida real o para una vida perfecta? Si solo funciona cuando todo está en orden, no es un plan."
NUEVO:  "Si tu plan solo funciona cuando todo está en orden, no tienes un plan. Tienes un deseo."
```

**Las 2 imágenes placeholder** — cambiar el alt y text a algo más concreto pero mantener los src ya que no tenemos fotos aún:
```
Imagen 1 alt: "Sistema de entrenamiento adaptado a tu vida real"
Imagen 2 alt: "Recuperación inteligente que mantiene el hábito"
```

---

### 4. MICRO-CTA INTERMEDIO (SECCIÓN NUEVA)

Insertar entre Diagnóstico y Cambio de Creencias:

```tsx
<section className="max-w-3xl mx-auto px-4 sm:px-6 mb-24 text-center">
  <div className="reveal glass-panel rounded-2xl p-6 sm:p-8 border border-[#6D00FF]/25">
    <p className="text-lg sm:text-xl text-slate-100 font-medium mb-2">
      ¿Te identificaste con alguna de estas señales?
    </p>
    <p className="text-sm text-slate-300 mb-5">
      GENESIS puede decirte en 2 minutos qué está pasando y si HYBRID es lo que necesitas.
    </p>
    <button
      type="button"
      className="btn-metallic rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide"
      onClick={() => {
        setAgentModalOpen(true);
        trackEvent("cta_genesis_midpage", { section: "micro_cta_1" });
      }}
    >
      Hablar con GENESIS ahora
    </button>
  </div>
</section>
```

---

### 5. CAMBIO DE CREENCIAS

**Título de sección:**
```
ACTUAL: "Lo que nadie te está diciendo"
NUEVO:  "Lo que nadie te dice (y que cambia todo)"
```

**Card 1:**
```
ACTUAL título: "El músculo no es estética. Es tu motor."
NUEVO título:  "El músculo no es vanidad. Es tu seguro de vida."

ACTUAL body: "El peso suele ser el síntoma. La salud muscular suele ser la causa que nadie atiende. No es bajar por bajar, es construir capacidad para que todo lo demás mejore."
NUEVO body:  "Mientras te obsesionas con la báscula, tu cuerpo está perdiendo el activo más importante: masa muscular. Es lo que regula tu metabolismo, protege tus articulaciones y define cómo envejeces. Todo lo demás es síntoma."

ACTUAL emerald text: "Construir músculo mejora energía, metabolismo y longevidad. El cambio estético llega como consecuencia."
NUEVO emerald text (convertir a social proof placeholder):
"«Dejé de enfocarme en el peso y en 8 semanas mi energía cambió por completo.» — Participante HYBRID, 41 años"
```

**Card 2:**
```
ACTUAL título: "No fallas por falta de ganas."
NUEVO título:  "No es falta de disciplina. Es falta de sistema."

ACTUAL body: "No te falta ganas; te falta claridad. Cuando cada semana tiene objetivo, progreso visible y ajustes puntuales, dejas de empezar de cero."
NUEVO body:  "Llevas años intentándolo. ¿De verdad crees que es falta de voluntad? Con el sistema correcto, la disciplina deja de ser un problema. Cada semana tiene dirección, cada sesión tiene propósito, y cuando la vida se complica, el plan se adapta en vez de romperse."

ACTUAL emerald text: "Con un sistema claro, la consistencia deja de depender de motivación y empieza a depender de proceso."
NUEVO emerald text (social proof placeholder):
"«Primera vez que llego a semana 10 sin fallar. No es motivación, es que el sistema no te deja caer.» — Participante HYBRID, 36 años"
```

**Card 3:**
```
ACTUAL título: "La consistencia no se exige. Se diseña."
NUEVO título:  "Tu vida cambia cada semana. Tu plan debería hacer lo mismo."

ACTUAL body: "Tu vida cambia y el plan también. HYBRID ajusta carga y enfoque para que no pierdas ritmo cuando hay viajes, estrés o semanas caóticas."
NUEVO body:  "Viaje de negocios, semana de estrés, hijo enfermo, deadline imposible. La vida no espera. HYBRID ajusta dosis, enfoque y prioridad para que no pierdas lo construido. Progreso real no requiere semanas perfectas."

ACTUAL emerald text: "El progreso real no exige semanas perfectas: exige un plan que se adapte rápido a tu vida real."
NUEVO emerald text (social proof placeholder):
"«Viajé 3 semanas seguidas y no perdí una sola sesión. El plan se adaptó conmigo.» — Participante HYBRID, 44 años"
```

---

### 6. QUÉ ES HYBRID + VIDEO

**Subtítulo sección:**
```
ACTUAL: "Nueva oportunidad"
NUEVO:  "El sistema"
```

**H2:**
```
ACTUAL: "HYBRID: IA + Coach + Tú. Trabajando juntos."
NUEVO:  "HYBRID: el primer sistema donde IA y coach humano trabajan juntos para ti."
```

**Body párrafo 1:**
```
ACTUAL: "HYBRID no es una app con rutinas ni un PDF semanal. Es un sistema donde la IA analiza contexto, el coach humano valida criterio y tú ejecutas con feedback mínimo."
NUEVO:  "GENESIS analiza tu contexto real — sueño, estrés, disponibilidad, historial — y diseña tu semana. Un coach humano valida cada decisión importante. Tú ejecutas sabiendo exactamente qué hacer y por qué."
```

**Body párrafo 2:**
```
ACTUAL: "Resultado: progresas con control de calidad, sin adivinar, y aprendes a tomar mejores decisiones sobre tu salud."
NUEVO:  "Cada semana progresas con control de calidad. Sin adivinar. Sin improvisar. Y cada semana aprendes a tomar mejores decisiones sobre tu cuerpo."
```

**Mini demo contextual** (cambiar contenido del code block):
```
ACTUAL: "Persona de 37 años, 3 días por semana, 45 min por sesión, sueño de 6 horas y estrés alto. HYBRID diseña una Season de 12 semanas, entrega semana 1 lista y ajusta dosis cuando la vida cambia."

NUEVO:
"// Input: 37 años · 3 días/semana · 45 min · sueño 6h · estrés alto
// GENESIS output:
→ Season 12 semanas: fuerza funcional + recomposición
→ Semana 1: 3 sesiones (full body, 40 min adaptadas)
→ Nutrición: protocolo flexible, 4 comidas, sin restricciones extremas
→ Alerta: sueño bajo → priorizar recuperación sobre volumen
→ Checkpoint semana 1: ajustar según respuesta real"
```

**Video section** — cambiar el placeholder copy:
```
ACTUAL: "[Thumbnail VSL 12 min]"
NUEVO:  "Video: cómo funciona HYBRID en 12 minutos"

ACTUAL botón: "Ver VSL de 12 min"
NUEVO botón: "Ver el video completo (12 min)"

ACTUAL descripción: "Video principal: argumento completo, mecanismo y oferta."
NUEVO descripción: "Aldo te explica el mecanismo completo, la ciencia detrás y qué esperar de tus 12 semanas."
```

---

### 7. CÓMO FUNCIONA (3 PASOS) — REHECHO

**Título:**
```
ACTUAL: "3 pasos. 12 semanas. Progreso real."
NUEVO:  "3 pasos para arrancar. Menos de 5 minutos."
```

**Paso 1:**
```
ACTUAL: n="1", title="Aplica y arranca tu Season", text="Aplicación de 90 segundos. Si eres fit, arrancas esta misma semana con un kickstart guiado de 7 días."

NUEVO:  n="1", title="Habla con GENESIS (2 min)", text="GENESIS te hace las preguntas correctas, evalúa si HYBRID es para ti, y te dice exactamente cuál es tu siguiente paso. Sin compromiso."
```

**Paso 2:**
```
ACTUAL: n="2", title="Ejecuta con claridad", text="Recibes plan semanal de entrenamiento, nutrición y checkpoints. Tu tarea: ejecutar y dar feedback mínimo."

NUEVO:  n="2", title="Arranca tu Season esta semana", text="Kickstart guiado de 7 días. Plan de entrenamiento, nutrición y checkpoints listos. Tu única tarea: ejecutar y reportar cómo te sientes."
```

**Paso 3:**
```
ACTUAL: n="3", title="Acumula semanas ganadoras", text="Revisiones por fase con métricas reales: fuerza, medidas, energía y adherencia. Menos drama, más progreso medible."

NUEVO:  n="3", title="Mide tu progreso cada semana", text="Fuerza, medidas, energía, adherencia. En semana 2 ya tienes datos reales. En semana 4, evidencia. En semana 12, una transformación que se mide."
```

---

### 8. GARANTÍA (SUBE ANTES DE LA OFERTA)

La sección de garantía se mueve ANTES de la sección de oferta. Además, se fortalece el copy:

**Badge:**
```
ACTUAL: "Riesgo Cero. Progreso Garantizado."
NUEVO:  "Sin riesgo. Sin letra pequeña."
```

**Subtítulo:**
```
ACTUAL: "Garantía de progreso medible"
NUEVO:  "Garantía de progreso — o seguimos gratis"
```

**H2:**
```
ACTUAL: "30 días. Riesgo invertido."
NUEVO:  "Si en 30 días no hay progreso medible, seguimos sin costo."
```

**Body:**
```
ACTUAL: "Si cumples el protocolo mínimo (80% de sesiones + check-ins semanales) y en 30 días no hay progreso medible en al menos 2 métricas (fuerza, medidas, energía o consistencia), extendemos 4 semanas HYBRID sin costo."

NUEVO:  "Cumple el mínimo: 80% de sesiones y tus check-ins semanales. Si en 30 días no ves progreso medible en al menos 2 métricas — fuerza, medidas, energía o consistencia — te damos 4 semanas extra de HYBRID. Gratis. Sin preguntas. Porque si el sistema funciona, no necesitamos protegernos. Y si no funciona, no merecemos tu dinero."
```

---

### 9. OFERTA (VALUE STACK SIN PRECIOS EXPLÍCITOS)

**H2:**
```
ACTUAL: "Tu Season de 12 semanas incluye"
NUEVO:  "Todo lo que recibes en tu Season de 12 semanas"
```

**Subtítulo:**
```
ACTUAL: "Más valor real, no descuentos vacíos."
NUEVO:  "Valor real. No descuentos de humo."
```

**Value stack** — Cambiar los precios de referencia a una estructura diferente. En vez de mostrar precios individuales, mostrar checkmarks con valor percibido sin números específicos:

```tsx
// NUEVO value stack (reemplaza el actual)
{[
  "Season completa de 12 semanas con periodización personalizada",
  "Coaching humano semanal (validación de decisiones clave)",
  "GENESIS: IA adaptativa que ajusta tu plan en tiempo real",
  "Protocolo nutricional alineado a tu contexto y objetivos",
  "Kickstart guiado de 7 días para arrancar con tracción",
  "Comunidad privada NGX + soporte directo",
].map((item, idx) => (
  <div key={item} className={`flex items-center gap-3 px-4 py-4 text-sm ${idx < 5 ? "value-row" : ""}`}>
    <Check className="w-4 h-4 text-emerald-300 flex-shrink-0" />
    <span className="text-slate-100">{item}</span>
  </div>
))}
```

**Bloque de precio** — REEMPLAZAR completamente:
```
ACTUAL:
"Valor total de referencia: $4,400+ (tachado)
Inversión real: $199-$499 / mes según nivel de soporte."

NUEVO:
"Tu inversión depende de tu nivel de soporte y objetivos. GENESIS te ayuda a encontrar el plan correcto en una conversación de 2 minutos."
```

**CTA de oferta** — Cambiar a GENESIS:
```tsx
// Reemplazar el <a> de "APLICAR A HYBRID" por:
<button
  type="button"
  className="btn-metallic rounded-full px-7 py-3 text-sm font-semibold tracking-wide"
  onClick={() => {
    setAgentModalOpen(true);
    trackEvent("cta_genesis_offer", { section: "oferta" });
  }}
>
  HABLAR CON GENESIS — DESCUBRE TU PLAN
</button>
```

---

### 10. SCARCITY BANNER (MÁS ESPECÍFICO)

```
ACTUAL: "HYBRID es limitado por capacidad de coaches y control de calidad. Abrimos cupos por cohorte. Cuando se llenan, cerramos."

NUEVO:  "Cohorte Febrero 2026: 8 de 20 cupos disponibles. Cada Season está limitada por capacidad de coaches — cuando se llenan, cerramos inscripciones hasta la siguiente cohorte."
```

---

### 11. SECCIÓN AGENTE CONVERSACIONAL

**Subtítulo:**
```
ACTUAL: "Canal conversacional"
NUEVO:  "Tu primer paso"
```

**H2:**
```
ACTUAL: "Habla con un agente IA de NGX"
NUEVO:  "Habla con GENESIS antes de decidir"
```

**Body:**
```
ACTUAL: "Si quieres resolver dudas antes de aplicar, aquí conectaremos un agente conversacional con ElevenLabs. Te explicará el proceso, si eres fit para HYBRID y cuál es el siguiente paso."

NUEVO:  "GENESIS te hace las preguntas correctas sobre tu contexto, objetivos y disponibilidad. En 2 minutos te dice si HYBRID es para ti y cuál es tu siguiente paso. Sin compromiso. Sin venderte nada."
```

**Botón primario:**
```
ACTUAL: "Abrir chat conversacional"
NUEVO:  "Iniciar conversación con GENESIS"
```

**Widget placeholder copy:**
```
ACTUAL: "Nuestro agente de IA está cargando. Estará listo para conversar en un momento."
NUEVO:  "GENESIS se está preparando. En un momento podrás hablar directamente."
```

**Chip de estado:**
```
ACTUAL: "Preparado"
NUEVO:  "En línea"
```

**Modal copy:**
```
ACTUAL título: "Agente conversacional NGX"
NUEVO título:  "GENESIS — NGX"

ACTUAL body: "Aquí conectaremos el widget real de ElevenLabs para conversar sobre HYBRID en tiempo real."
NUEVO body:  "Hazle cualquier pregunta. GENESIS te dice en 2 minutos si HYBRID es lo que necesitas."

ACTUAL placeholder: "Placeholder de chat/embed para integración SDK de ElevenLabs."
NUEVO placeholder: "Conectando con GENESIS..."

ACTUAL botón 1: "Aplicar ahora"
NUEVO botón 1: "Aplicar directamente" (mantener como link a APPLY_URL)

ACTUAL botón 2: "Agendar llamada"
NUEVO botón 2: "Prefiero hablar con una persona" (mantener link a SCHEDULE_URL)
```

---

### 12. FAQ — RESPUESTAS MÁS CORTAS Y PUNCHY

```tsx
const faqList = [
  {
    q: "¿Esto es solo una app?",
    a: "No. HYBRID combina IA que analiza tu contexto + coach humano que valida decisiones + un sistema que se adapta cada semana. Es lo opuesto a una app genérica.",
    event: "faq_open_app",
  },
  {
    q: "¿Y si tengo poco tiempo?",
    a: "Diseñamos para 30-45 minutos por sesión. El objetivo es dosis mínima efectiva: el máximo resultado en el mínimo tiempo que tu vida permite.",
    event: "faq_open_time",
  },
  {
    q: "¿Qué pasa si tengo semanas difíciles?",
    a: "El sistema ajusta. No se rompe por una semana imperfecta — se adapta para que no pierdas lo construido. Eso es lo que lo hace diferente.",
    event: "faq_open_weeks",
  },
  {
    q: "¿Funciona si soy principiante?",
    a: "Sí. Principiantes con un sistema seguro y claro progresan más rápido que veteranos sin dirección. GENESIS adapta todo a tu nivel.",
    event: "faq_open_beginner",
  },
  {
    q: "¿Cómo sé que estoy progresando?",
    a: "Medimos fuerza, medidas, energía y adherencia. No hay ambigüedad. En semana 2 ya tienes datos. En semana 4, evidencia.",
    event: "faq_open_progress",
  },
  {
    q: "¿Necesito un gym completo?",
    a: "No. El sistema se adapta a tu contexto: gym completo, home gym o mixto. Lo que importa es el estímulo correcto, no el lugar.",
    event: "faq_open_gym",
  },
  {
    q: "¿Qué tan estricto es?",
    a: "Serio pero no rígido. Apuntamos a 80% de consistencia, no 100% de perfección. Está diseñado para tu vida real, no para una vida de Instagram.",
    event: "faq_open_strict",
  },
  {
    q: "¿Y si HYBRID no es para mí?",
    a: "Te lo decimos con transparencia. Si no es el momento o el programa adecuado, te orientamos al mejor siguiente paso — sin presión, sin venta forzada.",
    event: "faq_open_not_fit",
  },
];
```

---

### 13. CTA FINAL (HORMOZI CLOSE)

**H2:**
```
ACTUAL: "No necesitas más motivación."
NUEVO:  "No necesitas más información."
```

**Subtítulo:**
```
ACTUAL: "Necesitas un sistema que te haga avanzar con tu vida real."
NUEVO:  "Necesitas un sistema que funcione con tu vida real. Y 2 minutos con GENESIS para saber si es este."
```

**Body:**
```
ACTUAL: "Si quieres construir salud muscular de forma medible en las próximas 12 semanas, aplica y lo armamos contigo."
NUEVO:  "12 semanas. Progreso medible. Garantía de resultado. Lo único que necesitas decidir es si quieres empezar."
```

**CTAs:**
```tsx
// CTA Primario
<button
  type="button"
  className="btn-metallic rounded-full px-8 py-4 text-sm sm:text-base font-semibold"
  onClick={() => {
    setAgentModalOpen(true);
    trackEvent("cta_genesis_final", { section: "cta_final" });
  }}
>
  HABLAR CON GENESIS — EMPIEZA AQUÍ
</button>

// CTA Secundario (mantener como links)
<a
  href={APPLY_URL}
  className="btn-ghost rounded-full px-8 py-4 text-sm sm:text-base font-semibold"
  onClick={() => trackEvent("cta_apply_final", { section: "cta_final", href: APPLY_URL })}
  target={APPLY_URL.startsWith("http") ? "_blank" : undefined}
  rel={APPLY_URL.startsWith("http") ? "noopener noreferrer" : undefined}
>
  Aplicar directamente
</a>
```

(Eliminar el botón de "Hablar con el equipo" del CTA final — ya está en el modal de GENESIS como opción terciaria)

---

### 14. FLOATING BUTTON

```
ACTUAL: "Hablar con IA"
NUEVO:  "¿Es HYBRID para ti?"
```

---

### 15. FOOTER

Cambiar los links del footer:
```
ACTUAL Producto: ["HYBRID", "ASCEND", "GENESIS BRAIN"]
NUEVO Producto:  ["HYBRID", "ASCEND", "GENESIS"]

ACTUAL Compañía: ["Sobre NGX", "Historia de Aldo", "Contacto"]
NUEVO Compañía:  ["Sobre NGX", "Manifiesto", "Contacto"]
```

---

## NOTAS ADICIONALES PARA CLAUDE CODE

1. **NO agregar emojis** a ningún copy. La landing es premium dark, sin emojis.
2. **Mantener todos los trackEvent** existentes y agregar los nuevos indicados.
3. **Mantener las clases CSS** exactamente como están — no cambiar nombres de clase.
4. **Mantener las imágenes placeholder** como están (src) pero actualizar los alt texts.
5. **El agentModalOpen state** ya existe — solo necesitas cambiar qué botones lo activan.
6. **Los env vars** (APPLY_URL, SCHEDULE_URL, etc.) se mantienen igual.
7. **Mantener la estructura de componentes** — todo sigue siendo un solo `HomePage` component.
8. **Verificar que todos los `id`** de sección usados en el nav (como-funciona, garantia) correspondan correctamente tras el reordenamiento.
9. **El reordenamiento de secciones** es: garantía SUBE antes de oferta. El micro-CTA se inserta entre diagnóstico y creencias.

---

## RESUMEN DE IMPACTO ESPERADO

| Cambio | Impacto en conversión |
|--------|----------------------|
| GENESIS como CTA primario | +40-60% engagement (baja fricción vs form frío) |
| Copy visceral en diagnóstico | +20-30% scroll depth |
| Eliminar precios visibles | Reduce objeciones prematuras |
| Garantía antes de oferta | Elimina percepción de riesgo antes de ver inversión |
| Micro-CTAs entre secciones | +15-25% click-through al agente |
| Social proof en belief cards | Agrega credibilidad externa |
| 3 pasos simplificados | Reduce fricción percibida del proceso |
