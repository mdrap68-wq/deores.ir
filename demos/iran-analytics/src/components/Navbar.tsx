import React, { useState, useEffect } from 'react';
import { Search, User, Sparkles, Menu, X, Activity, ChevronLeft } from 'lucide-react';

interface NavbarProps {
  onOpenModal: (type: 'signup' | 'ai-demo' | 'ga-compare' | 'search') => void;
}

export const IraLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <a href="#" className={`inline-flex items-center gap-1.5 sm:gap-2.5 group select-none min-w-0 ${className}`}>
    <span className="text-[15px] sm:text-xl md:text-2xl font-black tracking-tight text-[#0E74D2] group-hover:text-[#0B4F9F] transition-colors truncate">
      ایران آنالیتیکس
    </span>
    <div className="relative flex items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] border border-[#E2E8F0] rounded-xl px-1.5 sm:px-2.5 py-1 shadow-xs shrink-0">
      <svg className="w-9 h-5 sm:w-[46px] sm:h-[26px]" width="46" height="26" viewBox="0 0 56 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stylized I */}
        <rect x="2" y="6" width="7" height="20" rx="3.5" fill="#0E74D2" />
        <circle cx="5.5" cy="2.5" r="2.5" fill="#F59E0B" />
        {/* Stylized R */}
        <path
          d="M13 26V6H22C25.5 6 28 8.2 28 11.8C28 14.6 26.2 16.6 23.5 17.3L28.5 26H21.8L17.8 18H19.5V26H13Z"
          fill="#F59E0B"
        />
        <circle cx="20.5" cy="12" r="2.3" fill="#FFFFFF" />
        {/* Stylized A with rising chart bars */}
        <path
          d="M39 6L30 26H36.5L41.5 13.5L46.5 26H53L44 6H39Z"
          fill="#10B981"
        />
        <path d="M37 22H46" stroke="#0E74D2" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  </a>
);

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'خانه', href: '#hero', active: true },
    { label: 'ویژگی ها', href: '#features' },
    { label: 'ابزارهای تحلیل', href: '#tools' },
    { label: 'نمونه کارها', href: '#portfolio' },
    { label: 'تعرفه‌ها', href: '#pricing' },
    { label: 'رویدادها', href: '#events' },
    { label: 'مستندات API', href: '#api' },
    { label: 'بلاگ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Subtle Browser Chrome Top Bar */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-1.5 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium truncate">
              <span className="w-2 h-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate">سرورهای ابری: فعال</span>
              <span className="hidden sm:inline">(۴.۲ms)</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <button
              onClick={() => onOpenModal('ai-demo')}
              className="hidden sm:inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              جدید: دستیار هوش مصنوعی IRA را آنلاین امتحان کنید
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3" dir="ltr">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[11px] text-slate-400 bg-slate-800/90 px-2.5 py-0.5 rounded-md border border-slate-700">
              www.iran-analytics.com
            </span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic RTL Header */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-slate-200/80 py-3'
            : 'bg-white/75 backdrop-blur-md border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Right: Brand Logo */}
          <IraLogo />

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                  link.active
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-slate-600 hover:text-[#0E74D2] hover:bg-white/60'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Left: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={() => onOpenModal('ai-demo')}
              title="دستیار هوش مصنوعی IRA"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#D97706] border border-amber-200/80 transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenModal('search')}
              title="جستجو در مستندات و امکانات"
              className="hidden min-[420px]:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenModal('signup')}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#0E74D2] hover:bg-[#0B5CAD] text-white text-xs sm:text-sm font-bold px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 transition-all cursor-pointer"
            >
              <span className="hidden min-[400px]:inline">ورود</span>
              <span className="hidden sm:inline"> / ثبت نام</span>
              <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5" />
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-700 border border-slate-200"
              aria-label="منوی موبایل"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2 shadow-xl">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-[#0E74D2] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('search');
                }}
                className="py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 border border-slate-200"
              >
                <Search className="w-4 h-4" />
                جستجو
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal('ai-demo');
                }}
                className="py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                دستیار IRA
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
