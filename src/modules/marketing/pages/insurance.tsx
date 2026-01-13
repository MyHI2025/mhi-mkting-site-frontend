import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ServiceCard from "@/components/ui/service-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { useMediaPosition } from "@/hooks/use-media-position";
import {
  Shield,
  FileText,
  BarChart3,
  Users,
  Clock,
  CreditCard,
  Phone,
  Database,
  CheckCircle,
  Smartphone,
  Activity,
  TrendingUp,
  ArrowRight,
  Award,
  Percent,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import insuranceHeroFallback from "@assets/stock_images/diverse_african_heal_10fc4146.jpg";
import insuranceBenefitFallback from "@assets/stock_images/happy_diverse_africa_b5071dc8.jpg";

const insuranceServices = [
  {
    icon: Shield,
    title: "Claims Management System",
    description:
      "Streamlined claims processing with automated verification and faster approval workflows.",
  },
  {
    icon: FileText,
    title: "Policy Administration",
    description:
      "Comprehensive policy management system with digital enrollment and automated renewals.",
  },
  {
    icon: BarChart3,
    title: "Risk Assessment Analytics",
    description:
      "Advanced analytics for risk assessment, fraud detection, and predictive modeling.",
  },
  {
    icon: Users,
    title: "Member Portal Integration",
    description:
      "Self-service member portals with real-time benefit information and claim status tracking.",
  },
  {
    icon: Clock,
    title: "Real-time Benefit Verification",
    description:
      "Instant benefit verification for healthcare providers and member eligibility checks.",
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description:
      "Secure payment processing for premiums, claims, and provider reimbursements.",
  },
  {
    icon: Phone,
    title: "24/7 Customer Support",
    description:
      "Round-the-clock customer service integration with automated chatbots and live support.",
  },
  {
    icon: Database,
    title: "Data Integration Hub",
    description:
      "Seamless integration with healthcare providers, pharmacies, and medical facilities.",
  },
  {
    icon: CheckCircle,
    title: "Regulatory Compliance",
    description:
      "Automated compliance monitoring ensuring adherence to healthcare regulations and standards.",
  },
  {
    icon: Smartphone,
    title: "Mobile Insurance App",
    description:
      "Custom mobile applications for members to access benefits, submit claims, and find providers.",
  },
  {
    icon: Activity,
    title: "Preventive Care Programs",
    description:
      "Wellness program management with health tracking and incentive coordination.",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description:
      "Comprehensive reporting and analytics for operational efficiency and member satisfaction.",
  },
];

const benefits = [
  "Reduced administrative costs through automated claims processing and digital workflows",
  "Improved member satisfaction with faster claim approvals and transparent benefit information",
  "Enhanced fraud detection and risk management through AI-powered analytics",
  "Streamlined provider network management with real-time benefit verification",
  "Better health outcomes through integrated preventive care and wellness programs",
  "Increased operational efficiency with automated policy administration and renewals",
  "Regulatory compliance assurance with automated monitoring and reporting systems",
  "Competitive advantage through innovative digital insurance products and services",
];

const insuranceFAQs = [
  {
    question:
      "How does MHI integrate with existing insurance management systems?",
    answer:
      "Our platform seamlessly integrates with major insurance core systems like Duck Creek, Guidewire, and SAP through RESTful APIs and standard data formats, ensuring minimal disruption to current operations while enhancing functionality.",
  },
  {
    question: "What claims processing improvements can we expect?",
    answer:
      "Automated claim intake, AI-powered fraud detection, real-time eligibility verification, and streamlined approval workflows can reduce processing time by up to 70% while improving accuracy and member satisfaction.",
  },
  {
    question: "How do you handle HIPAA compliance and data security?",
    answer:
      "We maintain the highest security standards with end-to-end encryption, role-based access controls, comprehensive audit trails, and full HIPAA compliance certification to protect sensitive member health information.",
  },
  {
    question: "What member engagement tools are available?",
    answer:
      "Self-service member portals, mobile apps for benefit information, real-time claim tracking, digital ID cards, telemedicine integration, and personalized health management tools to improve member experience.",
  },
  {
    question: "How does real-time benefit verification work for providers?",
    answer:
      "Instant eligibility checks, benefit verification, copay calculations, and prior authorization status through secure provider portals and APIs, reducing administrative burden and improving patient care efficiency.",
  },
  {
    question: "What analytics and reporting capabilities are included?",
    answer:
      "Comprehensive dashboards for claims analytics, risk assessment, member utilization patterns, fraud detection, financial reporting, and regulatory compliance reporting with customizable business intelligence tools.",
  },
  {
    question: "How do you support value-based care initiatives?",
    answer:
      "Quality metrics tracking, provider performance monitoring, care gap identification, population health management tools, and outcome-based payment models to support value-based care contracts and initiatives.",
  },
  {
    question: "What fraud detection capabilities does the platform provide?",
    answer:
      "AI-powered pattern recognition, real-time transaction monitoring, provider network analysis, duplicate claim detection, and advanced analytics to identify and prevent fraudulent activities while protecting legitimate claims.",
  },
  {
    question: "How do you handle multi-state insurance operations?",
    answer:
      "State-specific regulatory compliance, automated filing requirements, jurisdiction-based benefit rules, and centralized management for multi-state operations while maintaining local compliance and reporting standards.",
  },
  {
    question: "What support is provided for implementation and training?",
    answer:
      "Dedicated implementation team, comprehensive training programs, user documentation, ongoing technical support, and change management assistance to ensure successful platform adoption and optimization.",
  },
];

function InsuranceBenefitSection() {
  const { data: insuranceBenefitImage } = useMediaPosition("benefit_insurance");

  return (
    <section className="py-20 section-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
          {/* Benefit Image */}
          <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={
                  insuranceBenefitImage?.mediaUrl || insuranceBenefitFallback
                }
                alt={
                  insuranceBenefitImage?.mediaAlt ||
                  "Happy diverse African insurance team"
                }
                className="w-full h-96 object-cover"
                data-testid="insurance-benefit-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* Approval Badge */}
              <div className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="text-sm font-semibold">99.5% Approval</span>
              </div>
            </div>
          </div>

          {/* Benefit Content */}
          <div className="flex-1 w-full space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-semibold">
                Insurance Integration
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Seamless Claims Processing & Member Care
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Transform insurance operations with automated claims processing,
              real-time benefit verification, and integrated member portals.
              Improve satisfaction while reducing operational costs.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">
                    Automated Claims Processing
                  </div>
                  <div className="text-sm text-muted-foreground">
                    AI verification reduces processing time by 70%
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">
                    Real-Time Eligibility Checks
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Instant benefit verification at point of care
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">
                    Fraud Detection System
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Machine learning prevents fraudulent claims
                  </div>
                </div>
              </li>
            </ul>

            <Link href="/contact#contact-form">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold group"
                data-testid="button-modernize-insurance"
              >
                Modernize Insurance Operations
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Insurance() {
  const { data: insuranceHeroImage } = useMediaPosition("hero_insurance");

  useSEO({
    title: "Health Insurance Solutions",
    description:
      "Transform insurance operations with automated claims processing, real-time benefit verification, and integrated member portals for health insurance providers.",
    ogTitle: "Health Insurance Solutions - Digital Insurance Platform",
    ogDescription:
      "Efficient claims management and preventative care coordination with comprehensive digital solutions for health insurance providers.",
    canonical: `${window.location.origin}/insurance`,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="text-left">
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                  data-testid="insurance-hero-title"
                >
                  Transform Insurance Operations
                  <span className="block text-white/90 mt-2">
                    Efficient Claims & Preventive Care
                  </span>
                </h1>
                <p
                  className="text-xl text-white/90 mb-8"
                  data-testid="insurance-hero-description"
                >
                  Efficient claims management and preventative care coordination
                  with our comprehensive digital platform designed for health
                  insurance providers.
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-8 mb-8">
                  <div>
                    <div
                      className="text-3xl font-bold text-white"
                      data-testid="metric-claims"
                    >
                      70%
                    </div>
                    <div
                      className="text-sm text-white/80"
                      data-testid="metric-claims-label"
                    >
                      Faster Claims
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-3xl font-bold text-white"
                      data-testid="metric-accuracy"
                    >
                      99.5%
                    </div>
                    <div
                      className="text-sm text-white/80"
                      data-testid="metric-accuracy-label"
                    >
                      Accuracy
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-3xl font-bold text-white"
                      data-testid="metric-support"
                    >
                      24/7
                    </div>
                    <div
                      className="text-sm text-white/80"
                      data-testid="metric-support-label"
                    >
                      Support
                    </div>
                  </div>
                </div>

                <Link href="/contact#contact-form">
                  <Button
                    className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg"
                    data-testid="insurance-get-started"
                  >
                    Modernize Your Operations
                  </Button>
                </Link>
              </div>

              {/* Hero Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={insuranceHeroImage?.mediaUrl || insuranceHeroFallback}
                    alt={
                      insuranceHeroImage?.mediaAlt ||
                      "Diverse African healthcare team"
                    }
                    className="w-full h-96 object-cover"
                    data-testid="insurance-hero-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* Floating Badges */}
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      HIPAA Compliant
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      AI Powered
                    </span>
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
                data-testid="insurance-services-title"
              >
                Health Insurance Solutions
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                data-testid="insurance-services-description"
              >
                Comprehensive digital solutions designed to optimize insurance
                operations and enhance member experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {insuranceServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Insurance Benefit Section */}
        <InsuranceBenefitSection />

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="insurance-benefits-title"
              >
                Transform Your Insurance Operations
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="insurance-benefits-description"
              >
                Experience reduced costs, improved member satisfaction, and
                enhanced operational efficiency.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-card rounded-lg border border-border"
                    data-testid={`insurance-benefit-${index}`}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <p
                      className="text-foreground leading-relaxed"
                      data-testid={`insurance-benefit-text-${index}`}
                    >
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 section-peach">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="insurance-features-title"
              >
                Advanced Insurance Technology
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="insurance-features-description"
              >
                Cutting-edge technology solutions designed specifically for
                modern health insurance operations.
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
                  data-testid="insurance-feature-1"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    AI-Powered Claims
                  </h3>
                  <p className="text-muted-foreground">
                    Automated claims processing with 95% accuracy and fraud
                    detection.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div
                  className="h-full text-center bg-card border border-border rounded-xl p-8"
                  data-testid="insurance-feature-2"
                >
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Clock className="text-secondary h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Instant Verification
                  </h3>
                  <p className="text-muted-foreground">
                    Real-time benefit verification reducing provider wait times
                    to seconds.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div
                  className="h-full text-center bg-card border border-border rounded-xl p-8"
                  data-testid="insurance-feature-3"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="text-accent h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Predictive Analytics
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced risk modeling and predictive health analytics for
                    better outcomes.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide className="h-auto">
                <div
                  className="h-full text-center bg-card border border-border rounded-xl p-8"
                  data-testid="insurance-feature-4"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Activity className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Wellness Integration
                  </h3>
                  <p className="text-muted-foreground">
                    Comprehensive wellness program management with health
                    tracking.
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
                data-testid="insurance-faq-title"
              >
                Frequently Asked Questions
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="insurance-faq-description"
              >
                Essential answers for insurance partners about integrating our
                digital health platform.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {insuranceFAQs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                    data-testid={`insurance-faq-${index + 1}`}
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
                  data-testid="insurance-see-all-faqs"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  See All Insurance FAQs
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Complete FAQ section available for insurance partners
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
                data-testid="insurance-cta-title"
              >
                Ready to Revolutionize Your Insurance Operations?
              </h2>
              <p
                className="text-xl text-white/90 mb-8"
                data-testid="insurance-cta-description"
              >
                Join progressive insurance providers that are enhancing member
                experience and operational efficiency through digital
                innovation.
              </p>
              <Link href="/contact#contact-form">
                <Button
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg"
                  data-testid="insurance-cta-button"
                >
                  Transform Your Business
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
