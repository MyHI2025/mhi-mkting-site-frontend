import { useState } from "react";
import {
  UserRound,
  Stethoscope,
  Shield,
  Globe,
  Clock,
  Building2,
  FlaskConical,
  Pill,
  Truck,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useMediaPosition } from "@/hooks/use-media-position";
import heroImageFallback from "@assets/stock_images/african_patient_usin_b1dc2982.jpg";

const personaContent = {
  overview: {
    title: "Revolutionizing Healthcare for Everyone, Everywhere",
    subtitle: "",
    description:
      "Comprehensive, affordable, and accessible healthcare solutions tailored for patients, providers, and everyone in between.",
    primaryCTA: { text: "I'm a Patient", href: "/patients", icon: UserRound },
    secondaryCTA: { text: "I'm a Provider", href: "/providers" },
    icon: Globe,
  },
  patient: {
    title: "Healthcare at Your Fingertips",
    subtitle: "Simple, Secure, Accessible",
    description:
      "Access quality healthcare from home. Schedule consultations, manage prescriptions, track your health records, and connect with providers instantly.",
    primaryCTA: {
      text: "Join Waitlist",
      href: "/contact#contact-form",
      icon: UserRound,
    },
    secondaryCTA: { text: "Learn More", href: "/patients" },
    icon: UserRound,
  },
  physician: {
    title: "Expand Your Practice Digitally",
    subtitle: "Reach More Patients, Anywhere",
    description:
      "Grow your practice with telemedicine, streamlined patient management, and integrated health records. Provide care beyond clinic walls.",
    primaryCTA: {
      text: "Join Waitlist",
      href: "/contact#contact-form",
      icon: Stethoscope,
    },
    secondaryCTA: { text: "View Features", href: "/physicians" },
    icon: Stethoscope,
  },
  hospital: {
    title: "Transform Hospital Operations",
    subtitle: "Comprehensive Healthcare Management",
    description:
      "Integrate departments, optimize patient flow, and enhance care coordination. From admissions to discharge, streamline every process.",
    primaryCTA: {
      text: "Join Waitlist",
      href: "/contact#contact-form",
      icon: Building2,
    },
    secondaryCTA: { text: "Learn More", href: "/hospitals" },
    icon: Building2,
  },
  laboratory: {
    title: "Modernize Lab Services",
    subtitle: "Digital Results, Instant Access",
    description:
      "Connect lab results directly to patients and providers. Reduce turnaround times and improve diagnostic workflows with digital integration.",
    primaryCTA: {
      text: "Join Waitlist",
      href: "/contact#contact-form",
      icon: FlaskConical,
    },
    secondaryCTA: { text: "Learn More", href: "/laboratories" },
    icon: FlaskConical,
  },
  pharmacy: {
    title: "Digital Pharmacy Solutions",
    subtitle: "Prescription Management Made Easy",
    description:
      "Connect with prescribers and patients seamlessly. Manage prescriptions digitally, track inventory, and provide medication counseling remotely.",
    primaryCTA: {
      text: "Join Waitlist",
      href: "/contact#contact-form",
      icon: Pill,
    },
    secondaryCTA: { text: "Learn More", href: "/pharmacies" },
    icon: Pill,
  },
  emergency: {
    title: "Emergency Care Coordination",
    subtitle: "Critical Care, Connected",
    description:
      "Coordinate emergency responses with real-time patient data access. Connect ambulances, hospitals, and specialists for faster, better outcomes.",
    primaryCTA: {
      text: "Join Waitlist",
      href: "/contact#contact-form",
      icon: Truck,
    },
    secondaryCTA: { text: "Learn More", href: "/emergency" },
    icon: Truck,
  },
  insurance: {
    title: "Insurance Integration Platform",
    subtitle: "Claims & Coverage Simplified",
    description:
      "Streamline claims processing, verify coverage instantly, and provide members with seamless access to covered healthcare services.",
    primaryCTA: {
      text: "Join Waitlist",
      href: "/contact#contact-form",
      icon: CreditCard,
    },
    secondaryCTA: { text: "Learn More", href: "/insurance" },
    icon: CreditCard,
  },
};

const userTypes = [
  { key: "overview", label: "Overview", icon: Globe },
  { key: "patient", label: "Patients", icon: UserRound },
  { key: "physician", label: "Physicians", icon: Stethoscope },
  { key: "hospital", label: "Hospitals", icon: Building2 },
  { key: "laboratory", label: "Labs", icon: FlaskConical },
  { key: "pharmacy", label: "Pharmacies", icon: Pill },
  { key: "emergency", label: "Emergency", icon: Truck },
  { key: "insurance", label: "Insurance", icon: CreditCard },
];

export default function Hero() {
  const [activePersona, setActivePersona] = useState("overview");
  const currentPersona =
    personaContent[activePersona as keyof typeof personaContent];
  const PrimaryIcon = currentPersona.primaryCTA.icon;
  const { data: heroImage } = useMediaPosition("hero_home");

  return (
    <section className="relative overflow-hidden py-8 text-white min-h-[90vh] sm:min-h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage?.mediaUrl || heroImageFallback})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 sm:bg-black/40"></div>
      </div>

      {/* Trust Indicators - Responsive Position */}
      <div className="hidden lg:flex absolute top-6 right-6 z-30 flex-col items-end gap-4 text-white/90 text-sm">
        <div className="flex items-center space-x-2" data-testid="trust-hipaa">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="font-medium">HIPAA Compliant</span>
        </div>
        <div className="flex items-center space-x-2" data-testid="trust-global">
          <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="font-medium">Global Platform</span>
        </div>
        <div
          className="flex items-center space-x-2"
          data-testid="trust-available"
        >
          <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="font-medium">24/7 Available</span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Hero Content */}
          <div className="w-full max-w-3xl">
            <div
              className="bg-white/10 backdrop-blur-xl rounded-2xl 
                        p-6 sm:p-8 lg:p-12 
                        border border-white/20 shadow-2xl"
            >
              {/* Trust Indicators - Mobile Only */}
              <div className="lg:hidden mt-6 flex flex-wrap gap-4 text-white/90 text-xs">
                <div
                  className="flex items-center space-x-2"
                  data-testid="trust-hipaa"
                >
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">HIPAA Compliant</span>
                </div>
                <div
                  className="flex items-center space-x-2"
                  data-testid="trust-global"
                >
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">Global Platform</span>
                </div>
                <div
                  className="flex items-center space-x-2"
                  data-testid="trust-available"
                >
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">24/7 Available</span>
                </div>
              </div>

              {/* Heading */}
              <h1
               className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
             font-bold leading-tight break-words"
                data-testid="hero-title"
              >
                <span className="block mb-2">{currentPersona.title}</span>
                <span
                  className="block text-white/90 
                             text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                             font-medium"
                >
                  {currentPersona.subtitle}
                </span>
              </h1>

              {/* Description */}
              <p
                className="text-base sm:text-lg md:text-xl 
                       text-white/90 mb-6 sm:mb-8 
                       leading-relaxed"
                data-testid="hero-description"
              >
                {currentPersona.description}
              </p>

              {/* Overview Tagline */}
              {activePersona === "overview" && (
                <div className="mb-6">
                  <p className="text-sm sm:text-base text-white/80 italic font-medium">
                    Join us as we redefine what healthcare should be.
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 
                          items-stretch sm:items-center 
                          mb-8"
              >
                <Link
                  href={currentPersona.primaryCTA.href}
                  className="w-full sm:w-auto"
                >
                  <Button
                    className="w-full sm:w-auto 
                           bg-white text-primary 
                           px-6 sm:px-8 py-3 sm:py-4 
                           rounded-lg font-semibold 
                           text-base sm:text-lg 
                           hover:bg-white/95 transition-colors 
                           shadow-lg"
                    data-testid="button-primary-cta"
                  >
                    <PrimaryIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    {currentPersona.primaryCTA.text}
                  </Button>
                </Link>

                <Link
                  href={currentPersona.secondaryCTA.href}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto 
                           bg-white/10 text-white 
                           border-2 border-white/30 
                           px-6 sm:px-8 py-3 sm:py-4 
                           rounded-lg font-semibold 
                           text-base sm:text-lg 
                           hover:bg-white/20 transition-colors"
                    data-testid="button-secondary-cta"
                  >
                    {currentPersona.secondaryCTA.text}
                  </Button>
                </Link>
              </div>

              {/* Persona Switcher */}
              <div>
                <div className="mb-3">
                  <span className="text-white/70 text-xs sm:text-sm font-medium">
                    View information for:
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {userTypes.map((type) => {
                    const Icon = type.icon;
                    const isActive = activePersona === type.key;

                    return (
                      <button
                        key={type.key}
                        onClick={() => setActivePersona(type.key)}
                        className={`flex items-center space-x-2 
                                px-3 sm:px-4 py-2 
                                rounded-full transition-all duration-300 
                                text-xs sm:text-sm
                                ${
                                  isActive
                                    ? "bg-white/20 text-white border-2 border-white/40 shadow-lg"
                                    : "bg-white/5 text-white/70 border-2 border-white/10 hover:bg-white/10 hover:text-white/90"
                                }`}
                        data-testid={`persona-${type.key}`}
                      >
                        <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="font-medium">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Empty right column keeps spacing on large screens */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}
