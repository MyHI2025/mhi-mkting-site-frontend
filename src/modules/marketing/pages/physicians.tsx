import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ServiceCard from "@/components/ui/service-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { useMediaPosition } from "@/hooks/use-media-position";
import { 
  Monitor,
  Video,
  Calendar,
  BarChart3,
  FlaskConical,
  FileText,
  HeartHandshake,
  Brain,
  UserCheck,
  Activity,
  DollarSign,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Users2
} from "lucide-react";
import physiciansHeroFallback from "@assets/stock_images/professional_african_70f2d164.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const physicianServices = [
  {
    icon: Monitor,
    title: "Virtual Practice Setup",
    description: "Easily establish your virtual practice with our comprehensive digital infrastructure and tools."
  },
  {
    icon: Video,
    title: "Comprehensive Telemedicine Solution",
    description: "Deliver high-quality remote care through secure video consultations and digital health tools."
  },
  {
    icon: Calendar,
    title: "Flexible Appointment Scheduling",
    description: "Manage your schedule efficiently with automated booking, reminders, and calendar integration."
  },
  {
    icon: BarChart3,
    title: "Integrated Analytics and Reporting Tools",
    description: "Track patient outcomes, practice performance, and generate detailed reports for better decision-making."
  },
  {
    icon: FlaskConical,
    title: "Assigning Tests to Respective Labs",
    description: "Seamlessly order lab tests and coordinate with our network of certified laboratories."
  },
  {
    icon: FileText,
    title: "Online Prescription Making",
    description: "Create and manage digital prescriptions with electronic pharmacy integration."
  },
  {
    icon: HeartHandshake,
    title: "Enhanced Patient Care Delivery",
    description: "Deliver personalized care with comprehensive patient management tools and health records."
  },
  {
    icon: Brain,
    title: "Access to AI-Powered Diagnostics Tool",
    description: "Leverage advanced AI to enhance diagnostic accuracy and treatment recommendations."
  },
  {
    icon: UserCheck,
    title: "Direct Patient Referral",
    description: "Efficiently refer patients to specialists while maintaining care coordination and follow-up."
  },
  {
    icon: Activity,
    title: "Remote Monitoring and Preventive Care Delivery",
    description: "Monitor patient health remotely and provide proactive preventive care interventions."
  },
  {
    icon: DollarSign,
    title: "Performance-based Compensation",
    description: "Earn competitive compensation based on patient satisfaction and clinical outcomes."
  },
  {
    icon: MessageSquare,
    title: "Feedback and Review System",
    description: "Receive patient feedback and maintain high-quality care standards through our review system."
  }
];

const steps = [
  {
    title: "Sign up and profile setup",
    description: "Sign up on the 'MHI Physicians' section, complete verification, and configure your professional profile with specialties and availability.",
    icon: "1"
  },
  {
    title: "Training and system integration",
    description: "Undertake platform training to effectively manage appointments and virtual consultations.",
    icon: "2"
  },
  {
    title: "Begin practice & patient management",
    description: "Start accepting appointments, conduct secure video/audio calls, update EHRs, manage prescriptions, tests, monitoring and referrals.",
    icon: "3"
  },
  {
    title: "Utilize tools & manage finances",
    description: "Employ AI tools for better care and handle billing and payments directly on the platform.",
    icon: "4"
  },
  {
    title: "Community engagement",
    description: "Participate in the community, use feedback for improvement and keep developing professionally.",
    icon: "5"
  },
  {
    title: "Enhance patient care",
    description: "Link insurance, communicate securely, use genomic analytics for prevention and continuously improve patient outcomes.",
    icon: "6"
  }
];

const benefits = [
  "Virtual practice setup - Easily set up a virtual practice and showcase your expertise to patients",
  "Flexible scheduling - Offer flexible consultations with automated reminders and synced calendars",
  "Comprehensive telemedicine solutions - Deliver complete virtual care through secure video and audio consultations",
  "Enhanced patient care via AI diagnostics - Use AI diagnostics to deliver personalized, high-quality care",
  "Remote monitoring & preventive care - Enable remote care with device integration and genomic insights",
  "Direct patient referrals - Refer patients to facilities while staying involved in their care journey",
  "Performance-based compensation - Earn based on patient consultations with secure payments",
  "Collaboration and community - Join a professional network to collaborate, learn, and grow",
  "Effortless administrative handling - Let MyHi manage admin tasks like records, billing, and claims"
];

const physicianFAQs = [
  {
    question: "What is MHI for private physicians?",
    answer: "MHI is a digital platform that helps you run a full virtual or hybrid practice. You can consult online or in person, manage patients, issue prescriptions, request lab tests, and collaborate with other providers."
  },
  {
    question: "Who are the private physicians that can consult on MHI?",
    answer: "Licensed, independent medical professionals including general practitioners, specialists (cardiologists, pediatricians, gynecologists), dentists, mental health professionals, and other verified healthcare providers."
  },
  {
    question: "How do I get started as a private physician on MHI?",
    answer: "Apply through our physician portal, complete the credentialing process with your medical license and certifications, then set up your profile and availability."
  },
  {
    question: "How do patients book consultations with me?",
    answer: "Patients can search for you by specialty, view your profile, check availability, and book directly through the platform. You'll receive notifications for new bookings."
  },
  {
    question: "What consultation formats can I offer?",
    answer: "You can offer video consultations, audio calls, secure messaging, or hybrid appointments combining virtual and in-person care based on patient needs."
  },
  {
    question: "How do I issue prescriptions and lab requests?",
    answer: "Use our integrated prescription system to send medications directly to partner pharmacies, and order lab tests that route automatically to diagnostic centers."
  },
  {
    question: "How am I compensated?",
    answer: "You earn performance-based compensation from patient consultations, with transparent fee structures and secure payment processing directly to your account."
  },
  {
    question: "Can I set my own consultation fees?",
    answer: "Yes, you have flexibility to set competitive consultation fees within our platform guidelines, with different rates for various service types."
  },
  {
    question: "How does MHI IntelliCare AI support my practice?",
    answer: "AI provides preliminary patient assessment, suggests differential diagnoses, and sends triage notes before your consultation, helping you deliver more efficient care."
  },
  {
    question: "What support does MHI provide?",
    answer: "We offer comprehensive technical support, training resources, practice management tools, and ongoing assistance to help you succeed on our platform."
  }
];

export default function Physicians() {
  const { data: physiciansHeroImage } = useMediaPosition("hero_physicians");
  
  useSEO({
    title: "Physician Services & Virtual Practice Solutions",
    description: "Join our network of healthcare professionals. Set up virtual practice, access AI diagnostics, telemedicine tools, and performance-based compensation.",
    ogTitle: "Physician Services & Virtual Practice Solutions",
    ogDescription: "Join our network of healthcare professionals with virtual practice setup, AI diagnostics, telemedicine tools, and performance-based compensation.",
    canonical: `${window.location.origin}/physicians`
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
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" data-testid="physicians-hero-title">
                  Expand Your Practice
                  <span className="block text-white/90 text-3xl sm:text-4xl font-medium mt-2">Join the Future of Healthcare Delivery</span>
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed" data-testid="physicians-hero-description">
                  MyHi invites you to join a pioneering group of private physicians dedicated to delivering exceptional virtual healthcare. Transform your practice with our comprehensive digital platform.
                </p>
                
                {/* Key Value Props */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <TrendingUp className="h-8 w-8 text-green-400 mb-2" />
                    <div className="text-2xl font-bold">3x</div>
                    <div className="text-sm text-white/80">Patient Reach</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <Users2 className="h-8 w-8 text-blue-400 mb-2" />
                    <div className="text-2xl font-bold">2000+</div>
                    <div className="text-sm text-white/80">Active Physicians</div>
                  </div>
                </div>
                
                <Link href="/contact#contact-form">
                  <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg" data-testid="physicians-get-started">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Join Our Network
                  </Button>
                </Link>
              </div>
              
              {/* Hero Image - Professional Doctor with Digital Platform */}
              <div className="relative order-first lg:order-last">
                <div className="relative z-10">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                    <img 
                      src={physiciansHeroImage?.mediaUrl || physiciansHeroFallback} 
                      alt={physiciansHeroImage?.mediaAlt || "Professional African doctor using digital healthcare platform"} 
                      className="w-full h-auto object-cover"
                      data-testid="physicians-hero-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Digital Practice Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-primary/10" data-testid="physicians-digital-badge">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-xs font-semibold text-foreground">Digital Practice</div>
                        <div className="text-[10px] text-muted-foreground">Anywhere, Anytime</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Tools Badge */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-primary/10" data-testid="physicians-tools-badge">
                    <div className="flex items-center gap-2">
                      <Brain className="h-6 w-6 text-primary" />
                      <div>
                        <div className="text-xs font-semibold text-foreground">AI-Powered Tools</div>
                        <div className="text-[10px] text-muted-foreground">Enhanced Diagnostics</div>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="physicians-services-title">
                Private Physician Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="physicians-services-description">
                Comprehensive tools and services designed to enhance your medical practice and patient care delivery.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {physicianServices.map((service, index) => (
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

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="physicians-how-it-works-title">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="physicians-how-it-works-description">
                Start your journey with My Health Integral in simple, straightforward steps.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="bg-card rounded-xl p-8 border border-border" data-testid={`physicians-step-${index}`}>
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-6">
                    <span className="text-xl font-bold text-secondary-foreground">{step.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4" data-testid={`physicians-step-title-${index}`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`physicians-step-description-${index}`}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="physicians-benefits-title">
                What You Get
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="physicians-benefits-description">
                Comprehensive benefits designed to enhance your practice and patient care capabilities.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-card rounded-lg border border-border" data-testid={`physicians-benefit-${index}`}>
                    <div className="w-2 h-2 bg-secondary rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-foreground leading-relaxed" data-testid={`physicians-benefit-text-${index}`}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="physicians-faq-title">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="physicians-faq-description">
                Get quick answers to the most common questions from physicians about joining our healthcare provider network.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {physicianFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6" data-testid={`physicians-faq-${index + 1}`}>
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
                <Button variant="outline" className="px-8 py-3" data-testid="physicians-see-all-faqs">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  See All Physician FAQs
                </Button>
                <p className="text-sm text-muted-foreground mt-2">Complete FAQ section available after joining our network</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="physicians-cta-title">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-xl text-white/90 mb-8" data-testid="physicians-cta-description">
                Join our network of healthcare professionals and be part of the digital healthcare revolution.
              </p>
              <Link href="/contact#contact-form">
                <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg" data-testid="physicians-cta-button">
                  Apply to Join
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
