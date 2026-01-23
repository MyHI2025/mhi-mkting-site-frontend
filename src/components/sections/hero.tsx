import { useState } from "react";
import { UserRound, Stethoscope, Shield, Globe, Clock, Building2, FlaskConical, Pill, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useMediaPosition } from "@/hooks/use-media-position";
import heroImageFallback from "@assets/stock_images/african_patient_usin_b1dc2982.jpg";

const personaContent = {
  overview: {
    title: "Revolutionizing Healthcare for Everyone, Everywhere",
    subtitle: "",
    description: "Comprehensive, affordable, and accessible healthcare solutions tailored for patients, providers, and everyone in between.",
    primaryCTA: { text: "I'm a Patient", href: "/patients", icon: UserRound },
    secondaryCTA: { text: "I'm a Provider", href: "/providers" },
    icon: Globe
  },
  patient: {
    title: "Healthcare at Your Fingertips",
    subtitle: "Simple, Secure, Accessible",
    description: "Access quality healthcare from home. Schedule consultations, manage prescriptions, track your health records, and connect with providers instantly.",
    primaryCTA: { text: "Join Waitlist", href: "/contact#contact-form", icon: UserRound },
    secondaryCTA: { text: "Learn More", href: "/patients" },
    icon: UserRound
  },
  physician: {
    title: "Expand Your Practice Digitally",
    subtitle: "Reach More Patients, Anywhere",
    description: "Grow your practice with telemedicine, streamlined patient management, and integrated health records. Provide care beyond clinic walls.",
    primaryCTA: { text: "Join Waitlist", href: "/contact#contact-form", icon: Stethoscope },
    secondaryCTA: { text: "View Features", href: "/physicians" },
    icon: Stethoscope
  },
  hospital: {
    title: "Transform Hospital Operations",
    subtitle: "Comprehensive Healthcare Management",
    description: "Integrate departments, optimize patient flow, and enhance care coordination. From admissions to discharge, streamline every process.",
    primaryCTA: { text: "Join Waitlist", href: "/contact#contact-form", icon: Building2 },
    secondaryCTA: { text: "Learn More", href: "/hospitals" },
    icon: Building2
  },
  laboratory: {
    title: "Modernize Lab Services",
    subtitle: "Digital Results, Instant Access",
    description: "Connect lab results directly to patients and providers. Reduce turnaround times and improve diagnostic workflows with digital integration.",
    primaryCTA: { text: "Join Waitlist", href: "/contact#contact-form", icon: FlaskConical },
    secondaryCTA: { text: "Learn More", href: "/laboratories" },
    icon: FlaskConical
  },
  pharmacy: {
    title: "Digital Pharmacy Solutions",
    subtitle: "Prescription Management Made Easy",
    description: "Connect with prescribers and patients seamlessly. Manage prescriptions digitally, track inventory, and provide medication counseling remotely.",
    primaryCTA: { text: "Join Waitlist", href: "/contact#contact-form", icon: Pill },
    secondaryCTA: { text: "Learn More", href: "/pharmacies" },
    icon: Pill
  },
  emergency: {
    title: "Emergency Care Coordination",
    subtitle: "Critical Care, Connected",
    description: "Coordinate emergency responses with real-time patient data access. Connect ambulances, hospitals, and specialists for faster, better outcomes.",
    primaryCTA: { text: "Join Waitlist", href: "/contact#contact-form", icon: Truck },
    secondaryCTA: { text: "Learn More", href: "/emergency" },
    icon: Truck
  },
  insurance: {
    title: "Insurance Integration Platform",
    subtitle: "Claims & Coverage Simplified",
    description: "Streamline claims processing, verify coverage instantly, and provide members with seamless access to covered healthcare services.",
    primaryCTA: { text: "Join Waitlist", href: "/contact#contact-form", icon: CreditCard },
    secondaryCTA: { text: "Learn More", href: "/insurance" },
    icon: CreditCard
  }
};

const userTypes = [
  { key: 'overview', label: 'Overview', icon: Globe },
  { key: 'patient', label: 'Patients', icon: UserRound },
  { key: 'physician', label: 'Physicians', icon: Stethoscope },
  { key: 'hospital', label: 'Hospitals', icon: Building2 },
  { key: 'laboratory', label: 'Labs', icon: FlaskConical },
  { key: 'pharmacy', label: 'Pharmacies', icon: Pill },
  { key: 'emergency', label: 'Emergency', icon: Truck },
  { key: 'insurance', label: 'Insurance', icon: CreditCard }
];

export default function Hero() {
  const [activePersona, setActivePersona] = useState('overview');
  const currentPersona = personaContent[activePersona as keyof typeof personaContent];
  const PrimaryIcon = currentPersona.primaryCTA.icon;
  const { data: heroImage } = useMediaPosition("hero_home");

  return (
    <section className="hero-gradient text-white relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-black/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" data-testid="hero-title">
              <span className="block mb-2">{currentPersona.title}</span>
              <span className="block text-white/90 text-3xl sm:text-4xl lg:text-5xl font-medium">{currentPersona.subtitle}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed max-w-4xl" data-testid="hero-description">
              {currentPersona.description}
            </p>
            
            {/* Enhanced tagline for overview */}
            {activePersona === 'overview' && (
              <div className="mb-6">
                <p className="text-lg text-white/80 italic font-medium">
                  Join us as we redefine what healthcare should be.
                </p>
              </div>
            )}
            
            {/* Primary CTA buttons for active persona */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
              <Link href={currentPersona.primaryCTA.href}>
                <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg min-w-[200px]" data-testid="button-primary-cta">
                  <PrimaryIcon className="mr-2 h-5 w-5" />
                  {currentPersona.primaryCTA.text}
                </Button>
              </Link>
              <Link href={currentPersona.secondaryCTA.href}>
                <Button 
                  variant="outline" 
                  className="bg-primary-foreground/10 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors min-w-[200px]"
                  data-testid="button-secondary-cta"
                >
                  {currentPersona.secondaryCTA.text}
                </Button>
              </Link>
            </div>
            
            {/* Persona Switcher */}
            <div className="mb-8">
              <div className="text-center lg:text-left mb-4">
                <span className="text-white/70 text-sm font-medium">View information for:</span>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {userTypes.map((type) => {
                  const Icon = type.icon;
                  const isActive = activePersona === type.key;
                  return (
                    <button
                      key={type.key}
                      onClick={() => setActivePersona(type.key)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-white/20 text-white border-2 border-white/40 shadow-lg' 
                          : 'bg-white/5 text-white/70 border-2 border-white/10 hover:bg-white/10 hover:text-white/90'
                      }`}
                      data-testid={`persona-${type.key}`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 text-white/80">
              <div className="flex items-center space-x-2" data-testid="trust-hipaa">
                <Shield className="h-5 w-5" />
                <span className="font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2" data-testid="trust-global">
                <Globe className="h-5 w-5" />
                <span className="font-medium">Global Platform</span>
              </div>
              <div className="flex items-center space-x-2" data-testid="trust-available">
                <Clock className="h-5 w-5" />
                <span className="font-medium">24/7 Available</span>
              </div>
            </div>
          </div>

          {/* Hero Image - Professional Healthcare Moment */}
          <div className="relative order-first lg:order-last">
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                <img 
                  src={heroImage?.mediaUrl || heroImageFallback} 
                  alt={heroImage?.mediaAlt || "Patient using telemedicine for healthcare consultation"} 
                  className="w-full h-auto object-cover"
                  data-testid="hero-image"
                />
                {/* Gradient overlay for better text readability on floating badges */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Trust Badge - Floating */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-primary/10" data-testid="hero-trust-badge">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-xs font-semibold text-foreground">HIPAA Compliant</div>
                    <div className="text-[10px] text-muted-foreground">Secure & Private</div>
                  </div>
                </div>
              </div>
              
              {/* Stats Badge - Floating */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-primary/10" data-testid="hero-stats-badge">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-xs text-muted-foreground">Patients Connected</div>
                </div>
              </div>
              
              {/* 24/7 Availability Badge - Floating */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg border border-primary/10" data-testid="hero-availability-badge">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}