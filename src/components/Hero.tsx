import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slides } from "../data";
import { GhostBtn, PrimaryBtn } from "./Chrome";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);
  const firstRun = useRef(true);
  const touchX = useRef(0);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-rule", { scaleX: 0, duration: 0.9, transformOrigin: "right center" })
        .from(".hero-eyebrow", { y: 12, autoAlpha: 0, duration: 0.5 }, "-=0.6")
        .from(".hero-line > span", { yPercent: 112, duration: 1, stagger: 0.07, ease: "power4.out" }, "-=0.28")
        .from(".hero-num", { yPercent: 26, autoAlpha: 0, duration: 1.15, ease: "power3.out" }, "-=1.05")
        .from(".hero-stage", { autoAlpha: 0, scale: 1.055, duration: 1.15, ease: "power3.out" }, "-=1.05")
        .from(".hero-sub", { y: 18, autoAlpha: 0, duration: 0.7 }, "-=0.85")
        .from(".hero-cta > *", { y: 16, autoAlpha: 0, duration: 0.55, stagger: 0.09 }, "-=0.5")
        .from(".hero-ctrl", { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.08 }, "-=0.35")
        .from(".hero-card", { autoAlpha: 0, y: 26, duration: 0.75 }, "-=0.75");

      gsap.fromTo(
        ".hero-parallax-img",
        { yPercent: 3 },
        {
          yPercent: -3,
          ease: "none",
          scrollTrigger: { trigger: root.current!, start: "top top", end: "bottom top", scrub: 0.6 },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  // slide transitions
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || firstRun.current) {
      firstRun.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(".slide-img");
      layers.forEach((el, i) => {
        if (i === index) {
          gsap.fromTo(
            el,
            { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)", scale: 1.05 },
            { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.95, ease: "power3.inOut" },
          );
        } else {
          gsap.to(el, { autoAlpha: 0, duration: 0.35, ease: "power1.out" });
        }
      });

      gsap.fromTo(
        ".hero-num",
        { yPercent: 16, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out" },
      );
      gsap.fromTo(
        ".slide-copy > *",
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.065, ease: "power3.out" },
      );
    }, root);

    return () => ctx.revert();
  }, [index]);

  // autoplay — pauses for reduced motion and background tabs
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % slides.length);
    }, 7200);
    return () => window.clearInterval(id);
  }, []);

  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);
  const slide = slides[index];

  return (
    <section id="home" ref={root} className="relative pt-[86px] md:pt-[118px]">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="hero-rule h-px w-full bg-graphite/15" />

        <div className="hero-eyebrow mt-4 flex items-center gap-3">
          <span className="font-grotesk latin text-[10px] font-medium tracking-[0.32em] text-plum">01 — INTRO</span>
          <span className="h-px flex-1 bg-graphite/12" />
          <span className="text-[11.5px] text-graphite/55">استودیو توسعه محصولات دیجیتال</span>
        </div>

        <div className="relative mt-7 grid gap-9 lg:mt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* oversized engraved index numeral */}
          <div
            aria-hidden="true"
            className="hero-num engraved pointer-events-none absolute -top-[3%] right-[-2.5%] select-none font-grotesk latin text-[27vw] font-thin leading-[0.78] lg:-top-[13%] lg:right-[-1.5%] lg:text-[15rem]"
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* headline column */}
          <div className="relative z-10">
            <h1 className="text-[clamp(2.15rem,8.4vw,4.35rem)] font-black leading-[1.44] tracking-tight text-graphite">
              <span className="mask-line hero-line">
                <span>ایده‌های شما،</span>
              </span>
              <span className="mask-line hero-line">
                <span className="relative w-fit">
                  تجربه دیجیتال ما
                  <span className="absolute inset-x-0 bottom-[0.02em] h-[5px] bg-rose/75" />
                </span>
              </span>
            </h1>

            <p className="hero-sub mt-7 max-w-[48ch] text-[15px] leading-[2.15] text-graphite/68 md:text-[17px]">
              از طراحی وب‌سایت و اپلیکیشن تا توسعه سیستم‌های اختصاصی و تولید محتوای دیجیتال؛ از ایده تا اجرای حرفه‌ای همراه
              شما هستیم.
            </p>

            <div className="hero-cta mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryBtn href="#contact">مشاوره و ثبت سفارش</PrimaryBtn>
              <GhostBtn href="#work">مشاهده نمونه‌کارها</GhostBtn>
            </div>

            {/* slider controls */}
            <div className="hero-ctrl mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="اسلاید قبلی"
                  className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-graphite/18 text-graphite transition-colors hover:border-plum hover:bg-plum hover:text-paper"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="اسلاید بعدی"
                  className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-graphite/18 text-graphite transition-colors hover:border-plum hover:bg-plum hover:text-paper"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2" role="tablist" aria-label="انتخاب اسلاید">
                {slides.map((s, i) => (
                  <button
                    key={s.kicker}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`اسلاید ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className="flex items-center py-2"
                  >
                    <span
                      className={`h-[3px] rounded-[1px] transition-all duration-500 ${
                        i === index ? "w-11 bg-rose" : "w-6 bg-graphite/22 hover:bg-graphite/40"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="font-grotesk latin tnum text-[12px] tracking-[0.24em] text-graphite/55">
                {String(index + 1).padStart(2, "0")}
                <span className="text-graphite/28"> / </span>
                {String(slides.length).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* device plate */}
          <div
            className="hero-stage relative"
            onTouchStart={(e) => {
              touchX.current = e.changedTouches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 45) go(dx > 0 ? -1 : 1);
            }}
          >
            <div className="grain relative aspect-[4/3] overflow-hidden rounded-[4px] border border-graphite/12 bg-titan">
              {slides.map((s, i) => (
                <div
                  key={s.kicker}
                  className="slide-img absolute inset-0"
                  style={{ opacity: i === index ? 1 : 0, visibility: i === index ? "visible" : "hidden" }}
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    className="hero-parallax-img absolute left-0 top-[-7%] h-[114%] w-full object-cover"
                    width={1536}
                    height={1024}
                    decoding="async"
                    fetchPriority={i === 0 ? "high" : "low"}
                  />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/28 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3.5">
                <span className="rounded-[2px] bg-paper/85 px-2.5 py-1 font-grotesk latin text-[9px] font-medium tracking-[0.26em] text-graphite/70 backdrop-blur-sm">
                  {slide.kicker}
                </span>
                <span className="flex items-center gap-1.5 rounded-[2px] bg-graphite/45 px-2.5 py-1 text-[9.5px] text-paper/90 backdrop-blur-sm">
                  <span className="h-[5px] w-[5px] rounded-full bg-rose" />
                  LIVE
                </span>
              </div>
            </div>

            {/* overlapping information plane */}
            <div className="hero-card relative z-10 -mt-9 mr-3 sm:-mt-12 sm:mr-8 lg:-mt-14 lg:mr-12">
              <div className="border border-graphite/12 bg-paper/96 px-6 py-6 shadow-[0_36px_70px_-34px_rgba(37,38,45,0.45)] backdrop-blur-md sm:px-7">
                <div className="slide-copy" aria-live="polite">
                  <span className="font-grotesk latin text-[9.5px] font-medium tracking-[0.3em] text-plum">
                    SLIDE {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-[clamp(1.15rem,4.4vw,1.62rem)] font-extrabold leading-[1.6] text-graphite">
                    {slide.title}
                  </h2>
                  <p className="mt-3 text-[13.5px] leading-[2.1] text-graphite/66">{slide.desc}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-2.5 gap-y-2">
                    {slide.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-1.5 rounded-[2px] border border-graphite/12 bg-cream/70 px-2.5 py-1.5 text-[11.5px] text-graphite/72"
                      >
                        <span className="h-[5px] w-[5px] rounded-[1px] bg-rose" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* engraved capability band */}
        <div className="-mx-5 mt-16 border-y border-graphite/12 bg-cream/55 py-5 md:-mx-10 md:mt-24">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 px-5 md:gap-x-8">
            {["طراحی و توسعه وب‌سایت", "توسعه اپلیکیشن موبایل", "توسعه API و سیستم", "طراحی UI/UX", "تولید محتوای دیجیتال"].map(
              (label, i) => (
                <li key={label} className="flex items-center gap-5 md:gap-8">
                  <span className="text-[11.5px] font-semibold tracking-[0.06em] text-graphite/62 md:text-[12.5px]">
                    {label}
                  </span>
                  {i < 4 && <span className="h-[5px] w-[5px] rotate-45 bg-rose/70" />}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
