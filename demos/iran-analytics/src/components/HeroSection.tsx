import React from 'react';
import { Rocket, Puzzle, CheckCircle2, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenModal: (type: 'signup' | 'ai-demo' | 'ga-compare' | 'search') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-[#FFFFFF]"
    >
      {/* Subtle Grid + Radial Glows */}
      <div className="absolute inset-0 bg-hero-grid pointer-events-none opacity-75" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(680px,140vw)] h-[min(680px,140vw)] bg-radial from-sky-200/45 via-blue-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-16 right-1/4 w-72 h-72 bg-amber-300/15 rounded-full blur-3xl pointer-events-none" />

      {/* Concentric Orbital SVG Rings (Inspired by Reference Hero) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <svg
          className="w-[min(1150px,220vw)] h-auto max-w-none opacity-80"
          viewBox="0 0 1150 660"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="575"
            cy="340"
            rx="270"
            ry="230"
            stroke="#CBD5E1"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
          <ellipse
            cx="575"
            cy="340"
            rx="390"
            ry="320"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          <ellipse
            cx="575"
            cy="340"
            rx="510"
            ry="410"
            stroke="#E2E8F0"
            strokeWidth="1.2"
            strokeDasharray="10 10"
          />
          {/* Glowing Orbital Nodes */}
          <circle cx="845" cy="120" r="14" fill="#FEF3C7" />
          <circle cx="845" cy="120" r="6" fill="#F59E0B" />
          <circle cx="315" cy="495" r="14" fill="#D1FAE5" />
          <circle cx="315" cy="495" r="6" fill="#10B981" />
          <circle cx="200" cy="190" r="10" fill="#DBEAFE" />
          <circle cx="200" cy="190" r="4.5" fill="#0E74D2" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Orbital Cards (Desktop) */}
        {/* Left Floating Card: +25 Million */}
        <div className="hidden lg:flex items-center gap-3.5 absolute left-2 xl:left-6 top-12 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3.5 shadow-xl shadow-slate-900/5 animate-float-slow z-20">
          <div className="flex items-end gap-1 h-10 px-2 py-1 bg-slate-50 rounded-xl border border-slate-100">
            <span className="w-1.5 h-4 bg-sky-400 rounded-full" />
            <span className="w-1.5 h-6 bg-emerald-400 rounded-full" />
            <span className="w-1.5 h-3 bg-amber-400 rounded-full" />
            <span className="w-1.5 h-8 bg-[#0E74D2] rounded-full" />
            <span className="w-1.5 h-5 bg-indigo-400 rounded-full" />
          </div>
          <div className="text-right">
            <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              نرخ پردازش روزانه
            </div>
            <div className="text-base font-black text-slate-800 mt-0.5">+۲۵ میلیون</div>
          </div>
        </div>

        {/* Right Bottom Floating Card: +14 Years */}
        <div className="hidden lg:flex items-center gap-3 absolute right-4 xl:right-10 bottom-10 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 py-3 shadow-xl shadow-slate-900/5 animate-float-delayed z-20">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#F59E0B] font-black text-sm">
            ★
          </div>
          <div className="text-right">
            <div className="text-sm font-black text-slate-800 flex items-center gap-1">
              <span className="text-[#F59E0B]">+۱۴</span> سال
            </div>
            <div className="text-[11px] text-slate-400 font-medium">تجربه تحلیل وب فارسی</div>
          </div>
        </div>

        {/* Right Top Orbital Badge */}
        <div className="hidden lg:flex items-center gap-2 absolute right-14 top-6 bg-white/90 backdrop-blur-md border border-amber-200/80 rounded-full px-3.5 py-1.5 shadow-md text-xs font-bold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          همگام با زیرساخت ابری ایران
        </div>

        {/* Left Bottom Orbital Check Node */}
        <div className="hidden lg:flex items-center justify-center w-10 h-10 absolute left-28 bottom-8 bg-emerald-50 border border-emerald-200 rounded-full shadow-md text-emerald-600">
          <CheckCircle2 className="w-5 h-5" />
        </div>

        {/* Center Hero Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto pt-4">
          {/* Top Eyebrow Pill */}
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 bg-white/90 border border-blue-200/80 rounded-full px-3 sm:px-4 py-1.5 shadow-xs mb-6">
            <Sparkles className="w-4 h-4 shrink-0 text-[#F59E0B]" />
            <span className="text-[11px] sm:text-sm font-bold text-slate-700 text-center">
              پلتفرم بومی تحلیل رفتار کاربران، سئو و هوش مصنوعی
            </span>
            <span className="bg-amber-500 text-slate-950 text-[11px] font-black px-2 py-0.5 rounded-full">
              نسخه ۲۰۲۶
            </span>
          </div>

          {/* Main Display Title */}
          <h1 className="text-[1.85rem] sm:text-5xl md:text-6xl font-black tracking-tight text-[#0F172A] leading-[1.22] px-1">
            تحلیل داده‌ها،
            <span className="block mt-2 bg-gradient-to-l from-[#0E74D2] via-[#0284C7] to-[#38BDF8] bg-clip-text text-transparent">
              تصمیم‌گیری هوشمند
            </span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal px-1">
            آمار بازدید سایت، رفتار کاربران، تحلیل سئو و دستیار هوش مصنوعی — همه در یک داشبورد فارسی.
            جایگزین جذاب <span className="font-semibold text-slate-800">Google Analytics</span> برای
            کسب‌وکارهای ایرانی، با داده‌ای که در ایران می‌ماند و گزارش‌هایی که همیشه در دسترس‌اند.
          </p>

          {/* Dual CTA Row */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 px-1">
            <button
              onClick={() => onOpenModal('signup')}
              className="inline-flex items-center justify-center gap-2.5 bg-[#0E74D2] hover:bg-[#0B5CAD] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>شروع رایگان !</span>
              <Rocket className="w-4 h-4 text-amber-300" />
            </button>

            <a
              href="#wordpress-plugin"
              className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-blue-50/60 text-[#0E74D2] border-2 border-[#0E74D2]/25 hover:border-[#0E74D2] font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-xs transition-all"
            >
              <span>افزونه ایران آنالیتیکس</span>
              <span className="w-6 h-6 rounded-lg bg-blue-50 text-[#0E74D2] flex items-center justify-center">
                <Puzzle className="w-4 h-4" />
              </span>
            </a>
          </div>

          {/* 3 Hero Metric Counters */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200/70 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-black text-[#0E74D2]">+۴۰۰</div>
              <div className="text-[10px] sm:text-sm font-medium text-slate-500 mt-1 leading-snug">
                پروژه انجام شده
              </div>
            </div>
            <div className="text-center border-x border-slate-200/80 px-1 sm:px-2">
              <div className="text-xl sm:text-3xl font-black text-[#0F172A]">+۱۵۰</div>
              <div className="text-[10px] sm:text-sm font-medium text-slate-500 mt-1 leading-snug">
                پروژه سازمانی فعال
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-black text-[#F59E0B]">+۳۵</div>
              <div className="text-[10px] sm:text-sm font-medium text-slate-500 mt-1 leading-snug">
                سرور پردازش ابری
              </div>
            </div>
          </div>

          {/* Mobile Summary Cards */}
          <div className="mt-6 flex lg:hidden items-center justify-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              +۲۵ میلیون رویداد روزانه
            </div>
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
              +۱۴ سال تجربه وب فارسی
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
