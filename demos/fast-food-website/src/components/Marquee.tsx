import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const ITEMS = [
  "گوشت تازه گریل‌شده",
  "طعمی که تو ذهنت می‌مونه",
  "سس مخصوص",
  "پنیر چدار مخصوص",
  "فقط ۱۵ دقیقه تا برگر",
  "مستر بایت",
];

function MarqueeSegment({ id }: { id: string }) {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="mq-seg flex shrink-0 items-center gap-8 whitespace-nowrap md:gap-14">
      {row.map((t, i) => (
        <span key={`${id}-${i}`} className="flex items-center gap-8 md:gap-14">
          <span className="text-xl font-black tracking-tight text-paper/90 sm:text-2xl md:text-4xl">{t}</span>
          <span className="h-2 w-2 shrink-0 rotate-45 bg-acid" aria-hidden />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const track = root.querySelector<HTMLElement>(".mq-track");
    const seg = root.querySelector<HTMLElement>(".mq-seg");
    if (!track || !seg) return;

    const ctx = gsap.context(() => {
      const distance = () => seg.offsetWidth;

      gsap.set(track, { x: 0, force3D: true });

      const loop = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -distance(),
          ease: "none",
          duration: 80,
          repeat: -1,
        }
      );

      const skewTo = gsap.quickTo(track, "skewX", { duration: 0.6, ease: "power2.out" });
      let decay: gsap.core.Tween | null = null;
      ScrollTrigger.create({
        onUpdate(self) {
          const v = self.getVelocity();
          skewTo(gsap.utils.clamp(-5, 5, v / -320));
          // keep scroll boost gentle so the strip stays readable
          loop.timeScale(gsap.utils.clamp(0.85, 1.8, 1 + Math.abs(v) / 3200));
          decay?.kill();
          decay = gsap.to(track, { skewX: 0, duration: 0.8, ease: "power2.out" });
        },
      });

      const onResize = () => {
        gsap.set(track, { x: 0 });
        loop.invalidate().restart();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        loop.kill();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    // dir=ltr on root: under page rtl a wide track anchors to the right and
    // the strip can look empty while all the copy sits off-screen
    <div
      ref={rootRef}
      aria-hidden
      dir="ltr"
      className="relative overflow-hidden border-y border-paper/10 bg-ink py-4 md:py-7"
    >
      <div className="mq-track flex w-max will-change-transform">
        <MarqueeSegment id="a" />
        <MarqueeSegment id="b" />
        <MarqueeSegment id="c" />
      </div>
    </div>
  );
}
