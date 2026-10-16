import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Award, BookOpen, Briefcase, Code2, GraduationCap, Laptop, Heart, Coffee, CheckCircle2, Sparkles, Terminal } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { JOURNEY_STEPS, PASSIONS, SOCIAL_LINKS } from "../../utils/data.js";
import PROFILE_PIC from "../../assets/images/profile.jpg";
import SublevelSectionHeader from "./SublevelSectionHeader.jsx";

const PASSION_ICONS = [Heart, Coffee, BookOpen];

export default function AboutSection() {
  const { isDarkMode } = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const bioLines = [
    "Associate Product & AI Engineer at Career141 — building production systems across modern web, cloud infrastructure, and autonomous agentic AI.",
    "Promoted from Web Developer Intern by delivering an AI recruitment pipeline processing 115,000+ candidates, a custom transactional email CRM cutting overhead by 78%, and 50-page Next.js 15 rebuilds.",
    "Based in Colombo, Sri Lanka. Part of the FTTLP Leadership Track. Focused on shipping software that actually moves business needles.",
  ];

  const quickStats = [
    { label: "AI PIPELINES", val: "115K Profiles", sub: "Recruitment Automation" },
    { label: "COST REDUCTION", val: "78% Saved", sub: "Cloud CRM Architecture" },
    { label: "PAGES REBUILT", val: "50+ Shipped", sub: "Next.js 15 App Router" },
    { label: "ACTIVE LEADERSHIP", val: "FTTLP Track", sub: "Engineering Excellence" },
  ];

  return (
    <section
      id="about"
      style={{
        position: "relative",
        background: "#0a0a0a",
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
          tag="IDENTITY // ENGINEER PROFILE"
          title="Studio Profile"
          subtitle="Associate Product & AI Engineer based in Colombo — engineering production web platforms, autonomous LLM pipelines, and resilient cloud architectures."
          topRule={true}
        />

        {/* Main Grid — 12 column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: 24,
          }}
          className="about-grid"
        >
          {/* Left Column (5 cols): Identity, Quick Stats, Channels */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 0.84, 0.24, 1] }}
            style={{
              gridColumn: "span 5 / span 5",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
            className="about-left-col"
          >
            {/* Identity Card */}
            <div
              style={{
                position: "relative",
                border: "1px solid rgba(255,255,255,0.085)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.016), rgba(255,255,255,0.003))",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 20,
              }}
              className="sublevel-frame"
            >
              <i className="sublevel-corner tl" />
              <i className="sublevel-corner tr" />
              <i className="sublevel-corner bl" />
              <i className="sublevel-corner br" />

              {/* Portrait */}
              <div
                style={{
                  position: "relative",
                  width: 120,
                  height: 120,
                  border: "1px solid rgba(255,255,255,0.15)",
                  overflow: "hidden",
                  borderRadius: 2,
                }}
              >
                <img
                  src={PROFILE_PIC}
                  alt="Sivasuthakaran Sanjeev"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(0.15) contrast(1.1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.6))",
                  }}
                />
              </div>

              <div>
                <span
                  style={{
                    fontFamily: "ui-monospace, 'Geist Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    color: "#3b82f6",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  SIVASUTHAKARAN SANJEEV
                </span>
                <h3
                  style={{
                    fontFamily: "'Urbanist', 'Geist', system-ui, sans-serif",
                    fontSize: "1.45rem",
                    fontWeight: 500,
                    color: "#f3f4f6",
                    margin: "6px 0 4px",
                  }}
                >
                  Associate Product &amp; AI Engineer
                </h3>
                <p
                  style={{
                    fontFamily: "ui-monospace, 'Geist Mono', monospace",
                    fontSize: 12,
                    color: "#9ca3af",
                    margin: 0,
                  }}
                >
                  Career141 · Colombo, Sri Lanka
                </p>
              </div>

              {/* Status Row */}
              <div
                style={{
                  width: "100%",
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "ui-monospace, 'Geist Mono', monospace",
                  fontSize: 11,
                }}
              >
                <span style={{ color: "#6b7280" }}>SYSTEM STATUS</span>
                <span
                  style={{
                    color: "#34d399",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#34d399",
                      boxShadow: "0 0 6px rgba(52,211,153,0.8)",
                    }}
                  />
                  FTTLP ACTIVE // 2026
                </span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
              }}
            >
              {quickStats.map((st) => (
                <div
                  key={st.label}
                  style={{
                    position: "relative",
                    border: "1px solid rgba(255,255,255,0.085)",
                    background: "rgba(255,255,255,0.012)",
                    padding: "16px 18px",
                  }}
                  className="sublevel-frame"
                >
                  <i className="sublevel-corner tl" />
                  <i className="sublevel-corner tr" />
                  <i className="sublevel-corner bl" />
                  <i className="sublevel-corner br" />
                  <p
                    style={{
                      fontFamily: "ui-monospace, 'Geist Mono', monospace",
                      fontSize: 10,
                      color: "#6b7280",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      margin: "0 0 6px",
                    }}
                  >
                    {st.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Urbanist', system-ui, sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "#f3f4f6",
                      margin: "0 0 2px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {st.val}
                  </p>
                  <p
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: 11,
                      color: "#9ca3af",
                      margin: 0,
                    }}
                  >
                    {st.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Channels & Social */}
            <div
              style={{
                position: "relative",
                border: "1px solid rgba(255,255,255,0.085)",
                background: "rgba(255,255,255,0.012)",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
              className="sublevel-frame"
            >
              <i className="sublevel-corner tl" />
              <i className="sublevel-corner tr" />
              <i className="sublevel-corner bl" />
              <i className="sublevel-corner br" />
              <span
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: "#3b82f6",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                NETWORK // CONNECT
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                {SOCIAL_LINKS.slice(0, 4).map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      style={{
                        width: 34,
                        height: 34,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#9ca3af",
                        borderRadius: 2,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                        e.currentTarget.style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        e.currentTarget.style.color = "#9ca3af";
                      }}
                    >
                      <Icon size={14} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 cols): Mission Statement + Timeline Journey */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 0.84, 0.24, 1] }}
            style={{
              gridColumn: "span 7 / span 7",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
            className="about-right-col"
          >
            {/* Mission Statement Box */}
            <div
              style={{
                position: "relative",
                border: "1px solid rgba(255,255,255,0.085)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.016), rgba(255,255,255,0.003))",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
              className="sublevel-frame"
            >
              <i className="sublevel-corner tl" />
              <i className="sublevel-corner tr" />
              <i className="sublevel-corner bl" />
              <i className="sublevel-corner br" />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    color: "#3b82f6",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  MISSION STATEMENT // ENGINEERING PHILOSOPHY
                </span>
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 11,
                    color: "#6b7280",
                  }}
                >
                  PRODUCTION FIRST
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {bioLines.map((line, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "system-ui, sans-serif",
                      fontSize: "0.98rem",
                      lineHeight: "1.65rem",
                      color: "#d1d5db",
                      borderLeft: "2px solid rgba(59, 130, 246, 0.4)",
                      paddingLeft: 16,
                      margin: 0,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>

              <div
                style={{
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  color: "#9ca3af",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <MapPin size={12} style={{ color: "#3b82f6" }} />
                  Colombo, Sri Lanka
                </span>
                <a
                  href="https://career141.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#34d399",
                    textDecoration: "none",
                  }}
                >
                  <ExternalLink size={12} />
                  career141.com
                </a>
              </div>
            </div>

            {/* Developer Journey Timeline */}
            <div
              style={{
                position: "relative",
                border: "1px solid rgba(255,255,255,0.085)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.016), rgba(255,255,255,0.003))",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
              className="sublevel-frame"
            >
              <i className="sublevel-corner tl" />
              <i className="sublevel-corner tr" />
              <i className="sublevel-corner bl" />
              <i className="sublevel-corner br" />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    color: "#3b82f6",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  CAREER &amp; ACADEMIC TIMELINE // MILESTONES
                </span>
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 11,
                    color: "#6b7280",
                  }}
                >
                  {JOURNEY_STEPS.length} MILESTONES
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {JOURNEY_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === activeStep;
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => setActiveStep(index)}
                      onClick={() => setActiveStep(index)}
                      style={{
                        padding: "16px 20px",
                        border: isActive
                          ? "1px solid rgba(255,255,255,0.18)"
                          : "1px solid rgba(255,255,255,0.04)",
                        background: isActive
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(255,255,255,0.008)",
                        borderRadius: 2,
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 16,
                          marginBottom: 4,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 2,
                              background: isActive ? "#2563eb" : "rgba(255,255,255,0.06)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#ffffff",
                              transition: "background 0.25s ease",
                            }}
                          >
                            <Icon size={14} />
                          </div>
                          <div>
                            <h4
                              style={{
                                fontFamily: "'Urbanist', system-ui, sans-serif",
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                color: "#f3f4f6",
                                margin: 0,
                              }}
                            >
                              {step.title}
                            </h4>
                            <p
                              style={{
                                fontFamily: "ui-monospace, monospace",
                                fontSize: 11,
                                color: "#9ca3af",
                                margin: 0,
                              }}
                            >
                              {step.company}
                            </p>
                          </div>
                        </div>

                        <span
                          style={{
                            fontFamily: "ui-monospace, monospace",
                            fontSize: 11,
                            color: "#60a5fa",
                            background: "rgba(59, 130, 246, 0.1)",
                            border: "1px solid rgba(59, 130, 246, 0.25)",
                            padding: "3px 8px",
                            borderRadius: 2,
                            fontWeight: 600,
                          }}
                        >
                          {step.year}
                        </span>
                      </div>

                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          style={{
                            fontFamily: "system-ui, sans-serif",
                            fontSize: "0.9rem",
                            lineHeight: "1.5rem",
                            color: "#c4c4c4",
                            marginTop: 10,
                            marginBottom: 0,
                            paddingTop: 10,
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .about-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .about-left-col, .about-right-col {
            grid-column: 1 / -1 !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}