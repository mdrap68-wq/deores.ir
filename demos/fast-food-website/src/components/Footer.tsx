import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { scrollToId } from "../lib/scroll";
import { useCart } from "../context/CartContext";
import { Phone, Clock, MapPin } from "lucide-react";
import { InstagramIcon } from "./icons";

const NAV = [
  { id: "hero", label: "بازگشت به برگر" },
  { id: "menu", label: "منو" },
  { id: "signature", label: "مستر بایت" },
  { id: "delivery", label: "ارسال و پرداخت" },
  { id: "manifesto", label: "مانیفست" },
];

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const { openCart, count } = useCart();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ft-word",
        { yPercent: 42 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
        }
      );
    }, rootRef.current!);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="relative overflow-hidden bg-ink text-paper">
      {/* CTA band */}
      <div className="border-y border-paper/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-stretch gap-5 px-4 py-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 sm:px-5 sm:py-10 md:px-8 md:py-14">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl md:text-5xl" data-reveal>
            گرسنه‌ای؟ <span className="text-fog">دوس دقیقه‌ست.</span>
          </h2>
          <button
            onClick={openCart}
            className="w-full rounded-full bg-acid px-9 py-4 text-sm font-extrabold text-ink transition-transform duration-300 hover:scale-105 active:scale-95 sm:w-auto"
          >
            {count > 0 ? "ادامه سفارش" : "شروع سفارش"}
          </button>
        </div>
      </div>

      {/* columns */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-5 sm:py-14 md:px-8 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="mb-4 flex items-baseline gap-2">
            <span className="text-4xl font-black tracking-tight">بایت</span>
            <span className="text-[10px] font-bold tracking-[0.35em] text-fog">BITE</span>
          </p>
          <p className="max-w-xs text-sm leading-8 text-fog">
            فست‌فود دست‌ساز تهرانی؛ برگرهای گریل‌شده، نان بریوش هر روز صبح
            و سسی که دستورش هیچ‌جا نوشته نشده.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-sand transition-colors hover:text-acid"
          >
            <InstagramIcon className="h-4.5 w-4.5" />
            <span dir="ltr">@bite.food</span>
          </a>
        </div>

        <nav className="lg:col-span-2" aria-label="دسترسی سریع">
          <h3 className="mb-5 text-xs font-bold tracking-[0.2em] text-fog">دسترسی سریع</h3>
          <ul className="space-y-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollToId(n.id)}
                  className="text-sm font-semibold text-sand transition-colors hover:text-paper"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="mb-5 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-fog">
            <MapPin className="h-3.5 w-3.5" aria-hidden /> شعبه‌ها
          </h3>
          <ul className="space-y-4 text-sm leading-7 text-sand">
            <li>سعادت‌آباد، بلوار دریا، پلاک ۲۴</li>
            <li>یوسف‌آباد، خیابان توحید، پلاک ۸۸</li>
            <li>صادقیه، بلوار فردوس، پلاک ۱۲</li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-5 text-xs font-bold tracking-[0.2em] text-fog">تماس و ساعت کاری</h3>
          <a
            href="tel:+982122678901"
            className="mb-4 flex items-center gap-2 text-sm font-bold text-paper transition-colors hover:text-acid"
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span className="tabular-fa">۰۲۱ ۲۲۶۷ ۸۹۰۱</span>
          </a>
          <p className="flex items-start gap-2 text-sm leading-7 text-sand">
            <Clock className="mt-1.5 h-4 w-4 shrink-0" aria-hidden />
            <span className="tabular-fa">
              شنبه تا چهارشنبه ۱۱:۰۰ تا ۲۳:۰۰
              <br />
              پنجشنبه و جمعه ۱۲:۰۰ تا ۲۴:۰۰
            </span>
          </p>
        </div>
      </div>

      {/* giant wordmark */}
      <div className="relative select-none overflow-hidden" aria-hidden>
        <p className="ft-word text-ghost-strong -mb-[4vw] text-center text-[26vw] font-black leading-[0.8] text-paper">
          بایت
        </p>
      </div>

      <div className="relative border-t border-paper/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-5 text-[11px] font-semibold text-fog sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:px-5 md:px-8 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <p>© ۱۴۰۵ بایت — همه حقوق (و همه سس‌ها) محفوظه</p>
          <p>ساخته‌شده با گرسنگی در تهران</p>
        </div>
      </div>
    </footer>
  );
}
