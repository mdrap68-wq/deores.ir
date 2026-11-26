import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AiBentoSection } from './components/AiBentoSection';
import { KeyFeaturesSection } from './components/KeyFeaturesSection';
import { PlatformToolsSection } from './components/PlatformToolsSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { TelemetryStrip } from './components/TelemetryStrip';
import { SeoFocusSection } from './components/SeoFocusSection';
import { PricingSection } from './components/PricingSection';
import { WordPressBannerSection } from './components/WordPressBannerSection';
import { EventTrackingSection } from './components/EventTrackingSection';
import { ApiIntegrationSection } from './components/ApiIntegrationSection';
import { FaqSection } from './components/FaqSection';
import { ClientsStrip } from './components/ClientsStrip';
import { Footer } from './components/Footer';
import { InteractiveModals, ModalType } from './components/InteractiveModals';
import { Sparkles } from 'lucide-react';

export function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[#0F172A] relative selection:bg-amber-400/30">
      {/* Top Browser Chrome & Sticky RTL Navbar */}
      <Navbar onOpenModal={(type) => setActiveModal(type)} />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section with Orbital Rings & Floating Telemetry Badges */}
        <HeroSection onOpenModal={(type) => setActiveModal(type)} />

        {/* 2. AI Assistant & Core Pillars Bento Grid */}
        <AiBentoSection onOpenModal={(type) => setActiveModal(type)} />

        {/* 3. Key Features Showcase & Interactive Dashboard Browser Mockup */}
        <KeyFeaturesSection />

        {/* 4. One Platform, All Analytics Tools */}
        <PlatformToolsSection onOpenModal={(type) => setActiveModal(type)} />

        {/* 5. Case Studies & Portfolio Coverflow Carousel */}
        <CaseStudiesSection />

        {/* 6. High-Velocity Telemetry & SLA Metrics Bar (78M Featured Pod) */}
        <TelemetryStrip />

        {/* 7. SEO & Real User Behavior Section with 3D Illustration */}
        <SeoFocusSection onOpenModal={(type) => setActiveModal(type)} />

        {/* 8. 4-Tier Color-Coded Pricing Matrix (Orange, Blue, Green, Deep Charcoal) */}
        <PricingSection onOpenModal={(type) => setActiveModal(type)} />

        {/* 9. WordPress Plugin 3D Box Showcase & Conversion Progress Bars */}
        <WordPressBannerSection onOpenModal={(type) => setActiveModal(type)} />

        {/* 10. Every Important Interaction, Measurable (8 Interactive Event Tabs) */}
        <EventTrackingSection />

        {/* 11. Developer API & Webhook Terminal Section */}
        <ApiIntegrationSection onOpenModal={(type) => setActiveModal(type)} />

        {/* 12. FAQ Accordion & Dedicated 24/7 Support Card */}
        <FaqSection onOpenModal={(type) => setActiveModal(type)} />

        {/* 13. Trusted Clients & Brand Partners Strip */}
        <ClientsStrip />
      </main>

      {/* 14. Comprehensive 4-Column RTL Footer */}
      <Footer />

      {/* Floating IRA AI Assistant Quick-Launch Pill */}
      <button
        onClick={() => setActiveModal('ai-demo')}
        aria-label="دستیار هوشمند — پرسش از IRA AI"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 inline-flex items-center gap-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-black p-3 sm:px-4 sm:py-3 rounded-2xl shadow-xl shadow-slate-950/25 border border-amber-400/40 hover:scale-105 transition-all cursor-pointer group"
      >
        <span className="w-7 h-7 rounded-xl bg-[#F59E0B] text-slate-950 flex items-center justify-center shadow-sm shrink-0">
          <Sparkles className="w-4 h-4" />
        </span>
        <div className="hidden sm:block text-right">
          <div className="text-amber-300 text-[10px] font-bold">دستیار هوشمند</div>
          <div>پرسش از IRA AI</div>
        </div>
      </button>

      {/* Interactive Modals */}
      <InteractiveModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}

export default App;
