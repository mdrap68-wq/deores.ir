import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Clients from "./components/Clients";
import Services from "./components/Services";
import Journey from "./components/Journey";
import Features from "./components/Features";
import Faq from "./components/Faq";
import CtaCards from "./components/CtaCards";
import Footer from "./components/Footer";
import { Wave } from "./components/ui";

export default function App() {
  return (
    <div dir="rtl" className="font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <Clients />
        <div className="bg-char">
          <Wave fill="#ffffff" />
        </div>
        <Services />
        <div className="bg-white">
          <Wave fill="#1b1a19" />
        </div>
        <Journey />
        <div className="bg-char">
          <Wave fill="#f4f0eb" />
        </div>
        <Features />
        <div className="bg-sand">
          <Wave fill="#ffffff" />
        </div>
        <Faq />
        <CtaCards />
      </main>
      <Footer />
    </div>
  );
}
