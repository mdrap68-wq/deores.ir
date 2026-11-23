import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpLeft,
  Award,
  BadgeCheck,
  ChevronDown,
  Download,
  Globe2,
  Handshake,
  Menu,
  PhoneCall,
  Search,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { categories, image, type OpenDialog } from "../data";

export function Header({
  open,
  active,
  browse,
}: {
  open: OpenDialog;
  active: string;
  browse: (category?: string) => void;
}) {
  const [menu, setMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const outside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setDropdown(false);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdown(false);
        setMenu(false);
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  const close = () => {
    setMenu(false);
    setDropdown(false);
  };
  return (
    <header className="header">
      <div className="utility">
        <div className="container utility-inner">
          <div className="utility-links">
            <span className="group-label">
              <i className="status-dot" />
              گروه صنعتی عباسپور آدرین
            </span>
            <span className="hairline" />
            <button onClick={() => open({ kind: "branches" })}>
              شعب و نمایندگی‌ها
            </button>
            <button onClick={() => open({ kind: "faq" })}>سؤالات متداول</button>
          </div>
          <div className="utility-contact">
            <a href="tel:+984172230138">
              <PhoneCall size={13} />
              <span>صدای مشتری</span>
              <b dir="ltr">۰۴۱ - ۷۲۲۳۰۱۳۸</b>
            </a>
            <span className="hairline" />
            <span className="language">
              <i className="iran-flag" />
              فارسی
            </span>
          </div>
        </div>
      </div>
      <div className="container main-nav">
        <a
          href="#home"
          className="brand"
          aria-label="آدرین، صفحه نخست"
          onClick={close}
        >
          <img src={image("adrin-logo")} alt="نشان گروه صنعتی آدرین" />
          <span>
            <strong>گروه صنعتی عباسپور</strong>
            <small>ABBASPOUR INDUSTRIAL GROUP</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="ناوبری اصلی">
          <a className={active === "home" ? "active" : ""} href="#home">
            صفحه نخست
          </a>
          <div className="nav-products" ref={ref}>
            <button
              aria-expanded={dropdown}
              aria-controls="product-menu"
              className={
                ["products", "collection"].includes(active) ? "active" : ""
              }
              onClick={() => setDropdown(!dropdown)}
            >
              محصولات
              <ChevronDown size={13} className={dropdown ? "turned" : ""} />
            </button>
            {dropdown && (
              <div className="product-dropdown" id="product-menu">
                <small>دنیای محصولات آدرین</small>
                {categories.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      browse(c.name);
                      close();
                    }}
                  >
                    <img src={image(c.image)} alt="" />
                    {c.name}
                    <ArrowLeft size={14} />
                  </button>
                ))}
                <button
                  className="all-dropdown"
                  onClick={() => {
                    browse();
                    close();
                  }}
                >
                  مشاهده همه محصولات
                  <ArrowLeft size={14} />
                </button>
              </div>
            )}
          </div>
          <a className={active === "about" ? "active" : ""} href="#about">
            درباره آدرین
          </a>
          <a className={active === "journal" ? "active" : ""} href="#journal">
            مجله آدرین
          </a>
          <a href="#contact">تماس با ما</a>
        </nav>
        <div className="nav-actions">
          <button
            className="round-button"
            aria-label="جستجو در محصولات"
            onClick={() => open({ kind: "search" })}
          >
            <Search size={19} />
          </button>
          <button
            className="agency-button"
            onClick={() => open({ kind: "agency" })}
          >
            درخواست نمایندگی
            <ArrowUpLeft size={17} />
          </button>
          <button
            className="mobile-menu-button round-button"
            aria-label={menu ? "بستن منو" : "باز کردن منو"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {menu && (
        <nav className="mobile-nav" aria-label="منوی موبایل">
          {[
            ["صفحه نخست", "home"],
            ["محصولات", "collection"],
            ["درباره آدرین", "about"],
            ["مجله آدرین", "journal"],
            ["تماس با ما", "contact"],
          ].map(([text, id]) => (
            <a key={id} href={"#" + id} onClick={close}>
              {text}
              <ArrowDownLeft size={15} />
            </a>
          ))}
          <button
            onClick={() => {
              close();
              open({ kind: "agency" });
            }}
          >
            درخواست نمایندگی
            <Handshake size={17} />
          </button>
        </nav>
      )}
    </header>
  );
}

function HeroBackground() {
  return (
    <svg
      className="hero-background"
      viewBox="0 0 1240 530"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroOrange" x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#ff823c" />
          <stop offset=".52" stopColor="#f97834" />
          <stop offset="1" stopColor="#ed6429" />
        </linearGradient>
        <clipPath id="heroShape">
          <path d="M0 144Q0 96 48 96H452Q500 96 500 54V49Q500 0 549 0H1190Q1240 0 1240 50V355Q1240 403 1192 403H724Q680 403 680 448V481Q680 530 632 530H48Q0 530 0 482Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#heroShape)">
        <rect width="1240" height="530" fill="url(#heroOrange)" />
        <g fill="none" stroke="#ffd5a7" strokeWidth="1.5" opacity=".14">
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d={`M${900 + i * 36} -130 C${780 + i * 32} 10 ${1390 + i * 31} 5 ${1170 + i * 29} 198 S${1030 + i * 46} 460 ${1415 + i * 22} 470`}
            />
          ))}
        </g>
        <g fill="none" stroke="#d9551d" opacity=".18" strokeWidth="1.4">
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              d={`M${-90 + i * 24} 95 C${180 + i * 12} 180 ${-140 + i * 20} 270 ${85 + i * 23} 445 S${270 + i * 30} 560 ${380 + i * 24} 630`}
            />
          ))}
        </g>
        <g fill="none" stroke="#fff" strokeWidth="2" opacity=".32">
          <path d="M579 166q0 13-12 16 13 0 16 12 1-14 12-17-12 0-16-11Z" />
          <path d="M104 364q0 8-8 11 9 0 12 8-1-8 7-12-8 1-11-7Z" />
          <circle cx="653" cy="69" r="4" />
          <circle cx="1097" cy="365" r="4" />
        </g>
      </g>
    </svg>
  );
}
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroBackground />
      <div className="hero-edition" dir="ltr">
        <span />
        SWEET MOMENTS <b>✳</b> SINCE 1956
      </div>
      <div className="hero-image-wrap">
        <img
          className="hero-person"
          src={image("hero-woman")}
          alt="لحظه‌ای شیرین با ویفر کاکائویی سی‌سی‌کام آدرین"
          fetchPriority="high"
        />
      </div>
      <img className="floating-chocolate" src={image("chocolate")} alt="" />
      <img className="floating-candy" src={image("candy")} alt="" />
      <div className="hero-copy">
        <span className="export-badge">
          <BadgeCheck size={16} /> صادرکننده نمونه ملی
        </span>
        <h1 id="hero-title">
          دنیایی از طعم،
          <br />
          <span>
            برای لحظه‌های{" "}
            <em>
              شیرین
              <svg
                viewBox="0 0 150 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M3 7Q62 -1 148 6Q81 4 8 11Z" fill="currentColor" />
              </svg>
            </em>
          </span>
        </h1>
        <p>از دلِ تبریز، همراه لحظه‌های خوش شما.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#collection">
            کشف محصولات
            <ArrowLeft size={17} />
          </a>
          <a
            className="button button-white"
            href="/adrin-catalog.pdf"
            download="کاتالوگ-محصولات-آدرین.pdf"
          >
            <Download size={16} />
            دانلود کاتالوگ
          </a>
        </div>
      </div>
      <a
        href="#collection"
        className="variety-card"
        aria-label="کشف ۲۶ گروه محصول آدرین"
      >
        <div className="variety-art">
          <img className="pop-one" src={image("lollipop")} alt="" />
          <img className="pop-two" src={image("lollipop")} alt="" />
          <img className="small-candy" src={image("candy")} alt="" />
        </div>
        <div className="variety-copy">
          <span className="script-text" dir="ltr">
            Sweet variety!
          </span>
          <div>
            <strong dir="ltr">
              ۲۶<span>+</span>
            </strong>
            <b>گروه محصول</b>
          </div>
        </div>
        <ArrowUpLeft className="variety-arrow" size={17} />
      </a>
      <a
        className="circle-stamp"
        href="#collection"
        aria-label="ادامه و مشاهده گروه‌های محصول"
      >
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path
              id="stampPath"
              d="M50,50m-38,0a38,38 0 1,1 76,0a38,38 0 1,1 -76,0"
            />
          </defs>
          <text>
            <textPath href="#stampPath" textLength="236">
              ABBASPOUR GROUP • SINCE 1956 •{" "}
            </textPath>
          </text>
        </svg>
        <span>
          <ArrowDown size={25} strokeWidth={1.6} />
        </span>
      </a>
    </section>
  );
}
export function Overview() {
  return (
    <section className="overview" aria-label="آدرین در یک نگاه">
      <div className="overview-brand">
        <div className="overview-small">
          <i />
          ADRIN IN NUMBERS
        </div>
        <h2>
          <span>آدرین</span> در یک نگاه
        </h2>
        <Sparkles className="stats-spark" size={29} strokeWidth={1} />
        <div className="brand-rings" />
      </div>
      {[
        { n: "۷۰", label: "سال تجربه شیرین", icon: Award },
        { n: "۳۰", label: "مقصد صادراتی", icon: Globe2 },
        { n: "۳۷۰۰", label: "نیروی متخصص", icon: UsersRound },
      ].map(({ n, label, icon: Icon }) => (
        <div className="stat-card" key={label}>
          <div className="stat-icon">
            <Icon size={24} strokeWidth={1.45} />
          </div>
          <div className="stat-info">
            <strong dir="ltr">
              {n}
              <span>+</span>
            </strong>
            <p>{label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
