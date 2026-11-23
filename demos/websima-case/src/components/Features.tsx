import { ClipboardList, Code2, Handshake, Headset, Layers, Network, Rocket, TrendingUp } from "lucide-react";
import { Reveal, SectionTitle } from "./ui";

const items = [
  { icon: Headset, t: "پشتیبانی اختصاصی", d: "پاسخگویی سریع و دقیق در تمام مراحل پروژه و پس از تحویل؛ تیم ما همیشه کنار شماست." },
  { icon: Handshake, t: "اعتماد و هماهنگی کامل", d: "شفافیت در قیمت، زمان‌بندی و گزارش پیشرفت تا همکاری بدون دغدغه‌ای داشته باشید." },
  { icon: ClipboardList, t: "برنامه‌ریزی اختصاصی", d: "شروع هر پروژه با یک نقشه راه مشخص و قابل‌اندازه‌گیری، متناسب با اهداف شما." },
  { icon: Code2, t: "کدنویسی اختصاصی", d: "زیرساختی پایدار و قابل‌توسعه برای آینده کسب‌وکار شما، بدون وابستگی به قالب‌های آماده." },
  { icon: Network, t: "شناخت عمیق کسب‌وکار", d: "قبل از طراحی، برند و مشتریان شما را می‌شناسیم تا هر تصمیم طراحی هدفمند باشد." },
  { icon: TrendingUp, t: "پشتیبانی و توسعه مستمر", d: "سایت شما با رشد کسب‌وکارتان رشد می‌کند؛ با به‌روزرسانی و افزودن امکانات جدید." },
  { icon: Rocket, t: "تکنولوژی‌های روز", d: "استفاده از ابزارها و فناوری‌های مدرن برای سرعت بالا، امنیت و سئوی بهتر." },
  { icon: Layers, t: "تجربه کاربری روان", d: "رابطی ساده و دلپذیر که کاربران را بدون سردرگمی تا هدف نهایی هدایت می‌کند." },
];

export default function Features() {
  return (
    <section id="why" className="bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionTitle
            eyebrow="چرا وب‌سیما"
            title={
              <>
                مسیر موفقیت، با <span className="text-brand">یک انتخاب درست</span> آغاز می‌شود
              </>
            }
            sub="یک وبسایت فقط یک ویترین دیجیتال نیست؛ یک ابزار رشد است. این‌ها دلایلی است که ۷۰۰ کسب‌وکار ما را انتخاب کرده‌اند."
          />
        </Reveal>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={(i % 4) * 90}>
              <div className="group h-full rounded-[2rem] bg-white p-7 transition duration-300 hover:-translate-y-2 hover:bg-char hover:shadow-2xl">
                <span className="mb-6 grid h-16 w-16 place-items-center rounded-[1.4rem] bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-8 w-8" strokeWidth={1.6} />
                </span>
                <h3 className="text-lg font-extrabold text-char transition group-hover:text-white">{t}</h3>
                <p className="mt-3 text-sm leading-8 text-char/60 transition group-hover:text-white/60">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
