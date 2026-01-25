import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ServiceCard from "@/components/ui/service-card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { useMediaPosition } from "@/hooks/use-media-position";
import { 
  Building2,
  Heart,
  TrendingDown,
  Users,
  BarChart3,
  Shield,
  Clock,
  Target,
  Award,
  Zap,
  Smartphone,
  HeartHandshake,
  ArrowRight,
  Calendar,
  CheckCircle
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import corporatesHeroFallback from "@assets/stock_images/diverse_african_heal_6654566f.jpg";
import aiImg from "../../../../attached_assets/home/bg.png";

const corporateServices = [
  {
    icon: Building2,
    title: "Enterprise Health Platform",
    description: "Comprehensive digital health solution designed specifically for corporate employee wellness programs."
  },
  {
    icon: Heart,
    title: "Employee Wellness Programs",
    description: "Customizable wellness initiatives including preventive care, health screenings, and wellness challenges."
  },
  {
    icon: TrendingDown,
    title: "Healthcare Cost Reduction",
    description: "Reduce healthcare costs by up to 30% through preventive care, early intervention, and care coordination."
  },
  {
    icon: Users,
    title: "Employee Health Management",
    description: "Centralized platform for managing employee health records, benefits, and care coordination."
  },
  {
    icon: BarChart3,
    title: "Health Analytics Dashboard",
    description: "Real-time insights into employee health trends, utilization patterns, and wellness program effectiveness."
  },
  {
    icon: Shield,
    title: "HIPAA-Compliant Security",
    description: "Enterprise-grade security ensuring complete privacy and compliance with healthcare regulations."
  },
  {
    icon: Clock,
    title: "24/7 Employee Support",
    description: "Round-the-clock healthcare support for employees including telemedicine and emergency assistance."
  },
  {
    icon: Target,
    title: "Customizable Benefit Plans",
    description: "Flexible health benefit configurations tailored to your company's specific needs and budget."
  },
  {
    icon: Award,
    title: "Wellness Incentive Programs",
    description: "Gamified wellness programs with rewards and incentives to boost employee engagement and health outcomes."
  },
  {
    icon: Zap,
    title: "Seamless HR Integration",
    description: "Easy integration with existing HR systems, payroll, and employee management platforms."
  },
  {
    icon: Smartphone,
    title: "Mobile Employee App",
    description: "Dedicated mobile app for employees to access health services, track wellness goals, and manage benefits."
  },
  {
    icon: HeartHandshake,
    title: "Mental Health Support",
    description: "Comprehensive mental health services including counseling, stress management, and wellness resources."
  }
];

const benefits = [
  "Reduce healthcare costs by 20-30% through preventive care and early intervention",
  "Improve employee satisfaction and retention with comprehensive health benefits",
  "Increase productivity through better employee health and reduced sick days",
  "Enhance company culture with focus on employee wellness and wellbeing",
  "Streamline benefits administration with automated enrollment and management",
  "Access real-time analytics to optimize health program effectiveness",
  "Ensure regulatory compliance with HIPAA and other healthcare regulations",
  "Scale health benefits efficiently as your company grows and evolves"
];

const corporateFAQs = [
  {
    question: "How can MHI help reduce our company's healthcare costs?",
    answer: "Our platform reduces costs through preventive care programs, early health issue detection, care coordination, and reduced emergency room visits. Most corporate clients see 20-30% reduction in healthcare expenses within the first year through improved employee health outcomes."
  },
  {
    question: "What employee wellness programs are available?",
    answer: "We offer comprehensive wellness programs including health screenings, fitness challenges, nutrition counseling, mental health support, smoking cessation programs, chronic disease management, and personalized health coaching tailored to your workforce needs."
  },
  {
    question: "How does the platform integrate with our existing HR systems?",
    answer: "Our platform seamlessly integrates with major HR systems like Workday, BambooHR, ADP, and others through secure APIs. We handle employee onboarding, benefits enrollment, and maintain synchronized employee data across systems."
  },
  {
    question: "What analytics and reporting capabilities are provided?",
    answer: "Comprehensive dashboards showing employee health trends, program utilization rates, cost savings analysis, wellness program effectiveness, risk assessments, and customizable reports for C-suite and benefits administrators."
  },
  {
    question: "How do employees access their health benefits and services?",
    answer: "Employees access services through our mobile app and web portal, featuring benefit information, telemedicine appointments, wellness program tracking, health goal setting, and direct communication with healthcare providers."
  },
  {
    question: "What mental health support is included for employees?",
    answer: "Our platform includes 24/7 mental health support, licensed counselors, stress management programs, mindfulness resources, crisis intervention, and confidential employee assistance programs (EAP) for comprehensive mental wellness."
  },
  {
    question: "How do you ensure HIPAA compliance and data security?",
    answer: "We maintain enterprise-grade security with end-to-end encryption, role-based access controls, comprehensive audit trails, SOC 2 Type II compliance, and regular security assessments to protect sensitive employee health information."
  },
  {
    question: "What is the implementation timeline for corporate clients?",
    answer: "Implementation typically takes 4-12 weeks depending on company size and complexity. This includes system integration, employee onboarding, training sessions, and customization of wellness programs to match your company culture."
  },
  {
    question: "Can the platform scale with our growing workforce?",
    answer: "Yes, our cloud-based platform scales seamlessly from small businesses to Fortune 500 companies. Pricing and features adapt to your workforce size, with enterprise-grade infrastructure supporting unlimited growth."
  },
  {
    question: "What support is provided during and after implementation?",
    answer: "We provide dedicated account management, comprehensive training for HR teams, employee onboarding support, 24/7 technical assistance, regular program optimization consultations, and ongoing customer success management."
  }
];

export default function Corporates() {
  const { data: corporatesHeroImage } = useMediaPosition("hero_corporates");
  const [ setLocation] = useLocation();
  
  useSEO({
    title: "Corporate Health Solutions - My Health Integral",
    description: "Transform your employee wellness program with our comprehensive corporate health platform. Reduce healthcare costs, improve employee satisfaction, and boost productivity with integrated digital health solutions.",
    ogTitle: "Corporate Health Solutions - My Health Integral",
    ogDescription: "Transform your employee wellness program with our comprehensive corporate health platform. Reduce healthcare costs, improve employee satisfaction, and boost productivity.",
    canonical: `${window.location.origin}/corporates`
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
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Content Column - Left */}
              <div className="flex-1 w-full space-y-6">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight" data-testid="corporates-hero-title">
                  Transform Your Employee Wellness Program
                  <span className="block text-white/90 mt-2">
                    Comprehensive Corporate Health Solutions
                  </span>
                </h1>
                <p className="text-xl text-white/90 max-w-2xl" data-testid="corporates-hero-description">
                  Reduce healthcare costs, improve employee satisfaction, and boost productivity with our integrated digital health platform designed specifically for corporate wellness programs.
                </p>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-6 py-6">
                  <div className="text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1" data-testid="metric-cost">30%</div>
                    <div className="text-sm text-white/80" data-testid="metric-cost-label">Cost Reduction</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1" data-testid="metric-satisfaction">95%</div>
                    <div className="text-sm text-white/80" data-testid="metric-satisfaction-label">Satisfaction</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1" data-testid="metric-support">24/7</div>
                    <div className="text-sm text-white/80" data-testid="metric-support-label">Support</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a  href="https://calendly.com/david-izuogu-myhealthintegral/partnership-call-with-mhi">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 group" data-testid="corporates-schedule-demo">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule Enterprise Demo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  </a>
                   <Link href="/contact#contact-form">
                  <Button variant="outline" size="lg" className="border-white text-primary  hover:bg-white/90 hover:text-primary px-8 py-4" data-testid="corporates-contact-sales">
                    Contact Sales Team
                  </Button>
                  </Link>
                </div>
              </div>
              
              {/* Image Column - Right */}
              <div className="flex-1 w-full lg:block hidden">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={corporatesHeroImage?.mediaUrl || corporatesHeroFallback} 
                    alt={corporatesHeroImage?.mediaAlt || "Diverse African healthcare professionals in corporate wellness setting"} 
                    className="w-full h-96 object-cover"
                    data-testid="corporates-hero-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  {/* Floating Badge - HIPAA Secure */}
                  <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Shield className="h-5 w-5" />
                    <span className="text-sm font-semibold">HIPAA Secure</span>
                  </div>
                  
                  {/* Floating Badge - Employee Wellness */}
                  <div className="absolute bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Heart className="h-5 w-5" />
                    <span className="text-sm font-semibold">Employee Wellness</span>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="corporates-services-title">
                Enterprise Health Solutions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="corporates-services-description">
                Comprehensive digital health platform designed to enhance employee wellness while reducing healthcare costs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {corporateServices.map((service, index) => (
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

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6" data-testid="corporates-benefits-title">
                  Why Leading Companies Choose Our Platform
                </h2>
                <p className="text-lg text-muted-foreground mb-8" data-testid="corporates-benefits-description">
                  Transform your employee wellness program with measurable results and improved health outcomes for your workforce.
                </p>
                <ul className="space-y-4">
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
                </ul>
              </div>
              
              <div className="relative rounded-2xl h-96 overflow-hidden">

  {/* Full background image */}
  <img
    src={aiImg}
    alt="Corporate Wellness Analytics"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay content */}
  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
    <div className="text-center">
      <BarChart3 className="h-16 w-16 text-white mx-auto mb-4" />
      <div className="text-white text-lg font-medium">Corporate Wellness Analytics</div>
      <div className="text-white text-sm mt-2">
        Employee health dashboard and metrics visualization
      </div>
    </div>
  </div>

</div>

            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="corporates-stats-title">
                Proven Results for Corporate Clients
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="corporates-stats-description">
                Join hundreds of companies that have transformed their employee wellness programs with measurable outcomes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center" data-testid="corporates-stat-1">
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">30%</div>
                <div className="text-muted-foreground">Average Healthcare Cost Reduction</div>
              </div>
              
              <div className="text-center" data-testid="corporates-stat-2">
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">85%</div>
                <div className="text-muted-foreground">Employee Satisfaction Rate</div>
              </div>
              
              <div className="text-center" data-testid="corporates-stat-3">
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">40%</div>
                <div className="text-muted-foreground">Reduction in Sick Days</div>
              </div>
              
              <div className="text-center" data-testid="corporates-stat-4">
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Employee Retention Improvement</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="corporates-faq-title">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="corporates-faq-description">
                Common questions from corporate clients about implementing our employee wellness platform.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {corporateFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6" data-testid={`corporates-faq-${index + 1}`}>
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
                <Button variant="outline" className="px-8 py-3" data-testid="corporates-see-all-faqs">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  See All Corporate FAQs
                </Button>
                <p className="text-sm text-muted-foreground mt-2">Complete FAQ section available for corporate partners</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="corporates-cta-title">
                Ready to Transform Your Employee Wellness Program?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="corporates-cta-description">
                Join forward-thinking companies that prioritize employee health and see measurable results in cost savings and productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact#contact-form">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4" data-testid="corporates-get-started">
                    Get Started Today
                  </Button>
                </Link>

                  <a  href="https://calendly.com/david-izuogu-myhealthintegral/partnership-call-with-mhi">
                <Button variant="outline" size="lg" className="border-white text-primary  hover:bg-white/90 hover:text-primary px-8 py-4" data-testid="corporates-request-demo">
                  Request Enterprise Demo
                </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}