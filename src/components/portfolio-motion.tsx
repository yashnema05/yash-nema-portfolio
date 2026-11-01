import { useEffect, useRef, type ReactNode, type PointerEvent } from "react";

export function MotionSurface({ children, className = "", strength = 5 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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