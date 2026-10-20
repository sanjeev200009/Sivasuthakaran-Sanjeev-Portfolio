import React, { useEffect, useRef } from "react";
import { SOCIAL_LINKS } from "../../utils/data.js";
import SublevelSectionHeader from "./SublevelSectionHeader.jsx";
import "./about-section.css";

const NAME_SIGNAL = ["S", "A", "N", "J", "E", "E", "V"];

const IMPACT = [
  { label: "AI pipelines", value: "115K", detail: "Profiles processed" },
  { label: "Infrastructure", value: "78%", detail: "Cost reduction" },
  { label: "Recognition", value: "Silver", detail: "National AI Awards 2026" },
];

const CAREER_FLOW = [
  { index: "01", context: "Foundation", title: "Coding Foundation" },
  { index: "02", context: "Independent", title: "Freelance Developer" },
  { index: "03", context: "Career141", title: "Web Developer Intern" },
  { index: "04", context: "Current", title: "Associate Product & AI Engineer", current: true },
];

function Corners() {
  return <><i className="sublevel-corner tl" /><i className="sublevel-corner tr" /><i className="sublevel-corner bl" /><i className="sublevel-corner br" /></>;
}

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const targets = section.querySelectorAll("[data-about-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.visible = "true";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.3, rootMargin: "0px 0px -18%" });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const connectLinks = SOCIAL_LINKS.filter(({ name }) => ["GitHub", "LinkedIn", "Email"].includes(name));

  return (
    <section ref={sectionRef} id="about" className="about-profile-section">
      <div className="about-profile-vrules" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <i key={index} />)}</div>
      <div className="about-profile-shell">
        <SublevelSectionHeader
          tag="IDENTITY // ENGINEER PROFILE"
          title="Studio Profile"
          subtitle="Product engineer building AI systems that create measurable business value."
        />

        <div className="about-profile-stage">
          <article className="about-signal sublevel-frame" data-about-reveal>
            <Corners />
            <header className="about-signal-head">
              <span>Identity signal // 001</span>
              <span>Scroll to decode ↓</span>
            </header>

            <div className="about-signal-core" aria-label="Sanjeev identity signal">
              <span className="about-scan-line" aria-hidden="true" />
              <div className="about-name-stack">
                {NAME_SIGNAL.map((letter, index) => (
                  <div className={`about-name-row${index === 3 ? " is-active" : ""}`} key={`${letter}-${index}`}>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <strong aria-hidden="true">{letter}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-signal-role">
              <span>Sivasuthakaran Sanjeev</span>
              <h3>Associate Product &amp; AI Engineer</h3>
              <p>Career141 · Colombo, Sri Lanka</p>
            </div>

            <footer className="about-signal-foot">
              <span>06.9271° N / 79.8612° E</span>
              <span>System active // 2026</span>
            </footer>
          </article>

          <div className="about-profile-story">
            <article className="about-statement sublevel-frame" data-about-reveal>
              <Corners />
              <span className="about-eyebrow">Production first</span>
              <h3>I turn complex systems into <em>products people can use.</em></h3>
              <footer><span>AI · Product · Cloud infrastructure</span><strong>FTTLP active // 2026</strong></footer>
            </article>

            <div className="about-impact" aria-label="Verified impact" data-about-reveal>
              {IMPACT.map((item) => (
                <div className="about-metric" key={item.label}>
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>

            <article className="about-career sublevel-frame" data-about-reveal>
              <Corners />
              <header><span>Career flow</span><strong>Building forward</strong></header>
              <div className="about-career-flow" aria-label="Career progression">
                <span className="about-career-progress" aria-hidden="true" />
                {CAREER_FLOW.map((step) => (
                  <div className={`about-career-node${step.current ? " is-current" : ""}`} key={step.index}>
                    <i aria-hidden="true" />
                    <small>{step.index} / {step.context}</small>
                    <strong>{step.title}</strong>
                  </div>
                ))}
              </div>
            </article>

            <aside className="about-connect sublevel-frame" data-about-reveal>
              <Corners />
              <div><strong>Connect</strong><span>Colombo, Sri Lanka</span></div>
              <nav aria-label="Social links">
                {connectLinks.map(({ name, icon, url }) => (
                  <a href={url} target="_blank" rel="noreferrer" aria-label={name} key={name}>{React.createElement(icon, { "aria-hidden": true })}</a>
                ))}
              </nav>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
