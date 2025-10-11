import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { TeamMember } from "@myhealthintegral/shared";
import { useMediaPosition } from "@/hooks/use-media-position";
import { 
  Heart,
  Globe,
  Users,
  Zap,
  Shield,
  Target,
  Award,
  Linkedin,
  ExternalLink,
  Mail,
  MapPin,
  Calendar
} from "lucide-react";

import founderPortrait from "@assets/stock_images/professional_african_32e7be04.jpg";
import childhoodHospital from "@assets/stock_images/child_sick_hospital__8066777b.jpg";
import motherCare from "@assets/stock_images/elderly_mother_hospi_07a5408b.jpg";
import familyLoss from "@assets/stock_images/african_family_grief_f89fcb8f.jpg";
import digitalTransformation from "@assets/stock_images/digital_healthcare_t_d17eae25.jpg";

const coreValues = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "Every decision we make prioritizes patient outcomes and accessibility to quality healthcare.",
    color: "text-red-600"
  },
  {
    icon: Globe,
    title: "Global Health Equity",
    description: "Breaking down barriers to healthcare access regardless of location, economic status, or background.",
    color: "text-blue-600"
  },
  {
    icon: Zap,
    title: "Innovation Excellence",
    description: "Leveraging cutting-edge technology to solve complex healthcare challenges with simple, effective solutions.",
    color: "text-yellow-600"
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Maintaining the highest standards of data security, privacy, and regulatory compliance in all operations.",
    color: "text-green-600"
  },
  {
    icon: Users,
    title: "Collaborative Healthcare",
    description: "Fostering seamless collaboration between patients, providers, and healthcare partners in our ecosystem.",
    color: "text-purple-600"
  },
  {
    icon: Target,
    title: "Measurable Impact",
    description: "Delivering quantifiable improvements in healthcare outcomes, efficiency, and patient satisfaction.",
    color: "text-orange-600"
  }
];


const milestones = [
  {
    year: "Q1 2024",
    title: "Team Formation & Platform Design",
    description: "Recruited founding volunteer team and initiated digital platform development with full code focus"
  },
  {
    year: "Q2 2024",
    title: "Company Formation & Market Validation",
    description: "Legally registered in UK, developed brand identity, completed digital health market analysis and scaled to 50-volunteer team"
  },
  {
    year: "Q4 2024",
    title: "Informational Website Launch",
    description: "Launched informational website showcasing platform features, value propositions and user types"
  },
  {
    year: "Q1 2025",
    title: "Company Registration in Nigeria",
    description: "Registered company in Nigeria on 17th March 2025 to expand operations and serve the African market"
  },
  {
    year: "Q3 2025",
    title: "Product Validation & User Engagement",
    description: "Completed platform feature validation and launched direct user engagement initiatives"
  },
  {
    year: "Q4 2025",
    title: "Market Launch & Platform Deployment",
    description: "Launching MVP (Patient, Private Physician & Pharmacy modules) with informational website and social media presence"
  }
];

export default function About() {
  useSEO({
    title: "About Us - My Health Integral",
    description: "Learn about My Health Integral's mission to revolutionize global healthcare. Meet our leadership team and discover our commitment to accessible, quality healthcare for everyone.",
    ogTitle: "About My Health Integral - Healthcare Innovation Leaders",
    ogDescription: "Discover our mission to transform healthcare delivery through digital innovation. Meet the team building the future of global healthcare.",
    canonical: `${window.location.origin}/about`
  });

  // Fetch team members from database
  const { data: teamMembers = [], isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: [api.public.team],
  });

  // Fetch media positions
  const { data: heroImage } = useMediaPosition("hero_about");
  const { data: missionImage } = useMediaPosition("about_mission");
  const { data: visionImage } = useMediaPosition("about_vision");
  const { data: valuesImage } = useMediaPosition("about_values");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 relative overflow-hidden">
          {heroImage?.mediaUrl && (
            <div className="absolute inset-0">
              <img 
                src={heroImage.mediaUrl} 
                alt={heroImage.mediaAlt || "About My Health Integral"} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" data-testid="about-hero-title">
                Transforming Healthcare
                <span className="block text-white/90">for Everyone, Everywhere</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto" data-testid="about-hero-description">
                We're building the world's most comprehensive digital healthcare platform, connecting patients, providers, and partners to deliver accessible, quality care globally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact">
                  <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg" data-testid="about-contact-button">
                    <Mail className="mr-2 h-5 w-5" />
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/contact?type=investor">
                  <Button 
                    variant="outline" 
                    className="bg-primary-foreground/10 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
                    data-testid="about-investors-button"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Contact Investor Relations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-20 section-cream">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="who-we-are-title">
                  Who We Are
                </h2>
                <p className="text-xl text-muted-foreground" data-testid="who-we-are-subtitle">
                  Your gateway to revolutionary digital healthcare
                </p>
              </div>
              
              <div className="prose prose-lg mx-auto text-center">
                <p className="text-muted-foreground leading-relaxed mb-8 text-lg" data-testid="who-we-are-description">
                  Combining advanced technology with extensive healthcare expertise, MHI streamlines the complex 
                  landscape of healthcare services, making quality care accessible to everyone, everywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 section-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Mission */}
                <div className="bg-card rounded-2xl overflow-hidden border border-border" data-testid="mission-section">
                  {missionImage?.mediaUrl && (
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={missionImage.mediaUrl} 
                        alt={missionImage.mediaAlt || "Our Mission"} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4" data-testid="mission-title">
                      Our Mission
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg" data-testid="mission-content">
                      Our mission at MHI is to empower both patients and healthcare providers by providing a 
                      technologically advanced platform that simplifies healthcare processes, enhances access 
                      to quality care, and improves overall health outcomes. We strive to bridge critical 
                      healthcare gaps with innovation and user-centric solutions.
                    </p>
                  </div>
                </div>

                {/* Vision */}
                <div className="bg-card rounded-2xl overflow-hidden border border-border" data-testid="vision-section">
                  {visionImage?.mediaUrl && (
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={visionImage.mediaUrl} 
                        alt={visionImage.mediaAlt || "Our Vision"} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4" data-testid="vision-title">
                      Our Vision
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg" data-testid="vision-content">
                      Our vision is to become the global leader in digital health services, transforming the way 
                      healthcare is accessed and delivered worldwide. We aim to make MHI synonymous with trust, 
                      innovation, and efficiency, enabling a future where healthcare is universally accessible 
                      and seamlessly integrated into everyday life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Founder's Why - Redesigned Three-Act Narrative */}
        <section className="relative overflow-hidden">
          {/* Act I: The Vision (Split-Screen Hero) */}
          <div className="relative min-h-[600px] flex flex-col md:flex-row">
            {/* Left: Founder Portrait */}
            <div className="w-full md:w-1/2 relative h-[400px] md:h-auto">
              <img 
                src={founderPortrait} 
                alt="David Izuogu, Founder & CEO" 
                className="absolute inset-0 w-full h-full object-cover"
                data-testid="founder-portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30"></div>
            </div>
            
            {/* Right: The Quote */}
            <div className="w-full md:w-1/2 flex items-center bg-gradient-to-br from-orange-50 to-peach-100 dark:from-orange-950/30 dark:to-peach-950/30 p-8 md:p-16">
              <div className="max-w-xl mx-auto" data-testid="founder-story-intro">
                <h2 className="text-2xl md:text-3xl uppercase tracking-wider text-primary font-bold mb-8" data-testid="founder-story-title">
                  Our Founder's Why
                </h2>
                <blockquote className="mb-8">
                  <p className="text-xl md:text-2xl font-serif leading-relaxed text-foreground mb-6">
                    "Healthcare became personal when I realized that the system designed to heal was actually harming the people I loved most."
                  </p>
                  <footer className="text-lg text-muted-foreground font-medium">
                    — David Izuogu, Founder & CEO
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Act II: The Personal Stories (Full-Width Panels) */}
          <div className="relative">
            {/* Story 1: Childhood Battle - Left Aligned */}
            <div className="relative min-h-[500px] flex items-center" data-testid="founder-story-childhood">
              <div className="absolute inset-0">
                <img 
                  src={childhoodHospital} 
                  alt="Childhood healthcare struggles" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/40"></div>
              </div>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">My Childhood Battle</h3>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    As a constantly sick child, I was taken from hospital to hospital. Each gave different diagnoses 
                    with no reference to previous treatments. The fragmented care made me worse, pushing me toward 
                    life-threatening conditions because healthcare providers couldn't communicate.
                  </p>
                </div>
              </div>
            </div>

            {/* Story 2: Mother's Struggle - Right Aligned */}
            <div className="relative min-h-[500px] flex items-center bg-slate-50 dark:bg-slate-900/30" data-testid="founder-story-mother">
              <div className="absolute inset-0">
                <img 
                  src={motherCare} 
                  alt="Mother's healthcare journey" 
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-slate-50/95 via-slate-50/90 to-slate-50/50 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-900/50"></div>
              </div>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl ml-auto">
                  <div className="inline-flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">My Mother's Struggle</h3>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Hospital after hospital, each doctor knew nothing of her medical history. Three different doctors 
                    prescribed completely different medications for the same condition. Test results went missing, 
                    leaving her with no answers and no treatment.
                  </p>
                </div>
              </div>
            </div>

            {/* Story 3: Aunt's Loss - Left Aligned */}
            <div className="relative min-h-[500px] flex items-center" data-testid="founder-story-aunt">
              <div className="absolute inset-0">
                <img 
                  src={familyLoss} 
                  alt="Family loss and grief" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/50 dark:from-slate-950/95 dark:via-slate-950/85 dark:to-slate-950/50"></div>
              </div>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">My Aunt's Loss</h3>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Living in a rural village, she couldn't access necessary care. No remote monitoring, no way for 
                    doctors to intervene in time. When it became an emergency, no emergency services were available. 
                    Hours later, we lost her to a preventable condition.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Act III: The Turning Point (Dark Dramatic Panel) */}
          <div className="relative bg-slate-900 dark:bg-slate-950 text-white py-24 overflow-hidden" data-testid="founder-story-turning-point">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
              <img 
                src={digitalTransformation} 
                alt="Digital healthcare transformation" 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90"></div>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                  The Turning Point
                </h3>
                <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-12">
                  These aren't just my stories—they're the stories of millions across Nigeria and Africa. 
                  People losing their lives to preventable causes because the healthcare system failed them. 
                  That's when I knew something had to change.
                </p>
                
                {/* Mission Statement with Spotlight Effect */}
                <div className="relative bg-slate-800/60 backdrop-blur-md border border-primary/40 rounded-2xl p-10 md:p-12 shadow-2xl">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wide shadow-lg">
                    Our Mission
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-white mb-6">
                    This is why we built My Health Integral.
                  </p>
                  <p className="text-lg md:text-xl text-slate-100 leading-relaxed mb-8">
                    To ensure no one loses their life to preventable causes, and no one's health is left to chance 
                    due to disjointed, inefficient care. MHI connects patients, doctors, pharmacies, labs, and 
                    emergency services—ensuring everyone receives the care they need, when they need it.
                  </p>
                  
                  {/* Closing Statement */}
                  <div className="pt-8 border-t border-white/20">
                    <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                      Every challenge we've faced has only made us stronger. Every patient we reach, every provider we empower, 
                      reminds us why we exist. <span className="text-primary-foreground bg-primary px-3 py-1 rounded shadow-md">
                      MHI isn't just a platform—it's a movement to rewrite the healthcare narrative in Nigeria and Africa.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 section-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              {valuesImage?.mediaUrl && (
                <div className="max-w-3xl mx-auto mb-8">
                  <img 
                    src={valuesImage.mediaUrl} 
                    alt={valuesImage.mediaAlt || "Our Core Values"} 
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="values-title">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="values-description">
                The principles that guide every decision we make and every solution we build.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-card rounded-xl p-8 border border-border" data-testid={`value-${index}`}>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${value.color} bg-current/10`}>
                      <Icon className={`h-6 w-6 ${value.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4" data-testid={`value-title-${index}`}>
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`value-description-${index}`}>
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 section-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="team-title">
                Leadership Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="team-description">
                Meet the visionary leaders driving healthcare transformation and building the future of digital health.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {teamLoading ? (
                <div className="text-center py-12 text-muted-foreground">Loading team members...</div>
              ) : teamMembers.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No team members to display.</div>
              ) : (
                <div className="grid md:grid-cols-2 gap-12">
                  {teamMembers.map((member, index) => {
                    // Parse achievements from JSON if it's a string
                    const achievements = Array.isArray(member.achievements) 
                      ? member.achievements 
                      : (typeof member.achievements === 'string' 
                          ? JSON.parse(member.achievements) 
                          : []);
                    
                    return (
                      <div key={member.id} className="bg-card rounded-2xl overflow-hidden border border-border text-center" data-testid={`team-member-${index}`}>
                        {/* Professional Photo */}
                        <div className="relative h-64 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                          {member.photoUrl ? (
                            <img 
                              src={member.photoUrl} 
                              alt={member.photoAlt || `${member.firstName} ${member.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-24 h-24 bg-white/80 dark:bg-slate-700/80 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                                  <Users className="h-12 w-12 text-primary" />
                                </div>
                                <div className="text-muted-foreground text-sm font-medium">Professional Headshot</div>
                                <div className="text-muted-foreground text-xs mt-1">{member.firstName} {member.lastName} - {member.role}</div>
                              </div>
                            </div>
                          )}
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-primary/5"></div>
                        </div>
                        
                        {/* Member Content */}
                        <div className="p-8">
                          <h3 className="text-2xl font-bold text-foreground mb-2" data-testid={`member-name-${index}`}>
                            {member.title ? `${member.title} ` : ''}{member.firstName} {member.lastName}
                          </h3>
                          <p className="text-lg text-primary font-semibold mb-4" data-testid={`member-role-${index}`}>
                            {member.role}
                          </p>
                          {member.bio && (
                            <p className="text-muted-foreground leading-relaxed mb-6" data-testid={`member-bio-${index}`}>
                              {member.bio}
                            </p>
                          )}
                          
                          {/* Achievements */}
                          {achievements.length > 0 && (
                            <div className="mb-6">
                              <h4 className="text-sm font-semibold text-foreground mb-3">Key Expertise</h4>
                              <div className="flex flex-wrap gap-2 justify-center">
                                {achievements.map((achievement: string, achievementIndex: number) => (
                                  <span 
                                    key={achievementIndex} 
                                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                                    data-testid={`member-achievement-${index}-${achievementIndex}`}
                                  >
                                    {achievement}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* LinkedIn Link */}
                          {member.linkedin && (
                            <a 
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                              data-testid={`member-linkedin-${index}`}
                            >
                              <Linkedin className="h-4 w-4" />
                              <span>LinkedIn Profile</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 section-teal-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="timeline-title">
                Our Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="timeline-description">
                Key milestones in our mission to transform global healthcare delivery.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto relative">
              {/* Center vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/40 via-primary/80 to-primary/40 hidden md:block"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => {
                  const isLeft = index % 2 === 0;
                  
                  return (
                    <div 
                      key={index} 
                      className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
                      data-testid={`milestone-${index}`}
                    >
                      {/* Content Card */}
                      <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                        <div className="bg-card rounded-xl p-6 border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full" data-testid={`milestone-year-${index}`}>
                              {milestone.year}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors" data-testid={`milestone-title-${index}`}>
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed" data-testid={`milestone-description-${index}`}>
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Center dot */}
                      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10">
                        <div className="w-full h-full rounded-full bg-primary animate-pulse"></div>
                      </div>
                      
                      {/* Empty space on opposite side */}
                      <div className="hidden md:block w-5/12"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="about-cta-title">
                Join Our Mission
              </h2>
              <p className="text-xl text-white/90 mb-8" data-testid="about-cta-description">
                Whether you're a patient seeking better care, a healthcare provider looking to expand your reach, 
                or a partner ready to transform healthcare delivery—we'd love to work with you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg" data-testid="about-contact-cta">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/patients">
                  <Button 
                    variant="outline" 
                    className="bg-primary-foreground/10 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
                    data-testid="about-patients-cta"
                  >
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}