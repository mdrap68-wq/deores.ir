import React from 'react';
import { Puzzle, Rocket, PieChart, ShoppingBag, ChevronLeft } from 'lucide-react';

interface PlatformToolsSectionProps {
  onOpenModal: (type: 'signup' | 'ai-demo' | 'ga-compare' | 'search') => void;
}

export const PlatformToolsSection: React.FC<PlatformToolsSectionProps> = ({ onOpenModal }) => {
  const tools = [
    {
      id: 'wp-plugin',
      title: 'افزونه آمار وردپرس',
      tag: 'Analyse',
      featured: true,
      icon: <Puzzle className="w-6 h-6" />,
      description:
        'نصب در کمتر از ۶۰ ثانیه روی هر سایت وردپرسی؛ مشاهده آمار بازدید لحظه‌ای، کلمات کلیدی ورودی، نرخ پرش و گزارش‌های ووکامرس مستقیماً داخل پیشخوان وردپرس بدون کاهش سرعت سایت.',
      actionLabel: 'مشاهده و دانلود',
    },
    {
      id: 'quick-start',
      title: 'شروع سریع پلتفرم',
      tag: 'Analyse',
      featured: false,
      icon: <Rocket className="w-6 h-6 text-[#F59E0B]" />,
      description:
        'فقط با قرار دادن یک قطعه کد سبک (کمتر از ۳ کیلوبایت) در هدر سایت، تمام رویدادها، کلیک‌ها، اسکرول‌ها و منابع ورودی کاربران را بدون نیاز به تنظیمات پیچیده ردیابی کنید.',
      actionLabel: 'مشاهده و دانلود',
    },
    {
      id: 'seo-content',
      title: 'تحلیل سئو و محتوا',
      tag: 'Analyse',
      featured: false,
      icon: <PieChart className="w-6 h-6 text-[#0E74D2]" />,
      description:
        'بررسی عملکرد واقعی صفحات فرود ارگانیک، نرخ کلیک کلمات کلیدی، زمان ماندگاری کاربر در مقالات وبلاگ و شناسایی محتوایی که بیشترین تبدیل را برای کسب‌وکار شما ایجاد می‌کند.',
      actionLabel: 'مشاهده و دانلود',
    },
    {
      id: 'ecommerce',
      title: 'آنالیتیک فروشگاهی',
      tag: 'Analyse',
      featured: false,
      icon: <ShoppingBag className="w-6 h-6 text-emerald-600" />,
      description:
        'تحلیل دقیق قیف خرید مشتریان از مشاهده محصول تا افزودن به سبد خرید و پرداخت نهایی؛ شناسایی دلایل رها شدن سبد خرید و محاسبه دقیق نرخ بازگشت سرمایه (ROI) کمپین‌ها.',
      actionLabel: 'مشاهده و دانلود',
    },
  ];

  return (
    <section id="tools" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-[2.25rem] bg-gradient-to-b from-[#F1F5F9]/90 via-[#F8FAFC] to-[#EFF6FF]/60 border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
        {/* Top Browser Bar Accent (Matching Reference) */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400" dir="ltr">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="font-mono text-[11px] text-slate-500 ml-1">www.radbin.ir / tools</span>
          </div>
          <span className="text-[11px] font-sans text-slate-400" dir="rtl">
            مجموعه کامل ابزارهای تحلیلی
          </span>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            هر آنچه برای تجارت با اعتماد به نفس نیاز دارید
          </p>
          <h2 className="mt-1.5 text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A]">
            یک <span className="text-[#F59E0B]">پلتفرم</span> ، همه ابزار های تحلیل!
          </h2>
        </div>

        {/* 4 Vertical Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                tool.featured
                  ? 'bg-gradient-to-b from-[#1E78D8] to-[#0E5CAD] text-white shadow-xl shadow-blue-600/20 border border-blue-400/40'
                  : 'bg-white hover:bg-white text-slate-800 border border-slate-200/80 shadow-xs hover:shadow-md'
              }`}
            >
              <div>
                {/* Card Top Header */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="text-right">
                    <h3
                      className={`text-base font-black ${
                        tool.featured ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {tool.title}
                    </h3>
                    <span
                      className={`text-xs font-medium ${
                        tool.featured ? 'text-sky-200' : 'text-slate-400'
                      }`}
                    >
                      {tool.tag}
                    </span>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      tool.featured
                        ? 'bg-white/20 text-white backdrop-blur-md border border-white/25'
                        : 'bg-slate-50 border border-slate-200/70'
                    }`}
                  >
                    {tool.icon}
                  </div>
                </div>

                {/* Description */}
                <p
                  className={`text-xs leading-6 text-justify ${
                    tool.featured ? 'text-blue-50/95' : 'text-slate-600'
                  }`}
                >
                  {tool.description}
                </p>
              </div>

              {/* Card Bottom CTA */}
              <div className="mt-7 pt-4 border-t border-current/10 flex justify-end">
                <button
                  onClick={() => onOpenModal('signup')}
                  className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-4 py-2 rounded-full transition-all cursor-pointer ${
                    tool.featured
                      ? 'bg-white text-[#0E74D2] hover:bg-amber-400 hover:text-slate-950 shadow-sm'
                      : 'bg-slate-100 hover:bg-[#0E74D2] text-slate-700 hover:text-white'
                  }`}
                >
                  <span>{tool.actionLabel}</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 2 Horizontal Action Banners Below (Matching Reference) */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              title: 'شروع سریع پلتفرم ابری',
              subtitle: 'Analyse • راه‌اندازی رایگان در ۲ دقیقه',
            },
            {
              title: 'مهاجرت آسان از Google Analytics 4',
              subtitle: 'Analyse • انتقال کامل رویدادها و قیف‌ها',
            },
          ].map((banner, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl px-6 py-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4 hover:border-[#0E74D2]/40 transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#F59E0B] shrink-0">
                  <Rocket className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-[#0E74D2]">{banner.title}</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {banner.subtitle}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenModal(idx === 1 ? 'ga-compare' : 'signup')}
                className="inline-flex items-center gap-1 bg-slate-100 hover:bg-[#0E74D2] text-slate-700 hover:text-white text-xs font-bold px-4 py-2 rounded-full transition-colors cursor-pointer shrink-0"
              >
                <span>مشاهده و دانلود</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
