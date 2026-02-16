import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ServiceCard from "@/components/ui/service-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { useMediaPosition } from "@/hooks/use-media-position";
import {
  Calendar,
  FileText,
  Brain,
  Pill,
  Phone,
  FlaskConical,
  Activity,
  Truck,
  MessageSquare,
  Smartphone,
  Stethoscope,
  Zap,
  Shield,
  Video,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import patientsHeroFallback from "@assets/stock_images/african_family_recei_83123bcc.jpg";
import telemedicineFallback from "@assets/stock_images/african_doctor_patie_bf53b32a.jpg";

const patientServices = [
  {
    icon: Calendar,
    title: "Healthcare Appointment Scheduling",
    description:
      "Book appointments with healthcare providers instantly through our intuitive scheduling system.",
  },
  {
    icon: FileText,
    title: "Personal Health Record",
    description:
      "Securely store and access all your medical records, test results, and health history in one place.",
  },
  {
    icon: Brain,
    title: "AI Diagnosis and Result Interpretation",
    description:
      "Get instant insights and explanations of your test results powered by advanced AI technology.",
  },
  {
    icon: Pill,
    title: "Pharmacy Access and Online Prescriptions",
    description:
      "Order medications online and get them delivered to your doorstep with prescription management.",
  },
  {
    icon: Phone,
    title: "Emergency Healthcare Access",
    description:
      "24/7 emergency support with immediate connection to emergency medical services.",
  },
  {
    icon: FlaskConical,
    title: "Lab Test Booking and Result Access",
    description:
      "Schedule lab tests and receive results securely through our platform.",
  },
  {
    icon: Activity,
    title: "Personalized Predictive Care",
    description:
      "Receive personalized health recommendations based on your medical history and lifestyle.",
  },
  {
    icon: Truck,
    title: "Home-Care Delivery",
    description:
      "Get healthcare services and medications delivered directly to your home.",
  },
  {
    icon: MessageSquare,
    title: "Feedback and Review System",
    description:
      "Rate and review healthcare providers to help improve service quality.",
  },
  {
    icon: Smartphone,
    title: "Third-Party Fitness and Wellness App Integration",
    description:
      "Connect your fitness trackers and wellness apps for comprehensive health monitoring.",
  },
  {
    icon: Stethoscope,
    title: "All Medical Diagnosis",
    description:
      "Access comprehensive diagnostic services across all medical specialties.",
  },
  {
    icon: Zap,
    title: "Remote Health Monitoring and Terminal Disease Management",
    description:
      "Continuous monitoring for chronic conditions with real-time health tracking.",
  },
  {
    icon: Shield,
    title: "Integrate your Health Insurance Provider",
    description:
      "Seamlessly connect your insurance for streamlined billing and coverage verification.",
  },
  {
    icon: Video,
    title: "Telemedicine Consultation",
    description:
      "Connect with healthcare providers through secure video consultations from anywhere.",
  },
];

const steps = [
  {
    title: "Sign up and verify",
    description:
      "Register and activate your account using just your email or phone number via our app or website.",
    icon: "1",
  },
  {
    title: "Profile setup",
    description:
      "Complete your profile by updating your medical history, allergies, and medications at your convenience.",
    icon: "2",
  },
  {
    title: "Service selection and marketplace access",
    description:
      "Select the care package that fits your needs and explore our marketplace for pharmacy products, medical devices, and lab tests.",
    icon: "3",
  },
  {
    title: "AI-aided health assessment and provider selection",
    description:
      "Use our AI diagnosis tool for initial assessment and receive personalized recommendations for physicians, clinics, and labs from our network.",
    icon: "4",
  },
  {
    title: "Appointment and health management",
    description:
      "Schedule consultations, order medications, manage chronic conditions with remote monitoring, and access health records with updates on test results and treatment plans, all through our platform.",
    icon: "5",
  },
  {
    title: "Enhance your healthcare journey",
    description:
      "Link your health insurance, securely communicate with healthcare providers, use genomic analytics for preventative care, and rate your experience to enhance our services.",
    icon: "6",
  },
];

const benefits = [
  "Personalized Care - AI triage assesses symptoms and connects you with the right specialists",
  "Flexible consultations - Book consultations in any format, including with family via conference calls",
  "Integrated pharmacy services - Order meds with delivery or pickup; get automated medication reminders via your device",
  "On-demand lab services - Order lab tests and access results securely; choose home collection or visit labs",
  "Continuous care - Easily schedule follow-ups and get reminders to stay on top of your care",
  "Comprehensive health records - Securely access all your health records in one place, from notes to test results",
  "Health insurance integration - Connect your health insurance for faster, smoother, and hassle-free treatment",
];

const patientFAQs = [
  {
    question: "What is MHI?",
    answer:
      "MHI (My Health Integral) is a digital health platform that brings doctors, pharmacies, labs, hospitals, insurers, and emergency services together in one app.",
  },
  {
    question: "How do I sign up?",
    answer:
      "Download the app (or use web/WhatsApp), create your account, and set up your health profile.",
  },
  {
    question: "Can I see a doctor on MHI?",
    answer:
      "Yes. You can book video, audio, or chat consultations with private doctors, hospitals, or clinics.",
  },
  {
    question: "How does the AI tool help me?",
    answer:
      "MHI IntelliCare AI checks your symptoms, suggests the right doctor, and sends triage notes ahead of your consultation.",
  },
  {
    question: "Can I order medicines and lab tests?",
    answer:
      "Yes. Prescriptions go directly to pharmacies for delivery, and you can book lab tests with home sample collection. Results appear in your profile.",
  },
  {
    question: "Is my medical information safe?",
    answer:
      "Yes. All data is encrypted and stored securely. You control who can access your Electronic Health Record (EHR).",
  },
  {
    question: "Can I use my health insurance on MHI?",
    answer:
      "Yes. MHI integrates with HMOs and insurers for seamless coverage. You can also pay per service.",
  },
  {
    question: "What if I have an emergency?",
    answer:
      "You can request emergency help through the app. Your location and health details are shared instantly to save time.",
  },
  {
    question: "How much does it cost?",
    answer:
      "MHI has a free model (pay only for consultations, labs, or medicines). Premium subscriptions unlock advanced AI and wellness features.",
  },
  {
    question: "Can I access my records if I switch hospitals?",
    answer:
      "Yes. Your EHR is portable and can be shared with any provider, giving you seamless continuity of care.",
  },
];

function TelemedicineBenefitSection() {
  const { data: telemedicineImage } = useMediaPosition("benefit_telemedicine");

  return (
    <section className="py-20 bg-background section-teal-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Benefit Image */}
          <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={telemedicineImage?.mediaUrl || telemedicineFallback}
                alt={
                  telemedicineImage?.mediaAlt ||
                  "African doctor conducting video consultation with patient"
                }
                className="w-full h-96 object-cover"
                data-testid="telemedicine-benefit-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* Live Indicator Badge */}
              <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Live Consultation</span>
              </div>
            </div>
          </div>

          {/* Benefit Content */}
          <div className="flex-1 w-full space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Video className="h-4 w-4" />
              <span className="text-sm font-semibold">Telemedicine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Consult with Doctors from Anywhere
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Connect with qualified healthcare providers through secure video
              consultations. Get expert medical advice, prescriptions, and
              follow-up care without leaving your home.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">
                    Instant Access to Specialists
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Book appointments and consult with specialists in minutes
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">
                    Secure & Private
                  </div>
                  <div className="text-sm text-muted-foreground">
                    End-to-end encrypted consultations protecting your privacy
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">
                    Digital Prescriptions
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Receive prescriptions sent directly to your preferred
                    pharmacy
                  </div>
                </div>
              </li>
            </ul>

            <Link href="/contact#contact-form">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold group"
                data-testid="button-start-consultation"
              >
                Start Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Patients() {
  const { data: patientsHeroImage } = useMediaPosition("hero_patients");
  const [location, setLocation] = useLocation();
  useSEO({
    title: "Patient Care Services",
    description:
      "Access telemedicine consultations, AI diagnostics, digital health records, prescription management, and 24/7 healthcare support from anywhere.",
    ogTitle: "Patient Care Services - Digital Healthcare Solutions",
    ogDescription:
      "Access telemedicine consultations, AI diagnostics, digital health records, and 24/7 healthcare support from anywhere.",
    canonical: `${window.location.origin}/patients`,
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
        <section className="relative text-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={patientsHeroImage?.mediaUrl || patientsHeroFallback}
              alt={
                patientsHeroImage?.mediaAlt ||
                "African family receiving healthcare at home via telemedicine"
              }
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            {/* Desktop Layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="relative">
                {/* Badges - Mobile (in flow, no overlap) */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6 lg:hidden">
                  <div
                    className="bg-white/95 backdrop-blur-md rounded-xl px-5 py-3 shadow-xl border border-primary/10"
                    data-testid="patients-access-badge"
                  >
                    <div className="flex items-center gap-3">
                      <Video className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs font-semibold text-foreground">
                          Telemedicine Ready
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          Consult from Home
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-white/95 backdrop-blur-md rounded-xl px-5 py-3 shadow-xl border border-primary/10"
                    data-testid="patients-ai-badge"
                  >
                    <div className="flex items-center gap-3">
                      <Brain className="h-6 w-6 text-primary" />
                      <div>
                        <div className="text-xs font-semibold text-foreground">
                          AI Diagnosis
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          Instant Insights
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glass Content Card */}
                <div className="backdrop-blur-xl bg-white/10 p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/20 shadow-2xl">
                  <h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
                    data-testid="patients-hero-title"
                  >
                    Your Health, Your Way
                    <span className="block text-white/90 text-2xl sm:text-3xl lg:text-4xl font-medium mt-2">
                      Comprehensive Patient Care Services
                    </span>
                  </h1>

                  <p
                    className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed"
                    data-testid="patients-hero-description"
                  >
                    At My Health Integral, we are revolutionizing the way you
                    access healthcare. Experience personalized, convenient, and
                    comprehensive healthcare services designed around your
                    needs.
                  </p>

                  {/* Key Benefits */}
                  <div className="mb-8 space-y-3">
                    <div className="flex items-center gap-3 text-white/90">
                      <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span>24/7 Access to Healthcare Providers</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span>AI-Powered Diagnosis & Triage</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                      <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span>Complete Health Records at Your Fingertips</span>
                    </div>
                  </div>

                  <Link href="/contact#contact-form">
                    <Button
                      className="bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                      data-testid="patients-get-started"
                    >
                      <ArrowRight className="mr-2 h-5 w-5" />
                      Get Started Today
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Spacer Column */}
              <div className="hidden lg:block"></div>
            </div>
          </div>

          {/* Desktop Badges (Absolute, no overlap) */}
          <div className="hidden lg:flex absolute top-8 right-8 gap-4 z-20">
            <div
              className="bg-white/95 backdrop-blur-md rounded-xl px-5 py-3 shadow-xl border border-primary/10"
              data-testid="patients-access-badge"
            >
              <div className="flex items-center gap-3">
                <Video className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs font-semibold text-foreground">
                    Telemedicine Ready
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Consult from Home
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-white/95 backdrop-blur-md rounded-xl px-5 py-3 shadow-xl border border-primary/10"
              data-testid="patients-ai-badge"
            >
              <div className="flex items-center gap-3">
                <Brain className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-xs font-semibold text-foreground">
                    AI Diagnosis
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Instant Insights
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 section-cream">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="patients-services-title"
              >
                Our Services in Patient Care
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                data-testid="patients-services-description"
              >
                Comprehensive healthcare services designed to meet all your
                medical needs in one integrated platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {patientServices.map((service, index) => (
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

        {/* Telemedicine Benefit - Visual Showcase */}
        <TelemedicineBenefitSection />

        {/* How It Works */}
        <section className="py-20 section-peach">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="patients-how-it-works-title"
              >
                How It Works
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="patients-how-it-works-description"
              >
                Getting started with your healthcare journey is simple and
                straightforward.
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
              {steps.map((step, index) => (
                <SwiperSlide key={index} className="h-auto flex">
                  <div
                    className="bg-card rounded-xl p-8 border border-border flex flex-col h-full"
                    data-testid={`patients-step-${index}`}
                  >
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                      <span className="text-xl font-bold text-primary-foreground">
                        {step.icon}
                      </span>
                    </div>

                    <h3
                      className="text-xl font-semibold text-foreground mb-4"
                      data-testid={`patients-step-title-${index}`}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="text-muted-foreground leading-relaxed"
                      data-testid={`patients-step-description-${index}`}
                    >
                      {step.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20 section-teal-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="patients-benefits-title"
              >
                What You Get
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="patients-benefits-description"
              >
                Comprehensive benefits designed to transform your healthcare
                experience.
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

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="patients-faq-title"
              >
                Frequently Asked Questions
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="patients-faq-description"
              >
                Get quick answers to the most common questions from patients
                about using our digital healthcare platform.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {patientFAQs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                    data-testid={`patients-faq-${index + 1}`}
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
                  data-testid="patients-see-all-faqs"
                  onClick={() => {
                    alert(
                      "Complete the contact form to view all patient FAQs.",
                    );
                    setLocation("/contact#contact-form");
                  }}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  See All Patient FAQs
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Complete FAQ section available after account setup
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
                data-testid="patients-cta-title"
              >
                Ready to Take Control of Your Health?
              </h2>
              <p
                className="text-xl text-white/90 mb-8"
                data-testid="patients-cta-description"
              >
                Join thousands of patients who have transformed their healthcare
                experience with My Health Integral.
              </p>
              <Link href="/contact#contact-form">
                <Button
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg"
                  data-testid="patients-cta-button"
                >
                  Start Your Journey
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
