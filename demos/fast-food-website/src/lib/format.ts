const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Convert latin digits inside any string/number to Persian digits */
export function faDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/** Convert Persian/Arabic digits back to latin (for validation) */
export function toLatin(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

/** 395000 -> "۳۹۵٬۰۰۰" */
export function faNumber(n: number): string {
  return new Intl.NumberFormat("fa-IR").format(n);
}

/** 395000 -> "۳۹۵٬۰۰۰ تومان" */
export function toman(n: number): string {
  return `${faNumber(n)} تومان`;
}

/** zero-padded persian index: 1 -> "۰۱" */
export function faIndex(i: number): string {
  return faDigits(String(i).padStart(2, "0"));
}
