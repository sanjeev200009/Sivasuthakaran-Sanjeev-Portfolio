import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  Calendar,
  X,
  User,
  MessageSquare,
  Clock,
  CheckCircle,
  Terminal,
  Zap,
} from "lucide-react";
import { EMAIL_CONFIG } from "../../config/emailjs.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import { SOCIAL_LINKS, REACT_APPLICATION } from "../../utils/data.js";
import SublevelSectionHeader from "./SublevelSectionHeader.jsx";

const WHATSAPP_URL = `https://wa.me/94722858346?text=${encodeURIComponent(
  "Hi Sanjeev, I found your portfolio and would like to discuss a freelance project."
)}`;

export default function ContactSection() {
  const { isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScheduleSubmitting, setIsScheduleSubmitting] = useState(false);
  const [scheduleError, setScheduleError] = useState("");
  const [successMessage, setSuccessMessage] = useState({
    title: "Message Dispatched",
    detail: "I will review your message and reply within 24 hours.",
  });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [scheduleForm, setScheduleForm] = useState({ name: "", email: "", date: "", time: "", message: "" });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("access_key", EMAIL_CONFIG.ACCESS_KEY || "demo");
      formData.append("name", contactForm.name);
      formData.append("email", contactForm.email);
      formData.append("message", contactForm.message);
      formData.append("subject", "New Portfolio Contact from " + contactForm.name);
      formData.append("from_name", contactForm.name);

      const response = await fetch(EMAIL_CONFIG.API_URL, { method: "POST", body: formData });
      const result = await response.json();

      if (result.success) {
        setSuccessMessage({
          title: "Message Dispatched",
          detail: "I will review your message and reply within 24 hours.",
        });
        setShowSuccessPopup(true);
        setContactForm({ name: "", email: "", message: "" });
        setTimeout(() => setShowSuccessPopup(false), 3000);
      } else {
        throw new Error(result.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Sorry, there was an error. Please contact me directly at sanjaysanjeev2000@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    setScheduleError("");
    setIsScheduleSubmitting(true);

    try {
      if (!EMAIL_CONFIG.ACCESS_KEY) {
        throw new Error("The scheduling endpoint is not configured.");
      }

      const formData = new FormData();
      formData.append("access_key", EMAIL_CONFIG.ACCESS_KEY);
      formData.append("name", scheduleForm.name);
      formData.append("email", scheduleForm.email);
      formData.append("preferred_date", scheduleForm.date);
      formData.append("preferred_time", scheduleForm.time);
      formData.append("timezone", "Asia/Colombo (GMT+5:30)");
      formData.append("message", scheduleForm.message || "No agenda supplied.");
      formData.append("subject", `Call request from ${scheduleForm.name} — ${scheduleForm.date} at ${scheduleForm.time}`);
      formData.append("from_name", scheduleForm.name);

      const response = await fetch(EMAIL_CONFIG.API_URL, { method: "POST", body: formData });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit the call request.");
      }

      setSuccessMessage({
        title: "Call Request Received",
        detail: "Your preferred date and time were sent. I will reply by email to confirm the call.",
      });
      setScheduleForm({ name: "", email: "", date: "", time: "", message: "" });
      setIsModalOpen(false);
      document.body.style.overflow = "";
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 4000);
    } catch (error) {
      console.error("Error scheduling call:", error);
      setScheduleError("The request could not be sent. Please try again or email me directly.");
    } finally {
      setIsScheduleSubmitting(false);
    }
  };

  const openModal = () => {
    setScheduleError("");
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const openScheduleModal = () => {
      setScheduleError("");
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("portfolio:open-schedule", openScheduleModal);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("portfolio:open-schedule", openScheduleModal);
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, []);

  const inputClass = isDarkMode
    ? "w-full px-4 py-3 rounded-sm border border-neutral-800 bg-neutral-900/70 text-white placeholder-neutral-500 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors"
    : "w-full px-4 py-3 rounded-sm border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 font-mono text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20 transition-colors";

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        background: "var(--sublevel-k)",
        overflow: "hidden",
        padding: "120px 0 160px",
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
        <motion.div
          initial={{ opacity: 0, transform: "translateY(18px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: false, amount: 0.45, margin: "0px 0px -80px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <SublevelSectionHeader
            tag="TERMINAL // OPEN CHANNEL"
            title="Open Channel"
            subtitle="Available for full-time engineering roles, AI product development, and architectural consulting. Terminal active 24/7."
            topRule={true}
          />
        </motion.div>

        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            gap: 24,
          }}
          className="contact-grid"
        >
          {/* Left: Contact Form / Interactive Terminal (7 cols) */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(18px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: false, amount: 0.28, margin: "0px 0px -70px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            style={{
              gridColumn: "span 7 / span 7",
            }}
            className="contact-left-col"
          >
            <div
              style={{
                position: "relative",
                border: "1px solid rgba(255,255,255,0.085)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.016), rgba(255,255,255,0.003))",
                padding: "36px",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
              className="sublevel-frame"
            >
              <i className="sublevel-corner tl" />
              <i className="sublevel-corner tr" />
              <i className="sublevel-corner bl" />
              <i className="sublevel-corner br" />

              {/* Terminal prompt header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Terminal size={14} style={{ color: "#3b82f6" }} />
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
                    INIT_CONTACT // COMPOSE MESSAGE
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 11,
                    color: "#6b7280",
                  }}
                >
                  SECURE ENDPOINT
                </span>
              </div>

              {/* Shell prompt line */}
              <div
                style={{
                  padding: "10px 14px",
                  background: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)",
                  border: "1px solid var(--sublevel-line)",
                  borderRadius: 2,
                  fontFamily: "ui-monospace, 'Geist Mono', monospace",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ color: "#60a5fa" }}>sanjeev@portfolio</span>
                <span style={{ color: "var(--sublevel-w4)" }}>~</span>
                <span style={{ color: "#10b981" }}>$</span>
                <span style={{ color: "var(--sublevel-w2)" }}>send --to sanjaysanjeev2000@gmail.com</span>
                <span className="contact-terminal-cursor" aria-hidden="true" />
              </div>

              <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>
                      // SENDER NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>
                      // EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>
                    // TRANSMISSION CONTENT
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    rows={5}
                    placeholder="Tell me about your product, project or engineering needs..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    width: "100%",
                    padding: "16px 24px",
                    borderRadius: 2,
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontWeight: 600,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    background: isSubmitting ? "#1f2937" : "#2563eb",
                    color: isSubmitting ? "#9ca3af" : "#ffffff",
                    border: "none",
                    boxShadow: isSubmitting ? "none" : "0 0 24px rgba(37,99,235,0.3)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ width: 14, height: 14, border: "2px solid #9ca3af", borderTopColor: "transparent", borderRadius: "50%" }}
                      />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      TRANSMIT MESSAGE
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right: Info + Availability + Schedule (5 cols) */}
          <motion.div
            initial={{ opacity: 0, transform: "translateY(18px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: false, amount: 0.28, margin: "0px 0px -70px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            style={{
              gridColumn: "span 5 / span 5",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
            className="contact-right-col"
          >
            {/* Direct Contact Details */}
            <div
              style={{
                position: "relative",
                border: "1px solid rgba(255,255,255,0.085)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.016), rgba(255,255,255,0.003))",
                padding: "28px",
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
                DIRECT CHANNELS
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {REACT_APPLICATION.map((info, i) => {
                  const Icon = info.icon;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid rgba(255,255,255,0.08)",
                          background: "rgba(255,255,255,0.02)",
                          color: "#3b82f6",
                          borderRadius: 2,
                        }}
                      >
                        <Icon size={14} />
                      </div>
                      <div>
                        <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, color: "var(--sublevel-w4)", textTransform: "uppercase", margin: 0 }}>
                          {info.label}
                        </p>
                        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "var(--sublevel-w1)", fontWeight: 500, margin: 0 }}>
                          {info.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                aria-label="Discuss a freelance project with Sanjeev on WhatsApp"
                style={{
                  marginTop: 4,
                  padding: "13px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 9,
                  borderRadius: 2,
                  border: "1px solid rgba(37, 211, 102, 0.32)",
                  background: "rgba(37, 211, 102, 0.1)",
                  color: isDarkMode ? "#86efac" : "#087f3f",
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                <FaWhatsapp size={17} />
                WhatsApp · Freelance Enquiry
              </motion.a>
            </div>

            {/* Availability Diagnostic Box */}
            <div
              style={{
                position: "relative",
                border: "1px solid var(--sublevel-line)",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
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
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 8px rgba(16,185,129,0.8)",
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  flexShrink: 0,
                }}
              />
              <div>
                <p style={{ fontFamily: "'Urbanist', system-ui, sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#10b981", margin: 0 }}>
                  AVAILABLE FOR HIRE
                </p>
                <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--sublevel-w3)", margin: "2px 0 0" }}>
                  Full-Time · Contract · AI Automation Systems
                </p>
              </div>
            </div>

            {/* Schedule Call Button */}
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{
                position: "relative",
                border: "1px solid var(--sublevel-line)",
                background: isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                fontFamily: "ui-monospace, monospace",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--sublevel-w1)",
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              className="sublevel-frame sublevel-frame-hover"
            >
              <i className="sublevel-corner tl" />
              <i className="sublevel-corner tr" />
              <i className="sublevel-corner bl" />
              <i className="sublevel-corner br" />
              <Calendar size={14} style={{ color: "var(--sublevel-accent)" }} />
              SCHEDULE AN ENGINEERING CALL
            </motion.button>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-terminal-cursor {
          width: 7px;
          height: 14px;
          display: inline-block;
          flex: 0 0 auto;
          background: #60a5fa;
          box-shadow: 0 0 12px rgba(96, 165, 250, 0.55);
          animation: contactCursorBlink 900ms linear infinite;
        }
        @keyframes contactCursorBlink {
          0%, 45% { opacity: 1; }
          46%, 100% { opacity: 0.18; }
        }
        @media (max-width: 960px) {
          .contact-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .contact-left-col, .contact-right-col {
            grid-column: 1 / -1 !important;
            width: 100% !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-terminal-cursor {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

      {/* ─── Success Popup ─── */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              style={{
                position: "relative",
                maxWidth: 420,
                width: "100%",
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: 36,
                textAlign: "center",
              }}
              className="sublevel-frame"
            >
              <i className="sublevel-corner tl" />
              <i className="sublevel-corner tr" />
              <i className="sublevel-corner bl" />
              <i className="sublevel-corner br" />
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: 48,
                  height: 48,
                  margin: "0 auto 16px",
                  borderRadius: 2,
                  border: "1px solid rgba(52,211,153,0.3)",
                  background: "rgba(52,211,153,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle size={24} style={{ color: "#34d399" }} />
              </motion.div>
              <p
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "#3b82f6",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  margin: "0 0 8px",
                }}
              >
                TRANSMISSION CONFIRMED
              </p>
              <h3 style={{ fontFamily: "'Urbanist', system-ui, sans-serif", fontSize: "1.4rem", color: "#ffffff", margin: "0 0 8px" }}>
                {successMessage.title}
              </h3>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "0.9rem", color: "#9ca3af", margin: 0 }}>
                {successMessage.detail}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Schedule Modal ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.35 }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 480,
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: 32,
              }}
              className="sublevel-frame"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="schedule-dialog-title"
            >
              <i className="sublevel-corner tl" />
              <i className="sublevel-corner tr" />
              <i className="sublevel-corner bl" />
              <i className="sublevel-corner br" />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Calendar size={15} style={{ color: "#3b82f6" }} />
                  <span
                    id="schedule-dialog-title"
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      color: "#3b82f6",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    SCHEDULE // CALENDAR SYNC
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    padding: 6,
                    color: "#9ca3af",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleScheduleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>
                    // FULL NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={scheduleForm.name}
                    onChange={handleScheduleChange}
                    required
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>
                    // EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={scheduleForm.email}
                    onChange={handleScheduleChange}
                    required
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>
                      // DATE
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={scheduleForm.date}
                      onChange={handleScheduleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className={inputClass}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>
                      // TIME (GMT+5:30)
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={scheduleForm.time}
                      onChange={handleScheduleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b7280" }}>
                    // AGENDA / TOPIC
                  </label>
                  <textarea
                    name="message"
                    value={scheduleForm.message}
                    onChange={handleScheduleChange}
                    rows={3}
                    placeholder="Brief agenda or project summary..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isScheduleSubmitting}
                  whileHover={!isScheduleSubmitting ? { scale: 1.01 } : {}}
                  whileTap={!isScheduleSubmitting ? { scale: 0.99 } : {}}
                  style={{
                    background: isScheduleSubmitting ? "#1f2937" : "#2563eb",
                    border: "none",
                    borderRadius: 2,
                    padding: "14px 20px",
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: isScheduleSubmitting ? "#9ca3af" : "#ffffff",
                    cursor: isScheduleSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 6,
                  }}
                >
                  <Send size={13} />
                  {isScheduleSubmitting ? "SENDING REQUEST..." : "CONFIRM CALL REQUEST"}
                </motion.button>
                {scheduleError && (
                  <p
                    role="alert"
                    style={{
                      margin: 0,
                      color: "#f87171",
                      fontFamily: "ui-monospace, monospace",
                      fontSize: 11,
                      lineHeight: 1.5,
                      textAlign: "center",
                    }}
                  >
                    {scheduleError}
                  </p>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }} aria-hidden="true">
                  <span style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.1)" }} />
                  <span style={{ color: "#6b7280", fontFamily: "ui-monospace, monospace", fontSize: 10 }}>
                    OR CONTACT DIRECTLY
                  </span>
                  <span style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.1)" }} />
                </div>
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  aria-label="Open WhatsApp to discuss a freelance project"
                  style={{
                    padding: "13px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 9,
                    borderRadius: 2,
                    border: "1px solid rgba(37, 211, 102, 0.35)",
                    background: "rgba(37, 211, 102, 0.1)",
                    color: "#86efac",
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  <FaWhatsapp size={17} />
                  WhatsApp +94 72 285 8346
                </motion.a>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
