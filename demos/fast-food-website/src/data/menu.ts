export type CategoryId =
  | "burger"
  | "cheese"
  | "chicken"
  | "pizza"
  | "fries"
  | "sandwich"
  | "drink"
  | "sauce";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface MenuItem {
  id: string;
  cat: CategoryId;
  name: string;
  desc: string;
  price: number; // toman
  spicy?: boolean;
  popular?: boolean;
  /** image key — sauces are served image-free by design */
  img?: string;
}

export const IMG = {
  burger: "/images/menu-burger.jpg",
  cheese: "/images/burger-assembled.jpg",
  chicken: "/images/menu-chicken.jpg",
  pizza: "/images/menu-pizza.jpg",
  fries: "/images/menu-fries.jpg",
  sandwich: "/images/menu-sandwich.jpg",
  drink: "/images/menu-drink.jpg",
} as const;

export const CATEGORIES: Category[] = [
  { id: "burger", label: "برگر" },
  { id: "cheese", label: "چیزبرگر" },
  { id: "chicken", label: "مرغ" },
  { id: "pizza", label: "پیتزا" },
  { id: "fries", label: "سیب‌زمینی" },
  { id: "sandwich", label: "ساندویچ" },
  { id: "drink", label: "نوشیدنی" },
  { id: "sauce", label: "سس و تاپینگ" },
];

export const MENU: MenuItem[] = [
  // ——— برگر
  {
    id: "b-classic",
    cat: "burger",
    name: "برگر کلاسیک",
    desc: "گوشت گریل‌شده ۱۵۰ گرمی، پنیر چدار، کاهو، گوجه، خیارشور و سس کلاسیک",
    price: 298_000,
    popular: true,
    img: IMG.burger,
  },
  {
    id: "b-mrbeef",
    cat: "burger",
    name: "مستر بیف",
    desc: "دوبل گوشت ۱۰۰ گرمی، پیاز کاراملی، دو لایه چدار، سس دودی",
    price: 445_000,
    img: IMG.cheese,
  },
  {
    id: "b-fire",
    cat: "burger",
    name: "فایر برگر",
    desc: "گوشت گریل‌شده، هالوپینو، سس تند مخصوص بایت، چدار ذوب‌شده",
    price: 385_000,
    spicy: true,
    img: IMG.burger,
  },
  // ——— چیزبرگر
  {
    id: "c-cheese",
    cat: "cheese",
    name: "چیزبرگر",
    desc: "گوشت تازه، دو لایه پنیر چدار، خیارشور و سس مخصوص",
    price: 315_000,
    img: IMG.cheese,
  },
  {
    id: "c-double",
    cat: "cheese",
    name: "دبل چیز",
    desc: "دو عدد گوشت گریل‌شده، پنیر چدار، سس مخصوص، خیارشور و پیاز کاراملی",
    price: 395_000,
    popular: true,
    img: IMG.cheese,
  },
  {
    id: "c-mushroom",
    cat: "cheese",
    name: "چیز ماشروم",
    desc: "گوشت، چدار، قارچ سوته‌شده با کره و سس سیر خانگی",
    price: 348_000,
    img: IMG.cheese,
  },
  // ——— مرغ
  {
    id: "ch-crispy",
    cat: "chicken",
    name: "چیکن کریسپی",
    desc: "سینه مرغ سوخاری ترد، کاهو، پیاز کاراملی و سس مایونز سیر",
    price: 289_000,
    popular: true,
    img: IMG.chicken,
  },
  {
    id: "ch-hot",
    cat: "chicken",
    name: "هات چیکن",
    desc: "مرغ سوخاری، سس تند مخصوص، پیاز خردشده و خیارشور",
    price: 305_000,
    spicy: true,
    img: IMG.chicken,
  },
  {
    id: "ch-double",
    cat: "chicken",
    name: "دبل چیکن",
    desc: "دو لایه فیله کریسپی، چدار ذوب‌شده و سس مخصوص بایت",
    price: 339_000,
    img: IMG.chicken,
  },
  // ——— پیتزا
  {
    id: "p-pep",
    cat: "pizza",
    name: "پیتزا پپرونی",
    desc: "پپرونی گوساله، موتزارلای کش‌دار، سس گوجه خانگی، خمیر ۴۸ ساعته",
    price: 425_000,
    popular: true,
    img: IMG.pizza,
  },
  {
    id: "p-special",
    cat: "pizza",
    name: "پیتزا مخصوص بایت",
    desc: "گوشت چرخ‌کرده گریل‌شده، قارچ، فلفل دلمه و موتزارلا",
    price: 458_000,
    img: IMG.pizza,
  },
  {
    id: "p-4cheese",
    cat: "pizza",
    name: "پیتزا چهار پنیر",
    desc: "موتزارلا، گودا، پارمسان و گورگونزولا روی خمیر نازک",
    price: 468_000,
    img: IMG.pizza,
  },
  // ——— سیب‌زمینی
  {
    id: "f-plain",
    cat: "fries",
    name: "سیب‌زمینی ساده",
    desc: "برش دستی، نمک دریایی، دو بار سرخ‌شده، سس کنار",
    price: 119_000,
    img: IMG.fries,
  },
  {
    id: "f-cheese",
    cat: "fries",
    name: "سیب‌زمینی با پنیر",
    desc: "زیر باران سس چدار داغ و جعفری تازه",
    price: 169_000,
    popular: true,
    img: IMG.fries,
  },
  {
    id: "f-special",
    cat: "fries",
    name: "سیب‌زمینی ویژه",
    desc: "گوشت چرخ‌کرده ترد، چدار، پیاز کاراملی و سس مخصوص",
    price: 229_000,
    img: IMG.fries,
  },
  // ——— ساندویچ
  {
    id: "s-bandari",
    cat: "sandwich",
    name: "ساندویچ بندری",
    desc: "سوسیس تند جنوبی، پیاز سرخ‌شده، خیارشور تو نان باگت داغ",
    price: 215_000,
    spicy: true,
    img: IMG.sandwich,
  },
  {
    id: "s-chicken",
    cat: "sandwich",
    name: "ساندویچ مرغ گریل",
    desc: "فیله مرغ زعفرانی، کاهو، گوجه گلخانه‌ای و سس مخصوص",
    price: 248_000,
    img: IMG.sandwich,
  },
  {
    id: "s-hotdog",
    cat: "sandwich",
    name: "هات‌داگ دودی",
    desc: "هات‌داگ گوسالی دودی، سس قارچ و پنیر، پیاز ترد",
    price: 198_000,
    img: IMG.sandwich,
  },
  // ——— نوشیدنی
  {
    id: "d-cola",
    cat: "drink",
    name: "نوشابه قوطی",
    desc: "کولا یخ، قوطی ۳۳۰ میلی‌لیتری",
    price: 45_000,
    img: IMG.drink,
  },
  {
    id: "d-doogh",
    cat: "drink",
    name: "دوغ سنتی",
    desc: "دوغ گاوانه‌ای گازدار با نعناع خشک",
    price: 55_000,
    img: IMG.drink,
  },
  {
    id: "d-mojito",
    cat: "drink",
    name: "موکتل لیمو نعناع",
    desc: "لیمو تازه، نعناع زنده، سودا و یخ خرد",
    price: 95_000,
    img: IMG.drink,
  },
  // ——— سس و تاپینگ
  {
    id: "x-sauce",
    cat: "sauce",
    name: "سس مخصوص بایت",
    desc: "دستور مخفی آشپزخونه؛ دودی، خامه‌ای، یه کوچولو تند",
    price: 35_000,
    popular: true,
  },
  {
    id: "x-hotsauce",
    cat: "sauce",
    name: "سس تند هالوپینو",
    desc: "برای کسایی که با آتش رفیقن",
    price: 38_000,
    spicy: true,
  },
  {
    id: "x-cheddar",
    cat: "sauce",
    name: "پنیر چدار اضافه",
    desc: "یه لایه چدار اصیل، ذوب‌شده روی هر چی",
    price: 49_000,
  },
  {
    id: "x-beef",
    cat: "sauce",
    name: "گوشت اضافه ۱۰۰ گرمی",
    desc: "گوساله تازه، گریل لحظه سفارش",
    price: 145_000,
  },
  {
    id: "x-onion",
    cat: "sauce",
    name: "پیاز کاراملی اضافه",
    desc: "آروم پخته‌شده تو کره، شیرین و دودی",
    price: 29_000,
  },
];

export const itemById = (id: string) => MENU.find((m) => m.id === id);

export const DELIVERY_FEE = 59_000;
export const FREE_DELIVERY_FROM = 600_000;
