export type Product = { id: string; name: string; english: string; category: string; image: string; price: number; discount: number; colors: string[]; description: string; specs: [string, string][] }
export const categories = [
  { id: 'phone', name: 'موبایل و تبلت', image: 'iphone' },
  { id: 'computer', name: 'لپ‌تاپ و کامپیوتر', image: 'laptop' },
  { id: 'audio', name: 'صوتی و تصویری', image: 'hero-headphones' },
  { id: 'watch', name: 'ساعت هوشمند', image: 'watch' },
  { id: 'home', name: 'خانه و آشپزخانه', image: 'coffee' },
  { id: 'fashion', name: 'مد و پوشاک', image: 'sneaker' },
  { id: 'beauty', name: 'زیبایی و سلامت', image: 'dryer' },
]
export const products: Product[] = [
  { id:'iphone', name:'گوشی آیفون ۱۵ پرو اپل', english:'Apple iPhone 15 Pro', category:'phone', image:'iphone', price:89500000, discount:8, colors:['#aaa295','#454647','#dfded8'], description:'طراحی تیتانیومی، نمایشگر خوش‌رنگ و دوربین حرفه‌ای؛ همراهی برای ثبت جزئیات هر روز.', specs:[['حافظه داخلی','۲۵۶ گیگابایت'],['نمایشگر','۶٫۱ اینچ'],['جنس بدنه','تیتانیوم']] },
  { id:'watch', name:'ساعت هوشمند اولترا با بند نارنجی', english:'Ultra Sport Watch', category:'watch', image:'watch', price:12950000, discount:12, colors:['#ef6926','#232628','#d5c6a3'], description:'یک همراه خوش‌ساخت برای فعالیت‌های روزانه با نمایشگر خوانا و بند اسپرتِ راحت.', specs:[['نوع نمایشگر','رنگی لمسی'],['سبک','ورزشی و روزمره'],['نوع بند','سیلیکونی']] },
  { id:'airpods', name:'ایرپاد پرو نسل دوم اپل', english:'Apple AirPods Pro 2', category:'audio', image:'airpods', price:14800000, discount:10, colors:['#f4f4ef'], description:'صدایی شفاف در طراحی سبک و جمع‌وجور؛ برای موسیقی، تماس و لحظه‌های تمرکز.', specs:[['اتصال','بلوتوث'],['طراحی','توگوشی'],['امکانات','حذف نویز فعال']] },
  { id:'laptop', name:'لپ‌تاپ مک‌بوک ایر اپل', english:'Apple MacBook Air', category:'computer', image:'laptop', price:63800000, discount:0, colors:['#a5a6a7','#d3c5ac'], description:'لپ‌تاپی سبک با بدنه آلومینیومی و نمایشگر شفاف برای کار، مطالعه و خلاقیت روزمره.', specs:[['حافظه داخلی','۲۵۶ گیگابایت'],['حافظه رم','۸ گیگابایت'],['جنس بدنه','آلومینیوم']] },
  { id:'headphones', name:'هدفون بی‌سیم استودیو پرو', english:'Studio Pro Wireless', category:'audio', image:'hero-headphones', price:7650000, discount:15, colors:['#414141','#b6b7b8'], description:'ترکیب فلز پرداخت‌شده و بالشتک‌های نرم برای تجربه‌ای فراگیر از موسیقی مورد علاقه‌ات.', specs:[['اتصال','بی‌سیم'],['طراحی','دورگوشی'],['نوع شارژ','USB-C']] },
  { id:'coffee', name:'اسپرسوساز استیل کلاسیک', english:'Classic Espresso Maker', category:'home', image:'coffee', price:9800000, discount:10, colors:['#acacad','#363636'], description:'عطر یک فنجان قهوه تازه در خانه؛ با طراحی جمع‌وجور و بدنه‌ای از استیل پرداخت‌شده.', specs:[['نوع دستگاه','اسپرسوساز خانگی'],['جنس بدنه','استیل'],['امکانات','نازل بخار']] },
  { id:'sneaker', name:'کتانی روزمره رترو', english:'Retro Everyday Sneaker', category:'fashion', image:'sneaker', price:3650000, discount:20, colors:['#e1d4ba'], description:'ترکیب رنگ گرم و فرم کلاسیک برای قدم‌زدن‌های روزمره، با زیره سبک و راحت.', specs:[['کاربرد','روزمره'],['سایز','۴۲'],['رنگ','کرم و نارنجی']] },
  { id:'dryer', name:'سشوار حرفه‌ای رزگلد', english:'Airflow Rose Hair Dryer', category:'beauty', image:'dryer', price:4250000, discount:0, colors:['#d9a085'], description:'طراحی سبک و متمرکزکننده جریان هوا برای حالت دادن آسان به موها.', specs:[['نوع','خانگی و حرفه‌ای'],['سری همراه','متمرکزکننده'],['رنگ','رزگلد']] },
  { id:'speaker', name:'اسپیکر بلوتوثی کلاسیک', english:'Classic Wireless Speaker', category:'audio', image:'speaker', price:6300000, discount:15, colors:['#2a2927'], description:'صدای گرم و طراحی الهام‌گرفته از آمپلی‌فایرهای کلاسیک، برای گوشه مورد علاقه خانه‌ات.', specs:[['اتصال','بلوتوث'],['طراحی','رومیزی'],['کنترل','پیچ‌های آنالوگ']] },
]
export const fa = (n: number) => new Intl.NumberFormat('fa-IR').format(n)
export const picture = (image: string) => `${import.meta.env.BASE_URL}images/${image}.webp`
export const oldPrice = (p: Product) => Math.round(p.price / (1 - p.discount / 100) / 1000) * 1000
export type CartItem = { id: string; color: string; quantity: number }
export type Profile = { name: string; phone: string }
export type Order = { code: string; total: number; name: string; date: string; count: number }
export type Panel = 'search' | 'categories' | 'cart' | 'product' | 'profile' | 'favorites' | 'checkout' | 'confirmation' | 'tracking' | 'about' | 'help' | 'menu' | null
export function readSaved<T>(key: string, fallback: T): T { try { return JSON.parse(localStorage.getItem(`kalachi-${key}`) || 'null') ?? fallback } catch { return fallback } }
export function save(key: string, value: unknown) { try { localStorage.setItem(`kalachi-${key}`, JSON.stringify(value)) } catch { /* Storage may be unavailable in private browsing. */ } }
