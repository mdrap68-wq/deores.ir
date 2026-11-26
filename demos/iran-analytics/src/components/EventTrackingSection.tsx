import React, { useState } from 'react';
import {
  MousePointerClick,
  ArrowDownUp,
  Search,
  FileSpreadsheet,
  FileText,
  Download,
  AppWindow,
  ShoppingCart,
  Send,
  Layers,
  LayoutDashboard,
} from 'lucide-react';

interface EventCategory {
  id: string;
  label: string;
  badge: string;
  icon: React.ReactNode;
  whatIsIt: string;
  elements: string[];
  dashboardReports: string[];
  stats: {
    totalEvents: string;
    conversionRate: string;
    avgLatency: string;
    activePages: string;
    uniqueUsers: string;
  };
  curveBlue: string;
  curveGreen: string;
  curveOrange: string;
  topTriggeredItems: { name: string; count: string; share: string }[];
}

const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: 'click',
    label: 'کلیک',
    badge: 'Technology • Auto-Track',
    icon: <MousePointerClick className="w-4 h-4" />,
    whatIsIt:
      'کلیک‌های مهم — دکمه خرید، لینک تماس، منو و هر المان تعاملی — بدون نیاز به کدنویسی در گزارش ثبت می‌شوند تا بدانید کدام بخش‌ها بیشترین توجه کاربران را جلب کرده‌اند.',
    elements: [
      'تمام دکمه‌های CTA، لینک‌های خروجی و شماره‌های تماس کلیکی',
      'جابه‌جایی بین صفحات بدون بارگذاری مجدد کامل (SPA)',
      'کلیک روی بنرهای کمپین‌های تبلیغاتی و اسلایدرها',
      'المان‌های دارای کلاس یا شناسه سفارشی (CSS Selector)',
    ],
    dashboardReports: [
      'تعداد کل کلیک‌ها و نرخ کلیک (CTR) به تفکیک هر صفحه',
      'مقایسه عملکرد دکمه‌ها در موبایل و دسکتاپ',
      'نقشه حرارتی تراکم کلیک‌های کاربران واقعی',
      'نرخ تبدیل مستقیم هر کلیک به ثبت‌نام یا خرید نهایی',
    ],
    stats: {
      totalEvents: '۱۶۱,۴۲۰',
      conversionRate: '۹.۴٪',
      avgLatency: '۴۸ms',
      activePages: '۲۵',
      uniqueUsers: '۱۴,۸۰۰',
    },
    curveBlue: 'M 0 120 Q 70 85, 140 50 T 280 65 T 420 25 T 520 35',
    curveGreen: 'M 0 130 Q 80 100, 160 75 T 300 40 T 440 50 T 520 20',
    curveOrange: 'M 0 110 Q 90 60, 180 85 T 320 30 T 450 45 T 520 15',
    topTriggeredItems: [
      { name: 'دکمه «شروع رایگان» هدر اصلی', count: '۴۸,۲۱۰', share: '۴۲٪' },
      { name: 'دانلود مستقیم افزونه وردپرس', count: '۳۱,۹۰۰', share: '۲۸٪' },
      { name: 'تماس تلفنی پشتیبانی فروش', count: '۱۸,۴۵۰', share: '۱۶٪' },
    ],
  },
  {
    id: 'scroll',
    label: 'اسکرول',
    badge: 'UX Depth • ۲۵٪ تا ۱۰۰٪',
    icon: <ArrowDownUp className="w-4 h-4" />,
    whatIsIt:
      'عمق اسکرول نشان می‌دهد کاربران تا چه بخشی از مقاله یا صفحه فرود شما پایین رفته‌اند (۲۵٪، ۵۰٪، ۷۵٪ و ۱۰۰٪) و دقیقاً در کدام نقطه صفحه را ترک می‌کنند.',
    elements: [
      'تمام مقالات وبلاگ و صفحات آموزشی بلند',
      'صفحات فرود (Landing Pages) کمپین‌های تبلیغاتی',
      'صفحات معرفی محصول و جدول مقایسه تعرفه‌ها',
      'اسکرول‌های افقی و عمودی در گالری تصاویر موبایل',
    ],
    dashboardReports: [
      'درصد کاربرانی که به انتهای صفحه رسیده‌اند',
      'میانگین زمان توقف در هر بخش از صفحه',
      'ارتباط بین عمق مطالعه و احتمال خرید محصول',
      'شناسایی نقاط افت ناگهانی توجه مخاطب',
    ],
    stats: {
      totalEvents: '۲۹۴,۱۰۰',
      conversionRate: '۱۲.۸٪',
      avgLatency: '۳۲ms',
      activePages: '۶۴',
      uniqueUsers: '۲۸,۳۰۰',
    },
    curveBlue: 'M 0 100 Q 70 65, 140 80 T 280 35 T 420 45 T 520 20',
    curveGreen: 'M 0 125 Q 80 85, 160 55 T 300 65 T 440 30 T 520 18',
    curveOrange: 'M 0 130 Q 90 95, 180 60 T 320 45 T 450 25 T 520 12',
    topTriggeredItems: [
      { name: 'اسکرول ۷۵٪ در صفحه تعرفه‌ها', count: '۹۲,۴۰۰', share: '۵۱٪' },
      { name: 'مطالعه کامل راهنمای مهاجرت از GA4', count: '۵۴,۱۲۰', share: '۳۰٪' },
      { name: 'مشاهده بخش نظرات مشتریان', count: '۳۴,۸۰۰', share: '۱۹٪' },
    ],
  },
  {
    id: 'search',
    label: 'جستجوی سایت',
    badge: 'Search Intent • هوشمند',
    icon: <Search className="w-4 h-4" />,
    whatIsIt:
      'عباراتی که کاربران داخل کادر جستجوی سایت یا فروشگاه شما تایپ می‌کنند را ثبت می‌کند تا بفهمید مشتریان دقیقاً دنبال چه محصول یا محتوایی هستند که شاید در منو پیدا نکرده‌اند.',
    elements: [
      'فرم‌های جستجوی وردپرس و ووکامرس (Ajax & استاندارد)',
      'فیلترهای جستجوی زنده در صفحات دسته‌بندی',
      'جستجوهای بدون نتیجه (Zero-Result Searches)',
      'پیشنهادهای خودکار کلیک‌شده توسط کاربر',
    ],
    dashboardReports: [
      'لیست پرتکرارترین کلمات جستجو شده در سایت',
      'عباراتی که هیچ نتیجه‌ای برنگردانده‌اند (فرصت تولید محتوا)',
      'نرخ خرید کاربرانی که از جستجوی داخلی استفاده کرده‌اند',
      'روند تغییرات تقاضای کاربران در بازه‌های زمانی مختلف',
    ],
    stats: {
      totalEvents: '۴۲,۸۵۰',
      conversionRate: '۱۸.۵٪',
      avgLatency: '۴۱ms',
      activePages: '۱۲',
      uniqueUsers: '۹,۶۰۰',
    },
    curveBlue: 'M 0 130 Q 70 95, 140 70 T 280 45 T 420 30 T 520 15',
    curveGreen: 'M 0 115 Q 80 75, 160 60 T 300 35 T 440 25 T 520 20',
    curveOrange: 'M 0 120 Q 90 85, 180 50 T 320 40 T 450 20 T 520 10',
    topTriggeredItems: [
      { name: 'عبارت «افزونه آمارگیر وردپرس»', count: '۱۲,۳۰۰', share: '۳۸٪' },
      { name: 'عبارت «وب‌هوک CRM»', count: '۸,۷۵۰', share: '۲۷٪' },
      { name: 'عبارت «آموزش نصب تگ»', count: '۶,۴۰۰', share: '۲۰٪' },
    ],
  },
  {
    id: 'form',
    label: 'تعامل با فرم',
    badge: 'Lead Funnel • قیف فرم',
    icon: <FileSpreadsheet className="w-4 h-4" />,
    whatIsIt:
      'تمامی مراحل پر کردن فرم‌های ثبت‌نام، مشاوره و تسویه‌حساب را زیر نظر می‌گیرد تا مشخص شود کدام فیلد باعث سردرگمی یا رها کردن فرم توسط کاربر می‌شود.',
    elements: [
      'فرم‌های ثبت‌نام، ورود و تایید کد پیامکی (OTP)',
      'فرم‌های تماس با ما، گرویتی فرمز و المنتور',
      'فرم تسویه‌حساب و آدرس‌دهی فروشگاه‌های اینترنتی',
      'فرم‌های عضویت در خبرنامه و دانلود کاتالوگ',
    ],
    dashboardReports: [
      'نرخ تکمیل موفق فرم در برابر رهاسازی (Form Abandonment)',
      'میانگین زمان صرف‌شده روی هر فیلد ورودی',
      'فیلدهایی که بیشترین خطای اعتبارسنجی را داشته‌اند',
      'مقایسه نرخ تبدیل فرم‌ها به تفکیک کانال ورودی تبلیغات',
    ],
    stats: {
      totalEvents: '۶۸,۹۰۰',
      conversionRate: '۲۴.۲٪',
      avgLatency: '۳۹ms',
      activePages: '۱۸',
      uniqueUsers: '۱۱,۲۰۰',
    },
    curveBlue: 'M 0 115 Q 70 80, 140 60 T 280 50 T 420 28 T 520 18',
    curveGreen: 'M 0 120 Q 80 90, 160 65 T 300 45 T 440 22 T 520 14',
    curveOrange: 'M 0 125 Q 90 70, 180 55 T 320 35 T 450 25 T 520 12',
    topTriggeredItems: [
      { name: 'فرم ثبت‌نام سریع با شماره موبایل', count: '۲۹,۱۰۰', share: '۴۶٪' },
      { name: 'فرم درخواست دموی سازمانی', count: '۱۴,۸۰۰', share: '۲۴٪' },
      { name: 'فرم دریافت کلید API رایگان', count: '۱۱,۵۰۰', share: '۱۸٪' },
    ],
  },
  {
    id: 'pageview',
    label: 'بازدید صفحات',
    badge: 'SPA & SSR Ready',
    icon: <FileText className="w-4 h-4" />,
    whatIsIt:
      'ثبت فوق‌سریع بازدید صفحات چه در سایت‌های سنتی (وردپرس/PHP) و چه در وب‌اپلیکیشن‌های تک‌صفحه‌ای (React, Next.js, Vue) همراه با تشخیص هوشمند ربات‌ها.',
    elements: [
      'تمام صفحات عمومی، وبلاگ و محصولات فروشگاه',
      'تغییر مسیرهای History API در اپلیکیشن‌های React و Vue',
      'پارامترهای کمپین تبلیغاتی (UTM Source, Medium, Campaign)',
      'ارجاع‌دهنده‌ها (Referrers) از گوگل، شبکه‌های اجتماعی و سایت‌ها',
    ],
    dashboardReports: [
      'صفحات فرود (Landing) و صفحات خروج (Exit) برتر',
      'نرخ پرش واقعی (Adjusted Bounce Rate) بر اساس زمان حضور',
      'گزارش منابع ترافیک ارگانیک، مستقیم و رفرال',
      'تحلیل سرعت بارگذاری هر صفحه از دید کاربر نهایی',
    ],
    stats: {
      totalEvents: '۸۴۰,۰۰۰',
      conversionRate: '۱۱.۰٪',
      avgLatency: '۱۸ms',
      activePages: '۱۴۵',
      uniqueUsers: '۹۶,۴۰۰',
    },
    curveBlue: 'M 0 125 Q 70 75, 140 55 T 280 40 T 420 20 T 520 12',
    curveGreen: 'M 0 110 Q 80 85, 160 50 T 300 35 T 440 25 T 520 15',
    curveOrange: 'M 0 130 Q 90 90, 180 65 T 320 30 T 450 18 T 520 10',
    topTriggeredItems: [
      { name: 'صفحه اصلی ایران آنالیتیکس (/)', count: '۳۱۰,۰۰۰', share: '۳۷٪' },
      { name: 'مقایسه ایران آنالیتیکس با GA4', count: '۱۸۵,۰۰۰', share: '۲۲٪' },
      { name: 'مستندات وب‌هوک و API فارسی', count: '۱۲۴,۰۰۰', share: '۱۵٪' },
    ],
  },
  {
    id: 'download',
    label: 'دانلود فایل',
    badge: 'Asset Tracking',
    icon: <Download className="w-4 h-4" />,
    whatIsIt:
      'هر زمان کاربری فایل PDF، کاتالوگ قیمت، ویدیو، نسخه نصبی اپلیکیشن یا افزونه ZIP را دانلود کند، رویداد دانلود به صورت خودکار با نام فایل ثبت می‌شود.',
    elements: [
      'فایل‌های افزونه و قالب (.zip, .tar.gz)',
      'کاتالوگ‌های فروش، پروپوزال و مقالات (.pdf, .docx, .xlsx)',
      'نسخه‌های مستقیم اپلیکیشن اندروید (.apk)',
      'پادکست‌ها و ویدیوهای آموزشی قابل دانلود (.mp4, .mp3)',
    ],
    dashboardReports: [
      'تعداد دانلود هر فایل به تفکیک کاربران یکتا',
      'کانال‌های ورودی که بیشترین دانلود فایل را رقم زده‌اند',
      'نرخ تبدیل دانلودکنندگان کاتالوگ به خریدار نهایی',
      'آمار دانلود بر اساس سیستم‌عامل و مرورگر کاربر',
    ],
    stats: {
      totalEvents: '۵۳,۶۰۰',
      conversionRate: '۳۱.۵٪',
      avgLatency: '۲۹ms',
      activePages: '۹',
      uniqueUsers: '۱۹,۸۰۰',
    },
    curveBlue: 'M 0 120 Q 70 90, 140 65 T 280 45 T 420 25 T 520 15',
    curveGreen: 'M 0 130 Q 80 85, 160 55 T 300 40 T 440 20 T 520 12',
    curveOrange: 'M 0 115 Q 90 75, 180 50 T 320 35 T 450 22 T 520 14',
    topTriggeredItems: [
      { name: 'iran-analytics-wp-plugin-v4.zip', count: '۲۸,۹۰۰', share: '۵۴٪' },
      { name: 'enterprise-security-whitepaper.pdf', count: '۱۴,۲۰۰', share: '۲۶٪' },
      { name: 'api-postman-collection.json', count: '۱۰,۵۰۰', share: '۲۰٪' },
    ],
  },
  {
    id: 'modal',
    label: 'باز شدن پنجره',
    badge: 'Popups & Modals',
    icon: <AppWindow className="w-4 h-4" />,
    whatIsIt:
      'اثربخشی پاپ‌آپ‌های تخفیف، مودال‌های ثبت‌نام و پنجره‌های گفت‌وگوی آنلاین را اندازه بگیرید تا بدانید کدام پنجره باعث تعامل و کدام باعث بستن صفحه می‌شود.',
    elements: [
      'پاپ‌آپ‌های کد تخفیف هنگام خروج کاربر (Exit-Intent)',
      'پنجره‌های مشاوره هوشمند و چت آنلاین پشتیبانی',
      'مودال‌های مشاهده سریع محصول (Quick View)',
      'بنرهای اعلان کمپین‌های مناسبتی و بلک‌فرایدی',
    ],
    dashboardReports: [
      'تعداد دفعات نمایش پاپ‌آپ در برابر تعداد کلیک روی دکمه آن',
      'نرخ بستن فوری پنجره توسط کاربران',
      'تاثیر نمایش مودال روی افزایش زمان ماندگاری یا خرید',
      'مقایسه A/B تست دو طرح مختلف پاپ‌آپ',
    ],
    stats: {
      totalEvents: '۷۶,۳۰۰',
      conversionRate: '۱۴.۶٪',
      avgLatency: '۳۵ms',
      activePages: '۲۲',
      uniqueUsers: '۲۴,۱۰۰',
    },
    curveBlue: 'M 0 110 Q 70 80, 140 60 T 280 40 T 420 30 T 520 18',
    curveGreen: 'M 0 125 Q 80 95, 160 70 T 300 45 T 440 28 T 520 16',
    curveOrange: 'M 0 120 Q 90 70, 180 55 T 320 38 T 450 20 T 520 12',
    topTriggeredItems: [
      { name: 'مودال دستیار هوش مصنوعی IRA', count: '۳۶,۴۰۰', share: '۴۸٪' },
      { name: 'پنجره مقایسه زنده با Google Analytics', count: '۲۴,۱۰۰', share: '۳۲٪' },
      { name: 'پاپ‌آپ کد تخفیف ۲۰٪ پلن سالانه', count: '۱۵,۸۰۰', share: '۲۰٪' },
    ],
  },
  {
    id: 'ecommerce',
    label: 'تجارت الکترونیک',
    badge: 'WooCommerce & Custom',
    icon: <ShoppingCart className="w-4 h-4" />,
    whatIsIt:
      'ردیابی کامل چرخه خرید مشتری از لحظه مشاهده محصول و افزودن به سبد خرید تا ورود به درگاه بانکی و ثبت سفارش نهایی همراه با محاسبه درآمد خالص.',
    elements: [
      'رویدادهای استاندارد Add to Cart، Remove from Cart و Checkout',
      'کدهای تخفیف اعمال‌شده و روش‌های ارسال انتخابی',
      'خطاهای بازگشت از درگاه پرداخت بانکی (شاپرک)',
      'ارزش طول عمر مشتری (LTV) و نرخ تکرار خرید',
    ],
    dashboardReports: [
      'گزارش قیف فروش مرحله‌به‌مرحله با درصد ریزش هر گام',
      'پرفروش‌ترین محصولات و دسته‌بندی‌ها به تفکیک منبع ورودی',
      'درآمد حاصل از سئو ارگانیک در برابر تبلیغات کلیکی',
      'گزارش لحظه‌ای سبدهای خرید رها شده قابل بازیابی',
    ],
    stats: {
      totalEvents: '۱۲۸,۷۰۰',
      conversionRate: '۶.۸٪',
      avgLatency: '۴۴ms',
      activePages: '۴۰',
      uniqueUsers: '۳۲,۵۰۰',
    },
    curveBlue: 'M 0 130 Q 70 90, 140 65 T 280 40 T 420 22 T 520 10',
    curveGreen: 'M 0 120 Q 80 80, 160 55 T 300 35 T 440 18 T 520 12',
    curveOrange: 'M 0 125 Q 90 85, 180 60 T 320 30 T 450 15 T 520 8',
    topTriggeredItems: [
      { name: 'افزودن به سبد خرید (Add to Cart)', count: '۶۴,۲۰۰', share: '۵۰٪' },
      { name: 'ورود به صفحه تسویه‌حساب (Checkout)', count: '۳۸,۵۰۰', share: '۳۰٪' },
      { name: 'پرداخت موفق سفارش (Purchase)', count: '۲۶,۰۰۰', share: '۲۰٪' },
    ],
  },
];

export const EventTrackingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('click');
  const current = EVENT_CATEGORIES.find((c) => c.id === activeTab) || EVENT_CATEGORIES[0];

  return (
    <section id="events" className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0E74D2]" />
          <span>رویدادهای تحلیلی | Events Analytics</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A]">
          هر تعامل مهم، قابل اندازه‌گیری
        </h2>
      </div>

      {/* 8-Tab Horizontal Selector Bar (Matching Reference) */}
      <div className="bg-slate-100/90 border border-slate-200/80 rounded-2xl p-2 mb-8 overflow-x-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          {EVENT_CATEGORIES.map((tab) => {
            const isSelected = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#0E74D2] shadow-md shadow-slate-900/5 border border-blue-200/80'
                    : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#0E74D2] text-white'
                      : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {tab.icon}
                </div>
                <span className="truncate max-w-full">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Event Showcase Container */}
      <div className="rounded-3xl bg-gradient-to-b from-[#F8FAFC] to-[#EFF6FF]/50 border border-slate-200/90 p-5 sm:p-8 shadow-sm">
        {/* Top Title Strip inside Panel */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-6 rounded-full bg-[#0E74D2]" />
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">{current.label}</h3>
          </div>
          <span
            className="text-xs font-bold text-[#0E74D2] bg-sky-100/90 border border-sky-200 px-3.5 py-1 rounded-full font-mono"
            dir="ltr"
          >
            {current.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Right Column in RTL: 3 Specification Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Spec Box 1: What is this event? */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-right">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <h4 className="text-sm font-black text-[#0E74D2]">این رویداد چیست؟</h4>
                <span className="w-8 h-8 rounded-xl bg-sky-50 text-[#0E74D2] flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-6 text-justify">{current.whatIsIt}</p>
            </div>

            {/* Spec Box 2: On which elements does it run? */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-right">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h4 className="text-sm font-black text-[#0E74D2]">
                  روی چه المان‌هایی اجرا می‌شود؟
                </h4>
                <span className="w-8 h-8 rounded-xl bg-sky-50 text-[#0E74D2] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </span>
              </div>
              <ul className="space-y-2">
                {current.elements.map((el, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E74D2] mt-1.5 shrink-0" />
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spec Box 3: What report do you see in the dashboard? */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-right">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h4 className="text-sm font-black text-[#0E74D2]">
                  در داشبورد چه گزارشی می‌بینید؟
                </h4>
                <span className="w-8 h-8 rounded-xl bg-sky-50 text-[#0E74D2] flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4" />
                </span>
              </div>
              <ul className="space-y-2">
                {current.dashboardReports.map((rep, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-1.5 shrink-0" />
                    <span>{rep}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Left Column in RTL: Interactive Event Analytics Dashboard Preview (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border-2 border-sky-200/90 shadow-xl shadow-blue-950/5 overflow-hidden">
              {/* Dashboard Top Bar */}
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#0E74D2]">IRA ایران آنالیتیکس</span>
                  <span className="text-[11px] bg-blue-100 text-[#0E74D2] font-bold px-2.5 py-0.5 rounded-md">
                    گزارش رویداد: {current.label}
                  </span>
                </div>
                <div className="flex items-center gap-1.5" dir="ltr">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
              </div>

              <div className="p-5 space-y-5">
                {/* 5 KPI Summary Strip (Matching Reference Screenshot) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-center">
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <div className="text-[10px] text-slate-400">کل رویدادها</div>
                    <div className="text-xs sm:text-sm font-black text-slate-900 mt-1">
                      {current.stats.totalEvents}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <div className="text-[10px] text-slate-400">نرخ تبدیل</div>
                    <div className="text-xs sm:text-sm font-black text-emerald-600 mt-1">
                      {current.stats.conversionRate}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <div className="text-[10px] text-slate-400">تاخیر ثبت</div>
                    <div className="text-xs sm:text-sm font-black text-[#0E74D2] mt-1">
                      {current.stats.avgLatency}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <div className="text-[10px] text-slate-400">صفحات فعال</div>
                    <div className="text-xs sm:text-sm font-black text-amber-600 mt-1">
                      {current.stats.activePages}
                    </div>
                  </div>
                  <div className="bg-sky-50/80 rounded-xl p-2.5 border border-sky-200/60">
                    <div className="text-[10px] text-[#0E74D2]">کاربران یکتا</div>
                    <div className="text-xs sm:text-sm font-black text-[#0E74D2] mt-1">
                      {current.stats.uniqueUsers}
                    </div>
                  </div>
                </div>

                {/* Multi-Curve Event Trend Chart */}
                <div className="rounded-2xl bg-slate-50/70 border border-slate-100 p-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span className="font-bold text-slate-700">
                      نمودار روند ثبت رویداد «{current.label}» در ۳۰ روز گذشته
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#0E74D2]" /> دسکتاپ
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" /> موبایل
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> تبدیل موفق
                      </span>
                    </div>
                  </div>

                  <div className="h-44 w-full">
                    <svg
                      viewBox="0 0 520 145"
                      className="w-full h-full overflow-visible"
                      fill="none"
                    >
                      <line
                        x1="0"
                        y1="30"
                        x2="520"
                        y2="30"
                        stroke="#E2E8F0"
                        strokeDasharray="4 4"
                      />
                      <line
                        x1="0"
                        y1="75"
                        x2="520"
                        y2="75"
                        stroke="#E2E8F0"
                        strokeDasharray="4 4"
                      />
                      <line
                        x1="0"
                        y1="120"
                        x2="520"
                        y2="120"
                        stroke="#E2E8F0"
                        strokeDasharray="4 4"
                      />

                      <path
                        d={current.curveBlue}
                        stroke="#0E74D2"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d={current.curveGreen}
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d={current.curveOrange}
                        stroke="#F59E0B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                      />

                      <circle cx="280" cy="45" r="4.5" fill="#0E74D2" stroke="white" strokeWidth="2" />
                      <circle cx="420" cy="25" r="5" fill="#10B981" stroke="white" strokeWidth="2" />
                      <circle cx="450" cy="20" r="5" fill="#F59E0B" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* Top Triggered Events Breakdown Table */}
                <div className="space-y-2">
                  <div className="text-xs font-extrabold text-slate-700">
                    پرتکرارترین المان‌های ثبت‌شده در دسته «{current.label}»:
                  </div>
                  <div className="space-y-2">
                    {current.topTriggeredItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-200/60 text-xs"
                      >
                        <span className="font-bold text-slate-800">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 font-semibold">{item.count} بار</span>
                          <span className="bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded-md">
                            {item.share}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
