"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Activity,
  Hexagon,
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
const TEAM_CONTACT_URL = process.env.NEXT_PUBLIC_TEAM_CONTACT_URL ?? "#";
const VSL_URL = process.env.NEXT_PUBLIC_VSL_URL ?? "#";
const SCHEDULE_URL = process.env.NEXT_PUBLIC_SCHEDULE_URL ?? "#";
const N8N_WEBHOOK_FALLBACK = process.env.NEXT_PUBLIC_N8N_WEBHOOK_FUNNEL ?? "";

const faqList = [
  {
    q: "Esto es solo una app?",
    a: "No. HYBRID combina IA + coach humano + ejecucion real. La IA propone, el coach valida y tu avanzas con criterio.",
    event: "faq_open_app",
  },
  {
    q: "Y si tengo poco tiempo?",
    a: "Disenamos dosis minima efectiva (30-45 min). El objetivo es sostener progreso, no vivir en el gym.",
    event: "faq_open_time",
  },
  {
    q: "Que pasa si tengo semanas dificiles?",
    a: "El sistema ajusta para mantener estimulo y habito. No se rompe el plan por una semana imperfecta.",
    event: "faq_open_weeks",
  },
  {
    q: "Funciona si soy principiante?",
    a: "Si. Principiantes progresan muy bien cuando el sistema es seguro, simple y consistente.",
    event: "faq_open_beginner",
  },
  {
    q: "Como se mide el progreso?",
    a: "Con fuerza, medidas, energia y adherencia. Importa progreso medible, no promesas vacias.",
    event: "faq_open_progress",
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
      { id: "que-es", label: "Que es HYBRID" },
      { id: "como-funciona", label: "Como funciona" },
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

            <a
              href={APPLY_URL}
              className="btn-metallic px-5 py-2.5 rounded-full text-white text-xs font-bold tracking-wide"
              onClick={() => trackEvent("cta_apply_header", { section: "header", href: APPLY_URL })}
              target={APPLY_URL.startsWith("http") ? "_blank" : undefined}
              rel={APPLY_URL.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              Aplicar a HYBRID
            </a>
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
            <span className="text-[11px] sm:text-xs text-slate-200 font-medium">Cohorte Febrero 2026 - Cupos limitados</span>
          </div>

          <h1 className="reveal delay-1 text-4xl sm:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.03] mb-6 font-semibold max-w-4xl mx-auto">
            Despues de los 30,
            <br />
            no es el peso.
            <br />
            <span className="hero-violet">Es la salud muscular.</span>
          </h1>

          <p className="reveal delay-2 hero-subcopy text-base sm:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            La salud muscular es el motor de tu energia, tu metabolismo y como envejece tu cuerpo. HYBRID es el
            sistema donde IA, coach humano y tu construyen esa base juntos en Seasons de 12 semanas con progreso
            medible.
          </p>

          <div className="reveal delay-3 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12">
            <a
              id="aplicar"
              href={APPLY_URL}
              className="btn-metallic px-8 py-4 rounded-full text-white font-semibold tracking-wide"
              onClick={() => trackEvent("cta_apply_hero", { section: "hero", href: APPLY_URL })}
              target={APPLY_URL.startsWith("http") ? "_blank" : undefined}
              rel={APPLY_URL.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              APLICAR A LA COHORTE
            </a>
            <a
              href={VSL_URL}
              className="btn-ghost px-8 py-4 rounded-full text-white font-semibold tracking-wide flex items-center justify-center gap-2"
              onClick={() => trackEvent("vsl_click_hero", { section: "hero", href: VSL_URL })}
              target={VSL_URL.startsWith("http") ? "_blank" : undefined}
              rel={VSL_URL.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Play className="w-4 h-4" />
              Ver el video de 12 min
            </a>
          </div>

          <div className="reveal delay-3 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
            <div className="glass-panel kpi-card rounded-xl p-4">
              <p className="text-2xl font-semibold font-space">91%</p>
              <p className="text-xs text-slate-300">Adherencia semanal</p>
            </div>
            <div className="glass-panel kpi-card rounded-xl p-4">
              <p className="text-2xl font-semibold font-space">12+</p>
              <p className="text-xs text-slate-300">Semanas ganadoras promedio</p>
            </div>
            <div className="glass-panel kpi-card rounded-xl p-4">
              <p className="text-2xl font-semibold font-space">Semana 2</p>
              <p className="text-xs text-slate-300">Progreso medible visible</p>
            </div>
          </div>

          <p className="reveal delay-3 season-caption font-space max-w-4xl mx-auto mt-6">
            Season de 12 semanas · checkpoints en semana 1, 4, 8 y 12.
          </p>
        </section>

        <section className="section-tone section-tone-soft max-w-5xl mx-auto px-4 sm:px-6 mb-24">
          <div className="glass-panel rounded-2xl p-8 sm:p-10 text-center reveal">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-3">Diagnostico rapido</p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-8">3 senales silenciosas de que algo no esta funcionando</h2>

            <div className="grid md:grid-cols-3 gap-4 text-left mb-8">
              <article className="card-insight rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-slate-300 mb-2">01</p>
                <h3 className="font-space text-lg font-semibold mb-2">Energia baja que ya normalizaste</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Cafe para arrancar, crash a media tarde. Funcionar al 60% se volvio normal, pero no tiene por que serlo.
                </p>
              </article>
              <article className="card-insight rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-slate-300 mb-2">02</p>
                <h3 className="font-space text-lg font-semibold mb-2">Rigidez o dolor sin razon</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Hombro, espalda o rodilla. No es la edad, es una senal de que el sistema no esta construyendo base muscular correcta.
                </p>
              </article>
              <article className="card-insight rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-slate-300 mb-2">03</p>
                <h3 className="font-space text-lg font-semibold mb-2">Empiezas fuerte y se cae en 2-3 semanas</h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  No es falta de ganas. Es un plan que solo funciona en una vida perfecta, no en tu vida real.
                </p>
              </article>
            </div>

            <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed max-w-3xl mx-auto">
              Tu plan esta disenado para tu vida real o para una vida perfecta. Si solo funciona cuando todo esta en
              orden, no es un plan.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4 text-left reveal">
              <article className="support-media">
                <Image
                  src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=1200&q=80"
                  alt="Entrenamiento con enfoque de fuerza funcional"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="support-media-overlay" />
                <div className="support-media-copy">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-200 mb-1">Enfoque fitness</p>
                  <p className="text-sm text-white font-medium">Fuerza funcional con progresion sostenible</p>
                </div>
              </article>
              <article className="support-media">
                <Image
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
                  alt="Recuperacion y consistencia en entrenamiento"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="support-media-overlay" />
                <div className="support-media-copy">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-200 mb-1">Vida real</p>
                  <p className="text-sm text-white font-medium">Recuperacion estrategica para no romper el habito</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="secretos" className="section-anchor section-tone section-tone-soft max-w-7xl mx-auto px-4 sm:px-6 mb-24">
          <div className="text-center mb-10 reveal">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-2">Cambio de creencias</p>
            <h2 className="text-3xl sm:text-4xl font-semibold">Lo que nadie te esta diciendo</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <article className="reveal glass-panel card-insight rounded-2xl p-7 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-[#6D00FF]/18 flex items-center justify-center mb-5">
                <Activity className="w-5 h-5 text-[#c6b2ff]" />
              </div>
              <h3 className="font-space text-2xl font-semibold mb-3">El musculo no es estetica. Es tu motor.</h3>
              <p className="text-slate-200 text-sm leading-relaxed mb-4">
                El peso suele ser el sintoma. La salud muscular suele ser la causa que nadie atiende. No es bajar por
                bajar, es construir capacidad para que todo lo demas mejore.
              </p>
              <p className="text-xs text-slate-300">Rompe: necesito bajar de peso para estar bien</p>
              <p className="text-xs text-[#d7cbff] mt-1">Nueva creencia: necesito construir salud muscular</p>
            </article>

            <article className="reveal delay-1 glass-panel card-insight rounded-2xl p-7 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-[#6D00FF]/18 flex items-center justify-center mb-5">
                <Route className="w-5 h-5 text-[#c6b2ff]" />
              </div>
              <h3 className="font-space text-2xl font-semibold mb-3">No fallas por falta de ganas.</h3>
              <p className="text-slate-200 text-sm leading-relaxed mb-4">
                Fallas por entrenar en modo azar. La salida real combina dosis minima efectiva, progresion medible y
                recuperacion estrategica.
              </p>
              <p className="text-xs text-slate-300">Rompe: me falta disciplina</p>
              <p className="text-xs text-[#d7cbff] mt-1">Nueva creencia: me falta sistema</p>
            </article>

            <article className="reveal delay-2 glass-panel card-insight rounded-2xl p-7 border border-white/10">
              <div className="w-11 h-11 rounded-xl bg-[#6D00FF]/18 flex items-center justify-center mb-5">
                <RefreshCw className="w-5 h-5 text-[#c6b2ff]" />
              </div>
              <h3 className="font-space text-2xl font-semibold mb-3">La consistencia no se exige. Se disena.</h3>
              <p className="text-slate-200 text-sm leading-relaxed mb-4">
                Tu vida cambia, el sistema tambien. HYBRID ajusta temprano para proteger el habito y acumular semanas
                ganadoras sin depender de motivacion perfecta.
              </p>
              <p className="text-xs text-slate-300">Rompe: necesito mas motivacion</p>
              <p className="text-xs text-[#d7cbff] mt-1">Nueva creencia: necesito un sistema adaptable</p>
            </article>
          </div>
        </section>

        <section id="que-es" className="section-anchor section-tone section-tone-soft max-w-7xl mx-auto px-4 sm:px-6 mb-24">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <article className="reveal glass-panel card-mechanism rounded-2xl p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300 mb-3">Nueva oportunidad</p>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4">HYBRID: IA + Coach + Tu. Trabajando juntos.</h2>
              <p className="text-slate-200 leading-relaxed mb-5">
                HYBRID no es una app con rutinas ni un PDF semanal. Es un sistema donde la IA analiza contexto, el coach
                humano valida criterio y tu ejecutas con feedback minimo.
              </p>
              <p className="text-slate-200 leading-relaxed mb-5">
                Resultado: progresas con control de calidad, sin adivinar, y aprendes a tomar mejores decisiones sobre tu salud.
              </p>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-shield">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300 mb-3">Mini demo contextual</p>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Persona de 37 anos, 3 dias por semana, 45 min por sesion, sueno de 6 horas y estres alto. HYBRID disena
                  una Season de 12 semanas, entrega semana 1 lista y ajusta dosis cuando la vida cambia.
                </p>
              </div>
            </article>

            <article id="video" className="reveal delay-1 glass-panel card-mechanism rounded-2xl p-5 sm:p-6 flex flex-col">
              <div className="brand-photo-frame relative rounded-xl overflow-hidden border border-white/10 bg-black/30 min-h-[260px] sm:min-h-[320px] flex items-center justify-center">
                <Image
                  src="/images/brand/genesis-duo.png"
                  alt="Fundador con Genesis, sistema HYBRID"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="absolute inset-0 object-cover opacity-60 object-[58%_center] sm:object-center"
                />
                <div className="brand-photo-overlay absolute inset-0" />
                <a
                  href={VSL_URL}
                  className="relative btn-metallic rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2"
                  onClick={() => trackEvent("vsl_play", { section: "video", href: VSL_URL })}
                  target={VSL_URL.startsWith("http") ? "_blank" : undefined}
                  rel={VSL_URL.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <Play className="w-4 h-4" />
                  Ver VSL de 12 min
                </a>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs text-slate-200">Video principal: argumento completo, mecanismo y oferta.</p>
                <span className="text-[11px] rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 px-2 py-1">
                  Listo para embed real
                </span>
              </div>
            </article>
          </div>
        </section>

        <section id="como-funciona" className="section-anchor section-tone section-tone-soft max-w-6xl mx-auto px-4 sm:px-6 mb-24">
          <div className="reveal text-center mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-300 mb-2">Proceso</p>
            <h2 className="text-3xl sm:text-4xl font-semibold">3 pasos. 12 semanas. Progreso real.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                n: "1",
                title: "Aplica y arranca tu Season",
                text: "Aplicacion de 90 segundos. Si eres fit, arrancas esta misma semana con un kickstart guiado de 7 dias.",
              },
              {
                n: "2",
                title: "Ejecuta con claridad",
                text: "Recibes plan semanal de entrenamiento, nutricion y checkpoints. Tu tarea: ejecutar y dar feedback minimo.",
              },
              {
                n: "3",
                title: "Acumula semanas ganadoras",
                text: "Revisiones por fase con metricas reales: fuerza, medidas, energia y adherencia. Menos drama, mas progreso medible.",
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
                src="https://images.unsplash.com/photo-1549570652-97324981a6fd?auto=format&fit=crop&w=1200&q=80"
                alt="Entrenamiento personalizado con enfoque de rendimiento"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="support-media-overlay" />
              <div className="support-media-copy">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-200 mb-1">Adaptacion</p>
                <p className="text-sm text-white font-medium">Plan vivo que responde a tu energia real</p>
              </div>
            </article>
          </div>
        </section>

        <section id="oferta" className="section-anchor section-tone section-tone-offer max-w-5xl mx-auto px-4 sm:px-6 mb-20">
          <article className="reveal glass-panel card-offer rounded-2xl p-7 sm:p-10 border border-[#6D00FF]/35 shadow-[0_0_70px_-30px_rgba(109,0,255,0.7)]">
            <p className="text-xs uppercase tracking-[0.22em] text-[#cab7ff] mb-2">Grand slam offer</p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-2">Tu Season de 12 semanas incluye</h2>
            <p className="text-slate-200 mb-8">Mas valor real, no descuentos vacios.</p>

            <div className="rounded-xl border border-white/10 bg-black/20 overflow-hidden mb-6">
              {[
                ["Season completa de 12 semanas", "$1,500"],
                ["Coaching humano semanal", "$1,200"],
                ["Sistema IA adaptativo", "$800"],
                ["Nutricion alineada al contexto", "$600"],
                ["Kickstart guiado de 7 dias", "$300"],
                ["Comunidad privada NGX", "Incluido"],
              ].map(([label, value], idx) => (
                <div key={label} className={`grid grid-cols-12 gap-3 px-4 py-4 text-sm ${idx < 5 ? "value-row" : ""}`}>
                  <p className="col-span-7 text-slate-100">{label}</p>
                  <p className={`col-span-5 text-right ${value === "Incluido" ? "text-emerald-300" : "text-slate-300"}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="accent-line mb-5" />

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-sm text-slate-300">Valor total de referencia</p>
                <p className="font-space text-3xl font-semibold">$4,400+</p>
                <p className="text-sm text-slate-200 mt-2">
                  Inversion real: <span className="text-white font-semibold">$199-$499 / mes</span> segun nivel de soporte.
                </p>
              </div>
              <a
                href={APPLY_URL}
                className="btn-metallic rounded-full px-7 py-3 text-sm font-semibold tracking-wide"
                onClick={() => trackEvent("cta_apply_offer", { section: "oferta", href: APPLY_URL })}
                target={APPLY_URL.startsWith("http") ? "_blank" : undefined}
                rel={APPLY_URL.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                APLICAR A HYBRID
              </a>
            </div>
          </article>
        </section>

        <section id="garantia" className="section-anchor section-tone section-tone-offer max-w-5xl mx-auto px-4 sm:px-6 mb-10">
          <article className="reveal glass-panel card-offer rounded-2xl p-7 sm:p-8 border border-emerald-400/25">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-400/12 border border-emerald-300/25 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 mb-2">Garantia de progreso medible</p>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-3">30 dias. Riesgo invertido.</h2>
                <p className="text-slate-200 leading-relaxed">
                  Si cumples el protocolo minimo (80% de sesiones + check-ins semanales) y en 30 dias no hay progreso
                  medible en al menos 2 metricas (fuerza, medidas, energia o consistencia), extendemos 4 semanas HYBRID
                  sin costo.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="section-tone section-tone-offer max-w-5xl mx-auto px-4 sm:px-6 mb-24">
          <div className="reveal rounded-xl border border-[#6D00FF]/25 bg-[#6D00FF]/10 px-5 py-4 text-sm text-[#e2d8ff]">
            HYBRID es limitado por capacidad de coaches y control de calidad. Abrimos cupos por cohorte. Cuando se llenan,
            cerramos.
          </div>
        </section>

        <section id="agente" className="section-anchor section-tone section-tone-soft max-w-6xl mx-auto px-4 sm:px-6 mb-24">
          <div className="reveal grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch">
            <article className="glass-panel card-mechanism rounded-2xl p-7 sm:p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300 mb-2">Canal conversacional</p>
              <h2 className="text-3xl font-semibold mb-3">Habla con un agente IA de NGX</h2>
              <p className="text-slate-200 leading-relaxed mb-5">
                Si quieres resolver dudas antes de aplicar, aqui conectaremos un agente conversacional con ElevenLabs. Te
                explicara el proceso, si eres fit para HYBRID y cual es el siguiente paso.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-300 mb-1">Objetivo</p>
                  <p className="text-sm text-slate-200">Reducir friccion antes de aplicar</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-300 mb-1">Integracion</p>
                  <p className="text-sm text-slate-200">SDK + widget embed de ElevenLabs</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn-metallic rounded-full px-6 py-3 text-sm font-semibold"
                  onClick={() => {
                    setAgentModalOpen(true);
                    trackEvent("agent_open_click", { section: "agente" });
                  }}
                >
                  Abrir chat conversacional
                </button>
                <a
                  href={SCHEDULE_URL}
                  className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold"
                  onClick={() => trackEvent("agent_schedule_click", { section: "agente", href: SCHEDULE_URL })}
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
                    Preparado
                  </span>
                </div>
                <div
                  id="elevenlabs-convai-container"
                  className="rounded-lg border border-dashed border-white/20 min-h-[220px] flex items-center justify-center text-center px-4"
                >
                  <div>
                    <p className="text-sm text-slate-300 mb-2">Espacio para embed real de ElevenLabs</p>
                    <p className="text-xs text-slate-500">Insertaremos aqui el componente oficial del agente conversacional.</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="preguntas" className="section-anchor section-tone section-tone-soft max-w-4xl mx-auto px-4 sm:px-6 mb-24">
          <div className="reveal text-center mb-8">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-300 mb-2">Objeciones</p>
            <h2 className="text-3xl sm:text-4xl font-semibold">Preguntas frecuentes</h2>
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
            <h2 className="text-3xl sm:text-5xl font-semibold mb-3">No necesitas mas motivacion.</h2>
            <p className="text-xl text-slate-200 mb-3">Necesitas un sistema que te haga avanzar con tu vida real.</p>
            <p className="text-slate-300 max-w-3xl mx-auto mb-8">
              Si quieres construir salud muscular de forma medible en las proximas 12 semanas, aplica y lo armamos contigo.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={APPLY_URL}
                className="btn-metallic rounded-full px-8 py-4 text-sm sm:text-base font-semibold"
                onClick={() => trackEvent("cta_apply_final", { section: "cta_final", href: APPLY_URL })}
                target={APPLY_URL.startsWith("http") ? "_blank" : undefined}
                rel={APPLY_URL.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                APLICAR A HYBRID
              </a>
              <a
                href={TEAM_CONTACT_URL}
                className="btn-ghost rounded-full px-8 py-4 text-sm sm:text-base font-semibold"
                onClick={() => trackEvent("cta_team_contact", { section: "cta_final", href: TEAM_CONTACT_URL })}
                target={TEAM_CONTACT_URL.startsWith("http") ? "_blank" : undefined}
                rel={TEAM_CONTACT_URL.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                Tengo una pregunta - Hablar con el equipo
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
              links: ["HYBRID", "ASCEND", "GENESIS BRAIN"],
            },
            {
              title: "Compania",
              links: ["Sobre NGX", "Historia de Aldo", "Contacto"],
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
        Hablar con IA
      </button>

      {agentModalOpen && (
        <div
          className="fixed inset-0 z-[60] agent-modal-open items-center justify-center p-4 bg-black/70"
          role="dialog"
          aria-modal="true"
        >
          <div className="glass-panel rounded-2xl w-full max-w-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-space text-xl font-semibold">Agente conversacional NGX</h3>
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
              Aqui conectaremos el widget real de ElevenLabs para conversar sobre HYBRID en tiempo real.
            </p>
            <div className="rounded-xl border border-dashed border-white/20 min-h-[260px] p-4 flex items-center justify-center text-center text-slate-400">
              Placeholder de chat/embed para integracion SDK de ElevenLabs.
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={APPLY_URL}
                className="btn-metallic rounded-full px-5 py-2.5 text-sm font-semibold"
                onClick={() => trackEvent("agent_apply_modal", { section: "agent_modal", href: APPLY_URL })}
              >
                Aplicar ahora
              </a>
              <a
                href={SCHEDULE_URL}
                className="btn-ghost rounded-full px-5 py-2.5 text-sm font-semibold"
                onClick={() => trackEvent("agent_schedule_modal", { section: "agent_modal", href: SCHEDULE_URL })}
              >
                Agendar llamada
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
