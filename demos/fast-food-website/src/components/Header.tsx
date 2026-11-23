import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { getLenis, scrollToId } from "../lib/scroll";
import { useCart } from "../context/CartContext";
import { faDigits } from "../lib/format";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";

const LINKS = [
  { id: "menu", label: "منو" },
  { id: "signature", label: "سیگنچر" },
  { id: "locations", label: "شعبه‌ها" },
];

export default function Header() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (count > 0 && badgeRef.current) {
      gsap.fromTo(badgeRef.current, { scale: 1.7 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
    }
  }, [count]);

  useEffect(() => {
    if (!overlayRef.current) return;
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      gsap.to(overlayRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
      gsap.fromTo(
        overlayRef.current.querySelectorAll(".m-link"),
        { y: 34, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.5, ease: "power3.out", delay: 0.08 }
      );
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      gsap.to(overlayRef.current, { autoAlpha: 0, y: -16, duration: 0.35, ease: "power2.in" });
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-paper/10 bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-2 px-4 sm:px-5 md:h-[72px] md:px-8">
          {/* wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="بایت — بازگشت به اول صفحه"
            className="group flex min-w-0 shrink items-baseline gap-2"
          >
            <span className="text-[24px] font-black leading-none tracking-tight text-paper transition-colors group-hover:text-acid sm:text-[26px] md:text-3xl">
              بایت
            </span>
            <span className="hidden text-[10px] font-bold tracking-[0.35em] text-fog transition-colors group-hover:text-sand sm:block">
              BITE
            </span>
          </button>

          {/* desktop nav */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="ناوبری اصلی">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="group relative text-[13px] font-semibold text-sand transition-colors hover:text-paper"
              >
                {l.label}
                <span className="absolute -bottom-1.5 right-0 h-px w-0 bg-acid transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => go("menu")}
              className="hidden rounded-full bg-acid px-5 py-2.5 text-[13px] font-extrabold text-ink transition-transform hover:scale-105 active:scale-95 lg:block"
            >
              سفارش آنلاین
            </button>

            {/* cart */}
            <button
              onClick={openCart}
              aria-label={`سبد خرید، ${faDigits(count)} قلم`}
              className="relative flex h-10 items-center gap-2 rounded-full border border-paper/20 px-3.5 text-paper transition-colors hover:border-acid hover:text-acid sm:px-4"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={2} />
              <span ref={badgeRef} className="tabular-fa text-xs font-extrabold">
                {faDigits(count)}
              </span>
            </button>

            {/* mobile menu */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منو"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper/20 text-paper md:hidden"
            >
              <MenuIcon className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        ref={overlayRef}
        className="invisible fixed inset-0 z-[60] flex -translate-y-4 flex-col bg-ink px-5 pt-[max(1.25rem,env(safe-area-inset-top))] opacity-0 sm:px-6"
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-paper">بایت</span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="بستن منو"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-10 flex flex-col gap-1 sm:mt-14 sm:gap-2" aria-label="منوی موبایل">
          {[...LINKS, { id: "delivery", label: "ارسال و پرداخت" }, { id: "manifesto", label: "مانیفست" }].map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="m-link flex items-baseline gap-3 border-b border-paper/10 py-3.5 text-start sm:gap-4 sm:py-4"
            >
              <span className="tabular-fa text-xs font-bold text-acid">{faDigits(String(i + 1).padStart(2, "0"))}</span>
              <span className="text-2xl font-black text-paper sm:text-3xl">{l.label}</span>
            </button>
          ))}
        </nav>
        <p className="m-link mt-auto pb-[max(2.5rem,env(safe-area-inset-bottom))] text-xs leading-6 text-fog">
          تهران — سعادت‌آباد / یوسف‌آباد / صادقیه
          <br />
          هر روز ۱۱:۰۰ تا ۲۳:۰۰
        </p>
      </div>
    </>
  );
}
