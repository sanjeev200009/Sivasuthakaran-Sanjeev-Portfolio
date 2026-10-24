import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Braces } from "lucide-react";
import SublevelSectionHeader from "./SublevelSectionHeader.jsx";
import "./skill-section.css";

// Each `spec` is rendered as live-typed JSON. *phrase* inside a string renders highlighted.
const CAPABILITY_PILLARS = [
  {
    file: "architecture.json",
    code: "01 // ARCHITECTURE",
    title: "Full-Stack Web & Mobile Architecture",
    status: "PRODUCTION ACTIVE",
    spec: {
      summary:
        "Accessible web apps and cross-platform mobile systems with *strict TypeScript*, Next.js server components, fluid motion and *production SEO*.",
      stack: ["Next.js 15", "React.js", "React Native", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      pagesRebuilt: 50,
      ttfb: "< 1s",
      production: true,
    },
  },
  {
    file: "agentic-ai.json",
    code: "02 // AGENTIC AI",
    title: "Autonomous AI & LLM Pipelines",
    status: "AGENT RUNTIME",
    spec: {
      summary:
        "*Multi-agent workflows* for unstructured data extraction, semantic vector matching, *Whisper speech-to-text* and conversational AI for executive search.",
      stack: ["OpenAI GPT-4o", "Claude API", "Whisper STT", "Vector Search", "Autonomous Agents", "Prompt Tuning"],
      agents: 8,
      profilesParsed: 115000,
      autonomous: true,
    },
  },
  {
    file: "cloud-edge.json",
    code: "03 // CLOUD & EDGE",
    title: "Cloud Infrastructure & Edge Systems",
    status: "CLOUD VERIFIED",
    spec: {
      summary:
        "*Cost-effective* AWS and Cloudflare services: serverless endpoints, high-volume email dispatch, cold archive migrations and *R2 media delivery*.",
      stack: ["AWS SES / SNS", "API Gateway", "Lambda", "Cloudflare Workers", "Cloudflare R2", "Tunnels", "Docker"],
      costReductionPct: 78,
      contactsScaled: 84000,
      serverless: true,
    },
  },
  {
    file: "data-queues.json",
    code: "04 // DATA & QUEUES",
    title: "Databases, Realtime & Task Queues",
    status: "HIGH THROUGHPUT",
    spec: {
      summary:
        "Resilient data layers: *hot/cold storage tiering*, BullMQ background queues, reactive Convex sync and *ACID-compliant PostgreSQL* schemas.",
      stack: ["Convex DB", "PostgreSQL", "Supabase", "BullMQ", "Upstash Redis", "Prisma ORM", "MariaDB"],
      storageTiers: 2,
      hotSyncDays: 30,
      acid: true,
    },
  },
];

const CHARS_PER_MS = 0.24;

const P = (v) => ({ t: "p", v });

function valueTokens(value) {
  if (Array.isArray(value)) {
    return [P("["), ...value.flatMap((v, i) => [...valueTokens(v), ...(i < value.length - 1 ? [P(", ")] : [])]), P("]")];
  }
  if (typeof value === "string") {
    const parts = value.split(/\*(.+?)\*/).map((v, i) => ({ t: i % 2 ? "h" : "s", v })).filter((tok) => tok.v);
    return [{ t: "s", v: '"' }, ...parts, { t: "s", v: '"' }];
  }
  return [{ t: typeof value === "number" ? "n" : "b", v: String(value) }];
}

// Flat object -> lines of typed tokens (p=punct, k=key, s=string, h=highlight, n=number, b=boolean)
function toLines(spec) {
  const entries = Object.entries(spec);
  return [
    { depth: 0, tokens: [P("{")] },
    ...entries.map(([key, value], i) => ({
      depth: 1,
      tokens: [P('"'), { t: "k", v: key }, P('": '), ...valueTokens(value), ...(i < entries.length - 1 ? [P(",")] : [])],
    })),
    { depth: 0, tokens: [P("}")] },
  ];
}

// Types when 30% visible; resets only once fully off-screen, so it re-types on every scroll pass without text vanishing in view.
function useTyping(ref, total, delay) {
  const reduceMotion = useReducedMotion();
  const visible = useInView(ref, { amount: 0.3 });
  const present = useInView(ref);
  const [typed, setTyped] = useState(0);
  const typedRef = useRef(0);
  typedRef.current = typed;

  useEffect(() => {
    if (!present) setTyped(0);
  }, [present]);

  useEffect(() => {
    if (!visible) return;
    if (reduceMotion) {
      setTyped(total);
      return;
    }
    const from = typedRef.current;
    let raf;
    let t0;
    const tick = (now) => {
      t0 ??= now + (from ? 0 : delay);
      const next = Math.min(total, from + Math.max(0, Math.floor((now - t0) * CHARS_PER_MS)));
      setTyped(next);
      if (next < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, total, delay, reduceMotion]);

  return typed;
}

function JsonCard({ pillar, index }) {
  const ref = useRef(null);
  const lines = toLines(pillar.spec);
  const total = lines.reduce((sum, line) => sum + line.tokens.reduce((s, tok) => s + tok.v.length, 0), 0);
  const typed = useTyping(ref, total, (index % 2) * 220);
  const done = typed >= total;

  // Walk the tokens once: typed part is coloured, the rest is laid out but hidden so the card never reflows.
  let budget = typed;
  let caretLine = lines.length - 1;
  let caretCol = 1;
  let caretPlaced = false;

  const rendered = lines.map((line, li) => {
    let col = 0;
    const tokens = line.tokens.map((tok, ti) => {
      const shown = Math.max(0, Math.min(budget, tok.v.length));
      budget -= tok.v.length;
      const caretHere = !caretPlaced && (shown < tok.v.length || (budget === 0 && ti === line.tokens.length - 1));
      if (caretHere) {
        caretPlaced = true;
        caretLine = li;
        caretCol = col + shown + 1;
      }
      col += tok.v.length;
      return (
        <React.Fragment key={ti}>
          {shown > 0 && <span className={`cj-${tok.t}`}>{tok.v.slice(0, shown)}</span>}
          {caretHere && <span className={`cj-caret${done ? " is-idle" : ""}`} />}
          {shown < tok.v.length && <span className="cj-ghost">{tok.v.slice(shown)}</span>}
        </React.Fragment>
      );
    });
    return (
      <div
        key={li}
        className={`cj-line${!done && caretPlaced && caretLine === li ? " is-active" : ""}`}
        style={{ "--depth": line.depth }}
      >
        <span className={`cj-ln${typed > 0 && li <= caretLine ? " is-on" : ""}`}>{li + 1}</span>
        <span className="cj-code">{tokens}</span>
      </div>
    );
  });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 0.84, 0.24, 1] }}
      className="sublevel-frame sublevel-frame-hover cap-card"
    >
      <i className="sublevel-corner tl" />
      <i className="sublevel-corner tr" />
      <i className="sublevel-corner bl" />
      <i className="sublevel-corner br" />

      <div className="cap-card__bar">
        <span className="cap-card__tab">
          <Braces size={13} />
          {pillar.file}
        </span>
        <span className="cap-card__status">
          <i />
          {pillar.status}
        </span>
      </div>

      <div className="cap-card__intro">
        <span className="cap-card__code">{pillar.code}</span>
        <h3 className="cap-card__title">{pillar.title}</h3>
      </div>

      <pre className="sr-only">{JSON.stringify(pillar.spec, null, 2).replace(/\*/g, "")}</pre>
      <div className="cap-card__editor" aria-hidden="true">
        {rendered}
      </div>

      <div className="cap-card__statusbar" aria-hidden="true">
        <span>JSON · UTF-8</span>
        {done ? (
          <span className="is-valid">✓ VALID · 0 ERRORS</span>
        ) : (
          <span>
            Ln {caretLine + 1}, Col {caretCol}
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function SkillSection() {
  return (
    <section
      id="skills"
      style={{
        position: "relative",
        background: "var(--sublevel-k)",
        overflow: "hidden",
        padding: "120px 0 140px",
      }}
    >
      {/* Background vertical guideline grid lines */}
      <div className="sublevel-bg-vrules" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "82.5rem",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        {/* Grand Sublevel Header */}
        <SublevelSectionHeader
          tag="DIAGNOSTICS // DOMAIN CAPABILITIES"
          title="Engineering Capabilities"
          subtitle="Four core disciplines: full-stack systems, multi-agent AI pipelines, resilient cloud architecture, and high-throughput data layers."
          topRule={true}
        />

        {/* API-style request line introducing the JSON cards */}
        <motion.div
          className="cap-request"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.16, 0.84, 0.24, 1] }}
        >
          <span className="cap-request__method">GET</span>
          <span className="cap-request__path">/api/sanjeev/capabilities</span>
          <span className="cap-request__ok">
            <i />
            200 OK
          </span>
          <span className="cap-request__meta">{CAPABILITY_PILLARS.length} records · application/json</span>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 540px), 1fr))",
            gap: 20,
          }}
        >
          {CAPABILITY_PILLARS.map((pillar, index) => (
            <JsonCard key={pillar.file} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
