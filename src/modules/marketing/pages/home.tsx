import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Trust from "@/components/sections/trust";
import Features from "@/components/sections/features";
import UserTypes from "@/components/sections/user-types";
import HowItWorks from "@/components/sections/how-it-works";
import Testimonials from "@/components/sections/testimonials";
import CTA from "@/components/sections/cta";
import { useSEO } from "@/hooks/use-seo";

export default function Home() {
  useSEO({
    title: "Revolutionary Digital Healthcare Platform",
    description: "Transform healthcare with AI-powered diagnostics, telemedicine, and integrated care solutions. Connect patients, providers, and partners seamlessly.",
    ogTitle: "Revolutionary Digital Healthcare Platform",
    ogDescription: "Transform healthcare with AI-powered diagnostics, telemedicine, and integrated care solutions. Connect patients, providers, and partners seamlessly.",
    canonical: `${window.location.origin}/`
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Trust />
        <Features />
        <UserTypes />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
