import { Award } from "lucide-react";
import { CountUp, Reveal } from "./ui";

const brands = ["Qlean", "iToll", "Analytics", "HomeCubes", "Nemak", "Aras", "Kachiran", "The ISO Council", "Zarrin Apple", "Tolu"];

export default function Clients() {
  const row = [...brands, ...brands];
  return (
    <section className="relative bg-char pb-0">
      <div className="border-y border-white/10 py-10">
        <div className="overflow-hidden" dir="ltr">
          <div className="flex w-max animate-marquee items-center gap-16 pr-16">
            {row.map((b, i) => (
              <span key={i} className="whitespace-nowrap text-3xl font-black tracking-tight text-white/25 transition hover:text-brand md:text-4xl">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 text-center md:px-8">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-xl shadow-brand/30">
          <Award className="h-8 w-8" />
        </div>
        <Reveal>
          <div className="text-7xl font-black text-brand md:text-[9rem] md:leading-none">
            <CountUp to={700} prefix="+" />
          </div>
          <p className="mt-4 text-2xl font-extrabold text-white md:text-4xl">اعتماد شما، شایسته تقدیر است</p>
          <p className="mx-auto mt-4 max-w-xl text-white/55">بیش از ۷۰۰ کسب‌وکار، وب‌سیما را به‌عنوان شریک دیجیتال خود انتخاب کرده‌اند.</p>
        </Reveal>
      </div>
    </section>
  );
}
