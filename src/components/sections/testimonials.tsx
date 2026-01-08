import { Star, MapPin, Quote } from "lucide-react";
import { useMediaPosition } from "@/hooks/use-media-position";
import patientFallback from "@assets/stock_images/dabi.jpg";
import providerFallback from "@assets/stock_images/professional_african_9c97e616.jpg";
import adminFallback from "@assets/stock_images/professional_african_aa1cf976.jpg";

const testimonials = [
  {
    rating: 5,
    quote: "Quality healthcare to me means having access to healthcare services at my fingertips. Thanks to MHI, I do not have to worry about that.",
    author: "Nwabueze Dabeluchukwu",
    role: "Patient",
    location: "Lagos, Nigeria",
    mediaKey: "testimonial_patient",
    fallback: patientFallback,
    alt: "Happy patient testimonial headshot"
  },
  {
    rating: 5,
    quote: "I love the fact that I can get quality access to healthcare at the comfort of my home. Kudos to MHI!!",
    author: "Joy Akpojiyovwi",
    role: "Healthcare Provider",
    location: "Abuja, Nigeria",
    mediaKey: "testimonial_provider",
    fallback: providerFallback,
    alt: "Professional physician testimonial headshot"
  },
  {
    rating: 5,
    quote: "MHI provides top-notch healthcare services at affordable prices. The platform has transformed how we deliver care.",
    author: "David Johnson",
    role: "Hospital Administrator",
    location: "Accra, Ghana",
    mediaKey: "testimonial_admin",
    fallback: adminFallback,
    alt: "Hospital administrator testimonial headshot"
  }
];

export default function Testimonials() {
  const patientPhoto = useMediaPosition(testimonials[0].mediaKey);
  const providerPhoto = useMediaPosition(testimonials[1].mediaKey);
  const adminPhoto = useMediaPosition(testimonials[2].mediaKey);
  
  const testimonialPhotos = [patientPhoto.data, providerPhoto.data, adminPhoto.data];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background Quote Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <Quote className="absolute top-20 left-10 w-64 h-64 text-primary" />
        <Quote className="absolute bottom-20 right-10 w-64 h-64 text-primary rotate-180" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">Rated 4.9/5 by Our Community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="testimonials-title">
            Trusted by Healthcare Professionals and Patients
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="testimonials-description">
            Real stories from real people experiencing better healthcare through My Health Integral.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const photo = testimonialPhotos[index];
            
            return (
              <div 
                key={index} 
                className="bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" 
                data-testid={`testimonial-${index}`}
              >
                {/* Star Rating - Prominent */}
                <div className="flex items-center gap-1 mb-6" data-testid={`testimonial-rating-${index}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-muted-foreground">
                    {testimonial.rating}.0
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-foreground leading-relaxed mb-6 text-base" data-testid={`testimonial-quote-${index}`}>
                  <Quote className="w-8 h-8 text-primary/20 mb-2" />
                  <p className="italic">"{testimonial.quote}"</p>
                </blockquote>
                
                {/* Author Info with Professional Headshot */}
                <div className="flex items-center pt-6 border-t border-border">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20 mr-4 flex-shrink-0">
                    <img 
                      src={photo?.mediaUrl || testimonial.fallback} 
                      alt={photo?.mediaAlt || testimonial.alt} 
                      className="w-full h-full object-cover"
                      data-testid={`testimonial-photo-${index}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground" data-testid={`testimonial-author-${index}`}>
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`testimonial-role-${index}`}>
                      {testimonial.role}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground" data-testid={`testimonial-location-${index}`}>
                      <MapPin className="w-3 h-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-full px-8 py-4">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-sm ring-2 ring-background">
                50K+
              </div>
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground">Join 50,000+ Happy Users</div>
              <div className="text-sm text-muted-foreground">Experience healthcare transformation today</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
