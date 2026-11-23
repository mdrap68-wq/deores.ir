import React from 'react';
import { BadgeCheck } from 'lucide-react';

export const ClientsStrip: React.FC = () => {
  const brands = [
    {
      englishName: 'GoFeels',
      persianName: 'برند گوفیلس',
      domain: 'WWW.GOFEELS.COM',
    },
    {
      englishName: 'MeUndies',
      persianName: 'برند می اندیس',
      domain: 'WWW.MEUNDIES.COM',
    },
    {
      englishName: 'slack',
      persianName: 'برند گوفیلس',
      domain: 'WWW.GOFEELS.COM',
    },
  ];

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[#0E74D2]" />
          <span>مشتریان ما | Customers</span>
        </div>
        <p className="text-xs text-slate-400 font-medium">
          هر آنچه برای تجارت با اعتماد به نفس نیاز دارید
        </p>
        <h2 className="mt-1 text-2xl sm:text-3xl font-black text-[#0F172A]">
          اعتبار ما ، اعتماد شماست!
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {brands.map((brand, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-slate-100/90 hover:bg-white border border-slate-200/80 hover:border-sky-200 px-6 py-5 flex items-center justify-between gap-4 transition-all hover:shadow-md"
          >
            {/* Right Side in RTL: Brand Logo Wordmark */}
            <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 font-mono">
              {brand.englishName}
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-slate-200" />

            {/* Left Side in RTL: Persian Name + Verified Badge + Domain */}
            <div className="text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
                <span>{brand.persianName}</span>
                <BadgeCheck className="w-4 h-4 text-[#0E74D2]" />
              </div>
              <div className="text-[10px] font-mono text-slate-400 tracking-wider mt-0.5">
                {brand.domain}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
