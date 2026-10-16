import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../../context/ThemeContext.jsx";
import { PROJECTS } from "../../utils/data.js";
import PROJECT_IMG_1 from "../../assets/images/project-1.png";
import PROJECT_IMG_2 from "../../assets/images/project-2.png";
import PROJECT_IMG_3 from "../../assets/images/project-3.png";
import PROJECT_IMG_4 from "../../assets/images/project-4.jpg";
import PROJECT_IMG_5 from "../../assets/images/project-5.jpg";
import PROJECT_IMG_6 from "../../assets/images/project-6.png";

/* Arrow icon exactly from Sublevel source */
const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" width="18" height="18" style={{ fill: "currentColor", opacity: 0.5 }}>
    <path d="m11.1075 14.2752 4.2763-4.29004-4.2625-4.2625h1.9112l4.2625 4.27625-4.2763 4.27629h-1.9112ZM2.5 10.8102V9.17391h13.8188v1.63629H2.5Z" />
  </svg>
);

/* AnimatedRule — scaleX from left on scroll enter, exactly like Sublevel's .rule data-line */
function AnimatedRule({ className = "", thin = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <hr
      ref={ref}
      className={className}
      style={{
        border: 0,
        height: 1,
        width: "100%",
        background: thin ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.085)",
        transformOrigin: "left",
        transform: inView ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 1.1s cubic-bezier(.16,.84,.24,1)",
      }}
    />
  );
}

/* ScrollReveal — fades + slides up on scroll enter, mimicking Sublevel's data-ps particle-scroll */
function ScrollReveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(.16,.84,.24,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* Exact project data mapped from CV / data.js */
const FEATURED = [
  {
    id: 1,
    cats: "Mobile · Android · Firebase",
    title: "Zero Hunger App",
    desc: "Mobile application connecting food donors with those in need — real-time map, donation system, and SDG Goal 2 support shipped on Android.",
    image: PROJECT_IMG_1,
    liveURL: "#",
    githubURL: "https://github.com/sanjeev200009/ZeroHunger.git",
  },
  {
    id: 2,
    cats: "AI · Machine Learning · Data",
    title: "Academic Risk Predictor",
    desc: "Python and Streamlit system predicting students at academic risk. Probability visualisation, intervention recommendations, and feature importance — live on Streamlit.",
    image: PROJECT_IMG_2,
    liveURL: "https://aaxadzf7t2vqyfbtbhvkdu.streamlit.app/",
    githubURL: "https://github.com/sanjeev200009/sanjeev200009-Mini-Project-Academic_Risk_Prediction-.git",
  },
  {
    id: 3,
    cats: "Full-Stack · Eco-Tourism · React",
    title: "NatureGo.lk",
    desc: "End-to-end eco-tourism platform for Sri Lanka. Sustainable booking, destination discovery, and OAuth auth — shipped with GitHub Actions CI/CD.",
    image: PROJECT_IMG_3,
    liveURL: "https://sanjeev200009.github.io/NatureGo.lk",
    githubURL: "https://github.com/sanjeev200009/NatureGo.lk",
  },
  {
    id: 4,
    cats: "Frontend · React · TypeScript",
    title: "React Front-End Projects",
    desc: "A collection of 30+ React mini projects — E-Commerce App, Smart Review Filter, state management, hooks, and API integrations in a 30-day challenge.",
    image: PROJECT_IMG_4,
    liveURL: "#",
    githubURL: "https://github.com/sanjeev200009/30_DAYS_CHALLANG_REACT.git",
  },
  {
    id: 5,
    cats: "Mobile · Commerce · Hackathon",
    title: "QuickCart — React Native",
    desc: "Hackathon-built mobile e-commerce app. Seamless shopping, secure transactions, and a Node.js + MongoDB backend API — full-stack in 48 hours.",
    image: PROJECT_IMG_5,
    liveURL: "#",
    githubURL: "https://github.com/sanjeev200009/ReactNative-Hackathon-QuickCard-App.git",
  },
  {
    id: 6,
    cats: "Dashboard · Travel · OAuth",
    title: "Travel Safety Dashboard",
    desc: "Real-time travel advisory dashboard — government travel warnings, live weather, OAuth auth, and MongoDB history. A smart search tool that keeps travellers informed.",
    image: PROJECT_IMG_6,
    liveURL: "#",
    githubURL: "https://github.com/prabasajee/Travel-Safety-Weather-Dashboard",
  },
];

export default function ProjectSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.3 });

  /* Split into 3 masonry columns */
  const col1 = FEATURED.filter((_, i) => i % 3 === 0);
  const col2 = FEATURED.filter((_, i) => i % 3 === 1);
  const col3 = FEATURED.filter((_, i) => i % 3 === 2);

  return (
    <section
      id="work"
      style={{
        position: "relative",
        background: "#000",
        overflow: "hidden",
        padding: "120px 0 140px",
      }}
    >
      {/* Vertical guide rules — exact Sublevel vrules pattern */}
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
        {/* Top hairline rule — scaleX animated */}
        <AnimatedRule style={{ marginBottom: 36 }} />

        {/* Section Head — exactly: framed big title + framed subtitle side-by-side */}
        <div
          ref={headRef}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginBottom: 48,
            marginTop: 36,
          }}
        >
          {/* Big title — f-h1 scale, framed */}
          <div
            style={{
              position: "relative",
              border: "1px solid rgba(255,255,255,0.085)",
              padding: "28px 32px",
              background: "linear-gradient(180deg,rgba(255,255,255,.014),rgba(255,255,255,0))",
              opacity: headInView ? 1 : 0,
              transform: headInView ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(.16,.84,.24,1)",
            }}
          >
            <i className="sublevel-corner tl" />
            <i className="sublevel-corner tr" />
            <i className="sublevel-corner bl" />
            <i className="sublevel-corner br" />
            <h2
              style={{
                fontFamily: "'Urbanist', 'Geist', system-ui, sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 4.75rem)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
                fontWeight: 400,
                color: "#e6e6e6",
                margin: 0,
              }}
            >
              Featured Projects
            </h2>
          </div>

          {/* Subtitle — framed */}
          <div
            style={{
              position: "relative",
              border: "1px solid rgba(255,255,255,0.085)",
              padding: "20px 24px",
              maxWidth: "34rem",
              background: "linear-gradient(180deg,rgba(255,255,255,.014),rgba(255,255,255,0))",
              opacity: headInView ? 1 : 0,
              transform: headInView ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.7s ease 0.12s, transform 0.7s cubic-bezier(.16,.84,.24,1) 0.12s",
            }}
          >
            <i className="sublevel-corner tl" />
            <i className="sublevel-corner tr" />
            <i className="sublevel-corner bl" />
            <i className="sublevel-corner br" />
            <p
              style={{
                fontFamily: "'Urbanist', system-ui, sans-serif",
                fontSize: "1.15rem",
                lineHeight: "1.5rem",
                letterSpacing: "-0.02em",
                fontWeight: 600,
                color: "#c4c4c4",
                margin: 0,
              }}
            >
              Six selected builds from the last eighteen months — AI pipelines, product launches and a few experiments that got out of hand.
            </p>
          </div>
        </div>

        {/* ─── MASONRY GRID — 3 columns, exactly like Sublevel ─── */}
        <div
          style={{
            columns: 3,
            columnGap: 12,
          }}
          className="project-masonry"
        >
          {FEATURED.map((proj, index) => (
            <ProjectCard key={proj.id} proj={proj} delay={index * 0.07} />
          ))}
        </div>

        <div style={{ height: 80 }} />
      </div>

      {/* Responsive masonry CSS */}
      <style>{`
        @media (max-width: 1023px) {
          .project-masonry { columns: 2 !important; }
        }
        @media (max-width: 639px) {
          .project-masonry { columns: 1 !important; }
        }
        .proj-shot img {
          transition: opacity 0.3s ease;
        }
        .proj-shot:hover img {
          opacity: 0.82;
        }
        .proj-go {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #e6e6e6;
          font-family: ui-monospace, 'Geist Mono', monospace;
          font-size: 0.8125rem;
          font-weight: 600;
          line-height: 1rem;
          text-decoration: none;
          transition: opacity 0.18s ease;
          position: relative;
        }
        .proj-go::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -2px;
          height: 1px;
          background: currentColor;
          opacity: 0;
          transition: opacity 0.15s ease;
        }
        .proj-go:hover::before { opacity: 1; }
        .proj-go:hover { opacity: 0.85; }
      `}</style>
    </section>
  );
}

function ProjectCard({ proj, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <article
      ref={ref}
      style={{
        breakInside: "avoid",
        display: "block",
        margin: "0 0 12px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(.16,.84,.24,1) ${delay}s`,
      }}
    >
      {/* Shot — image frame, no bottom border (meta attaches flush) */}
      <div
        className="proj-shot"
        style={{
          display: "block",
          position: "relative",
          background: "#0a0a0a",
          border: "1px solid rgba(255,255,255,0.085)",
          borderBottom: 0,
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={() => proj.liveURL && proj.liveURL !== "#" && window.open(proj.liveURL, "_blank")}
      >
        <img
          src={proj.image}
          alt={proj.title}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            filter: "grayscale(0.2) contrast(1.05)",
          }}
        />
        {/* Gradient vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35))",
            opacity: 0.9,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Meta — framed, flush top (border-top: 0) */}
      <div
        style={{
          position: "relative",
          border: "1px solid rgba(255,255,255,0.085)",
          borderTop: 0,
          padding: "20px 22px 22px",
          background: "linear-gradient(180deg,rgba(255,255,255,.014),rgba(255,255,255,0))",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <i className="sublevel-corner tl" />
        <i className="sublevel-corner tr" />
        <i className="sublevel-corner bl" />
        <i className="sublevel-corner br" />

        {/* Category tags — monospace, exactly .cats */}
        <p
          style={{
            color: "#757575",
            fontFamily: "ui-monospace, 'Geist Mono', monospace",
            fontSize: 11,
            lineHeight: "16px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {proj.cats}
        </p>

        {/* Title — f-h3 scale */}
        <h3
          style={{
            fontFamily: "'Urbanist', 'Geist', system-ui, sans-serif",
            fontSize: "1.5rem",
            lineHeight: "1.5rem",
            letterSpacing: "-0.02em",
            fontWeight: 500,
            color: "#e6e6e6",
            margin: 0,
            textWrap: "pretty",
          }}
        >
          {proj.title}
        </h3>

        {/* Description — .desc */}
        <p
          style={{
            color: "#c4c4c4",
            fontSize: "0.875rem",
            lineHeight: "1.375rem",
            fontWeight: 500,
            margin: 0,
            textWrap: "pretty",
          }}
        >
          {proj.desc}
        </p>

        {/* View project link — exact .go design */}
        <a
          href={proj.githubURL || "#"}
          target="_blank"
          rel="noreferrer"
          className="proj-go"
        >
          <span>View project</span>
          <ArrowIcon />
        </a>
      </div>
    </article>
  );
}
