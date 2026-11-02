import { useEffect, useState, type ReactNode } from "react";
import { contact, nav } from "../data";

/* ── Brand mark ─────────────────────────────────────────────────
   Machined plate with a cut corner, a plum index slash and a rose
   indicator dot. Reads at 16px, works in a single colour.        */

export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="استودیو دیجیتال">
      <path
        d="M2 8.2 L8.2 2 H30 V23.8 L23.8 30 H2 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M9.6 22.4 L22.4 9.6" fill="none" stroke="#3A1C71" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M9.6 15.6 L15.6 9.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".45" />
      <rect x="19.4" y="19.4" width="3.4" height="3.4" rx="0.6" fill="#D76D77" />
    </svg>
  );
}

export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="flex items-center gap-2.5">
      <Mark className={tone === "light" ? "h-8 w-8 text-paper" : "h-8 w-8 text-graphite"} />
      <span className="flex flex-col leading-none">
        <span className={`text-[15px] font-extrabold tracking-tight ${tone === "light" ? "text-paper" : "text-graphite"}`}>
          {contact.brand}
        </span>
        <span
          className={`font-grotesk latin mt-1 text-[8.5px] font-medium tracking-[0.34em] ${
            tone === "light" ? "text-paper/55" : "text-graphite/45"
          }`}
        >
          {contact.brandLatin}
        </span>
      </span>
    </span>
  );
}

/* ── Line icons (hand-drawn, 1.4px stroke) ───────────────────── */

export function ServiceIcon({ name, className = "h-7 w-7" }: { name: string; className?: string }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {name === "browser" && (
        <>
          <rect x="3" y="5" width="26" height="19" rx="1.6" {...p} />
          <path d="M3 10.5h26M7.5 7.8h.01M10.5 7.8h.01M13.5 7.8h.01" {...p} />
          <path d="M7 15h9M7 19h14" {...p} />
          <path d="M11 27.5h10" {...p} />
        </>
      )}
      {name === "phone" && (
        <>
          <rect x="9" y="2.5" width="14" height="27" rx="3" {...p} />
          <path d="M14 5.6h4" {...p} />
          <path d="M12.6 11h6.8M12.6 15h6.8M12.6 19h4" {...p} />
          <circle cx="16" cy="25" r="1.4" {...p} />
        </>
      )}
      {name === "api" && (
        <>
          <rect x="3" y="11" width="9" height="10" rx="1.6" {...p} />
          <rect x="20" y="3.5" width="9" height="8" rx="1.6" {...p} />
          <rect x="20" y="20.5" width="9" height="8" rx="1.6" {...p} />
          <path d="M12 14.5h4.5v-8h3.5M12 17.5h4.5v8h3.5" {...p} />
          <path d="M23 7.5h.01M23 24.5h.01" {...p} />
        </>
      )}
      {name === "ux" && (
        <>
          <rect x="3" y="4" width="26" height="20" rx="1.6" {...p} />
          <path d="M3 9.5h26M10 9.5v14.5" {...p} />
          <path d="M13.5 13h11M13.5 17h7" {...p} />
          <path d="M8.5 28.5h15" {...p} />
          <circle cx="6.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "content" && (
        <>
          <rect x="4" y="6" width="18" height="21" rx="1.6" {...p} />
          <path d="M8 12h10M8 16.5h10M8 21h6" {...p} />
          <path d="M17 2.5h8.5a2 2 0 0 1 2 2V24" {...p} />
          <path d="M24 15.5l4 3.5-4 3.5" {...p} />
        </>
      )}
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.83 9.83 0 0 0 4.7 1.2h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.02-5.11-2.88-6.97A9.78 9.78 0 0 0 12.04 2Zm0 1.8a8.03 8.03 0 0 1 5.71 2.36 8 8 0 0 1 2.36 5.7c0 4.45-3.62 8.06-8.07 8.06a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.02 8.02 0 0 1-1.24-4.3c0-4.45 3.62-8.06 8.07-8.06Zm-2.5 4.3c-.16-.36-.33-.37-.48-.38h-.42c-.14 0-.38.06-.58.28-.2.22-.76.75-.76 1.82s.78 2.11.89 2.26c.11.15 1.5 2.38 3.7 3.24 1.83.72 2.2.58 2.6.54.4-.04 1.28-.52 1.46-1.03.18-.5.18-.94.13-1.03-.05-.09-.2-.15-.42-.26-.22-.11-1.28-.63-1.48-.7-.2-.08-.34-.11-.49.1-.14.22-.55.7-.68.85-.12.14-.25.16-.46.05-.22-.1-.92-.34-1.75-1.08-.65-.58-1.08-1.29-1.21-1.5-.13-.22-.02-.34.1-.45.1-.1.22-.26.33-.39.11-.14.14-.23.22-.38.07-.15.03-.28-.02-.39-.05-.11-.47-1.17-.66-1.6Z" />
    </svg>
  );
}

export function TelegramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

/** Official Bale messenger app icon. */
export function BaleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <img
      src="/images/bale.svg"
      alt=""
      width={24}
      height={24}
      className={className}
      aria-hidden="true"
      draggable={false}
    />
  );
}

/* ── Section index plate ──────────────────────────────────────── */

export function SectionHead({
  index,
  latin,
  title,
  sub,
  tone = "dark",
}: {
  index: string;
  latin: string;
  title: string;
  sub?: string;
  tone?: "dark" | "light";
}) {
  const rule = tone === "light" ? "bg-paper/25" : "bg-graphite/15";
  return (
    <header>
      <div className={`-mx-5 h-px md:-mx-10 ${rule}`} />
      <div className="mt-5 flex items-center gap-3">
        <span className={`font-grotesk latin tnum text-[13px] font-medium tracking-[0.28em] ${tone === "light" ? "text-rose" : "text-plum"}`}>
          {index}
        </span>
        <span className={`font-grotesk latin text-[10px] font-medium tracking-[0.32em] ${tone === "light" ? "text-paper/50" : "text-graphite/45"}`}>
          {latin}
        </span>
      </div>
      <h2
        className={`mt-4 max-w-[19ch] text-[clamp(1.85rem,7.2vw,3.5rem)] font-black leading-[1.32] tracking-tight ${
          tone === "light" ? "text-paper" : "text-graphite"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-5 max-w-[46ch] text-[15px] leading-[2.1] md:text-[16.5px] ${tone === "light" ? "text-paper/70" : "text-graphite/65"}`}>
          {sub}
        </p>
      )}
    </header>
  );
}

/* ── Buttons ──────────────────────────────────────────────────── */

export function PrimaryBtn({
  children,
  href,
  onClick,
  type,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const cls = `group inline-flex items-center justify-center gap-3 rounded-[3px] bg-plum px-7 py-4 text-[15px] font-bold text-paper transition-all duration-300 hover:bg-charcoal hover:shadow-[0_18px_40px_-18px_rgba(58,28,113,0.65)] active:translate-y-px ${className}`;
  const inner = (
    <>
      <span className="h-[6px] w-[6px] rounded-[1px] bg-rose transition-transform duration-300 group-hover:scale-[1.9]" />
      {children}
    </>
  );
  if (href)
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function GhostBtn({ children, href }: { children: ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center justify-center gap-3 rounded-[3px] border border-graphite/20 px-7 py-4 text-[15px] font-bold text-graphite transition-all duration-300 hover:border-graphite/55 hover:bg-cream"
    >
      {children}
      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
    </a>
  );
}

/* ── Edge rail: tick marks + live scroll indicator ───────────── */

export function Rail() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-y-0 left-0 z-40 w-[22px] border-r border-graphite/10 bg-cream/70 backdrop-blur-[2px] md:w-14"
    >
      <div className="tick-rail absolute inset-0 opacity-70" />
      <div
        className="absolute right-[3px] h-[26px] w-[4px] rounded-[1px] bg-rose shadow-[0_0_12px_rgba(215,109,119,0.75)] transition-[top] duration-150 ease-out md:right-[10px] md:h-[34px]"
        style={{ top: `calc(${(progress * 100).toFixed(2)}% - 17px)` }}
      />
      <div className="absolute inset-x-0 bottom-5 flex justify-center">
        <span className="vlabel font-grotesk latin text-[8px] tracking-[0.36em] text-graphite/40">
          WEB · APP · API · UI/UX
        </span>
      </div>
    </div>
  );
}

/* ── Header ───────────────────────────────────────────────────── */

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b pl-[22px] transition-all duration-300 md:pl-14 ${
          scrolled
            ? "border-graphite/12 bg-paper/90 backdrop-blur-xl supports-[backdrop-filter]:bg-paper/75"
            : "border-transparent bg-paper/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[62px] max-w-[1320px] items-center justify-between gap-4 px-5 md:h-[78px] md:px-10">
          <a href="#work" className="shrink-0">
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group relative rounded-[3px] px-3.5 py-2 text-[14.5px] font-medium text-graphite/75 transition-colors hover:text-graphite"
              >
                {item.label}
                <span className="absolute inset-x-3.5 bottom-1 h-px origin-right scale-x-0 bg-plum transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden items-center gap-2.5 rounded-[3px] bg-graphite px-5 py-3 text-[13.5px] font-bold text-paper transition-colors duration-300 hover:bg-plum sm:inline-flex"
            >
              <span className="h-[6px] w-[6px] rounded-[1px] bg-rose" />
              شروع یک پروژه جدید
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="باز کردن منو"
              className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-graphite/15 text-graphite transition-colors hover:bg-cream lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M4 8h16M4 13h16M4 18h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-graphite/45 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[86%] max-w-[380px] flex-col bg-paper transition-transform duration-[420ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-graphite/12 px-6 py-5">
            <Wordmark />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="بستن منو"
              className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-graphite/15 text-graphite"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-4" aria-label="ناوبری موبایل">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-graphite/10 py-5"
              >
                <span className="font-grotesk latin tnum text-[11px] tracking-[0.26em] text-plum/70">{item.idx}</span>
                <span className="text-[21px] font-extrabold text-graphite">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="border-t border-graphite/12 px-6 py-6">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-3 rounded-[3px] bg-plum px-6 py-4 text-[15px] font-bold text-paper"
            >
              <span className="h-[6px] w-[6px] rounded-[1px] bg-rose" />
              شروع یک پروژه جدید
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-[3px] border border-graphite/18 py-3.5 text-[14px] font-semibold text-graphite"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              گفت‌وگو در واتس‌پپ
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Footer ───────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-graphite text-paper">
      <div className="hairgrid pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="relative mx-auto max-w-[1320px] px-5 pb-10 pt-16 md:px-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark tone="light" />
            <p className="mt-6 max-w-[38ch] text-[14.5px] leading-[2.15] text-paper/65">
              استودیوی تخصصی توسعه‌ی دیجیتال؛ از طراحی وب‌سایت و اپلیکیشن تا توسعه‌ی API، سیستم‌های اختصاصی و تولید محتوای
              دیجیتال. ایده‌ی شما را به یک محصول دیجیتال کاربردی و قابل توسعه تبدیل می‌کنیم.
            </p>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-[3px] border border-paper/20 px-5 py-3.5 text-[14px] font-semibold text-paper transition-colors hover:border-rose hover:bg-rose/10"
            >
              <WhatsAppIcon className="h-[19px] w-[19px] text-rose" />
              واتس‌پپ:{" "}
              <span className="latin tnum font-grotesk text-[13px]">+{contact.whatsappNumber}</span>
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
            <FooterCol
              title="استودیو"
              links={[
                { label: "نمونه‌کارها", href: "#work" },
                { label: "درباره ما", href: "#about" },
                { label: "تماس با ما", href: "#contact" },
              ]}
            />
            <FooterCol
              title="شبکه‌های اجتماعی"
              links={[
                { label: "اینستاگرام", href: contact.instagram },
                { label: "لینکدین", href: contact.linkedin },
                { label: "تلگرام", href: contact.telegram },
                { label: "گیت‌هاب", href: contact.github },
              ]}
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-paper/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] leading-relaxed text-paper/50">
            © ۱۴۰۴ {contact.brand} — تمامی حقوق محفوظ است.
          </p>
          <p className="font-grotesk latin text-[10px] tracking-[0.3em] text-paper/35">
            CREATIVE IN PRESENTATION · PRECISE IN ENGINEERING
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold tracking-[0.12em] text-paper/50">{title}</h3>
      <ul className="mt-5 space-y-3.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="group inline-flex items-center gap-2 text-[14px] text-paper/72 transition-colors hover:text-rose"
            >
              <span className="h-px w-0 bg-rose transition-all duration-300 group-hover:w-3.5" />
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
