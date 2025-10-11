import { UserRound, Stethoscope, Building2, FlaskConical, Pill, Ambulance, Shield, Handshake, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const userTypes = [
  {
    href: "/patients",
    icon: UserRound,
    title: "For Patients",
    description: "Access healthcare services, book appointments, and manage your health records seamlessly.",
    color: "primary",
    testId: "patients"
  },
  {
    href: "/physicians",
    icon: Stethoscope,
    title: "Private Physicians",
    description: "Expand your practice with telemedicine tools and comprehensive patient management.",
    color: "secondary",
    testId: "physicians"
  },
  {
    href: "/hospitals",
    icon: Building2,
    title: "Hospitals",
    description: "Enhance patient care with real-time data integration and telehealth solutions.",
    color: "accent",
    testId: "hospitals"
  },
  {
    href: "/laboratories",
    icon: FlaskConical,
    title: "Medical Labs",
    description: "Streamline test management, reporting, and result delivery processes.",
    color: "primary",
    testId: "laboratories"
  },
  {
    href: "/pharmacies",
    icon: Pill,
    title: "Pharmacies",
    description: "Optimize operations with digital prescriptions and inventory management.",
    color: "secondary",
    testId: "pharmacies"
  },
  {
    href: "/emergency",
    icon: Ambulance,
    title: "Emergency Services",
    description: "Improve response times and coordinate patient care during emergencies.",
    color: "destructive",
    testId: "emergency"
  },
  {
    href: "/insurance",
    icon: Shield,
    title: "Insurance Providers",
    description: "Efficient claims management and preventative care coordination.",
    color: "primary",
    testId: "insurance"
  },
  {
    href: "/contact",
    icon: Handshake,
    title: "Partner with Us",
    description: "Join our ecosystem and help revolutionize healthcare delivery globally.",
    color: "accent",
    special: true,
    testId: "partnership"
  }
];

export default function UserTypes() {
  return (
    <section className="py-20 section-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="user-types-title">
            Tailored Solutions for Every Healthcare Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="user-types-description">
            Choose your role to discover personalized features and services designed specifically for your healthcare journey.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {userTypes.map((userType, index) => {
            const Icon = userType.icon;
            const isSpecial = userType.special;
            
            const gradientClass = isSpecial 
              ? "bg-gradient-to-br from-accent to-accent/80 text-white border-accent/20"
              : "bg-card border-border";
            
            const iconBgClass = isSpecial
              ? "bg-white/10"
              : userType.color === 'primary' ? 'bg-primary/10' :
                userType.color === 'secondary' ? 'bg-secondary/10' :
                userType.color === 'accent' ? 'bg-accent/10' :
                userType.color === 'destructive' ? 'bg-destructive/10' :
                'bg-primary/10';
            
            const iconColorClass = isSpecial
              ? "text-white"
              : userType.color === 'primary' ? 'text-primary' :
                userType.color === 'secondary' ? 'text-secondary' :
                userType.color === 'accent' ? 'text-accent' :
                userType.color === 'destructive' ? 'text-destructive' :
                'text-primary';
            
            const linkColorClass = isSpecial
              ? "text-white font-medium group-hover:text-white/80"
              : userType.color === 'primary' ? 'text-primary font-medium group-hover:text-primary/80' :
                userType.color === 'secondary' ? 'text-secondary font-medium group-hover:text-secondary/80' :
                userType.color === 'accent' ? 'text-accent font-medium group-hover:text-accent/80' :
                userType.color === 'destructive' ? 'text-destructive font-medium group-hover:text-destructive/80' :
                'text-primary font-medium group-hover:text-primary/80';
            
            return (
              <Link key={index} href={userType.href}>
                <div className={`group ${gradientClass} rounded-xl border overflow-hidden card-hover cursor-pointer`} data-testid={`user-type-${userType.testId}`}>
                  <div className="h-48 flex items-center justify-center relative overflow-hidden">
                    <div className={`w-16 h-16 ${iconBgClass} rounded-xl flex items-center justify-center`}>
                      <Icon className={`${iconColorClass} h-8 w-8`} />
                    </div>
                    <div className={`absolute inset-0 ${isSpecial ? 'bg-white/5 group-hover:bg-white/10' : `${iconBgClass.replace('/10', '/5')} group-hover:${iconBgClass}`} transition-colors`}></div>
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-semibold mb-2 ${isSpecial ? 'text-white' : 'text-foreground'}`} data-testid={`user-type-title-${userType.testId}`}>
                      {userType.title}
                    </h3>
                    <p className={`mb-4 ${isSpecial ? 'text-white/90' : 'text-muted-foreground'}`} data-testid={`user-type-description-${userType.testId}`}>
                      {userType.description}
                    </p>
                    <div className={`flex items-center ${linkColorClass}`}>
                      <span>{isSpecial ? 'Get Started' : 'Learn More'}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
