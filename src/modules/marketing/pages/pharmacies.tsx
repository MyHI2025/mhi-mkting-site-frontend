import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ServiceCard from "@/components/ui/service-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { useMediaPosition } from "@/hooks/use-media-position";
import {
  Pill,
  FileText,
  Package,
  Truck,
  Smartphone,
  BarChart3,
  Shield,
  Clock,
  Users,
  CreditCard,
  Bell,
  CheckCircle,
  ArrowRight,
  Heart,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import pharmacyHeroFallback from "@assets/stock_images/medication_delivery__6e1f4560.jpg";
import pharmacyBenefitFallback from "@assets/stock_images/african_patient_rece_5974a681.jpg";

const pharmacyServices = [
  {
    icon: Pill,
    title: "Digital Prescription Management",
    description:
      "Seamlessly receive, process, and fulfill digital prescriptions from healthcare providers.",
  },
  {
    icon: FileText,
    title: "Electronic Health Records Integration",
    description:
      "Access patient medication history and health records for comprehensive pharmaceutical care.",
  },
  {
    icon: Package,
    title: "Inventory Management System",
    description:
      "Advanced inventory tracking with automated reordering and expiration date management.",
  },
  {
    icon: Truck,
    title: "Delivery and Logistics",
    description:
      "Integrated delivery solutions for home medication delivery and logistics optimization.",
  },
  {
    icon: Smartphone,
    title: "Mobile Pharmacy App",
    description:
      "Custom-branded mobile app for patients to order medications and track deliveries.",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description:
      "Comprehensive analytics dashboard for sales tracking, inventory optimization, and growth insights.",
  },
  {
    icon: Shield,
    title: "Regulatory Compliance",
    description:
      "Automated compliance monitoring and reporting for pharmaceutical regulations and safety standards.",
  },
  {
    icon: Clock,
    title: "24/7 Customer Support",
    description:
      "Round-the-clock customer support system for patients and healthcare provider inquiries.",
  },
  {
    icon: Users,
    title: "Patient Counseling Platform",
    description:
      "Digital platform for medication counseling and patient education services.",
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description:
      "Secure payment processing with insurance integration and flexible payment options.",
  },
  {
    icon: Bell,
    title: "Medication Reminders",
    description:
      "Automated medication reminder system for improved patient adherence and outcomes.",
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description:
      "Comprehensive quality control systems ensuring medication safety and authenticity.",
  },
];

const benefits = [
  "Streamlined operations with digital prescription processing and automated workflows",
  "Enhanced inventory management reducing waste and ensuring optimal stock levels",
  "Improved patient experience through convenient ordering and home delivery services",
  "Increased revenue through expanded reach and improved operational efficiency",
  "Better compliance with automated regulatory monitoring and reporting systems",
  "Enhanced patient safety through medication tracking and adherence monitoring",
  "Reduced operational costs through process automation and digital transformation",
  "Competitive advantage with modern pharmacy services and technology integration",
];

const pharmacyFAQs = [
  {
    question:
      "How do we integrate MHI with our existing pharmacy management system?",
    answer:
      "Our platform integrates seamlessly with popular pharmacy systems like PioneerRx, QS/1, and Liberty through secure APIs and standard data formats, ensuring minimal disruption to your current workflows.",
  },
  {
    question:
      "What types of prescriptions can be processed through the platform?",
    answer:
      "All prescription types including controlled substances, specialty medications, compounded prescriptions, and over-the-counter recommendations with full DEA compliance and audit trails.",
  },
  {
    question: "How does the home delivery service work?",
    answer:
      "We coordinate with local delivery partners and courier services to provide same-day or next-day delivery, with temperature-controlled shipping for specialty medications and real-time tracking for patients.",
  },
  {
    question: "What inventory management features are included?",
    answer:
      "Automated reordering, expiration date tracking, lot number management, formulary compliance, cost optimization suggestions, and integration with wholesaler ordering systems.",
  },
  {
    question: "How do we handle insurance verification and billing?",
    answer:
      "Real-time insurance verification, automated prior authorization processing, claims submission, and integration with major pharmacy benefit managers (PBMs) to streamline reimbursement.",
  },
  {
    question: "What patient engagement tools are available?",
    answer:
      "Mobile app for prescription refills, medication reminders, adherence tracking, educational content, and secure messaging with pharmacists for consultation services.",
  },
  {
    question: "How does the platform ensure regulatory compliance?",
    answer:
      "Built-in compliance monitoring for FDA, DEA, state board regulations, automated audit trails, reporting capabilities, and regular updates to maintain compliance with changing requirements.",
  },
  {
    question: "What revenue opportunities does the platform provide?",
    answer:
      "Expanded patient base through digital reach, telepharmacy services, medication synchronization programs, specialty pharmacy opportunities, and value-added services like immunizations.",
  },
  {
    question: "Can we maintain our current supplier relationships?",
    answer:
      "Yes, you maintain full control over your supplier relationships while gaining access to our network for additional sourcing options, better pricing negotiations, and backup supply chains.",
  },
  {
    question: "What support is provided for staff training and onboarding?",
    answer:
      "Comprehensive training programs, user manuals, video tutorials, dedicated support team, and ongoing education to ensure your staff can effectively use all platform features.",
  },
];

function PharmacyBenefitSection() {
  const { data: pharmacyBenefitImage } = useMediaPosition("benefit_pharmacy");

  return (
    <section className="py-20 section-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
          {/* Benefit Image */}
          <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={pharmacyBenefitImage?.mediaUrl || pharmacyBenefitFallback}
                alt={
                  pharmacyBenefitImage?.mediaAlt ||
                  "Patient receiving medication delivery"
                }
                className="w-full h-96 object-cover"
                data-testid="pharmacy-benefit-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* 24/7 Delivery Badge */}
              <div className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span className="text-sm font-semibold">24/7 Delivery</span>
              </div>
            </div>
          </div>

          {/* Benefit Content */}
          <div className="flex-1 w-full space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Pill className="h-4 w-4" />
              <span className="text-sm font-semibold">Digital Pharmacy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Medication Delivered to Your Doorstep
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Streamline pharmacy operations with digital prescriptions,
              automated inventory, and integrated home delivery. Expand your
              reach while maintaining the highest safety standards.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">
                    Digital Prescription Processing
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Instant fulfillment reduces wait times by 60%
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">
                    Smart Inventory Management
                  </div>
                  <div className="text-sm text-muted-foreground">
                    AI-powered stock optimization prevents shortages
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">
                    Home Delivery Integration
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Same-day delivery with real-time tracking
                  </div>
                </div>
              </li>
            </ul>

            <Link href="/contact#contact-form">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold group"
                data-testid="button-modernize-pharmacy"
              >
                Modernize Your Pharmacy
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Pharmacies() {
  const { data: pharmaciesHeroImage } = useMediaPosition("hero_pharmacies");
  const [location, setLocation] = useLocation();
  useSEO({
    title: "Digital Pharmacy Solutions",
    description:
      "Modernize your pharmacy with digital prescriptions, automated inventory management, and integrated home delivery. Streamline operations and enhance patient care.",
    ogTitle: "Digital Pharmacy Solutions - Modern Medication Management",
    ogDescription:
      "Transform pharmacy operations with digital prescriptions, smart inventory, and same-day delivery services.",
    canonical: `${window.location.origin}/pharmacies`,
  });

  const serviceCardColors = [
    {
      bg: "bg-teal-50",
      border: "border-teal-200",
      accentText: "text-teal-600",
      accentBg: "bg-teal-600",
    },
    {
      bg: "bg-amber-50",
      border: "border-amber-200",
      accentText: "text-amber-600",
      accentBg: "bg-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section - Enhanced with Professional Imagery */}
        <section className="hero-gradient text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="text-left">
                <h1
                  className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
                  data-testid="pharmacies-hero-title"
                >
                  Modernize Your Pharmacy
                  <span className="block text-white/90 mt-2">
                    Digital Solutions for Enhanced Operations
                  </span>
                </h1>
                <p
                  className="text-xl text-white/90 mb-8"
                  data-testid="pharmacies-hero-description"
                >
                  Streamline your pharmacy operations with digital
                  prescriptions, inventory management, and comprehensive patient
                  care solutions designed for modern pharmacies.
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center lg:text-left">
                    <div
                      className="text-3xl font-bold text-white"
                      data-testid="metric-processing"
                    >
                      60%
                    </div>
                    <div
                      className="text-sm text-white/80"
                      data-testid="metric-processing-label"
                    >
                      Faster Processing
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div
                      className="text-3xl font-bold text-white"
                      data-testid="metric-prescriptions"
                    >
                      100K+
                    </div>
                    <div
                      className="text-sm text-white/80"
                      data-testid="metric-prescriptions-label"
                    >
                      Prescriptions
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div
                      className="text-3xl font-bold text-white"
                      data-testid="metric-delivery"
                    >
                      Same Day
                    </div>
                    <div
                      className="text-sm text-white/80"
                      data-testid="metric-delivery-label"
                    >
                      Delivery
                    </div>
                  </div>
                </div>

                <Link href="/contact#contact-form">
                  <Button
                    className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg"
                    data-testid="pharmacies-get-started"
                  >
                    Digitize Your Pharmacy
                  </Button>
                </Link>
              </div>

              {/* Hero Image */}
              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={pharmaciesHeroImage?.mediaUrl || pharmacyHeroFallback}
                    alt={
                      pharmaciesHeroImage?.mediaAlt ||
                      "Modern digital pharmacy operations"
                    }
                    className="w-full h-96 object-cover"
                    data-testid="pharmacies-hero-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                  {/* Floating Badges */}
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm text-primary px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      Verified Pharmacy
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm text-primary px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm font-semibold">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="pharmacies-services-title"
              >
                Pharmacy Solutions & Services
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                data-testid="pharmacies-services-description"
              >
                Comprehensive digital solutions designed to optimize pharmacy
                operations and enhance patient care delivery.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {pharmacyServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  colorClass={
                    serviceCardColors[index % serviceCardColors.length]
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pharmacy Benefit Section */}
        <PharmacyBenefitSection />

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="pharmacies-benefits-title"
              >
                Transform Your Pharmacy Operations
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="pharmacies-benefits-description"
              >
                Experience enhanced efficiency, improved patient care, and
                increased profitability with our digital solutions.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                  const isEvenRow = Math.floor(index / 2) % 2 === 0;

                  const colorClasses = isEvenRow
                    ? "bg-teal-50 border-teal-200 hover:bg-teal-100 hover:border-teal-300"
                    : "bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-300";

                  return (
                    <div
                      key={index}
                      className={`
                flex items-start space-x-4 p-6 rounded-lg border
                ${colorClasses}
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-md
              `}
                      data-testid={`patients-benefit-${index}`}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>

                      <p
                        className="text-foreground leading-relaxed"
                        data-testid={`patients-benefit-text-${index}`}
                      >
                        {benefit}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Integration Process */}
        <section className="py-20 section-peach">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="pharmacies-process-title"
              >
                Simple Integration Process
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="pharmacies-process-description"
              >
                Get your pharmacy digital-ready with our streamlined onboarding
                and integration process.
              </p>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              loop
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true }}
              navigation
              spaceBetween={24}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              <SwiperSlide className="h-auto">
                <div
                  className="h-full text-center bg-card border border-border rounded-xl p-8"
                  data-testid="pharmacies-process-step-1"
                >
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-xl font-bold text-primary-foreground">
                      1
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Setup & Configuration
                  </h3>
                  <p className="text-muted-foreground">
                    Initial setup of pharmacy profile and system configuration
                    for your specific needs.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div
                  className="h-full text-center bg-card border border-border rounded-xl p-8"
                  data-testid="pharmacies-process-step-2"
                >
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-xl font-bold text-secondary-foreground">
                      2
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    System Integration
                  </h3>
                  <p className="text-muted-foreground">
                    Integration with existing pharmacy systems and healthcare
                    provider networks.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div
                  className="h-full text-center bg-card border border-border rounded-xl p-8"
                  data-testid="pharmacies-process-step-3"
                >
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-xl font-bold text-accent-foreground">
                      3
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Staff Training
                  </h3>
                  <p className="text-muted-foreground">
                    Comprehensive training for pharmacy staff on digital tools
                    and processes.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div
                  className="h-full text-center bg-card border border-border rounded-xl p-8"
                  data-testid="pharmacies-process-step-4"
                >
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-xl font-bold text-primary-foreground">
                      4
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Launch & Support
                  </h3>
                  <p className="text-muted-foreground">
                    Go live with full digital capabilities and ongoing technical
                    support.
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="pharmacies-faq-title"
              >
                Frequently Asked Questions
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="pharmacies-faq-description"
              >
                Get quick answers to the most common questions from pharmacy
                partners about joining our digital network.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {pharmacyFAQs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                    data-testid={`pharmacies-faq-${index + 1}`}
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="px-8 py-3"
                  data-testid="pharmacies-see-all-faqs"
                  onClick={() => {
                    alert(
                      "Complete the contact form to view all pharmacy FAQs.",
                    );
                    setLocation("/contact#contact-form");
                  }}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  See All Pharmacy FAQs
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Complete FAQ section available after joining our pharmacy
                  network
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-6"
                data-testid="pharmacies-cta-title"
              >
                Ready to Transform Your Pharmacy?
              </h2>
              <p
                className="text-xl text-white/90 mb-8"
                data-testid="pharmacies-cta-description"
              >
                Join innovative pharmacies that are enhancing patient care and
                operations through digital transformation.
              </p>
              <Link href="/contact#contact-form">
                <Button
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg"
                  data-testid="pharmacies-cta-button"
                >
                  Get Started Now
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
