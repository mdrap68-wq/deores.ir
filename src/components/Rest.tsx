import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contact, process, standards } from "../data";
import { ArrowIcon, BaleIcon, PrimaryBtn, SectionHead, TelegramIcon, WhatsAppIcon } from "./Chrome";

gsap.registerPlugin(ScrollTrigger);

/* ── Process ──────────────────────────────────────────────────── */

export function Process() {
  const wrap = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proc-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: wrap.current!, start: "top 72%", end: "bottom 78%", scrub: 0.5 },
        },
      );
      gsap.utils.toArray<HTMLElement>(".proc-dot").forEach((dot) => {
        gsap.fromTo(
          dot,
          { backgroundColor: "#F8F7F2", scale: 0.72 },
          {
            backgroundColor: "#3A1C71",
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
            scrollTrigger: { trigger: dot, start: "top 78%", once: true },
          },
        );
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative pt-24 md:pt-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <SectionHead
          index="04"
          latin="PROCESS"
          title="از ایده تا اجرا، مرحله‌به‌مرحله"
          sub="یک مسیر شفاف و قابل پیش‌بینی؛ در هر مرحله می‌دانید کجای پروژه هستیم."
        />

        <div ref={wrap} className="proc-wrap relative mt-12 md:mt-16">
          <div className="absolute bottom-6 right-[7px] top-2 w-px bg-graphite/14 md:right-[9px]" />
          <div className="proc-fill absolute bottom-6 right-[7px] top-2 w-px origin-top bg-plum md:right-[9px]" />

          <ol className="space-y-10 md:space-y-12">
            {process.map((p) => (
              <li key={p.index} data-reveal className="relative ps-8 md:ps-12">
                <span className="proc-dot absolute right-0 top-[7px] block h-[15px] w-[15px] rounded-full border-2 border-plum bg-paper md:right-[2px]" />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-grotesk latin tnum text-[11px] font-medium tracking-[0.28em] text-plum">
                    STEP {p.index}
                  </span>
                  <h3 className="text-[clamp(1.12rem,4.3vw,1.62rem)] font-extrabold leading-[1.6] text-graphite">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-[58ch] text-[13.5px] leading-[2.12] text-graphite/64">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ── 05 · About / standards — the charcoal band ───────────────── */

export function About() {
  return (
    <section id="about" className="relative mt-24 overflow-hidden bg-charcoal py-20 md:mt-32 md:py-28">
      <div className="hairgrid pointer-events-none absolute inset-0 opacity-25" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-10 font-grotesk latin text-[26vw] font-thin leading-none text-paper/[0.05] md:text-[16rem]"
      >
        S
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
        <SectionHead
          index="05"
          latin="STANDARDS"
          title="آنچه در هر پروژه رعایت می‌کنیم"
          sub="ما یک استودیوی توسعه‌ی دیجیتال هستیم؛ کارمان ساختن محصولاتی است که در طول زمان قابل نگهداری، امن و سریع باقی بمانند."
          tone="light"
        />

        <div className="mt-12 grid gap-x-12 md:mt-16 md:grid-cols-2">
          {standards.map((s) => (
            <article key={s.index} data-reveal className="border-t border-paper/15 py-7 md:py-8">
              <div className="flex items-baseline gap-3">
                <span className="font-grotesk latin tnum text-[10.5px] font-medium tracking-[0.26em] text-rose">
                  {s.index}
                </span>
                <h3 className="text-[clamp(1.02rem,3.6vw,1.28rem)] font-extrabold leading-[1.75] text-paper">
                  {s.title}
                </h3>
              </div>
              <p className="mt-3 max-w-[52ch] text-[13px] leading-[2.15] text-paper/62">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 06 · Contact ─────────────────────────────────────────────── */

const serviceOptions = ["طراحی و توسعه وب‌سایت", "توسعه اپلیکیشن موبایل", "توسعه API و سیستم‌های اختصاصی", "طراحی UI/UX", "تولید محتوای دیجیتال", "سایر / چند مورد"];

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", service: serviceOptions[0], message: "" });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError("لطفاً نام و شماره تماس را وارد کنید.");
      return;
    }
    setError(null);
    setSent(true);
  };

  const waLink = () => {
    const text = `سلام، من ${form.name || "—"} هستم.
نوع خدمات: ${form.service}
شماره تماس: ${form.phone || "—"}
${form.message ? `توضیحات: ${form.message}` : ""}`;
    return `${contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  const field =
    "w-full rounded-[3px] border border-graphite/15 bg-paper px-4 py-3.5 text-[14px] text-graphite placeholder:text-graphite/38 transition-colors focus:border-plum focus:outline-none";

  return (
    <section id="contact" className="relative pt-24 md:pt-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <SectionHead
          index="06"
          latin="CONTACT"
          title="برای شروع پروژه‌تان آماده‌اید؟"
          sub="ایده و نیاز کسب‌وکارتان را مطرح کنید تا درباره بهترین راهکار دیجیتال با هم صحبت کنیم."
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14">
          {/* channels */}
          <div>
            <div className="flex flex-col gap-3">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[4px] border border-graphite/12 bg-cream/55 px-5 py-5 transition-colors duration-300 hover:border-plum/35 hover:bg-cream"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[3px] bg-[#25D366] text-white">
                  <WhatsAppIcon className="h-[22px] w-[22px]" />
                </span>
                <span className="flex-1">
                  <span className="block text-[11px] tracking-[0.12em] text-graphite/50">گفت‌وگوی مستقیم</span>
                  <span className="mt-1 block text-[15px] font-extrabold text-graphite">واتس‌اپ</span>
                </span>
                <ArrowIcon className="h-4 w-4 text-graphite/45 transition-transform duration-300 group-hover:-translate-x-1.5" />
              </a>

              <a
                href={contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[4px] border border-graphite/12 bg-cream/55 px-5 py-5 transition-colors duration-300 hover:border-plum/35 hover:bg-cream"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[3px] bg-[#2AABEE] text-white">
                  <TelegramIcon className="h-[22px] w-[22px]" />
                </span>
                <span className="flex-1">
                  <span className="block text-[11px] tracking-[0.12em] text-graphite/50">گفت‌وگوی مستقیم</span>
                  <span className="mt-1 block text-[15px] font-extrabold text-graphite">تلگرام</span>
                </span>
                <ArrowIcon className="h-4 w-4 text-graphite/45 transition-transform duration-300 group-hover:-translate-x-1.5" />
              </a>

              <a
                href={contact.bale}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[4px] border border-graphite/12 bg-cream/55 px-5 py-5 transition-colors duration-300 hover:border-plum/35 hover:bg-cream"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[3px] bg-paper">
                  <BaleIcon className="h-9 w-9" />
                </span>
                <span className="flex-1">
                  <span className="block text-[11px] tracking-[0.12em] text-graphite/50">گفت‌وگوی مستقیم</span>
                  <span className="mt-1 block text-[15px] font-extrabold text-graphite">بله</span>
                </span>
                <ArrowIcon className="h-4 w-4 text-graphite/45 transition-transform duration-300 group-hover:-translate-x-1.5" />
              </a>

              <a
                href={`tel:${contact.phone}`}
                className="group flex items-center gap-4 rounded-[4px] border border-graphite/12 bg-cream/55 px-5 py-5 transition-colors duration-300 hover:border-plum/35 hover:bg-cream"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[3px] border border-graphite/12 bg-paper text-plum">
                  <svg viewBox="0 0 24 24" className="h-[21px] w-[21px]" aria-hidden="true">
                    <path
                      d="M6.2 3.5h3l1.6 4-2 1.4a12.3 12.3 0 0 0 6.3 6.3l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A17.6 17.6 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="flex-1">
                  <span className="block text-[11px] tracking-[0.12em] text-graphite/50">تماس تلفنی</span>
                  <span className="latin tnum mt-1 block font-grotesk text-[15px] font-bold text-graphite">
                    {contact.phoneDisplay}
                  </span>
                </span>
                <ArrowIcon className="h-4 w-4 text-graphite/45 transition-transform duration-300 group-hover:-translate-x-1.5" />
              </a>
            </div>

          </div>

          {/* form */}
          <div className="rounded-[4px] border border-graphite/12 bg-cream/45 p-6 sm:p-8">
            {sent ? (
              <div className="flex min-h-[380px] flex-col items-start justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-rose text-rose">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-6 text-[1.35rem] font-extrabold leading-[1.7] text-graphite">
                  درخواست شما ثبت شد.
                </h3>
                <p className="mt-3 max-w-[40ch] text-[13.5px] leading-[2.1] text-graphite/65">
                  برای ادامه‌ی گفت‌وگو، پیام آماده‌شده را از طریق واتس‌پپ برای ما ارسال کنید تا در اولین فرصت پاسخ دهیم.
                </p>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-3 rounded-[3px] bg-plum px-6 py-4 text-[15px] font-bold text-paper transition-colors hover:bg-charcoal"
                >
                  <WhatsAppIcon className="h-[19px] w-[19px]" />
                  ارسال پیام در واتس‌پپ
                </a>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-4 text-[12.5px] font-semibold text-graphite/55 underline underline-offset-4 hover:text-plum"
                >
                  ویرایش اطلاعات
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h3 className="text-[1.15rem] font-extrabold text-graphite">درخواست مشاوره پروژه</h3>
                <p className="mt-2.5 text-[12.5px] leading-[2] text-graphite/58">
                  فرم کوتاه زیر را تکمیل کنید؛ معادل همین اطلاعات برایتان در واتس‌پپ آماده می‌شود.
                </p>

                <div className="mt-6 grid gap-4">
                  <label className="block">
                    <span className="mb-2 block text-[12px] font-semibold text-graphite/70">نام و نام خانوادگی</span>
                    <input
                      className={field}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="مثال: علی رضایی"
                      autoComplete="name"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[12px] font-semibold text-graphite/70">شماره تماس</span>
                    <input
                      className={`${field} latin tnum text-start`}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="09xx xxx xxxx"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[12px] font-semibold text-graphite/70">نوع خدمات</span>
                    <select
                      className={field}
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                    >
                      {serviceOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[12px] font-semibold text-graphite/70">
                      توضیحات پروژه <span className="font-normal text-graphite/40">(اختیاری)</span>
                    </span>
                    <textarea
                      className={`${field} min-h-[110px] resize-y leading-[2]`}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="کمی درباره ایده، نیاز یا زمان‌بندی پروژه بنویسید…"
                    />
                  </label>
                </div>

                {error && (
                  <p role="alert" className="mt-4 rounded-[3px] border border-rose/45 bg-rose/10 px-4 py-3 text-[12.5px] text-rose">
                    {error}
                  </p>
                )}

                <PrimaryBtn type="submit" className="mt-6 w-full">
                  درخواست مشاوره پروژه
                </PrimaryBtn>

                <p className="mt-4 text-[11.5px] leading-[2] text-graphite/48">
                  اطلاعات شما تنها برای پاسخ‌گویی به همین درخواست استفاده می‌شود.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
