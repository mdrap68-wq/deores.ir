import React, { useState } from 'react';
import {
  Filter,
  Activity,
  Flame,
  MapPin,
  Users,
  Calendar,
  RefreshCw,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  fullWidth?: boolean;
  kpis: {
    visitors: string;
    pageviews: string;
    avgTime: string;
    bounce: string;
    online: string;
  };
  chartPathBlue: string;
  chartPathGreen: string;
  chartPathOrange: string;
  specialScore: number;
  highlightNote: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'custom-filters',
    title: 'فیلترهای سفارشی',
    subtitle: 'ایجاد قیف تبدیل پیشرفته و ترکیب بهینه ده‌ها تحلیل خصوصی‌سازی شده برای کمپین‌ها',
    icon: <Filter className="w-4 h-4" />,
    fullWidth: true,
    kpis: {
      visitors: '۲۵,۴۱۰',
      pageviews: '۱۶۱,۸۲۰',
      avgTime: '۴۸s',
      bounce: '۹٪',
      online: '۳۸',
    },
    chartPathBlue: 'M 0 110 Q 60 95, 120 75 T 240 60 T 360 35 T 480 20',
    chartPathGreen: 'M 0 120 Q 70 60, 140 50 T 260 30 T 380 45 T 480 25',
    chartPathOrange: 'M 0 130 Q 80 110, 160 85 T 280 55 T 400 30 T 480 15',
    specialScore: 88,
    highlightNote: 'قیف تبدیل سفارشی: +۳۴٪ بهبود نرخ خرید',
  },
  {
    id: 'realtime',
    title: 'آمار لحظه ای',
    subtitle: 'مشاهده کاربران آنلاین و صفحات فعال در کمتر از ۵ میلی‌ثانیه...',
    icon: <Activity className="w-4 h-4" />,
    kpis: {
      visitors: '۱,۲۸۰',
      pageviews: '۴,۹۱۰',
      avgTime: '۱m ۱۲s',
      bounce: '۷٪',
      online: '۱۴۲',
    },
    chartPathBlue: 'M 0 90 Q 60 40, 120 65 T 240 25 T 360 50 T 480 15',
    chartPathGreen: 'M 0 115 Q 70 85, 140 40 T 260 55 T 380 25 T 480 30',
    chartPathOrange: 'M 0 100 Q 80 70, 160 45 T 280 35 T 400 20 T 480 10',
    specialScore: 95,
    highlightNote: '۱۴۲ کاربر هم‌اکنون در صفحه تسویه‌حساب فعال هستند',
  },
  {
    id: 'heatmap',
    title: 'نقشه حرارتی',
    subtitle: 'مشاهده دقیق نقاط کلیک، حرکت موس و عمق اسکرول کاربران...',
    icon: <Flame className="w-4 h-4" />,
    kpis: {
      visitors: '۱۸,۹۰۰',
      pageviews: '۹۴,۳۰۰',
      avgTime: '۲m ۰۵s',
      bounce: '۱۲٪',
      online: '۶۴',
    },
    chartPathBlue: 'M 0 125 Q 60 100, 120 70 T 240 45 T 360 30 T 480 25',
    chartPathGreen: 'M 0 105 Q 70 75, 140 60 T 260 25 T 380 35 T 480 18',
    chartPathOrange: 'M 0 115 Q 80 65, 160 40 T 280 50 T 400 22 T 480 12',
    specialScore: 91,
    highlightNote: '۷۸٪ کلیک‌ها روی دکمه نارنجی «شروع رایگان» متمرکز است',
  },
  {
    id: 'geo',
    title: 'نقشه جغرافیایی',
    subtitle: 'مشاهده کاربران آنلاین و صفحات فعال به تفکیک استان و شهر...',
    icon: <MapPin className="w-4 h-4" />,
    kpis: {
      visitors: '۴۲,۱۰۰',
      pageviews: '۲۱۰,۵۰۰',
      avgTime: '۵۶s',
      bounce: '۱۱٪',
      online: '۸۹',
    },
    chartPathBlue: 'M 0 100 Q 60 80, 120 55 T 240 40 T 360 28 T 480 20',
    chartPathGreen: 'M 0 125 Q 70 95, 140 70 T 260 45 T 380 30 T 480 15',
    chartPathOrange: 'M 0 110 Q 80 85, 160 60 T 280 35 T 400 25 T 480 18',
    specialScore: 86,
    highlightNote: 'بیشترین ورودی: تهران (۴۴٪)، اصفهان (۱۶٪)، خراسان رضوی (۱۳٪)',
  },
  {
    id: 'behavior',
    title: 'تحلیل رفتار کاربران',
    subtitle: 'مشاهده مسیر حرکت کاربران، صفحات فرود و نقاط ریزش...',
    icon: <Users className="w-4 h-4" />,
    kpis: {
      visitors: '۳۱,۷۵۰',
      pageviews: '۱۴۸,۲۰۰',
      avgTime: '۱m ۴۴s',
      bounce: '۸.۴٪',
      online: '۵۳',
    },
    chartPathBlue: 'M 0 115 Q 60 75, 120 60 T 240 35 T 360 25 T 480 12',
    chartPathGreen: 'M 0 130 Q 70 90, 140 55 T 260 40 T 380 20 T 480 15',
    chartPathOrange: 'M 0 105 Q 80 65, 160 50 T 280 30 T 400 18 T 480 10',
    specialScore: 93,
    highlightNote: 'میانگین صفحات مشاهده‌شده در هر نشست: ۴.۷ صفحه',
  },
];

export const KeyFeaturesSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('custom-filters');
  const activeFeature = FEATURES.find((f) => f.id === activeId) || FEATURES[0];

  return (
    <section id="features" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Right Column: Section Header & 5 Interactive Feature Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0E74D2]" />
              <span>ویژگی ها | Features</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              هر آنچه برای تجارت با اعتماد به نفس نیاز دارید
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] mt-1">
              امکانات کلیدی
            </h2>
          </div>

          {/* Top Full-Width Feature Card */}
          {FEATURES.filter((f) => f.fullWidth).map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`w-full text-right p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isActive
                    ? 'bg-[#EFF6FF] border-[#0E74D2] shadow-md shadow-blue-500/10'
                    : 'bg-slate-50/90 hover:bg-white border-slate-200/80'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-extrabold ${
                        isActive
                          ? 'bg-[#0E74D2] text-white'
                          : 'bg-sky-100 text-[#0E74D2]'
                      }`}
                    >
                      {item.icon}
                      {item.title}
                    </span>
                    {isActive && (
                      <span className="text-[11px] font-bold text-[#0E74D2] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        در حال نمایش
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{item.subtitle}</p>
                </div>
              </button>
            );
          })}

          {/* 2x2 Grid of Remaining 4 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {FEATURES.filter((f) => !f.fullWidth).map((item) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`text-right p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#EFF6FF] border-[#0E74D2] shadow-md shadow-blue-500/10 scale-[1.01]'
                      : 'bg-slate-50/90 hover:bg-white border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                        isActive
                          ? 'bg-[#0E74D2] text-white'
                          : 'bg-sky-100/90 text-[#0E74D2]'
                      }`}
                    >
                      {item.icon}
                      {item.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Left Column: Interactive Browser Dashboard Mockup + Overlapping Gauge Card (7 cols) */}
        <div className="lg:col-span-7 relative">
          {/* Outer Sky-Blue Accent Frame (As seen in Reference) */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0E74D2] via-[#38BDF8] to-[#F59E0B] p-1.5 sm:p-2 shadow-2xl shadow-blue-950/15">
            <div className="bg-white rounded-2xl overflow-hidden border border-white/60">
              {/* Browser Top Bar */}
              <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#0E74D2]">IRA ایران آنالیتیکس</span>
                  <span className="text-[11px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md">
                    {activeFeature.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono" dir="ltr">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>2026-04-01 → 2026-04-15</span>
                  <div className="flex items-center gap-1 ml-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Dashboard Inner Grid (Main Chart Area + Right RTL Sidebar) */}
              <div className="grid grid-cols-12 min-h-[340px]">
                {/* Right Sidebar inside Mockup (3 cols) */}
                <div className="col-span-4 sm:col-span-3 bg-slate-50 border-l border-slate-200/80 p-3 space-y-1.5 text-right">
                  {[
                    { label: 'پیشخوان اصلی', id: 'custom-filters' },
                    { label: 'آمار لحظه‌ای', id: 'realtime' },
                    { label: 'نقشه حرارتی', id: 'heatmap' },
                    { label: 'نقشه جغرافیایی', id: 'geo' },
                    { label: 'رفتار کاربران', id: 'behavior' },
                    { label: 'ورودی‌های سئو', id: 'custom-filters' },
                    { label: 'رویدادها و کلیک', id: 'heatmap' },
                  ].map((nav, i) => {
                    const selected = nav.id === activeId && i < 5;
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveId(nav.id)}
                        className={`w-full text-right px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-between cursor-pointer ${
                          selected
                            ? 'bg-[#0E74D2] text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-200/60'
                        }`}
                      >
                        <span>{nav.label}</span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            selected ? 'bg-amber-300' : 'bg-slate-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Main Analytics Canvas (9 cols) */}
                <div className="col-span-8 sm:col-span-9 p-4 flex flex-col justify-between bg-white">
                  {/* Top 5 KPI Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 border-b border-slate-100 pb-3 text-center">
                    <div className="bg-slate-50/80 rounded-xl p-2">
                      <div className="text-[10px] text-slate-400">بازدیدکننده</div>
                      <div className="text-xs sm:text-sm font-black text-slate-800 mt-0.5">
                        {activeFeature.kpis.visitors}
                      </div>
                    </div>
                    <div className="bg-slate-50/80 rounded-xl p-2">
                      <div className="text-[10px] text-slate-400">بازدید صفحه</div>
                      <div className="text-xs sm:text-sm font-black text-[#0E74D2] mt-0.5">
                        {activeFeature.kpis.pageviews}
                      </div>
                    </div>
                    <div className="bg-slate-50/80 rounded-xl p-2">
                      <div className="text-[10px] text-slate-400">زمان حضور</div>
                      <div className="text-xs sm:text-sm font-black text-emerald-600 mt-0.5">
                        {activeFeature.kpis.avgTime}
                      </div>
                    </div>
                    <div className="bg-slate-50/80 rounded-xl p-2">
                      <div className="text-[10px] text-slate-400">نرخ پرش</div>
                      <div className="text-xs sm:text-sm font-black text-amber-600 mt-0.5">
                        {activeFeature.kpis.bounce}
                      </div>
                    </div>
                    <div className="bg-emerald-50/80 rounded-xl p-2 border border-emerald-200/60">
                      <div className="text-[10px] text-emerald-700">آنلاین</div>
                      <div className="text-xs sm:text-sm font-black text-emerald-600 mt-0.5">
                        {activeFeature.kpis.online}
                      </div>
                    </div>
                  </div>

                  {/* Live Insight Banner */}
                  <div className="my-2.5 px-3 py-1.5 rounded-xl bg-amber-50/90 border border-amber-200/70 flex items-center justify-between text-[11px] text-amber-900 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                      {activeFeature.highlightNote}
                    </span>
                    <RefreshCw className="w-3 h-3 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>

                  {/* Multi-Line Smooth SVG Chart */}
                  <div className="relative h-40 w-full bg-slate-50/50 rounded-xl border border-slate-100 p-3 overflow-hidden">
                    <svg
                      viewBox="0 0 480 140"
                      className="w-full h-full overflow-visible"
                      fill="none"
                    >
                      {/* Horizontal Grid Lines */}
                      <line x1="0" y1="30" x2="480" y2="30" stroke="#E2E8F0" strokeDasharray="4 4" />
                      <line x1="0" y1="70" x2="480" y2="70" stroke="#E2E8F0" strokeDasharray="4 4" />
                      <line x1="0" y1="110" x2="480" y2="110" stroke="#E2E8F0" strokeDasharray="4 4" />

                      {/* Blue Curve */}
                      <path
                        d={activeFeature.chartPathBlue}
                        stroke="#0E74D2"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />
                      {/* Emerald Curve */}
                      <path
                        d={activeFeature.chartPathGreen}
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                      {/* Orange Curve */}
                      <path
                        d={activeFeature.chartPathOrange}
                        stroke="#F59E0B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Data Points */}
                      <circle cx="240" cy="45" r="4.5" fill="#0E74D2" stroke="white" strokeWidth="2" />
                      <circle cx="360" cy="30" r="4.5" fill="#10B981" stroke="white" strokeWidth="2" />
                      <circle cx="400" cy="22" r="5" fill="#F59E0B" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlapping Bottom-Left Glassmorphic Circular Gauge Card ("تجربه‌ای خاص!") */}
          <div className="hidden sm:flex items-center gap-3.5 absolute -bottom-6 -left-4 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-3.5 shadow-xl shadow-slate-900/10 z-20">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="24" stroke="#E2E8F0" strokeWidth="5" fill="none" />
                <circle
                  cx="30"
                  cy="30"
                  r="24"
                  stroke="#0E74D2"
                  strokeWidth="5"
                  strokeDasharray="150"
                  strokeDashoffset={150 - (150 * activeFeature.specialScore) / 100}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span className="absolute text-xs font-black text-slate-800">
                %{activeFeature.specialScore}
              </span>
            </div>
            <div className="text-right pr-1">
              <div className="text-xs font-black text-slate-900">تجربه‌ای خاص!</div>
              <div className="text-[11px] font-semibold text-emerald-600">Special Analytics</div>
            </div>
          </div>

          {/* Overlapping Bottom-Center Vibrant Orange Badge ("Iran-Analytics") */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
            <span className="inline-flex items-center gap-2 bg-[#F59E0B] text-slate-950 font-black text-xs px-5 py-2 rounded-full shadow-lg shadow-amber-500/30 border-2 border-white">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              Iran-Analytics
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
