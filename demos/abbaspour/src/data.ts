export const categories = [
  { name: "آبنبات چوبی", image: "lollipop", en: "Lollipops" },
  { name: "شکلات", image: "chocolate", en: "Chocolate" },
  { name: "بیسکویت", image: "biscuit", en: "Biscuits" },
  { name: "کیک", image: "cake", en: "Cakes" },
  { name: "آبنبات", image: "candy", en: "Candies" },
  { name: "آدامس", image: "gum", en: "Chewing gum" },
];
export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  flavor: string;
  weight?: string;
  desc: string;
  brand: string;
};
export const products: Product[] = [
  {
    id: "mini-polo",
    name: "مینی پولو میوه‌ای",
    category: "آبنبات",
    image: "polo",
    flavor: "میوه‌ای",
    weight: "۱ کیلوگرم",
    brand: "Mini Polo",
    desc: "آبنبات‌های کوچک و رنگارنگ با طعم‌های میوه‌ای؛ انتخابی شیرین برای پذیرایی، دورهمی و شریک شدن در لحظه‌های خوش.",
  },
  {
    id: "mini-luxury",
    name: "آبنبات مینی لاکچری",
    category: "آبنبات",
    image: "mini",
    flavor: "میوه‌ای",
    weight: "۵۰۰ گرم",
    brand: "Adrin",
    desc: "مجموعه‌ای از آبنبات‌های میوه‌ای در بسته‌بندی‌های کوچک و رنگارنگ. تنوعی دلنشین برای ظرف پذیرایی شما.",
  },
  {
    id: "luxury",
    name: "آبنبات لاکچری آدرین",
    category: "آبنبات",
    image: "luxury",
    flavor: "میوه‌ای",
    weight: "۱ کیلوگرم",
    brand: "Adrin",
    desc: "ترکیبی از طعم‌های میوه‌ای خانواده آدرین در یک بسته؛ برای وقتی که می‌خواهید شیرینی یک لحظه را با دیگران قسمت کنید.",
  },
  {
    id: "rand-cracker",
    name: "کراکر نمکی رَند",
    category: "بیسکویت",
    image: "cracker",
    flavor: "نمکی",
    weight: "۴۶ گرم",
    brand: "Rand",
    desc: "کراکرهای ترد و نمکی رَند، همراهی ساده و خوش‌طعم برای میان‌وعده در خانه، محل کار و سفر.",
  },
  {
    id: "cc-come",
    name: "ویفر کاکائویی سی‌سی‌کام",
    category: "شکلات",
    image: "chocolate",
    flavor: "کاکائویی",
    brand: "c.c.come",
    desc: "لایه‌های ترد ویفر در کنار روکش کاکائویی؛ از طعم‌های دوست‌داشتنی خانواده آدرین برای یک استراحت شیرین.",
  },
  {
    id: "lollipop",
    name: "آبنبات چوبی آدرین",
    category: "آبنبات چوبی",
    image: "lollipop",
    flavor: "میوه‌ای",
    brand: "Adrin",
    desc: "آبنبات چوبی رنگارنگ از مجموعه شیرینی‌های آدرین؛ یک انتخاب بازیگوش و نوستالژیک برای طرفداران آبنبات.",
  },
  {
    id: "cake",
    name: "کیک کاکائویی آدرین",
    category: "کیک",
    image: "cake",
    flavor: "کاکائویی",
    brand: "Adrin",
    desc: "از خانواده کیک‌های آدرین، برای همراهی با یک فنجان چای و ساختن یک عصرانه دلنشین.",
  },
  {
    id: "gum",
    name: "آدامس آدرین",
    category: "آدامس",
    image: "gum",
    flavor: "میوه‌ای",
    brand: "Adrin",
    desc: "طعم‌های خوشایند از خانواده آدامس‌های آدرین در بسته‌بندی همراه؛ برای لحظه‌های روزمره شما.",
  },
  {
    id: "biscuit",
    name: "بیسکویت کره‌ای آدرین",
    category: "بیسکویت",
    image: "biscuit",
    flavor: "کره‌ای",
    brand: "Adrin",
    desc: "بیسکویتی ترد با طعمی آشنا؛ همراه همیشگی چای و قهوه و یک میان‌وعده ساده و دوست‌داشتنی.",
  },
];
export type Article = {
  title: string;
  tag: string;
  image: string;
  body: string[];
};
export const articles: Article[] = [
  {
    title: "اتمام کمپین رالی قهرمانان آدرین و اعلام برندگان نهایی",
    tag: "کمپین",
    image: "rally",
    body: [
      "کمپین «رالی قهرمانان آدرین» با همراهی علاقه‌مندان به پایان رسید. این کمپین فرصتی بود برای تجربه‌ای متفاوت و پرهیجان در کنار خانواده آدرین.",
      "با پایان این دوره، برندگان نهایی کمپین معرفی شدند. از همه همراهانی که در این مسیر با ما بودند سپاسگزاریم. برای پیگیری اطلاعات مربوط به جوایز، با واحد صدای مشتری آدرین در تماس باشید.",
    ],
  },
  {
    title: "صعود تیم تکواندوی نونهالان دختر آدرین به مرحله بعد مسابقات کشوری",
    tag: "ورزش",
    image: "sport",
    body: [
      "تیم تکواندوی نونهالان دختر آدرین در رقابت‌های منطقه یک کشور به مرحله بعد راه یافت. این موفقیت حاصل تلاش ورزشکاران و همراهی مربیان تیم است.",
      "گروه صنعتی عباسپور آدرین این موفقیت را به اعضای تیم، خانواده‌ها و دوستداران ورزش تبریک می‌گوید.",
    ],
  },
  {
    title: "معرفی برندبوک و مسکات سازمانی گروه صنعتی عباسپور آدرین",
    tag: "اخبار شرکت",
    image: "book",
    body: [
      "برندبوک و مسکات سازمانی گروه صنعتی عباسپور آدرین در سالن پارادایم تهران معرفی شد. در این رویداد، هویت بصری و شخصیت برند آدرین ارائه شد.",
      "این مجموعه، زبان مشترکی برای معرفی محصولات و ارتباطی یکپارچه‌تر با همراهان خانواده آدرین فراهم می‌کند.",
    ],
  },
  {
    title: "رونمایی از هویت تازه آدرین در تبریز",
    tag: "رویداد",
    image: "brand-event",
    body: [
      "مراسم رونمایی از برندبوک و مسکات سازمانی گروه صنعتی عباسپور آدرین در هتل پارس تبریز برگزار شد.",
      "در این گردهمایی، بخش‌هایی از مسیر شکل‌گیری نشان و شخصیت بصری آدرین با مهمانان به اشتراک گذاشته شد؛ قدمی تازه در ادامه داستانی که از تبریز آغاز شده است.",
    ],
  },
];
export type Dialog =
  | null
  | { kind: "search" | "agency" | "faq" | "story" | "branches" }
  | { kind: "product"; product: Product }
  | { kind: "article"; article: Article };
export type OpenDialog = (dialog: Dialog) => void;
export const image = (name: string) => `${import.meta.env.BASE_URL}images/${name}.webp`;
export const fa = (n: number) => n.toLocaleString("fa-IR");
