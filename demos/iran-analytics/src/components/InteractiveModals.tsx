import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Check,
  Copy,
  CheckCheck,
  Rocket,
  Send,
  Search,
  BarChart2,
  ShieldCheck,
} from 'lucide-react';

export type ModalType = 'signup' | 'ai-demo' | 'ga-compare' | 'search' | null;

interface InteractiveModalsProps {
  activeModal: ModalType;
  onClose: () => void;
}

export const InteractiveModals: React.FC<InteractiveModalsProps> = ({ activeModal, onClose }) => {
  const [domain, setDomain] = useState('digistore.ir');
  const [copiedScript, setCopiedScript] = useState(false);
  const [submittedSignup, setSubmittedSignup] = useState(false);

  const [aiPromptIndex, setAiPromptIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  if (!activeModal) return null;

  const aiPrompts = [
    {
      q: 'چرا نرخ پرش صفحه تسویه‌حساب در ۳ روز گذشته بالا رفته است؟',
      a: 'بررسی نقشه حرارتی و رویدادهای خطا نشان می‌دهد در نسخه موبایل (iOS Safari)، دکمه «ثبت کد تخفیف» روی دکمه پرداخت نهایی همپوشانی پیدا کرده و باعث ۲۴٪ ترک سبد خرید شده است. پیشنهاد: فاصله عمودی فرم کد تخفیف را ۱۲ پیکسل افزایش دهید.',
      impact: '+۱۸٪ بهبود نرخ خرید پیش‌بینی‌شده',
    },
    {
      q: 'کدام صفحات فرود ارگانیک بیشترین فروش ووکامرس را ایجاد کرده‌اند؟',
      a: 'در ۳۰ روز گذشته، مقاله «راهنمای خرید هدفون بی‌سیم» با ۱۴,۲۰۰ ورودی گوگل، بالاترین نرخ تبدیل به خرید (۶.۴٪ معادل ۱۸۴ میلیون تومان فروش خالص) را ثبت کرده است.',
      impact: 'رتبه ۱ بازگشت سرمایه سئو',
    },
    {
      q: 'بهترین ساعت انتشار کمپین پیامکی و پوش‌نوتیفیکیشن چه زمانی است؟',
      a: 'بر اساس الگوی حضور کاربران آنلاین سایت شما، روزهای شنبه و سه‌شنبه ساعت ۲۰:۳۰ تا ۲۲:۰۰ بیشترین نرخ تکمیل فرم و پرداخت آنلاین (۲.۳ برابر میانگین روزانه) ثبت شده است.',
      impact: 'پیک ترافیک فعال: ساعت ۲۱:۱۵',
    },
  ];

  const generatedScript = `<script defer data-domain="${
    domain || 'yoursite.ir'
  }" src="https://cdn.iran-analytics.ir/v1/ira-tracker.js"></script>`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-right">
        {/* Top Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-xl bg-[#0E74D2] text-white text-xs font-black">
              IRA
            </span>
            <h3 className="text-base font-black text-slate-900">
              {activeModal === 'signup' && 'شروع رایگان و دریافت کد رهگیری آنی'}
              {activeModal === 'ai-demo' && 'پیش‌نمایش زنده دستیار هوش مصنوعی IRA'}
              {activeModal === 'ga-compare' && 'مقایسه ایران آنالیتیکس با Google Analytics 4'}
              {activeModal === 'search' && 'جستجوی سریع در امکانات و مستندات'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {/* 1. SIGNUP & SCRIPT GENERATOR MODAL */}
          {activeModal === 'signup' && (
            <div className="space-y-5">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                آدرس دامنه سایت خود را وارد کنید تا اسکریپت اختصاصی رهگیری و کلید API رایگان برای شما
                تولید شود:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    آدرس دامنه وبسایت
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.ir"
                    className="w-full rounded-xl border border-slate-300 focus:border-[#0E74D2] px-3.5 py-2.5 text-sm font-mono text-slate-800 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    شماره موبایل یا ایمیل کاری
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="0912XXXXXXX"
                    className="w-full rounded-xl border border-slate-300 focus:border-[#0E74D2] px-3.5 py-2.5 text-sm font-mono text-slate-800 outline-none"
                  />
                </div>
              </div>

              {/* Live Script Preview */}
              <div className="rounded-2xl bg-slate-900 text-slate-100 p-4 font-mono text-xs" dir="ltr">
                <div className="flex items-center justify-between text-slate-400 text-[11px] mb-2">
                  <span>HTML Head Snippet (2.4 KB Gzipped)</span>
                  <button
                    onClick={handleCopyScript}
                    className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-amber-400 px-2.5 py-1 rounded-lg cursor-pointer"
                  >
                    {copiedScript ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Tag
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto text-sky-300 whitespace-pre-wrap">
                  {generatedScript}
                </pre>
              </div>

              {submittedSignup ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3 text-emerald-800 text-xs font-bold">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    حساب رایگان شما برای دامنه <strong dir="ltr">{domain}</strong> فعال شد! هم‌اکنون
                    می‌توانید تگ بالا را در سایت قرار دهید یا افزونه وردپرس را نصب کنید.
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    انصراف
                  </button>
                  <button
                    onClick={() => setSubmittedSignup(true)}
                    className="inline-flex items-center gap-2 bg-[#0E74D2] hover:bg-[#0B5CAD] text-white text-xs sm:text-sm font-black px-6 py-3 rounded-xl shadow-md cursor-pointer"
                  >
                    <Rocket className="w-4 h-4 text-amber-300" />
                    <span>ایجاد حساب رایگان و ورود به پنل</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2. IRA AI ASSISTANT SANDBOX MODAL */}
          {activeModal === 'ai-demo' && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-gradient-to-l from-[#0A4D9B] to-[#0E74D2] text-white p-4 flex items-center gap-4">
                <img
                  src="/images/ira-robot.png"
                  alt="IRA AI"
                  className="w-16 h-16 rounded-2xl object-cover border border-white/30 shrink-0"
                />
                <div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    تحلیلگر هوشمند فارسی IRA
                  </div>
                  <h4 className="text-sm sm:text-base font-black mt-0.5">
                    هر سوالی درباره ترافیک، سئو یا قیف فروش سایت خود دارید بپرسید!
                  </h4>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-extrabold text-slate-700">
                  یک نمونه سوال تحلیلی را انتخاب کنید:
                </div>
                <div className="flex flex-col gap-2">
                  {aiPrompts.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAiPromptIndex(idx)}
                      className={`text-right px-4 py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        aiPromptIndex === idx
                          ? 'bg-sky-50 border-[#0E74D2] text-[#0E74D2]'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{item.q}</span>
                      <Send className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Response Card */}
              <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                    پاسخ دستیار هوشمند IRA:
                  </span>
                  <span className="text-[11px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                    {aiPrompts[aiPromptIndex].impact}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-7 text-justify">
                  {aiPrompts[aiPromptIndex].a}
                </p>
              </div>
            </div>
          )}

          {/* 3. GA4 VS IRAN ANALYTICS COMPARISON MODAL */}
          {activeModal === 'ga-compare' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600">
                چرا بیش از ۴۰۰ کسب‌وکار ایرانی ایران آنالیتیکس را جایگزین Google Analytics 4 کرده‌اند؟
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-black">
                    <tr>
                      <th className="p-3.5">ویژگی و شاخص</th>
                      <th className="p-3.5 text-[#0E74D2] bg-sky-50">ایران آنالیتیکس (IRA)</th>
                      <th className="p-3.5 text-slate-500">Google Analytics 4</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium text-slate-700">
                    {[
                      {
                        feature: 'تقویم شمسی و زبان فارسی کامل',
                        ira: 'بومی و پیش‌فرض',
                        ga: 'ندارد (فقط میلادی)',
                      },
                      {
                        feature: 'خطر تحریم یا مسدودسازی دامنه .ir',
                        ira: 'صفر (سرورهای داخل ایران)',
                        ga: 'ریسک مسدودسازی اکانت',
                      },
                      {
                        feature: 'نقشه حرارتی (Heatmap) داخلی',
                        ira: 'داخلی و بدون ابزار جانبی',
                        ga: 'نیازمند ابزارهای سوم‌شخص',
                      },
                      {
                        feature: 'ردیابی خودکار ووکامرس و درگاه شاپرک',
                        ira: 'نصب با ۱ کلیک در وردپرس',
                        ga: 'نیازمند تنظیم پیچیده GTM',
                      },
                      {
                        feature: 'سرعت بارگذاری اسکریپت',
                        ira: 'کمتر از ۲.۴ کیلوبایت (<5ms)',
                        ga: 'بیش از ۴۵ کیلوبایت',
                      },
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-3.5 font-bold text-slate-800">{row.feature}</td>
                        <td className="p-3.5 bg-sky-50/50 font-black text-emerald-700">
                          <span className="inline-flex items-center gap-1">
                            <Check className="w-4 h-4 text-emerald-600" />
                            {row.ira}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-500">{row.ga}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. QUICK SEARCH MODAL */}
          {activeModal === 'search' && (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو در امکانات، مستندات API، افزونه وردپرس..."
                  className="w-full rounded-2xl border-2 border-sky-200 focus:border-[#0E74D2] pr-11 pl-4 py-3 text-sm font-bold text-slate-800 outline-none"
                />
                <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400">دسترسی سریع به بخش‌ها:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { title: 'امکانات کلیدی و نقشه حرارتی', href: '#features' },
                    { title: 'افزونه آمار وردپرس و ووکامرس', href: '#wordpress-plugin' },
                    { title: 'جدول تعرفه‌ها و پلن رایگان', href: '#pricing' },
                    { title: 'رویدادهای تحلیلی (کلیک و اسکرول)', href: '#events' },
                    { title: 'مستندات وب‌هوک و کلید API', href: '#api' },
                    { title: 'پشتیبانی ۲۴ ساعته و سوالات متداول', href: '#faq' },
                  ]
                    .filter((item) => item.title.includes(searchQuery))
                    .map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 text-xs font-bold text-slate-700 hover:text-[#0E74D2] transition-colors"
                      >
                        <span>{item.title}</span>
                        <BarChart2 className="w-4 h-4 text-[#0E74D2]" />
                      </a>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
