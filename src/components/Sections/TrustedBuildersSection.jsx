import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext.jsx";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiOpenai,
  SiAnthropic,
  SiAmazonwebservices,
  SiCloudflare,
  SiNodedotjs,
  SiFastapi,
  SiPostgresql,
  SiSupabase,
  SiTailwindcss,
  SiFramer,
  SiRedis,
  SiPrisma,
  SiWhatsapp,
  SiDocker,
} from "react-icons/si";
import "./trusted-builders.css";
import SublevelSectionHeader from "./SublevelSectionHeader.jsx";

// Convex DB official custom geometric mark
function ConvexIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      width="1em"
      height="1em"
    >
      <path d="M12 2.5L3.5 7.4v9.2L12 21.5l8.5-4.9V7.4L12 2.5zm0 2.3l6.5 3.7-6.5 3.8-6.5-3.8 6.5-3.7zM5.5 9.2l5.5 3.2v6.4l-5.5-3.2V9.2zm13 6.4l-5.5 3.2v-6.4l5.5-3.2v6.4z" />
    </svg>
  );
}

// 18 Core Technologies from CV (3 rows of 6) with individual brand colors
const TECHNOLOGIES = [
  {
    name: "Next.js 15",
    category: "Full-Stack Web",
    Icon: SiNextdotjs,
    brandColor: "#ffffff",
    highlight: "App Router & SSR",
  },
  {
    name: "React / Native",
    category: "Frontend & Mobile",
    Icon: SiReact,
    brandColor: "#61DAFB",
    highlight: "Component Systems",
  },
  {
    name: "TypeScript",
    category: "Language",
    Icon: SiTypescript,
    brandColor: "#3178C6",
    highlight: "Strict Architecture",
  },
  {
    name: "OpenAI GPT-4o",
    category: "Agentic AI",
    Icon: SiOpenai,
    brandColor: "#10A37F",
    highlight: "Autonomous Pipelines",
  },
  {
    name: "Claude API",
    category: "LLM Workflows",
    Icon: SiAnthropic,
    brandColor: "#D97706",
    highlight: "Anthropic Agents",
  },
  {
    name: "Convex DB",
    category: "Realtime Sync",
    Icon: ConvexIcon,
    brandColor: "#EE342F",
    highlight: "Hot-Storage Backend",
  },
  {
    name: "AWS Cloud",
    category: "Cloud & Infra",
    Icon: SiAmazonwebservices,
    brandColor: "#FF9900",
    highlight: "SES · SNS · Gateway",
  },
  {
    name: "Cloudflare",
    category: "Edge & Storage",
    Icon: SiCloudflare,
    brandColor: "#F38020",
    highlight: "Workers · R2 · Pages",
  },
  {
    name: "Node / Express",
    category: "Backend Engine",
    Icon: SiNodedotjs,
    brandColor: "#68A063",
    highlight: "High-Throughput APIs",
  },
  {
    name: "FastAPI / Python",
    category: "AI Microservices",
    Icon: SiFastapi,
    brandColor: "#009688",
    highlight: "Voice & Data Tools",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    Icon: SiPostgresql,
    brandColor: "#336791",
    highlight: "Schema & Vectors",
  },
  {
    name: "Supabase",
    category: "Backend Platform",
    Icon: SiSupabase,
    brandColor: "#3ECF8E",
    highlight: "Auth · DB · Storage",
  },
  {
    name: "Tailwind CSS",
    category: "Design System",
    Icon: SiTailwindcss,
    brandColor: "#38BDF8",
    highlight: "Responsive UI",
  },
  {
    name: "Framer Motion",
    category: "Motion & 3D",
    Icon: SiFramer,
    brandColor: "#EA4C89",
    highlight: "Interactive Shaders",
  },
  {
    name: "Redis & BullMQ",
    category: "Queue Pipeline",
    Icon: SiRedis,
    brandColor: "#DC2626",
    highlight: "115K Profile Queue",
  },
  {
    name: "Prisma ORM",
    category: "Data Layer",
    Icon: SiPrisma,
    brandColor: "#5A67D8",
    highlight: "Type-Safe Queries",
  },
  {
    name: "WhatsApp Cloud",
    category: "Messaging API",
    Icon: SiWhatsapp,
    brandColor: "#25D366",
    highlight: "Automated Sequences",
  },
  {
    name: "Docker / Linux",
    category: "DevOps & CLI",
    Icon: SiDocker,
    brandColor: "#2496ED",
    highlight: "Container Workflows",
  },
];

export default function TrustedBuildersSection() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="stack"
      className={`sublevel-builders-section ${!isDarkMode ? "light-mode" : ""}`}
    >
      {/* Background vertical guideline grid lines matching Sublevel Studio aesthetic */}
      <div className="sublevel-vrules" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="sublevel-grid-layout sublevel-logos">
        <div style={{ gridColumn: "1 / -1" }}>
          <SublevelSectionHeader
            tag="ENGINEERING STACK // PRODUCTION"
            title="Core Technologies"
            subtitle="Eighteen production-tested frameworks, cloud providers, and AI toolchains shipped across enterprise scale."
            topRule={true}
          />
        </div>

        {/* Exactly 3 rows of 6 cards in a modular grid with individual brand color hover */}
        <div className="sublevel-grid">
          {TECHNOLOGIES.map((tech, index) => {
            const Icon = tech.Icon;
            return (
              <motion.a
                key={tech.name}
                href="#stack"
                aria-label={tech.name}
                title={`${tech.name} — ${tech.highlight}`}
                style={{
                  "--brand-color": tech.brandColor,
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.025,
                  ease: "easeOut",
                }}
                onClick={(e) => e.preventDefault()}
              >
                <div className="sublevel-cell sublevel-with-dots">
                  <div className="sublevel-lines sublevel-with-diagonal-lines" />
                  <div className="sublevel-tech-icon">
                    <Icon />
                  </div>
                  <span className="sublevel-tech-name">{tech.name}</span>
                  <span className="sublevel-tech-category">{tech.category}</span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
