import { Shield, Users, Globe, Award, CheckCircle2, Lock } from "lucide-react";
import { useMediaPosition } from "@/hooks/use-media-position";
import securityFallback from "@assets/stock_images/professional_african_f0a94615.jpg";
import patientsFallback from "@assets/stock_images/happy_diverse_africa_b5071dc8.jpg";
import teamFallback from "@assets/stock_images/african_medical_prof_fdd4f99d.jpg";

const trustMetrics = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Users",
    color: "text-blue-600"
  },
  {
    icon: Award,
    value: "15+",
    label: "Hospital Partners",
    color: "text-purple-600"
  },
  {
    icon: Globe,
    value: "3",
    label: "Countries Served",
    color: "text-green-600"
  },
  {
    icon: Shield,
    value: "99.9%",
    label: "Uptime Guarantee",
    color: "text-orange-600"
  }
];

const securityFeatures = [
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Full compliance with healthcare data protection standards"
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Bank-level security for all patient communications"
  },
  {
    icon: CheckCircle2,
    title: "ISO 27001 Certified",
    description: "International information security management standards"
  }
];

export default function Trust() {
  const { data: securityImage } = useMediaPosition("trust_section_bg");
  const { data: patientsImage } = useMediaPosition("trust_patients_photo");
  const { data: teamImage } = useMediaPosition("trust_team_photo");
  const { data: hipaaBadge } = useMediaPosition("trust_badge_hipaa");
  const { data: isoBadge } = useMediaPosition("trust_badge_iso");
  const { data: gdprBadge } = useMediaPosition("trust_badge_gdpr");

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden" data-testid="section-trust">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${securityImage?.mediaUrl || securityFallback})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-semibold">Trusted & Secure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="trust-title">
            Trusted by Thousands Across Africa
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="trust-description">
            Join healthcare providers and patients who trust our platform for secure, reliable, and accessible digital healthcare.
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={index} 
                className="bg-background rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-border"
                data-testid={`trust-metric-${index}`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 ${metric.color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Security Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Security Features List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6" data-testid="security-features-title">
              Enterprise-Grade Security
            </h3>
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex gap-4 bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-primary/30 transition-colors"
                  data-testid={`security-feature-${index}`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Trust Imagery */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Patients Image - Admin Managed */}
              <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={patientsImage?.mediaUrl || patientsFallback} 
                  alt={patientsImage?.mediaAlt || "Happy patients trusting digital healthcare platform"} 
                  className="w-full h-64 object-cover"
                  data-testid="trust-patients-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-2xl font-bold">98% Satisfaction</div>
                  <div className="text-sm">Patient Trust Rating</div>
                </div>
              </div>

              {/* Medical Team Image - Admin Managed */}
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={teamImage?.mediaUrl || teamFallback} 
                  alt={teamImage?.mediaAlt || "Professional medical team celebrating success"} 
                  className="w-full h-48 object-cover"
                  data-testid="trust-team-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              </div>

              {/* Compliance Badges - Admin Managed */}
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-primary/20 to-primary/5 flex flex-col items-center justify-center p-6">
                {(hipaaBadge?.mediaUrl || isoBadge?.mediaUrl || gdprBadge?.mediaUrl) ? (
                  <div className="flex flex-wrap justify-center gap-2">
                    {hipaaBadge?.mediaUrl && (
                      <img 
                        src={hipaaBadge.mediaUrl} 
                        alt={hipaaBadge.mediaAlt || "HIPAA Compliance Badge"} 
                        className="h-12 w-auto object-contain"
                        data-testid="badge-hipaa"
                      />
                    )}
                    {isoBadge?.mediaUrl && (
                      <img 
                        src={isoBadge.mediaUrl} 
                        alt={isoBadge.mediaAlt || "ISO 27001 Certification Badge"} 
                        className="h-12 w-auto object-contain"
                        data-testid="badge-iso"
                      />
                    )}
                    {gdprBadge?.mediaUrl && (
                      <img 
                        src={gdprBadge.mediaUrl} 
                        alt={gdprBadge.mediaAlt || "GDPR Compliance Badge"} 
                        className="h-12 w-auto object-contain"
                        data-testid="badge-gdpr"
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <Shield className="h-16 w-16 text-primary mx-auto mb-3" />
                    <div className="text-sm font-bold text-foreground">Certified</div>
                    <div className="text-xs text-muted-foreground">Healthcare Security</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
