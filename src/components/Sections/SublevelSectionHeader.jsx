import React, { useRef } from "react";
import { useInView } from "framer-motion";

export function AnimatedRule({ className = "", thin = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.05 });
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

export default function SublevelSectionHeader({
  tag = "",
  title,
  subtitle,
  subtitleMaxWidth = "34rem",
  topRule = true,
  className = "",
}) {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.05 });

  return (
    <div className={`w-full ${className}`}>
      {topRule && <AnimatedRule style={{ marginBottom: 36 }} />}

      <div
        ref={headRef}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 48,
          marginTop: topRule ? 36 : 0,
        }}
      >
        {/* Big framed title — f-h1 display scale */}
        <div
          style={{
            position: "relative",
            border: "1px solid rgba(255,255,255,0.085)",
            padding: "24px 32px 28px",
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

          {tag && (
            <p
              style={{
                color: "#3b82f6",
                fontFamily: "ui-monospace, 'Geist Mono', monospace",
                fontSize: 11,
                lineHeight: "14px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                margin: "0 0 10px 0",
              }}
            >
              {tag}
            </p>
          )}

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
            {title}
          </h2>
        </div>

        {/* Framed subtitle */}
        {subtitle && (
          <div
            style={{
              position: "relative",
              border: "1px solid rgba(255,255,255,0.085)",
              padding: "20px 24px",
              maxWidth: subtitleMaxWidth,
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
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
