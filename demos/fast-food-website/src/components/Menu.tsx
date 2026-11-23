import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { CATEGORIES, MENU, type CategoryId, type MenuItem } from "../data/menu";
import { useCart } from "../context/CartContext";
import { faIndex, toman } from "../lib/format";
import { Flame, Plus, Check, Star } from "lucide-react";

export default function MenuSection() {
  const { add } = useCart();
  const [cat, setCat] = useState<CategoryId>("burger");
  const [added, setAdded] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const rowsWrapRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const first = useRef(true);

  const items = MENU.filter((m) => m.cat === cat);

  // ——— tab indicator follows active tab
  useLayoutEffect(() => {
    const tabs = tabsRef.current;
    const ind = indicatorRef.current;
    if (!tabs || !ind) return;
    const active = tabs.querySelector<HTMLButtonElement>(`[data-cat="${cat}"]`);
    if (!active) return;
    gsap.to(ind, {
      x: active.offsetLeft,
      width: active.offsetWidth,
      duration: 0.55,
      ease: "power4.out",
    });
    // keep active tab in view on mobile without yanking the page
    const strip = tabs;
    const left = active.offsetLeft - (strip.clientWidth - active.offsetWidth) / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [cat]);

  // ——— rows animate in on category change (and once at mount, far offscreen)
  useLayoutEffect(() => {
    const rows = rowsWrapRef.current?.querySelectorAll(".menu-row");
    if (!rows?.length) return;
    gsap.fromTo(
      rows,
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.055, duration: 0.55, ease: "power3.out", overwrite: true, delay: first.current ? 0.1 : 0 }
    );
    first.current = false;
  }, [cat]);

  // ——— floating image preview follows cursor (fine pointers only)
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const section = rootRef.current!;
    const preview = previewRef.current!;
    const xTo = gsap.quickTo(preview, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.45, ease: "power3.out" });
    const rTo = gsap.quickTo(preview, "rotation", { duration: 0.6, ease: "power3.out" });
    let lx = 0;

    const move = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      xTo(e.clientX - r.left - 130);
      yTo(e.clientY - r.top - 170);
      rTo(gsap.utils.clamp(-7, 7, (e.clientX - lx) / 14));
      lx = e.clientX;
    };
    section.addEventListener("mousemove", move);
    return () => section.removeEventListener("mousemove", move);
  }, []);

  const showPreview = (item: MenuItem) => {
    if (!item.img) {
      gsap.to(previewRef.current, { autoAlpha: 0, scale: 0.86, duration: 0.3 });
      return;
    }
    if (previewImgRef.current && previewImgRef.current.getAttribute("src") !== item.img) {
      previewImgRef.current.src = item.img;
    }
    gsap.to(previewRef.current, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
  };

  const handleAdd = (id: string) => {
    add(id);
    setAdded(id);
    window.setTimeout(() => setAdded((a) => (a === id ? null : a)), 1100);
  };

  return (
    <section ref={rootRef} id="menu" className="relative bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-5 md:px-8 md:py-32">
        {/* heading */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6 md:mb-10" data-reveal>
          <div>
            <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4">
              <span className="tabular-fa text-xs font-bold tracking-[0.25em] text-wine">۰۱</span>
              <span className="h-px w-10 bg-ink/25 sm:w-14" />
              <span className="text-xs font-semibold tracking-wide text-clay">منو</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-7xl">چی می‌خوریم؟</h2>
          </div>
          <p className="max-w-xs text-[13px] leading-6 text-clay sm:text-sm sm:leading-7">
            نشون بده چی می‌خوای؛ عکسش خودش میاد جلوت.
            قیمتا به <span className="font-bold text-ink">تومان</span>ه.
          </p>
        </div>

        {/* category tabs */}
        <div className="sticky top-16 z-30 -mx-4 border-y border-ink/10 bg-paper/95 px-4 backdrop-blur-sm sm:-mx-5 sm:px-5 md:top-[72px] md:mx-0 md:px-0">
          <div ref={tabsRef} className="no-scrollbar relative flex gap-1 overflow-x-auto py-3 sm:py-4" role="tablist" aria-label="دسته‌بندی منو">
            <span ref={indicatorRef} className="absolute bottom-2 left-0 top-2 w-0 rounded-full bg-ink" aria-hidden />
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                data-cat={c.id}
                role="tab"
                aria-selected={cat === c.id}
                onClick={() => setCat(c.id)}
                className={`relative z-10 shrink-0 rounded-full px-3.5 py-2 text-[13px] font-bold transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${
                  cat === c.id ? "text-paper" : "text-clay hover:text-ink"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* rows */}
        <div ref={rowsWrapRef} className="relative">
          {items.map((item, i) => (
            <article
              key={item.id}
              className="menu-row group relative border-b border-ink/10"
              onMouseEnter={() => showPreview(item)}
              onMouseLeave={() => gsap.to(previewRef.current, { autoAlpha: 0, scale: 0.86, duration: 0.3 })}
            >
              <div className="flex items-center gap-3 py-4 transition-all duration-400 group-hover:ps-3 sm:gap-4 md:gap-8 md:py-7">
                {/* index */}
                <span className="tabular-fa hidden w-10 shrink-0 text-sm font-bold text-clay/70 transition-colors group-hover:text-wine sm:block">
                  {faIndex(i + 1)}
                </span>

                {/* mobile thumb */}
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="h-14 w-14 shrink-0 rounded-xl border border-ink/10 object-cover transition-transform duration-500 group-hover:scale-105 sm:h-16 sm:w-16 md:hidden"
                  />
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-wine/10 text-[10px] font-black text-wine sm:h-16 sm:w-16 md:hidden">
                    سس
                  </span>
                )}

                {/* name + desc */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3">
                    <h3 className="text-lg font-extrabold tracking-tight transition-transform duration-400 sm:text-xl md:text-3xl md:group-hover:-translate-y-0.5">
                      {item.name}
                    </h3>
                    {item.popular && (
                      <span className="flex items-center gap-1 rounded-full bg-acid px-2.5 py-1 text-[10px] font-extrabold text-ink">
                        <Star className="h-3 w-3" aria-hidden /> پرفروش
                      </span>
                    )}
                    {item.spicy && (
                      <span className="flex items-center gap-1 rounded-full border border-wine/30 px-2.5 py-1 text-[10px] font-extrabold text-wine">
                        <Flame className="h-3 w-3" aria-hidden /> تند
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 max-w-xl truncate text-[13px] leading-6 text-clay transition-colors group-hover:text-ink/70 md:whitespace-normal md:group-hover:truncate">
                    {item.desc}
                  </p>
                  <span className="tabular-fa mt-1.5 block text-base font-black sm:hidden">
                    {toman(item.price)}
                  </span>
                </div>

                {/* price */}
                <div className="hidden shrink-0 text-start sm:block">
                  <span className="tabular-fa text-lg font-black tracking-tight md:text-2xl">
                    {toman(item.price)}
                  </span>
                </div>

                {/* add */}
                <button
                  onClick={() => handleAdd(item.id)}
                  aria-label={`افزودن ${item.name} به سبد`}
                  className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 sm:h-12 sm:w-12 md:group-hover:w-28 ${
                    added === item.id
                      ? "border-acid bg-acid text-ink"
                      : "border-ink/20 text-ink hover:bg-ink hover:text-paper md:group-hover:border-ink"
                  }`}
                >
                  {added === item.id ? (
                    <Check className="h-5 w-5" strokeWidth={3} />
                  ) : (
                    <>
                      <Plus className="h-5 w-5 transition-all duration-300 md:group-hover:-translate-y-6 md:group-hover:opacity-0" />
                      <span className="absolute translate-y-6 text-xs font-extrabold opacity-0 transition-all duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                        افزودن
                      </span>
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* floating cursor preview (desktop) */}
        <div
          ref={previewRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-40 hidden w-64 rotate-[-4deg] opacity-0 will-change-transform md:block"
        >
          <div className="overflow-hidden rounded-2xl border-4 border-ink shadow-[0_30px_60px_-20px_rgba(10,8,7,0.55)]">
            <img ref={previewImgRef} src={items[0]?.img ?? ""} alt="" className="aspect-[4/5] w-full object-cover" />
          </div>
          <span className="absolute -bottom-3 end-4 rounded-full bg-acid px-3 py-1.5 text-[10px] font-black text-ink">
            آمادهٔ سفارشه
          </span>
        </div>
      </div>
    </section>
  );
}
