import React, { useState } from 'react';
import { Check, Copy, CheckCheck, Terminal, KeyRound, BookOpen } from 'lucide-react';

interface ApiIntegrationSectionProps {
  onOpenModal: (type: 'signup' | 'ai-demo' | 'ga-compare' | 'search') => void;
}

type CodeLang = 'curl' | 'node' | 'python';

const CODE_SNIPPETS: Record<CodeLang, string> = {
  curl: `curl https://iran-analytics.ir/api/v1/stats \\
  -H "Authorization: Bearer YOUR_API_KEY"

{
  "pageviews": 48210,
  "top_pages": [
    { "path": "/wordpress-plugin", "views": 9104 },
    { "path": "/pricing-plans", "views": 5430 }
  ],
  "sources": [
    { "source": "google", "visits": 19400, "trend": "+38%" }
  ]
}`,
  node: `const res = await fetch('https://iran-analytics.ir/api/v1/stats', {
  headers: {
    'Authorization': 'Bearer ira_live_98f72a1c4b',
    'Content-Type': 'application/json'
  }
});
const data = await res.json();
console.log('Active Visitors:', data.pageviews); // 48210`,
  python: `import requests

resp = requests.get(
    "https://iran-analytics.ir/api/v1/stats",
    headers={"Authorization": "Bearer ira_live_98f72a1c4b"}
)
stats = resp.json()
print(f"Pageviews: {stats['pageviews']}") # 48210`,
};

export const ApiIntegrationSection: React.FC<ApiIntegrationSectionProps> = ({ onOpenModal }) => {
  const [lang, setLang] = useState<CodeLang>('curl');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Right Column in RTL: Content & CTAs (6 cols) */}
        <div className="lg:col-span-6 space-y-5 text-right order-2 lg:order-1">
          {/* Top Pill Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              API ایران آنالیتیکس
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
              برای تیم‌های فنی
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] leading-snug">
            داده تحلیلی را به هر سیستمی که می‌خواهید وصل کنید
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-7 text-justify">
            وب‌هوک و API ایران آنالیتیکس به شما اجازه می‌دهد داده‌های تحلیلی هر پلتفرم را به‌صورت
            استاندارد با اپلیکیشن‌ها، گزارش‌های مدیریتی اختصاصی خود ادغام کنید و با پنل داخلی، ابزار
            CRM، اتوماسیون مارکتینگ یا انبار داده شرکت همگام باشید.
          </p>

          {/* 2 Orange Check Items (Matching Reference) */}
          <div className="space-y-3 pt-1">
            {[
              'اتصال مستقیم به CRM، BI و سرویس‌های تحلیلی داخلی',
              'احراز هویت با کلید API و مستندات کامل فارسی',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Dual CTA Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onOpenModal('signup')}
              className="inline-flex items-center gap-2 bg-[#0E74D2] hover:bg-[#0B5CAD] text-white text-xs sm:text-sm font-extrabold px-5 py-3.5 rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>مشاهده مستندات API</span>
            </button>

            <button
              onClick={() => onOpenModal('signup')}
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 text-xs sm:text-sm font-black px-5 py-3.5 rounded-xl shadow-md shadow-amber-500/25 transition-all cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>دریافت کلید API رایگان</span>
            </button>
          </div>
        </div>

        {/* Left Column in RTL: Interactive Code Terminal Window (6 cols) */}
        <div className="lg:col-span-6 order-1 lg:order-2" dir="ltr">
          <div className="rounded-3xl bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7]/45 to-[#FFF7ED] border-2 border-amber-200/80 shadow-xl shadow-amber-900/5 overflow-hidden">
            {/* Terminal Window Header */}
            <div className="px-5 py-3.5 bg-white/80 backdrop-blur-md border-b border-amber-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-mono font-semibold text-slate-500 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  api.iran-analytics.ir
                </span>
              </div>

              {/* Language Switcher & Copy Button */}
              <div className="flex items-center gap-1.5">
                {(['curl', 'node', 'python'] as CodeLang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                      lang === l
                        ? 'bg-[#F59E0B] text-slate-950'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {l}
                  </button>
                ))}

                <button
                  onClick={handleCopy}
                  title="Copy snippet"
                  className="ml-1 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Code Content Area */}
            <div className="p-6 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 overflow-x-auto">
              <pre className="whitespace-pre">{CODE_SNIPPETS[lang]}</pre>
            </div>

            {/* Bottom Status Footer */}
            <div className="px-5 py-2.5 bg-amber-100/50 border-t border-amber-200/60 flex items-center justify-between text-[11px] font-mono text-amber-900">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                HTTP 200 OK • 4.1ms
              </span>
              <span>REST & Webhook v1.4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
