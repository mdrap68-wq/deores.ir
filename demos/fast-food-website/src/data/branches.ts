export interface Branch {
  id: string;
  area: string;
  address: string;
  phone: string;
  hours: string;
  coverage: string;
  /** pin position on the stylized map, percent */
  x: number;
  y: number;
}

export const BRANCHES: Branch[] = [
  {
    id: "saadat",
    area: "سعادت‌آباد",
    address: "تهران، سعادت‌آباد، بلوار دریا، نبش گل‌افشان، پلاک ۲۴",
    phone: "۰۲۱ ۲۲۶۷ ۸۹۰۱",
    hours: "۱۱:۰۰ تا ۲۳:۰۰",
    coverage: "سعادت‌آباد، شهرک غرب، فرحزادی، ستارخان شمالی",
    x: 68,
    y: 26,
  },
  {
    id: "yousef",
    area: "یوسف‌آباد",
    address: "تهران، یوسف‌آباد، خیابان توحید، کوچه سی‌ودوم، پلاک ۸۸",
    phone: "۰۲۱ ۸۸۵۵ ۴۳۱۲",
    hours: "۱۲:۰۰ تا ۲۳:۳۰",
    coverage: "یوسف‌آباد، فاطمی، جهاد، امیرآباد، کریم‌خان",
    x: 44,
    y: 52,
  },
  {
    id: "sadeghieh",
    area: "صادقیه",
    address: "تهران، صادقیه، بلوار فردوس، روبه‌روی شهدای فلکه دوم، پلاک ۱۲",
    phone: "۰۲۱ ۴۴۰۷ ۵۵۹۰",
    hours: "۱۱:۰۰ تا ۲۳:۰۰",
    coverage: "صادقیه، جنت‌آباد، شهران، پونک، ستارخان",
    x: 22,
    y: 38,
  },
];
