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
  Building2,
  Activity,
  Users,
  Database,
  Zap,
  Video,
  BarChart3,
  Shield,
  Globe,
  Clock,
  HeartHandshake,
  Smartphone,
  ArrowRight,
  Award,
} from "lucide-react";
import hospitalsHeroFallback from "@assets/stock_images/modern_african_hospi_a65c0c82.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const hospitalServices = [
  {
    icon: Building2,
    title: "Hospital Management System Integration",
    description:
      "Seamlessly integrate with existing hospital management systems for comprehensive patient care coordination.",
  },
  {
    icon: Activity,
    title: "Real-time Patient Monitoring",
    description:
      "Monitor patient vitals and health status in real-time with advanced IoT device integration.",
  },
  {
    icon: Users,
    title: "Multi-Department Coordination",
    description:
      "Facilitate seamless communication and workflow coordination across all hospital departments.",
  },
  {
    icon: Database,
    title: "Centralized Health Records",
    description:
      "Access and manage comprehensive electronic health records with advanced security and compliance.",
  },
  {
    icon: Zap,
    title: "Emergency Response Integration",
    description:
      "Integrate emergency response systems for rapid patient triage and care coordination.",
  },
  {
    icon: Video,
    title: "Telehealth Infrastructure",
    description:
      "Implement comprehensive telehealth capabilities for remote patient consultations and follow-ups.",
  },
  {
    icon: BarChart3,
    title: "Analytics and Reporting",
    description:
      "Advanced analytics for hospital operations, patient outcomes, and performance optimization.",
  },
  {
    icon: Shield,
    title: "Data Security and Compliance",
    description:
      "Enterprise-grade security ensuring HIPAA compliance and patient data protection.",
  },
  {
    icon: Globe,
    title: "Network Integration",
    description:
      "Connect with our global network of healthcare providers, labs, and pharmacies.",
  },
  {
    icon: Clock,
    title: "24/7 Support and Monitoring",
    description:
      "Round-the-clock technical support and system monitoring for uninterrupted service.",
  },
  {
    icon: HeartHandshake,
    title: "Patient Engagement Tools",
    description:
      "Enhance patient experience with digital engagement tools and communication platforms.",
  },
  {
    icon: Smartphone,
    title: "Mobile Integration",
    description:
      "Mobile-first solutions for staff and patients with comprehensive app integration.",
  },
];

const benefits = [
  "Enhanced patient care with real-time data integration and comprehensive health monitoring",
  "Streamlined operations through automated workflows and intelligent resource management",
  "Improved patient outcomes with AI-powered diagnostics and predictive analytics",
  "Reduced operational costs through digital transformation and process optimization",
  "Better staff coordination with integrated communication and collaboration tools",
  "Increased patient satisfaction through improved service delivery and engagement",
  "Regulatory compliance with automated reporting and data security measures",
  "Global connectivity enabling knowledge sharing and best practice implementation",
];

const hospitalFAQs = [
  {
    question: "How long does the integration process take?",
    answer:
      "Typical integration takes 3-6 months depending on hospital size and complexity. We work in phases to minimize disruption, with basic features available within 30 days and full integration completed gradually.",
  },
  {
    question:
      "Will this work with our existing Electronic Health Record (EHR) system?",
    answer:
      "Yes, our platform integrates with all major EHR systems including Epic, Cerner, Allscripts, and others through HL7 FHIR standards and custom API integrations where needed.",
  },
  {
    question:
      "What level of technical support do you provide during implementation?",
    answer:
      "We provide dedicated implementation specialists, 24/7 technical support, comprehensive training for your staff, and ongoing system monitoring to ensure smooth operations.",
  },
  {
    question: "How do you ensure HIPAA compliance and data security?",
    answer:
      "Our platform is built with enterprise-grade security, including end-to-end encryption, audit trails, access controls, and regular security assessments to maintain full HIPAA compliance.",
  },
  {
    question:
      "Can we customize the platform to match our hospital's specific workflows?",
    answer:
      "Absolutely. We offer extensive customization options to adapt the platform to your existing workflows, departmental structures, and specific operational requirements.",
  },
  {
    question:
      "What training is provided to our medical and administrative staff?",
    answer:
      "We provide comprehensive training programs including on-site sessions, online modules, user manuals, and ongoing support to ensure all staff can effectively use the platform.",
  },
  {
    question:
      "How does the platform handle emergency situations and rapid response?",
    answer:
      "The platform includes integrated emergency response features with real-time alerts, automated notifications, and coordination tools to ensure rapid response during critical situations.",
  },
  {
    question:
      "What are the costs involved and how does the pricing structure work?",
    answer:
      "Pricing is based on hospital size, number of users, and selected features. We offer flexible subscription models and can provide detailed cost projections based on your specific requirements.",
  },
  {
    question: "How do you measure return on investment (ROI) for hospitals?",
    answer:
      "We track metrics like reduced administrative costs, improved patient throughput, decreased readmission rates, and enhanced operational efficiency to demonstrate measurable ROI.",
  },
  {
    question: "Can the platform scale as our hospital grows?",
    answer:
      "Yes, our cloud-based infrastructure is designed to scale seamlessly with your growth, accommodating additional departments, users, and increased patient volumes without performance degradation.",
  },
];

export default function Hospitals() {
  const { data: hospitalsHeroImage } = useMediaPosition("hero_hospitals");

  useSEO({
    title: "Hospital Digital Infrastructure Solutions",
    description:
      "Transform hospital operations with real-time data integration, telehealth solutions, and comprehensive digital infrastructure for modern healthcare facilities.",
    ogTitle: "Hospital Digital Infrastructure Solutions",
    ogDescription:
      "Real-time patient monitoring, multi-department coordination, and next-generation healthcare infrastructure for hospitals.",
    canonical: `${window.location.origin}/hospitals`,
  });

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
              <div className="text-center lg:text-left">
                <h1
                  className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
                  data-testid="hospitals-hero-title"
                >
                  Transform Hospital Operations
                  <span className="block text-white/90 text-3xl sm:text-4xl font-medium mt-2">
                    Next-Generation Healthcare Infrastructure
                  </span>
                </h1>
                <p
                  className="text-xl text-white/90 mb-8 leading-relaxed"
                  data-testid="hospitals-hero-description"
                >
                  Enhance patient care with real-time data integration,
                  telehealth solutions, and comprehensive digital infrastructure
                  designed for modern hospitals.
                </p>

                {/* Key Impact Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <Activity className="h-8 w-8 text-green-400 mb-2" />
                    <div className="text-2xl font-bold">40%</div>
                    <div className="text-sm text-white/80">Efficiency Gain</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <Award className="h-8 w-8 text-yellow-400 mb-2" />
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-sm text-white/80">
                      Hospital Partners
                    </div>
                  </div>
                </div>

                <Link href="/contact#contact-form">
                  <Button
                    className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg"
                    data-testid="hospitals-get-started"
                  >
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Partner With Us
                  </Button>
                </Link>
              </div>

              {/* Hero Image - Modern African Hospital with Digital Infrastructure */}
              <div className="relative order-first lg:order-last">
                <div className="relative z-10">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                    <img
                      src={
                        hospitalsHeroImage?.mediaUrl || hospitalsHeroFallback
                      }
                      alt={
                        hospitalsHeroImage?.mediaAlt ||
                        "Modern African hospital with digital healthcare infrastructure"
                      }
                      className="w-full h-auto object-cover"
                      data-testid="hospitals-hero-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent"></div>
                  </div>

                  {/* Real-Time Monitoring Badge */}
                  <div
                    className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-primary/10"
                    data-testid="hospitals-monitoring-badge"
                  >
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs font-semibold text-foreground">
                          Real-Time Monitoring
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          All Departments
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Digital Infrastructure Badge */}
                  <div
                    className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-primary/10"
                    data-testid="hospitals-infrastructure-badge"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="h-6 w-6 text-primary" />
                      <div>
                        <div className="text-xs font-semibold text-foreground">
                          Full Integration
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          All Systems Connected
                        </div>
                      </div>
                    </div>
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
                data-testid="hospitals-services-title"
              >
                Hospital Solutions & Services
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                data-testid="hospitals-services-description"
              >
                Comprehensive digital infrastructure and tools designed to
                modernize hospital operations and enhance patient care.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {hospitalServices.map((service, index) => (
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

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="hospitals-benefits-title"
              >
                Transform Your Hospital Operations
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="hospitals-benefits-description"
              >
                Experience the benefits of digital transformation in healthcare
                delivery and operations.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-card rounded-lg border border-border"
                    data-testid={`hospitals-benefit-${index}`}
                  >
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                    <p
                      className="text-foreground leading-relaxed"
                      data-testid={`hospitals-benefit-text-${index}`}
                    >
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="py-20 section-peach">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="hospitals-process-title"
              >
                Implementation Process
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="hospitals-process-description"
              >
                Our structured approach ensures smooth integration with minimal
                disruption to your operations.
              </p>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              loop
              autoHeight={false}
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
              className="items-stretch"
            >
              <SwiperSlide>
                <div
                  className="text-center h-full bg-card border border-border rounded-xl p-8"
                  data-testid="hospitals-process-step-1"
                >
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-xl font-bold text-primary-foreground">
                      1
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Assessment & Planning
                  </h3>
                  <p className="text-muted-foreground">
                    Comprehensive evaluation of current systems and development
                    of integration strategy.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div
                  className="text-center h-full bg-card border border-border rounded-xl p-8"
                  data-testid="hospitals-process-step-2"
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
                    Seamless integration with existing hospital systems and
                    infrastructure.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div
                  className="text-center h-full bg-card border border-border rounded-xl p-8"
                  data-testid="hospitals-process-step-3"
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
                    Comprehensive training programs for staff to maximize
                    platform utilization.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div
                  className="text-center h-full bg-card border border-border rounded-xl p-8"
                  data-testid="hospitals-process-step-4"
                >
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-xl font-bold text-primary-foreground">
                      4
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Go Live & Support
                  </h3>
                  <p className="text-muted-foreground">
                    Full deployment with ongoing support and continuous
                    optimization.
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
                data-testid="hospitals-faq-title"
              >
                Frequently Asked Questions
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="hospitals-faq-description"
              >
                Get quick answers to the most common questions from hospital
                administrators about platform integration.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {hospitalFAQs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                    data-testid={`hospitals-faq-${index + 1}`}
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
                  data-testid="hospitals-see-all-faqs"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  See All Hospital FAQs
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Complete FAQ section available after platform integration
                  consultation
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
                data-testid="hospitals-cta-title"
              >
                Ready to Modernize Your Hospital?
              </h2>
              <p
                className="text-xl text-white/90 mb-8"
                data-testid="hospitals-cta-description"
              >
                Join leading hospitals worldwide in delivering exceptional
                patient care through digital innovation.
              </p>
              <Link href="/contact#contact-form">
                <Button
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg"
                  data-testid="hospitals-cta-button"
                >
                  Schedule Consultation
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
