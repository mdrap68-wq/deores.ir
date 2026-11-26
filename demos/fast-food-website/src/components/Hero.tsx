import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { scrollToId } from "../lib/scroll";
import { ChevronDown } from "lucide-react";
import { faDigits } from "../lib/format";

const EXPLODED = `${import.meta.env.BASE_URL}images/burger-exploded.webp`;

/**
 * Clip bands of the exploded photo. `target` = assembled center (%).
 * `lag` rises top→bottom so layers and the left labels land in order.
 */
interface LayerDef {
  name: string;
  top: number;
  bot: number;
  center: number;
  target: number;
  lag: number;
  spin: number;
  drift: { ax: number; ay: number; ar: number; s1: number; s2: number; s3: number };
}

/**
 * Clip bands hug opaque food (from the exploded WebP). Targets chain so each
 * layer's content body nests ~3.8–4.5% into the one above — same feel as the
 * working top stack (bun→lettuce→tomato→cheese). Lower cheese ("سس") drips
 * must land on the patty; patty must sit flush on the bottom bun.
 */
const LAYERS: LayerDef[] = [
  {
    name: "نان بریوش",
    top: 3.2, bot: 15.2, center: 9.2, target: 35.2, lag: 0.0, spin: -3.5,
    drift: { ax: 3, ay: 5, ar: 0.9, s1: 0.8, s2: 0.65, s3: 0.5 },
  },
  {
    name: "کاهوی تازه",
    top: 19.2, bot: 28.5, center: 23.85, target: 41.9, lag: 0.05, spin: 4,
    drift: { ax: 8, ay: 4, ar: 1.4, s1: 1.1, s2: 0.9, s3: 0.7 },
  },
  {
    name: "گوجه تازه",
    top: 32.6, bot: 39.5, center: 36.05, target: 45.8, lag: 0.1, spin: -5,
    drift: { ax: 7, ay: 7, ar: 1, s1: 0.95, s2: 1.05, s3: 0.8 },
  },
  {
    // include full drip tips (body ends ~50.5, drips to ~54.7)
    name: "پنیر چدار",
    top: 44.2, bot: 54.8, center: 49.5, target: 49.6, lag: 0.15, spin: 5,
    drift: { ax: 2, ay: 3, ar: 2.4, s1: 0.7, s2: 0.85, s3: 0.6 },
  },
  {
    // lower melted cheese — drips hang onto the patty face
    name: "سس مخصوص",
    top: 57.9, bot: 66.7, center: 62.3, target: 48.8, lag: 0.2, spin: 0,
    drift: { ax: 3, ay: 4, ar: 1, s1: 0.9, s2: 0.75, s3: 0.65 },
  },
  {
    // deep under cheese body so center doesn't flash black between drips
    name: "گوشت گریل‌شده",
    top: 69.5, bot: 80.0, center: 74.75, target: 47.2, lag: 0.25, spin: -2.5,
    drift: { ax: 1.5, ay: 3, ar: 0.5, s1: 0.5, s2: 0.55, s3: 0.45 },
  },
  {
    // sit under the patty — do not nest into the meat
    name: "نان",
    top: 83.3, bot: 94.9, center: 89.1, target: 55.8, lag: 0.3, spin: 2.5,
    drift: { ax: 2, ay: 5, ar: 0.8, s1: 0.6, s2: 0.7, s3: 0.5 },
  },
];

/** Soft top→bottom assembly windows on the scrub timeline (0–1). */
const LAYER_MOVE = { startBase: 0.08, lagScale: 0.5, duration: 0.55 };

/**
 * Checklist / mobile-label beats only — spread evenly across the pin scrub
 * so labels don't all light up in a clump at the end. Does not drive burger motion.
 */
const CHECKLIST_BEATS = { start: 0.05, end: 0.82 };

const WORDS = [
  {
    text: "همه‌چی",
    // website (lg+) absolute only — hidden below lg via parent
    cls: "lg:absolute lg:top-[16%] lg:right-[8%] lg:max-w-none lg:text-[7.2vw] lg:leading-[0.95]",
    dist: -70,
  },
  {
    text: "از یه لقمه",
    cls: "text-sand lg:absolute lg:top-[40%] lg:right-[14%] lg:max-w-none lg:text-[4.5vw] lg:leading-[0.95]",
    dist: -120,
  },
  {
    text: "شروع میشه.",
    cls: "lg:absolute lg:top-[58%] lg:right-[8%] lg:max-w-none lg:text-[7.2vw] lg:leading-[0.95]",
    dist: -100,
  },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const stage = stageRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const layerEls = gsap.utils.toArray<HTMLElement>(".burger-layer");
      const drifters = gsap.utils.toArray<HTMLElement>(".burger-drift");
      const checklist = gsap.utils.toArray<HTMLElement>(".check-item");
      const counter = root.querySelector<HTMLElement>(".check-counter");

      const layerWindow = (i: number) => {
        const start = LAYER_MOVE.startBase + LAYERS[i].lag * LAYER_MOVE.lagScale;
        return { start, end: start + LAYER_MOVE.duration };
      };

      /** Even slots for the 7 labels across the whole scrub (independent of layer motion). */
      const checkWindow = (i: number) => {
        const n = LAYERS.length;
        const span = (CHECKLIST_BEATS.end - CHECKLIST_BEATS.start) / n;
        const start = CHECKLIST_BEATS.start + i * span;
        return { start, end: start + span };
      };

      const placeAssembled = () => {
        layerEls.forEach((el, i) => {
          const L = LAYERS[i];
          gsap.set(el, {
            y: ((L.target - L.center) / 100) * stage.offsetHeight,
            rotation: 0,
            scale: 1,
            scaleY: i === 4 || i === 5 ? 1.06 : 1,
            autoAlpha: 1,
          });
        });
        gsap.set(stage, { y: 0 });
      };

      const syncChecklist = (p: number) => {
        progressRef.current = p;
        let doneCount = 0;

        LAYERS.forEach((_, i) => {
          const { end } = checkWindow(i);
          const done = p >= end;
          if (done) doneCount += 1;
          checklist[i]?.classList.toggle("is-done", done);
        });

        let activeIdx = LAYERS.findIndex((_, i) => {
          const { start, end } = checkWindow(i);
          return p >= start && p < end;
        });
        if (activeIdx < 0) {
          activeIdx = p < CHECKLIST_BEATS.start ? 0 : LAYERS.length - 1;
        }

        checklist.forEach((el, i) => {
          el?.classList.toggle("is-active", i === activeIdx && !el.classList.contains("is-done"));
        });

        if (counter) {
          counter.textContent = `${faDigits(String(doneCount).padStart(2, "0"))} / ${faDigits("07")}`;
        }
      };

      if (reduce) {
        placeAssembled();
        gsap.set(".hero-end", { autoAlpha: 1, y: 0 });
        gsap.set(".hero-word .rise", { y: 0 });
        gsap.set(".hero-hint", { autoAlpha: 0 });
        gsap.set(".hero-checklist", { autoAlpha: 0 });
        syncChecklist(1);
        return;
      }

      // ——— intro
      gsap.set(".hero-word .rise", { yPercent: 118 });
      gsap.set(layerEls, {
        rotation: (i) => LAYERS[i].spin * 0.55,
        scale: 1.02,
        autoAlpha: 0,
      });
      gsap.set(".hero-end", { autoAlpha: 0, y: 36 });
      gsap.set(".hero-meta", { autoAlpha: 0, y: -14 });

      const intro = gsap.timeline({ delay: 0.15 });
      intro
        .to(layerEls, {
          autoAlpha: 1,
          duration: 1.15,
          stagger: 0.08,
          ease: "power2.out",
        }, 0.1)
        .to(".hero-word .rise", {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.09,
          ease: "power4.out",
        }, 0.3)
        .fromTo(".hero-hint", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.75 }, 1.05)
        .to(".hero-meta", { autoAlpha: 1, y: 0, duration: 0.65 }, 0.85);

      // ——— main scrub: soft top→bottom build, no photo swap
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onUpdate: () => syncChecklist(tl.progress()),
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 3.6)}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(".hero-word", {
        yPercent: (i) => WORDS[i]?.dist ?? -80,
        autoAlpha: 0,
        stagger: 0.04,
        duration: 0.26,
        ease: "power2.in",
      }, 0.03);
      tl.to(".hero-hint", { autoAlpha: 0, y: -16, duration: 0.1 }, 0.02);
      tl.to(".hero-meta", { autoAlpha: 0, y: -12, duration: 0.1 }, 0.04);

      // each ingredient floats home — soft ease, flat landing
      layerEls.forEach((el, i) => {
        const L = LAYERS[i];
        const { start } = layerWindow(i);
        // fatten cheese/patty only — never the bottom bun (avoids sinking into meat)
        const fatten = i === 4 || i === 5 ? 1.06 : 1;
        tl.to(el, {
          y: () => ((L.target - L.center) / 100) * stage.offsetHeight,
          rotation: 0,
          scaleX: 1,
          scaleY: fatten,
          duration: LAYER_MOVE.duration,
          ease: "power3.inOut",
        }, start);
      });

      // gentle settle — no vertical lift (CTA is left column, not bottom bar)
      const settleAt = 0.78;
      tl.to(stage, {
        y: () => (window.matchMedia("(min-width: 1024px)").matches ? Math.min(8, stage.offsetHeight * 0.01) : 0),
        duration: 0.16,
        ease: "power2.out",
      }, settleAt);

      // checklist fully out before CTA — same left column, no temporal merge
      tl.to(".hero-checklist", { autoAlpha: 0, duration: 0.1, ease: "power1.out" }, 0.78);
      tl.to(".hero-end", { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.9);

      // idle drift only while exploded
      const phases = drifters.map(() => [Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28]);
      let driftIdle = false;
      const tick = () => {
        const p = progressRef.current;
        const damp = Math.max(0, 1 - p * 2.4);
        if (damp === 0 && driftIdle) return;
        driftIdle = damp === 0;
        const t = gsap.ticker.time;
        drifters.forEach((el, i) => {
          const d = LAYERS[i].drift;
          const [p1, p2, p3] = phases[i];
          const x = Math.sin(t * d.s1 + p1) * d.ax * damp;
          const y = Math.cos(t * d.s2 + p2) * d.ay * damp;
          const r = Math.sin(t * d.s3 + p3) * d.ar * damp;
          el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${r}deg)`;
        });
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      aria-label="بایت — برگر دست‌ساز"
      className="relative h-[100svh] overflow-hidden bg-ink"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-[42%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 lg:left-[62%] lg:top-1/2"
        style={{ background: "radial-gradient(closest-side, rgba(121,32,48,0.28), rgba(121,32,48,0.08) 55%, transparent 75%)" }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(130% 100% at 50% 42%, transparent 58%, rgba(0,0,0,0.5) 100%)" }} />

      {/* headline: website (lg+) only — app/mobile below lg has no slogan */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
        {WORDS.map((w) => (
          <h1 key={w.text} className={`hero-word font-black text-paper ${w.cls}`}>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="rise block will-change-transform">{w.text}</span>
            </span>
          </h1>
        ))}
      </div>

      <p className="hero-meta absolute right-[10%] top-[7%] z-20 hidden max-w-44 text-xs font-medium leading-6 text-fog lg:block">
        فست‌فود دست‌ساز تهرانی
        <br />
        <span className="text-sand">از ۱۴۰۲</span>
      </p>

      {/* burger stage — centered above end CTA on mobile; website right column on lg+ */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pt-[1svh] pb-[30svh] sm:pb-[28svh] lg:justify-start lg:px-0 lg:pb-0 lg:pr-[26%] lg:pt-0">
        <div ref={stageRef} className="relative h-[min(50svh,380px)] w-auto min-[390px]:h-[min(52svh,400px)] md:h-[72svh] md:max-h-none lg:h-[82svh] will-change-transform">
          <img
            src={EXPLODED}
            alt=""
            aria-hidden
            className="pointer-events-none invisible block h-full w-auto"
            fetchPriority="high"
          />
          {LAYERS.map((l, i) => (
            <div
              key={l.name}
              className="burger-layer absolute inset-0 will-change-transform"
              style={{
                // 4% side inset — keep cheese drips; WebP alpha clears the plate
                clipPath: `inset(${l.top}% 4% ${Math.max(0, 100 - l.bot)}% 4%)`,
                zIndex: 40 - i,
              }}
            >
              <div className="burger-drift absolute inset-0 will-change-transform">
                <img
                  src={EXPLODED}
                  alt={i === 0 ? "برگر لایه‌باز بایت" : ""}
                  aria-hidden={i !== 0}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-fill"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* checklist: left of centered burger */}
      <div className="hero-checklist absolute left-[2.5%] top-[40%] z-20 flex -translate-y-1/2 flex-col items-start gap-1 sm:left-[4%] lg:left-[3%] lg:top-1/2 lg:gap-3">
        <span
          className="check-counter tabular-fa mb-0.5 text-[10px] font-bold tracking-[0.2em] text-fog lg:mb-2 lg:text-[11px]"
          dir="ltr"
        >
          ۰۰ / ۰۷
        </span>
        <ul className="flex flex-col items-start space-y-1.5 lg:space-y-3">
          {LAYERS.map((l) => (
            <li
              key={l.name}
              className="check-item flex items-center gap-1.5 text-[10px] font-semibold text-fog transition-colors duration-300 lg:gap-2.5 lg:text-[11px]"
            >
              <i className="dot block h-1.5 w-1.5 shrink-0 rounded-full bg-fog/40 transition-all duration-300" />
              {l.name}
            </li>
          ))}
        </ul>
      </div>

      {/* scroll hint */}
      <div className="hero-hint absolute bottom-[max(0.85rem,env(safe-area-inset-bottom))] left-1/2 z-20 -translate-x-1/2 text-center md:bottom-[5.5%]">
        <p className="mb-1 whitespace-nowrap text-[10px] font-semibold tracking-wide text-sand sm:text-[11px] md:mb-2 md:text-sm">
          برای ساختن برگر اسکرول کن
        </p>
        <ChevronDown className="mx-auto h-3.5 w-3.5 animate-bounce text-acid sm:h-4 sm:w-4" aria-hidden />
      </div>

      {/* end CTAs — directly under burger on mobile; left column on lg+ */}
      <div className="hero-end absolute inset-x-5 top-[60%] z-30 mx-auto max-w-[20rem] text-center sm:inset-x-10 lg:inset-x-auto lg:top-1/2 lg:left-[3%] lg:mx-0 lg:max-w-none lg:w-[min(36vw,320px)] lg:-translate-y-1/2 lg:text-start">
        <p className="mb-1 text-[9px] font-bold tracking-[0.28em] text-acid sm:text-[10px] lg:mb-3 lg:text-[11px]">سیگنچر آماده‌ست</p>
        <h2 className="mb-2 text-[1.25rem] font-black leading-snug text-paper sm:text-xl lg:mb-4 lg:text-4xl xl:text-5xl">
          مستر بایت، به وقت ایران
        </h2>
        <p className="mb-3 hidden text-[11px] leading-5 text-sand sm:mb-3.5 sm:block lg:mb-6 lg:max-w-xs lg:text-sm lg:leading-7">
          برگرهای دست‌ساز، مواد تازه و طعم‌هایی که قرار نیست فراموششون کنی.
        </p>
        <div className="flex flex-row items-center justify-center gap-2 lg:flex-col lg:items-stretch xl:flex-row xl:justify-start">
          <button
            onClick={() => scrollToId("menu")}
            className="group relative flex-1 overflow-hidden rounded-full bg-acid px-4 py-3 text-[13px] font-extrabold text-ink transition-transform duration-300 hover:scale-[1.03] active:scale-95 sm:flex-none sm:px-5 lg:w-full lg:px-7 lg:text-sm xl:w-auto"
          >
            <span className="relative z-10">سفارش آنلاین</span>
            <span className="absolute inset-0 -translate-x-full bg-paper transition-transform duration-500 ease-out group-hover:translate-x-0" />
          </button>
          <button
            onClick={() => scrollToId("menu")}
            className="flex-1 rounded-full border border-paper/25 px-4 py-3 text-[13px] font-bold text-paper transition-colors duration-300 hover:border-acid hover:text-acid sm:flex-none sm:px-5 lg:w-full lg:px-7 lg:text-sm xl:w-auto"
          >
            منوی کامل
          </button>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-paper/10" />
    </section>
  );
}
