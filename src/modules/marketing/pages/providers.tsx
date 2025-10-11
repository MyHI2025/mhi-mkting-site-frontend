import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { 
  Stethoscope,
  Building2,
  FlaskConical,
  Pill,
  Ambulance,
  Shield
} from "lucide-react";

const providerTypes = [
  {
    href: "/physicians",
    icon: Stethoscope,
    title: "Private Physicians",
    description: "Expand your practice with telemedicine tools, AI diagnostics, and comprehensive patient management solutions.",
    color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950 dark:border-emerald-800 dark:hover:bg-emerald-900",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    testId: "physicians"
  },
  {
    href: "/hospitals",
    icon: Building2,
    title: "Hospitals",
    description: "Enhance patient care with real-time data integration, telehealth solutions, and hospital management systems.",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100 dark:bg-blue-950 dark:border-blue-800 dark:hover:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-400",
    testId: "hospitals"
  },
  {
    href: "/laboratories",
    icon: FlaskConical,
    title: "Medical Labs",
    description: "Streamline test management, automated reporting, and result delivery with advanced laboratory solutions.",
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100 dark:bg-purple-950 dark:border-purple-800 dark:hover:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-400",
    testId: "laboratories"
  },
  {
    href: "/pharmacies",
    icon: Pill,
    title: "Pharmacies",
    description: "Optimize operations with digital prescriptions, inventory management, and patient counseling platforms.",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100 dark:bg-orange-950 dark:border-orange-800 dark:hover:bg-orange-900",
    iconColor: "text-orange-600 dark:text-orange-400",
    testId: "pharmacies"
  },
  {
    href: "/emergency",
    icon: Ambulance,
    title: "Emergency Services",
    description: "Improve response times and coordinate patient care during emergencies with advanced dispatch systems.",
    color: "bg-red-50 border-red-200 hover:bg-red-100 dark:bg-red-950 dark:border-red-800 dark:hover:bg-red-900",
    iconColor: "text-red-600 dark:text-red-400",
    testId: "emergency"
  },
  {
    href: "/insurance",
    icon: Shield,
    title: "Insurance Providers",
    description: "Efficient claims management, policy administration, and preventative care coordination solutions.",
    color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 dark:bg-indigo-950 dark:border-indigo-800 dark:hover:bg-indigo-900",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    testId: "insurance"
  }
];

export default function Providers() {
  useSEO({
    title: "Healthcare Provider Solutions",
    description: "Comprehensive digital healthcare solutions for physicians, hospitals, labs, pharmacies, emergency services, and insurance providers.",
    ogTitle: "Healthcare Provider Solutions",
    ogDescription: "Comprehensive digital healthcare solutions for physicians, hospitals, labs, pharmacies, emergency services, and insurance providers.",
    canonical: `${window.location.origin}/providers`
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" data-testid="providers-hero-title">
                Choose Your Provider Type
                <span className="block text-white/90">Digital Solutions for Every Healthcare Provider</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto" data-testid="providers-hero-description">
                Select your healthcare provider category to discover tailored digital solutions designed specifically for your organization's needs.
              </p>
            </div>
          </div>
        </section>

        {/* Provider Types Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="providers-selection-title">
                Select Your Provider Category
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="providers-selection-description">
                Each provider type has specialized tools and services designed to enhance your specific healthcare delivery model.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {providerTypes.map((provider, index) => (
                <Link key={index} href={provider.href}>
                  <a 
                    className={`${provider.color} rounded-xl p-8 border-2 transition-all duration-300 hover:shadow-lg cursor-pointer h-full block text-decoration-none`}
                    data-testid={`provider-card-${provider.testId}`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 ${provider.iconColor} mb-6 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-sm`}>
                        <provider.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-4" data-testid={`provider-title-${provider.testId}`}>
                        {provider.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6" data-testid={`provider-description-${provider.testId}`}>
                        {provider.description}
                      </p>
                      <span 
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium transition-colors inline-block"
                        data-testid={`provider-button-${provider.testId}`}
                      >
                        Learn More
                      </span>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6" data-testid="providers-info-title">
                Why Choose My Health Integral?
              </h2>
              <p className="text-xl text-muted-foreground mb-8" data-testid="providers-info-description">
                Our comprehensive digital healthcare platform is designed to serve every type of healthcare provider with specialized tools, seamless integrations, and innovative solutions.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6" data-testid="providers-benefit-1">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">HIPAA Compliant</h3>
                  <p className="text-muted-foreground">Enterprise-grade security and compliance for all healthcare data.</p>
                </div>
                <div className="p-6" data-testid="providers-benefit-2">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Seamless Integration</h3>
                  <p className="text-muted-foreground">Easy integration with existing systems and workflows.</p>
                </div>
                <div className="p-6" data-testid="providers-benefit-3">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">24/7 Support</h3>
                  <p className="text-muted-foreground">Round-the-clock technical and customer support.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="providers-cta-title">
                Ready to Transform Your Healthcare Delivery?
              </h2>
              <p className="text-xl text-white/90 mb-8" data-testid="providers-cta-description">
                Join thousands of healthcare providers who trust My Health Integral to enhance their patient care and operational efficiency.
              </p>
              <Link href="/contact#contact-form">
                <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg" data-testid="providers-cta-button">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}