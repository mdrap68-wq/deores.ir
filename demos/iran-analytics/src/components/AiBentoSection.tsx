import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Maximize2, ArrowUpLeft } from 'lucide-react';

interface AiBentoSectionProps {
  onOpenModal: (type: 'signup' | 'ai-demo' | 'ga-compare' | 'search') => void;
}

const toPersianDigits = (num: number): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num)
    .padStart(2, '0')
    .replace(/\d/g, (d) => persianDigits[Number(d)]);
};

export const AiBentoSection: React.FC<AiBentoSectionProps> = ({ onOpenModal }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 34,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 2, hours: 12, minutes: 34, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
        {/* Wide Featured AI Assistant Card (Right Side in RTL - 6 cols) */}
        <div className="lg:col-span-6 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A4D9B] via-[#0E74D2] to-[#082F5E] text-white p-6 sm:p-7 shadow-xl shadow-blue-900/15 border border-blue-400/30 flex flex-col sm:flex-row items-center justify-between gap-6 group">
          {/* Glowing Ambient Orbs */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-300/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 left-10 w-52 h-52 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

          {/* Text & Countdown Content */}
          <div className="relative z-10 flex-1 text-center sm:text-right">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>هوش مصنوعی نسل جدید IRA</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black leading-snug text-white">
              دستیار هوش مصنوعی ایران آنالیتیکس
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-sky-100/90 font-medium">
              تا انتشار نسخه نمایشی اول — ۱۵ مهر
            </p>

            {/* Countdown Pills */}
            <div className="mt-4 flex items-center justify-center sm:justify-start gap-2">
              {[
                { val: timeLeft.seconds, label: 'ثانیه', highlight: true },
                { val: timeLeft.minutes, label: 'دقیقه', highlight: false },
                { val: timeLeft.hours, label: 'ساعت', highlight: false },
                { val: timeLeft.days, label: 'روز', highlight: true },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center min-w-[50px] py-1.5 px-2.5 rounded-xl border backdrop-blur-md ${
                    item.highlight
                      ? 'bg-[#F59E0B] text-slate-950 border-amber-300 font-black shadow-md shadow-amber-500/25'
                      : 'bg-white/15 text-white border-white/25 font-bold'
                  }`}
                >
                  <span className="text-base leading-none">{toPersianDigits(item.val)}</span>
                  <span className="text-[10px] mt-1 opacity-85">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Interactive Preview Trigger */}
            <button
              onClick={() => onOpenModal('ai-demo')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
            >
              <span>تست پیش‌نمایش زنده دستیار هوشمند</span>
              <ArrowUpLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3D IRA Robot Mascot Illustration */}
          <div className="relative z-10 w-40 sm:w-44 h-44 sm:h-48 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-sky-400/30 to-transparent rounded-2xl blur-xl group-hover:scale-105 transition-transform" />
            <img
              src={`${import.meta.env.BASE_URL}images/ira-robot.png`}
              alt="دستیار هوش مصنوعی ایران آنالیتیکس IRA"
              className="w-full h-full object-contain rounded-2xl drop-shadow-[0_14px_24px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Card 2: Real-Time Analytics (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-b from-[#F0F7FF] to-[#E0F2FE]/60 border border-sky-200/80 p-5 flex flex-col items-center justify-between text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="w-full h-24 rounded-2xl bg-white/90 border border-sky-100 flex items-end justify-center gap-2 p-4 shadow-xs">
            <span className="w-2.5 h-8 bg-emerald-400 rounded-full animate-pulse" />
            <span className="w-2.5 h-14 bg-[#0E74D2] rounded-full" />
            <span className="w-2.5 h-10 bg-amber-400 rounded-full" />
            <span className="w-2.5 h-16 bg-emerald-500 rounded-full" />
            <span className="w-2.5 h-6 bg-sky-400 rounded-full" />
            <span className="w-2.5 h-12 bg-[#F59E0B] rounded-full" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-black text-slate-900" dir="ltr">
              Real-Time Analytics
            </h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              پردازش و نمایش داده‌ها به صورت لحظه‌ای و بدون تاخیر، کمتر از ۵ میلی‌ثانیه
            </p>
          </div>
        </div>

        {/* Card 3: Scalability / مقیاس‌پذیری (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-b from-[#F0F7FF] to-[#E0F2FE]/60 border border-sky-200/80 p-5 flex flex-col items-center justify-between text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
          <div className="w-full h-24 rounded-2xl bg-white/90 border border-sky-100 flex items-center justify-center p-4 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0E74D2] to-[#38BDF8] text-white flex items-center justify-center shadow-md shadow-blue-500/25">
              <Maximize2 className="w-7 h-7" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-black text-slate-900">مقیاس‌پذیری</h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              قابلیت پردازش میلیون‌ها رویداد در روز بدون کاهش عملکرد و سرعت
            </p>
          </div>
        </div>

        {/* Card 4: Security & Privacy / امنیت و حریم خصوصی (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white border border-blue-400/50 p-5 flex flex-col items-center justify-between text-center shadow-lg shadow-blue-600/20 hover:-translate-y-1 transition-all">
          <div className="w-full h-24 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center p-4">
            <div className="w-14 h-14 rounded-2xl bg-white text-[#0E74D2] flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-8 h-8 text-[#0E74D2]" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-black text-white">امنیت و حریم خصوصی</h3>
            <p className="mt-1.5 text-xs text-blue-100 leading-relaxed">
              داده‌های شما در سرورهای داخل ایران رمزنگاری و نگهداری می‌شود
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
