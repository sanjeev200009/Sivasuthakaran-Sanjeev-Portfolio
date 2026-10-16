import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, X, Menu, Terminal } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const NAV_ITEMS = [
  { label: "Home", id: "home", code: "01" },
  { label: "Stack", id: "stack", code: "02" },
  { label: "Skills", id: "skills", code: "03" },
  { label: "Work", id: "work", code: "04" },
  { label: "About", id: "about", code: "05" },
  { label: "Contact", id: "contact", code: "06" },
];

export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide navbar as soon as the user starts scrolling down past 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      style={{
        transform: isScrolled ? "translateY(-140%)" : "translateY(0)",
        opacity: isScrolled ? 0 : 1,
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
      }}
      className="fixed top-3 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none flex justify-center"
    >
      <nav
        aria-label="Main"
        style={{
          boxShadow: "0 10px 35px -5px rgba(29, 78, 216, 0.3), 0 0 1px 1px rgba(255, 255, 255, 0.1)",
        }}
        className="pointer-events-auto w-full max-w-[82.5rem] sublevel-navbar-gradient sublevel-frame rounded-sm px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between backdrop-blur-xl border border-white/10 text-white transition-all"
      >
        {/* Sublevel corner bracket markers */}
        <i className="sublevel-corner tl" aria-hidden="true" />
        <i className="sublevel-corner tr" aria-hidden="true" />
        <i className="sublevel-corner bl" aria-hidden="true" />
        <i className="sublevel-corner br" aria-hidden="true" />

        {/* Wordmark */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          onClick={() => scrollSection("home")}
        >
          <div className="w-2.5 h-2.5 bg-blue-300 transform rotate-45 group-hover:rotate-90 transition-transform duration-300 shadow-[0_0_8px_rgba(147,197,253,0.8)]" />
          <span className="font-mono text-sm sm:text-base font-bold tracking-tight text-white">
            SANJEEV<span className="text-blue-300">.</span>STUDIO
          </span>
          <span
            style={{
              background: "rgba(0, 0, 0, 0.55)",
              borderColor: "rgba(255, 255, 255, 0.15)",
            }}
            className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono tracking-widest uppercase border rounded-sm text-neutral-300"
          >
            V2.6
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => scrollSection(item.id)}
              className="px-3 py-1.5 text-xs font-mono font-medium tracking-wider uppercase rounded-sm transition-all text-white/90 hover:text-white hover:bg-white/10"
            >
              <span
                style={{
                  color: idx < 3 ? "#93c5fd" : "#9ca3af",
                  fontWeight: 600,
                }}
                className="mr-1 text-[10px]"
              >
                {item.code}
              </span>
              <span className={idx === 4 ? "text-neutral-300 hover:text-white" : "text-white"}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Right side: Terminal prompt status + Theme toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Machine prompt pill */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.65)",
              borderColor: "rgba(255, 255, 255, 0.12)",
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-mono border rounded-sm text-neutral-300 shadow-inner"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
            <span className="text-neutral-400 text-[11px]">agent ~ $</span>
            <span className="font-semibold text-emerald-400 text-[11px]">online</span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
            aria-label="Toggle theme"
            style={{
              background: "rgba(0, 0, 0, 0.55)",
              borderColor: "rgba(255, 255, 255, 0.12)",
            }}
            className="p-2 rounded-sm border text-neutral-300 hover:text-white hover:bg-white/10 transition-all"
          >
            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              background: "rgba(0, 0, 0, 0.55)",
              borderColor: "rgba(255, 255, 255, 0.12)",
            }}
            className="lg:hidden p-2 rounded-sm border text-neutral-300 hover:text-white hover:bg-white/10 transition-all"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto lg:hidden absolute top-full left-4 right-4 mt-2 p-4 rounded-sm sublevel-frame shadow-2xl backdrop-blur-xl ${
              isDarkMode
                ? "bg-neutral-950/95 border-neutral-800 text-neutral-100"
                : "bg-white/95 border-neutral-200 text-neutral-900"
            }`}
          >
            <i className="sublevel-corner tl" aria-hidden="true" />
            <i className="sublevel-corner tr" aria-hidden="true" />
            <i className="sublevel-corner bl" aria-hidden="true" />
            <i className="sublevel-corner br" aria-hidden="true" />

            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollSection(item.id)}
                  className={`flex items-center justify-between p-2.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-colors ${
                    isDarkMode
                      ? "hover:bg-neutral-900 text-neutral-300 hover:text-white"
                      : "hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-neutral-500">{item.code} //</span>
                </button>
              ))}
            </div>

            <div
              className={`mt-3 pt-3 border-t flex items-center justify-between font-mono text-[11px] ${
                isDarkMode ? "border-neutral-800 text-neutral-400" : "border-neutral-200 text-neutral-600"
              }`}
            >
              <span>STATUS: AVAILABLE FOR ROLES</span>
              <span className="text-emerald-400 font-semibold">● ACTIVE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
