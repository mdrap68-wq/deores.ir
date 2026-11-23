import React from 'react';
import { Check, Rocket, BarChart2, TrendingUp } from 'lucide-react';

interface SeoFocusSectionProps {
  onOpenModal: (type: 'signup' | 'ai-demo' | 'ga-compare' | 'search') => void;
}

export const SeoFocusSection: React.FC<SeoFocusSectionProps> = ({ onOpenModal }) => {
  const checkItems = [
    'نمایش لحظه‌ای آمار بازدید و صفحات پربازدید',
    'تحلیل رفتار کاربران برای بهبود UX و نرخ تبدیل',
    'داده سئو، ورودی گوگل و صفحات فرود ارگانیک',
    'ردیابی قیف خرید و فروش WooCommerce',
    'شناسایی کلمات کلیدی پول‌ساز و نرخ پرش واقعی',
  ];

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Right Column in RTL: Content & Checklist Pills + CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-5 text-right order-2 lg:order-1">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0E74D2]" />
              <span>چالش اختصاصی وردپرس | سئو</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] leading-snug">
              تحلیل سئو با تمرکز بر{' '}
              <span className="text-[#0E74D2]">رفتار واقعی کاربران</span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-7 max-w-xl">
              رتبه گرفتن کافی نیست؛ باید بدانید کاربر بعد از ورود چه می‌کند. ایران آنالیتیکس آمار بازدید
              و رفتار کاربران را کنار هم می‌گذارد تا تصمیم‌های سئو و محتوا بر اساس داده واقعی بگیرید — نه
              حدس.
            </p>
          </div>

          {/* Staggered 2-Column Checklist Pills (Matching Reference) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {checkItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between gap-2.5 bg-slate-50 hover:bg-sky-50/70 border border-slate-200/80 rounded-xl px-3.5 py-2.5 transition-colors ${
                  idx === 4 ? 'sm:col-span-2 sm:max-w-sm' : ''
                }`}
              >
                <span className="text-xs font-bold text-slate-700">{item}</span>
                <span className="w-5 h-5 rounded-md bg-[#0E74D2] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>

          {/* Dual CTA Row */}
          <div className="pt-3 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onOpenModal('ga-compare')}
              className="inline-flex items-center gap-2 bg-[#0E74D2] hover:bg-[#0B5CAD] text-white text-xs sm:text-sm font-extrabold px-5 py-3 rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <BarChart2 className="w-4 h-4" />
              <span>مقایسه با Google Analytics</span>
            </button>

            <button
              onClick={() => onOpenModal('signup')}
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 text-xs sm:text-sm font-black px-6 py-3 rounded-xl shadow-md shadow-amber-500/25 transition-all cursor-pointer"
            >
              <span>شروع رایگان !</span>
              <Rocket className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Left Column in RTL: 3D SEO Illustration Card (5 cols) */}
        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#DBEAFE] via-[#E0F2FE] to-[#F0F9FF] p-5 border border-sky-200/90 shadow-xl shadow-sky-900/5 overflow-hidden group">
            <img
              src="/images/seo-3d-illustration.png"
              alt="تحلیل سئو و رفتار کاربران ایران آنالیتیکس"
              className="w-full h-64 sm:h-72 object-cover rounded-2xl shadow-md group-hover:scale-[1.03] transition-transform duration-500"
            />

            {/* Floating Live Organic Traffic Badge */}
            <div className="absolute bottom-7 right-7 bg-white/95 backdrop-blur-md border border-sky-200 rounded-2xl px-3.5 py-2 shadow-lg flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-semibold">نرخ تبدیل ارگانیک</div>
                <div className="text-xs font-black text-slate-900">+۶۴٪ رشد واقعی</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
