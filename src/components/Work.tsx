import { featuredProjects, type Project } from "../data";
import { ArrowIcon, SectionHead } from "./Chrome";

function MetaTags({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {items.map((m) => (
        <li
          key={m}
          className="rounded-[2px] border border-graphite/12 bg-cream/60 px-2.5 py-1.5 text-[11px] text-graphite/68"
        >
          {m}
        </li>
      ))}
    </ul>
  );
}

function ProjectLink() {
  return (
    <span className="mt-6 inline-flex items-center gap-2.5 border-b border-graphite/25 pb-1.5 text-[13px] font-bold text-graphite transition-colors duration-300 group-hover:border-rose group-hover:text-plum">
      مشاهده پروژه
      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
    </span>
  );
}

function FeaturedCard({ p }: { p: Project }) {
  return (
    <article className="group" data-reveal>
      <a href={p.link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="grain relative overflow-hidden rounded-[4px] border border-graphite/12 bg-cream">
          <img
            src={p.img}
            alt={`پیش‌نمایش صفحه اول ${p.title}`}
            loading="lazy"
            decoding="async"
            className="aspect-[16/11] w-full object-cover object-top transition-transform duration-[1100ms] ease-out group-hover:scale-[1.03] sm:aspect-[3/2]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/28 via-transparent to-transparent" />
          <span className="font-grotesk latin tnum absolute right-4 top-4 rounded-[2px] bg-graphite/55 px-2.5 py-1.5 text-[9.5px] tracking-[0.26em] text-paper backdrop-blur-sm">
            P—{p.index}
          </span>
          <span className="absolute bottom-4 left-4 rounded-[2px] bg-paper/85 px-2.5 py-1 text-[10px] text-graphite/70 backdrop-blur-sm">
            {p.year}
          </span>
        </div>

        <div className="mt-6">
          <span className="text-[11px] font-bold tracking-[0.12em] text-plum">{p.type}</span>
          <h3 className="mt-2.5 text-[clamp(1.32rem,4.8vw,1.95rem)] font-extrabold leading-[1.55] text-graphite">
            {p.title}
          </h3>
          <p className="mt-3.5 max-w-[54ch] text-[13.5px] leading-[2.1] text-graphite/66">{p.desc}</p>
          <MetaTags items={p.meta} />
          <ProjectLink />
        </div>
      </a>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative pt-24 md:pt-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <SectionHead
          index="02"
          latin="PORTFOLIO"
          title="بخشی از تجربه‌های ما"
          sub="هر پروژه، یک تجربه اختصاصی برای تبدیل ایده به یک محصول دیجیتال کاربردی."
        />

        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:mt-16 lg:gap-x-12 lg:gap-y-16">
          {featuredProjects.map((p) => (
            <FeaturedCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
