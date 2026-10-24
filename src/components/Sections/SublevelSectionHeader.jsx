import React, { useRef } from "react";
import { useInView } from "framer-motion";

export function AnimatedRule({ className = "", thin = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.05 });
  return (
    <hr
      ref={ref}
      className={className}
      style={{
        border: 0,
        height: 1,
        width: "100%",
        background: thin ? "var(--sublevel-line)" : "var(--sublevel-line-bright)",
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
  const headInView = useInView(headRef, { once: false, amount: 0.05 });

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
          className="sublevel-frame"
          style={{
            position: "relative",
            border: "1px solid var(--sublevel-line)",
            padding: "24px 32px 28px",
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
                color: "var(--sublevel-accent)",
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
              color: "var(--sublevel-w1)",
              margin: 0,
            }}
          >
            {title}
          </h2>
        </div>

        {/* Framed subtitle */}
        {subtitle && (
          <div
            className="sublevel-frame"
            style={{
              position: "relative",
              border: "1px solid var(--sublevel-line)",
              padding: "20px 24px",
              maxWidth: subtitleMaxWidth,
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
                color: "var(--sublevel-w2)",
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
