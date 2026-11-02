import { createFileRoute } from "@tanstack/react-router";
import photo from "@/assets/yash-cutout.png";
import resume from "@/assets/resume.png.asset.json";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { ArrowDown, ArrowUpRight, Github, ShieldCheck, ScanLine, AudioLines, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AmbientField, MotionSurface, usePortfolioMotion, useInteractiveExtras, RotatingWord } from "@/components/portfolio-motion";
import { TechStack } from "@/components/portfolio-stack";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Yash Nema — Full-Stack Developer Portfolio" },
    { name: "description", content: "Explore Yash Nema’s projects in AI, identity verification, AML and speech, plus his technology stack and resume." },
    { property: "og:title", content: "Yash Nema — Full-Stack Developer Portfolio" },
    { property: "og:description", content: "Projects, skills and resume of Yash Nema, aspiring full-stack developer and CSBS student." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Index,
});
const LINKS = { linkedin: "https://www.linkedin.com/in/yash-nema-421bb7336", github: "https://github.com/yashnema05", email: "mailto:nemayash05@gmail.com" };
const PROJECTS = [
  { title: "BorderShield", sub: "AI-Based Fake Identity & Document Screening System", desc: "An AI-powered system for identity and travel document verification using OCR, tampering detection, and face verification.", tech: ["Streamlit", "OpenCV", "YuNet", "RapidOCR", "Pydantic", "NumPy", "Pandas"], icon: ShieldCheck },
  { title: "TRINETRA", sub: "Money Laundering Pattern Detection", desc: "An AML platform that detects suspicious patterns in financial transactions, identifies unusual behavior, and supports early detection of high-risk activities.", tech: ["Python", "Data Analysis", "Pattern Detection"], icon: ScanLine },
  { title: "Speak Wise AI", sub: "AI-Powered Speech Assistant", desc: "A Python speech assistant for voice-based interaction, integrating Speech Recognition, TTS and AI APIs for context-aware responses.", tech: ["Python", "Speech Recognition", "TTS", "AI APIs"], icon: AudioLines },
];
function Cursor() {
  const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = -100, y = -100, rx = -100, ry = -100, frame = 0;
    const move = (event: PointerEvent) => { x = event.clientX; y = event.clientY; setHover(event.target instanceof Element && !!event.target.closest("a,button,.motion-surface")); };
    const loop = () => { rx += (x - rx) * .15; ry += (y - ry) * .15; if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`; if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`; frame = requestAnimationFrame(loop); };
    window.addEventListener("pointermove", move); loop();
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(frame); };
  }, []);
  return <div aria-hidden="true" className="custom-cursor pointer-events-none fixed inset-0 z-[100]"><div ref={ring} className="absolute left-0 top-0"><div className={`cursor-ring ${hover ? "is-hover" : ""}`} /></div><div ref={dot} className="absolute left-0 top-0"><div className="cursor-dot" /></div></div>;
}
function Magnetic({ children, href, variant = "solid" }: { children: ReactNode; href: string; variant?: "solid" | "ghost" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (event: MouseEvent) => { const element = ref.current; if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const r = element.getBoundingClientRect(); element.style.transform = `translate(${(event.clientX - r.left - r.width / 2) * .14}px,${(event.clientY - r.top - r.height / 2) * .14}px)`; };
  return <Button asChild variant={variant === "solid" ? "default" : "outline"} className={`magnetic h-auto rounded-full px-6 py-3.5 ${variant === "solid" ? "bg-ember" : "glass"}`}><a ref={ref} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onMouseMove={move} onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }}>{children}</a></Button>;
}
function SectionTitle({ k, title }: { k: string; title: string }) {
  return <div className="reveal mb-10 md:mb-12"><p className="mb-3 font-display text-sm uppercase text-primary">{k}</p><h2 data-scramble className="text-4xl font-bold md:text-6xl">{title}</h2></div>;
}
function Index() {
  usePortfolioMotion();
  useInteractiveExtras();
  return <div className="relative"><Cursor /><AmbientField /><div className="scroll-progress" aria-hidden="true" />
    <header className="fixed inset-x-0 top-4 z-40 mx-auto flex w-[min(94%,1040px)] items-center justify-between rounded-full glass px-5 py-3">
      <a href="#top" className="font-display text-lg font-bold" aria-label="Back to top">YN<span className="text-primary">/</span></a>
      <nav aria-label="Portfolio sections" className="hidden gap-6 text-sm text-muted-foreground md:flex">{["about", "projects", "skills", "resume", "contact"].map(n => <a key={n} href={`#${n}`} className="nav-link capitalize">{n === "skills" ? "Tech Stack" : n}</a>)}</nav>
      <Button asChild size="sm" className="rounded-full bg-ember"><a href={LINKS.email}><Mail />Hire me</a></Button>
    </header>
    <section id="top" className="portfolio-hero relative px-6">
      <div className="hero-layout mx-auto w-full max-w-6xl">
        <MotionSurface className="hero-copy" strength={2}>
          <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground"><span className="status-dot" />Open to internship opportunities</div>
          <h1 className="hero-name font-bold"><span>YASH</span><span className="text-ember">NEMA</span></h1>
          <div className="role-badge font-display"><span aria-hidden="true" className="role-marker">&lt;/&gt;</span><span>Developer <span className="role-divider">/</span> Problem Solver <span className="role-divider">/</span> CSBS Student</span></div>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">Aspiring Full-Stack Developer turning ideas into <RotatingWord words={["practical", "user-focused", "intelligent", "scalable"]} /> applications.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Magnetic href="#projects">View projects<ArrowUpRight /></Magnetic><Magnetic href={LINKS.github} variant="ghost"><Github />GitHub</Magnetic></div>
        </MotionSurface>
        <MotionSurface className="portrait-surface" strength={36} trackViewport>
          <div className="portrait-frame"><div className="portrait-topline"><span>YN / PROFILE</span><span className="status-dot" /></div><div className="portrait-image"><img src={photo} alt="Yash Nema" /></div><div className="portrait-caption"><span>YASH NEMA</span><span className="text-primary" aria-hidden="true">&lt;/&gt;</span></div></div>
          <span className="portrait-corner corner-top" aria-hidden="true" /><span className="portrait-corner corner-bottom" aria-hidden="true" />
        </MotionSurface>
      </div>
      <a href="#about" className="hero-scroll text-muted-foreground"><ArrowDown size={16} /><span>Scroll to explore</span></a>
    </section>
    <div className="relative overflow-hidden border-y py-5"><div className="flex w-max animate-marquee gap-10 font-display text-2xl font-bold text-muted-foreground/50 md:text-4xl">{[...Array(2)].flatMap((_, i) => ["Full-Stack", "✦", "C++", "✦", "AI Systems", "✦", "React", "✦", "Problem Solving", "✦"].map((w, j) => <span key={`${i}-${j}`}>{w}</span>))}</div></div>
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
      <SectionTitle k="01 / About" title="Building with purpose." />
      <div className="grid gap-10 md:grid-cols-5"><MotionSurface className="reveal md:col-span-3" strength={2}><p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">I'm a <span className="text-foreground">third-year Computer Science and Business Systems (CSBS)</span> student who enjoys turning ideas into practical, user-focused applications — from designing intuitive interfaces to building reliable backend systems. Passionate about real-world projects, exploring new technologies and sharpening problem-solving skills, with a keen interest in <span className="text-primary">C++ and system-level programming</span>.</p></MotionSurface>
      <div className="reveal grid gap-4 md:col-span-2">{[["3rd", "Year CSBS"], ["3+", "AI-driven projects"], ["14+", "Technologies"]].map(([a,b]) => <MotionSurface key={b} className="glass interactive-card rounded-lg p-5"><div className="font-display text-3xl font-bold text-ember">{a}</div><div className="mt-1 text-sm text-muted-foreground">{b}</div></MotionSurface>)}</div></div>
    </section>
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-20 md:py-24">
      <SectionTitle k="02 / Projects" title="Selected work." />
      <div className="grid gap-6">{PROJECTS.map((p, index) => <div key={p.title} className={`reveal project-${index}`} style={{ transitionDelay: `${index * 90}ms` }}><MotionSurface className="group glass interactive-card project-card rounded-lg p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-[130px_1fr_auto] md:items-start"><div className="project-symbol"><span className="font-display text-xs text-muted-foreground">PROJECT / 0{index + 1}</span><p.icon aria-hidden="true" /></div>
          <div><h3 className="text-3xl font-bold md:text-4xl">{p.title}</h3><p className="mt-2 text-primary">{p.sub}</p><p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{p.desc}</p><div className="mt-5 flex flex-wrap gap-2">{p.tech.map(t => <span key={t} className="project-tag rounded-md border bg-secondary/60 px-2.5 py-1 font-display text-xs text-muted-foreground">{t}</span>)}</div></div>
          <Button asChild variant="outline" size="icon" className="project-link h-12 w-12 rounded-full" title="View Yash’s GitHub profile"><a href={LINKS.github} target="_blank" rel="noreferrer" aria-label={`View GitHub profile for ${p.title}`}><ArrowUpRight /></a></Button>
        </div>
      </MotionSurface></div>)}</div>
    </section>
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-20 md:py-24"><SectionTitle k="03 / Tech Stack" title="Tools of the trade." /><TechStack /></section>
    <section id="resume" className="relative mx-auto max-w-6xl px-6 py-20 md:py-24"><SectionTitle k="04 / Resume" title="My resume." /><div className="reveal glass mx-auto max-w-3xl overflow-hidden rounded-lg p-3"><img src={resume.url} alt="Yash Nema resume" className="w-full rounded-md" loading="lazy" /></div><div className="mt-8 text-center"><Magnetic href={resume.url}>Open full resume<ArrowUpRight /></Magnetic></div></section>
    <section id="contact" className="relative overflow-hidden px-6 py-24 md:py-32"><div className="reveal relative mx-auto max-w-4xl text-center"><p className="mb-4 font-display text-sm uppercase text-primary">05 / Contact</p><h2 className="text-5xl font-bold md:text-8xl">Let's build<br /><span className="text-ember">something.</span></h2><a href={LINKS.email} className="contact-email mt-10 inline-block font-display text-lg text-muted-foreground transition-colors hover:text-primary md:text-3xl">nemayash05@gmail.com</a><div className="mt-10 flex flex-wrap justify-center gap-4"><Magnetic href={LINKS.email}><Mail />Email me</Magnetic><Magnetic href={LINKS.linkedin} variant="ghost">LinkedIn</Magnetic><Magnetic href={LINKS.github} variant="ghost"><Github />GitHub</Magnetic></div></div></section>
    <footer className="relative border-t px-6 py-8 text-center text-sm text-muted-foreground">© 2026 Yash Nema</footer>
  </div>;
}
