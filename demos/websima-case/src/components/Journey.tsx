import { Phone } from "lucide-react";
import { Btn, CountUp, Reveal, SectionTitle } from "./ui";
import { cn } from "../utils/cn";

const steps = [
  { t: "مشاوره و شناخت نیاز", d: "اهداف، مخاطبان و چالش‌های کسب‌وکار شما را دقیق می‌شناسیم." },
  { t: "تحلیل رقبا و استراتژی", d: "نقشه راه و معماری سایت بر پایه داده و تحلیل بازار تدوین می‌شود." },
  { t: "طراحی UI/UX", d: "طرح‌های اختصاصی و پروتوتایپ تعاملی برای تأیید شما آماده می‌شود." },
  { t: "توسعه و برنامه‌نویسی", d: "کدنویسی تمیز، سریع و ایمن همراه با ماژول‌های اختصاصی." },
  { t: "تست و کنترل کیفیت", d: "سرعت، امنیت و سازگاری با همه دستگاه‌ها به‌دقت بررسی می‌شود." },
  { t: "راه‌اندازی و پشتیبانی", d: "انتشار سایت و همراهی مستمر برای رشد و توسعه آینده." },
];

export default function Journey() {
  return (
    <section id="journey" className="relative overflow-hidden bg-char py-24 md:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-brand/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionTitle
            dark
            eyebrow="مسیر همکاری"
            title={
              <>
                یک سفر حرفه‌ای در <span className="text-brand">مسیر موفقیت</span>
              </>
            }
            sub="طراحی یک وبسایت حرفه‌ای، یک برنامه دقیق و شفاف می‌خواهد. وب‌سیما همه مراحل را برای شما ساده و قابل‌پیگیری کرده است."
          />
        </Reveal>

        <div className="relative mt-20">
          <div className="absolute inset-x-6 top-[1.6rem] hidden h-0.5 border-t-2 border-dashed border-brand/40 lg:block" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 90} className={cn(i % 2 === 1 && "lg:mt-16")}>
                <div className="group relative h-full rounded-[1.8rem] bg-char-2 p-6 transition duration-300 hover:-translate-y-2 hover:bg-brand">
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-brand text-lg font-black text-white ring-4 ring-char transition group-hover:bg-white group-hover:text-brand lg:-mt-12 lg:mb-6" dir="ltr">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-extrabold text-white">{s.t}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/55 transition group-hover:text-white/90">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-24 flex flex-col items-center justify-between gap-8 rounded-[2.5rem] bg-ink p-8 md:flex-row md:p-12">
            <div className="flex items-center gap-6">
              <div className="relative grid h-32 w-32 shrink-0 place-items-center">
                <div className="absolute inset-0 animate-spin-slow rounded-full border-[6px] border-dashed border-brand/70" />
                <div className="text-center">
                  <div className="text-4xl font-black text-white"><CountUp to={98} suffix="%" /></div>
                  <div className="text-[10px] font-bold tracking-wider text-brand" dir="ltr">CSAT</div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-white md:text-2xl">رضایت مشتریان ما</h3>
                <p className="mt-2 text-sm leading-7 text-white/55">از هر ۱۰۰ مشتری، ۹۸ نفر وب‌سیما را به دیگران پیشنهاد می‌کنند.</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Btn>
                <Phone className="h-4 w-4" /> مشاوره رایگان
              </Btn>
              <Btn variant="outlineLight" href="#portfolio">دیدن پروژه‌ها</Btn>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
