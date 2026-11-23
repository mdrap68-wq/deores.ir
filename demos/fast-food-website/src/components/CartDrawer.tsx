import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { gsap } from "../lib/gsap";
import { useCart } from "../context/CartContext";
import { faDigits, faIndex, toLatin, toman } from "../lib/format";
import { FREE_DELIVERY_FROM } from "../data/menu";
import { getLenis } from "../lib/scroll";
import { X, Plus, Minus, Trash2, ArrowRight, ArrowLeft, ShoppingBag, Bike, Store, Check, Receipt } from "lucide-react";

type Step = "cart" | "details" | "done";

export default function CartDrawer() {
  const cart = useCart();
  const { isOpen, closeCart, lines, subtotal, deliveryFee, total, count, orderType, setOrderType, inc, dec, remove, clear } = cart;

  const [step, setStep] = useState<Step>("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderCode, setOrderCode] = useState("");

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const remainingForFree = Math.max(0, FREE_DELIVERY_FROM - subtotal);

  // park the panel offscreen before first paint (never via inline style,
  // so GSAP xPercent stays in full control of the transform)
  useLayoutEffect(() => {
    if (panelRef.current) gsap.set(panelRef.current, { xPercent: -105 });
  }, []);

  // ——— open / close animation
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    if (isOpen) {
      if (step === "done") setStep("cart");
      getLenis()?.stop();
      gsap.to(overlay, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(panel, { xPercent: -104 }, { xPercent: 0, duration: 0.6, ease: "power4.out" });
    } else {
      getLenis()?.start();
      gsap.to(overlay, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(panel, { xPercent: -104, duration: 0.45, ease: "power3.in" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  // success check pop
  useEffect(() => {
    if (step === "done") {
      gsap.fromTo(
        ".done-check",
        { scale: 0, rotation: -30 },
        { scale: 1, rotation: 0, duration: 0.7, ease: "back.out(2.2)", delay: 0.15 }
      );
    }
  }, [step]);

  // ——— step transitions
  const goStep = (s: Step, dir: 1 | -1 = 1) => {
    const el = stepsRef.current;
    setStep(s);
    if (!el) return;
    gsap.fromTo(
      el,
      { xPercent: dir * 6, autoAlpha: 0 },
      { xPercent: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out", delay: 0.05 }
    );
  };

  // ——— line remove animation
  const handleRemove = (id: string, el: HTMLElement) => {
    gsap.to(el, {
      xPercent: 18,
      autoAlpha: 0,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => remove(id),
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    const p = toLatin(phone).replace(/\s/g, "");
    if (name.trim().length < 3) e.name = "اسمت رو کامل بنویس لطفاً";
    if (!/^09\d{9}$/.test(p)) e.phone = "شماره موبایل درست نیست (مثلاً ۰۹۱۲۱۲۳۴۵۶۷)";
    if (orderType === "delivery" && address.trim().length < 10)
      e.address = "آدرس کامل‌تر؛ مثلاً: تهران، سعادت‌آباد، بلوار دریا، پلاک ۲۴";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    setOrderCode(`بایت-${faDigits(Math.floor(1000 + Math.random() * 9000))}`);
    clear();
    goStep("done");
  };

  const stepTitle = useMemo(
    () => (step === "cart" ? "سبد خرید" : step === "details" ? "اطلاعات سفارش" : "ثبت شد!"),
    [step]
  );

  return (
    <div className={`fixed inset-0 z-[70] ${isOpen ? "" : "pointer-events-none"}`} role="dialog" aria-modal="true" aria-label="سبد خرید">
      {/* overlay */}
      <div
        ref={overlayRef}
        onClick={closeCart}
        className="invisible absolute inset-0 bg-ink/65 opacity-0 backdrop-blur-[2px]"
      />
      {/* panel */}
      <aside
        ref={panelRef}
        className="absolute inset-y-0 left-0 flex w-full max-w-[440px] flex-col bg-paper text-ink shadow-[-30px_0_80px_rgba(0,0,0,0.4)]"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-4 sm:px-6 sm:py-5 pt-[max(1rem,env(safe-area-inset-top))]">
          <div className="flex items-baseline gap-2.5">
            <h2 className="text-xl font-black tracking-tight">{stepTitle}</h2>
            {step === "cart" && count > 0 && (
              <span className="tabular-fa text-xs font-bold text-wine">{faDigits(count)} قلم</span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="بستن سبد"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <div ref={stepsRef} className="flex min-h-0 flex-1 flex-col">
          {/* ============================ CART STEP ============================ */}
          {step === "cart" && (
            <>
              {lines.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-ink/10">
                    <ShoppingBag className="h-8 w-8 text-clay" strokeWidth={1.5} />
                  </span>
                  <p className="text-lg font-extrabold">سبدت خالیه!</p>
                  <p className="max-w-56 text-sm leading-7 text-clay">
                    گریل سرده و کسی عصبانی نیست… هنوز. یه چیزی انتخاب کن.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 rounded-full bg-ink px-7 py-3 text-sm font-extrabold text-paper transition-transform hover:scale-105"
                  >
                    برگرد به منو
                  </button>
                </div>
              ) : (
                <>
                  {/* order type */}
                  <div className="border-b border-ink/10 px-6 py-4">
                    <div className="grid grid-cols-2 gap-1 rounded-full border border-ink/15 p-1">
                      {(
                        [
                          { id: "delivery", label: "ارسال", icon: Bike },
                          { id: "pickup", label: "تحویل حضوری", icon: Store },
                        ] as const
                      ).map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setOrderType(t.id)}
                          aria-pressed={orderType === t.id}
                          className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-extrabold transition-all duration-300 ${
                            orderType === t.id ? "bg-ink text-paper" : "text-clay hover:text-ink"
                          }`}
                        >
                          <t.icon className="h-4 w-4" />
                          {t.label}
                        </button>
                      ))}
                    </div>
                    {orderType === "delivery" && (
                      <div className="mt-3">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className="text-clay">
                            {remainingForFree > 0
                              ? `${toman(remainingForFree)} تا ارسال رایگان`
                              : "ارسالت رایگان شد!"}
                          </span>
                          <span className="tabular-fa text-wine">{faDigits(Math.min(100, Math.round((subtotal / FREE_DELIVERY_FROM) * 100)))}٪</span>
                        </div>
                        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink/10">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${remainingForFree > 0 ? "bg-wine" : "bg-acid"}`}
                            style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_FROM) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* lines */}
                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6">
                    {lines.map((l, i) => (
                      <div key={l.item.id} className="flex gap-4 border-b border-ink/10 py-4 last:border-0">
                        {l.item.img ? (
                          <img src={l.item.img} alt={l.item.name} loading="lazy" className="h-16 w-16 shrink-0 rounded-xl border border-ink/10 object-cover" />
                        ) : (
                          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-wine/10 text-[10px] font-black text-wine">
                            سس
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="truncate text-sm font-extrabold">{l.item.name}</h3>
                            <span className="tabular-fa shrink-0 text-sm font-black">{toman(l.item.price * l.qty)}</span>
                          </div>
                          <p className="tabular-fa mt-0.5 text-[11px] font-semibold text-clay">
                            {toman(l.item.price)} × {faDigits(l.qty)}
                          </p>
                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full border border-ink/15">
                              <button onClick={() => inc(l.item.id)} aria-label="افزایش تعداد" className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-ink hover:text-paper">
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                              <span className="tabular-fa w-6 text-center text-sm font-extrabold">{faDigits(l.qty)}</span>
                              <button onClick={() => dec(l.item.id)} aria-label="کاهش تعداد" className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-ink hover:text-paper">
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={(e) => handleRemove(l.item.id, (e.currentTarget as HTMLElement).closest("div.flex.gap-4") as HTMLElement)}
                              aria-label={`حذف ${l.item.name}`}
                              className="flex items-center gap-1 text-[11px] font-bold text-clay transition-colors hover:text-wine"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              حذف
                            </button>
                          </div>
                        </div>
                        <span className="tabular-fa sr-only">{faIndex(i + 1)}</span>
                      </div>
                    ))}
                  </div>

                  {/* summary */}
                  <div className="border-t border-ink/10 bg-cream/60 px-6 py-5">
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between font-semibold text-clay">
                        <dt>جمع اقلام</dt>
                        <dd className="tabular-fa text-ink">{toman(subtotal)}</dd>
                      </div>
                      <div className="flex justify-between font-semibold text-clay">
                        <dt>{orderType === "delivery" ? "هزینه ارسال" : "تحویل حضوری"}</dt>
                        <dd className="tabular-fa text-ink">
                          {orderType === "pickup" ? "رایگان" : deliveryFee === 0 ? (
                            <span className="rounded-full bg-acid px-2.5 py-0.5 text-[11px] font-extrabold text-ink">رایگان</span>
                          ) : (
                            toman(deliveryFee)
                          )}
                        </dd>
                      </div>
                      <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-black">
                        <dt>مبلغ نهایی</dt>
                        <dd className="tabular-fa">{toman(total)}</dd>
                      </div>
                    </dl>
                    <button
                      onClick={() => goStep("details")}
                      className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-extrabold text-paper transition-transform hover:scale-[1.02] active:scale-95"
                    >
                      ادامه سفارش
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* ============================ DETAILS STEP ============================ */}
          {step === "details" && (
            <>
              <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-6 py-6">
                <Field
                  label="نام و نام خانوادگی"
                  error={errors.name}
                  input={
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثلاً سارا محمدی"
                      className={inputCls(!!errors.name)}
                      autoComplete="name"
                    />
                  }
                />
                <Field
                  label="شماره موبایل"
                  error={errors.phone}
                  input={
                    <input
                      value={phone}
                      onChange={(e) => setPhone(faDigits(toLatin(e.target.value).replace(/[^\d]/g, "").slice(0, 11)))}
                      placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                      inputMode="numeric"
                      className={`${inputCls(!!errors.phone)} tabular-fa text-start`}
                      style={{ direction: "ltr", textAlign: "right" }}
                      autoComplete="tel"
                      aria-label="شماره موبایل، یازده رقم"
                    />
                  }
                />
                {orderType === "delivery" ? (
                  <Field
                    label="آدرس تحویل"
                    error={errors.address}
                    input={
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="تهران، سعادت‌آباد، بلوار دریا، پلاک ۲۴"
                        rows={3}
                        className={`${inputCls(!!errors.address)} resize-none`}
                      />
                    }
                  />
                ) : (
                  <div className="rounded-2xl border border-ink/15 bg-cream/70 p-4 text-sm leading-7 text-clay">
                    <span className="font-extrabold text-ink">شعبه تحویل: </span>
                    سعادت‌آباد، بلوار دریا، پلاک ۲۴ — سفارشت برای تحویل حضوری همین‌جا آماده میشه.
                  </div>
                )}
                <Field
                  label="یادداشت (اختیاری)"
                  input={
                    <input
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="مثلاً سس اضافه کم، زنگ نزن در رو باز کن"
                      className={inputCls(false)}
                    />
                  }
                />
              </div>
              <div className="border-t border-ink/10 bg-cream/60 px-6 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 font-semibold text-clay">
                    <Receipt className="h-4 w-4" />
                    مبلغ قابل پرداخت
                  </span>
                  <span className="tabular-fa text-lg font-black">{toman(total)}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => goStep("cart", -1)}
                    aria-label="برگشت به سبد"
                    className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper"
                  >
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={submit}
                    className="flex-1 rounded-full bg-acid py-4 text-sm font-extrabold text-ink transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    ثبت سفارش و پرداخت آنلاین
                  </button>
                </div>
                <p className="mt-3 text-center text-[11px] font-semibold text-clay">
                  پرداخت از درگاه امن بانکی انجام میشه
                </p>
              </div>
            </>
          )}

          {/* ============================ DONE STEP ============================ */}
          {step === "done" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 py-10 text-center">
              <span className="done-check flex h-20 w-20 items-center justify-center rounded-full bg-acid">
                <Check className="h-9 w-9 text-ink" strokeWidth={3} />
              </span>
              <div>
                <p className="text-2xl font-black">سفارشت ثبت شد!</p>
                <p className="mt-2 text-sm leading-7 text-clay">
                  {orderType === "delivery"
                    ? "تا ۲۵ دقیقه دیگه داغ‌و‌تازه در خونه‌ته."
                    : "۱۵ دقیقه دیگه سر شعبه آماده‌ست. گشنت بیا ببر!"}
                </p>
              </div>
              <div className="rounded-2xl border border-dashed border-ink/25 px-8 py-4">
                <p className="mb-1 text-[11px] font-bold text-clay">کد پیگیری</p>
                <p className="tabular-fa text-2xl font-black text-wine">{orderCode}</p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 rounded-full bg-ink px-9 py-3.5 text-sm font-extrabold text-paper transition-transform hover:scale-105"
              >
                برگرد به منو
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function Field({ label, error, input }: { label: string; error?: string; input: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-extrabold text-ink">{label}</span>
      {input}
      {error && <span className="mt-1.5 block text-[11px] font-bold text-wine">{error}</span>}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-2xl border bg-transparent px-4 py-3.5 text-sm font-semibold text-ink placeholder:font-medium placeholder:text-clay/70 transition-colors focus:outline-none ${
    hasError ? "border-wine" : "border-ink/15 focus:border-ink"
  }`;
}
