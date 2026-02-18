"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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

interface FunnelPayload {
  section?: string;
  cta?: string;
  href?: string;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    UnicornStudio?: {
      isInitialized?: boolean;
      init?: () => void;
    };
  }
}

const APPLY_URL = process.env.NEXT_PUBLIC_APPLY_URL ?? "#";
const VSL_URL = process.env.NEXT_PUBLIC_VSL_URL ?? "#";
const SCHEDULE_URL = process.env.NEXT_PUBLIC_SCHEDULE_URL ?? "#";
const N8N_WEBHOOK_FALLBACK = process.env.NEXT_PUBLIC_N8N_WEBHOOK_FUNNEL ?? "";
const HERO_VIDEO_SRC = process.env.NEXT_PUBLIC_HERO_VIDEO_SRC ?? "";
const VSL_TEASER_VIDEO_SRC = process.env.NEXT_PUBLIC_VSL_TEASER_VIDEO_SRC ?? "";
const RESULTS_VIDEO_SRC = process.env.NEXT_PUBLIC_RESULTS_VIDEO_SRC ?? "";
const COHORT_SPOTS_FILLED = 8;
const COHORT_SPOTS_TOTAL = 20;
const cohortAvailabilityText = `${COHORT_SPOTS_FILLED} de ${COHORT_SPOTS_TOTAL} cupos disponibles`;
const VISUAL_ASSETS = {
  diagnosticTraining: "/images/brand/genesis-coaching-squat.png",
  diagnosticRecovery: "/images/brand/gym-premium-empty.png",
  videoThumbnail: "/images/brand/genesis-hologram-panels.png",
  mechanismContext: "/images/brand/genesis-gym-data.png",
  processAdaptive: "/images/brand/genesis-solo.png",      // genesis-programming tenía cyan — brand violation
  processContext: "/images/brand/genesis-gym-team.png",
  offerFounder: "/images/brand/aldo-genesis-portrait.png",
  genesisAvatar: "/images/brand/genesis-solo.png",
  ctaBackground: "/images/brand/genesis-gym-team.png",   // wide horizontal — encaja mejor en bg
} as const;

const faqList = [
  {
    q: "Esto es solo una app?",
    a: "No. HYBRID combina IA que analiza tu contexto + coach humano que valida decisiones + un sistema que se adapta cada semana. Es lo opuesto a una app generica.",
    event: "faq_open_app",
  },
  {
    q: "Y si tengo poco tiempo?",
    a: "Disenamos para 30-45 minutos por sesion. El objetivo es dosis minima efectiva: el maximo resultado en el minimo tiempo que tu vida permite.",
    event: "faq_open_time",
  },
  {
    q: "Que pasa si tengo semanas dificiles?",
    a: "El sistema ajusta. No se rompe por una semana imperfecta - se adapta para que no pierdas lo construido. Eso es lo que lo hace diferente.",
    event: "faq_open_weeks",
  },
  {
    q: "Funciona si soy principiante?",
    a: "Si. Principiantes con un sistema seguro y claro progresan mas rapido que veteranos sin direccion. GENESIS adapta todo a tu nivel.",
    event: "faq_open_beginner",
  },
  {
    q: "Como se mide el progreso?",
    a: "Medimos fuerza, medidas, energia y adherencia. No hay ambiguedad. En semana 2 ya tienes datos. En semana 4, evidencia.",
    event: "faq_open_progress",
  },
  {
    q: "Necesito un gym completo?",
    a: "No. El sistema se adapta a tu contexto: gym completo, home gym o mixto. Lo que importa es el estimulo correcto, no el lugar.",
    event: "faq_open_gym",
  },
  {
    q: "Que tan estricto es?",
    a: "Serio pero no rigido. Apuntamos a 80% de consistencia, no 100% de perfeccion. Esta disenado para tu vida real, no para una vida de Instagram.",
    event: "faq_open_strict",
  },
  {
    q: "Y si HYBRID no es para mi?",
    a: "Te lo decimos con transparencia. Si no es el momento o el programa adecuado, te orientamos al mejor siguiente paso - sin presion, sin venta forzada.",
    event: "faq_open_not_fit",
  },
];

function postToWebhook(event: string, payload: FunnelPayload) {
  if (!N8N_WEBHOOK_FALLBACK) return;

  const body = JSON.stringify({
    event,
    payload,
    ts: new Date().toISOString(),
    source: "ngx-hybrid-web",
  });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(N8N_WEBHOOK_FALLBACK, blob);
      return;
    }

    void fetch(N8N_WEBHOOK_FALLBACK, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      mode: "cors",
    });
  } catch {
    // Intencionalmente silencioso para no bloquear UX.
  }
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const menuItems = useMemo(
    () => [
      { id: "secretos", label: "Secretos" },
      { id: "como-funciona", label: "Como funciona" },
      { id: "resultados", label: "Resultados" },
      { id: "garantia", label: "Garantia" },
      { id: "preguntas", label: "Preguntas" },
    ],
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.14 },
    );

    const revealNodes = document.querySelectorAll(".reveal");
    revealNodes.forEach((node) => observer.observe(node));

    return () => {
      revealNodes.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, []);

  // ─── Counter + progress bar animations ───────────────────────────────────
  useEffect(() => {
    const animateCounter = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.counterTarget ?? "0");
      const prefix = el.dataset.counterPrefix ?? "";
      const decimals = parseInt(el.dataset.counterDecimals ?? "0", 10);
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + (target * eased).toFixed(decimals);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const animateBar = (el: HTMLElement) => {
      const w = el.dataset.progressWidth ?? "0";
      // next frame so the transition fires after the 0% initial paint
      requestAnimationFrame(() => { el.style.width = w + "%"; });
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (el.classList.contains("counter-num")) animateCounter(el);
          if (el.classList.contains("progress-bar-fill")) animateBar(el);
          if (el.classList.contains("timeline-node")) el.classList.add("in");
          obs.unobserve(el);
        });
      },
      { threshold: 0.4 },
    );

    document.querySelectorAll<HTMLElement>(".counter-num, .progress-bar-fill, .timeline-node")
      .forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (window.UnicornStudio?.isInitialized) return;

    const existing = document.querySelector("script[data-unicorn-loader='1']") as HTMLScriptElement | null;
    if (existing) {
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
    script.async = true;
    script.setAttribute("data-unicorn-loader", "1");
    script.onload = () => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init?.();
        window.UnicornStudio.isInitialized = true;
      }
    };

    document.head.appendChild(script);
  }, []);

  const trackEvent = (event: string, payload: FunnelPayload = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload, ts: Date.now() });

    if (process.env.NODE_ENV !== "production") {
      console.info("track", event, payload);
    }

    postToWebhook(event, payload);
  };

  return (
    <div className="grid-noise">
      <div className="fixed inset-0 -z-20 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(109,0,255,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(79,70,229,0.16),transparent_36%),radial-gradient(circle_at_70%_80%,rgba(30,41,59,0.2),transparent_46%)]" />

      <div
        className="fixed top-0 w-full h-screen -z-10"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 0%, black 82%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 0%, black 82%, transparent)",
        }}
      >
        <div data-us-project="qpSlPSWA2bdkUAYztz8z" className="absolute w-full h-full left-0 top-0" />
      </div>

      <header className="fixed z-50 pt-3 sm:pt-5 top-0 right-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="glass-panel rounded-2xl sm:rounded-full px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
            <a href="#" className="flex items-center gap-3" onClick={() => trackEvent("brand_logo_click", { section: "header" })}>
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6D00FF] to-[#A78BFA] flex items-center justify-center">
                <Hexagon className="w-4 h-4 text-white" />
              </span>
              <span className="text-sm font-semibold tracking-wide font-space">NGX HYBRID</span>
            </a>

            <button
              type="button"
              className="md:hidden p-2 rounded-lg btn-ghost"
              aria-label="Abrir menu"
              onClick={() => {
                const nextState = !mobileMenuOpen;
                setMobileMenuOpen(nextState);
                trackEvent("mobile_menu_toggle", { section: "header", cta: nextState ? "open" : "close" });
              }}
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="px-4 py-1.5 rounded-full text-xs text-slate-300 hover:text-white hover:bg-white/10 transition"
                  onClick={() => trackEvent("nav_click", { section: "header", cta: item.id })}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              className="btn-metallic px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-white text-[11px] sm:text-xs leading-tight font-bold tracking-wide"
              onClick={() => {
                setAgentModalOpen(true);
                trackEvent("cta_genesis_nav", { section: "header" });
              }}
            >
              <span className="sm:hidden">Hablar con GENESIS</span>
              <span className="hidden sm:inline">{`Hablar con GENESIS (${COHORT_SPOTS_TOTAL - COHORT_SPOTS_FILLED} cupos)`}</span>
            </button>
          </nav>

          {mobileMenuOpen && (
            <div className="md:hidden mt-2 glass-panel rounded-2xl p-4">
              <div className="flex flex-col gap-2 text-sm">
                {menuItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="px-3 py-2 rounded-lg hover:bg-white/10"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      trackEvent("mobile_nav_click", { section: "header", cta: item.id });
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="relative z-10 pt-32 sm:pt-40 pb-28 sm:pb-20">
        <section className="section-tone section-tone-strong max-w-7xl mx-auto px-4 sm:px-6 mb-24 sm:mb-28">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-center">
            <div className="text-center lg:text-left">
              <div className="reveal inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[11px] sm:text-xs text-slate-200 font-medium">
                  {`Cohorte Febrero 2026 - ${cohortAvailabilityText}`}
                </span>
              </div>

              <h1 className="reveal delay-1 text-4xl sm:text-6xl xl:text-7xl tracking-[-0.02em] leading-[1.03] mb-6 font-semibold max-w-4xl mx-auto lg:mx-0">
                Despues de los 30,
                <br />
                el problema no es el peso.
                <br />
                <span className="hero-violet">Es lo que estas perdiendo sin darte cuenta.</span>
              </h1>

              <p className="reveal delay-2 hero-subcopy text-[15px] sm:text-lg max-w-3xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed">
                Cada semana sin un sistema real, tu cuerpo practica envejecer: pierdes musculo, energia y capacidad
                metabolica. HYBRID detiene eso. IA + coach humano + tu, construyendo en 12 semanas lo que ninguna app
                puede hacer sola.
              </p>

              <div className="reveal delay-3 flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mb-10">
                <button
                  id="aplicar"
                  type="button"
                  className="btn-metallic px-8 py-4 rounded-full text-white font-semibold tracking-wide"
                  onClick={() => {
                    setAgentModalOpen(true);
                    trackEvent("cta_genesis_hero", { section: "hero" });
                  }}
                >
                  DESCUBRE SI HYBRID ES PARA TI
                </button>
                <a
                  href={APPLY_URL}
                  className="btn-ghost px-8 py-4 rounded-full text-white font-semibold tracking-wide flex items-center justify-center gap-2"
                  onClick={() => trackEvent("cta_apply_hero", { section: "hero", href: APPLY_URL })}
                  target={APPLY_URL.startsWith("http") ? "_blank" : undefined}
                  rel={APPLY_URL.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  Ya estoy listo - Aplicar directo
                </a>
              </div>

              <div className="reveal delay-3 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto lg:mx-0 text-left">
                <div className="glass-panel kpi-card rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-semibold font-space">91%</span>
                    <span className="text-lg">🔥</span>
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-[#A78BFA] font-medium mb-0.5">Adherencia al programa</p>
                  <p className="text-xs text-slate-300">Completan sus sesiones cada semana - sin vivir en el gym</p>
                </div>
                <div className="glass-panel kpi-card rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-semibold font-space">12+</span>
                    <Dumbbell className="w-5 h-5 text-[#A78BFA]" />
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-[#A78BFA] font-medium mb-0.5">Semanas de Season</p>
                  <p className="text-xs text-slate-300">Semanas consecutivas de progreso medible</p>
                </div>
                <div className="glass-panel kpi-card kpi-card-health rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-semibold font-space">Semana 2</span>
                    <Activity className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-[11px] uppercase tracking-wider text-emerald-400 font-medium mb-0.5">Primeros datos medibles</p>
                  <p className="text-xs text-slate-300">El primer cambio que notas: energia y claridad</p>
                </div>
              </div>

              <p className="reveal delay-3 season-caption font-space mt-6 mx-auto lg:mx-0">
                12 semanas. 4 checkpoints. Progreso que se mide, no que se promete.
              </p>
            </div>

            <article className="reveal delay-2 glass-panel rounded-2xl p-3 sm:p-4 border border-white/10">
              <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
                {HERO_VIDEO_SRC ? (
                  <div className="hero-video-wrap">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={VISUAL_ASSETS.diagnosticTraining}
                    >
                      <source src={HERO_VIDEO_SRC} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <Image
                    src={VISUAL_ASSETS.diagnosticTraining}
                    alt="Sesion HYBRID enfocada en fuerza funcional y composicion corporal"
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover object-[center_28%]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/80" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px]">
                  <span className="rounded-full px-2.5 py-1 border border-[#6D00FF]/45 bg-[#6D00FF]/15 text-[#d6c8ff]">
                    Performance IA
                  </span>
                  <span className="rounded-full px-2.5 py-1 border border-emerald-400/45 bg-emerald-400/15 text-emerald-200">
                    Salud muscular
                  </span>
                </div>
                <div className="absolute left-4 right-4 bottom-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-200 mb-2">Sesion real HYBRID</p>
                  <p className="text-lg sm:text-xl text-white font-semibold leading-tight mb-3">
                    Entrenamiento inteligente para fuerza, composicion y longevidad.
                  </p>
                  <a
                    href={VSL_URL}
                    className="inline-flex items-center gap-2 btn-metallic rounded-full px-4 py-2 text-xs font-semibold"
                    onClick={() => trackEvent("vsl_play", { section: "hero_media", href: VSL_URL })}
                    target={VSL_URL.startsWith("http") ? "_blank" : undefined}
                    rel={VSL_URL.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <Play className="w-3.5 h-3.5" />
                    Ver como funciona HYBRID
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section-tone section-tone-soft max-w-5xl mx-auto px-4 sm:px-6 mb-24">
          <div className="glass-panel rounded-2xl p-8 sm:p-10 text-center reveal">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400 mb-3">
              <Activity className="w-3.5 h-3.5 text-[#c6b2ff]" />
              Diagnostico rapido
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-8">3 senales de que tu cuerpo te esta avisando algo</h2>

            <div className="grid md:grid-cols-3 gap-4 text-left mb-8">
              <article className="card-insight rounded-xl border border-white/10 border-l-2 border-l-amber-500/60 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400/70" />
                  <p className="text-xs font-medium text-amber-400/80 uppercase tracking-wider">Senal 01</p>
                </div>
                <h3 className="font-space text-lg font-semibold mb-2">Necesitas cafe para funcionar y a las 3pm ya no das mas</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Dos cafes antes de las 10am. Crash a las 3pm. Arrastrarte hasta las 6. Lo normalizaste como
                  &quot;es mi ritmo&quot;. No lo es. Tu sistema muscular esta apagado y tu metabolismo lo sabe.
                </p>
              </article>
              <article className="card-insight rounded-xl border border-white/10 border-l-2 border-l-amber-500/60 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400/70" />
                  <p className="text-xs font-medium text-amber-400/80 uppercase tracking-wider">Senal 02</p>
                </div>
                <h3 className="font-space text-lg font-semibold mb-2">
                  Dolor de espalda, hombro o rodilla que &quot;aparecio solo&quot;
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  No es la edad. No es genetica. Es tu cuerpo compensando la falta de fuerza funcional. Sin base
                  muscular correcta, las articulaciones pagan la cuenta.
                </p>
              </article>
              <article className="card-insight rounded-xl border border-white/10 border-l-2 border-l-amber-500/60 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400/70" />
                  <p className="text-xs font-medium text-amber-400/80 uppercase tracking-wider">Senal 03</p>
                </div>
                <h3 className="font-space text-lg font-semibold mb-2">Llevas 3+ intentos este ano y siempre se cae</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Enero, marzo, septiembre. Mismo ciclo: arrancas motivado, la vida se cruza, abandonas. No es falta
                  de ganas. Es que tu plan solo funciona cuando todo esta perfecto. Y tu vida nunca lo esta.
                </p>
              </article>
            </div>

            <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto">
              Si tu plan solo funciona cuando todo esta en orden, no tienes un plan. Tienes un deseo.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4 text-left reveal">
              <article className="support-media aspect-[16/9]">
                <Image
                  src={VISUAL_ASSETS.diagnosticTraining}
                  alt="GENESIS analizando biomecanica durante sesion de fuerza"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-[center_35%]"
                />
                <div className="support-media-overlay-light" />
                <div className="support-media-copy">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-200 mb-1">Sistema activo</p>
                  <p className="text-sm text-white font-medium">
                    GENESIS analizando biomecanica en tiempo real durante tu sesion
                  </p>
                </div>
              </article>
              <article className="support-media aspect-[16/9]">
                <Image
                  src={VISUAL_ASSETS.diagnosticRecovery}
                  alt="Gym premium adaptado a tu vida real"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="support-media-overlay-light" />
                <div className="support-media-copy">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-200 mb-1">Tu espacio</p>
                  <p className="text-sm text-white font-medium">Tu espacio. Tu ritmo. Sin reglas genericas.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-24 text-center">
          <div className="reveal glass-panel rounded-2xl p-6 sm:p-8 border border-[#6D00FF]/25">
            <p className="text-lg sm:text-xl text-slate-100 font-medium mb-2">Te identificaste con alguna de estas senales?</p>
            <p className="text-sm text-slate-300 mb-5">
              GENESIS puede decirte en 2 minutos que esta pasando y si HYBRID es lo que necesitas.
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

        <section id="secretos" className="section-anchor section-tone section-tone-soft max-w-7xl mx-auto px-4 sm:px-6 mb-24">
          <div className="text-center mb-10 reveal">
            <h2 className="text-3xl sm:text-4xl font-semibold">Lo que nadie te dice (y que cambia todo)</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="flex flex-col gap-3">
              <div className="text-center py-3">
                <p className="text-4xl sm:text-5xl font-bold text-[#6D00FF] font-space stat-callout-violet">3-8%</p>
                <p className="text-xs text-slate-400 mt-1">de masa muscular perdida por decada despues de los 30</p>
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

            <div className="flex flex-col gap-3">
              <div className="text-center py-3">
                <p className="text-4xl sm:text-5xl font-bold text-[#6D00FF] font-space stat-callout-violet">73%</p>
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

            <div className="flex flex-col gap-3">
              <div className="text-center py-3">
                <p className="text-4xl sm:text-5xl font-bold text-emerald-400 font-space stat-callout-emerald">12%</p>
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
        </section>

        {/* ── Visual Break: imagen full-width entre creencias y mecanismo ── */}
        <div className="visual-break reveal mb-24 aspect-[21/7] sm:aspect-[21/6] max-h-[360px]">
          <Image
            src={VISUAL_ASSETS.processContext}
            alt="NGX HYBRID — Performance y Longevidad en accion"
            fill
            sizes="100vw"
            className="object-cover object-[center_30%]"
            priority={false}
          />
          <div className="visual-break-overlay" />
          <div className="visual-break-caption">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300 mb-1">Performance & Longevidad</p>
            <p className="text-base sm:text-lg font-semibold text-white max-w-xl mx-auto px-4 leading-snug">
              Tu cuerpo merece un sistema que funcione con tu vida real.
            </p>
          </div>
        </div>

        <section id="que-es" className="section-anchor section-tone section-tone-soft max-w-7xl mx-auto px-4 sm:px-6 mb-24">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <article className="reveal glass-panel card-mechanism rounded-2xl p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300 mb-3">Arquitectura de tu progreso</p>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                HYBRID: el primer sistema donde IA y coach humano trabajan juntos para ti.
              </h2>
              <p className="text-slate-200 leading-relaxed mb-5">
                GENESIS analiza tu contexto real - sueno, estres, disponibilidad, historial - y disena tu semana. Un
                coach humano valida cada decision importante. Tu ejecutas sabiendo exactamente que hacer y por que.
              </p>
              <p className="text-slate-200 leading-relaxed mb-5">
                Cada semana progresas con control de calidad. Sin adivinar. Sin improvisar. Y cada semana aprendes a
                tomar mejores decisiones sobre tu cuerpo.
              </p>

              <div className="bg-black/30 p-4 rounded-lg border border-white/10 text-shield">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300 mb-3 font-mono-tech">Semana tipo HYBRID</p>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center justify-between gap-3 border border-white/10 rounded-lg px-3 py-2 bg-white/[0.02]">
                    <p className="text-slate-100 font-medium">Dia 1 - Fuerza base</p>
                    <span className="text-[11px] rounded-full px-2 py-1 border border-[#6D00FF]/35 bg-[#6D00FF]/12 text-[#d8cbff]">
                      Pierna + core
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 border border-white/10 rounded-lg px-3 py-2 bg-white/[0.02]">
                    <p className="text-slate-100 font-medium">Dia 3 - Upper + condicion</p>
                    <span className="text-[11px] rounded-full px-2 py-1 border border-[#6D00FF]/35 bg-[#6D00FF]/12 text-[#d8cbff]">
                      40 minutos
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 border border-white/10 rounded-lg px-3 py-2 bg-white/[0.02]">
                    <p className="text-slate-100 font-medium">Dia 5 - Full body + potencia</p>
                    <span className="text-[11px] rounded-full px-2 py-1 border border-emerald-400/35 bg-emerald-400/12 text-emerald-200">
                      Ajuste semanal
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  Si duermes mal o sube el estres, ajustamos volumen y recuperacion para mantener progreso sin romperte.
                </p>
              </div>
              <div className="mt-5 support-media aspect-[16/7] rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={VISUAL_ASSETS.mechanismContext}
                  alt="GENESIS monitoreando sesion en gym con datos holograficos"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-[center_20%]"
                />
                <div className="support-media-overlay-light" />
                <div className="support-media-copy">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-200 mb-1">En la practica</p>
                  <p className="text-sm text-white font-medium">Asi se ve el sistema funcionando en tu sesion real</p>
                </div>
              </div>
            </article>

            <article id="video" className="reveal delay-1 glass-panel card-mechanism rounded-2xl p-5 sm:p-6 flex flex-col">
              <div className="brand-photo-frame relative rounded-xl overflow-hidden border border-white/10 bg-black/30 min-h-[260px] sm:min-h-[320px] flex items-center justify-center">
                {VSL_TEASER_VIDEO_SRC ? (
                  <div className="hero-video-wrap">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={VISUAL_ASSETS.videoThumbnail}
                    >
                      <source src={VSL_TEASER_VIDEO_SRC} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <Image
                    src={VISUAL_ASSETS.videoThumbnail}
                    alt="GENESIS mostrando paneles holograficos de analisis fitness"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover object-[center_15%]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/35" />
                <p className="absolute left-4 right-4 bottom-4 text-sm text-slate-100 text-left">
                  Video: como funciona HYBRID en 12 minutos
                </p>
                <a
                  href={VSL_URL}
                  className="absolute btn-metallic rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2"
                  onClick={() => trackEvent("vsl_play", { section: "video", href: VSL_URL })}
                  target={VSL_URL.startsWith("http") ? "_blank" : undefined}
                  rel={VSL_URL.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <Play className="w-4 h-4" />
                  Ver el video completo (12 min)
                </a>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs text-slate-200">
                  Aldo te explica el mecanismo completo, la ciencia detras y que esperar de tus 12 semanas.
                </p>
                <span className="text-[11px] rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 px-2 py-1">
                  Listo para embed real
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Mecanismo HYBRID", "Ciencia aplicada", "Siguiente paso claro"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200"
                  >
                    <Check className="w-3 h-3 text-emerald-300" />
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="como-funciona" className="section-anchor section-tone section-tone-soft max-w-6xl mx-auto px-4 sm:px-6 mb-24">
          <div className="reveal text-center mb-10">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-300 mb-2">
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              Proceso
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold">3 pasos para activar tu transformacion fisica.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                n: "1",
                title: "Evaluamos tu punto de partida",
                text: "GENESIS diagnostica tu contexto real: fuerza base, energia, disponibilidad y objetivo fisico. En 2 minutos defines un punto de arranque claro.",
              },
              {
                n: "2",
                title: "Programamos tu semana real",
                text: "Recibes tus 3 sesiones y enfoque nutricional segun tu vida real: dias disponibles, tiempo por sesion y nivel actual. Sin plantillas genericas.",
              },
              {
                n: "3",
                title: "Ajustamos segun rendimiento",
                text: "Cada semana ajustamos cargas, volumen y recuperacion con tus datos reales. Asi progresas aunque haya estres, viajes o semanas imperfectas.",
              },
            ].map((step, idx) => (
              <article key={step.n} className={`reveal glass-panel card-mechanism rounded-2xl p-6 sm:p-7 ${idx === 1 ? "delay-1" : ""} ${idx === 2 ? "delay-2" : ""}`}>
                <div className="w-11 h-11 rounded-full bg-[#6D00FF]/20 border border-[#6D00FF]/40 flex items-center justify-center mb-5 text-[#d5c8ff] font-space font-semibold">
                  {step.n}
                </div>
                <h3 className="font-space text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-slate-200 leading-relaxed">{step.text}</p>
              </article>
            ))}
          </div>

          <div className="reveal mt-6 grid sm:grid-cols-2 gap-4">
            <article className="support-media brand-photo-frame aspect-[4/3] sm:aspect-[3/2]">
              <Image
                src={VISUAL_ASSETS.processAdaptive}
                alt="GENESIS analizando y disenando periodizacion personalizada"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover object-[62%_center]"
              />
              <div className="support-media-overlay brand-photo-overlay" />
              <div className="support-media-copy">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-100 mb-1">Programacion inteligente</p>
                <p className="text-sm text-white font-medium">
                  GENESIS disenando tu periodizacion basada en datos reales
                </p>
              </div>
            </article>
            <article className="support-media aspect-[4/3] sm:aspect-[3/2]">
              <Image
                src={VISUAL_ASSETS.processContext}
                alt="Comunidad NGX en gym futurista con sistema de datos integrado"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover object-[center_30%]"
              />
              <div className="support-media-overlay" />
              <div className="support-media-copy">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-200 mb-1">Comunidad + Sistema</p>
                <p className="text-sm text-white font-medium">
                  No estas solo. Tu equipo y la tecnologia trabajan contigo.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="section-tone section-tone-soft max-w-6xl mx-auto px-4 sm:px-6 mb-24">
          <div className="reveal text-center mb-10">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-300 mb-2">
              <Dumbbell className="w-3.5 h-3.5 text-[#A78BFA]" />
              Semana real HYBRID
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold">Asi se ve una semana que transforma tu fisico</h2>
            <p className="text-slate-300 mt-3 max-w-2xl mx-auto">
              Nada de rutinas infinitas. 3 sesiones bien programadas, ajustes por datos y foco total en fuerza,
              composicion y rendimiento real.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-5">
            <article className="reveal glass-panel card-mechanism rounded-2xl p-6 sm:p-7 border border-[#6D00FF]/25">
              <div className="flex items-center justify-between gap-3 mb-5">
                <h3 className="font-space text-2xl font-semibold">Plan semanal de ejecucion</h3>
                <span className="text-[11px] rounded-full px-2.5 py-1 border border-emerald-400/35 bg-emerald-400/12 text-emerald-200">
                  3 dias / 45 min
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    day: "Dia 1",
                    title: "Fuerza base",
                    detail: "Sentadilla + empuje + core anti-rotacion",
                    tag: "Carga progresiva",
                    tone: "violet",
                  },
                  {
                    day: "Dia 3",
                    title: "Upper + condicion",
                    detail: "Tiron vertical + press inclinado + carries",
                    tag: "Densidad metabolica",
                    tone: "violet",
                  },
                  {
                    day: "Dia 5",
                    title: "Full body + potencia",
                    detail: "Patrones globales + finisher de potencia",
                    tag: "Recomposicion activa",
                    tone: "emerald",
                  },
                ].map((item, idx) => (
                  <div
                    key={item.day}
                    className={`rounded-xl border p-4 bg-white/[0.02] ${
                      item.tone === "emerald" ? "border-emerald-400/25" : "border-[#6D00FF]/25"
                    } ${idx === 1 ? "reveal delay-1" : ""} ${idx === 2 ? "reveal delay-2" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="text-sm font-semibold text-white">
                        {item.day} - {item.title}
                      </p>
                      <span
                        className={`text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-full border ${
                          item.tone === "emerald"
                            ? "text-emerald-200 border-emerald-400/35 bg-emerald-400/12"
                            : "text-[#d9ccff] border-[#6D00FF]/35 bg-[#6D00FF]/12"
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                Si tu sueno cae o tu estres sube, HYBRID ajusta volumen e intensidad para que sigas progresando sin
                perder traccion.
              </p>
            </article>

            <div className="space-y-5">
              <article className="reveal delay-1 glass-panel card-mechanism rounded-2xl p-6 border border-emerald-400/25">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-300 mb-3">Pruebas fisicas clave</p>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Sentadilla goblet", base: "24 kg x 8", target: "32 kg x 8" },
                    { label: "Push-up controlada", base: "12 reps", target: "22 reps" },
                    { label: "Farmer carry", base: "20 m", target: "40 m" },
                  ].map((test) => (
                    <div key={test.label} className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
                      <p className="text-slate-100 font-medium mb-1">{test.label}</p>
                      <p className="text-xs text-slate-300">
                        Base: <span className="text-slate-100">{test.base}</span>
                        <span className="mx-2 text-slate-500">→</span>
                        Objetivo: <span className="text-emerald-200">{test.target}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="reveal delay-2 glass-panel card-mechanism rounded-2xl p-6 border border-[#6D00FF]/25">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-300 mb-3">Scoreboard semanal</p>
                <div className="space-y-3">
                  {[
                    { label: "Sesiones completadas", value: "3/3", width: "100%", tone: "violet" },
                    { label: "Carga total de trabajo", value: "+11%", width: "78%", tone: "violet" },
                    { label: "Energia reportada", value: "8.2/10", width: "82%", tone: "emerald" },
                  ].map((kpi) => (
                    <div key={kpi.label}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <p className="text-slate-300">{kpi.label}</p>
                        <p className={`font-semibold ${kpi.tone === "emerald" ? "text-emerald-300" : "text-[#d8caff]"}`}>{kpi.value}</p>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            kpi.tone === "emerald"
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-300"
                              : "bg-gradient-to-r from-[#6D00FF] to-[#A78BFA]"
                          }`}
                          style={{ width: kpi.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                  Menos percepcion. Mas datos fisicos y decisiones de entrenamiento basadas en resultados.
                </p>
              </article>
            </div>
          </div>
        </section>

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
            <article className="glass-panel rounded-2xl p-6 text-center border border-[#6D00FF]/25 hover:border-[#6D00FF]/50 transition-all duration-300 hover:-translate-y-1">
              <p className="text-4xl sm:text-5xl font-bold font-space text-[#A78BFA] mb-2">
                <span
                  className="counter-num"
                  data-counter-target="12"
                  data-counter-prefix="+"
                  data-counter-decimals="0"
                >+12</span><span className="text-2xl">kg</span>
              </p>
              <p className="text-sm font-medium text-white mb-1">Masa magra</p>
              <div className="w-full h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
                <div className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-[#6D00FF] to-[#A78BFA]" data-progress-width="85" />
              </div>
              <p className="text-[10px] text-slate-400 mt-2">12 semanas de Season</p>
            </article>

            <article className="glass-panel rounded-2xl p-6 text-center border border-[#6D00FF]/25 hover:border-[#6D00FF]/50 transition-all duration-300 hover:-translate-y-1">
              <p className="text-4xl sm:text-5xl font-bold font-space text-[#A78BFA] mb-2">
                <span
                  className="counter-num"
                  data-counter-target="34"
                  data-counter-prefix="+"
                  data-counter-decimals="0"
                >+34</span><span className="text-2xl">%</span>
              </p>
              <p className="text-sm font-medium text-white mb-1">Fuerza en press</p>
              <div className="w-full h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
                <div className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-[#6D00FF] to-[#A78BFA]" data-progress-width="72" />
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Bench press 1RM</p>
            </article>

            <article className="glass-panel rounded-2xl p-6 text-center border border-emerald-500/25 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1">
              <p className="text-4xl sm:text-5xl font-bold font-space text-emerald-400 mb-2">
                <span
                  className="counter-num"
                  data-counter-target="8"
                  data-counter-prefix="-"
                  data-counter-decimals="0"
                >-8</span><span className="text-2xl">%</span>
              </p>
              <p className="text-sm font-medium text-white mb-1">Grasa corporal</p>
              <div className="w-full h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
                <div className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" data-progress-width="78" />
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Composicion corporal</p>
            </article>

            <article className="glass-panel rounded-2xl p-6 text-center border border-emerald-500/25 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1">
              <p className="text-4xl sm:text-5xl font-bold font-space text-emerald-400 mb-2">
                <span
                  className="counter-num"
                  data-counter-target="0.8"
                  data-counter-prefix="-"
                  data-counter-decimals="1"
                >-0.8</span><span className="text-2xl">%</span>
              </p>
              <p className="text-sm font-medium text-white mb-1">HbA1c</p>
              <div className="w-full h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
                <div className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" data-progress-width="65" />
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
            <p className="text-lg sm:text-xl font-semibold text-white mt-4">12 semanas. Datos reales. Sin atajos.</p>
          </div>
        </section>

        {RESULTS_VIDEO_SRC && (
          <div className="visual-break reveal mb-24 aspect-[21/9] max-h-[380px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={RESULTS_VIDEO_SRC} type="video/mp4" />
            </video>
            <div className="visual-break-overlay" />
            <div className="visual-break-caption">
              <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-300 mb-1">Metricas en tiempo real</p>
              <p className="text-base sm:text-lg font-semibold text-white max-w-xl mx-auto px-4 leading-snug">
                Cada numero cambia. Tu cuerpo lo registra. El sistema lo usa.
              </p>
            </div>
          </div>
        )}

        <section className="section-tone section-tone-soft max-w-5xl mx-auto px-4 sm:px-6 mb-24">
          <div className="reveal text-center mb-12">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-300 mb-2">
              <Route className="w-3.5 h-3.5 text-emerald-400" />
              Progresion compuesta
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold">Tu cuerpo mejora. Y sigue mejorando.</h2>
            <p className="text-slate-300 mt-3 max-w-2xl mx-auto">
              HYBRID no es un sprint de 12 semanas. Es el inicio de una curva compuesta que transforma como rindes y
              como envejeces.
            </p>
          </div>

          <div className="reveal relative">
            <div className="hidden sm:block absolute top-[28px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#6D00FF] via-[#6D00FF]/60 to-emerald-400/80" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 relative">
              <div className="timeline-node text-center">
                <div className="w-14 h-14 rounded-full bg-[#6D00FF]/20 border-2 border-[#6D00FF] flex items-center justify-center mx-auto mb-4 relative z-10">
                  <Activity className="w-6 h-6 text-[#A78BFA]" />
                </div>
                <p className="text-sm font-bold text-[#A78BFA] font-space mb-1">Semana 2</p>
                <p className="text-base font-semibold text-white mb-2">Primeros datos medibles</p>
                <p className="text-xs text-slate-400">Fuerza base, energia, calidad de sueno - tu punto de partida real</p>
              </div>

              <div className="timeline-node text-center">
                <div className="w-14 h-14 rounded-full bg-[#6D00FF]/15 border-2 border-[#6D00FF]/70 flex items-center justify-center mx-auto mb-4 relative z-10">
                  <Dumbbell className="w-6 h-6 text-[#A78BFA]" />
                </div>
                <p className="text-sm font-bold text-[#A78BFA] font-space mb-1">Mes 3</p>
                <p className="text-base font-semibold text-white mb-2">Composicion corporal visible</p>
                <p className="text-xs text-slate-400">Recomposicion medible: mas musculo, menos grasa, ropa diferente</p>
              </div>

              <div className="timeline-node text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border-2 border-emerald-400/60 flex items-center justify-center mx-auto mb-4 relative z-10">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-sm font-bold text-emerald-400 font-space mb-1">Ano 1</p>
                <p className="text-base font-semibold text-white mb-2">Biomarcadores transformados</p>
                <p className="text-xs text-slate-400">HbA1c, presion, lipidos, inflamacion - tu medico lo nota</p>
              </div>

              <div className="timeline-node text-center">
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

        <section id="garantia" className="section-anchor section-tone section-tone-offer max-w-5xl mx-auto px-4 sm:px-6 mb-10">
          <article className="reveal glass-panel card-offer rounded-2xl p-7 sm:p-8 border border-emerald-400/25">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-400/12 border border-emerald-300/25 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-xs font-medium mb-3">
                  Sin riesgo. Sin letra pequena.
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 mb-2">Garantia de progreso - o seguimos gratis</p>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
                  Si en 30 dias no hay progreso medible, seguimos sin costo.
                </h2>
                <p className="text-slate-200 leading-relaxed">
                  Cumple el minimo: 80% de sesiones y tus check-ins semanales. Si en 30 dias no ves progreso medible
                  en al menos 2 metricas - fuerza, medidas, energia o consistencia - te damos 4 semanas extra de
                  HYBRID. Gratis. Sin preguntas. Porque si el sistema funciona, no necesitamos protegernos. Y si no
                  funciona, no merecemos tu dinero.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section id="oferta" className="section-anchor section-tone section-tone-offer max-w-5xl mx-auto px-4 sm:px-6 mb-20">
          <article className="reveal glass-panel card-offer rounded-2xl p-7 sm:p-10 border border-[#6D00FF]/35 shadow-[0_0_70px_-30px_rgba(109,0,255,0.7)]">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-2">Todo lo que recibes en tu Season de 12 semanas</h2>
            <p className="text-slate-200 mb-8">Valor real. No descuentos de humo.</p>

            <div className="rounded-xl border border-white/10 bg-black/20 overflow-hidden mb-6">
              {[
                "Season completa de 12 semanas con periodizacion personalizada",
                "Coaching humano semanal (validacion de decisiones clave)",
                "GENESIS: IA adaptativa que ajusta tu plan en tiempo real",
                "Protocolo nutricional alineado a tu contexto y objetivos",
                "Kickstart guiado de 7 dias para arrancar con traccion",
                "Comunidad privada NGX + soporte directo",
              ].map((item, idx) => (
                <div key={item} className={`flex items-center gap-3 px-4 py-4 text-sm ${idx < 5 ? "value-row" : ""}`}>
                  <Check className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                  <span className="text-slate-100">{item}</span>
                </div>
              ))}
            </div>

            <div className="accent-line mb-5" />

            <div className="support-media aspect-[21/9] sm:aspect-[3/1] rounded-xl overflow-hidden border border-white/10 mb-6">
              <Image
                src={VISUAL_ASSETS.offerFounder}
                alt="Aldo y GENESIS - el equipo detras de tu Season"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[center_25%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-300 mb-1">
                    El equipo detras de tu Season
                  </p>
                  <p className="text-lg text-white font-semibold">
                    Aldo + GENESIS. Decisiones humanas + inteligencia artificial.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-sm text-slate-200 mt-2">
                  Tu inversion depende de tu nivel de soporte y objetivos. GENESIS te ayuda a encontrar el plan
                  correcto en una conversacion de 2 minutos.
                </p>
              </div>
              <button
                type="button"
                className="btn-metallic rounded-full px-7 py-3 text-sm font-semibold tracking-wide"
                onClick={() => {
                  setAgentModalOpen(true);
                  trackEvent("cta_genesis_offer", { section: "oferta" });
                }}
              >
                HABLAR CON GENESIS - DESCUBRE TU PLAN
              </button>
            </div>
          </article>
        </section>

        <section className="section-tone section-tone-offer max-w-5xl mx-auto px-4 sm:px-6 mb-24">
          <div className="reveal rounded-xl border border-[#6D00FF]/25 bg-[#6D00FF]/10 px-5 py-4 text-sm text-[#e2d8ff]">
            {`Cohorte Febrero 2026: ${cohortAvailabilityText}. Cada Season esta limitada por capacidad de coaches - cuando se llenan, cerramos inscripciones hasta la siguiente cohorte.`}
          </div>
        </section>

        <section id="agente" className="section-anchor section-tone section-tone-soft max-w-6xl mx-auto px-4 sm:px-6 mb-24">
          <div className="reveal grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch">
            <article className="glass-panel card-mechanism rounded-2xl p-7 sm:p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300 mb-2">Tu primer paso</p>
              <h2 className="text-3xl font-semibold mb-3">Habla con GENESIS antes de decidir</h2>
              <p className="text-slate-200 leading-relaxed mb-5">
                GENESIS te hace las preguntas correctas sobre tu contexto, objetivos y disponibilidad. En 2 minutos te
                dice si HYBRID es para ti y cual es tu siguiente paso. Sin compromiso. Sin venderte nada.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn-metallic rounded-full px-6 py-3 text-sm font-semibold"
                  onClick={() => {
                    setAgentModalOpen(true);
                    trackEvent("cta_genesis_agente", { section: "agente" });
                  }}
                >
                  Iniciar conversacion con GENESIS
                </button>
                <a
                  href={SCHEDULE_URL}
                  className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold"
                  onClick={() => trackEvent("cta_schedule_agente", { section: "agente", href: SCHEDULE_URL })}
                  target={SCHEDULE_URL.startsWith("http") ? "_blank" : undefined}
                  rel={SCHEDULE_URL.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  Agendar llamada
                </a>
              </div>
            </article>

            <article className="glass-panel card-mechanism rounded-2xl p-4 sm:p-5 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#6D00FF]/20 blur-2xl" />
              <div className="relative rounded-xl border border-white/10 bg-black/25 p-4 h-full min-h-[280px]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">Widget conversacional</p>
                  <span className="float-chip text-[10px] border border-emerald-400/35 bg-emerald-400/10 text-emerald-300 px-2 py-1 rounded-full">
                    En linea
                  </span>
                </div>
                <div
                  id="elevenlabs-convai-container"
                  className="rounded-lg border border-dashed border-white/20 min-h-[220px] flex items-center justify-center text-center px-4"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Loader className="w-5 h-5 text-emerald-300 animate-spin" />
                    <p className="text-sm text-slate-300">
                      GENESIS se esta preparando. En un momento podras hablar directamente.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="preguntas" className="section-anchor section-tone section-tone-soft max-w-4xl mx-auto px-4 sm:px-6 mb-24">
          <div className="reveal text-center mb-8">
            <h2 className="inline-flex items-center gap-2 text-3xl sm:text-4xl font-semibold">
              <MessageCircle className="w-7 h-7 text-[#c6b2ff]" />
              Preguntas frecuentes
            </h2>
          </div>

          <div className="reveal glass-panel card-mechanism rounded-2xl px-5 sm:px-7 py-2">
            {faqList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className={`faq-item py-5 ${isOpen ? "active" : ""}`}>
                  <button
                    type="button"
                    className="faq-trigger w-full flex items-center justify-between gap-3 text-left"
                    onClick={() => {
                      const next = isOpen ? null : idx;
                      setOpenFaq(next);
                      if (next !== null) trackEvent(faq.event, { section: "faq" });
                    }}
                  >
                    <span className="text-base sm:text-lg">{faq.q}</span>
                    <Plus className="faq-icon w-5 h-5 text-slate-300" />
                  </button>
                  <div className="faq-answer">
                    <p className="pt-3 text-sm text-slate-200">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section-tone section-tone-offer max-w-5xl mx-auto px-4 sm:px-6 mb-12">
          <article className="reveal glass-panel card-offer rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.24]">
              <Image
                src={VISUAL_ASSETS.ctaBackground}
                alt=""
                fill
                className="object-cover object-[center_30%]"
                aria-hidden="true"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-semibold mb-3">No necesitas mas informacion.</h2>
            <p className="text-xl text-slate-200 mb-3">
              Necesitas un sistema que funcione con tu vida real. Y 2 minutos con GENESIS para saber si es este.
            </p>
            <p className="text-slate-300 max-w-3xl mx-auto mb-8">
              12 semanas. Progreso medible. Garantia de resultado. Lo unico que necesitas decidir es si quieres
              empezar.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                type="button"
                className="btn-metallic rounded-full px-8 py-4 text-sm sm:text-base font-semibold"
                onClick={() => {
                  setAgentModalOpen(true);
                  trackEvent("cta_genesis_final", { section: "cta_final" });
                }}
              >
                HABLAR CON GENESIS - EMPIEZA AQUI
              </button>
              <a
                href={APPLY_URL}
                className="btn-ghost rounded-full px-8 py-4 text-sm sm:text-base font-semibold"
                onClick={() => trackEvent("cta_apply_final", { section: "cta_final", href: APPLY_URL })}
                target={APPLY_URL.startsWith("http") ? "_blank" : undefined}
                rel={APPLY_URL.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                Aplicar directamente
              </a>
            </div>
            </div>
          </article>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6D00FF] to-[#A78BFA] flex items-center justify-center">
                <Hexagon className="w-4 h-4 text-white" />
              </span>
              <p className="font-space font-semibold">NGX HYBRID</p>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Tecnologia, IA e innovacion aplicada a resultados reales de salud muscular.
            </p>
          </div>

          {[
            {
              title: "Producto",
              links: ["HYBRID", "ASCEND", "GENESIS"],
            },
            {
              title: "Compania",
              links: ["Sobre NGX", "Manifiesto", "Contacto"],
            },
            {
              title: "Legal",
              links: ["Privacidad", "Terminos", "Garantia"],
            },
          ].map((block) => (
            <div key={block.title}>
              <p className="font-space text-sm font-semibold mb-3">{block.title}</p>
              <ul className="space-y-2 text-sm text-slate-400">
                {block.links.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition" onClick={() => trackEvent("footer_click", { section: "footer", cta: item })}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-500">
          <p>Copyright 2026 NGX. Todos los derechos reservados.</p>
          <p>El conocimiento te libera. - GENESIS</p>
        </div>
      </footer>

      <button
        id="floatingAgentBtn"
        type="button"
        aria-label="Es HYBRID para ti?"
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+0.65rem)] sm:bottom-5 right-3 sm:right-5 z-40 btn-metallic rounded-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold flex items-center gap-2 agent-pulse max-w-[calc(100vw-1.5rem)]"
        onClick={() => {
          setAgentModalOpen(true);
          trackEvent("agent_floating_open", { section: "floating_cta" });
        }}
      >
        <MessageCircle className="w-4 h-4" />
        <span className="floating-agent-label">Es HYBRID para ti?</span>
      </button>

      {agentModalOpen && (
        <div
          className="fixed inset-0 z-[60] agent-modal-open items-center justify-center p-4 bg-black/70"
          role="dialog"
          aria-modal="true"
        >
          <div className="glass-panel rounded-2xl w-full max-w-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
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
              <button
                type="button"
                className="btn-ghost rounded-lg p-2"
                aria-label="Cerrar modal"
                onClick={() => setAgentModalOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-300 mb-4">
              Hazle cualquier pregunta. GENESIS te dice en 2 minutos si HYBRID es lo que necesitas.
            </p>
            <div className="rounded-xl border border-dashed border-white/20 min-h-[260px] p-4 flex items-center justify-center text-center text-slate-400">
              Conectando con GENESIS...
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={APPLY_URL}
                className="btn-metallic rounded-full px-5 py-2.5 text-sm font-semibold"
                onClick={() => trackEvent("agent_apply_modal", { section: "agent_modal", href: APPLY_URL })}
              >
                Aplicar directamente
              </a>
              <a
                href={SCHEDULE_URL}
                className="btn-ghost rounded-full px-5 py-2.5 text-sm font-semibold"
                onClick={() => trackEvent("cta_schedule_agent_modal", { section: "agent_modal", href: SCHEDULE_URL })}
              >
                Prefiero hablar con una persona
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
