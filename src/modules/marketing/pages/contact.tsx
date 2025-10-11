import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useLocation, Link } from "wouter";
import { useLiveChat } from "@/components/ui/live-chat-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { api } from '@/lib/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, MessageSquare, Calendar, HelpCircle, User, Stethoscope, Building2, FlaskConical, Pill, Ambulance, Shield, ArrowRight, Heart } from "lucide-react";
import { useMediaPosition } from "@/hooks/use-media-position";
import { useSEO } from "@/hooks/use-seo";
import contactHeroFallback from "@assets/stock_images/professional_african_422d811a.jpg";
import { TITLE_OPTIONS } from "@myhealthintegral/shared";

const contactSchema = z.object({
  title: z.string().optional().refine((val) => !val || TITLE_OPTIONS.includes(val as any), {
    message: "Please select a valid title"
  }),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  organization: z.string().optional(),
  country: z.string().min(1, "Please select your country"),
  city: z.string().min(2, "City must be at least 2 characters"),
  userType: z.string().min(1, "Please select your user type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const investorContactSchema = contactSchema.extend({
  organization: z.string().min(2, "Organization is required for investor inquiries"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const userTypes = [
  { value: "pharmacy", label: "Pharmacy" },
  { value: "patient", label: "Patient" },
  { value: "laboratory", label: "Medical Diagnostic" },
  { value: "hospital", label: "Hospital or Clinic" },
  { value: "physician", label: "Health Professional" },
  { value: "hmo", label: "HMO" },
  { value: "emergency", label: "EMS Provider" },
  { value: "business", label: "Corporates or Businesses" },
  { value: "investor", label: "Investor" },
  { value: "partner", label: "Potential Partner" },
  { value: "other", label: "Other" },
];

const userTypeFAQSections = [
  {
    icon: User,
    title: "Patient FAQs",
    description: "Common questions from patients about using our digital health platform",
    link: "/patients",
    preview: "How do I access my health records? Is telemedicine available? How secure is my data?"
  },
  {
    icon: Stethoscope,
    title: "Physician FAQs", 
    description: "Questions from healthcare providers about practice integration and patient management",
    link: "/physicians",
    preview: "How does EMR integration work? What are the consultation fees? How do I manage virtual appointments?"
  },
  {
    icon: Building2,
    title: "Hospital FAQs",
    description: "Hospital administrators' questions about system implementation and patient flow",
    link: "/hospitals", 
    preview: "What's required for enterprise integration? How does staff training work? What are the implementation timelines?"
  },
  {
    icon: FlaskConical,
    title: "Laboratory FAQs",
    description: "Medical lab questions about test integration and result management",
    link: "/laboratories",
    preview: "How do we integrate lab systems? What test types are supported? How are results transmitted?"
  },
  {
    icon: Pill,
    title: "Pharmacy FAQs", 
    description: "Pharmacy partners' questions about prescription management and delivery services",
    link: "/pharmacies",
    preview: "How does prescription processing work? What's the revenue model? How do we handle controlled substances?"
  },
  {
    icon: Ambulance,
    title: "Emergency Services FAQs",
    description: "Emergency services questions about response coordination and patient data access",
    link: "/emergency",
    preview: "How does dispatch integration work? What patient data is available? How do you ensure HIPAA compliance?"
  },
  {
    icon: Shield,
    title: "Insurance FAQs",
    description: "Insurance providers' questions about claims processing and member engagement",
    link: "/insurance", 
    preview: "How does claims automation work? What fraud detection capabilities exist? How do you support value-based care?"
  },
  {
    icon: Heart,
    title: "Corporate FAQs",
    description: "Corporate clients' questions about employee wellness programs and healthcare cost reduction",
    link: "/corporates", 
    preview: "How can MHI reduce healthcare costs? What wellness programs are available? How does HR integration work?"
  }
];

export default function Contact() {
  const { toast } = useToast();
  const { openChat } = useLiveChat();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: heroImage } = useMediaPosition("hero_contact");
  
  // Check if this is an investor contact form
  const [location] = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const isInvestorForm = urlParams.get('type') === 'investor';

  useSEO({
    title: isInvestorForm ? "Investor Relations - Contact Us" : "Contact Us",
    description: isInvestorForm 
      ? "Explore investment opportunities in digital healthcare innovation. Contact us to learn about our funding rounds, business model, and growth projections."
      : "Get in touch with My Health Integral. We're here 24/7 to help transform your healthcare experience. Contact us to learn more about our comprehensive digital health solutions.",
    ogTitle: isInvestorForm ? "Investor Relations - Partner with My Health Integral" : "Contact My Health Integral - We're Always Here to Help",
    ogDescription: isInvestorForm 
      ? "Join us in transforming global healthcare. Explore investment opportunities with My Health Integral."
      : "Ready to revolutionize your healthcare experience? Contact us 24/7. Our team is here to answer your questions and help you get started.",
    canonical: `${window.location.origin}/contact${isInvestorForm ? '?type=investor' : ''}`
  });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(isInvestorForm ? investorContactSchema : contactSchema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organization: "",
      country: "",
      city: "",
      userType: isInvestorForm ? "investor" : "",
      message: isInvestorForm ? "I'm interested in learning more about investment opportunities with My Health Integral. Please provide information about your current funding round, business model, and growth projections." : "",
    },
  });

  // Ensure userType is always "investor" when in investor mode
  useEffect(() => {
    if (isInvestorForm) {
      form.setValue('userType', 'investor', { shouldValidate: false });
    }
  }, [isInvestorForm, form]);

  // Scroll to form if hash is present, otherwise scroll to top
  useEffect(() => {
    if (window.location.hash === '#contact-form') {
      setTimeout(() => {
        const element = document.getElementById('contact-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch(api.public.contact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Network error" }));
        throw new Error(error.error || error.message || "Failed to send message");
      }

      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-primary h-10 w-10" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="contact-success-title">
                Thank You for Reaching Out!
              </h1>
              <p className="text-xl text-muted-foreground mb-8" data-testid="contact-success-message">
                We've received your message and will get back to you within 24 hours. Our team is excited to learn more about how we can help transform your healthcare journey.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)} 
                variant="outline"
                data-testid="contact-send-another"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section - Enhanced with Professional Imagery */}
        <section className="hero-gradient text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" data-testid="contact-hero-title">
                  {isInvestorForm ? "Investor Relations" : "Get in Touch"}
                  <span className="block text-white/90 mt-2">
                    {isInvestorForm ? "Partner with Us in Healthcare Innovation" : "Let's Transform Healthcare Together"}
                  </span>
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-2xl" data-testid="contact-hero-description">
                  {isInvestorForm 
                    ? "Explore investment opportunities in the next generation of digital healthcare. Join us as we scale our platform to transform healthcare accessibility worldwide."
                    : "Ready to revolutionize your healthcare experience? We'd love to hear from you. Contact us to learn more about how My Health Integral can meet your specific needs."
                  }
                </p>
                
                {/* Key Metrics / Trust Indicators */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white" data-testid="metric-available">24/7</div>
                    <div className="text-sm text-white/80" data-testid="metric-available-label">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white" data-testid="metric-response">&lt;24h</div>
                    <div className="text-sm text-white/80" data-testid="metric-response-label">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white" data-testid="metric-dedicated">100%</div>
                    <div className="text-sm text-white/80" data-testid="metric-dedicated-label">Dedicated</div>
                  </div>
                </div>
                
                <Link href="#contact-form">
                  <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg" data-testid="contact-cta-button">
                    {isInvestorForm ? "Start Conversation" : "Get Started"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              {/* Hero Image with Floating Badges */}
              <div className="relative lg:block hidden">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={heroImage?.mediaUrl || contactHeroFallback} 
                    alt={heroImage?.mediaAlt || "Professional African healthcare team ready to assist you"} 
                    className="w-full h-auto object-cover"
                    data-testid="contact-hero-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent"></div>
                </div>
                
                {/* 24/7 Support Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-primary/10" data-testid="contact-support-badge">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs font-semibold text-foreground">24/7 Support</div>
                      <div className="text-[10px] text-muted-foreground">Always Available</div>
                    </div>
                  </div>
                </div>
                
                {/* Always Here Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-primary/10" data-testid="contact-care-badge">
                  <div className="flex items-center gap-2">
                    <Heart className="h-6 w-6 text-primary" />
                    <div>
                      <div className="text-xs font-semibold text-foreground">Always Here</div>
                      <div className="text-[10px] text-muted-foreground">We Care About You</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section id="contact-form" className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card rounded-xl p-8 border border-border relative overflow-hidden">
                {/* Healthcare Support Image Placeholder */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-primary/10 rounded-bl-3xl flex items-center justify-center">
                  <HelpCircle className="h-8 w-8 text-primary/30" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="contact-form-title">
                  {isInvestorForm ? "Investment Inquiry" : "Join the Waitlist"}
                </h2>
                
                {isInvestorForm && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6" data-testid="investor-info">
                    <h3 className="font-semibold text-foreground mb-2">Investment Opportunities</h3>
                    <p className="text-sm text-muted-foreground">
                      We're currently seeking strategic investors to accelerate our mission of transforming global healthcare. 
                      Share your investment criteria and we'll provide detailed information about our current funding round.
                    </p>
                  </div>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                              <FormControl>
                                <SelectTrigger data-testid="select-title">
                                  <SelectValue placeholder="Select title" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {TITLE_OPTIONS.map((title) => (
                                  <SelectItem key={title} value={title}>
                                    {title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="First name" 
                                {...field} 
                                data-testid="input-first-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Last name" 
                                {...field} 
                                data-testid="input-last-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="your.email@example.com" 
                              {...field} 
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="+1 (555) 123-4567" 
                                {...field} 
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{isInvestorForm ? "Investment Firm / Organization *" : "Organization"}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={isInvestorForm ? "Your investment firm or organization" : "Your organization name"} 
                                {...field} 
                                data-testid="input-organization"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-country">
                                  <SelectValue placeholder="Select your country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="afghanistan">Afghanistan</SelectItem>
                                <SelectItem value="albania">Albania</SelectItem>
                                <SelectItem value="algeria">Algeria</SelectItem>
                                <SelectItem value="andorra">Andorra</SelectItem>
                                <SelectItem value="angola">Angola</SelectItem>
                                <SelectItem value="antigua-and-barbuda">Antigua and Barbuda</SelectItem>
                                <SelectItem value="argentina">Argentina</SelectItem>
                                <SelectItem value="armenia">Armenia</SelectItem>
                                <SelectItem value="australia">Australia</SelectItem>
                                <SelectItem value="austria">Austria</SelectItem>
                                <SelectItem value="azerbaijan">Azerbaijan</SelectItem>
                                <SelectItem value="bahamas">Bahamas</SelectItem>
                                <SelectItem value="bahrain">Bahrain</SelectItem>
                                <SelectItem value="bangladesh">Bangladesh</SelectItem>
                                <SelectItem value="barbados">Barbados</SelectItem>
                                <SelectItem value="belarus">Belarus</SelectItem>
                                <SelectItem value="belgium">Belgium</SelectItem>
                                <SelectItem value="belize">Belize</SelectItem>
                                <SelectItem value="benin">Benin</SelectItem>
                                <SelectItem value="bhutan">Bhutan</SelectItem>
                                <SelectItem value="bolivia">Bolivia</SelectItem>
                                <SelectItem value="bosnia-and-herzegovina">Bosnia and Herzegovina</SelectItem>
                                <SelectItem value="botswana">Botswana</SelectItem>
                                <SelectItem value="brazil">Brazil</SelectItem>
                                <SelectItem value="brunei">Brunei</SelectItem>
                                <SelectItem value="bulgaria">Bulgaria</SelectItem>
                                <SelectItem value="burkina-faso">Burkina Faso</SelectItem>
                                <SelectItem value="burundi">Burundi</SelectItem>
                                <SelectItem value="cabo-verde">Cabo Verde</SelectItem>
                                <SelectItem value="cambodia">Cambodia</SelectItem>
                                <SelectItem value="cameroon">Cameroon</SelectItem>
                                <SelectItem value="canada">Canada</SelectItem>
                                <SelectItem value="central-african-republic">Central African Republic</SelectItem>
                                <SelectItem value="chad">Chad</SelectItem>
                                <SelectItem value="chile">Chile</SelectItem>
                                <SelectItem value="china">China</SelectItem>
                                <SelectItem value="colombia">Colombia</SelectItem>
                                <SelectItem value="comoros">Comoros</SelectItem>
                                <SelectItem value="congo-democratic-republic">Congo (Democratic Republic)</SelectItem>
                                <SelectItem value="congo-republic">Congo (Republic)</SelectItem>
                                <SelectItem value="costa-rica">Costa Rica</SelectItem>
                                <SelectItem value="croatia">Croatia</SelectItem>
                                <SelectItem value="cuba">Cuba</SelectItem>
                                <SelectItem value="cyprus">Cyprus</SelectItem>
                                <SelectItem value="czech-republic">Czech Republic</SelectItem>
                                <SelectItem value="denmark">Denmark</SelectItem>
                                <SelectItem value="djibouti">Djibouti</SelectItem>
                                <SelectItem value="dominica">Dominica</SelectItem>
                                <SelectItem value="dominican-republic">Dominican Republic</SelectItem>
                                <SelectItem value="east-timor">East Timor</SelectItem>
                                <SelectItem value="ecuador">Ecuador</SelectItem>
                                <SelectItem value="egypt">Egypt</SelectItem>
                                <SelectItem value="el-salvador">El Salvador</SelectItem>
                                <SelectItem value="equatorial-guinea">Equatorial Guinea</SelectItem>
                                <SelectItem value="eritrea">Eritrea</SelectItem>
                                <SelectItem value="estonia">Estonia</SelectItem>
                                <SelectItem value="eswatini">Eswatini</SelectItem>
                                <SelectItem value="ethiopia">Ethiopia</SelectItem>
                                <SelectItem value="fiji">Fiji</SelectItem>
                                <SelectItem value="finland">Finland</SelectItem>
                                <SelectItem value="france">France</SelectItem>
                                <SelectItem value="gabon">Gabon</SelectItem>
                                <SelectItem value="gambia">Gambia</SelectItem>
                                <SelectItem value="georgia">Georgia</SelectItem>
                                <SelectItem value="germany">Germany</SelectItem>
                                <SelectItem value="ghana">Ghana</SelectItem>
                                <SelectItem value="greece">Greece</SelectItem>
                                <SelectItem value="grenada">Grenada</SelectItem>
                                <SelectItem value="guatemala">Guatemala</SelectItem>
                                <SelectItem value="guinea">Guinea</SelectItem>
                                <SelectItem value="guinea-bissau">Guinea-Bissau</SelectItem>
                                <SelectItem value="guyana">Guyana</SelectItem>
                                <SelectItem value="haiti">Haiti</SelectItem>
                                <SelectItem value="honduras">Honduras</SelectItem>
                                <SelectItem value="hungary">Hungary</SelectItem>
                                <SelectItem value="iceland">Iceland</SelectItem>
                                <SelectItem value="india">India</SelectItem>
                                <SelectItem value="indonesia">Indonesia</SelectItem>
                                <SelectItem value="iran">Iran</SelectItem>
                                <SelectItem value="iraq">Iraq</SelectItem>
                                <SelectItem value="ireland">Ireland</SelectItem>
                                <SelectItem value="israel">Israel</SelectItem>
                                <SelectItem value="italy">Italy</SelectItem>
                                <SelectItem value="ivory-coast">Ivory Coast</SelectItem>
                                <SelectItem value="jamaica">Jamaica</SelectItem>
                                <SelectItem value="japan">Japan</SelectItem>
                                <SelectItem value="jordan">Jordan</SelectItem>
                                <SelectItem value="kazakhstan">Kazakhstan</SelectItem>
                                <SelectItem value="kenya">Kenya</SelectItem>
                                <SelectItem value="kiribati">Kiribati</SelectItem>
                                <SelectItem value="kuwait">Kuwait</SelectItem>
                                <SelectItem value="kyrgyzstan">Kyrgyzstan</SelectItem>
                                <SelectItem value="laos">Laos</SelectItem>
                                <SelectItem value="latvia">Latvia</SelectItem>
                                <SelectItem value="lebanon">Lebanon</SelectItem>
                                <SelectItem value="lesotho">Lesotho</SelectItem>
                                <SelectItem value="liberia">Liberia</SelectItem>
                                <SelectItem value="libya">Libya</SelectItem>
                                <SelectItem value="liechtenstein">Liechtenstein</SelectItem>
                                <SelectItem value="lithuania">Lithuania</SelectItem>
                                <SelectItem value="luxembourg">Luxembourg</SelectItem>
                                <SelectItem value="madagascar">Madagascar</SelectItem>
                                <SelectItem value="malawi">Malawi</SelectItem>
                                <SelectItem value="malaysia">Malaysia</SelectItem>
                                <SelectItem value="maldives">Maldives</SelectItem>
                                <SelectItem value="mali">Mali</SelectItem>
                                <SelectItem value="malta">Malta</SelectItem>
                                <SelectItem value="marshall-islands">Marshall Islands</SelectItem>
                                <SelectItem value="mauritania">Mauritania</SelectItem>
                                <SelectItem value="mauritius">Mauritius</SelectItem>
                                <SelectItem value="mexico">Mexico</SelectItem>
                                <SelectItem value="micronesia">Micronesia</SelectItem>
                                <SelectItem value="moldova">Moldova</SelectItem>
                                <SelectItem value="monaco">Monaco</SelectItem>
                                <SelectItem value="mongolia">Mongolia</SelectItem>
                                <SelectItem value="montenegro">Montenegro</SelectItem>
                                <SelectItem value="morocco">Morocco</SelectItem>
                                <SelectItem value="mozambique">Mozambique</SelectItem>
                                <SelectItem value="myanmar">Myanmar</SelectItem>
                                <SelectItem value="namibia">Namibia</SelectItem>
                                <SelectItem value="nauru">Nauru</SelectItem>
                                <SelectItem value="nepal">Nepal</SelectItem>
                                <SelectItem value="netherlands">Netherlands</SelectItem>
                                <SelectItem value="new-zealand">New Zealand</SelectItem>
                                <SelectItem value="nicaragua">Nicaragua</SelectItem>
                                <SelectItem value="niger">Niger</SelectItem>
                                <SelectItem value="nigeria">Nigeria</SelectItem>
                                <SelectItem value="north-korea">North Korea</SelectItem>
                                <SelectItem value="north-macedonia">North Macedonia</SelectItem>
                                <SelectItem value="norway">Norway</SelectItem>
                                <SelectItem value="oman">Oman</SelectItem>
                                <SelectItem value="pakistan">Pakistan</SelectItem>
                                <SelectItem value="palau">Palau</SelectItem>
                                <SelectItem value="palestine">Palestine</SelectItem>
                                <SelectItem value="panama">Panama</SelectItem>
                                <SelectItem value="papua-new-guinea">Papua New Guinea</SelectItem>
                                <SelectItem value="paraguay">Paraguay</SelectItem>
                                <SelectItem value="peru">Peru</SelectItem>
                                <SelectItem value="philippines">Philippines</SelectItem>
                                <SelectItem value="poland">Poland</SelectItem>
                                <SelectItem value="portugal">Portugal</SelectItem>
                                <SelectItem value="qatar">Qatar</SelectItem>
                                <SelectItem value="romania">Romania</SelectItem>
                                <SelectItem value="russia">Russia</SelectItem>
                                <SelectItem value="rwanda">Rwanda</SelectItem>
                                <SelectItem value="saint-kitts-and-nevis">Saint Kitts and Nevis</SelectItem>
                                <SelectItem value="saint-lucia">Saint Lucia</SelectItem>
                                <SelectItem value="saint-vincent-and-grenadines">Saint Vincent and the Grenadines</SelectItem>
                                <SelectItem value="samoa">Samoa</SelectItem>
                                <SelectItem value="san-marino">San Marino</SelectItem>
                                <SelectItem value="sao-tome-and-principe">Sao Tome and Principe</SelectItem>
                                <SelectItem value="saudi-arabia">Saudi Arabia</SelectItem>
                                <SelectItem value="senegal">Senegal</SelectItem>
                                <SelectItem value="serbia">Serbia</SelectItem>
                                <SelectItem value="seychelles">Seychelles</SelectItem>
                                <SelectItem value="sierra-leone">Sierra Leone</SelectItem>
                                <SelectItem value="singapore">Singapore</SelectItem>
                                <SelectItem value="slovakia">Slovakia</SelectItem>
                                <SelectItem value="slovenia">Slovenia</SelectItem>
                                <SelectItem value="solomon-islands">Solomon Islands</SelectItem>
                                <SelectItem value="somalia">Somalia</SelectItem>
                                <SelectItem value="south-africa">South Africa</SelectItem>
                                <SelectItem value="south-korea">South Korea</SelectItem>
                                <SelectItem value="south-sudan">South Sudan</SelectItem>
                                <SelectItem value="spain">Spain</SelectItem>
                                <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                                <SelectItem value="sudan">Sudan</SelectItem>
                                <SelectItem value="suriname">Suriname</SelectItem>
                                <SelectItem value="sweden">Sweden</SelectItem>
                                <SelectItem value="switzerland">Switzerland</SelectItem>
                                <SelectItem value="syria">Syria</SelectItem>
                                <SelectItem value="taiwan">Taiwan</SelectItem>
                                <SelectItem value="tajikistan">Tajikistan</SelectItem>
                                <SelectItem value="tanzania">Tanzania</SelectItem>
                                <SelectItem value="thailand">Thailand</SelectItem>
                                <SelectItem value="togo">Togo</SelectItem>
                                <SelectItem value="tonga">Tonga</SelectItem>
                                <SelectItem value="trinidad-and-tobago">Trinidad and Tobago</SelectItem>
                                <SelectItem value="tunisia">Tunisia</SelectItem>
                                <SelectItem value="turkey">Turkey</SelectItem>
                                <SelectItem value="turkmenistan">Turkmenistan</SelectItem>
                                <SelectItem value="tuvalu">Tuvalu</SelectItem>
                                <SelectItem value="uganda">Uganda</SelectItem>
                                <SelectItem value="ukraine">Ukraine</SelectItem>
                                <SelectItem value="united-arab-emirates">United Arab Emirates</SelectItem>
                                <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                                <SelectItem value="united-states">United States</SelectItem>
                                <SelectItem value="uruguay">Uruguay</SelectItem>
                                <SelectItem value="uzbekistan">Uzbekistan</SelectItem>
                                <SelectItem value="vanuatu">Vanuatu</SelectItem>
                                <SelectItem value="vatican-city">Vatican City</SelectItem>
                                <SelectItem value="venezuela">Venezuela</SelectItem>
                                <SelectItem value="vietnam">Vietnam</SelectItem>
                                <SelectItem value="yemen">Yemen</SelectItem>
                                <SelectItem value="zambia">Zambia</SelectItem>
                                <SelectItem value="zimbabwe">Zimbabwe</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your city" 
                                {...field} 
                                data-testid="input-city"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {!isInvestorForm && (
                      <FormField
                        control={form.control}
                        name="userType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>I am a... *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-user-type">
                                  <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {userTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {/* Hidden userType field for investor forms */}
                    {isInvestorForm && (
                      <input type="hidden" {...form.register('userType')} value="investor" />
                    )}

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{isInvestorForm ? "Investment Inquiry Details *" : "Message *"}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={isInvestorForm 
                                ? "Please share your investment criteria, target sectors, typical check size, and specific areas of interest in healthcare technology..."
                                : "Tell us about your needs, questions, or how we can help you..."
                              }
                              className="min-h-[120px]"
                              {...field} 
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={contactMutation.isPending}
                      data-testid="button-submit-contact"
                    >
                      {contactMutation.isPending ? "Sending..." : (isInvestorForm ? "Submit Investment Inquiry" : "Send Message")}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Healthcare Communication Image Placeholder */}
                <div className="relative h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl overflow-hidden mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Phone className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <div className="text-muted-foreground text-sm font-medium">Healthcare Communication</div>
                      <div className="text-muted-foreground text-xs mt-1">Support team or contact imagery</div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    Upload communication image
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="contact-info-title">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8" data-testid="contact-info-description">
                    We're here to help you transform your healthcare experience. Reach out to us through any of the channels below, and our team will get back to you promptly.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4" data-testid="contact-email">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                      <a href="mailto:info@myhealthintegral.com" className="text-primary hover:underline">info@myhealthintegral.com</a>
                      <p className="text-muted-foreground text-sm">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4" data-testid="contact-phone">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-secondary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                      <a href="tel:+2348140378613" className="text-primary hover:underline block">+234 814 037 8613</a>
                      <div className="flex items-center space-x-4 mt-2">
                        <a href="https://wa.me/2348140378613" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium" data-testid="whatsapp-link">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          WhatsApp
                        </a>
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">Monday - Friday, 8AM - 6PM WAT</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4" data-testid="contact-consultation">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="text-accent h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">General Enquiry</h3>
                      <p className="text-muted-foreground text-sm mb-2">Looking to learn more about our services or schedule a consultation?</p>
                      <a 
                        href="https://calendly.com/david-izuogu-myhealthintegral/partnership-call-with-mhi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                        data-testid="book-consultation-link"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Book a Consultation
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4" data-testid="contact-support">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="text-blue-600 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Customer Support</h3>
                      <p className="text-muted-foreground text-sm mb-2">Get instant support through our AI-powered chat service</p>
                      <button 
                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                        data-testid="customer-support-chat"
                        onClick={openChat}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Start Live Chat
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4" data-testid="contact-location">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-orange-600 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Visit Us</h3>
                      <div className="mb-3">
                        <p className="text-muted-foreground">Beckley Avenue, Millenium Estate, Gbagada, Lagos, Nigeria</p>
                        <p className="text-muted-foreground text-sm">Operational Headquaters & Innovation Hub</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Verulam Way, Cambridge, England</p>
                        <p className="text-muted-foreground text-sm">Administrative Headquaters</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4" data-testid="contact-hours">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground text-sm">Emergency support: 24/7</p>
                    </div>
                  </div>
                </div>

                {/* Quick Response Promise */}
                <div className="bg-muted/30 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="text-primary h-6 w-6" />
                    <h3 className="font-semibold text-foreground">Quick Response Promise</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We value your time and are committed to responding to all inquiries within 24 hours. For urgent matters, our team is available 24/7 to ensure you receive the support you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Type Specific FAQs */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Healthcare Support Team Image Placeholder */}
            <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden mb-16">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <div className="text-muted-foreground text-lg font-medium">Role-Specific FAQs</div>
                  <div className="text-muted-foreground text-sm mt-1">Find answers tailored to your specific healthcare role</div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-2 rounded">
                Upload FAQ guidance image
              </div>
            </div>
            
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="contact-faq-title">
                Role-Specific Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="contact-faq-description">
                Get answers tailored to your specific role in the healthcare ecosystem. Click on your role below to see relevant FAQs.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userTypeFAQSections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <Link key={index} href={section.link}>
                    <div 
                      className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer group h-full"
                      data-testid={`faq-section-${section.link.replace('/', '')}`}
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="ml-3 flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {section.title}
                          </h3>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4">
                        {section.description}
                      </p>
                      
                      <div className="border-t border-border pt-4">
                        <p className="text-xs text-muted-foreground/80 italic">
                          Preview: {section.preview}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground mb-4">
                Need help with something else? Our support team is here to help.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="sm" data-testid="general-support-button">
                  <Mail className="mr-2 h-4 w-4" />
                  General Support
                </Button>
                <Button variant="outline" size="sm" data-testid="live-chat-button" onClick={openChat}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Live Chat
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
