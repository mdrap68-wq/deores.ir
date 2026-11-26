import { AtSign, Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./ui";

const cols = [
  { h: "خدمات وب‌سیما", l: ["طراحی سایت شرکتی", "طراحی فروشگاه اینترنتی", "طراحی رابط کاربری", "سئو و بازاریابی دیجیتال"] },
  { h: "درباره ما", l: ["داستان وب‌سیما", "تیم ما", "نمونه‌کارها", "تماس با ما"] },
  { h: "منابع", l: ["وبلاگ", "سوالات متداول", "مسیر همکاری", "درخواست مشاوره"] },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-brand/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 pt-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-8 text-white/55">
              وب‌سیما یک شریک دیجیتال برای کسب‌وکارهای ایرانی است؛ از طراحی وبسایت و فروشگاه اینترنتی تا رابط کاربری و بازاریابی دیجیتال، برای رشد برند شما.
            </p>
            <a href="tel:02191077701" className="mt-6 inline-block text-3xl font-black text-brand" dir="ltr">021 91077701</a>
            <div className="mt-6 flex gap-3">
              {[AtSign, Globe, MessageCircle, Mail].map((I, i) => (
                <a key={i} href="#top" aria-label="شبکه اجتماعی" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-brand">
                  <I className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.h}>
                <h4 className="mb-5 text-base font-extrabold">{c.h}</h4>
                <ul className="space-y-3">
                  {c.l.map((x) => (
                    <li key={x}>
                      <a href="#top" className="text-sm text-white/55 transition hover:text-brand">{x}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm text-white/55">
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" /> تهران، ایران</span>
          <span className="flex items-center gap-2" dir="ltr"><Phone className="h-4 w-4 text-brand" /> 021 91077701</span>
        </div>

        <div className="mt-6 overflow-hidden" aria-hidden>
          <div className="select-none text-center text-[22vw] font-black leading-[0.8] tracking-tighter text-white/[0.04] md:text-[14rem]" dir="ltr">deores</div>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-xs text-white/40">
        © تمامی حقوق برای وب‌سیما محفوظ است.
      </div>
    </footer>
  );
}
