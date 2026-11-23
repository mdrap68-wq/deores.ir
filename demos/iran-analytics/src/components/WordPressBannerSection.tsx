import React from 'react';
import { Globe, Download, CheckCircle2 } from 'lucide-react';

interface WordPressBannerSectionProps {
  onOpenModal: (type: 'signup' | 'ai-demo' | 'ga-compare' | 'search') => void;
}

export const WordPressBannerSection: React.FC<WordPressBannerSectionProps> = ({ onOpenModal }) => {
  return (
    <section
      id="wordpress-plugin"
      className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-16 right-1/4 w-64 h-64 bg-sky-100/70 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 left-10 w-64 h-64 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Right Column in RTL: 3D WordPress Plugin Box Mockup (4 cols) */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="relative w-56 sm:w-64 h-56 sm:h-64 flex items-center justify-center group">
              <div className="absolute inset-2 bg-gradient-to-tr from-[#0E74D2]/20 to-[#F59E0B]/20 rounded-3xl blur-xl group-hover:scale-105 transition-transform" />
              <img
                src="/images/wp-plugin-box.png"
                alt="افزونه وردپرس ایران آنالیتیکس IRA"
                className="relative z-10 w-full h-full object-contain rounded-2xl drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Center Column in RTL: Title, Copy & Dual CTAs (4 cols) */}
          <div className="lg:col-span-4 text-right space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#0E74D2] border border-blue-200/70 px-3 py-1 rounded-full text-xs font-extrabold">
              <span>سازگار با وردپرس ۶.۷ و ووکامرس</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] leading-snug">
              آمار کامل سایت وردپرس، همان‌جا که هر روز کار می‌کنید
            </h2>

            <p className="text-xs text-slate-600 leading-6 text-justify">
              افزونه ایران آنالیتیکس، آمار بازدید صفحات، رفتار کاربران، مسیرهای پرش و عملکرد محتوا را
              مستقیماً داخل پیشخوان وردپرس می‌آورد — بدون ابزار خارجی، بدون کندشدن و با داده‌های واقعی.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenModal('signup')}
                className="inline-flex items-center gap-2 bg-[#0E74D2] hover:bg-[#0B5CAD] text-white text-xs font-extrabold px-5 py-3 rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span>صفحه افزونه</span>
              </button>

              <button
                onClick={() => onOpenModal('signup')}
                className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 text-xs font-black px-5 py-3 rounded-xl shadow-md shadow-amber-500/25 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>دانلود مستقیم</span>
              </button>
            </div>
          </div>

          {/* Left Column in RTL: Checklist + 2 Progress Bars (4 cols) */}
          <div className="lg:col-span-4 space-y-4 bg-slate-50/80 rounded-2xl p-5 border border-slate-200/70">
            <div className="space-y-2.5">
              {[
                'نمایش لحظه‌ای آمار بازدید و صفحات پربازدید',
                'داده سئو، ورودی گوگل و صفحات فرود ارگانیک',
                'ردیابی قیف خرید و فروش WooCommerce',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 bg-white rounded-xl px-3 py-2 border border-slate-200/60 text-[11px] font-bold text-slate-700"
                >
                  <span>{item}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#0E74D2] shrink-0" />
                </div>
              ))}
            </div>

            {/* 2 Progress Bars (Matching Reference) */}
            <div className="pt-2 space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                  <span>درصد موقعیت و دقت ردیابی</span>
                  <span className="text-[#0E74D2] font-black">۹۸٪</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-l from-[#0E74D2] to-[#38BDF8] rounded-full w-[98%]" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                  <span>فروش اولین نسخه و رضایت مدیران</span>
                  <span className="text-[#F59E0B] font-black">۹۴٪</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-l from-[#F59E0B] to-[#FBBF24] rounded-full w-[94%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
