import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

const TEXT =
  "ما قرار نیست بزرگ‌ترین فست‌فود شهر باشیم. فقط می‌خوایم هر چیزی که از آشپزخونه‌مون بیرون میاد، ارزشِ دوباره سفارش دادن داشته باشه.";

export default function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".mf-word");
      gsap.set(words, { opacity: 0.13 });
      gsap.to(words, {
        opacity: 1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: ".mf-copy",
          start: "top 78%",
          end: "bottom 40%",
          scrub: 0.6,
        },
      });
      // stamp slow spin
      gsap.to(".mf-stamp", {
        rotation: 14,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, rootRef.current!);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="manifesto" className="relative bg-paper py-16 text-ink sm:py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-5 md:px-8">
        <div className="mb-8 flex items-center gap-3 sm:mb-10 sm:gap-4" data-reveal>
          <span className="tabular-fa text-xs font-bold tracking-[0.25em] text-wine">۰۵</span>
          <span className="h-px w-10 bg-ink/25 sm:w-14" />
          <span className="text-xs font-semibold tracking-wide text-clay">مانیفست</span>
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <p className="mf-copy max-w-none text-[clamp(1.35rem,6.2vw,2.75rem)] font-black leading-[1.4] tracking-tight md:col-span-10 md:text-[3.6vw] md:leading-[1.4]">
            {TEXT.split(" ").map((w, i) => {
              const accent = w.includes("باشیم") || w.includes("داشته");
              return (
                <span key={i} className={`mf-word inline-block ${accent ? "text-wine" : ""}`}>
                  {w}
                  {i < TEXT.split(" ").length - 1 ? "\u00A0" : ""}
                </span>
              );
            })}
          </p>

          {/* rotating stamp */}
          <div className="mf-stamp relative mx-auto flex h-28 w-28 self-center justify-self-center sm:h-32 sm:w-32 md:col-span-2 md:mx-0 md:h-40 md:w-40 md:justify-self-center" data-reveal>
            <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
              <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-ink/30" />
              <circle cx="60" cy="60" r="42" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" className="text-wine" />
              <text x="60" y="55" textAnchor="middle" fontSize="22" fontWeight="900" className="fill-ink">
                بایت
              </text>
              <text x="60" y="74" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-wine tabular-fa">
                از ۱۴۰۲
              </text>
            </svg>
          </div>
        </div>

        <p className="mt-8 text-[13px] font-bold text-clay sm:mt-10 sm:text-sm" data-reveal>
          — سند رسمی آشپزخونه، امضاشده با سس مخصوص
        </p>
      </div>
    </section>
  );
}
