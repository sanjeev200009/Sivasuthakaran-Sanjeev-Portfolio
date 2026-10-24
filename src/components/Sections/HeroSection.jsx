import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight, Download, Terminal, Sparkles, Send } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext.jsx";
import { downloadCVFetch, downloadCV } from "../../utils/cvDownload.js";
import sanjeevCutout from "../../assets/images/sanjeev-cutout.webp";
import sanjeevIllustrated from "../../assets/images/sanjeev-illustrated.webp";

const SANJEEV_CUTOUT = sanjeevCutout;
const SANJEEV_ILLUSTRATED = sanjeevIllustrated;
const HERO_WHATSAPP_URL = `https://wa.me/94722858346?text=${encodeURIComponent(
  "Hi Sanjeev, I found your portfolio and would like to discuss a freelance project."
)}`;

const HERO_TITLES = [
  { line1: "SANJEEV", line2: "SIVASUTHAKARAN", cardRole: "Associate Product & AI Engineer" },
  { line1: "ASSOCIATE", line2: "PRODUCT ENGINEER", cardRole: "Associate Product Engineer" },
  { line1: "FREELANCE", line2: "DEVELOPER", cardRole: "Freelance Developer" },
];

export default function HeroSection() {
  const { isDarkMode } = useTheme();
  const heroRef = useRef(null);
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const updateViewportMode = () => setIsMobileViewport(mediaQuery.matches);
    updateViewportMode();
    mediaQuery.addEventListener("change", updateViewportMode);
    return () => mediaQuery.removeEventListener("change", updateViewportMode);
  }, []);

  // Portrait Hover Reveal Lens Tracking
  const [portraitHovered, setPortraitHovered] = useState(false);
  const [portraitMouse, setPortraitMouse] = useState({ x: 300, y: 260 });
  const [isAvatarPinned, setIsAvatarPinned] = useState(false);
  const portraitBoxRef = useRef(null);

  const handlePortraitMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: none)").matches) return;
    setPortraitHovered(true);
  };

  const handlePortraitMouseMove = (e) => {
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: none)").matches) return;
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

  // Rings glow shift
  const ringsX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const ringsY = useTransform(springY, [-0.5, 0.5], [-18, 18]);

  // Scroll Parallax & Discovery
  // Hero is sticky (the next sections slide over it like a curtain), so progress
  // comes from page scroll rather than the hero's own position.
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (v) =>
    Math.min(1, v / (heroRef.current?.offsetHeight || window.innerHeight))
  );

  // Pin at the top, or at the bottom edge when the hero is taller than the viewport
  const [stickyTop, setStickyTop] = useState(0);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const update = () => setStickyTop(Math.min(0, window.innerHeight - el.offsetHeight));
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const textScrollY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  const handleMouseMove = (e) => {
    if (isMobileViewport || !heroRef.current) return;
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

  const openScheduleModal = () => {
    window.dispatchEvent(new Event("portfolio:open-schedule"));
  };

  const handleCVDownload = async () => {
    try {
      await downloadCVFetch();
    } catch {
      downloadCV();
    }
  };

  // ─── Fast Rotating Typewriter: 3 Titles Cycling (Name & Roles) ───
  const [titleIndex, setTitleIndex] = useState(0);
  const [typedFirst, setTypedFirst] = useState("");
  const [typedSecond, setTypedSecond] = useState("");
  // Phase: "TYPE_FIRST" | "TYPE_SECOND" | "HOLD" | "DELETE_SECOND" | "DELETE_FIRST" | "NEXT"
  const [phase, setPhase] = useState("TYPE_FIRST");

  useEffect(() => {
    let timeoutId;
    let isMounted = true;

    const currentTitle = HERO_TITLES[titleIndex];

    if (isMobileViewport) {
      setTypedFirst(currentTitle.line1);
      setTypedSecond(currentTitle.line2);
      setPhase("HOLD");
      return () => {
        isMounted = false;
      };
    }

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
          // Hold for 2.5 seconds so title is clearly readable
          setPhase("HOLD");
          timeoutId = setTimeout(tick, 2500);
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
  }, [typedFirst, typedSecond, phase, titleIndex, isMobileViewport]);

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
      onMouseMove={isMobileViewport ? undefined : handleMouseMove}
      onMouseLeave={isMobileViewport ? undefined : handleMouseLeave}
      style={{
        position: "sticky",
        top: stickyTop,
        zIndex: 0,
        minHeight: "100vh",
        background: isDarkMode
          ? "radial-gradient(circle at 50% 40%, #0d0b1a 0%, #06050b 60%, #030305 100%)"
          : "radial-gradient(circle at 50% 35%, #ffffff 0%, #f1f5f9 60%, #e2e8f0 100%)",
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

      {/* ─── HERO VISUAL STAGE: 100svh On Mobile, Transparent On Desktop ─── */}
      <div className="hero-visual-stage">
        {/* ─── LAYER 1: Concentric Sonic Glow Rings (Behind Sanjeev) ─── */}
        {!isMobileViewport && <motion.div
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
      </motion.div>}

      {/* ─── LAYER 2: Giant Background Name Typography (Behind Cutout) ─── */}
      <motion.div
        className="hero-bg-title-wrapper"
        style={{
          y: isMobileViewport ? 0 : textScrollY,
          x: isMobileViewport ? 0 : textShiftX,
          opacity: isMobileViewport ? 1 : heroOpacity,
          position: "absolute",
          top: "clamp(85px, 13vh, 130px)",
          left: 0,
          right: 0,
          zIndex: 24,
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
          className="hero-bg-title"
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
            color: isDarkMode ? "#ffffff" : "#0f172a",
            margin: 0,
            textShadow: isDarkMode ? "0 6px 18px rgba(0,0,0,0.58)" : "0 3px 12px rgba(15,23,42,0.08)",
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
            {!isMobileViewport && (phase === "TYPE_FIRST" || phase === "DELETE_FIRST" || phase === "PAUSE") && (
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
            <span>
              {typedSecond}
            </span>
            {!isMobileViewport && (phase === "TYPE_SECOND" || phase === "HOLD" || phase === "DELETE_SECOND") && (
              <span className="hero-typewriter-cursor">|</span>
            )}
          </span>
        </motion.h1>
      </motion.div>

      {/* ─── LAYER 3: 3D Foreground Cutout Portrait ─── */}
      <motion.div
        className="hero-portrait-wrapper"
        style={{
          y: isMobileViewport ? 0 : portraitScrollY,
          scale: isMobileViewport ? 1 : portraitScale,
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
          onMouseEnter={handlePortraitMouseEnter}
          onMouseLeave={() => setPortraitHovered(false)}
          onClick={() => {
            if (!isMobileViewport) setIsAvatarPinned((prev) => !prev);
          }}
          title="Hover to reveal neural avatar, or click to pin"
          className="hero-portrait-inner"
          style={{
            x: isMobileViewport ? 0 : portraitX,
            y: isMobileViewport ? 0 : portraitY,
            rotate: isMobileViewport ? 0 : portraitRotate,
            position: "relative",
            width: "clamp(300px, 48vw, 730px)",
            maxHeight: "84vh",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "auto",
            cursor: isMobileViewport ? "default" : isAvatarPinned ? "pointer" : "crosshair",
            userSelect: "none",
          }}
          initial={isMobileViewport ? false : { opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 0.84, 0.24, 1], delay: 0.15 }}
        >
          {/* Subtle back ambient rim glow */}
          {!isMobileViewport && <div
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
          />}

          {/* Base Layer: Photographic Cutout */}
          <img
            src={SANJEEV_CUTOUT}
            alt="Sanjeev Sivasuthakaran"
            className="hero-cutout-base"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "84vh",
              objectFit: "contain",
              objectPosition: "bottom center",
              filter: "contrast(1.06) brightness(1.02) drop-shadow(0 20px 45px rgba(0,0,0,0.85))",
              display: "block",
              opacity: isAvatarPinned ? 0 : 1,
              transition: "opacity 0.35s ease",
            }}
          />

          {/* Top Layer: Cyber Illustrated Vector Avatar revealed via Cursor Mask */}
          {!isMobileViewport && <img
            src={SANJEEV_ILLUSTRATED}
            alt="Sanjeev Sivasuthakaran Cyber Avatar"
            className="hero-illustrated-overlay"
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
              transition: isAvatarPinned ? "opacity 0.35s ease" : "opacity 0.08s ease",
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
          />}

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
              background: isDarkMode
                ? "linear-gradient(180deg, transparent 0%, #06050b 100%)"
                : "linear-gradient(180deg, transparent 0%, #f1f5f9 100%)",
              pointerEvents: "none",
              zIndex: 15,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Mode Toggle Pill */}
      <div className="hero-avatar-pill-container">
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
          <span className="hidden sm:inline">{isAvatarPinned ? "PINNED: VECTOR AVATAR" : "HOVER: LENS REVEAL"}</span>
          <span className="inline sm:hidden">{isAvatarPinned ? "VECTOR AVATAR" : "TAP: AVATAR"}</span>
        </button>
      </div>

      {/* Mobile-only Bottom Hero Dock (visible on the first 100svh screen) */}
      <div className="hero-mobile-dock">
        <div className="hero-mobile-dock-pill">
          <span className="hero-mobile-dock-role">{HERO_TITLES[titleIndex].cardRole}</span>
          <span className="hero-mobile-dock-dot" />
          <button
            type="button"
            onClick={openScheduleModal}
            className="hero-mobile-dock-cta"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={13} />
          </button>
          <a
            className="hero-mobile-whatsapp"
            href={HERO_WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp Sanjeev at +94 72 285 8346"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp size={19} aria-hidden="true" />
          </a>
        </div>
        <div className="hero-mobile-scroll-hint">
          <span>Scroll for bio &amp; projects</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </div>
    </div>

    {/* ─── LAYER 4: Foreground Interactive Information Grid ─── */}
    <div
      className="hero-info-layer"
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
            className="hero-left-wing"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 0.84, 0.24, 1] }}
            style={{
              maxWidth: 380,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              background: isDarkMode ? "rgba(6, 5, 11, 0.65)" : "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(12px)",
              padding: "24px 28px",
              borderRadius: 8,
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: isDarkMode ? "0 20px 40px rgba(0,0,0,0.4)" : "0 10px 30px rgba(0,0,0,0.06)",
              pointerEvents: "auto",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: isDarkMode ? "#a78bfa" : "#7c3aed",
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
                  color: isDarkMode ? "#ffffff" : "#0f172a",
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
                  color: isDarkMode ? "#c4c4c4" : "#475569",
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
                { name: "WhatsApp", icon: FaWhatsapp, url: HERO_WHATSAPP_URL },
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
                  background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                  border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(0, 0, 0, 0.12)",
                  color: isDarkMode ? "#e5e7eb" : "#1e293b",
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
                  e.currentTarget.style.background = isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.color = isDarkMode ? "#ffffff" : "#0f172a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.color = isDarkMode ? "#e5e7eb" : "#1e293b";
                }}
              >
                <Download size={13} style={{ color: isDarkMode ? "#a78bfa" : "#7c3aed" }} />
                CV
              </button>
            </div>
          </motion.div>

          {/* Right Wing: Statement & Glowing "Let's Talk ↗" Pill Button */}
          <motion.div
            className="hero-right-wing"
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
              background: isDarkMode ? "rgba(6, 5, 11, 0.65)" : "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(12px)",
              padding: "24px 28px",
              borderRadius: 8,
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: isDarkMode ? "0 20px 40px rgba(0,0,0,0.4)" : "0 10px 30px rgba(0,0,0,0.06)",
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
                  color: isDarkMode ? "#f3f4f6" : "#0f172a",
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
                  color: isDarkMode ? "#9ca3af" : "#475569",
                  margin: 0,
                }}
              >
                Merging engineering systems with human insight to create digital platforms that perform effortlessly at enterprise scale.
              </p>
            </div>

            {/* Exact "Let's Talk ↗" Pill from Reference Design */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
              <motion.button
              className="hero-lets-talk-btn"
              onClick={openScheduleModal}
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
              <motion.a
              className="hero-whatsapp-link"
              href={HERO_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp Sanjeev at +94 72 285 8346"
              title="Chat on WhatsApp"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: isDarkMode ? "1px solid rgba(37, 211, 102, 0.35)" : "1px solid rgba(22, 163, 74, 0.3)",
                background: isDarkMode ? "rgba(37, 211, 102, 0.08)" : "rgba(22, 163, 74, 0.07)",
                color: isDarkMode ? "#86efac" : "#15803d",
                textDecoration: "none",
                boxShadow: isDarkMode ? "0 0 22px rgba(37, 211, 102, 0.12)" : "0 6px 18px rgba(22, 163, 74, 0.1)",
              }}
              >
                <FaWhatsapp size={20} aria-hidden="true" />
              </motion.a>
            </div>
          </motion.div>
        </div>


      </div>

      <style>{`
        /* ── Desktop: contents so visual stage acts transparently under #home ── */
        .hero-visual-stage {
          display: contents;
        }
        .hero-mobile-dock {
          display: none !important;
        }
        .hero-avatar-pill-container {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 26;
          pointer-events: auto;
        }


        /* ── Mobile & tablet (≤ 900px): Dedicated 100svh Grand Hero Visual ── */
        @media (max-width: 900px) {
          #home {
            flex-direction: column !important;
            min-height: auto !important;
            padding-top: 0 !important;
            overflow-x: hidden !important;
          }

          /* Full 100svh Dedicated Visual Stage */
          .hero-visual-stage {
            display: flex !important;
            position: relative !important;
            width: 100% !important;
            height: 100svh !important;
            min-height: 640px !important;
            overflow: hidden !important;
            flex-direction: column !important;
            justifyContent: flex-end !important;
            align-items: center !important;
            padding-top: 70px !important;
          }

          /* Giant Title placed clearly behind upper head and shoulders - moved down per request & enlarged */
          .hero-bg-title-wrapper {
            top: clamp(125px, 15vh, 175px) !important;
            padding: 0 10px !important;
            z-index: 9 !important;
          }

          .hero-bg-title {
            font-size: clamp(3.2rem, 13.5vw, 5.2rem) !important;
            line-height: 0.86 !important;
            letter-spacing: -0.015em !important;
          }

          /* Big Grand Portrait: symmetrically centered at 210vw without flexbox clipping */
          .hero-portrait-wrapper {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 10 !important;
            pointer-events: none !important;
            margin: 0 !important;
            overflow: hidden !important;
            transform: translate3d(0, 0, 0) !important;
            backface-visibility: hidden !important;
            -webkit-backface-visibility: hidden !important;
            contain: layout paint !important;
          }

          .hero-portrait-inner {
            position: absolute !important;
            bottom: 0 !important;
            left: -55vw !important;
            width: 210vw !important;
            max-width: none !important;
            height: auto !important;
            max-height: 85vh !important;
            pointer-events: auto !important;
            display: block !important;
            flex-shrink: 0 !important;
            transform: translate3d(0, 0, 0) !important;
            backface-visibility: hidden !important;
            -webkit-backface-visibility: hidden !important;
          }

          .hero-portrait-inner .hero-cutout-base {
            width: 100% !important;
            height: auto !important;
            max-height: 85vh !important;
            object-fit: contain !important;
            object-position: bottom center !important;
            display: block !important;
            filter: none !important;
            transform: translate3d(0, 0, 0) !important;
            backface-visibility: hidden !important;
            -webkit-backface-visibility: hidden !important;
          }

          .hero-portrait-inner .hero-illustrated-overlay {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            max-height: 85vh !important;
            object-fit: contain !important;
            object-position: bottom center !important;
          }

          /* Mode Toggle Pill: placed cleanly at top right below navbar */
          .hero-avatar-pill-container {
            display: none !important;
          }

          .hero-avatar-pill-container button {
            font-size: 11px !important;
            padding: 7px 15px !important;
            gap: 7px !important;
          }

          /* Mobile bottom dock */
          .hero-mobile-dock {
            position: absolute !important;
            bottom: 14px !important;
            left: 0 !important;
            right: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 8px !important;
            z-index: 25 !important;
            pointer-events: auto !important;
            padding: 0 14px !important;
          }

          .hero-mobile-dock-pill {
            display: inline-flex !important;
            align-items: center !important;
            gap: 12px !important;
            padding: 8px 10px 8px 16px !important;
            border-radius: 9999px !important;
            background: ${isDarkMode ? "rgba(10, 10, 18, 0.9)" : "rgba(255, 255, 255, 0.92)"} !important;
            border: 1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.18)" : "rgba(0, 0, 0, 0.12)"} !important;
            backdrop-filter: none !important;
            box-shadow: ${isDarkMode ? "0 8px 30px rgba(0, 0, 0, 0.75), 0 0 24px rgba(124, 58, 237, 0.3)" : "0 8px 30px rgba(0, 0, 0, 0.08), 0 0 20px rgba(124, 58, 237, 0.15)"} !important;
            max-width: 95vw !important;
          }

          .hero-mobile-dock-role {
            font-family: 'Urbanist', system-ui, sans-serif !important;
            font-size: 0.94rem !important;
            font-weight: 700 !important;
            color: ${isDarkMode ? "#f3f4f6" : "#0f172a"} !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          .hero-mobile-dock-dot {
            width: 5px !important;
            height: 5px !important;
            border-radius: 50% !important;
            background: #a78bfa !important;
            flex-shrink: 0 !important;
          }

          .hero-mobile-dock-cta {
            display: inline-flex !important;
            align-items: center !important;
            gap: 6px !important;
            padding: 8px 14px !important;
            border-radius: 9999px !important;
            background: linear-gradient(90deg, #7c3aed 0%, #6366f1 100%) !important;
            border: none !important;
            color: #ffffff !important;
            font-family: 'Urbanist', system-ui, sans-serif !important;
            font-size: 0.92rem !important;
            font-weight: 700 !important;
            cursor: pointer !important;
            flex-shrink: 0 !important;
            box-shadow: 0 0 16px rgba(124, 58, 237, 0.5) !important;
          }

          .hero-mobile-whatsapp {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 38px !important;
            height: 38px !important;
            padding: 0 !important;
            border-radius: 50% !important;
            border: 1px solid ${isDarkMode ? "rgba(37, 211, 102, 0.38)" : "rgba(22, 163, 74, 0.3)"} !important;
            background: ${isDarkMode ? "rgba(7, 24, 16, 0.86)" : "rgba(240, 253, 244, 0.94)"} !important;
            color: ${isDarkMode ? "#86efac" : "#15803d"} !important;
            text-decoration: none !important;
            backdrop-filter: none !important;
            box-shadow: ${isDarkMode ? "0 8px 22px rgba(0, 0, 0, 0.5)" : "0 8px 22px rgba(15, 23, 42, 0.08)"} !important;
          }

          .hero-mobile-scroll-hint {
            display: inline-flex !important;
            align-items: center !important;
            gap: 5px !important;
            font-family: ui-monospace, monospace !important;
            font-size: 10.5px !important;
            letter-spacing: 0.1em !important;
            text-transform: uppercase !important;
            color: ${isDarkMode ? "#9ca3af" : "#64748b"} !important;
            opacity: 0.85 !important;
            animation: heroBounce 2s ease infinite !important;
          }

          @keyframes heroBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(3px); }
          }

          /* Information layer stacked right below the 100svh hero stage */
          .hero-info-layer {
            position: relative !important;
            z-index: 20 !important;
            flex: unset !important;
            padding: 24px 16px 40px !important;
            pointer-events: auto !important;
            background: ${isDarkMode ? "#06050b" : "#f8fafc"} !important;
          }

          .hero-wings-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding-bottom: 0 !important;
            margin-top: 0 !important;
          }

          .hero-left-wing,
          .hero-right-wing {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 24px 22px !important;
            border-radius: 12px !important;
            text-align: left !important;
            align-items: flex-start !important;
            backdrop-filter: none !important;
          }

          .hero-left-wing h2 {
            font-size: 1.55rem !important;
            line-height: 1.25 !important;
          }

          .hero-left-wing p {
            font-size: 1.02rem !important;
            line-height: 1.65rem !important;
          }

          .hero-right-wing p:first-of-type {
            font-size: 1.3rem !important;
            line-height: 1.65rem !important;
          }

          .hero-right-wing p:last-of-type {
            font-size: 0.98rem !important;
            line-height: 1.6rem !important;
          }

          .hero-lets-talk-btn {
            width: 100% !important;
            justify-content: space-between !important;
            font-size: 1.12rem !important;
            padding: 13px 18px 13px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
