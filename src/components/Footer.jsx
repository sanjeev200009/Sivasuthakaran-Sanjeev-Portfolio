import { motion } from "framer-motion";
import { ArrowUp, CheckCircle2, Sparkles, Terminal } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { SOCIAL_LINKS } from "../utils/data.js";

const footerColumns = [
  {
    title: "NAVIGATE",
    links: [
      { label: "Home", target: "home" },
      { label: "Technologies", target: "stack" },
      { label: "Capabilities", target: "skills" },
      { label: "Selected Work", target: "work" },
      { label: "About", target: "about" },
    ],
  },
  {
    title: "SERVICES",
    links: [
      { label: "Web Development", target: "contact" },
      { label: "Mobile Apps", target: "contact" },
      { label: "AI & Automation", target: "contact" },
      { label: "Cloud Systems", target: "contact" },
      { label: "Consulting", target: "contact" },
    ],
  },
];

const Footer = () => {
  const { isDarkMode } = useTheme();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToSection = (target) =>
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className={`relative isolate overflow-hidden border-t transition-colors ${
      isDarkMode
        ? "border-neutral-800/60 bg-[#0a0a0a]"
        : "border-neutral-200/80 bg-[#f8fafc]"
    }`}>
      {/* Background vrules */}
      <div className="sublevel-bg-vrules" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>

      {/* Subtle bottom glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[50%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(37,99,235,0.15),transparent_70%)]"
      />

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        aria-label="Back to top"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="absolute left-1/2 top-0 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm sublevel-frame hover:border-blue-500/60 text-neutral-400 hover:text-white transition-colors"
      >
        <ArrowUp size={16} />
      </motion.button>

      <div className="relative z-10 mx-auto max-w-[82.5rem] px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_0.8fr_0.8fr_1fr] gap-10 lg:gap-8">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => scrollToSection("home")}
              className="sublevel-frame sublevel-frame-hover flex items-center gap-3 px-3 py-2 rounded-sm mb-6"
            >
              <i className="sublevel-corner tl" aria-hidden="true" />
              <i className="sublevel-corner tr" aria-hidden="true" />
              <i className="sublevel-corner bl" aria-hidden="true" />
              <i className="sublevel-corner br" aria-hidden="true" />
              <span className="grid h-8 w-8 place-items-center rounded-sm bg-blue-600/90 text-xs font-bold text-white font-mono">
                SS
              </span>
              <span className={`text-sm font-semibold tracking-tight ${isDarkMode ? "text-white" : "text-neutral-900"}`}>
                Sivasuthakaran Sanjeev
              </span>
            </button>

            <div className="sublevel-frame rounded-sm p-4 mb-5">
              <i className="sublevel-corner tl" aria-hidden="true" />
              <i className="sublevel-corner tr" aria-hidden="true" />
              <i className="sublevel-corner bl" aria-hidden="true" />
              <i className="sublevel-corner br" aria-hidden="true" />
              {/* Terminal prompt */}
              <div className="flex items-center gap-2 mb-3">
                <Terminal size={11} className="text-blue-500" />
                <span className="sublevel-badge">README.txt</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                Associate Product &amp; AI Engineer building production systems across
                web, cloud, and agentic AI. Based in Colombo, Sri Lanka.
              </p>
            </div>

            <div className="sublevel-frame rounded-sm p-3 flex flex-col gap-2">
              <i className="sublevel-corner tl" aria-hidden="true" />
              <i className="sublevel-corner tr" aria-hidden="true" />
              <i className="sublevel-corner bl" aria-hidden="true" />
              <i className="sublevel-corner br" aria-hidden="true" />
              <p className="flex items-center gap-2 font-mono text-[10px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)] animate-pulse" />
                AVAILABLE FOR WORK
              </p>
              <p className="flex items-center gap-2 font-mono text-[10px] text-neutral-500">
                <CheckCircle2 size={11} className="text-blue-400" />
                Web · Mobile · AI Pipelines
              </p>
              <p className="flex items-center gap-2 font-mono text-[10px] text-neutral-500">
                <Sparkles size={11} className="text-purple-400" />
                Fast response · Clear comms
              </p>
            </div>
          </motion.div>

          {/* Navigation columns */}
          {footerColumns.map((column, columnIndex) => (
            <motion.nav
              key={column.title}
              aria-label={column.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: columnIndex * 0.08 }}
            >
              <p className="sublevel-badge mb-5">{column.title}</p>
              <hr className="sublevel-divider mb-5" />
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.target)}
                      className={`group/link relative text-left text-xs font-mono transition-colors duration-200 ${
                        isDarkMode
                          ? "text-neutral-400 hover:text-white"
                          : "text-neutral-600 hover:text-neutral-950"
                      }`}
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-blue-500/60 transition-[width] duration-200 ease-out group-hover/link:w-full" />
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}

          {/* Connect column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="sublevel-badge mb-5">CONNECT</p>
            <hr className="sublevel-divider mb-5" />
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.slice(0, 4).map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`sublevel-frame sublevel-frame-hover grid h-9 w-9 place-items-center rounded-sm transition-colors ${
                      isDarkMode
                        ? "text-neutral-400 hover:text-white"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <hr className="sublevel-divider mt-12 mb-5" />
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] ${
          isDarkMode ? "text-neutral-500" : "text-neutral-600"
        }`}>
          <span>© 2026 SIVASUTHAKARAN SANJEEV · ALL SYSTEMS OPERATIONAL</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
            BUILT WITH REACT · VITE · TAILWIND
          </span>
        </div>
      </div>

      {/* Large ghost text */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-[-0.06em] z-0 overflow-hidden text-center text-[25vw] font-bold leading-[0.82] tracking-[-0.08em] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_50%,black_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_50%,black_100%)] sm:text-[22vw] lg:text-[18rem] ${
          isDarkMode ? "text-neutral-900/80" : "text-neutral-300/60"
        }`}
      >
        SANJEEV
      </div>
    </footer>
  );
};

export default Footer;
