import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { useMediaPosition } from "@/hooks/use-media-position";
import {
  TrendingUp,
  Users,
  Globe,
  DollarSign,
  Award,
  Zap,
  Target,
  BarChart3,
  Heart,
  Shield,
  Building,
  Mail,
  Phone,
  Download,
  Play,
  ArrowRight,
} from "lucide-react";
import investorsHeroFallback from "@assets/stock_images/modern_african_hospi_a65c0c82.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const marketStats = [
  {
    icon: DollarSign,
    metric: "$4.5T",
    description: "Global Healthcare Market Size by 2027",
    source: "McKinsey & Company",
  },
  {
    icon: TrendingUp,
    metric: "8.9%",
    description: "Digital Health Market CAGR 2023-2030",
    source: "Grand View Research",
  },
  {
    icon: Users,
    metric: "1.2B+",
    description: "People Lack Access to Quality Healthcare",
    source: "World Health Organization",
  },
  {
    icon: Globe,
    metric: "50%",
    description: "Healthcare Providers Adopting Digital Solutions",
    source: "Deloitte Global",
  },
];

const keyMetrics = [
  {
    icon: Heart,
    title: "Healthcare Impact",
    metric: "Healthcare Access",
    description:
      "Connecting underserved populations to quality care through digital transformation",
    color: "text-red-600",
  },
  {
    icon: Users,
    title: "Market Reach",
    metric: "7 User Types",
    description:
      "Comprehensive ecosystem serving patients, physicians, hospitals, labs, pharmacies, emergency services, and insurance providers",
    color: "text-blue-600",
  },
  {
    icon: Zap,
    title: "Technology Edge",
    metric: "AI-Powered Platform",
    description:
      "Advanced diagnostics, predictive analytics, and personalized healthcare recommendations",
    color: "text-yellow-600",
  },
  {
    icon: Shield,
    title: "Compliance",
    metric: "HIPAA Compliant",
    description:
      "Enterprise-grade security and regulatory compliance across all healthcare operations",
    color: "text-green-600",
  },
];

const competitiveAdvantages = [
  "Comprehensive multi-stakeholder platform addressing entire healthcare ecosystem",
  "AI-powered diagnostic and predictive analytics technology",
  "Global scalability with localized healthcare delivery",
  "Integrated telemedicine, pharmacy, laboratory, and emergency services",
  "Real-time healthcare data integration and interoperability",
  "Performance-based provider compensation model",
  "24/7 healthcare access and emergency coordination",
  "Insurance integration for seamless billing and coverage",
];

const teamHighlights = [
  {
    role: "Healthcare Innovation",
    description:
      "Deep expertise in digital health transformation and global healthcare delivery",
  },
  {
    role: "Technology Leadership",
    description:
      "Proven track record in AI/ML, telemedicine platforms, and healthcare interoperability",
  },
  {
    role: "Business Development",
    description:
      "Extensive network across healthcare providers, insurance companies, and regulatory bodies",
  },
  {
    role: "Global Expansion",
    description:
      "International healthcare market experience and cross-border regulatory compliance",
  },
];

export default function Investors() {
  const { data: investorsHeroImage } = useMediaPosition("hero_investors");
  const [openPitchModal, setOpenPitchModal] = useState(false);
   const [location, setLocation] = useLocation();

  useSEO({
    title: "Investor Relations - My Health Integral",
    description:
      "Join us in revolutionizing global healthcare. Explore investment opportunities in our comprehensive digital health platform serving patients, providers, and healthcare partners worldwide.",
    ogTitle: "Investor Relations - Digital Healthcare Investment Opportunity",
    ogDescription:
      "Invest in the future of healthcare with My Health Integral. Comprehensive platform, proven market opportunity, global scalability.",
    canonical: `${window.location.origin}/investors`,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section - Enhanced with Visual Elements */}
       <section className="relative text-white py-20 overflow-hidden">
  {/* Background Image */}
  <img
    src={investorsHeroImage?.mediaUrl || investorsHeroFallback}
    alt={
      investorsHeroImage?.mediaAlt ||
      "Modern African hospital infrastructure showcasing healthcare innovation"
    }
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Floating Badges */}
  <div className="absolute top-6 right-6 z-20 flex gap-3">
    <div
      className="bg-green-500/90 backdrop-blur text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
      data-testid="badge-high-growth"
    >
      <TrendingUp className="h-5 w-5" />
      <span className="text-sm font-semibold">High Growth</span>
    </div>

    <div
      className="bg-red-500/90 backdrop-blur text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
      data-testid="badge-impact-investment"
    >
      <Heart className="h-5 w-5" />
      <span className="text-sm font-semibold">Impact Investment</span>
    </div>
  </div>

  {/* Content */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Hero Content */}
      <div className="text-left">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          data-testid="investors-hero-title"
        >
          Investing in the Future of
          <span className="block text-white/90 mt-2">
            Global Healthcare
          </span>
        </h1>

        <p
          className="text-xl text-white/90 mb-8 max-w-2xl"
          data-testid="investors-hero-description"
        >
          Join us in revolutionizing healthcare delivery through
          comprehensive digital transformation. My Health Integral is
          building the world's most integrated healthcare ecosystem.
        </p>

        {/* Key Metrics */}
        <div className="flex flex-wrap gap-6 mb-8">
          <div className="text-center">
            <div
              className="text-3xl font-bold"
              data-testid="metric-market-size"
            >
              $4.5T
            </div>
            <div
              className="text-sm text-white/80"
              data-testid="metric-market-size-label"
            >
              Market Size
            </div>
          </div>

          <div className="text-center">
            <div
              className="text-3xl font-bold"
              data-testid="metric-cagr"
            >
              8.9%
            </div>
            <div
              className="text-sm text-white/80"
              data-testid="metric-cagr-label"
            >
              CAGR
            </div>
          </div>

          <div className="text-center">
            <div
              className="text-3xl font-bold"
              data-testid="metric-countries"
            >
              3 Countries
            </div>
            <div
              className="text-sm text-white/80"
              data-testid="metric-countries-label"
            >
              Coverage
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg group"
            data-testid="investors-contact-button"
          >
            <Link href="/contact?type=investor">
              Contact Investor Relations
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

        <Link href="/contact?type=investor">
          <Button
            variant="outline"
            className="bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors"
            data-testid="investors-pitch-button"
            onClick={() => setOpenPitchModal(true)}
          >
            <Play className="mr-2 h-5 w-5" />
            View Pitch Deck
          </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* Market Opportunity */}
        <section className="py-20 section-cream">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="market-opportunity-title"
              >
                Massive Market Opportunity
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                data-testid="market-opportunity-description"
              >
                The global healthcare industry is undergoing digital
                transformation, creating unprecedented opportunities for
                innovative platforms.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {marketStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-8 border border-border text-center"
                    data-testid={`market-stat-${index}`}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div
                      className="text-3xl font-bold text-foreground mb-2"
                      data-testid={`market-metric-${index}`}
                    >
                      {stat.metric}
                    </div>
                    <p
                      className="text-muted-foreground mb-2"
                      data-testid={`market-description-${index}`}
                    >
                      {stat.description}
                    </p>
                    <p
                      className="text-sm text-muted-foreground font-medium"
                      data-testid={`market-source-${index}`}
                    >
                      {stat.source}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Key Metrics & Value Proposition */}
        <section className="py-20 section-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="value-proposition-title"
              >
                Our Value Proposition
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="value-proposition-description"
              >
                Uniquely positioned to capture value across the entire
                healthcare ecosystem.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {keyMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-8 border border-border"
                    data-testid={`key-metric-${index}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${metric.color} bg-current/10`}
                    >
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                    <h3
                      className="text-xl font-semibold text-foreground mb-2"
                      data-testid={`metric-title-${index}`}
                    >
                      {metric.title}
                    </h3>
                    <div
                      className="text-2xl font-bold text-primary mb-4"
                      data-testid={`metric-value-${index}`}
                    >
                      {metric.metric}
                    </div>
                    <p
                      className="text-muted-foreground"
                      data-testid={`metric-description-${index}`}
                    >
                      {metric.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Competitive Advantages */}
        <section className="py-20 section-peach">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="competitive-advantages-title"
              >
                Competitive Advantages
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="competitive-advantages-description"
              >
                Our comprehensive platform and technology stack create
                significant barriers to entry and sustainable competitive moats.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {competitiveAdvantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-card rounded-lg border border-border"
                    data-testid={`advantage-${index}`}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <p
                      className="text-foreground leading-relaxed"
                      data-testid={`advantage-text-${index}`}
                    >
                      {advantage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team & Expertise */}
        <section className="py-20 section-teal-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="team-title"
              >
                World-Class Team & Expertise
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="team-description"
              >
                Our leadership team combines deep healthcare industry knowledge
                with proven technology and business execution experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {teamHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-8 border border-border"
                  data-testid={`team-highlight-${index}`}
                >
                  <h3
                    className="text-xl font-semibold text-foreground mb-4"
                    data-testid={`team-role-${index}`}
                  >
                    {highlight.role}
                  </h3>
                  <p
                    className="text-muted-foreground leading-relaxed"
                    data-testid={`team-description-${index}`}
                  >
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Contact */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-6"
                data-testid="investment-contact-title"
              >
                Ready to Join Our Mission?
              </h2>
              <p
                className="text-xl text-white/90 mb-8"
                data-testid="investment-contact-description"
              >
                Partner with us to transform global healthcare delivery and
                create sustainable value for all stakeholders.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3
                    className="text-lg font-semibold mb-4"
                    data-testid="investor-contact-title"
                  >
                    Investor Relations
                  </h3>
                  <div className="space-y-3 text-white/90">
                    <div
                      className="flex items-center space-x-3"
                      data-testid="investor-email"
                    >
                      <Mail className="h-4 w-4" />
                      <span>investor@myhealthintegral.com</span>
                    </div>
                    <div
                      className="flex items-center space-x-3"
                      data-testid="investor-phone"
                    >
                      <Phone className="h-4 w-4" />
                      <span>+234 814 037 8613</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <h3
                    className="text-lg font-semibold mb-4"
                    data-testid="business-contact-title"
                  >
                    Business Development
                  </h3>
                  <div className="space-y-3 text-white/90">
                    <div
                      className="flex items-center space-x-3"
                      data-testid="business-email"
                    >
                      <Mail className="h-4 w-4" />
                      <span>partnership@myhealthintegral.com</span>
                    </div>
                    <div
                      className="flex items-center space-x-3"
                      data-testid="business-phone"
                    >
                      <Phone className="h-4 w-4" />
                      <span>+234 814 037 8613</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg"
                    data-testid="investors-contact-cta"
                  >
                    Contact Our Team
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="bg-primary-foreground/10 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
                  data-testid="investors-materials-button"
                    onClick={() => {
                                  alert(
                                    "Join our waiting list! Complete the contact form to get notified when materials are available for downloads."
                                  );
                                  setLocation("/contact#contact-form");
                                }}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Materials
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* view pitch deck modal */}
      <Dialog open={openPitchModal} onOpenChange={setOpenPitchModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Investor Information</DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground">
            Contact investors relations form
          </p>

          <DialogFooter className="mt-6">
            <Button asChild>
              <Link href="/contact?type=investor">Okay</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
