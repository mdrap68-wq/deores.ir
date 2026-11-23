import React from 'react';
import { Phone, Mail, MapPin, ArrowLeft, ShieldCheck } from 'lucide-react';
import { IraLogo } from './Navbar';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-100">
          {/* Column 1 (Rightmost in RTL - 4 cols): Brand Info & Contact Details */}
          <div className="lg:col-span-4 space-y-4 text-right">
            <IraLogo />

            <p className="text-xs text-slate-500 leading-6 text-justify">
              آمار بازدید سایت، رفتار کاربران، تحلیل سئو و دستیار هوش مصنوعی — همه در یک داشبورد فارسی.
              جایگزین جذاب Google Analytics برای کسب‌وکارهای ایرانی، با داده‌ای که در ایران می‌ماند.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-700">
              <div className="flex items-center justify-end gap-2.5 font-bold" dir="ltr">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>۰۲۱ - ۲۲۴۴۴۲۶۱</span>
              </div>

              <div className="flex items-center justify-end gap-2.5 font-mono text-slate-600" dir="ltr">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>irananalytics@gmail.com</span>
              </div>

              <div className="flex items-start gap-2.5 text-slate-600 leading-relaxed pt-1">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  تهران، میدان آرژانتین، بلوار نلسون ماندلا، مجتمع بوستان، ورودی شمالی، خانه خلاق هزاره
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 (2 cols): Product & Solutions */}
          <div className="lg:col-span-2 text-right space-y-3.5">
            <h3 className="text-sm font-black text-slate-900">محصول و راهکارها</h3>
            <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
              {[
                { label: 'شروع سریع پلتفرم', href: '#tools' },
                { label: 'افزونه آمار وردپرس', href: '#wordpress-plugin' },
                { label: 'قیمت گذاری', href: '#pricing' },
                { label: 'تحلیل سئو و محتوا', href: '#features' },
                { label: 'آنالیتیکس فروشگاهی', href: '#events' },
                { label: 'مقایسه و مهاجرت از GA', href: '#portfolio' },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="hover:text-[#0E74D2] transition-colors inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (2 cols): Resources & Company */}
          <div className="lg:col-span-2 text-right space-y-3.5">
            <h3 className="text-sm font-black text-slate-900">منابع و شرکت ها</h3>
            <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
              {[
                { label: 'بلاگ تخصصی داده', href: '#faq' },
                { label: 'راهنمای نصب', href: '#tools' },
                { label: 'مستندات API', href: '#api' },
                { label: 'درباره ما', href: '#hero' },
                { label: 'تماس با ما', href: '#faq' },
                { label: 'امنیت و حریم خصوصی', href: '#features' },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    className="hover:text-[#0E74D2] transition-colors inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (Leftmost in RTL - 4 cols): Social Follow Buttons + Trust Badges */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-2.5">
              {[
                { label: 'ما را در اینستاگرام دنبال کنید', badge: 'IG' },
                { label: 'ما را در لینکدین دنبال کنید', badge: 'in' },
                { label: 'ما را در ایکس دنبال کنید', badge: 'X' },
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href="#hero"
                  className="w-full rounded-xl border border-slate-200 hover:border-[#0E74D2] bg-slate-50/60 hover:bg-blue-50/40 px-4 py-2.5 flex items-center justify-between text-xs font-bold text-slate-700 hover:text-[#0E74D2] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-[11px] font-mono font-black text-slate-500 group-hover:text-[#0E74D2]">
                      {soc.badge}
                    </span>
                    <span>{soc.label}</span>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#0E74D2] group-hover:-translate-x-1 transition-transform" />
                </a>
              ))}
            </div>

            {/* 3 Official Trust Seals (e-Namad / Samandehi) */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {[
                { title: 'اینماد', sub: 'نماد اعتماد الکترونیکی' },
                { title: 'ساماندهی', sub: 'وزارت فرهنگ و ارشاد' },
                { title: 'اتحادیه کشوری', sub: 'کسب‌وکارهای مجازی' },
              ].map((seal, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3 flex flex-col items-center justify-center text-center hover:border-sky-200 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-100/80 text-[#0E74D2] flex items-center justify-center font-black text-base font-mono mb-1.5">
                    e
                  </div>
                  <div className="text-[11px] font-black text-slate-800">{seal.title}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">{seal.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0E74D2]" />
            <span>
              تمامی حقوق مادی و معنوی این پلتفرم متعلق به شرکت{' '}
              <strong className="text-slate-700">ایران آنالیتیکس (IRA)</strong> می‌باشد © ۱۴۰۵
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#faq" className="hover:text-slate-700 transition-colors">
              قوانین و مقررات
            </a>
            <span>•</span>
            <a href="#faq" className="hover:text-slate-700 transition-colors">
              حریم خصوصی داده‌ها
            </a>
            <span>•</span>
            <a href="#api" className="hover:text-slate-700 transition-colors">
              وضعیت سرورها (۹۹.۹٪)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
