import React, { useState } from 'react';
import { Plus, X, Headphones, Star } from 'lucide-react';

interface FaqSectionProps {
  onOpenModal: (type: 'signup' | 'ai-demo' | 'ga-compare' | 'search') => void;
}

const FAQ_ITEMS = [
  {
    id: 0,
    question: 'راهی برای تضمین سود و افزایش نرخ تبدیل وجود دارد؟',
    answer:
      'بله؛ ایران آنالیتیکس با نمایش دقیق نقاط ریزش کاربران در قیف فروش، نقشه حرارتی کلیک‌ها و گزارش کلمات کلیدی پول‌ساز به شما نشان می‌دهد کدام صفحات بیشترین بازگشت سرمایه را دارند و کجا بودجه تبلیغاتی شما هدر می‌رود.',
  },
  {
    id: 1,
    question: 'داده های داخلی سرور چگونه محافظت می‌شوند؟',
    answer:
      'هوش مصنوعی گوگل دیگر به زوج رسیده و حالا در اوج بلوغ خود به سر می‌برد. ما حاصل بزرگ‌ترین فناوری‌های هوش مصنوعی گوگل و تاثیر آن بر سرچ را در این مقاله بخوانید. تمامی داده‌های ایران آنالیتیکس روی سرورهای ابری داخل کشور با رمزنگاری دوطرفه نگهداری می‌شوند و تحت هیچ شرایطی در اختیار اشخاص ثالث قرار نمی‌گیرند.',
  },
  {
    id: 2,
    question: 'استراتژی درست یا دیسیپلین تحلیلی کدام است؟',
    answer:
      'استراتژی بدون پایش مستمر داده‌ها فقط یک حدس است. با تنظیم گزارش‌های خودکار هفتگی و هشدارهای آنی افت ترافیک در ایران آنالیتیکس، تیم مارکتینگ و محصول شما همواره بر مبنای رفتار واقعی کاربران تصمیم‌گیری می‌کنند.',
  },
  {
    id: 3,
    question: 'امنیت داخلی ربات و تشخیص ترافیک فیک چگونه کار می‌کند؟',
    answer:
      'موتور فیلترینگ هوشمند IRA به صورت لحظه‌ای ترافیک بات‌ها، اسکرپرها و کلیک‌های فیک تبلیغاتی را شناسایی و از آمار اصلی جدا می‌کند تا گزارش‌های سئو و نرخ تبدیل شما ۱۰۰٪ منطبق بر کاربران واقعی باشد.',
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenModal }) => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Right Column in RTL: Header + Blue Dedicated Support Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6 text-right">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0E74D2]" />
              <span>سوالات متداول | FAQ</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A]">
              سوالات متداول شما !
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-7 text-justify">
              دسترسی‌های نقش‌محور، کلیدهای API، هشدارها و تنظیم دوره نگهداری داده‌ها باید به زبان ساده و
              بدون ادعای مبهم نمایش داده شوند.
            </p>
          </div>

          {/* Dedicated Support Card (Matching Reference) */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1D78D8] via-[#0E74D2] to-[#0A4D9B] text-white p-6 sm:p-7 shadow-xl shadow-blue-900/15 border border-blue-400/30">
            {/* Decorative Concentric Wave Circles */}
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full border border-white/15 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border border-white/10 pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <h3 className="text-base sm:text-lg font-black leading-relaxed">
                اگر نیاز به پشتیبانی اختصاصی دارید متخصصین های ما در کنار شما هستند
              </h3>

              <p className="text-xs text-sky-100/90 font-medium">
                پشتیبانی ۲۴ ساعته آنلاین همراه شماست
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                {/* Support CTA Pill */}
                <button
                  onClick={() => onOpenModal('ai-demo')}
                  className="inline-flex items-center gap-2 bg-amber-300/95 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  <Headphones className="w-4 h-4" />
                  <span>پشتیبانی اختصاصی</span>
                </button>

                {/* Avatar Stack + Rating */}
                <div className="flex items-center gap-2.5">
                  <div className="text-left">
                    <div className="flex items-center gap-0.5 text-amber-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-300" />
                      ))}
                    </div>
                    <div className="text-[10px] text-sky-100 font-bold mt-0.5">
                      ۱۵,۰۰۰+ رضایت مشتری
                    </div>
                  </div>

                  <div className="flex -space-x-2 space-x-reverse">
                    {['ع', 'س', 'م'].map((letter, idx) => (
                      <span
                        key={idx}
                        className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center text-[11px] font-black text-white"
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column in RTL: Accordion List (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-sky-50/60 border-sky-200 shadow-sm'
                    : 'bg-slate-50/90 hover:bg-white border-slate-200/80'
                }`}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full px-5 py-4 text-right flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span
                    className={`text-sm font-black transition-colors ${
                      isOpen ? 'text-[#0E74D2]' : 'text-slate-800'
                    }`}
                  >
                    • {item.question}
                  </span>

                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#0E74D2] text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-7 text-justify border-t border-sky-100/80">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
