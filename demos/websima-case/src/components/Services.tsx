import { ArrowLeft, Check } from "lucide-react";
import { Btn, Reveal } from "./ui";
import { cn } from "../utils/cn";

const services = [
  {
    no: "01",
    title: "طراحی سایت شرکتی: ساخت تصویر معتبر از برند شما",
    text: "سایت شرکتی، مرکز ثقل حضور آنلاین شماست. وب‌سیما با طراحی اختصاصی، معماری اطلاعات دقیق و محتوای هدفمند، برند شما را معتبر و قابل‌اعتماد نشان می‌دهد و مشتریان را به همکاری ترغیب می‌کند.",
    points: ["طراحی کاملاً اختصاصی", "بهینه‌سازی سرعت و سئو", "مدیریت محتوای ساده"],
    img: `${import.meta.env.BASE_URL}images/corporate.jpg`,
    cta: "مشاوره پروژه",
    shape: "bg-brand",
  },
  {
    no: "02",
    title: "طراحی فروشگاه اینترنتی: تبدیل بازدیدکننده به خریدار واقعی",
    text: "فروشگاهی که فقط زیبا نیست، بلکه می‌فروشد. با تجربه خرید روان، درگاه‌های پرداخت امن، مدیریت موجودی و ابزارهای بازاریابی، فروش آنلاین شما را به مرحله‌ای تازه می‌رسانیم.",
    points: ["اتصال به درگاه‌های پرداخت", "مدیریت محصول و سفارش", "قیف فروش بهینه‌شده"],
    img: `${import.meta.env.BASE_URL}images/ecommerce.jpg`,
    cta: "مشاوره فروشگاه",
    shape: "bg-char",
  },
  {
    no: "03",
    title: "طراحی رابط کاربری (UI): هدایت کاربر بدون سردرگمی",
    text: "رابط کاربری خوب، دیده نمی‌شود؛ حس می‌شود. ما با پژوهش رفتار کاربران، سیستم طراحی منسجم و پروتوتایپ‌های تعاملی، محصولی می‌سازیم که کاربران عاشق استفاده از آن می‌شوند.",
    points: ["پژوهش و تجربه کاربری (UX)", "سیستم طراحی اختصاصی", "پروتوتایپ تعاملی"],
    img: `${import.meta.env.BASE_URL}images/ui.jpg`,
    cta: "مشاوره طراحی",
    shape: "bg-brand",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-white pb-12">
      <div className="mx-auto max-w-7xl space-y-24 px-5 py-10 md:space-y-36 md:px-8">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={s.no} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal className={cn(flip && "lg:order-2")}>
                <div className="mb-5 flex items-center gap-4">
                  <span className="text-6xl font-black leading-none text-brand/20 md:text-7xl" dir="ltr">{s.no}</span>
                  <span className="h-px flex-1 bg-char/10" />
                </div>
                <h3 className="text-2xl font-black leading-[1.6] text-char md:text-4xl md:leading-[1.5]">{s.title}</h3>
                <p className="mt-5 text-base leading-9 text-char/65 md:text-lg">{s.text}</p>
                <ul className="mt-6 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 font-semibold text-char/80">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Btn className="mt-8">
                  {s.cta} <ArrowLeft className="h-4 w-4" />
                </Btn>
              </Reveal>

              <Reveal delay={150} className={cn(flip && "lg:order-1")}>
                <div className="relative mx-auto max-w-lg">
                  <div className={cn("absolute -top-6 h-40 w-40 rounded-full md:h-52 md:w-52", s.shape, flip ? "-right-6" : "-left-6")} />
                  <div className={cn("absolute -bottom-6 h-28 w-48 rounded-full bg-sand-2", flip ? "-left-8" : "-right-8")} />
                  <div className="relative overflow-hidden rounded-[2.8rem] bg-sand shadow-2xl shadow-black/10 ring-8 ring-white">
                    <img src={s.img} alt={s.title} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
