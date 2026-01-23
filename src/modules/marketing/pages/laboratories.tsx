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
  FlaskConical,
  FileText,
  Zap,
  Database,
  QrCode,
  Clock,
  Shield,
  BarChart3,
  Smartphone,
  Network,
  Bell,
  CheckCircle,
  ArrowRight,
  Award,
  TrendingUp,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import labsHeroFallback from "@assets/stock_images/african_healthcare_d_35d36f4d.jpg";
import labBenefitFallback from "@assets/stock_images/professional_african_f0a94615.jpg";

const labServices = [
  {
    icon: FlaskConical,
    title: "Digital Test Management",
    description:
      "Streamline test ordering, tracking, and result delivery with our comprehensive digital platform.",
  },
  {
    icon: FileText,
    title: "Automated Reporting",
    description:
      "Generate standardized reports with AI-powered analysis and instant result interpretation.",
  },
  {
    icon: Zap,
    title: "Real-time Result Processing",
    description:
      "Process and deliver test results in real-time with instant notifications to patients and providers.",
  },
  {
    icon: Database,
    title: "Centralized Data Management",
    description:
      "Secure storage and management of all laboratory data with advanced analytics capabilities.",
  },
  {
    icon: QrCode,
    title: "Sample Tracking & Chain of Custody",
    description:
      "Advanced sample tracking system ensuring complete chain of custody and quality assurance.",
  },
  {
    icon: Clock,
    title: "Scheduling and Workflow Optimization",
    description:
      "Optimize laboratory workflows with intelligent scheduling and resource management.",
  },
  {
    icon: Shield,
    title: "Quality Control & Compliance",
    description:
      "Ensure regulatory compliance with automated quality control and audit trail systems.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track laboratory performance metrics, turnaround times, and quality indicators.",
  },
  {
    icon: Smartphone,
    title: "Mobile Integration",
    description:
      "Mobile-first solutions for field collection, remote monitoring, and on-the-go access.",
  },
  {
    icon: Network,
    title: "Provider Network Integration",
    description:
      "Seamless integration with healthcare provider networks for test ordering and result sharing.",
  },
  {
    icon: Bell,
    title: "Critical Result Alerts",
    description:
      "Automated critical result notifications with priority escalation to healthcare providers.",
  },
  {
    icon: CheckCircle,
    title: "Accreditation Support",
    description:
      "Tools and documentation support for laboratory accreditation and certification processes.",
  },
];

const benefits = [
  "Improved efficiency through automated test management and digital workflows",
  "Enhanced accuracy with AI-powered result analysis and quality control systems",
  "Faster turnaround times with real-time processing and instant result delivery",
  "Better patient experience through convenient scheduling and timely result access",
  "Reduced operational costs through process optimization and resource management",
  "Increased provider satisfaction with seamless integration and reliable service",
  "Regulatory compliance with automated documentation and audit capabilities",
  "Scalable operations supporting growth and expansion into new markets",
];

const laboratoryFAQs = [
  {
    question:
      "How do we integrate MHI with our existing Laboratory Information System (LIS)?",
    answer:
      "Our platform seamlessly integrates with popular LIS systems including Epic Beaker, Cerner PowerChart Lab, and Meditech through HL7 standards and secure APIs, ensuring minimal disruption to existing workflows.",
  },
  {
    question:
      "What types of tests and diagnostics can be managed through the platform?",
    answer:
      "Our platform supports all major diagnostic categories including clinical chemistry, hematology, microbiology, molecular diagnostics, pathology, radiology, and specialized tests with customizable test catalogs.",
  },
  {
    question:
      "How does the platform handle critical results and urgent notifications?",
    answer:
      "Critical results trigger automated alerts to ordering physicians through multiple channels (SMS, email, phone calls) with escalation protocols and confirmation tracking to ensure timely communication.",
  },
  {
    question: "What quality control and compliance features are included?",
    answer:
      "Built-in QC monitoring, proficiency testing tracking, regulatory reporting (CLIA, CAP, ISO 15189), audit trails, and automated compliance documentation to meet all laboratory standards.",
  },
  {
    question: "How do patients and providers access test results?",
    answer:
      "Results are instantly available through secure patient portals, provider dashboards, and mobile apps, with customizable delivery preferences and automated notifications upon result availability.",
  },
  {
    question: "What is the typical turnaround time for result processing?",
    answer:
      "Digital results are processed and delivered instantly upon completion. Our analytics help optimize laboratory workflows to reduce total turnaround times by an average of 30-40%.",
  },
  {
    question:
      "How does the platform handle sample tracking and chain of custody?",
    answer:
      "Advanced barcode and RFID tracking systems monitor samples from collection through disposal, with complete digital chain of custody documentation and real-time location tracking.",
  },
  {
    question: "What data security measures protect patient information?",
    answer:
      "End-to-end encryption, role-based access controls, audit logging, HIPAA compliance, and SOC 2 certification ensure maximum security for all patient data and test results.",
  },
  {
    question:
      "Can we customize reports and result formats for different providers?",
    answer:
      "Yes, fully customizable report templates, automated interpretations, reference ranges, and provider-specific formatting to meet diverse clinical requirements and preferences.",
  },
  {
    question:
      "What support is available for technical issues and system maintenance?",
    answer:
      "24/7 technical support, proactive system monitoring, regular updates, dedicated account management, and comprehensive training programs to ensure optimal laboratory operations.",
  },
];

function LabBenefitSection() {
  const { data: labBenefitImage } = useMediaPosition("benefit_lab_diagnostics");

  return (
    <section className="py-20 section-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
          {/* Benefit Image */}
          <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={labBenefitImage?.mediaUrl || labBenefitFallback}
                alt={
                  labBenefitImage?.mediaAlt ||
                  "African laboratory technician conducting diagnostic tests"
                }
                className="w-full h-96 object-cover"
                data-testid="lab-benefit-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* Accuracy Badge */}
              <div className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="text-sm font-semibold">99.9% Accuracy</span>
              </div>
            </div>
          </div>

          {/* Benefit Content */}
          <div className="flex-1 w-full space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <FlaskConical className="h-4 w-4" />
              <span className="text-sm font-semibold">
                Digital Lab Solutions
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Precision Diagnostics, Accelerated Results
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Transform your laboratory with AI-powered diagnostics, automated
              workflows, and instant result delivery. Reduce turnaround times
              while maintaining the highest accuracy standards.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">
                    Automated Test Processing
                  </div>
                  <div className="text-sm text-muted-foreground">
                    AI-powered analysis reduces turnaround time by 40%
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">
                    Real-Time Quality Control
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Continuous monitoring ensures ISO 15189 compliance
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">
                    Instant Critical Alerts
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Automated notifications to providers within seconds
                  </div>
                </div>
              </li>
            </ul>

            <Link href="/contact#contact-form">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold group"
                data-testid="button-transform-lab"
              >
                Transform Your Lab
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Laboratories() {
  const { data: labsHeroImage } = useMediaPosition("hero_laboratories");
const [location, setLocation] = useLocation();
  useSEO({
    title: "Medical Laboratory Solutions",
    description:
      "Digital test management, automated reporting, real-time processing, and comprehensive laboratory solutions for modern diagnostic facilities.",
    ogTitle: "Medical Laboratory Solutions - Digital Diagnostics Platform",
    ogDescription:
      "Transform laboratory operations with AI-powered test management, automated reporting, and real-time result processing.",
    canonical: `${window.location.origin}/laboratories`,
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
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                  data-testid="labs-hero-title"
                >
                  Revolutionize Laboratory Operations
                  <span className="block text-white/90 mt-2">
                    Efficient Test Management & Reporting
                  </span>
                </h1>
                <p
                  className="text-xl text-white/90 mb-8 max-w-2xl"
                  data-testid="labs-hero-description"
                >
                  Improve efficiency in test management and reporting with our
                  comprehensive digital laboratory solutions designed for modern
                  medical laboratories.
                </p>

                {/* Key Metrics */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="text-center">
                    <div
                      className="text-3xl font-bold text-white"
                      data-testid="metric-tat"
                    >
                      40%
                    </div>
                    <div
                      className="text-sm text-white/80"
                      data-testid="metric-tat-label"
                    >
                      Faster TAT
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-3xl font-bold text-white"
                      data-testid="metric-accuracy"
                    >
                      99.9%
                    </div>
                    <div
                      className="text-sm text-white/80"
                      data-testid="metric-accuracy-label"
                    >
                      Accuracy Rate
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-3xl font-bold text-white"
                      data-testid="metric-monitoring"
                    >
                      24/7
                    </div>
                    <div
                      className="text-sm text-white/80"
                      data-testid="metric-monitoring-label"
                    >
                      Monitoring
                    </div>
                  </div>
                </div>

                <Link href="/contact#contact-form">
                  <Button
                    className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg"
                    data-testid="labs-get-started"
                  >
                    Transform Your Lab
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Hero Image */}
              <div className="relative lg:block hidden">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={labsHeroImage?.mediaUrl || labsHeroFallback}
                    alt={
                      labsHeroImage?.mediaAlt ||
                      "Modern African medical laboratory with advanced diagnostic equipment"
                    }
                    className="w-full h-auto object-cover"
                    data-testid="labs-hero-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent"></div>
                </div>

                {/* ISO Compliance Badge */}
                <div
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-primary/10"
                  data-testid="labs-compliance-badge"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs font-semibold text-foreground">
                        ISO 15189
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Certified
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real-time Processing Badge */}
                <div
                  className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-primary/10"
                  data-testid="labs-realtime-badge"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <div>
                      <div className="text-xs font-semibold text-foreground">
                        Real-Time Processing
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Instant Results
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
                data-testid="labs-services-title"
              >
                Medical Laboratory Solutions
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                data-testid="labs-services-description"
              >
                Comprehensive digital solutions designed to streamline
                laboratory operations and enhance diagnostic service delivery.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {labServices.map((service, index) => (
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

        {/* Lab Benefit Visual Showcase */}
        <LabBenefitSection />

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="labs-benefits-title"
              >
                Transform Your Laboratory Operations
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="labs-benefits-description"
              >
                Experience enhanced efficiency, accuracy, and patient
                satisfaction with our digital laboratory solutions.
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

        {/* Technology Features */}
        <section className="py-20 section-peach">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="labs-tech-title"
              >
                Advanced Technology Features
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="labs-tech-description"
              >
                Cutting-edge technology designed specifically for modern
                laboratory environments.
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
                  data-testid="labs-feature-1"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FlaskConical className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    AI-Powered Analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced AI algorithms for result interpretation and pattern
                    recognition.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div
                  className="text-center h-full bg-card border border-border rounded-xl p-8"
                  data-testid="labs-feature-2"
                >
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Database className="text-secondary h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Cloud Infrastructure
                  </h3>
                  <p className="text-muted-foreground">
                    Secure, scalable cloud infrastructure with global
                    accessibility.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div
                  className="text-center h-full bg-card border border-border rounded-xl p-8"
                  data-testid="labs-feature-3"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="text-accent h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Data Security
                  </h3>
                  <p className="text-muted-foreground">
                    Enterprise-grade security with HIPAA compliance and
                    encryption.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div
                  className="text-center h-full bg-card border border-border rounded-xl p-8"
                  data-testid="labs-feature-4"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Real-time Analytics
                  </h3>
                  <p className="text-muted-foreground">
                    Live performance monitoring and predictive analytics
                    dashboard.
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
                data-testid="labs-faq-title"
              >
                Frequently Asked Questions
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="labs-faq-description"
              >
                Get quick answers to the most common questions from laboratory
                partners about joining our diagnostic network.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {laboratoryFAQs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                    data-testid={`labs-faq-${index + 1}`}
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
                  data-testid="labs-see-all-faqs"
                   onClick={() => {
                alert(
                  "Complete the contact form to view all laboratory FAQs."
                );
                setLocation("/contact#contact-form");
              }}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  See All Laboratory FAQs
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Complete FAQ section available after joining our laboratory
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
                data-testid="labs-cta-title"
              >
                Ready to Digitize Your Laboratory?
              </h2>
              <p
                className="text-xl text-white/90 mb-8"
                data-testid="labs-cta-description"
              >
                Join forward-thinking laboratories that are transforming
                diagnostic services with digital innovation.
              </p>
              <Link href="/contact#contact-form">
                <Button
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg"
                  data-testid="labs-cta-button"
                >
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
