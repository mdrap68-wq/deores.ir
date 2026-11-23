import { ArrowUpLeft } from "lucide-react";
import { Reveal } from "./ui";

export default function CtaCards() {
  return (
    <section id="contact" className="bg-white pb-24 md:pb-32">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-2 md:px-8">
        <Reveal>
          <a href="#contact" className="group relative block h-72 overflow-hidden rounded-[2.5rem] bg-brand p-8 text-white md:h-80 md:p-10">
            <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/15 transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute bottom-10 left-24 h-20 w-20 rounded-2xl border-4 border-white/30 rotate-12" />
            <span className="text-xs font-bold tracking-widest text-white/80" dir="ltr">SEO & DIGITAL MARKETING</span>
            <h3 className="mt-3 max-w-xs text-3xl font-black leading-snug md:text-4xl">سئو و بازاریابی دیجیتال</h3>
            <p className="mt-3 max-w-xs text-sm leading-7 text-white/85">دیده شدن در گوگل و جذب مشتری هدفمند</p>
            <span className="absolute bottom-8 right-8 grid h-14 w-14 place-items-center rounded-full bg-white text-brand transition group-hover:bg-char group-hover:text-white">
              <ArrowUpLeft className="h-6 w-6" />
            </span>
          </a>
        </Reveal>
        <Reveal delay={120}>
          <a href="#contact" className="group relative block h-72 overflow-hidden rounded-[2.5rem] bg-char p-8 text-white md:h-80 md:p-10">
            <div className="absolute -bottom-20 -left-10 h-0 w-0 border-x-[110px] border-b-[190px] border-x-transparent border-b-brand/90 transition-transform duration-500 group-hover:-translate-y-3" />
            <span className="text-xs font-bold tracking-widest text-white/60" dir="ltr">DIGITAL STRATEGY</span>
            <h3 className="mt-3 max-w-xs text-3xl font-black leading-snug md:text-4xl">استراتژی دیجیتال</h3>
            <p className="mt-3 max-w-xs text-sm leading-7 text-white/65">نقشه راه رشد آنلاین برای کسب‌وکار شما</p>
            <span className="absolute bottom-8 right-8 grid h-14 w-14 place-items-center rounded-full bg-brand text-white transition group-hover:bg-white group-hover:text-brand">
              <ArrowUpLeft className="h-6 w-6" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
