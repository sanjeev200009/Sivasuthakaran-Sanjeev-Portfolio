import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight, Download, Terminal, Sparkles, Send } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext.jsx";
import { downloadCVFetch, downloadCV } from "../../utils/cvDownload.js";
import SANJEEV_CUTOUT from "../../assets/images/sanjeev-cutout.png";
import SANJEEV_ILLUSTRATED from "../../assets/images/sanjeev-illustrated.png";

export default function HeroSection() {
  const { isDarkMode } = useTheme();
  const heroRef = useRef(null);

  // Portrait Hover Reveal Lens Tracking
  const [portraitHovered, setPortraitHovered] = useState(false);
  const [portraitMouse, setPortraitMouse] = useState({ x: 300, y: 260 });
  const [isAvatarPinned, setIsAvatarPinned] = useState(false);
  const portraitBoxRef = useRef(null);

  const handlePortraitMouseMove = (e) => {
    if (!portraitBoxRef.current) return;
    const rect = portraitBoxRef.current.getBoundingClientRect();
    setPortraitMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Mouse Parallax for 3D depth effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  // Portrait 3D subtle shifts
  const portraitX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const portraitY = useTransform(springY, [-0.5, 0.5], [-12, 12]);
  const portraitRotate = useTransform(springX, [-0.5, 0.5], [-2.5, 2.5]);

  // Text opposite shift for extreme 3D parallax depth
  const textShiftX = useTransform(springX, [-0.5, 0.5], [14, -14]);
  const textShiftY = useTransform(springY, [-0.5, 0.5], [10, -10]);

  // Rings glow shift
  const ringsX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const ringsY = useTransform(springY, [-0.5, 0.5], [-18, 18]);

  // Scroll Parallax & Discovery
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textScrollY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCVDownload = async () => {
    try {
      await downloadCVFetch();
    } catch {
      downloadCV();
    }
  };

  // ─── Fast Rotating Typewriter: 3 Titles Cycling (Name & Roles) ───
  const HERO_TITLES = [
    { line1: "SANJEEV", line2: "SIVASUTHAKARAN", cardRole: "Associate Product & AI Engineer" },
    { line1: "ASSOCIATE", line2: "PRODUCT ENGINEER", cardRole: "Associate Product Engineer" },
    { line1: "FREELANCE", line2: "DEVELOPER", cardRole: "Freelance Developer" },
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [typedFirst, setTypedFirst] = useState("");
  const [typedSecond, setTypedSecond] = useState("");
  // Phase: "TYPE_FIRST" | "TYPE_SECOND" | "HOLD" | "DELETE_SECOND" | "DELETE_FIRST" | "NEXT"
  const [phase, setPhase] = useState("TYPE_FIRST");

  useEffect(() => {
    let timeoutId;
    let isMounted = true;

    const currentTitle = HERO_TITLES[titleIndex];

    const tick = () => {
      if (!isMounted) return;

      if (phase === "TYPE_FIRST") {
        if (typedFirst.length < currentTitle.line1.length) {
          setTypedFirst(currentTitle.line1.slice(0, typedFirst.length + 1));
          timeoutId = setTimeout(tick, 35);
        } else {
          setPhase("TYPE_SECOND");
          timeoutId = setTimeout(tick, 70);
        }
      } else if (phase === "TYPE_SECOND") {
        if (typedSecond.length < currentTitle.line2.length) {
          setTypedSecond(currentTitle.line2.slice(0, typedSecond.length + 1));
          timeoutId = setTimeout(tick, 30);
        } else {
          // Hold for 1 second then change
          setPhase("HOLD");
          timeoutId = setTimeout(tick, 1100);
        }
      } else if (phase === "HOLD") {
        setPhase("DELETE_SECOND");
        timeoutId = setTimeout(tick, 20);
      } else if (phase === "DELETE_SECOND") {
        if (typedSecond.length > 0) {
          setTypedSecond(typedSecond.slice(0, -1));
          timeoutId = setTimeout(tick, 18);
        } else {
          setPhase("DELETE_FIRST");
          timeoutId = setTimeout(tick, 35);
        }
      } else if (phase === "DELETE_FIRST") {
        if (typedFirst.length > 0) {
          setTypedFirst(typedFirst.slice(0, -1));
          timeoutId = setTimeout(tick, 18);
        } else {
          setPhase("NEXT");
          timeoutId = setTimeout(tick, 100);
        }
      } else if (phase === "NEXT") {
        setTitleIndex((prev) => (prev + 1) % HERO_TITLES.length);
        setPhase("TYPE_FIRST");
        timeoutId = setTimeout(tick, 80);
      }
    };

    timeoutId = setTimeout(tick, 120);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [typedFirst, typedSecond, phase, titleIndex]);

  const replayTypewriter = () => {
    setTypedFirst("");
    setTypedSecond("");
    setTitleIndex((prev) => (prev + 1) % HERO_TITLES.length);
    setPhase("TYPE_FIRST");
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "radial-gradient(circle at 50% 40%, #0d0b1a 0%, #06050b 60%, #030305 100%)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "clamp(80px, 12vh, 110px)",
      }}
    >
      {/* Background Sublevel guide lines */}
      <div className="sublevel-bg-vrules" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>

      {/* ─── LAYER 1: Concentric Sonic Glow Rings (Behind Sanjeev) ─── */}
      <motion.div
        style={{
          x: ringsX,
          y: ringsY,
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 1100,
          height: 1100,
          pointerEvents: "none",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Core vibrant neon purple glow orb */}
        <div
          style={{
            position: "absolute",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, rgba(99, 102, 241, 0.28) 35%, rgba(67, 56, 202, 0.12) 60%, transparent 75%)",
            filter: "blur(40px)",
          }}
        />

        {/* Concentric expanding ripples */}
        {[300, 480, 680, 880, 1080].map((size, idx) => (
          <motion.div
            key={size}
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.35 - idx * 0.05, 0.5 - idx * 0.05, 0.35 - idx * 0.05],
            }}
            transition={{
              duration: 4.5 + idx * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.4,
            }}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `1px solid ${idx % 2 === 0 ? "rgba(139, 92, 246, 0.22)" : "rgba(255, 255, 255, 0.06)"}`,
              boxShadow: idx === 1 ? "0 0 30px rgba(124, 58, 237, 0.2)" : "none",
            }}
          />
        ))}
      </motion.div>

      {/* ─── LAYER 2: Giant Background Name Typography (Behind Cutout) ─── */}
      <motion.div
        style={{
          y: textScrollY,
          x: textShiftX,
          opacity: heroOpacity,
          position: "absolute",
          top: "clamp(85px, 13vh, 130px)",
          left: 0,
          right: 0,
          zIndex: 2,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          padding: "0 16px",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.95, ease: [0.16, 0.84, 0.24, 1] }}
          onClick={replayTypewriter}
          title="Click to replay typing animation"
          style={{
            fontFamily: "'Anton', 'Syne', system-ui, sans-serif",
            fontSize: "clamp(3.2rem, 9.6vw, 10.6rem)",
            lineHeight: 0.86,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: "#ffffff",
            margin: 0,
            textShadow: "0 10px 40px rgba(0,0,0,0.8)",
            userSelect: "none",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          <span
            style={{
              display: "block",
              minHeight: "0.86em",
              position: "relative",
            }}
          >
            <span>{typedFirst}</span>
            {(phase === "TYPE_FIRST" || phase === "DELETE_FIRST" || phase === "PAUSE") && (
              <span className="hero-typewriter-cursor">|</span>
            )}
          </span>
          <span
            style={{
              display: "block",
              minHeight: "0.86em",
              position: "relative",
            }}
          >
            <span
              style={{
                background: "linear-gradient(180deg, #ffffff 60%, rgba(255,255,255,0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {typedSecond}
            </span>
            {(phase === "TYPE_SECOND" || phase === "HOLD" || phase === "DELETE_SECOND") && (
              <span className="hero-typewriter-cursor">|</span>
            )}
          </span>
        </motion.h1>
      </motion.div>

      {/* ─── LAYER 3: 3D Foreground Cutout Portrait ─── */}
      <motion.div
        style={{
          y: portraitScrollY,
          scale: portraitScale,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 25,
          pointerEvents: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <motion.div
          ref={portraitBoxRef}
          onMouseMove={handlePortraitMouseMove}
          onMouseEnter={() => setPortraitHovered(true)}
          onMouseLeave={() => setPortraitHovered(false)}
          onClick={() => setIsAvatarPinned((prev) => !prev)}
          title="Hover to reveal neural avatar, or click to pin"
          style={{
            x: portraitX,
            y: portraitY,
            rotate: portraitRotate,
            position: "relative",
            width: "clamp(360px, 50vw, 730px)",
            maxHeight: "84vh",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "auto",
            cursor: isAvatarPinned ? "pointer" : "crosshair",
            userSelect: "none",
          }}
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 0.84, 0.24, 1], delay: 0.15 }}
        >
          {/* Subtle back ambient rim glow */}
          <div
            style={{
              position: "absolute",
              top: "18%",
              width: "75%",
              height: "75%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)",
              filter: "blur(55px)",
              zIndex: -1,
            }}
          />

          {/* Base Layer: Photographic Cutout */}
          <img
            src={SANJEEV_CUTOUT}
            alt="Sanjeev Sivasuthakaran"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "84vh",
              objectFit: "contain",
              objectPosition: "bottom center",
              filter: "contrast(1.06) brightness(1.02) drop-shadow(0 20px 45px rgba(0,0,0,0.85))",
              display: "block",
            }}
          />

          {/* Top Layer: Cyber Illustrated Vector Avatar revealed via Cursor Mask */}
          <img
            src={SANJEEV_ILLUSTRATED}
            alt="Sanjeev Sivasuthakaran Cyber Avatar"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              maxHeight: "84vh",
              objectFit: "contain",
              objectPosition: "bottom center",
              filter: "contrast(1.08) brightness(1.04) drop-shadow(0 20px 45px rgba(2, 210, 227, 0.35))",
              pointerEvents: "none",
              opacity: isAvatarPinned ? 1 : portraitHovered ? 1 : 0,
              transition: isAvatarPinned ? "opacity 0.3s ease" : "opacity 0.08s ease",
              WebkitMaskImage: isAvatarPinned
                ? "none"
                : portraitHovered
                  ? `radial-gradient(ellipse 180px 160px at ${portraitMouse.x}px ${portraitMouse.y}px, #000 0%, #000 45%, rgba(0,0,0,0.88) 55%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.3) 78%, rgba(0,0,0,0.08) 90%, transparent 100%)`
                  : "none",
              maskImage: isAvatarPinned
                ? "none"
                : portraitHovered
                  ? `radial-gradient(ellipse 180px 160px at ${portraitMouse.x}px ${portraitMouse.y}px, #000 0%, #000 45%, rgba(0,0,0,0.88) 55%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.3) 78%, rgba(0,0,0,0.08) 90%, transparent 100%)`
                  : "none",
              zIndex: 5,
            }}
          />

          {/* Water ripple cursor glow — soft ambient only, no hard outline */}
          {portraitHovered && !isAvatarPinned && (
            <div
              style={{
                position: "absolute",
                left: portraitMouse.x,
                top: portraitMouse.y,
                width: 360,
                height: 320,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at center, rgba(2,210,227,0.06) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 12,
              }}
            />
          )}



          {/* Smooth bottom fade so shoulders merge into bottom naturally */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 48,
              background: "linear-gradient(180deg, transparent 0%, #06050b 100%)",
              pointerEvents: "none",
              zIndex: 15,
            }}
          />

          {/* Floating Mode Toggle Pill */}
          <div
            style={{
              position: "absolute",
              bottom: 14,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 16,
              pointerEvents: "auto",
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsAvatarPinned((prev) => !prev);
              }}
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: isAvatarPinned ? "rgba(2, 210, 227, 0.22)" : "rgba(6, 5, 11, 0.78)",
                border: isAvatarPinned ? "1px solid #02d2e3" : "1px solid rgba(255, 255, 255, 0.16)",
                color: isAvatarPinned ? "#02d2e3" : "#d1d5db",
                borderRadius: 9999,
                padding: "5px 14px",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                boxShadow: isAvatarPinned
                  ? "0 0 18px rgba(2, 210, 227, 0.45)"
                  : "0 4px 14px rgba(0,0,0,0.6)",
                transition: "all 0.25s ease",
              }}
              title="Click to toggle between real photo and full vector avatar"
            >
              <Sparkles size={11} style={{ color: isAvatarPinned ? "#02d2e3" : "#a78bfa" }} />
              <span>{isAvatarPinned ? "PINNED: VECTOR AVATAR" : "HOVER: LENS REVEAL"}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* ─── LAYER 4: Foreground Interactive Information Grid ─── */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          width: "100%",
          maxWidth: "82.5rem",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          pointerEvents: "none",
        }}
      >


        {/* Middle / Bottom Two Wings (Left: Bio & Socials | Right: Statement & CTA) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            alignItems: "flex-end",
            paddingBottom: "clamp(30px, 6vh, 60px)",
            marginTop: "auto",
          }}
          className="hero-wings-grid"
        >
          {/* Left Wing: Bio, Role, Social Pills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 0.84, 0.24, 1] }}
            style={{
              maxWidth: 380,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              background: "rgba(6, 5, 11, 0.65)",
              backdropFilter: "blur(12px)",
              padding: "24px 28px",
              borderRadius: 8,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              pointerEvents: "auto",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "#a78bfa",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                // PROFILE &amp; SPECIALIZATION
              </span>
              <h2
                style={{
                  fontFamily: "'Urbanist', system-ui, sans-serif",
                  fontSize: "1.35rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 1.25,
                  margin: "0 0 8px 0",
                  transition: "all 0.3s ease",
                }}
              >
                {HERO_TITLES[titleIndex].cardRole}
              </h2>
              <p
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.92rem",
                  lineHeight: "1.55rem",
                  color: "#c4c4c4",
                  margin: 0,
                }}
              >
                I create interfaces and autonomous AI pipelines that blend rigorous function with emotion, crafting production experiences that feel intuitive, seamless, and meaningful.
              </p>
            </div>

            {/* Social Pills matching Reference Style */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 4 }}>
              {[
                { name: "GitHub", icon: FiGithub, url: "https://github.com/sanjeev200009" },
                { name: "LinkedIn", icon: FiLinkedin, url: "https://www.linkedin.com/in/sanjeevsiva/" },
                { name: "Email", icon: FiMail, url: "mailto:sanjaysanjeev2000@gmail.com" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      boxShadow: "0 0 16px rgba(124, 58, 237, 0.4)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px) scale(1.08)";
                      e.currentTarget.style.boxShadow = "0 0 24px rgba(124, 58, 237, 0.7)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 0 16px rgba(124, 58, 237, 0.4)";
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}

              <button
                onClick={handleCVDownload}
                style={{
                  height: 38,
                  padding: "0 16px",
                  borderRadius: 9999,
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#e5e7eb",
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.color = "#e5e7eb";
                }}
              >
                <Download size={13} style={{ color: "#a78bfa" }} />
                CV
              </button>
            </div>
          </motion.div>

          {/* Right Wing: Statement & Glowing "Let's Talk ↗" Pill Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 0.84, 0.24, 1] }}
            style={{
              maxWidth: 400,
              marginLeft: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              textAlign: "right",
              gap: 18,
              background: "rgba(6, 5, 11, 0.65)",
              backdropFilter: "blur(12px)",
              padding: "24px 28px",
              borderRadius: 8,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              pointerEvents: "auto",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Urbanist', system-ui, sans-serif",
                  fontSize: "1.18rem",
                  lineHeight: "1.55rem",
                  fontWeight: 500,
                  color: "#f3f4f6",
                  margin: "0 0 8px 0",
                  letterSpacing: "-0.01em",
                }}
              >
                Building intelligent products through thoughtful design and AI.
              </p>
              <p
                style={{
                  fontFamily: "system-ui, sans-serif",
                  fontSize: "0.88rem",
                  lineHeight: "1.5rem",
                  color: "#9ca3af",
                  margin: 0,
                }}
              >
                Merging engineering systems with human insight to create digital platforms that perform effortlessly at enterprise scale.
              </p>
            </div>

            {/* Exact "Let's Talk ↗" Pill from Reference Design */}
            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px 12px 24px",
                borderRadius: 9999,
                background: "linear-gradient(90deg, #7c3aed 0%, #6366f1 100%)",
                border: "none",
                color: "#ffffff",
                fontFamily: "'Urbanist', system-ui, sans-serif",
                fontSize: "1.05rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 0 35px rgba(124, 58, 237, 0.65), 0 4px 20px rgba(0,0,0,0.4)",
                transition: "box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 50px rgba(124, 58, 237, 0.9), 0 6px 25px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 35px rgba(124, 58, 237, 0.65), 0 4px 20px rgba(0,0,0,0.4)";
              }}
            >
              <span>Let's Talk</span>
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#ffffff",
                  color: "#6d28d9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </span>
            </motion.button>
          </motion.div>
        </div>


      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-wings-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .hero-wings-grid > div {
            max-width: 100% !important;
            margin: 0 !important;
            text-align: left !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
