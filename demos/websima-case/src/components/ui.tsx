import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", seen && "in", className)}
    >
      {children}
    </div>
  );
}

export function CountUp({ to, suffix = "", prefix = "", duration = 1600 }: { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);
  return (
    <span ref={ref} dir="ltr" className="inline-block tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <a href="#top" className={cn("flex items-center gap-2.5", className)} aria-label="وب‌سیما">
      <span className="relative grid h-10 w-10 place-items-center rounded-full bg-brand text-white shadow-lg shadow-brand/30">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6l4 12 5-9 5 9 4-12" />
        </svg>
      </span>
      <span className="flex flex-col leading-none" dir="ltr">
        <span className={cn("text-xl font-black tracking-tight", light ? "text-white" : "text-char")}>deores</span>
        <span className={cn("mt-1 text-[9px] font-medium tracking-[0.18em]", light ? "text-white/50" : "text-char/50")}>DESIGN · DEVELOP · GROW</span>
      </span>
    </a>
  );
}

export function Btn({
  children,
  variant = "brand",
  className,
  href = "#contact",
}: {
  children: ReactNode;
  variant?: "brand" | "dark" | "outline" | "outlineLight" | "light";
  className?: string;
  href?: string;
}) {
  const styles = {
    brand: "bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/25",
    dark: "bg-char text-white hover:bg-black",
    light: "bg-white text-char hover:bg-brand hover:text-white",
    outline: "border-2 border-char/15 text-char hover:border-brand hover:text-brand",
    outlineLight: "border-2 border-white/25 text-white hover:border-brand hover:text-brand",
  }[variant];
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5",
        styles,
        className
      )}
    >
      {children}
    </a>
  );
}

/** Organic wave divider. `fill` is the colour of the section *below* the wave's cut. */
export function Wave({ fill = "#1b1a19", flip = false, className }: { fill?: string; flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      aria-hidden
      className={cn("block h-[60px] w-full md:h-[110px]", flip && "rotate-180", className)}
    >
      <path
        d="M0 140V70C120 20 240 10 380 48C520 86 600 120 760 100C920 80 1000 0 1160 12C1280 21 1360 56 1440 84V140Z"
        fill={fill}
      />
    </svg>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  sub,
  dark = false,
  center = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl", center && "text-center")}>
      {eyebrow && (
        <span
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold",
            dark ? "bg-white/10 text-brand" : "bg-brand-soft text-brand-dark"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {eyebrow}
        </span>
      )}
      <h2 className={cn("text-3xl font-black leading-[1.35] md:text-5xl", dark ? "text-white" : "text-char")}>{title}</h2>
      {sub && <p className={cn("mt-5 text-base leading-8 md:text-lg", dark ? "text-white/60" : "text-char/60")}>{sub}</p>}
    </div>
  );
}
