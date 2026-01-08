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
  Ambulance,
  MapPin,
  Clock,
  Phone,
  Radio,
  Activity,
  Users,
  Database,
  Smartphone,
  Shield,
  Zap,
  AlertTriangle,
  ArrowRight,
  Heart,
  Target,
  CheckCircle
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import emergencyHeroFallback from "@assets/stock_images/emergency_medical_re_545f4c42.jpg";
import emergencyBenefitFallback from "@assets/stock_images/african_medical_prof_fdd4f99d.jpg";

const emergencyServices = [
  {
    icon: Ambulance,
    title: "Emergency Response Coordination",
    description: "Advanced dispatch and coordination system for rapid emergency response and resource allocation."
  },
  {
    icon: MapPin,
    title: "GPS Tracking and Navigation",
    description: "Real-time GPS tracking of emergency vehicles with optimized routing and traffic integration."
  },
  {
    icon: Clock,
    title: "Response Time Optimization",
    description: "AI-powered algorithms to minimize response times and improve emergency outcome metrics."
  },
  {
    icon: Phone,
    title: "Emergency Communication Hub",
    description: "Centralized communication platform connecting patients, responders, and healthcare facilities."
  },
  {
    icon: Radio,
    title: "Multi-Channel Communication",
    description: "Integrated communication systems supporting radio, cellular, and digital messaging platforms."
  },
  {
    icon: Activity,
    title: "Patient Monitoring During Transport",
    description: "Real-time vital sign monitoring and transmission to receiving healthcare facilities."
  },
  {
    icon: Users,
    title: "Multi-Agency Coordination",
    description: "Seamless coordination between emergency services, hospitals, and healthcare providers."
  },
  {
    icon: Database,
    title: "Emergency Medical Records",
    description: "Instant access to critical patient information and medical history during emergencies."
  },
  {
    icon: Smartphone,
    title: "Mobile Emergency Apps",
    description: "Public-facing emergency apps for incident reporting and real-time emergency assistance."
  },
  {
    icon: Shield,
    title: "Security and Compliance",
    description: "Secure data handling and compliance with emergency services regulations and protocols."
  },
  {
    icon: Zap,
    title: "Critical Alert System",
    description: "Automated critical alert system for mass casualty incidents and emergency notifications."
  },
  {
    icon: AlertTriangle,
    title: "Incident Management",
    description: "Comprehensive incident tracking and management system for operational oversight."
  }
];

const benefits = [
  "Improved response times through AI-powered dispatch optimization and real-time coordination",
  "Enhanced patient outcomes with continuous monitoring and immediate access to medical history",
  "Better resource allocation with real-time tracking and intelligent deployment strategies",
  "Seamless inter-agency coordination improving overall emergency response effectiveness",
  "Reduced operational costs through optimized routing and efficient resource management",
  "Enhanced public safety with comprehensive emergency communication and alert systems",
  "Data-driven insights for continuous improvement of emergency response protocols",
  "Scalable platform supporting growth and integration with regional emergency networks"
];

const emergencyFAQs = [
  {
    question: "How does MHI integrate with existing emergency dispatch systems?",
    answer: "Our platform seamlessly integrates with CAD (Computer-Aided Dispatch) systems, E911 infrastructure, and existing communication networks through standard protocols and APIs, ensuring minimal disruption to current operations."
  },
  {
    question: "What real-time data is available during emergency responses?",
    answer: "Access patient medical history, current medications, allergies, emergency contacts, GPS location, vital signs from connected devices, and real-time communication with receiving hospitals."
  },
  {
    question: "How does the system optimize emergency response times?",
    answer: "AI algorithms analyze traffic patterns, weather conditions, resource availability, and historical data to recommend optimal routes and resource deployment, reducing average response times by up to 30%."
  },
  {
    question: "What communication tools are available for emergency teams?",
    answer: "Multi-channel communication including secure messaging, voice calls, video conferencing, radio integration, and real-time coordination tools connecting all stakeholders during emergencies."
  },
  {
    question: "How do you ensure HIPAA compliance for patient data during emergencies?",
    answer: "End-to-end encryption, role-based access controls, audit trails, and emergency data sharing protocols that maintain HIPAA compliance while enabling life-saving access to critical patient information."
  },
  {
    question: "What happens during system outages or network failures?",
    answer: "Redundant systems, offline capabilities, backup communication channels, and automatic failover protocols ensure continuous operation even during infrastructure disruptions."
  },
  {
    question: "How does the platform coordinate with hospitals and receiving facilities?",
    answer: "Real-time bed availability, specialist on-call status, facility capabilities, and direct communication channels with emergency departments to ensure optimal patient placement and preparation."
  },
  {
    question: "What training and support is provided for emergency personnel?",
    answer: "Comprehensive training programs, simulation exercises, 24/7 technical support, user guides, and ongoing education to ensure effective platform utilization during critical situations."
  },
  {
    question: "Can the system handle mass casualty incidents?",
    answer: "Scalable infrastructure designed for surge capacity, triage protocols, resource coordination across multiple agencies, and incident command integration for large-scale emergency responses."
  },
  {
    question: "What analytics and reporting capabilities are available?",
    answer: "Performance metrics, response time analysis, outcome tracking, resource utilization reports, and compliance documentation to support continuous improvement and regulatory requirements."
  }
];

function EmergencyBenefitSection() {
  const { data: emergencyBenefitImage } = useMediaPosition("benefit_emergency");
  
  return (
    <section className="py-20 section-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Benefit Image */}
          <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={emergencyBenefitImage?.mediaUrl || emergencyBenefitFallback} 
                alt={emergencyBenefitImage?.mediaAlt || "Emergency medical professional responding to critical situation"} 
                className="w-full h-96 object-cover"
                data-testid="emergency-benefit-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              
              {/* Response Time Badge */}
              <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span className="text-sm font-semibold">&lt; 8 Min Response</span>
              </div>
            </div>
          </div>
          
          {/* Benefit Content */}
          <div className="flex-1 w-full space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Ambulance className="h-4 w-4" />
              <span className="text-sm font-semibold">Emergency Care</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Life-Saving Response When Seconds Count
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Coordinate emergency response with GPS tracking, real-time dispatch, and instant medical history access. Save lives with optimized response times and seamless hospital integration.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Instant GPS Location</div>
                  <div className="text-sm text-muted-foreground">Automatic location sharing reduces response time by 45%</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Real-Time Medical History</div>
                  <div className="text-sm text-muted-foreground">Pre-arrival access to critical patient information</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Hospital Pre-Alert</div>
                  <div className="text-sm text-muted-foreground">Emergency departments prepare before ambulance arrives</div>
                </div>
              </li>
            </ul>
            
            <Link href="/contact#contact-form">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold group" data-testid="button-integrate-emergency">
                Integrate Emergency Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Emergency() {
  const { data: emergencyHeroImage } = useMediaPosition("hero_emergency");
  
  useSEO({
    title: "Emergency Services Solutions",
    description: "Advanced emergency response coordination, GPS tracking, real-time dispatch, and comprehensive emergency medical services solutions for rapid patient care.",
    ogTitle: "Emergency Services Solutions - Digital Emergency Response Platform",
    ogDescription: "Transform emergency operations with AI-powered dispatch, GPS tracking, and real-time coordination for life-saving response.",
    canonical: `${window.location.origin}/emergency`
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section - Enhanced with Two-Column Layout */}
        <section className="hero-gradient text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" data-testid="emergency-hero-title">
                  Advanced Emergency Services
                  <span className="block text-white/90 mt-2">Enhance Response Times & Patient Care</span>
                </h1>
                <p className="text-xl text-white/90 mb-8" data-testid="emergency-hero-description">
                  Improve response times and coordinate patient care during emergencies with our comprehensive digital platform designed for emergency medical service providers.
                </p>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white" data-testid="metric-response">&lt;8 Min</div>
                    <div className="text-sm text-white/80" data-testid="metric-response-label">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white" data-testid="metric-coverage">24/7</div>
                    <div className="text-sm text-white/80" data-testid="metric-coverage-label">Coverage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white" data-testid="metric-success">98%</div>
                    <div className="text-sm text-white/80" data-testid="metric-success-label">Success Rate</div>
                  </div>
                </div>
                
                <Link href="/contact#contact-form">
                  <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg" data-testid="emergency-get-started">
                    Enhance Your EMS
                  </Button>
                </Link>
              </div>
              
              {/* Hero Image */}
              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={emergencyHeroImage?.mediaUrl || emergencyHeroFallback} 
                    alt={emergencyHeroImage?.mediaAlt || "Emergency medical response team in action"} 
                    className="w-full h-96 object-cover"
                    data-testid="emergency-hero-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Floating Badges */}
                  <div className="absolute top-6 right-6 bg-white/95 text-foreground px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-semibold">Emergency Ready</span>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 bg-white/95 text-foreground px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold">GPS Enabled</span>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="emergency-services-title">
                Emergency Medical Services Solutions
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="emergency-services-description">
                Comprehensive digital solutions designed to optimize emergency response operations and improve patient outcomes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {emergencyServices.map((service, index) => (
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

        {/* Emergency Benefit Section */}
        <EmergencyBenefitSection />

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="emergency-benefits-title">
                Transform Emergency Response Operations
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="emergency-benefits-description">
                Experience improved response times, enhanced coordination, and better patient outcomes with our emergency services platform.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-card rounded-lg border border-border" data-testid={`emergency-benefit-${index}`}>
                    <div className="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-foreground leading-relaxed" data-testid={`emergency-benefit-text-${index}`}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

     {/* Critical Features */}
<section className="py-20 section-peach">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2
        className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
        data-testid="emergency-features-title"
      >
        Critical Response Features
      </h2>
      <p
        className="text-xl text-muted-foreground max-w-2xl mx-auto"
        data-testid="emergency-features-description"
      >
        Essential features designed specifically for emergency medical services
        and critical care scenarios.
      </p>
    </div>

    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
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
          data-testid="emergency-feature-1"
        >
          <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Clock className="text-destructive h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Sub-4 Minute Response
          </h3>
          <p className="text-muted-foreground">
            AI-optimized dispatch achieving industry-leading response times.
          </p>
        </div>
      </SwiperSlide>

      <SwiperSlide className="h-auto">
        <div
          className="h-full text-center bg-card border border-border rounded-xl p-8"
          data-testid="emergency-feature-2"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Activity className="text-primary h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Live Patient Monitoring
          </h3>
          <p className="text-muted-foreground">
            Real-time vital signs and patient status during transport.
          </p>
        </div>
      </SwiperSlide>

      <SwiperSlide className="h-auto">
        <div
          className="h-full text-center bg-card border border-border rounded-xl p-8"
          data-testid="emergency-feature-3"
        >
          <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MapPin className="text-secondary h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Precise Location Tracking
          </h3>
          <p className="text-muted-foreground">
            GPS accuracy within 3 meters for emergency vehicle dispatch.
          </p>
        </div>
      </SwiperSlide>

      <SwiperSlide className="h-auto">
        <div
          className="h-full text-center bg-card border border-border rounded-xl p-8"
          data-testid="emergency-feature-4"
        >
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Database className="text-accent h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Instant Medical Records
          </h3>
          <p className="text-muted-foreground">
            Immediate access to critical patient history and allergies.
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
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="emergency-faq-title">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="emergency-faq-description">
                Get critical answers about integrating our emergency response platform with your existing systems.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {emergencyFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6" data-testid={`emergency-faq-${index + 1}`}>
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
                <Button variant="outline" className="px-8 py-3" data-testid="emergency-see-all-faqs">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  See All Emergency Services FAQs
                </Button>
                <p className="text-sm text-muted-foreground mt-2">Comprehensive FAQ section available to emergency services partners</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="emergency-cta-title">
                Ready to Save More Lives?
              </h2>
              <p className="text-xl text-white/90 mb-8" data-testid="emergency-cta-description">
                Join emergency services worldwide that are improving response times and patient outcomes through digital innovation.
              </p>
              <Link href="/contact#contact-form">
                <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg" data-testid="emergency-cta-button">
                  Upgrade Your EMS Today
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
