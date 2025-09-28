import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { OfferingsSection } from "@/components/offerings-section";
import { ComingSoonSection } from "@/components/coming-soon-section";
import { ContactForm } from "@/components/contact-form";
import { FloatingActions } from "@/components/floating-actions";
import { ChatbotWidget } from "@/components/chatbot-widget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <OfferingsSection />
        <ComingSoonSection />
        <ContactForm />
      </main>
      <FloatingActions />
      <ChatbotWidget />
    </div>
  );
};

export default Index;
