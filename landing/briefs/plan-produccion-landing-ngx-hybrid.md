# Plan de Produccion: Landing Oficial NGX Hybrid

Fecha: 2026-02-08  
Base: `landing/templates/saas-ai-landing.html` + skill `./.skills/ngx-aura-backgrounds/SKILL.md`

## 1) Objetivo del sprint

Construir una landing de conversion para aplicar a cohorte, alineada al documento de arquitectura y lista para publicar en una primera version funcional.

## 2) Fases de trabajo

### Fase A: Setup y mapeo (rapido)

- Mapear cada seccion del documento a secciones reales del template.
- Definir rutas de CTA: `Aplicar`, `Ver video 12 min`, `Hablar con el equipo`.
- Elegir background principal UnicornStudio (recomendado: `qpSlPSWA2bdkUAYztz8z`).

### Fase B: Contenido y estructura

- Reemplazar todo el copy del template con la arquitectura aprobada.
- Insertar secciones nuevas: Diagnostico, Garantia, Escasez.
- Cambiar seccion de features a `3 Secretos` (3 cards grandes).
- Cambiar pricing por `Oferta unica` (value stack + inversion real).

### Fase C: Assets visuales (imagenes y video)

- Hero visual:
- Opcion 1: solo fondo aura + tipografia fuerte (MVP rapido).
- Opcion 2: frame de video 12 min con poster premium.
- Seccion `Que es HYBRID`:
- Integrar video corto demo (45-60s) o mockup visual del flujo IA + coach + tu.
- Soportes visuales:
- 3 imagenes editoriales para reforzar: energia, entrenamiento inteligente, progreso medible.
- Definir formato:
- Imagenes: WebP, 1600px max, <300 KB ideal.
- Video: MP4/H.264 + poster WebP, lazy-load.

### Fase D: Conversion y tracking

- Conectar CTA principal a formulario/aplicacion real.
- Agregar eventos (analytics): `cta_apply_click`, `vsl_play`, `faq_open`, `cta_final_click`.
- Validar consistencia de mensajes de escasez y garantia.

### Fase E: QA y release

- QA responsive: mobile (360-430), tablet, desktop.
- Performance: revisar LCP/CLS basico, compresion de assets.
- Verificacion legal y de claims (metricas y garantia).
- Publicacion de v1 y plan de iteracion v1.1.

## 3) Matriz de assets recomendada

1. Video largo (VSL): 12 min
2. Video corto: 45-60s resumen del mecanismo HYBRID
3. Poster de video (hero + seccion explicativa)
4. 3 imagenes de apoyo (una por bloque de valor principal)
5. Logo NGX final (SVG) y favicon
6. Links finales: aplicacion, contacto, legal

## 4) Orden de implementacion recomendado

1. Estructura final de secciones + copy completo
2. CTAs conectados y navegacion estable
3. Insercion de video y posters
4. Insercion de imagenes optimizadas
5. Tracking + QA + ajustes finales de conversion

## 5) Dependencias para arrancar produccion final

1. URL final del formulario `Aplicar a HYBRID`
2. URL de video 12 min (VSL) y, si existe, video corto
3. Logos/brand kit definitivo (si cambia algo de color/tipografia)
4. Metricas que se mostraran publicamente (para evitar contradicciones)
5. Textos legales finales (privacidad, terminos, garantia)
