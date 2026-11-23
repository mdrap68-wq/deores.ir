import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./lib/gsap";
import { setLenis } from "./lib/scroll";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import MenuSection from "./components/Menu";
import Signature from "./components/Signature";
import Delivery from "./components/Delivery";
import Locations from "./components/Locations";
import Manifesto from "./components/Manifesto";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ————— Lenis smooth scroll —————
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
      touchMultiplier: 1.4,
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    // ————— global reveal + parallax system —————
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 46, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              ease: "power3.out",
              delay: parseFloat(el.dataset.delay || "0"),
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-img]").forEach((el) => {
          const img = el.querySelector("img");
          gsap.fromTo(
            el,
            { clipPath: "inset(6% 4% 92% 4%)", autoAlpha: 0.4 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              autoAlpha: 1,
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: { trigger: el, start: "top 86%", once: true },
            }
          );
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.18 },
              {
                scale: 1,
                duration: 1.6,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 86%", once: true },
              }
            );
          }
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const v = parseFloat(el.dataset.parallax || "0.1");
          gsap.fromTo(
            el,
            { yPercent: v * 55 },
            {
              yPercent: -v * 55,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("section") || el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        });
      }
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <CartProvider>
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-acid focus:px-5 focus:py-3 focus:text-sm focus:font-extrabold focus:text-ink"
      >
        برو به منو
      </a>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <MenuSection />
        <Signature />
        <Delivery />
        <Locations />
        <Manifesto />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
