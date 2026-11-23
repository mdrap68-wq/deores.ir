import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpLeft } from "lucide-react";
import { Btn, Reveal, SectionTitle } from "./ui";
import { cn } from "../utils/cn";

type Cat = "all" | "shop" | "corp" | "app";
const filters: { id: Cat; label: string }[] = [
  { id: "all", label: "همه پروژه‌ها" },
  { id: "shop", label: "فروشگاهی" },
  { id: "corp", label: "شرکتی" },
  { id: "app", label: "رابط کاربری" },
];

const projects = [
  { name: "Qlean", cat: "app" as Cat, label: "خدمات نظافت", bg: "bg-[#ff5a1f]", fg: "text-white", special: true },
  { name: "Aras", cat: "corp" as Cat, label: "سایت شرکتی", bg: "bg-[#f4f0eb]", fg: "text-char", special: false },
  { name: "HomeCubes", cat: "shop" as Cat, label: "فروشگاه اینترنتی", bg: "bg-[#2a2826]", fg: "text-white", special: true },
  { name: "iToll", cat: "app" as Cat, label: "اپلیکیشن وب", bg: "bg-[#ffd2bd]", fg: "text-char", special: false },
  { name: "Nemak", cat: "corp" as Cat, label: "سایت شرکتی", bg: "bg-[#0d0d0d]", fg: "text-white", special: true },
  { name: "Analytics", cat: "shop" as Cat, label: "فروشگاه اینترنتی", bg: "bg-[#e9e3dc]", fg: "text-char", special: false },
  { name: "Kachiran", cat: "corp" as Cat, label: "سایت شرکتی", bg: "bg-[#e6460c]", fg: "text-white", special: false },
];

function MiniUI({ dark }: { dark: boolean }) {
  const bar = dark ? "bg-white/25" : "bg-char/15";
  return (
    <div className={cn("mx-auto mt-6 w-[78%] rounded-2xl p-3 shadow-xl", dark ? "bg-white/10" : "bg-white/70")}>
      <div className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-brand" />
        <span className={cn("h-2 w-2 rounded-full", bar)} />
        <span className={cn("h-2 w-2 rounded-full", bar)} />
      </div>
      <div className={cn("mt-3 h-16 rounded-xl", bar)} />
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className={cn("h-10 rounded-lg", bar)} />
        <div className={cn("h-10 rounded-lg", bar)} />
        <div className={cn("h-10 rounded-lg", bar)} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [cat, setCat] = useState<Cat>("all");
  const scroller = useRef<HTMLDivElement>(null);
  const list = projects.filter((p) => cat === "all" || p.cat === cat);
  const go = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  return (
    <section id="portfolio" className="relative bg-char pb-24 pt-10 md:pb-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionTitle
            dark
            eyebrow="Success Stories"
            title={
              <>
                نمونه‌کارهای طراحی وبسایت <span className="text-brand">وب‌سیما</span>
              </>
            }
            sub="برای یک نگاه نزدیک‌تر، پروژه‌هایی که با هم ساخته‌ایم را ببینید؛ هر کدام داستانی از رشد و موفقیت است."
          />
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setCat(f.id)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-bold transition",
                cat === f.id ? "bg-brand text-white" : "border border-white/15 text-white/70 hover:border-brand hover:text-white"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={scroller} className="no-scrollbar mt-12 flex snap-x gap-5 overflow-x-auto px-5 pb-4 md:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {list.map((p) => (
          <article
            key={p.name}
            className={cn(
              "group relative flex h-[460px] w-[260px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[2.2rem] p-5 transition-transform duration-500 hover:-translate-y-2 md:h-[520px] md:w-[300px]",
              p.bg,
              p.fg
            )}
          >
            <div className="flex items-start justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-black/15 transition group-hover:bg-black group-hover:text-brand">
                <ArrowUpLeft className="h-5 w-5" />
              </span>
              {p.special && <span className="rounded-full bg-black/20 px-3 py-1 text-[11px] font-bold backdrop-blur">ویژه</span>}
            </div>
            <div>
              <div className="text-center text-3xl font-black tracking-tight" dir="ltr">{p.name}</div>
              <MiniUI dark={p.fg === "text-white"} />
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-black/15 px-4 py-3 text-sm font-bold backdrop-blur">
              <span>{p.label}</span>
              <span className="h-2 w-2 rounded-full bg-brand" />
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl items-center justify-between px-5 md:px-8">
        <div className="flex gap-2">
          <button onClick={() => go(1)} aria-label="قبلی" className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white transition hover:border-brand hover:bg-brand">
            <ArrowRight className="h-5 w-5" />
          </button>
          <button onClick={() => go(-1)} aria-label="بعدی" className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white transition hover:border-brand hover:bg-brand">
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
        <Btn>مشاهده همه نمونه‌کارها</Btn>
      </div>
    </section>
  );
}
