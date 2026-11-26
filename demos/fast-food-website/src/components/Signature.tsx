import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { useCart } from "../context/CartContext";
import { toman } from "../lib/format";
import { Plus, Check } from "lucide-react";

const TAGS = [
  { label: "گوشت ۱۰۰٪ تازه", cls: "top-[16%] end-[6%] md:end-[14%]", speed: -0.55, rot: -3 },
  { label: "پنیر چدار دوبل", cls: "top-[34%] start-[4%] md:start-[12%]", speed: -0.35, rot: 2 },
  { label: "سس مخصوص بایت", cls: "bottom-[30%] end-[4%] md:end-[10%]", speed: -0.7, rot: 3 },
  { label: "نان بریوش خانگی", cls: "bottom-[18%] start-[6%] md:start-[16%]", speed: -0.45, rot: -2 },
];

const SIG_PRICE = 445_000;

export default function Signature() {
  const rootRef = useRef<HTMLElement>(null);
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // product: slow rotation + scale with scroll
      gsap.fromTo(
        ".sig-img",
        { rotation: -5, scale: 0.94, yPercent: 6 },
        {
          rotation: 4,
          scale: 1.04,
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
        }
      );
      // ghost text horizontal drift
      gsap.to(".sig-ghost", {
        xPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      // each ingredient tag at its own pace
      gsap.utils.toArray<HTMLElement>(".sig-tag").forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: 60 * Math.abs(TAGS[i].speed) / 0.55 },
          {
            yPercent: TAGS[i].speed * 160,
            ease: "none",
            scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: 1 + i * 0.25 },
          }
        );
      });
    }, rootRef.current!);
    return () => ctx.revert();
  }, []);

  const handleAdd = () => {
    add("b-mrbeef");
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <section ref={rootRef} id="signature" className="relative overflow-hidden bg-ink py-16 text-paper sm:py-24 md:py-40">
      <div className="sig-ghost pointer-events-none absolute top-[6%] end-0 select-none whitespace-nowrap sm:top-[8%]" aria-hidden>
        <span className="text-ghost text-[22vw] font-black leading-none text-paper sm:text-[18vw] md:text-[26vw]">مستر بایت</span>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-5 md:px-8">
        <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4" data-reveal>
          <span className="tabular-fa text-xs font-bold tracking-[0.25em] text-acid">۰۲</span>
          <span className="h-px w-10 bg-paper/25 sm:w-14" />
          <span className="text-xs font-semibold tracking-wide text-fog">امضادارِ منو</span>
        </div>

        <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10">
          <div className="relative z-20 order-2 md:order-1 md:col-span-5">
            <h2 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-[5.2vw]" data-reveal>
              مستر
              <br />
              بایت<span className="text-acid">.</span>
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-7 text-sand sm:mt-6 sm:text-base sm:leading-8" data-reveal>
              دو لایه گوشت صدگرمی گریل‌شده، چداری که ریش نمی‌ذاره،
              پیاز کاراملی و سسی که دستورش فقط تو آشپزخونه ماست.
              این برگر، دلیلِ وجود بایته.
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-5" data-reveal>
              <span className="tabular-fa text-center text-2xl font-black tracking-tight text-paper sm:text-start sm:text-3xl">
                {toman(SIG_PRICE)}
              </span>
              <button
                onClick={handleAdd}
                className={`group flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold transition-all duration-300 active:scale-95 sm:w-auto sm:px-7 ${
                  added ? "bg-acid text-ink" : "bg-paper text-ink hover:bg-acid"
                }`}
              >
                {added ? <Check className="h-4 w-4" strokeWidth={3} /> : <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />}
                {added ? "به سبد اضافه شد" : "همینو می‌خوام"}
              </button>
            </div>
            <p className="mt-4 text-center text-xs font-semibold text-fog sm:mt-5 sm:text-start" data-reveal>
              + سیب‌زمینی و نوشابه با پک مخصوص
            </p>
          </div>

          <div className="relative order-1 h-[300px] sm:h-[400px] md:order-2 md:col-span-7 md:h-[620px]">
            <div className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/10 md:h-[92%]" aria-hidden />
            <div className="absolute left-1/2 top-1/2 h-[64%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-paper/15" aria-hidden />
            <div className="sig-img absolute inset-0 mix-blend-screen will-change-transform" data-reveal-img>
              <img
                src={`${import.meta.env.BASE_URL}images/burger-assembled.jpg`}
                alt="مستر بایت — دبل چیزبرگر سیگنچر با سس مخصوص"
                loading="lazy"
                className="h-full w-full scale-110 object-contain sm:scale-125"
              />
            </div>

            {TAGS.map((t) => (
              <span
                key={t.label}
                className={`sig-tag absolute z-20 hidden rounded-full border border-paper/25 bg-ink/70 px-4 py-2 text-[11px] font-bold text-paper backdrop-blur-sm md:inline-flex md:text-xs ${t.cls}`}
                style={{ rotate: `${t.rot}deg` }}
                data-reveal
              >
                <i className="me-1.5 inline-block h-1.5 w-1.5 rounded-full bg-acid align-middle" aria-hidden />
                {t.label}
              </span>
            ))}
          </div>

          <div className="order-3 -mt-2 flex flex-wrap justify-center gap-2 px-1 md:hidden">
            {TAGS.map((t) => (
              <span
                key={`m-${t.label}`}
                className="rounded-full border border-paper/20 bg-ink/75 px-3 py-1.5 text-[10px] font-bold text-paper"
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
