import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header, Rail } from "./components/Chrome";
import Work from "./components/Work";
import { About, Contact } from "./components/Rest";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const root = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="relative min-h-screen bg-paper pl-[22px] md:pl-14">
      <Rail />
      <Header />
      <main>
        <Work />
        <About />
        <Contact />
      </main>
    </div>
  );
}
