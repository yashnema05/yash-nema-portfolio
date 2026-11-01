import { createFileRoute } from "@tanstack/react-router";
import photo from "@/assets/yash.jpeg.asset.json";
import resume from "@/assets/resume.png.asset.json";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yash Nema — Full-Stack Developer Portfolio" },
      { name: "description", content: "Yash Nema: CSBS student, aspiring full-stack developer. Projects in AI, OCR, AML and speech." },
      { property: "og:title", content: "Yash Nema — Full-Stack Developer Portfolio" },
      { property: "og:description", content: "Projects, skills and resume of Yash Nema." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const LINKS = {
  linkedin: "https://www.linkedin.com/in/yash-nema-421bb7336",
  github: "https://github.com/yashnema05",
  email: "mailto:nemayash05@gmail.com",
};

const SKILLS = [
  { group: "Programming", items: ["C++", "C", "Python", "SQL", "JavaScript", "TypeScript"] },
  { group: "Frontend", items: ["HTML", "CSS", "React.js"] },
  { group: "Backend & Database", items: ["Node.js", "Express.js", "MongoDB"] },
  { group: "Tools & Design", items: ["Git", "GitHub", "VS Code", "Canva", "Figma"] },
];

const PROJECTS = [
  {
    n: "01",
    title: "BorderShield",
    sub: "AI-Based Fake Identity & Document Screening System",
    desc: "An AI-powered system for identity and travel document verification using OCR, tampering detection, and face verification.",
    tech: ["Streamlit", "OpenCV", "YuNet", "RapidOCR", "Pydantic", "NumPy", "Pandas"],
  },
  {
    n: "02",
    title: "TRINETRA",
    sub: "Money Laundering Pattern Detection",
    desc: "An AML platform that detects suspicious patterns in financial transactions, identifies unusual behavior, and supports early detection of high-risk activities.",
    tech: ["Python", "Data Analysis", "Pattern Detection"],
  },
  {
    n: "03",
    title: "Speak Wise",
    sub: "AI-Powered Speech Assistant",
    desc: "A Python speech assistant for voice-based interaction, integrating Speech Recognition, TTS and AI APIs for context-aware responses.",
    tech: ["Python", "Speech Recognition", "TTS", "AI APIs"],
  },
];

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-hover]"));
    };
    const loop = () => {
      rx += (x - rx) * 0.15; ry += (y - ry) * 0.15;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    loop();
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block">
      <div ref={ring} className="absolute left-0 top-0">
        <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-primary transition-all duration-300 ${hover ? "h-16 w-16 bg-primary/15 shadow-[0_0_40px_var(--primary)]" : "h-9 w-9"}`} />
      </div>
      <div ref={dot} className="absolute left-0 top-0">
        <div className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]" />
      </div>
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const f = () => setY(window.scrollY);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return y;
}

function Magnetic({ children, href, variant = "solid" }: { children: ReactNode; href: string; variant?: "solid" | "ghost" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  };
  const base = "inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium transition-[transform,box-shadow,background] duration-300 ease-out";
  const v = variant === "solid"
    ? "bg-ember text-primary-foreground hover:shadow-[0_0_40px_-5px_var(--primary)]"
    : "glass text-foreground hover:border-primary";
  return (
    <a ref={ref} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      onMouseMove={onMove} onMouseLeave={() => (ref.current!.style.transform = "")} className={`${base} ${v}`}>
      {children}
    </a>
  );
}

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    ref.current!.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 10}deg)`;
    ref.current!.style.setProperty("--mx", `${px * 100}%`);
    ref.current!.style.setProperty("--my", `${py * 100}%`);
  };
  return (
    <div ref={ref} data-hover onMouseMove={onMove} onMouseLeave={() => (ref.current!.style.transform = "")}
      className="group glass relative overflow-hidden rounded-2xl p-8 transition-transform duration-300 ease-out hover:border-primary/50">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(400px circle at var(--mx) var(--my), color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionTitle({ k, title }: { k: string; title: string }) {
  return (
    <div className="reveal mb-14">
      <p className="mb-3 font-display text-sm uppercase tracking-[0.3em] text-primary">{k}</p>
      <h2 className="text-4xl font-bold md:text-6xl">{title}</h2>
    </div>
  );
}

function Index() {
  useReveal();
  const y = useScrollY();
  const nav = ["about", "skills", "projects", "resume", "contact"];

  return (
    <div className="relative">
      <Cursor />
      <div className="fixed left-0 top-0 z-50 h-0.5 bg-ember" style={{ width: `calc(${typeof document !== "undefined" ? (y / Math.max(1, document.body.scrollHeight - innerHeight)) * 100 : 0}%)` }} />

      <header className="fixed inset-x-0 top-4 z-40 mx-auto flex w-[min(94%,960px)] items-center justify-between rounded-full glass px-5 py-3">
        <a href="#top" className="font-display text-lg font-bold">YN<span className="text-primary">.</span></a>
        <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
          {nav.map((n) => (
            <a key={n} href={`#${n}`} className="relative capitalize transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full">{n}</a>
          ))}
        </nav>
        <a href={LINKS.email} className="rounded-full bg-ember px-4 py-1.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105">Hire me</a>
      </header>

      {/* HERO */}
      <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6">
        <div className="grid-bg absolute inset-0" style={{ transform: `translateY(${y * 0.3}px)` }} />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/30 blur-[120px] animate-float" style={{ translate: `0 ${y * 0.5}px` }} />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-ember-glow/20 blur-[120px] animate-float" style={{ translate: `0 ${-y * 0.3}px`, animationDelay: "2s" }} />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.4fr_1fr]" style={{ transform: `translateY(${y * 0.15}px)`, opacity: Math.max(0, 1 - y / 700) }}>
          <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Open to internship opportunities
          </div>
          <h1 className="text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-[9rem] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Yash<br /><span className="text-ember">Nema.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl animate-in fade-in duration-1000 delay-300 fill-mode-both">
            Aspiring Full-Stack Developer turning ideas into practical, user-focused applications.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-in fade-in duration-1000 delay-500 fill-mode-both">
            <Magnetic href="#projects">View projects →</Magnetic>
            <Magnetic href={LINKS.github} variant="ghost">GitHub</Magnetic>
          </div>
          </div>
          <div className="relative mx-auto w-64 md:w-full animate-float">
            <div className="absolute -inset-3 rounded-[2rem] bg-ember opacity-40 blur-2xl" />
            <img src={photo.url} alt="Yash Nema" className="relative aspect-[4/5] w-full rounded-[2rem] border object-cover" />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Scroll ↓</div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y py-6">
        <div className="flex w-max animate-marquee gap-12 font-display text-3xl font-bold text-muted-foreground/40 md:text-5xl">
          {[...Array(2)].flatMap((_, i) => ["Full-Stack", "✦", "C++", "✦", "AI Systems", "✦", "React", "✦", "Problem Solving", "✦"].map((w, j) => <span key={`${i}${j}`}>{w}</span>))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="relative mx-auto max-w-6xl px-6 py-32">
        <SectionTitle k="01 / About" title="Building with purpose." />
        <div className="grid gap-10 md:grid-cols-5">
          <p className="reveal text-xl leading-relaxed text-muted-foreground md:col-span-3 md:text-2xl">
            I'm a <span className="text-foreground">third-year Computer Science and Business Systems (CSBS)</span> student who enjoys turning ideas into practical, user-focused applications — from designing intuitive interfaces to building reliable backend systems. Passionate about real-world projects, exploring new technologies and sharpening problem-solving skills, with a keen interest in <span className="text-primary">C++ and system-level programming</span>.
          </p>
          <div className="reveal grid gap-4 md:col-span-2" style={{ transform: `translateY(${(y - 900) * -0.08}px)` }}>
            {[["3rd", "Year CSBS"], ["3+", "AI-driven projects"], ["14+", "Technologies"]].map(([a, b]) => (
              <div key={b} data-hover className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                <div className="font-display text-4xl font-bold text-ember">{a}</div>
                <div className="mt-1 text-sm text-muted-foreground">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative mx-auto max-w-6xl px-6 py-32">
        <SectionTitle k="02 / Skills" title="Tech stack." />
        <div className="grid gap-6 sm:grid-cols-2">
          {SKILLS.map((s, i) => (
            <div key={s.group} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <TiltCard>
                <h3 className="mb-5 text-xl font-semibold">{s.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((t) => (
                    <span key={t} className="rounded-full border bg-secondary/60 px-3.5 py-1.5 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary">{t}</span>
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative mx-auto max-w-6xl px-6 py-32">
        <SectionTitle k="03 / Projects" title="Selected work." />
        <div className="grid gap-8">
          {PROJECTS.map((p) => (
            <div key={p.n} className="reveal">
              <TiltCard>
                <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-start">
                  <span className="font-display text-5xl font-bold text-ember md:text-7xl">{p.n}</span>
                  <div>
                    <h3 className="text-3xl font-bold md:text-4xl">{p.title}</h3>
                    <p className="mt-1 text-primary">{p.sub}</p>
                    <p className="mt-4 max-w-2xl text-muted-foreground">{p.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tech.map((t) => <span key={t} className="rounded-md bg-secondary px-2.5 py-1 font-display text-xs text-muted-foreground">{t}</span>)}
                    </div>
                  </div>
                  <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`}
                    className="grid h-14 w-14 place-items-center rounded-full border text-xl transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">↗</a>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="relative mx-auto max-w-6xl px-6 py-32">
        <SectionTitle k="04 / Resume" title="My resume." />
        <div className="reveal glass mx-auto max-w-3xl overflow-hidden rounded-2xl p-3">
          <img src={resume.url} alt="Yash Nema resume" className="w-full rounded-xl" />
        </div>
        <div className="mt-8 text-center"><Magnetic href={resume.url}>Open full resume ↗</Magnetic></div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden px-6 py-40">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[140px]" />
        <div className="reveal relative mx-auto max-w-4xl text-center">
          <p className="mb-4 font-display text-sm uppercase tracking-[0.3em] text-primary">05 / Contact</p>
          <h2 className="text-5xl font-bold md:text-8xl">Let's build<br /><span className="text-ember">something.</span></h2>
          <a href={LINKS.email} className="mt-10 inline-block font-display text-xl text-muted-foreground transition-colors hover:text-primary md:text-3xl">nemayash05@gmail.com</a>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Magnetic href={LINKS.email}>Email me</Magnetic>
            <Magnetic href={LINKS.linkedin} variant="ghost">LinkedIn</Magnetic>
            <Magnetic href={LINKS.github} variant="ghost">GitHub</Magnetic>
          </div>
        </div>
      </section>

      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">© 2026 Yash Nema</footer>
    </div>
  );
}
