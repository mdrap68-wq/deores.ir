import {
  ArrowLeft,
  ArrowUp,
  ArrowUpLeft,
  Clock3,
  Download,
  Globe2,
  Headphones,
  Instagram,
  MoveUpLeft,
  Sparkles,
  Wheat,
} from "lucide-react";
import {
  articles,
  categories,
  fa,
  image,
  products,
  type Article,
  type OpenDialog,
  type Product,
} from "../data";

export function Eyebrow({ children }: { children: string }) {
  return (
    <div className="eyebrow" dir="ltr">
      <i />
      {children}
    </div>
  );
}
export function Collection({ browse }: { browse: (c?: string) => void }) {
  return (
    <section
      className="container collection section-space"
      id="collection"
      data-nav-section
    >
      <div className="section-heading">
        <Eyebrow>OUR COLLECTION</Eyebrow>
        <h2>
          محصول دلخواهتان را <span>پیدا کنید</span>
        </h2>
        <p>
          از شیرینی‌های نوستالژیک تا طعم‌های تازه؛ برای هر سلیقه، یک انتخاب.
        </p>
      </div>
      <div className="category-tray">
        {categories.map((c, i) => (
          <button
            className={"category-card category-" + i}
            key={c.name}
            onClick={() => browse(c.name)}
          >
            <div className="category-circle">
              <img src={image(c.image)} alt="" loading="lazy" />
            </div>
            <strong>{c.name}</strong>
            <small dir="ltr">{c.en}</small>
          </button>
        ))}
        <button className="tray-link" onClick={() => browse()}>
          همه محصولات
          <span>
            <ArrowLeft size={16} />
          </span>
        </button>
      </div>
    </section>
  );
}
export function World({ open }: { open: OpenDialog }) {
  return (
    <section
      className="container global-section section-space"
      id="distribution"
    >
      <div className="world-panel">
        <div className="world-text">
          <Eyebrow>ADRIN AROUND THE WORLD</Eyebrow>
          <h2>
            از قلب <span>ایران،</span>
            <br />
            تا سراسر جهان.
          </h2>
          <p>
            توزیع در سراسر ایران و حضور در بازارهای جهانی؛ طعم آدرین، مرز
            نمی‌شناسد.
          </p>
          <button
            className="button button-outline-light"
            onClick={() => open({ kind: "branches" })}
          >
            شعب و نمایندگی‌ها
            <ArrowLeft size={16} />
          </button>
        </div>
        <div className="world-art">
          <img
            src={`${import.meta.env.BASE_URL}images/world.svg`}
            alt="نقشه جهان و جایگاه ایران در شبکه توزیع آدرین"
            loading="lazy"
          />
          <svg viewBox="0 0 900 400" aria-hidden="true">
            <g
              stroke="#f38b4d"
              strokeWidth="1.7"
              fill="none"
              strokeDasharray="4 5"
            >
              <path d="M582 145 Q553 56 470 89 M582 145Q633 22 675 71 M582 145Q677 94 715 160 M582 145Q726 186 785 310 M582 145Q504 111 530 187" />
            </g>
            {[
              [470, 89],
              [675, 71],
              [715, 160],
              [785, 310],
              [530, 187],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="4" fill="#f48645" />
            ))}
            <circle cx="582" cy="145" r="11" fill="#ef783b" opacity=".5" />
            <circle cx="582" cy="145" r="4" fill="white" />
          </svg>
          <span className="map-origin">
            <span />
            تبریز، ایران
          </span>
        </div>
        <div className="world-caption">
          <Globe2 size={14} />
          <span>بیش از ۳۰ مقصد صادراتی</span>
        </div>
      </div>
    </section>
  );
}
export function Story({ open }: { open: OpenDialog }) {
  return (
    <section
      className="container story section-space"
      id="about"
      data-nav-section
    >
      <div className="story-copy">
        <Eyebrow>THE ADRIN STORY</Eyebrow>
        <h2>
          یک داستان <span>شیرین،</span>
          <br />
          از سال ۱۳۳۵
        </h2>
        <p>
          داستان گروه صنعتی عباسپور آدرین از تبریز آغاز شد. داستانی از تلاش،
          نوآوری و عشق به ساختن طعم‌هایی که نسل به نسل، مهمان خانه‌های ایرانی
          بوده‌اند.
        </p>
        <p>
          امروز هم با همان اشتیاق، کیفیت ایرانی را به بازارهای جهان می‌بریم.
        </p>
        <button className="text-button" onClick={() => open({ kind: "story" })}>
          بیشتر درباره آدرین
          <span>
            <ArrowLeft size={17} />
          </span>
        </button>
      </div>
      <div className="story-visual">
        <div className="story-year" dir="ltr">
          1956
        </div>
        <img
          className="story-large"
          src={image("factory")}
          alt="کارخانه گروه صنعتی عباسپور آدرین در تبریز"
          loading="lazy"
        />
        <img
          className="story-small"
          src={image("heritage")}
          alt="تصویر آرشیوی از فضای تولید مجموعه عباسپور"
          loading="lazy"
        />
        <div className="story-note">
          <Wheat size={19} />
          <span>ریشه در اصالت، نگاه به آینده</span>
        </div>
        <Sparkles className="story-spark" size={32} />
      </div>
    </section>
  );
}
export function Products({
  category,
  setCategory,
  expanded,
  setExpanded,
  openProduct,
}: {
  category: string;
  setCategory: (c: string) => void;
  expanded: boolean;
  setExpanded: (b: boolean) => void;
  openProduct: (p: Product) => void;
}) {
  const filtered = products.filter(
    (p) => category === "همه" || p.category === category,
  );
  const items = expanded ? filtered : filtered.slice(0, 4);
  return (
    <section
      className="products-section section-space"
      id="products"
      data-nav-section
    >
      <div className="container">
        <div className="split-heading">
          <div>
            <Eyebrow>FRESH FROM ADRIN</Eyebrow>
            <h2>
              {expanded ? "مجموعه محصولات" : "جدیدترین محصولات"}{" "}
              <span>آدرین</span>
            </h2>
            <p>با طعم‌های تازه خانواده آدرین آشنا شوید.</p>
          </div>
          <button
            className="text-button"
            onClick={() => {
              setCategory("همه");
              setExpanded(!expanded);
            }}
          >
            {expanded ? "نمایش تازه‌ترین‌ها" : "مشاهده همه محصولات"}
            <span>
              <ArrowLeft size={16} />
            </span>
          </button>
        </div>
        {expanded && (
          <div className="filter-chips" aria-label="فیلتر گروه محصول">
            {["همه", ...categories.map((c) => c.name)].map((c) => (
              <button
                className={category === c ? "selected" : ""}
                key={c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
            <small>{fa(filtered.length)} محصول</small>
          </div>
        )}
        <div className="product-grid">
          {items.map((p, i) => (
            <button
              className="product-card"
              key={p.id}
              onClick={() => openProduct(p)}
            >
              <div className={"product-picture tone-" + (i % 4)}>
                <span className="product-number" dir="ltr">
                  N° {String(products.indexOf(p) + 1).padStart(2, "0")}
                </span>
                {i === 0 && <span className="new-pill">تازه</span>}
                <div className="product-halo" />
                <img
                  className={
                    ["polo", "mini", "luxury", "cracker"].includes(p.image)
                      ? "package-img"
                      : ""
                  }
                  src={image(p.image)}
                  alt={p.name}
                  loading="lazy"
                />
              </div>
              <div className="product-card-body">
                <small>
                  {p.category}
                  <i />
                  {p.flavor}
                </small>
                <h3>{p.name}</h3>
                <div className="product-link">
                  <span>جزئیات محصول</span>
                  <span className="small-round">
                    <ArrowUpLeft size={16} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
const brandNames = [
  "Yummy Mummy",
  "Mini Caramel",
  "Topi Tak",
  "Topi Land",
  "Bisoreno",
  "Flat Lismak",
  "Samak",
  "Biscoloosh",
  "Mini Candy",
  "Happy Mappy",
  "Mini Polo",
  "Adrin",
  "Happy Lismak",
  "Rand",
];
export function Brands() {
  return (
    <section className="container brands section-space">
      <div className="brands-heading">
        <Eyebrow>OUR BRAND FAMILY</Eyebrow>
        <h2>
          <span>۱۴ برند،</span> یک خانواده
        </h2>
        <p>نام‌های آشنا از خانواده بزرگ آدرین</p>
      </div>
      <div className="brands-grid">
        {brandNames.map((name, i) => (
          <div className="partner-brand" key={name}>
            <img
              src={`${import.meta.env.BASE_URL}images/brand-${i}.webp`}
              alt={name}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
export function Journal({
  openArticle,
}: {
  openArticle: (a: Article) => void;
}) {
  return (
    <section
      className="container journal section-space"
      id="journal"
      data-nav-section
    >
      <div className="section-heading">
        <Eyebrow>ADRIN JOURNAL</Eyebrow>
        <h2>
          تازه‌ها و <span>خواندنی‌های آدرین</span>
        </h2>
        <p>رویدادها، داستان‌ها و خبرهای خانواده آدرین</p>
      </div>
      <div className="journal-grid">
        <button
          className="feature-story"
          onClick={() => openArticle(articles[0])}
        >
          <div className="feature-image">
            <img
              src={image("rally")}
              alt="کمپین رالی قهرمانان آدرین"
              loading="lazy"
            />
            <span className="journal-tag">کمپین آدرین</span>
          </div>
          <div className="feature-text">
            <h3>{articles[0].title}</h3>
            <span className="small-round">
              <ArrowUpLeft size={18} />
            </span>
          </div>
        </button>
        <div className="news-list">
          {articles.slice(1).map((a) => (
            <button key={a.title} onClick={() => openArticle(a)}>
              <img src={image(a.image)} alt="" loading="lazy" />
              <div>
                <small>{a.tag}</small>
                <h3>{a.title}</h3>
              </div>
              <ArrowUpLeft size={17} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Footer({ open }: { open: OpenDialog }) {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-top">
          <div className="footer-head">
            <span className="footer-mini">
              <i />
              همیشه پاسخگوی شماییم
            </span>
            <h2>
              با <span>آدرین</span> در ارتباط باشید.
            </h2>
          </div>
          <a href="tel:+984172230138" className="footer-phone">
            <div className="phone-icon">
              <Headphones size={26} />
            </div>
            <div>
              <small>صدای مشتری · ۲۴ ساعته</small>
              <b dir="ltr">۰۴۱ - ۷۲۲۳۰۱۳۸</b>
            </div>
            <ArrowUpLeft size={20} />
          </a>
        </div>
        <div className="footer-columns">
          <div className="footer-about">
            <a href="#home" className="footer-logo">
              <img src={image("adrin-logo")} alt="آدرین" />
            </a>
            <p>
              گروه صنعتی عباسپور آدرین
              <br />
              رقابت با برندهای جهانی، با کیفیت ایرانی
            </p>
          </div>
          <div>
            <h3>دسترسی سریع</h3>
            <a href="#collection">گروه‌های محصول</a>
            <a href="#about">درباره آدرین</a>
            <a href="#journal">مجله آدرین</a>
          </div>
          <div>
            <h3>همراه آدرین</h3>
            <button onClick={() => open({ kind: "agency" })}>
              درخواست نمایندگی
            </button>
            <button onClick={() => open({ kind: "faq" })}>سؤالات متداول</button>
            <a href="/adrin-catalog.pdf" download>
              دانلود کاتالوگ
              <Download size={13} />
            </a>
          </div>
          <div className="footer-hours">
            <h3>
              <Clock3 size={15} />
              ساعات کاری مجموعه
            </h3>
            <p>شنبه تا چهارشنبه: ۸ الی ۱۷</p>
            <p>پنجشنبه: ۸ الی ۱۶</p>
            <a
              className="social-link"
              href="https://www.instagram.com/adrin.abbaspour/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={16} />
              <span dir="ltr">adrin.abbaspour</span>
              <MoveUpLeft size={12} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            تمامی حقوق این وب‌سایت متعلق به گروه صنعتی عباسپور آدرین است.
          </span>
          <a href="#home">
            بازگشت به بالا
            <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
