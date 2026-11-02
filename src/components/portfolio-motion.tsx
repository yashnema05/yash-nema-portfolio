import { useEffect, useRef, type ReactNode, type PointerEvent } from "react";

export function MotionSurface({ children, className = "", strength = 5, trackViewport = false }: { children: ReactNode; className?: string; strength?: number; trackViewport?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!trackViewport) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    let frame = 0;
    const clear = () => {
      const element = ref.current;
      if (element) ["--tilt-x", "--tilt-y", "--shift-x", "--shift-y", "--mx", "--my"].forEach(property => element.style.removeProperty(property));
    };
    const move = (event: globalThis.PointerEvent) => {
      if (reduced.matches || !fine.matches || event.pointerType !== "mouse") return;
      const x = event.clientX / window.innerWidth - .5;
      const y = event.clientY / window.innerHeight - .5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const element = ref.current;
        if (!element) return;
        element.style.setProperty("--tilt-x", `${-y * strength}deg`);
        element.style.setProperty("--tilt-y", `${x * strength}deg`);
        element.style.setProperty("--shift-x", `${x * 10}px`);
        element.style.setProperty("--shift-y", `${y * 10}px`);
        element.style.setProperty("--mx", `${(x + .5) * 100}%`);
        element.style.setProperty("--my", `${(y + .5) * 100}%`);
      });
    };
    const reset = () => { cancelAnimationFrame(frame); clear(); };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    reduced.addEventListener("change", reset);
    fine.addEventListener("change", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      reduced.removeEventListener("change", reset);
      fine.removeEventListener("change", reset);
      reset();
    };
  }, [trackViewport, strength]);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (trackViewport || !element || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty("--tilt-x", `${-y * strength}deg`);
    element.style.setProperty("--tilt-y", `${x * strength}deg`);
    element.style.setProperty("--shift-x", `${x * 5}px`);
    element.style.setProperty("--shift-y", `${y * 5}px`);
    element.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    element.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const reset = () => {
    if (trackViewport) return;
    const element = ref.current;
    if (!element) return;
    ["--tilt-x", "--tilt-y", "--shift-x", "--shift-y"].forEach((property) => element.style.removeProperty(property));
  };
  return <div ref={ref} className={`motion-surface ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</div>;
}

export function AmbientField() {
  return <div aria-hidden="true" className="ambient-field"><div className="ambient-grid" />{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ left: `${(i * 37 + 7) % 100}%`, top: `${(i * 23 + 3) % 100}%`, animationDelay: `${-i * 0.8}s`, animationDuration: `${12 + i % 8}s` }} />)}</div>;
}

export function usePortfolioMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("in"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((element) => { element.classList.add("reveal-ready"); observer.observe(element); });
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty("--scroll-progress", `${max > 0 ? window.scrollY / max * 100 : 0}%`);
        document.documentElement.style.setProperty("--ambient-offset", `${window.scrollY * -0.035}px`);
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", update); };
  }, []);
}
const GLYPHS = "!<>-_\\/[]{}=+*^?#01";
export function useInteractiveExtras() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Active section highlight in nav
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-link"));
    const spy = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === `#${e.target.id}`));
    }), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(l => { const s = document.querySelector(l.getAttribute("href") || ""); if (s) spy.observe(s); });
    if (reduced) return () => spy.disconnect();
    // Scramble headings on reveal + hover
    const scramble = (el: HTMLElement) => {
      const final = el.dataset.text ?? el.textContent ?? ""; el.dataset.text = final;
      let frame = 0; const total = 18;
      const tick = () => {
        el.textContent = final.split("").map((c, i) => c === " " || i < (frame / total) * final.length ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("");
        if (++frame <= total) requestAnimationFrame(tick); else el.textContent = final;
      };
      tick();
    };
    const heads = Array.from(document.querySelectorAll<HTMLElement>("[data-scramble]"));
    const seen = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { scramble(e.target as HTMLElement); seen.unobserve(e.target); } }), { threshold: .6 });
    const onEnter = (e: Event) => scramble(e.currentTarget as HTMLElement);
    heads.forEach(h => { seen.observe(h); h.addEventListener("pointerenter", onEnter); });
    // Click sparks
    const click = (e: globalThis.MouseEvent) => {
      const burst = document.createElement("div"); burst.className = "spark-burst"; burst.setAttribute("aria-hidden", "true");
      burst.style.left = `${e.clientX}px`; burst.style.top = `${e.clientY}px`;
      for (let i = 0; i < 10; i++) { const s = document.createElement("i"); s.style.setProperty("--a", `${i * 36}deg`); burst.appendChild(s); }
      document.body.appendChild(burst); setTimeout(() => burst.remove(), 700);
    };
    window.addEventListener("click", click);
    return () => { spy.disconnect(); seen.disconnect(); heads.forEach(h => h.removeEventListener("pointerenter", onEnter)); window.removeEventListener("click", click); };
  }, []);
}

export function RotatingWord({ words }: { words: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % words.length; const el = ref.current; if (!el) return; el.classList.remove("word-in"); void el.offsetWidth; el.textContent = words[i]; el.classList.add("word-in"); }, 2400);
    return () => clearInterval(id);
  }, [words]);
  return <span ref={ref} className="rotating-word word-in">{words[0]}</span>;
}
