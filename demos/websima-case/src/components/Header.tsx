import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Btn, Logo } from "./ui";

const links = [
  { label: "خانه", href: "#top" },
  { label: "نمونه‌کارها", href: "#portfolio" },
  { label: "خدمات", href: "#services" },
  { label: "مسیر همکاری", href: "#journey" },
  { label: "چرا وب‌سیما", href: "#why" },
  { label: "سوالات متداول", href: "#faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-char px-4 py-2.5 shadow-2xl shadow-black/20 md:px-6">
        <Logo light />
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="tel:+989965442168" className="hidden items-center gap-2 px-3 text-sm font-bold text-white/80 hover:text-brand md:flex" dir="ltr">
            <Phone className="h-4 w-4 text-brand" /> 0996 544 2168
          </a>
          <Btn className="hidden !px-5 !py-2.5 sm:inline-flex">درخواست مشاوره رایگان</Btn>
          <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white lg:hidden" aria-label="منو">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl bg-char p-4 shadow-2xl lg:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-medium text-white/80 hover:bg-white/10">
              {l.label}
            </a>
          ))}
          <Btn className="mt-3 w-full">درخواست مشاوره رایگان</Btn>
        </div>
      )}
    </header>
  );
}
