import { useLayoutEffect, useRef, type ReactElement } from "react";
import { gsap } from "../lib/gsap";
import { faIndex } from "../lib/format";

interface Feature {
  title: string;
  desc: string;
  art: ReactElement;
}

const PATH = (d: string, extra?: object) => (
  <path d={d} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength={100} {...extra} />
);

const FEATURES: Feature[] = [
  {
    title: "ارسال سریع",
    desc: "میانگین ۲۵ دقیقه تا در خونه‌ت. سفارشت مسیرشو برمی‌داره، تو فقط بازش کن.",
    art: (
      <g>
        {PATH("M4 18H26")}
        {PATH("M10 26H32")}
        {PATH("M16 34H28")}
        {PATH("M34 26l6 0-4-6")}
        <circle cx="38" cy="26" r="6" fill="none" stroke="currentColor" strokeWidth="2.4" pathLength={100} />
      </g>
    ),
  },
  {
    title: "بسته‌بندی اختصاصی",
    desc: "جعبه‌ای که برگر رو تپل و سس رو حبابی نگه می‌داره. وقتی برسه، تازه از گریله.",
    art: (
      <g>
        {PATH("M8 16h32v24H8z")}
        {PATH("M8 16l6-7h20l6 7")}
        {PATH("M24 16v24")}
        {PATH("M14 9h20")}
      </g>
    ),
  },
  {
    title: "پرداخت آنلاین",
    desc: "دروازه امن بانکی، رسید لحظه‌ای. کارت‌به‌کارت و کشاله نمی‌شناسیم.",
    art: (
      <g>
        {PATH("M6 14h36v22H6z")}
        {PATH("M6 21h36")}
        {PATH("M11 29h8")}
        {PATH("M32 29h6")}
      </g>
    ),
  },
  {
    title: "تحویل حضوری",
    desc: "تیپَکس نمی‌خوای؟ ثبت کن، سر راه بیا ببر. نون داغ از فر بیرون اومده.",
    art: (
      <g>
        {PATH("M10 20h28v20H10z")}
        {PATH("M8 20l4-9h24l4 9")}
        {PATH("M8 20c0 3 3 4.5 6 4.5S20 23 20 20c0 3 3 4.5 6 4.5S32 23 32 20")}
        {PATH("M20 40V29h8v11")}
      </g>
    ),
  },
];

export default function Delivery() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<SVGSVGElement>(".draw-art").forEach((svg, idx) => {
        const shapes = svg.querySelectorAll<SVGElement>("path, circle");
        gsap.set(shapes, { strokeDasharray: 100, strokeDashoffset: 100 });
        gsap.to(shapes, {
          strokeDashoffset: 0,
          duration: 1.1,
          stagger: 0.14,
          ease: "power2.inOut",
          scrollTrigger: { trigger: svg, start: "top 82%", once: true },
          delay: idx * 0.05,
        });
      });
    }, rootRef.current!);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="delivery" className="relative bg-coal py-16 text-paper sm:py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-5 md:px-8">
        <div className="mb-10 sm:mb-14 md:mb-20">
          <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4" data-reveal>
            <span className="tabular-fa text-xs font-bold tracking-[0.25em] text-acid">۰۳</span>
            <span className="h-px w-10 bg-paper/25 sm:w-14" />
            <span className="text-xs font-semibold tracking-wide text-fog">ارسال و دریافت</span>
          </div>
          <h2 className="max-w-3xl text-3xl font-black leading-[1.2] tracking-tight sm:text-4xl md:text-6xl md:leading-[1.15]" data-reveal>
            گرسنه‌ای؟ ما هم زیاد
            <span className="text-acid"> منتظر </span>
            نمی‌ذاریم.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <article key={f.title} className="group relative bg-coal p-6 transition-colors duration-500 hover:bg-ink sm:p-7 md:p-9" data-reveal data-delay={String(i * 0.08)}>
              <div className="mb-5 flex items-start justify-between sm:mb-6">
                <svg viewBox="0 0 48 48" className="draw-art h-12 w-12 text-sand transition-colors duration-500 group-hover:text-acid sm:h-14 sm:w-14" aria-hidden>
                  {f.art}
                </svg>
                <span className="tabular-fa text-xs font-bold text-fog">{faIndex(i + 1)}</span>
              </div>
              <h3 className="text-lg font-extrabold tracking-tight sm:text-xl">{f.title}</h3>
              <p className="mt-2.5 text-[13px] leading-7 text-fog transition-colors duration-500 group-hover:text-sand sm:mt-3">
                {f.desc}
              </p>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-right scale-x-0 bg-acid transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
