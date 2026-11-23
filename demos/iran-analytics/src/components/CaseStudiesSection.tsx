import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ArrowUp, Globe, TrendingUp, Award } from 'lucide-react';

interface CaseStudy {
  id: number;
  title: string;
  category: string;
  domain: string;
  bannerTitle: string;
  bannerSubtitle: string;
  score: number;
  verdict: string;
  metrics: {
    label: string;
    total: string;
    growth: string;
  }[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 0,
    title: 'پروژه آنالیتیکس تکنولایف‌پلاس',
    category: 'فروشگاهی • فروش لوازم دیجیتال',
    domain: 'www.Analysetex.com',
    bannerTitle: 'بیشترین آمار برای سایت شما',
    bannerSubtitle: 'بهینه‌سازی قیف خرید و افزایش رتبه ارگانیک',
    score: 82,
    verdict: 'بسیار عالی',
    metrics: [
      { label: 'ارتقا دامنه در صفحات', total: '۴۵', growth: '۴۸' },
      { label: 'فالوئینگ های فعال', total: '۱۵', growth: '۱۲' },
      { label: 'سرچ کردن دامین', total: '۳۲', growth: '۷۲' },
      { label: 'ارتقا دامنه در صفحات اول', total: '۰۸', growth: '۴۲' },
    ],
  },
  {
    id: 1,
    title: 'پروژه جامع گردشگری سفرمارکت',
    category: 'خدماتی • رزرو آنلاین بلیط و هتل',
    domain: 'www.SafarAnalytics.ir',
    bannerTitle: 'رشد ۲.۴ برابری نرخ تبدیل رزرو',
    bannerSubtitle: 'تحلیل نقشه حرارتی و حذف گلوگاه تسویه‌حساب',
    score: 91,
    verdict: 'فوق‌العاده',
    metrics: [
      { label: 'ارتقا دامنه در صفحات', total: '۶۴', growth: '۵۶' },
      { label: 'فالوئینگ های فعال', total: '۲۹', growth: '۳۴' },
      { label: 'سرچ کردن دامین', total: '۵۱', growth: '۸۵' },
      { label: 'ارتقا دامنه در صفحات اول', total: '۱۴', growth: '۶۰' },
    ],
  },
  {
    id: 2,
    title: 'پروژه فروشگاه مد و پوشاک دیجی‌مد',
    category: 'فروشگاهی • مد و پوشاک آنلاین',
    domain: 'www.ModePulse.ir',
    bannerTitle: 'کاهش ۳۸٪ نرخ رهاسازی سبد خرید',
    bannerSubtitle: 'ردیابی لحظه‌ای رویدادهای ووکامرس و کمپین‌ها',
    score: 87,
    verdict: 'بسیار عالی',
    metrics: [
      { label: 'ارتقا دامنه در صفحات', total: '۳۹', growth: '۴۱' },
      { label: 'فالوئینگ های فعال', total: '۲۲', growth: '۱۹' },
      { label: 'سرچ کردن دامین', total: '۴۴', growth: '۶۸' },
      { label: 'ارتقا دامنه در صفحات اول', total: '۱۱', growth: '۴۹' },
    ],
  },
];

export const CaseStudiesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? CASE_STUDIES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === CASE_STUDIES.length - 1 ? 0 : prev + 1));
  };

  const renderCard = (study: CaseStudy, isCenter: boolean) => {
    const circumference = 2 * Math.PI * 38;
    const strokeDashoffset = circumference - (circumference * study.score) / 100;

    return (
      <div
        className={`rounded-3xl bg-white border transition-all duration-500 p-5 sm:p-6 ${
          isCenter
            ? 'border-sky-200 shadow-2xl shadow-blue-950/10 scale-100 opacity-100 z-20'
            : 'border-slate-200/70 shadow-sm scale-95 opacity-45 hover:opacity-70 cursor-pointer z-10 select-none'
        }`}
        onClick={() => {
          if (!isCenter) setActiveIndex(study.id);
        }}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="px-2.5 py-1 rounded-xl bg-sky-50 border border-sky-200/70 text-[#0E74D2] font-black text-xs">
              IRA
            </div>
            <div className="text-right">
              <h3 className="text-sm font-black text-slate-900">{study.title}</h3>
              <p className="text-[11px] text-slate-400 font-medium">{study.category}</p>
            </div>
          </div>

          <span
            className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60"
            dir="ltr"
          >
            {study.domain}
          </span>
        </div>

        {/* Sky-Blue Graphic Banner */}
        <div className="my-4 rounded-2xl bg-gradient-to-l from-[#BAE6FD] via-[#E0F2FE] to-[#DBEAFE] p-4 flex items-center justify-between gap-4 border border-sky-200/80 relative overflow-hidden">
          <div className="relative z-10 text-right">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0E74D2] bg-white/80 px-2.5 py-0.5 rounded-full mb-1">
              <TrendingUp className="w-3 h-3" />
              گزارش رسمی رشد سئو
            </span>
            <div className="text-base font-black text-[#0B4F9F]">{study.bannerTitle}</div>
            <div className="text-[11px] text-slate-600 mt-0.5">{study.bannerSubtitle}</div>
          </div>

          <div className="relative z-10 w-20 h-16 rounded-xl bg-white/90 border border-sky-300/80 shadow-sm flex flex-col items-center justify-center shrink-0">
            <span className="text-xs font-black text-[#0E74D2]">SEO</span>
            <div className="flex items-end gap-1 mt-1">
              <span className="w-1.5 h-3 bg-amber-400 rounded-full" />
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
              <span className="w-1.5 h-7 bg-[#0E74D2] rounded-full" />
            </div>
          </div>
        </div>

        {/* Bottom Split: Metrics Table (Right) + Circular Gauge (Left) */}
        <div className="grid grid-cols-12 gap-4 items-center pt-1">
          {/* Metrics Table (7 cols) */}
          <div className="col-span-12 sm:col-span-7 space-y-2">
            <div className="grid grid-cols-12 text-[10px] font-bold text-slate-400 px-2">
              <span className="col-span-7 text-right">شاخص ارزیابی</span>
              <span className="col-span-2 text-center">کل</span>
              <span className="col-span-3 text-left">رشد</span>
            </div>

            {study.metrics.map((m, i) => (
              <div
                key={i}
                className="grid grid-cols-12 items-center bg-slate-50/90 hover:bg-sky-50/50 rounded-xl px-2.5 py-2 border border-slate-100 text-xs transition-colors"
              >
                <div className="col-span-7 flex items-center gap-1.5 font-bold text-slate-700">
                  <Globe className="w-3.5 h-3.5 text-[#0E74D2] shrink-0" />
                  <span className="truncate">{m.label}</span>
                </div>
                <div className="col-span-2 text-center font-black text-slate-800">{m.total}</div>
                <div className="col-span-3 flex items-center justify-end gap-0.5 font-black text-emerald-600 text-[11px]">
                  <span>{m.growth}٪</span>
                  <ArrowUp className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>

          {/* Circular Score Gauge (5 cols) */}
          <div className="col-span-12 sm:col-span-5 bg-slate-50/70 rounded-2xl p-3.5 border border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 92 92">
                <circle cx="46" cy="46" r="38" stroke="#E2E8F0" strokeWidth="8" fill="none" />
                <circle
                  cx="46"
                  cy="46"
                  r="38"
                  stroke="#0E74D2"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span className="absolute text-xl font-black text-[#0E74D2]" dir="ltr">
                %{study.score}
              </span>
            </div>

            <div className="mt-2 text-[11px] font-bold text-slate-500">نتیجه گیری :</div>
            <span className="mt-1 inline-flex items-center gap-1 bg-[#0E74D2] text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-xs">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              {study.verdict}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const leftIndex = (activeIndex + 1) % CASE_STUDIES.length;
  const rightIndex = (activeIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length;

  return (
    <section id="portfolio" className="py-14 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            هر آنچه برای تجارت با اعتماد به نفس نیاز دارید
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A]">
            نمونه کارها ایران آنالیتیکس
          </h2>
        </div>

        {/* 3-Column Coverflow Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Right Preview Card (3 cols on desktop) */}
          <div className="hidden lg:block lg:col-span-3 -mr-16">
            {renderCard(CASE_STUDIES[rightIndex], false)}
          </div>

          {/* Center Active Card (6 cols on desktop) */}
          <div className="lg:col-span-6 relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              aria-label="نمونه کار قبلی"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white hover:bg-[#0E74D2] text-slate-700 hover:text-white border border-slate-200 shadow-lg flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {renderCard(CASE_STUDIES[activeIndex], true)}

            <button
              onClick={nextSlide}
              aria-label="نمونه کار بعدی"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white hover:bg-[#0E74D2] text-slate-700 hover:text-white border border-slate-200 shadow-lg flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Left Preview Card (3 cols on desktop) */}
          <div className="hidden lg:block lg:col-span-3 -ml-16">
            {renderCard(CASE_STUDIES[leftIndex], false)}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {CASE_STUDIES.map((study, idx) => (
            <button
              key={study.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === activeIndex ? 'w-8 bg-[#0E74D2]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`اسلاید ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
