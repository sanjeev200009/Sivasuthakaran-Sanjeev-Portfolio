import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext.jsx";
import { Code2, Cpu, Cloud, Database, ArrowUpRight } from "lucide-react";
import SublevelSectionHeader from "./SublevelSectionHeader.jsx";

const CAPABILITY_PILLARS = [
  {
    icon: Code2,
    code: "01 // ARCHITECTURE",
    title: "Full-Stack Web & Mobile Architecture",
    description:
      "Engineering modern, accessible web applications and cross-platform mobile systems with strict TypeScript safety, Next.js server components, fluid animations, and production SEO.",
    tags: ["Next.js 15", "React.js", "React Native", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    metricLabel: "BENCHMARK",
    metrics: "50+ Pages Rebuilt · Sub-second TTFB",
    status: "PRODUCTION ACTIVE",
  },
  {
    icon: Cpu,
    code: "02 // AGENTIC AI",
    title: "Autonomous AI & LLM Pipelines",
    description:
      "Architecting multi-agent workflows for continuous unstructured data extraction, semantic vector matching, Whisper speech-to-text, and conversational AI tools for executive search.",
    tags: ["OpenAI GPT-4o", "Claude API", "Whisper STT", "Vector Search", "Autonomous Agents", "Prompt Tuning"],
    metricLabel: "THROUGHPUT",
    metrics: "8 Autonomous Agents · 115K Profiles Parsed",
    status: "AGENT RUNTIME",
  },
  {
    icon: Cloud,
    code: "03 // CLOUD & EDGE",
    title: "Cloud Infrastructure & Edge Systems",
    description:
      "Deploying highly cost-effective cloud services across AWS and Cloudflare: serverless endpoints, high-volume transactional email dispatchers, cold archive migrations, and R2 media delivery.",
    tags: ["AWS SES / SNS", "API Gateway", "Lambda", "Cloudflare Workers", "Cloudflare R2", "Tunnels", "Docker"],
    metricLabel: "EFFICIENCY",
    metrics: "78% Cost Reduction · 84K+ Contacts Scaled",
    status: "CLOUD VERIFIED",
  },
  {
    icon: Database,
    code: "04 // DATA & QUEUES",
    title: "Databases, Realtime & Task Queues",
    description:
      "Implementing resilient data layers: hot/cold storage tiering, high-throughput BullMQ background queues, reactive Convex DB sync, and ACID-compliant PostgreSQL schemas.",
    tags: ["Convex DB", "PostgreSQL", "Supabase", "BullMQ", "Upstash Redis", "Prisma ORM", "MariaDB"],
    metricLabel: "RESILIENCY",
    metrics: "Two-Tier Storage · 30-Day Hot Sync",
    status: "HIGH THROUGHPUT",
  },
];

export default function SkillSection() {
  const { isDarkMode } = useTheme();

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

        {/* 4 Pillars Grid — Grand Scale matching Featured Projects */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 540px), 1fr))",
            gap: 20,
          }}
        >
          {CAPABILITY_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.code}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 0.84, 0.24, 1] }}
                style={{
                  position: "relative",
                  border: "1px solid var(--sublevel-line)",
                  background: isDarkMode
                    ? "linear-gradient(180deg, rgba(255,255,255,0.016), rgba(255,255,255,0.003))"
                    : "rgba(255, 255, 255, 0.9)",
                  padding: "36px 36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 28,
                  minHeight: 380,
                  transition: "border-color 0.25s ease, background 0.25s ease",
                }}
                className="sublevel-frame sublevel-frame-hover"
              >
                <i className="sublevel-corner tl" />
                <i className="sublevel-corner tr" />
                <i className="sublevel-corner bl" />
                <i className="sublevel-corner br" />

                <div>
                  {/* Top bar: Code + Status Badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      marginBottom: 24,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid var(--sublevel-line)",
                          background: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(59, 130, 246, 0.08)",
                          color: "var(--sublevel-accent)",
                          borderRadius: 2,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        style={{
                          fontFamily: "ui-monospace, 'Geist Mono', monospace",
                          fontSize: 11,
                          letterSpacing: "0.12em",
                          color: "var(--sublevel-w3)",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        {pillar.code}
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: "ui-monospace, 'Geist Mono', monospace",
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        color: "#10b981",
                        background: "rgba(16, 185, 129, 0.08)",
                        border: "1px solid rgba(16, 185, 129, 0.2)",
                        padding: "3px 8px",
                        borderRadius: 2,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#10b981",
                          boxShadow: "0 0 6px rgba(16, 185, 129, 0.8)",
                        }}
                      />
                      {pillar.status}
                    </span>
                  </div>

                  {/* Title — Grand Urbanist font */}
                  <h3
                    style={{
                      fontFamily: "'Urbanist', 'Geist', system-ui, sans-serif",
                      fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.025em",
                      fontWeight: 500,
                      color: "var(--sublevel-w1)",
                      margin: "0 0 14px 0",
                    }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: "0.95rem",
                      lineHeight: "1.6rem",
                      color: "var(--sublevel-w2)",
                      margin: 0,
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tag Pills */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 20,
                    }}
                  >
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "ui-monospace, 'Geist Mono', monospace",
                          fontSize: 11,
                          padding: "4px 9px",
                          background: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)",
                          border: "1px solid var(--sublevel-line)",
                          color: "var(--sublevel-w3)",
                          borderRadius: 2,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Benchmark Rule & Metric */}
                  <div
                    style={{
                      paddingTop: 16,
                      borderTop: "1px solid var(--sublevel-line)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontFamily: "ui-monospace, 'Geist Mono', monospace",
                      fontSize: 11,
                    }}
                  >
                    <span style={{ color: "var(--sublevel-w4)", letterSpacing: "0.08em" }}>
                      {pillar.metricLabel}:
                    </span>
                    <span style={{ color: "var(--sublevel-accent)", fontWeight: 600 }}>
                      {pillar.metrics}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
