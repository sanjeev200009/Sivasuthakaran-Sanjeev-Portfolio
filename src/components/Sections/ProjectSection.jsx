import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiCloudflare, SiExpress, SiMariadb, SiNextdotjs, SiNodedotjs, SiOpenai,
  SiPostgresql, SiPrisma, SiRedis, SiSupabase, SiTailwindcss, SiTypescript,
} from "react-icons/si";
import { Award, Boxes, CloudCog, ExternalLink, Radio, TrendingDown, Users } from "lucide-react";
import SublevelSectionHeader from "./SublevelSectionHeader.jsx";
import { PORTFOLIO_IMAGES } from "../../utils/media.js";
import "./project-section.css";

const {
  aura: AURA_PREVIEW,
  mailgridDark: MAILGRID_DARK_PREVIEW,
  mailgridLight: MAILGRID_LIGHT_PREVIEW,
  career141: CAREER141_PREVIEW,
  vota: VOTA_PREVIEW,
  talentUnwrapped: TALENT_UNWRAPPED_PREVIEW,
  career141V2: CAREER141_V2_PREVIEW,
  talentSuite: TALENT_SUITE_PREVIEW,
} = PORTFOLIO_IMAGES.projects;

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Corners = () => <><i className="sublevel-corner tl" /><i className="sublevel-corner tr" /><i className="sublevel-corner bl" /><i className="sublevel-corner br" /></>;

const FLAGSHIPS = [
  {
    id: "aura", leftTitle: "AU", rightTitle: "RA", eyebrow: "Award-winning private product",
    title: "AI Unified Recruitment Agent",
    description: "An agentic recruitment platform built to support candidate screening, evaluation, and interview workflows in one unified system.",
    image: AURA_PREVIEW,
    imageAlt: "AURA AI Unified Recruitment Agent award and product preview",
    highlight: "Silver — Best Agentic AI Solution, National AI Awards 2026", HighlightIcon: Award,
    tools: [[SiOpenai, "OpenAI"], [SiNodedotjs, "Node.js"], [Boxes, "Convex"], [CloudCog, "AWS"], [SiRedis, "Redis / BullMQ"]],
  },
  {
    id: "mailgrid", leftTitle: "Mail", rightTitle: "Grid", eyebrow: "Private product",
    title: "Enterprise Email Infrastructure",
    description: "A high-throughput email delivery platform designed to reduce infrastructure cost while keeping large contact operations manageable.",
    imageDark: MAILGRID_DARK_PREVIEW,
    imageLight: MAILGRID_LIGHT_PREVIEW,
    imageAlt: "MailGrid email marketing platform preview",
    highlights: [[TrendingDown, "78% cost reduction"], [Users, "84,085 contacts"]],
    tools: [[CloudCog, "AWS SES"], [Radio, "Amazon SNS"], [SiExpress, "Express.js"], [SiPrisma, "Prisma ORM"], [SiMariadb, "MariaDB"]],
  },
];

const LIVE_PROJECTS = [
  {
    title: "Career141.com",
    description: "The live digital platform for Career141, presenting its global executive search, recruitment expertise, culture, resources, and opportunities.",
    url: "https://career141.com/", image: CAREER141_PREVIEW, imageAlt: "Career141 executive search website thumbnail",
    tools: [[SiNextdotjs, "Next.js"], [SiTypescript, "TypeScript"], [SiTailwindcss, "Tailwind CSS"], [SiCloudflare, "Cloudflare"], [SiSupabase, "Supabase"]],
  },
  {
    title: "VOTA",
    description: "A released Career141 product with a focused, production-ready experience. The live build is linked directly below.",
    url: "https://vota.career141.com/", image: VOTA_PREVIEW, imageAlt: "VOTA talent acquisition video series website thumbnail",
    tools: [[SiNodedotjs, "Node.js"], [SiExpress, "Express.js"], [SiPostgresql, "PostgreSQL"], [SiSupabase, "Supabase"], [SiCloudflare, "Cloudflare"]],
  },
  {
    title: "Talent Unwrapped",
    description: "A live Career141 experience that turns talent information into a polished, shareable digital story.",
    url: "https://talentunwrapped.career141.com/", image: TALENT_UNWRAPPED_PREVIEW, imageAlt: "Talent Unwrapped leadership podcast website thumbnail",
    tools: [[SiNodedotjs, "Node.js"], [SiExpress, "Express.js"], [SiPostgresql, "PostgreSQL"], [SiSupabase, "Supabase"], [SiCloudflare, "Cloudflare"]],
  },
];

const PREVIEWS = [
  { title: "Career141 v2", image: CAREER141_V2_PREVIEW },
  { title: "Talent Suite 2026", image: TALENT_SUITE_PREVIEW },
];

function ToolList({ tools }) {
  return <ul className="project-tools" aria-label="Technology stack">{tools.map(([icon, name]) => (
    <li key={name} className="project-tool">{React.createElement(icon, { "aria-hidden": true })}<span>{name}</span></li>
  ))}</ul>;
}

function PortalProject({ project, index }) {
  return <article className="project-portal-track" data-project={project.id}>
    <div className="project-portal-sticky">
      <div className="project-portal-image-wrap">
        {project.imageDark ? <>
          <img className="project-portal-image project-image-dark" src={project.imageDark} alt={`${project.imageAlt} in dark mode`} onLoad={() => ScrollTrigger.refresh()} />
          <img className="project-portal-image project-image-light" src={project.imageLight} alt={`${project.imageAlt} in light mode`} onLoad={() => ScrollTrigger.refresh()} />
        </> : <img className="project-portal-image" src={project.image} alt={project.imageAlt} onLoad={() => ScrollTrigger.refresh()} />}
        <div className="project-portal-shade" aria-hidden="true" />
      </div>
      <div className="project-portal-panel project-portal-panel-left" aria-hidden="true" />
      <div className="project-portal-panel project-portal-panel-right" aria-hidden="true" />
      <div className="project-portal-content">
        <p className="project-portal-index">0{index + 1} / Flagship</p>
        <div className="project-portal-title" aria-label={`${project.leftTitle}${project.rightTitle}`}>
          <span className="project-title-left" aria-hidden="true">{project.leftTitle}</span>
          <span className="project-title-right" aria-hidden="true">{project.rightTitle}</span>
        </div>
        <div className="project-portal-meta sublevel-frame">
          <Corners />
          <div className="project-portal-meta-top">
            <p className="project-eyebrow">{project.eyebrow}</p>
            {project.highlight && <p className="project-award"><project.HighlightIcon aria-hidden="true" />{project.highlight}</p>}
            {project.highlights && <div className="project-metrics">{project.highlights.map(([icon, text]) => <span key={text}>{React.createElement(icon, { "aria-hidden": true })}{text}</span>)}</div>}
          </div>
          <h3>{project.title}</h3><p className="project-description">{project.description}</p><ToolList tools={project.tools} />
        </div>
      </div>
    </div>
  </article>;
}

export default function ProjectSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray(".project-portal-track").forEach((track) => {
        const timeline = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: track, start: "top top", end: "bottom bottom", scrub: 0.65, invalidateOnRefresh: true } });
        timeline
          .fromTo(track.querySelectorAll(".project-portal-image"), { scale: 1.08 }, { scale: 1, duration: 1 }, 0)
          .to(track.querySelector(".project-portal-panel-left"), { xPercent: -102, duration: 1 }, 0)
          .to(track.querySelector(".project-portal-panel-right"), { xPercent: 102, duration: 1 }, 0)
          .to(track.querySelector(".project-title-left"), { xPercent: -58, scaleX: 0.92, duration: 1 }, 0)
          .to(track.querySelector(".project-title-right"), { xPercent: 58, scaleX: 0.92, duration: 1 }, 0)
          .to(track.querySelector(".project-portal-index"), { autoAlpha: 0, y: -14, duration: 0.28 }, 0.12)
          .fromTo(track.querySelector(".project-portal-meta"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.38 }, 0.48)
          .fromTo(track.querySelectorAll(".project-tool"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.035, duration: 0.24 }, 0.64);
      });
      gsap.utils.toArray(".project-reveal").forEach((item) => {
        gsap.fromTo(item, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 84%", end: "bottom 10%", toggleActions: "play reverse play reverse" } });
      });
    });
    media.add("(max-width: 899px), (prefers-reduced-motion: reduce)", () => gsap.set([".project-portal-meta", ".project-tool", ".project-reveal"], { clearProps: "all" }));
    return () => media.revert();
  }, { scope: sectionRef });

  return <section ref={sectionRef} id="work" className="project-section">
    <div className="project-vrules" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <i key={index} />)}</div>
    <div className="project-shell">
      <SublevelSectionHeader tag="Selected professional work" title="Featured Projects" subtitle="Production AI, product architecture, and cloud systems built for real-world use." />
      <div className="project-flagships">{FLAGSHIPS.map((project, index) => <PortalProject key={project.id} project={project} index={index} />)}</div>

      <div className="project-subheading project-reveal"><span>03—05</span><h3>Released live work</h3><p>Public products you can visit now.</p></div>
      <div className="project-live-list">{LIVE_PROJECTS.map((project, index) => <article className="project-editorial sublevel-frame project-reveal" key={project.title}>
        <Corners />
        <div className="project-editorial-copy"><div><p className="project-live-status"><span aria-hidden="true" />Live</p><p className="project-row-number">0{index + 3}</p><h4>{project.title}</h4><p className="project-description">{project.description}</p></div>
          <div><ToolList tools={project.tools} /><a className="project-link" href={project.url} target="_blank" rel="noreferrer">Visit live site <ExternalLink aria-hidden="true" /></a></div>
        </div>
        <div className="project-editorial-image-wrap"><img src={project.image} alt={project.imageAlt} loading="lazy" onLoad={() => ScrollTrigger.refresh()} /></div>
      </article>)}</div>

      <div className="project-subheading project-reveal project-preview-heading"><span>In progress</span><h3>Private previews</h3><p>Shown as screenshots only until release.</p></div>
      <div className="project-preview-grid">{PREVIEWS.map((project) => <article className="project-preview sublevel-frame project-reveal" key={project.title}><Corners />
        <div className="project-preview-image-wrap"><img src={project.image} alt={`${project.title} concept interface thumbnail`} loading="lazy" /></div>
        <div><p>Unreleased preview</p><h4>{project.title}</h4><span>No public link</span></div>
      </article>)}</div>
    </div>
  </section>;
}
