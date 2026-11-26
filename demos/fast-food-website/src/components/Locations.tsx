import { useState } from "react";
import { BRANCHES } from "../data/branches";
import { MapPin, Phone, Clock } from "lucide-react";
import { faIndex } from "../lib/format";

export default function Locations() {
  const [active, setActive] = useState(0);

  return (
    <section id="locations" className="relative bg-cream py-16 text-ink sm:py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-5 md:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6 md:mb-16">
          <div>
            <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-4" data-reveal>
              <span className="tabular-fa text-xs font-bold tracking-[0.25em] text-wine">۰۴</span>
              <span className="h-px w-10 bg-ink/25 sm:w-14" />
              <span className="text-xs font-semibold tracking-wide text-clay">شعبه‌ها</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-6xl" data-reveal>
              سه تا خونه تو تهران
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-6 text-clay sm:text-sm sm:leading-7" data-reveal>
            روی هر محله بزن تا آدرس و مسیر ارسالش رو ببینی.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12">
          {/* ——— stylized map ——— */}
          <div className="relative overflow-hidden bg-ink pt-9 lg:col-span-7 lg:pt-0" data-reveal-img>
            <svg viewBox="0 0 100 62" className="block h-auto w-full" role="img" aria-label="نقشه شماتیک شعبه‌های بایت در تهران">
              {/* mountains */}
              <path d="M0 8 L14 1 30 7 44 2 62 8 78 3 100 9" fill="none" stroke="#2E2A24" strokeWidth="0.7" />
              {/* river/vali-ye-asr spine */}
              <path d="M52 62 C50 48 58 38 54 26 C51 17 56 10 54 4" fill="none" stroke="#4A443A" strokeWidth="0.9" />
              {/* boulevards */}
              <path d="M0 20 H100 M0 34 C30 33 70 36 100 34 M0 48 C35 47 65 50 100 49" fill="none" stroke="#2E2A24" strokeWidth="0.55" />
              <path d="M20 62 V10 M34 62 C36 44 30 30 34 12 M72 62 V6 M86 62 V12" fill="none" stroke="#2E2A24" strokeWidth="0.45" />
              <path d="M6 12 C20 22 24 40 12 58 M90 8 C80 24 82 44 92 56" fill="none" stroke="#232019" strokeWidth="0.4" />
              {/* coverage rings */}
              {BRANCHES.map((b, i) => (
                <circle
                  key={`ring-${b.id}`}
                  cx={b.x}
                  cy={b.y * 0.62}
                  r={active === i ? 9 : 0}
                  fill="none"
                  stroke="#792030"
                  strokeWidth="0.5"
                  strokeDasharray="1.6 1.6"
                  className="transition-all duration-700"
                />
              ))}
              {/* city label */}
              <text x="92" y="58" fontSize="4.4" fill="#4A443A" textAnchor="end" fontWeight="700">
                تهران
              </text>
              {/* north arrow */}
              <g transform="translate(6 8)">
                <path d="M0 4 L1.6 0 L3.2 4" fill="none" stroke="#8A8172" strokeWidth="0.5" />
                <text x="1.6" y="7.5" fontSize="2.6" fill="#8A8172" textAnchor="middle">N</text>
              </g>
            </svg>

            {/* pins */}
            {BRANCHES.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setActive(i)}
                aria-label={`شعبه ${b.area}`}
                aria-pressed={active === i}
                className="group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${b.x}%`, top: `${b.y}%` }}
              >
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    active === i ? "scale-100 bg-acid/20" : "scale-0 bg-transparent"
                  }`}
                  aria-hidden
                />
                <span
                  className={`relative block rounded-full border-2 transition-all duration-300 ${
                    active === i
                      ? "h-4 w-4 border-ink bg-acid"
                      : "h-3 w-3 border-ink bg-paper group-hover:bg-acid"
                  }`}
                  style={{ animation: active === i ? "pinPulse 1.6s ease-in-out infinite" : undefined }}
                />
                <span
                  className={`absolute bottom-full right-1/2 z-10 mb-2 translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold transition-all duration-300 sm:px-3 sm:py-1.5 sm:text-[11px] ${
                    active === i
                      ? "bg-acid text-ink"
                      : "hidden bg-paper/10 text-paper backdrop-blur-sm group-hover:bg-paper group-hover:text-ink md:block"
                  }`}
                >
                  {b.area}
                </span>
              </button>
            ))}

            <style>{`
              @keyframes pinPulse {
                0%, 100% { box-shadow: 0 0 0 0 rgba(205, 240, 82, 0.45); }
                50% { box-shadow: 0 0 0 10px rgba(205, 240, 82, 0); }
              }
            `}</style>
          </div>

          {/* ——— branch cards ——— */}
          <div className="flex flex-col gap-3 lg:col-span-5">
            {BRANCHES.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                data-reveal
                data-delay={String(i * 0.06)}
                className={`group border p-5 text-start transition-all duration-400 sm:p-6 md:p-7 ${
                  active === i
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/15 bg-transparent text-ink hover:border-ink/40"
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-3 sm:items-center">
                  <span className="flex min-w-0 items-center gap-2 text-base font-extrabold sm:text-lg md:text-xl">
                    <MapPin className={`h-4 w-4 shrink-0 ${active === i ? "text-acid" : "text-wine"}`} aria-hidden />
                    <span className="leading-snug">تهران — {b.area}</span>
                  </span>
                  <span className={`tabular-fa text-xs font-bold ${active === i ? "text-acid" : "text-clay"}`}>
                    {faIndex(i + 1)}
                  </span>
                </div>
                <span className={`mb-4 block text-[13px] leading-6 ${active === i ? "text-sand" : "text-clay"}`}>{b.address}</span>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold">
                  <span className={`flex items-center gap-1.5 ${active === i ? "text-paper" : "text-ink"}`}>
                    <Phone className="h-3.5 w-3.5" aria-hidden />
                    <span className="tabular-fa" dir="ltr">
                      {b.phone}
                    </span>
                  </span>
                  <span className={`flex items-center gap-1.5 ${active === i ? "text-paper" : "text-ink"}`}>
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    <span className="tabular-fa" dir="ltr">
                      {b.hours}
                    </span>
                  </span>
                </div>
                <span className={`mt-3 block border-t pt-3 text-[11px] leading-6 ${active === i ? "border-paper/15 text-fog" : "border-ink/10 text-clay"}`}>
                  <span className={`font-bold ${active === i ? "text-acid" : "text-wine"}`}>محدوده ارسال: </span>
                  {b.coverage}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
