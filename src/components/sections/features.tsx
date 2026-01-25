import {
  Brain,
  Network,
  Wifi,
  Video,
  Ambulance,
  Globe,
  Heart,
  Activity,
  Headphones,
  Truck,
} from "lucide-react";
import aiImg from "../../../attached_assets/home/LabImage2.jpg";
import comprehensiveImg from "../../../attached_assets/home/hmo2.jpeg";
import realtimeImg from "../../../attached_assets/home/operation2.png";
import advancedImg from "../../../attached_assets/home/scan.png";
import globalImg from "../../../attached_assets/home/prep.png";
import twentyFourSevenImg from "../../../attached_assets/home/img3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const features = [
  {
    icon: Brain,
    title: "AI-powered health insights & diagnostics",
    description:
      "Harness the power of AI to deliver accurate diagnostics and personalized health recommendations, empowering proactive healthcare decisions.",
    color: "primary",
    image: aiImg,
  },
  {
    icon: Network,
    title: "Comprehensive integration & interoperability",
    description:
      "Smoother collaboration between healthcare providers and patients enhanced by seamless integration with hospital, pharmacy, and laboratory systems.",
    color: "secondary",
    image: comprehensiveImg,
  },
  {
    icon: Wifi,
    title: "Real-time Connectivity",
    description: "Instant access to health services, anytime, anywhere.",
    color: "accent",
    image: realtimeImg,
  },
  {
    icon: Video,
    title: "Advanced Technology",
    description:
      "Cutting-edge solutions tailored to your health and wellness needs.",
    color: "primary",
    image: advancedImg,
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description:
      "Bringing high-quality healthcare to your fingertips, no matter your location.",
    color: "secondary",
    image: globalImg,
  },
  {
    icon: Ambulance,
    title: "24/7 Availability",
    description:
      "Always-on healthcare services with full flexibility for both patients and providers.",
    color: "accent",
    image: twentyFourSevenImg,
  },
];

export default function Features() {
  return (
    <section className="py-20 section-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground mb-6"
            data-testid="features-title"
          >
            Healthcare
          </h2>
          <p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            data-testid="features-description"
          >
            From AI-powered diagnostics to seamless integration, discover how
            we're transforming healthcare delivery with cutting-edge technology
            and human-centered design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClass =
              feature.color === "primary"
                ? "bg-primary/10 text-primary"
                : feature.color === "secondary"
                ? "bg-secondary/10 text-secondary"
                : feature.color === "accent"
                ? "bg-accent/10 text-accent"
                : feature.color === "destructive"
                ? "bg-destructive/10 text-destructive"
                : "bg-primary/10 text-primary";

            return (
              <div
                key={index}
                className="bg-card rounded-xl overflow-hidden border border-border card-hover"
                data-testid={`feature-card-${index}`}
              >
                {/* Feature Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                  {/* Image below everything */}
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />

                  {/* Optional gradient overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-slate-900/10"></div>

                  {/* Foreground content */}
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center">
                      {/* Icon */}
                      <div
                        className={`w-16 h-16 ${colorClass} rounded-xl flex items-center justify-center mx-auto mb-2`}
                      >
                        {/* <Icon className="h-6 w-6" /> */}
                      </div>

                      {/* Small text */}
                      {/* <div className="text-muted-foreground text-sm font-medium">
                                 {feature.title}
                                  </div> */}
                    </div>
                  </div>
                </div>

                {/* Feature Content */}
                <div className="p-8">
                  <h3
                    className="text-xl font-semibold text-foreground mb-4"
                    data-testid={`feature-title-${index}`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-muted-foreground leading-relaxed"
                    data-testid={`feature-description-${index}`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Features Grid */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Enhanced Healthcare Experience
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Additional features that make healthcare more accessible and
              personalized for everyone.
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            spaceBetween={48}
            loop
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation
            className="max-w-6xl mx-auto"
          >
            {[
              {
                icon: Heart,
                title: "Customizable health services",
                description:
                  "Personalized care that adapts to your needs, ensuring a seamless healthcare experience for every patient and provider.",
              },
              {
                icon: Activity,
                title: "Patient health tracking and monitoring",
                description:
                  "Monitor vital signs and health progress in real-time with integrated wearable and mobile health devices.",
              },
              {
                icon: Headphones,
                title: "Telemedicine integration with multi-language support",
                description:
                  "Connect with doctors remotely for convenient consultations in any language of your choice.",
              },
              {
                icon: Truck,
                title: "Emergency care access",
                description:
                  "Immediate access to emergency services when it's needed most.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <SwiperSlide key={index}>
                  <div
                    className="bg-card rounded-lg p-6 border border-border card-hover text-center h-full"
                    data-testid={`secondary-feature-${index}`}
                  >
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-3 text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
