"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Activity,
  Check,
  Hexagon,
  Loader,
  Menu,
  MessageCircle,
  Play,
  Plus,
  RefreshCw,
  Route,
  ShieldCheck,
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
const COHORT_SPOTS_FILLED = 8;
const COHORT_SPOTS_TOTAL = 20;
const cohortAvailabilityText = `${COHORT_SPOTS_FILLED} de ${COHORT_SPOTS_TOTAL} cupos disponibles`;
const VISUAL_ASSETS = {
  diagnosticTraining: "/images/brand/genesis-duo.png",
  diagnosticRecovery: "/images/brand/genesis-solo.png",
  processContext: "/images/brand/genesis-duo.png",
  videoThumbnail: "/images/brand/genesis-duo.png",
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
      { id: "como-funciona", label: "Como funciona" },
      { id: "garantia", label: "Garantia" },
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

      <header className="fixed z-50 pt-5 top-0 right-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="glass-panel rounded-full px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
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
              className="btn-metallic px-5 py-2.5 rounded-full text-white text-xs font-bold tracking-wide"
              onClick={() => {
                setAgentModalOpen(true);
                trackEvent("cta_genesis_nav", { section: "header" });
              }}
            >
              {`Hablar con GENESIS (${COHORT_SPOTS_TOTAL - COHORT_SPOTS_FILLED} cupos)`}
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

      <main className="relative z-10 pt-36 sm:pt-40 pb-20">
        <section className="section-tone section-tone-strong max-w-5xl mx-auto px-4 sm:px-6 text-center mb-24 sm:mb-28">
          <div className="reveal inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[11px] sm:text-xs text-slate-200 font-medium">
              {`Cohorte Febrero 2026 - ${cohortAvailabilityText}`}
            </span>
          </div>

          <h1 className="reveal delay-1 text-4xl sm:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.03] mb-6 font-semibold max-w-4xl mx-auto">
            Despues de los 30,
            <br />
            el problema no es el peso.
            <br />
            <span className="hero-violet">Es lo que estas perdiendo sin darte cuenta.</span>
          </h1>

          <p className="reveal delay-2 hero-subcopy text-base sm:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            Cada semana sin un sistema real, tu cuerpo practica envejecer: pierdes musculo, energia y capacidad
            metabolica. HYBRID detiene eso. IA + coach humano + tu, construyendo en 12 semanas lo que ninguna app
            puede hacer sola.
          </p>

          <div className="reveal delay-3 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12">
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

          <div className="reveal delay-3 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
            <div className="glass-panel kpi-card rounded-xl p-4">
              <p className="text-2xl font-semibold font-space">91%</p>
              <p className="text-xs text-slate-300">Completan sus sesiones cada semana - sin vivir en el gym</p>
            </div>
            <div className="glass-panel kpi-card rounded-xl p-4">
              <p className="text-2xl font-semibold font-space">12+</p>
              <p className="text-xs text-slate-300">Semanas consecutivas de progreso medible</p>
            </div>
            <div className="glass-panel kpi-card rounded-xl p-4">
              <p className="text-2xl font-semibold font-space">Semana 2</p>
              <p className="text-xs text-slate-300">El primer cambio que notas: energia y claridad</p>
            </div>
          </div>

          <p className="reveal delay-3 season-caption font-space max-w-4xl mx-auto mt-6">
            12 semanas. 4 checkpoints. Progreso que se mide, no que se promete.
          </p>
        </section>

        <section className="section-tone section-tone-soft max-w-5xl mx-auto px-4 sm:px-6 mb-24">
          <div className="glass-panel rounded-2xl p-8 sm:p-10 text-center reveal">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400 mb-3">
              <Activity className="w-3.5 h-3.5 text-[#c6b2ff]" />
              Diagnostico rapido
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-8">3 senales de que tu cuerpo te esta avisando algo</h2>

            <div className="grid md:grid-cols-3 gap-4 text-left mb-8">
              <article className="card-insight rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-slate-300 mb-2">01</p>
                <h3 className="font-space text-lg font-semibold mb-2">Necesitas cafe para funcionar y a las 3pm ya no das mas</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Dos cafes antes de las 10am. Crash a las 3pm. Arrastrarte hasta las 6. Lo normalizaste como
                  &quot;es mi ritmo&quot;. No lo es. Tu sistema muscular esta apagado y tu metabolismo lo sabe.
                </p>
              </article>
              <article className="card-insight rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-slate-300 mb-2">02</p>
                <h3 className="font-space text-lg font-semibold mb-2">
                  Dolor de espalda, hombro o rodilla que &quot;aparecio solo&quot;
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  No es la edad. No es genetica. Es tu cuerpo compensando la falta de fuerza funcional. Sin base
                  muscular correcta, las articulaciones pagan la cuenta.
                </p>
              </article>
              <article className="card-insight rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-slate-300 mb-2">03</p>
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
              <article className="support-media">
                <Image
                  src={VISUAL_ASSETS.diagnosticTraining}
                  alt="Slot visual de entrenamiento funcional real"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/45 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-100">
                  Slot foto 01
                </span>
                <div className="support-media-overlay" />
                <div className="support-media-copy">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-200 mb-1">Enfoque fitness</p>
                  <p className="text-sm text-white font-medium">Sesion real de fuerza adaptada a una agenda exigente</p>
                </div>
              </article>
              <article className="support-media">
                <Image
                  src={VISUAL_ASSETS.diagnosticRecovery}
                  alt="Slot visual de recuperacion inteligente"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-[62%_center]"
                />
                <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/45 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-100">
                  Slot foto 02
                </span>
                <div className="support-media-overlay" />
                <div className="support-media-copy">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-200 mb-1">Vida real</p>
                  <p className="text-sm text-white font-medium">Recuperacion inteligente para sostener consistencia</p>
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
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400 mb-2">
              <Route className="w-3.5 h-3.5 text-[#c6b2ff]" />
              Cambio de creencias
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold">Lo que nadie te dice (y que cambia todo)</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <article className="reveal glass-panel card-insight rounded-2xl p-7 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-[#6D00FF]/18 flex items-center justify-center mb-5">
                <Activity className="w-5 h-5 text-[#c6b2ff]" />
              </div>
              <h3 className="font-space text-2xl font-semibold mb-3">El musculo no es vanidad. Es tu seguro de vida.</h3>
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

            <article className="reveal delay-1 glass-panel card-insight rounded-2xl p-7 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-[#6D00FF]/18 flex items-center justify-center mb-5">
                <Route className="w-5 h-5 text-[#c6b2ff]" />
              </div>
              <h3 className="font-space text-2xl font-semibold mb-3">No es falta de disciplina. Es falta de sistema.</h3>
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

            <article className="reveal delay-2 glass-panel card-insight rounded-2xl p-7 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-[#6D00FF]/18 flex items-center justify-center mb-5">
                <RefreshCw className="w-5 h-5 text-[#c6b2ff]" />
              </div>
              <h3 className="font-space text-2xl font-semibold mb-3">Tu vida cambia cada semana. Tu plan deberia hacer lo mismo.</h3>
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
        </section>

        <section id="que-es" className="section-anchor section-tone section-tone-soft max-w-7xl mx-auto px-4 sm:px-6 mb-24">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <article className="reveal glass-panel card-mechanism rounded-2xl p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300 mb-3">El sistema</p>
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

              <div className="bg-black/30 p-4 rounded-lg border border-white/10 font-mono text-sm text-shield">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300 mb-3">Mini demo contextual</p>
                <pre>
                  <code className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {"// Input: 37 anos - 3 dias/semana - 45 min - sueno 6h - estres alto\n// GENESIS output:\n-> Season 12 semanas: fuerza funcional + recomposicion\n-> Semana 1: 3 sesiones (full body, 40 min adaptadas)\n-> Nutricion: protocolo flexible, 4 comidas, sin restricciones extremas\n-> Alerta: sueno bajo -> priorizar recuperacion sobre volumen\n-> Checkpoint semana 1: ajustar segun respuesta real"}
                  </code>
                </pre>
              </div>
            </article>

            <article id="video" className="reveal delay-1 glass-panel card-mechanism rounded-2xl p-5 sm:p-6 flex flex-col">
              <div className="brand-photo-frame relative rounded-xl overflow-hidden border border-white/10 bg-black/30 min-h-[260px] sm:min-h-[320px] flex items-center justify-center">
                <Image
                  src={VISUAL_ASSETS.videoThumbnail}
                  alt="Thumbnail VSL HYBRID (listo para reemplazar por footage fitness real)"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/35" />
                <span className="absolute top-3 left-3 rounded-full border border-white/25 bg-black/45 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-100">
                  Slot video VSL
                </span>
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
            <h2 className="text-3xl sm:text-4xl font-semibold">3 pasos para arrancar. Menos de 5 minutos.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                n: "1",
                title: "Habla con GENESIS (2 min)",
                text: "GENESIS te hace las preguntas correctas, evalua si HYBRID es para ti, y te dice exactamente cual es tu siguiente paso. Sin compromiso.",
              },
              {
                n: "2",
                title: "Arranca tu Season esta semana",
                text: "Kickstart guiado de 7 dias. Plan de entrenamiento, nutricion y checkpoints listos. Tu unica tarea: ejecutar y reportar como te sientes.",
              },
              {
                n: "3",
                title: "Mide tu progreso cada semana",
                text: "Fuerza, medidas, energia, adherencia. En semana 2 ya tienes datos reales. En semana 4, evidencia. En semana 12, una transformacion que se mide.",
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
            <article className="support-media brand-photo-frame min-h-[210px]">
              <Image
                src="/images/brand/genesis-solo.png"
                alt="Genesis analizando progreso adaptativo"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover object-[60%_center] sm:object-center"
              />
              <div className="support-media-overlay brand-photo-overlay" />
              <div className="support-media-copy">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-100 mb-1">Sistema adaptativo</p>
                <p className="text-sm text-white font-medium">Inteligencia contextual para ajustar tu dosis semanal</p>
              </div>
            </article>
            <article className="support-media min-h-[210px]">
              <Image
                src={VISUAL_ASSETS.processContext}
                alt="Slot visual de entrenamiento y progreso en contexto real"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
              <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/45 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-100">
                Slot foto 03
              </span>
              <div className="support-media-overlay" />
              <div className="support-media-copy">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-200 mb-1">Adaptacion</p>
                <p className="text-sm text-white font-medium">Plan vivo que responde a tu energia y contexto real</p>
              </div>
            </article>
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
                    trackEvent("agent_open_click", { section: "agente" });
                    trackEvent("cta_genesis_agente", { section: "agente" });
                  }}
                >
                  Iniciar conversacion con GENESIS
                </button>
                <a
                  href={SCHEDULE_URL}
                  className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold"
                  onClick={() => {
                    trackEvent("agent_schedule_click", { section: "agente", href: SCHEDULE_URL });
                    trackEvent("cta_schedule_agente", { section: "agente", href: SCHEDULE_URL });
                  }}
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
          <article className="reveal glass-panel card-offer rounded-2xl p-8 sm:p-10 text-center">
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
        className="fixed bottom-5 right-5 z-40 btn-metallic rounded-full px-4 py-3 text-xs font-semibold flex items-center gap-2 agent-pulse"
        onClick={() => {
          setAgentModalOpen(true);
          trackEvent("agent_floating_open", { section: "floating_cta" });
        }}
      >
        <MessageCircle className="w-4 h-4" />
        Es HYBRID para ti?
      </button>

      {agentModalOpen && (
        <div
          className="fixed inset-0 z-[60] agent-modal-open items-center justify-center p-4 bg-black/70"
          role="dialog"
          aria-modal="true"
        >
          <div className="glass-panel rounded-2xl w-full max-w-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-space text-xl font-semibold">GENESIS - NGX</h3>
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
                onClick={() => {
                  trackEvent("agent_schedule_modal", { section: "agent_modal", href: SCHEDULE_URL });
                  trackEvent("cta_schedule_agent_modal", { section: "agent_modal", href: SCHEDULE_URL });
                  trackEvent("cta_team_contact", { section: "agent_modal", href: SCHEDULE_URL });
                }}
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
