import React, { useState } from 'react';
import { Check, X, ChevronLeft, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  onOpenModal: (type: 'signup' | 'ai-demo' | 'ga-compare' | 'search') => void;
}

type BillingPeriod = '1m' | '3m' | '1y';

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenModal }) => {
  const [period, setPeriod] = useState<BillingPeriod>('1m');

  const plans = [
    {
      id: 'free',
      persianName: 'پلن رایگان',
      englishTag: 'Free !',
      description: 'مجموعه‌ای عالی از ویژگی‌ها برای شروع تحلیل و بررسی عملکرد اولیه سایت.',
      theme: 'orange',
      darkCard: false,
      prices: {
        '1m': 'رایگان',
        '3m': 'رایگان',
        '1y': 'رایگان',
      },
      isFree: true,
      features: [
        { label: 'تعداد وبسایت', value: '۰۱', included: true },
        { label: 'محدودیت بازدید روزانه', value: '۱,۰۰۰', included: true },
        { label: 'بازدید صفحات و منابع ورودی', value: null, included: true },
        { label: 'گزارش لحظه‌ای کاربران آنلاین', value: null, included: true },
        { label: 'رویدادهای سفارشی و قیف خرید', value: null, included: false },
        { label: 'نقشه حرارتی و تحلیل اسکرول', value: null, included: false },
        { label: 'موتورهای جستجو و کلمات کلیدی', value: null, included: false },
      ],
    },
    {
      id: 'pro',
      persianName: 'پلن حرفه ای',
      englishTag: 'Professional !',
      description: 'مجموعه‌ای کامل از ابزارهای تحلیل رفتار کاربران و رشد سئو برای سایت‌های در حال رشد.',
      theme: 'blue',
      darkCard: false,
      prices: {
        '1m': '۴.۷۵۰.۰۰۰',
        '3m': '۴.۲۰۰.۰۰۰',
        '1y': '۳.۸۰۰.۰۰۰',
      },
      isFree: false,
      features: [
        { label: 'تعداد وبسایت', value: '۰۵', included: true },
        { label: 'محدودیت بازدید روزانه', value: '۲۵,۰۰۰', included: true },
        { label: 'بازدید صفحات و منابع ورودی', value: null, included: true },
        { label: 'گزارش لحظه‌ای کاربران آنلاین', value: null, included: true },
        { label: 'رویدادهای سفارشی و قیف خرید', value: null, included: true },
        { label: 'نقشه حرارتی و تحلیل اسکرول', value: null, included: false },
        { label: 'موتورهای جستجو و کلمات کلیدی', value: null, included: true },
      ],
    },
    {
      id: 'standard',
      persianName: 'پلن استاندارد',
      englishTag: 'Standard !',
      description: 'مناسب فروشگاه‌های اینترنتی و تیم‌های مارکتینگ با نیاز به ردیابی کامل قیف فروش.',
      theme: 'green',
      darkCard: false,
      prices: {
        '1m': '۷.۷۵۰.۰۰۰',
        '3m': '۶.۹۰۰.۰۰۰',
        '1y': '۶.۲۰۰.۰۰۰',
      },
      isFree: false,
      features: [
        { label: 'تعداد وبسایت', value: '۱۰', included: true },
        { label: 'محدودیت بازدید روزانه', value: '۱۰۰,۰۰۰', included: true },
        { label: 'بازدید صفحات و منابع ورودی', value: null, included: true },
        { label: 'گزارش لحظه‌ای کاربران آنلاین', value: null, included: true },
        { label: 'رویدادهای سفارشی و قیف خرید', value: null, included: true },
        { label: 'نقشه حرارتی و تحلیل اسکرول', value: null, included: true },
        { label: 'موتورهای جستجو و کلمات کلیدی', value: null, included: true },
      ],
    },
    {
      id: 'enterprise',
      persianName: 'پلن سازمانی ویژه',
      englishTag: 'Enterprise !',
      description: 'قدرتمندترین زیرساخت اختصاصی با دستیار هوش مصنوعی IRA و دسترسی کامل API.',
      theme: 'charcoal',
      darkCard: true,
      prices: {
        '1m': '۹.۳۵۰.۰۰۰',
        '3m': '۸.۴۰۰.۰۰۰',
        '1y': '۷.۴۸۰.۰۰۰',
      },
      isFree: false,
      features: [
        { label: 'تعداد وبسایت', value: '۳۰', included: true },
        { label: 'محدودیت بازدید روزانه', value: 'نامحدود', included: true },
        { label: 'بازدید صفحات و منابع ورودی', value: null, included: true },
        { label: 'گزارش لحظه‌ای کاربران آنلاین', value: null, included: true },
        { label: 'رویدادهای سفارشی و قیف خرید', value: null, included: true },
        { label: 'نقشه حرارتی و تحلیل اسکرول', value: null, included: true },
        { label: 'موتورهای جستجو و کلمات کلیدی', value: null, included: true },
      ],
    },
  ];

  const getHeaderClasses = (theme: string) => {
    switch (theme) {
      case 'orange':
        return 'bg-gradient-to-l from-[#F59E0B] to-[#FBBF24] text-white';
      case 'blue':
        return 'bg-gradient-to-l from-[#0E74D2] to-[#38BDF8] text-white';
      case 'green':
        return 'bg-gradient-to-l from-[#22C55E] to-[#4ADE80] text-white';
      case 'charcoal':
        return 'bg-gradient-to-l from-[#27272A] to-[#3F3F46] text-white border-b border-zinc-700';
      default:
        return 'bg-[#0E74D2] text-white';
    }
  };

  const getButtonClasses = (theme: string) => {
    switch (theme) {
      case 'orange':
        return 'bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-amber-500/25';
      case 'blue':
        return 'bg-[#0E74D2] hover:bg-[#0B5CAD] text-white shadow-blue-500/25';
      case 'green':
        return 'bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-emerald-500/25';
      case 'charcoal':
        return 'bg-[#27272A] hover:bg-[#F59E0B] hover:text-slate-950 text-white border border-zinc-600';
      default:
        return 'bg-[#0E74D2] text-white';
    }
  };

  return (
    <section id="pricing" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header & Billing Period Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
        <div className="text-right">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A]">
            پلن های ایران آنالیز !
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-medium">
            هر آنچه برای تجارت با اعتماد به نفس نیاز دارید
          </p>
        </div>

        {/* Interactive Billing Segmented Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
          {[
            { id: '1m', label: '۱ ماهه' },
            { id: '3m', label: '۳ ماهه' },
            { id: '1y', label: 'یکساله (۲۰٪ تخفیف)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPeriod(tab.id as BillingPeriod)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                period === tab.id
                  ? 'bg-[#0E74D2] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <button
            onClick={() => onOpenModal('signup')}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold text-[#0E74D2] bg-white border border-slate-200/80 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <span>همه پلن ها</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4-Column Pricing Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
              plan.darkCard
                ? 'bg-[#18181B] text-white border-2 border-zinc-800 shadow-2xl shadow-zinc-950/30'
                : 'bg-white text-slate-800 border border-slate-200/90 shadow-md shadow-slate-900/5'
            }`}
          >
            <div>
              {/* Colored Top Pill Header */}
              <div
                className={`px-5 py-4 flex items-center justify-between ${getHeaderClasses(
                  plan.theme
                )}`}
              >
                <span className="text-base font-black">{plan.persianName}</span>
                <span className="text-xs font-extrabold opacity-90 font-mono" dir="ltr">
                  {plan.englishTag}
                </span>
              </div>

              {/* Description Box */}
              <div className="p-5 pb-3">
                <div
                  className={`rounded-2xl p-3 text-[11px] leading-relaxed text-center ${
                    plan.darkCard
                      ? 'bg-zinc-800/90 text-zinc-300 border border-zinc-700'
                      : 'bg-slate-50 text-slate-600 border border-slate-100'
                  }`}
                >
                  {plan.description}
                </div>
              </div>

              {/* Feature Comparison Rows */}
              <div className="px-5 py-2 space-y-3">
                {plan.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between text-xs pb-2.5 border-b ${
                      plan.darkCard ? 'border-zinc-800' : 'border-slate-100'
                    }`}
                  >
                    <span
                      className={`font-bold ${
                        plan.darkCard ? 'text-zinc-300' : 'text-slate-700'
                      }`}
                    >
                      {feat.label}
                    </span>

                    {feat.value ? (
                      <span
                        className={`font-black text-xs px-2 py-0.5 rounded-md ${
                          plan.darkCard
                            ? 'bg-zinc-800 text-amber-400'
                            : 'bg-slate-100 text-slate-900'
                        }`}
                      >
                        {feat.value}
                      </span>
                    ) : feat.included ? (
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          plan.darkCard
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          plan.darkCard
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-rose-50 text-rose-500'
                        }`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Price & Action Footer */}
            <div className="p-5 pt-4 mt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => onOpenModal('signup')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black shadow-md transition-all cursor-pointer shrink-0 ${getButtonClasses(
                  plan.theme
                )}`}
              >
                خرید و ارتقا
              </button>

              <div className="text-left">
                {plan.isFree ? (
                  <span className="text-lg font-black text-[#F59E0B] flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    رایگان
                  </span>
                ) : (
                  <div>
                    <div
                      className={`text-base font-black leading-none ${
                        plan.darkCard ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {plan.prices[period]}
                    </div>
                    <div
                      className={`text-[10px] font-medium mt-1 ${
                        plan.darkCard ? 'text-zinc-400' : 'text-slate-400'
                      }`}
                    >
                      تومان / ماهانه
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
