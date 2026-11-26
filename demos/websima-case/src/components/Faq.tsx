import { useState } from "react";
import { Phone, Plus } from "lucide-react";
import { Reveal, SectionTitle } from "./ui";
import { cn } from "../utils/cn";

const faqs = [
  { q: "هزینه طراحی وبسایت چگونه محاسبه می‌شود؟", a: "هزینه بر اساس نوع سایت، تعداد صفحات، ماژول‌های مورد نیاز و میزان سفارشی‌سازی تعیین می‌شود. پس از مشاوره رایگان، پیشنهاد دقیق و شفاف برای شما ارسال می‌شود." },
  { q: "طراحی وبسایت چقدر زمان می‌برد؟", a: "سایت‌های شرکتی معمولاً بین ۳ تا ۶ هفته و فروشگاه‌های اینترنتی بین ۶ تا ۱۰ هفته زمان می‌برند. زمان‌بندی دقیق در ابتدای پروژه مشخص می‌شود." },
  { q: "آیا وبسایت من برای موبایل بهینه خواهد بود؟", a: "بله، همه پروژه‌های وب‌سیما کاملاً واکنش‌گرا هستند و روی موبایل، تبلت و دسکتاپ بهترین تجربه را ارائه می‌دهند." },
  { q: "پشتیبانی بعد از تحویل پروژه چگونه است؟", a: "پس از تحویل، دوره پشتیبانی رایگان دارید و می‌توانید از بسته‌های پشتیبانی و توسعه مستمر وب‌سیما استفاده کنید." },
  { q: "آیا سئوی سایت هم انجام می‌شود؟", a: "ساختار فنی و سئوی پایه در همه پروژه‌ها رعایت می‌شود و در صورت نیاز، خدمات تخصصی سئو و بازاریابی دیجیتال نیز ارائه می‌گردد." },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 md:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <Reveal>
            <SectionTitle
              center={false}
              eyebrow="پرسش‌های پرتکرار"
              title={
                <>
                  مشتاق <span className="text-brand">شنیدن صدای شما</span> هستیم
                </>
              }
              sub="پاسخ پرسش‌های رایج شما درباره طراحی وبسایت را اینجا بخوانید. سوال دیگری دارید؟ با ما تماس بگیرید."
            />
          </Reveal>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className={cn("overflow-hidden rounded-3xl transition-colors", isOpen ? "bg-char text-white" : "bg-sand text-char")}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-right md:p-6" aria-expanded={isOpen}>
                    <span className="text-base font-bold md:text-lg">{f.q}</span>
                    <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-300", isOpen ? "rotate-45 bg-brand text-white" : "bg-white text-char")}>
                      <Plus className="h-5 w-5" />
                    </span>
                  </button>
                  <div className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 text-sm leading-8 text-white/70 md:px-6 md:text-base">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Reveal delay={150}>
          <div className="relative mx-auto max-w-md lg:sticky lg:top-8">
            <div className="absolute -right-5 -top-5 h-44 w-44 rounded-full bg-brand" />
            <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-[2rem] bg-char" />
            <div className="relative overflow-hidden rounded-[3rem] bg-sand ring-8 ring-white">
              <img src={`${import.meta.env.BASE_URL}images/consultant.jpg`} alt="مشاور وب‌سیما" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
            <a href="tel:+989965442168" className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full bg-char px-6 py-4 text-white shadow-2xl transition hover:bg-brand">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand"><Phone className="h-5 w-5" /></span>
              <span className="text-right">
                <span className="block text-[11px] text-white/60">مشاوره رایگان</span>
                <span className="block text-lg font-black" dir="ltr">0996 544 2168</span>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
