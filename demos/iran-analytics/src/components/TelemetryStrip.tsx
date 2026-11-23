import React from 'react';
import { Database, Activity, Zap, FileBarChart2, ShieldCheck, Clock } from 'lucide-react';

export const TelemetryStrip: React.FC = () => {
  const stats = [
    {
      value: '100M',
      label: 'رویداد ثبت شده ماهانه',
      icon: <Database className="w-4 h-4 text-[#0E74D2]" />,
      featured: false,
    },
    {
      value: '78M',
      label: 'رویداد پردازش شده روزانه',
      icon: <Activity className="w-4 h-4 text-white" />,
      featured: true,
    },
    {
      value: '4.2M',
      label: 'پیک رکورد در یک روز',
      icon: <Zap className="w-4 h-4 text-[#F59E0B]" />,
      featured: false,
    },
    {
      value: '+120',
      label: 'گزارش تحلیلی فعال',
      icon: <FileBarChart2 className="w-4 h-4 text-emerald-600" />,
      featured: false,
    },
    {
      value: '99.9%',
      label: 'آپ‌تایم و پایداری سرویس',
      icon: <ShieldCheck className="w-4 h-4 text-[#0E74D2]" />,
      featured: false,
    },
    {
      value: '<5MS',
      label: 'زمان پاسخ‌دهی سرور',
      icon: <Clock className="w-4 h-4 text-[#F59E0B]" />,
      featured: false,
    },
  ];

  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-900/5 px-4 sm:px-8 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col items-center justify-center text-center transition-all ${
                item.featured
                  ? 'bg-gradient-to-b from-[#3B82F6] via-[#0E74D2] to-[#0D9488] text-white rounded-2xl py-5 px-4 lg:-my-8 shadow-xl shadow-blue-600/25 border-b-4 border-b-[#F59E0B]'
                  : 'py-3 px-2'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${
                  item.featured
                    ? 'bg-white/20 backdrop-blur-md'
                    : 'bg-slate-100 border border-slate-200/60'
                }`}
              >
                {item.icon}
              </div>

              <div
                className={`text-xl sm:text-2xl font-black tracking-tight font-mono ${
                  item.featured ? 'text-white' : 'text-slate-900'
                }`}
                dir="ltr"
              >
                {item.value}
              </div>

              <div
                className={`text-[11px] font-semibold mt-1 ${
                  item.featured ? 'text-sky-100' : 'text-slate-500'
                }`}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
