import { ArrowLeft, Sparkles, Star } from "lucide-react";
import { Btn, CountUp, Wave } from "./ui";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-32 md:pt-40">
      {/* decorative shapes */}
      <div className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-sand" />
      <div className="pointer-events-none absolute right-[8%] top-40 h-6 w-6 rounded-full bg-brand" />
      <div className="pointer-events-none absolute left-[46%] top-28 hidden h-16 w-16 rounded-2xl border-[6px] border-brand/20 md:block rotate-12" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 md:px-8 lg:grid-cols-2 lg:pb-36">
        {/* text */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[3px] w-12 rounded bg-brand" />
            <span className="text-lg font-bold tracking-wide text-char/70" dir="ltr">Website Design</span>
          </div>
          <h1 className="text-[2.6rem] font-black leading-[1.25] text-char md:text-6xl lg:text-[4.4rem]">
            اولین قدم برای
            <br />
            <span className="relative inline-block text-brand">
              موفقیت آنلاین
              <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 300 14" fill="none" preserveAspectRatio="none">
                <path d="M3 9C60 2 130 2 190 6S270 10 297 4" stroke="#0d0d0d" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <h2 className="mt-8 text-2xl font-extrabold text-char md:text-3xl">طراحی وبسایت</h2>
          <p className="mt-4 max-w-xl text-base leading-9 text-char/65 md:text-lg">
            وب‌سیما با تکیه بر سال‌ها تجربه در طراحی وبسایت، فروشگاه اینترنتی و رابط کاربری، هویت دیجیتال برند شما را از صفر تا صد می‌سازد؛ وبسایتی سریع، زیبا و متمرکز بر فروش و اعتماد مشتریان.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Btn>
              شروع پروژه شما <ArrowLeft className="h-4 w-4" />
            </Btn>
            <Btn variant="outline" href="#portfolio">مشاهده نمونه‌کارها</Btn>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-2 gap-4">
            <div className="rounded-3xl bg-char p-5 text-white">
              <div className="text-4xl font-black text-brand md:text-5xl"><CountUp to={700} prefix="+" /></div>
              <div className="mt-2 text-sm text-white/65">پروژه موفق و رضایت‌بخش</div>
            </div>
            <div className="rounded-3xl bg-sand p-5">
              <div className="text-4xl font-black text-char md:text-5xl"><CountUp to={80} prefix="+" /></div>
              <div className="mt-2 text-sm text-char/60">ماژول اختصاصی و آماده</div>
            </div>
          </div>
        </div>

        {/* visual */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-brand md:-right-10 md:h-56 md:w-56" />
          <div className="absolute -bottom-6 -left-4 h-32 w-32 rounded-[2.5rem] bg-char md:h-44 md:w-44" />
          <div className="relative overflow-hidden rounded-[3rem] bg-sand-2 shadow-2xl shadow-black/15 ring-8 ring-white">
            <img src={`${import.meta.env.BASE_URL}images/hero.jpg`} alt="نمونه طراحی وبسایت روی مانیتور" className="aspect-[4/4.3] w-full object-cover" />
          </div>
          <div className="absolute -left-3 top-10 animate-float rounded-2xl bg-white p-4 shadow-xl md:-left-10">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-brand"><Sparkles className="h-5 w-5" /></span>
              <div>
                <div className="text-sm font-extrabold">طراحی اختصاصی</div>
                <div className="text-xs text-char/55">منحصر به برند شما</div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 right-2 rounded-2xl bg-white p-4 shadow-xl md:-right-6">
            <div className="flex items-center gap-1 text-brand">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <div className="mt-1 text-xs font-bold text-char/70">رضایت ۹۸٪ مشتریان</div>
          </div>
        </div>
      </div>
      <Wave fill="#1b1a19" className="absolute bottom-[-1px] left-0" />
    </section>
  );
}
