import { useEffect, useState } from "react";
import { Header, Hero, Overview } from "./components/Opening";
import {
  Collection,
  World,
  Story,
  Products,
  Brands,
  Journal,
  Footer,
} from "./components/Sections";
import { Dialogs } from "./components/Dialogs";
import type { Dialog, Product, Article } from "./data";
import "./App.css";

function App() {
  const [dialog, setDialog] = useState<Dialog>(null);
  const [category, setCategory] = useState("همه");
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  function browse(selected = "همه") {
    setCategory(selected);
    setExpanded(true);
    setDialog(null);
    window.setTimeout(
      () =>
        document
          .getElementById("products")
          ?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  }
  const openProduct = (product: Product) =>
    setDialog({ kind: "product", product });
  const openArticle = (article: Article) =>
    setDialog({ kind: "article", article });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActiveSection(entry.target.id);
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("[data-nav-section]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site" dir="rtl">
      <a className="skip-link" href="#main">
        رفتن به محتوای اصلی
      </a>
      <Header open={setDialog} active={activeSection} browse={browse} />
      <main id="main">
        <div className="container opening" id="home" data-nav-section>
          <Hero />
          <Overview />
        </div>
        <Collection browse={browse} />
        <World open={setDialog} />
        <Story open={setDialog} />
        <Products
          category={category}
          setCategory={setCategory}
          expanded={expanded}
          setExpanded={setExpanded}
          openProduct={openProduct}
        />
        <Brands />
        <Journal openArticle={openArticle} />
      </main>
      <Footer open={setDialog} />
      <Dialogs
        dialog={dialog}
        setDialog={setDialog}
        openProduct={openProduct}
      />
    </div>
  );
}

export default App;
