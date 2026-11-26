import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  ChevronDown,
  Download,
  FileCheck2,
  MapPin,
  PhoneCall,
  Search,
  SearchX,
  X,
} from "lucide-react";
import {
  fa,
  image,
  products,
  type Dialog,
  type OpenDialog,
  type Product,
} from "../data";
import { Eyebrow } from "./Sections";

function Shell({
  children,
  close,
  variant = "",
}: {
  children: ReactNode;
  close: () => void;
  variant?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    const focus = document.activeElement as HTMLElement | null;
    el?.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el?.close();
      document.body.style.overflow = before;
      focus?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={"dialog " + variant}
      dir="rtl"
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            close();
        }
      }}
    >
      <button
        className="dialog-close round-button"
        onClick={close}
        aria-label="بستن پنجره"
      >
        <X size={19} />
      </button>
      <div className="dialog-inner">{children}</div>
    </dialog>
  );
}
const normalize = (q: string) =>
  q
    .trim()
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\s‌-]+/g, "");
function ProductSearch({ openProduct }: { openProduct: (p: Product) => void }) {
  const [query, setQuery] = useState("");
  const found = products.filter((p) =>
    normalize(
      p.name + " " + p.category + " " + p.flavor + " " + p.brand,
    ).includes(normalize(query)),
  );
  return (
    <>
      <Eyebrow>FIND YOUR FAVORITE</Eyebrow>
      <h2 id="dialog-title">دنبال چه طعمی می‌گردید؟</h2>
      <label className="search-input">
        <Search size={20} />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="نام محصول، طعم یا گروه محصول..."
          aria-label="جستجوی محصول"
        />
        {query && (
          <button aria-label="پاک کردن جستجو" onClick={() => setQuery("")}>
            <X size={16} />
          </button>
        )}
      </label>
      <div className="search-meta">
        <b>{query ? "نتایج جستجو" : "محصولات آدرین"}</b>
        <span>{fa(found.length)} محصول</span>
      </div>
      <div className="search-results">
        {found.map((p) => (
          <button
            className="search-result"
            key={p.id}
            onClick={() => openProduct(p)}
          >
            <span>
              <img src={image(p.image)} alt="" />
            </span>
            <div>
              <strong>{p.name}</strong>
              <small>
                {p.category} · {p.flavor}
              </small>
            </div>
            <ArrowUpLeft size={17} />
          </button>
        ))}
        {found.length === 0 && (
          <div className="empty-results">
            <SearchX size={34} />
            <h3>محصولی پیدا نشد</h3>
            <p>«آبنبات»، «کاکائویی» یا «میوه‌ای» را جستجو کنید.</p>
            <button className="text-button" onClick={() => setQuery("")}>
              نمایش همه محصولات
              <ArrowLeft size={15} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
const provinces =
  "آذربایجان شرقی،آذربایجان غربی،اردبیل،اصفهان،البرز،ایلام،بوشهر،تهران،چهارمحال و بختیاری،خراسان جنوبی،خراسان رضوی،خراسان شمالی،خوزستان،زنجان،سمنان،سیستان و بلوچستان،فارس،قزوین،قم،کردستان،کرمان،کرمانشاه،کهگیلویه و بویراحمد،گلستان،گیلان،لرستان،مازندران،مرکزی،هرمزگان،همدان،یزد".split(
    "،",
  );
function AgencyForm() {
  const [ready, setReady] = useState(false);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    province: "",
    business: "",
    note: "",
  });
  const [error, setError] = useState("");
  const field = (key: keyof typeof values, value: string) =>
    setValues({ ...values, [key]: value });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const phone = values.phone
      .replace(/[۰-۹]/g, (n) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(n)))
      .replace(/[٠-٩]/g, (n) => String("٠١٢٣٤٥٦٧٨٩".indexOf(n)))
      .replace(/[\s-]/g, "");
    if (!/^09\d{9}$/.test(phone)) {
      setError("شماره همراه را با ۰۹ و در ۱۱ رقم وارد کنید.");
      return;
    }
    if (!values.name.trim() || !values.business.trim()) {
      setError("نام و نام مجموعه را کامل وارد کنید.");
      return;
    }
    setError("");
    setReady(true);
  };
  const download = () => {
    const text = `فرم درخواست نمایندگی گروه صنعتی عباسپور آدرین\n\nنام متقاضی: ${values.name}\nشماره همراه: ${values.phone}\nاستان: ${values.province}\nنام مجموعه: ${values.business}\nتوضیحات: ${values.note || "—"}\n\nتاریخ تهیه: ${new Date().toLocaleDateString("fa-IR")}\nبرای هماهنگی ارسال و بررسی فرم با واحد نمایندگی تماس بگیرید: ۰۴۱-۷۲۲۳۰۱۳۸`;
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + text], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "درخواست-نمایندگی-آدرین.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
  if (ready)
    return (
      <div className="agency-success">
        <div className="success-mark">
          <FileCheck2 size={36} />
        </div>
        <Eyebrow>YOUR APPLICATION</Eyebrow>
        <h2 id="dialog-title">فرم درخواست شما آماده است.</h2>
        <p>
          {values.name} عزیز، نسخه فرم خود را دریافت کنید و برای ارسال آن و
          بررسی شرایط همکاری با واحد نمایندگی تماس بگیرید.
        </p>
        <dl className="detail-table">
          <div>
            <dt>نام مجموعه</dt>
            <dd>{values.business}</dd>
          </div>
          <div>
            <dt>استان</dt>
            <dd>{values.province}</dd>
          </div>
          <div>
            <dt>شماره تماس</dt>
            <dd dir="ltr">{values.phone}</dd>
          </div>
        </dl>
        <div className="modal-actions">
          <button className="button button-dark" onClick={download}>
            <Download size={16} />
            دریافت فرم درخواست
          </button>
          <a className="button button-peach" href="tel:+984172230138">
            <PhoneCall size={15} />
            تماس با آدرین
          </a>
        </div>
        <p className="form-note">فرم هنوز برای واحد نمایندگی ارسال نشده است.</p>
        <button className="link-underline" onClick={() => setReady(false)}>
          ویرایش اطلاعات
        </button>
      </div>
    );
  return (
    <>
      <Eyebrow>GROW WITH ADRIN</Eyebrow>
      <h2 id="dialog-title">به خانواده آدرین بپیوندید.</h2>
      <p className="dialog-intro">
        برای درخواست نمایندگی، فرم زیر را تکمیل کنید. سپس نسخه درخواست را برای
        ارائه به واحد فروش دریافت کنید.
      </p>
      <form className="agency-form" onSubmit={submit}>
        <div className="form-row">
          <label>
            نام و نام خانوادگی
            <input
              required
              autoComplete="name"
              minLength={3}
              maxLength={70}
              value={values.name}
              onChange={(e) => field("name", e.target.value)}
              placeholder="نام کامل شما"
            />
          </label>
          <label>
            شماره همراه
            <input
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={15}
              dir="ltr"
              value={values.phone}
              onChange={(e) => field("phone", e.target.value)}
              placeholder="09xxxxxxxxx"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            استان فعالیت
            <select
              required
              value={values.province}
              onChange={(e) => field("province", e.target.value)}
            >
              <option value="">انتخاب استان</option>
              {provinces.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label>
            نام فروشگاه یا مجموعه
            <input
              required
              value={values.business}
              maxLength={100}
              onChange={(e) => field("business", e.target.value)}
              placeholder="نام مجموعه"
            />
          </label>
        </div>
        <label>
          توضیحات <small>اختیاری</small>
          <textarea
            rows={3}
            maxLength={1000}
            value={values.note}
            onChange={(e) => field("note", e.target.value)}
            placeholder="کمی درباره زمینه فعالیت خود بنویسید..."
          />
        </label>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <button className="button button-dark" type="submit">
          آماده‌سازی فرم درخواست
          <ArrowLeft size={16} />
        </button>
        <p className="form-note">
          اطلاعات این فرم فقط در همین مرورگر پردازش می‌شود.
        </p>
      </form>
    </>
  );
}
const faq = [
  [
    "از کجا می‌توانم محصولات آدرین را ببینم؟",
    "در بخش «محصولات» می‌توانید مجموعه آدرین را بر اساس گروه محصول مرور کنید. با انتخاب هر محصول، طعم، مشخصات و توضیحات آن نمایش داده می‌شود.",
  ],
  [
    "چطور کاتالوگ محصولات را دانلود کنم؟",
    "دکمه «دانلود کاتالوگ» در ابتدای صفحه، فایل PDF معرفی محصولات آدرین را در اختیار شما قرار می‌دهد. این فایل برای مشاهده آفلاین و چاپ نیز مناسب است.",
  ],
  [
    "چگونه می‌توانم نماینده فروش آدرین شوم؟",
    "فرم «درخواست نمایندگی» را تکمیل و نسخه آن را دریافت کنید. برای هماهنگی ارسال فرم و بررسی شرایط همکاری، با شماره \u2066۰۴۱-۷۲۲۳۰۱۳۸\u2069 تماس بگیرید.",
  ],
  [
    "چطور نزدیک‌ترین نمایندگی را پیدا کنم؟",
    "از قسمت «شعب و نمایندگی‌ها» به فهرست رسمی شعب مراجعه کنید یا با صدای مشتری آدرین تماس بگیرید و نام استان و شهر خود را اعلام کنید.",
  ],
  [
    "ساعات کاری مجموعه چه زمانی است؟",
    "ساعات کاری مجموعه از شنبه تا چهارشنبه ۸ تا ۱۷ و پنجشنبه ۸ تا ۱۶ است. خط صدای مشتری به‌صورت ۲۴ ساعته در دسترس است.",
  ],
];
export function Dialogs({
  dialog,
  setDialog,
  openProduct,
}: {
  dialog: Dialog;
  setDialog: OpenDialog;
  openProduct: (p: Product) => void;
}) {
  if (!dialog) return null;
  let content: ReactNode;
  if (dialog.kind === "search")
    content = <ProductSearch openProduct={openProduct} />;
  else if (dialog.kind === "agency") content = <AgencyForm />;
  else if (dialog.kind === "product") {
    const p = dialog.product;
    content = (
      <>
        <Eyebrow>ADRIN PRODUCT COLLECTION</Eyebrow>
        <div className="detail-hero">
          <span dir="ltr">{p.brand}</span>
          <img src={image(p.image)} alt={p.name} />
        </div>
        <div className="detail-category">{p.category}</div>
        <h2 id="dialog-title">{p.name}</h2>
        <p className="dialog-intro">{p.desc}</p>
        <dl className="detail-table">
          <div>
            <dt>گروه محصول</dt>
            <dd>{p.category}</dd>
          </div>
          <div>
            <dt>طعم</dt>
            <dd>{p.flavor}</dd>
          </div>
          {p.weight && (
            <div>
              <dt>وزن بسته‌بندی</dt>
              <dd>{p.weight}</dd>
            </div>
          )}
        </dl>
        <div className="modal-actions">
          <a className="button button-dark" download href="/adrin-catalog.pdf">
            <Download size={16} />
            دریافت کاتالوگ
          </a>
          <button
            className="button button-peach"
            onClick={() => setDialog({ kind: "search" })}
          >
            سایر محصولات
            <ArrowLeft size={16} />
          </button>
        </div>
      </>
    );
  } else if (dialog.kind === "faq")
    content = (
      <>
        <Eyebrow>GOOD TO KNOW</Eyebrow>
        <h2 id="dialog-title">سؤالات متداول</h2>
        <p className="dialog-intro">پاسخ پرسش‌های رایج همراهان آدرین</p>
        <div className="faq-list">
          {faq.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>
                {q}
                <ChevronDown size={16} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <a href="tel:+984172230138" className="contact-strip">
          <PhoneCall size={18} />
          پرسش دیگری دارید؟ <b dir="ltr">۰۴۱-۷۲۲۳۰۱۳۸</b>
        </a>
      </>
    );
  else if (dialog.kind === "branches")
    content = (
      <>
        <Eyebrow>OUR DISTRIBUTION NETWORK</Eyebrow>
        <h2 id="dialog-title">شعب و نمایندگی‌های آدرین</h2>
        <p className="dialog-intro">
          برای تهیه محصولات و ارتباط با نزدیک‌ترین نماینده فروش، از شبکه توزیع
          آدرین کمک بگیرید.
        </p>
        <div className="address-card">
          <MapPin size={24} />
          <div>
            <h3>فروشگاه آدرین · تبریز</h3>
            <p>میدان جهاد، خیابان ۲۲ بهمن، روبه‌روی سیلو</p>
          </div>
        </div>
        <a
          className="directory-link"
          href="https://abbaspour.com/en/branches"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <b>فهرست رسمی شعب و نمایندگی‌ها</b>
            <small>مشاهده اطلاعات تماس در وب‌سایت گروه عباسپور</small>
          </div>
          <ArrowUpLeft size={20} />
        </a>
        <a href="tel:+984172230138" className="contact-strip">
          <PhoneCall size={17} />
          راهنمای نمایندگی‌ها<b dir="ltr">۰۴۱-۷۲۲۳۰۱۳۸</b>
        </a>
        <button
          className="button button-dark"
          onClick={() => setDialog({ kind: "agency" })}
        >
          درخواست نمایندگی
          <ArrowLeft size={16} />
        </button>
      </>
    );
  else if (dialog.kind === "story")
    content = (
      <>
        <Eyebrow>ROOTED IN TABRIZ · SINCE 1956</Eyebrow>
        <h2 id="dialog-title">داستان گروه صنعتی عباسپور آدرین</h2>
        <div className="history-photos">
          <img src={image("factory")} alt="مجموعه صنعتی آدرین" />
          <img src={image("heritage")} alt="آرشیو کارخانه عباسپور" />
        </div>
        <div className="story-prose">
          <h3>از تافی عباسپور تا خانواده آدرین</h3>
          <p>
            در سال ۱۳۳۵، حاج علی‌اکبر عباسپور فعالیت این مجموعه را با نام «تافی
            عباسپور» در شهر تبریز آغاز کرد. این شروع ساده، پایه‌گذار داستانی شد
            که با طعم‌های خاطره‌انگیز ادامه پیدا کرد.
          </p>
          <p>
            در سال ۱۳۹۰ مجموعه با نام «گروه صنعتی عباسپور آدرین» به مسیر خود
            ادامه داد. امروز کیک، ویفر، بیسکویت، شکلات و آبنبات‌های آدرین در
            کنار دیگر اعضای خانواده محصولات ما قرار دارند.
          </p>
          <h3>کیفیت ایرانی، نگاه جهانی</h3>
          <p>
            رضایت مشتریان، پایش مداوم کیفیت محصولات و تحویل به‌موقع، در مرکز
            خط‌مشی آدرین قرار دارد. این همان تعهدی است که از نخستین روز، همراه
            ما بوده است.
          </p>
        </div>
      </>
    );
  else if (dialog.kind === "article") {
    const a = dialog.article;
    content = (
      <>
        <Eyebrow>ADRIN JOURNAL</Eyebrow>
        <img className="article-cover" src={image(a.image)} alt={a.title} />
        <span className="detail-category">{a.tag}</span>
        <h2 id="dialog-title" className="article-title">
          {a.title}
        </h2>
        <div className="story-prose">
          {a.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="article-signature">
          <img src={image("adrin-logo")} alt="" />
          روابط عمومی گروه صنعتی عباسپور آدرین
        </div>
      </>
    );
  }
  return (
    <Shell
      key={dialog.kind}
      close={() => setDialog(null)}
      variant={"dialog-" + dialog.kind}
    >
      {content}
    </Shell>
  );
}
