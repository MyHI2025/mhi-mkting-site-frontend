import { useState, useMemo } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { useMediaPosition } from "@/hooks/use-media-position";
import { EditableText } from "@/components/editing/EditableText";
import { EditableImage } from "@/components/editing/EditableImage";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { api } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users,
  Heart,
  Globe,
  Zap,
  MapPin,
  Clock,
  ArrowRight,
  Building,
  Briefcase,
  GraduationCap,
  Coffee,
  Trophy,
  Target,
  Search,
  Filter,
  RotateCcw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import careersHeroFallback from "@assets/stock_images/diverse_african_heal_10fc4146.jpg";

const positionTypes = ["All", "Full-time", "Contract", "Internship", "Hybrid", "Volunteer"];
const locations = ["All", "Abuja/Lagos (Hybrid)", "Remote"];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance, mental health support, and wellness programs for you and your family."
  },
  {
    icon: Globe,
    title: "Remote-First Culture",
    description: "Work from anywhere in Africa with flexible hours and quarterly team meetups in beautiful locations."
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "$2,000 annual learning budget, conference attendance, and access to top-tier training platforms."
  },
  {
    icon: Trophy,
    title: "Competitive Compensation",
    description: "Market-competitive compensation packages and performance-based recognition."
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description: "Unlimited PTO, parental leave, and a culture that respects personal time and family commitments."
  },
  {
    icon: Trophy,
    title: "Impact & Growth",
    description: "Direct impact on millions of lives, rapid career growth, and ownership of meaningful projects."
  }
];

const cultureValues = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Every team member is passionate about transforming healthcare accessibility across Africa and beyond."
  },
  {
    icon: Users,
    title: "Diverse & Inclusive",
    description: "We celebrate diverse perspectives and backgrounds, creating an environment where everyone can thrive."
  },
  {
    icon: Zap,
    title: "Innovation First",
    description: "We encourage experimentation, learning from failures, and pushing boundaries in healthcare technology."
  },
  {
    icon: Building,
    title: "Transparency",
    description: "Open communication, regular feedback, and transparent decision-making processes at all levels."
  }
];

export default function Career() {
  const { data: careersHeroImage } = useMediaPosition("hero_careers");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  // Get all pages including job pages
  const { data: pageData } = useQuery({
    queryKey: [api.public.pages],
    queryFn: () => fetch(api.public.pages).then(res => res.json()),
  });
  
  // Filter job pages from all pages
  const jobPages = useMemo(() => {
    if (!pageData || !Array.isArray(pageData)) return [];
    return pageData.filter((p: any) => p.pageType === "job" && p.isPublished);
  }, [pageData]);
  
  // Extract categories from job pages
  const categories = useMemo(() => {
    if (!jobPages || jobPages.length === 0) return ["All"];
    const depts = Array.from(new Set(
      jobPages.map((job: any) => job.metadata?.department).filter((d: any): d is string => typeof d === 'string')
    ));
    return ["All", ...depts] as string[];
  }, [jobPages]);
  
  const { data: careerSections = [] } = useQuery({
    queryKey: [api.admin.pages, pageData?.find((p: any) => p.slug === "career")?.id, "sections"],
    queryFn: async () => {
      const careerPage = pageData?.find((p: any) => p.slug === "career");
      if (!careerPage) return [];
      
      try {
        return await apiRequest(api.admin.pageSections(careerPage.id), "GET");
      } catch (error) {
        return [];
      }
    },
    enabled: !!pageData,
    retry: false
  });
  
  const careerPageId = pageData?.find((p: any) => p.slug === "career")?.id;
  const heroSection = careerSections.find((s: any) => s.sectionType === "hero");
  const benefitsSection = careerSections.find((s: any) => s.sectionType === "about");

  const filteredJobs = useMemo(() => {
    return jobPages.filter((job: any) => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (job.description || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || job.metadata?.department === selectedCategory;
      const matchesType = selectedType === "All" || job.metadata?.type === selectedType;
      const matchesLocation = selectedLocation === "All" || job.metadata?.location === selectedLocation;
      
      return matchesSearch && matchesCategory && matchesType && matchesLocation;
    });
  }, [jobPages, searchTerm, selectedCategory, selectedType, selectedLocation]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedType("All");
    setSelectedLocation("All");
  };

  useSEO({
    title: "Careers - Join Our Mission | My Health Integral",
    description: "Join the My Health Integral team and help transform healthcare accessibility across Africa. Explore open positions in engineering, design, operations, and more.",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
    <section
  className="relative text-white py-20 overflow-hidden"
  style={{
    backgroundImage: `url(${careersHeroImage?.mediaUrl || careersHeroFallback})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Badges – top right, side by side */}
  <div className="absolute top-6 right-6 z-20 flex gap-3">
    {/* Join Our Team Badge */}
    <div
      className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-primary/10"
      data-testid="careers-team-badge"
    >
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        <div>
          <div className="text-xs font-semibold text-foreground">
            Join Our Team
          </div>
          <div className="text-[10px] text-muted-foreground">
            Growing Together
          </div>
        </div>
      </div>
    </div>

    {/* Make Impact Badge */}
    <div
      className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-primary/10"
      data-testid="careers-impact-badge"
    >
      <div className="flex items-center gap-2">
        <Heart className="h-5 w-5 text-primary" />
        <div>
          <div className="text-xs font-semibold text-foreground">
            Make Impact
          </div>
          <div className="text-[10px] text-muted-foreground">
            Change Lives
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Content Card */}
<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
  <div className="max-w-3xl">
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl p-8 sm:p-10">
      
      <EditableText
        pageId={careerPageId}
        sectionId={heroSection?.id}
        field="title"
        as="h1"
        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
      >
        Join Our Mission to
        <span className="block text-white/90 mt-2">
          Transform Healthcare in Africa
        </span>
      </EditableText>

      <EditableText
        pageId={careerPageId}
        sectionId={heroSection?.id}
        field="description"
        as="p"
        className="text-xl text-white/90 mb-8"
      >
        Be part of a team that's revolutionizing healthcare accessibility.
        Help us build solutions that impact millions of lives.
      </EditableText>

      {/* Metrics */}
      <div className="flex flex-wrap gap-8 mb-10">
        <div>
          <div className="text-3xl font-bold">50+</div>
          <div className="text-sm text-white/70">Open Positions</div>
        </div>
        <div>
          <div className="text-3xl font-bold">3</div>
          <div className="text-sm text-white/70">Countries</div>
        </div>
        <div>
          <div className="text-3xl font-bold">100%</div>
          <div className="text-sm text-white/70">Remote Options</div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-white/95">
          <Briefcase className="mr-2 h-5 w-5" />
          View Open Positions
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
   
   <a href="/about">
        <Button
          variant="outline"
          className="text-white border-2 border-white/60 bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20"
        >
          <Users className="mr-2 h-5 w-5" />
          Learn About Our Culture
        </Button>
        </a>
      </div>

    </div>
  </div>
</div>

</section>

        {/* Open Positions */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="openings-title">
                Open Positions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="openings-description">
                Ready to make a difference? Explore our current job openings and find your perfect role in transforming healthcare.
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="mb-12 bg-card rounded-xl border border-border p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search jobs..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      data-testid="job-search"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Department</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger data-testid="category-filter">
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Employment Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger data-testid="type-filter">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      {positionTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger data-testid="location-filter">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Actions</label>
                  <Button variant="outline" onClick={resetFilters} data-testid="reset-filters" className="w-full">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Showing {filteredJobs.length} of {jobPages.length} jobs</span>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Use filters to refine your search</span>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {filteredJobs.map((job: any) => (
                <div key={job.id} className="bg-card rounded-xl border border-border hover:shadow-lg transition-shadow duration-300" data-testid={`job-${job.id}`}>
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-foreground mb-2" data-testid={`job-title-${job.id}`}>
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                              {job.metadata?.department && (
                                <span className="flex items-center">
                                  <Building className="h-4 w-4 mr-1" />
                                  {job.metadata.department}
                                </span>
                              )}
                              {job.metadata?.location && (
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {job.metadata.location}
                                </span>
                              )}
                              {job.metadata?.type && (
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {job.metadata.type}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed mb-4" data-testid={`job-description-${job.id}`}>
                          {job.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                        <Link href={`/${job.slug}`}>
                          <Button className="px-6 py-3 w-full" data-testid={`apply-${job.id}`}>
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/${job.slug}`}>
                          <Button variant="outline" className="px-6 py-3 w-full" data-testid={`learn-more-${job.id}`}>
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-16">
                <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms to find more opportunities.</p>
                <Button onClick={resetFilters} data-testid="reset-search">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Search
                </Button>
              </div>
            )}

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-6">
                Don't see a role that fits? We're always looking for exceptional talent.
              </p>

              <a href="mailto:recruitment@myhralthintegral.com">
              <Button variant="outline" className="px-8 py-3" data-testid="send-resume">
                Send Us Your Resume
              </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Benefits & Perks */}
        <section className="py-20 section-peach">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <EditableText
                pageId={careerPageId}
                sectionId={benefitsSection?.id}
                field="title"
                as="h2"
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                placeholder="Add benefits section title..."
              >
                {benefitsSection?.content?.title || "Benefits & Perks"}
              </EditableText>
              
              <EditableText
                pageId={careerPageId}
                sectionId={benefitsSection?.id}
                field="subtitle"
                as="p"
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                placeholder="Add benefits description..."
              >
                {benefitsSection?.content?.subtitle || "We believe in taking care of our team so they can focus on taking care of others."}
              </EditableText>
              
              {/* Workplace Benefits Image */}
              <div className="mt-12 mb-8">
                <EditableImage
                  pageId={careerPageId}
                  sectionId={benefitsSection?.id}
                  src={benefitsSection?.content?.imageUrl}
                  alt={benefitsSection?.content?.imageAlt || "Team Benefits & Workplace Culture"}
                  className="h-64 w-full object-cover rounded-xl"
                  placeholder="Add workplace benefits image..."
                />
                {!benefitsSection?.content?.imageUrl && (
                  <div className="relative h-64 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Coffee className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <div className="text-muted-foreground text-lg font-medium">Team Benefits & Workplace Culture</div>
                        <div className="text-muted-foreground text-sm mt-2">Team collaboration, office spaces, remote work setup</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="bg-card rounded-xl p-8 border border-border text-center" data-testid={`benefit-${index}`}>
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="culture-title">
                Our Culture & Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="culture-description">
                Built on shared values that drive everything we do, from product decisions to how we treat each other.
              </p>
              
              {/* Company Culture Images */}
              <div className="grid md:grid-cols-2 gap-6 mt-12 mb-8">
                <div className="relative h-48 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Users className="h-12 w-12 text-primary mx-auto mb-3" />
                      <div className="text-muted-foreground font-medium">Team Collaboration</div>
                      <div className="text-muted-foreground text-xs mt-1">Team meetings & brainstorming</div>
                    </div>
                  </div>
                </div>
                <div className="relative h-48 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Building className="h-12 w-12 text-secondary mx-auto mb-3" />
                      <div className="text-muted-foreground font-medium">Work Environment</div>
                      <div className="text-muted-foreground text-xs mt-1">Modern office & remote spaces</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {cultureValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-card rounded-xl p-8 border border-border" data-testid={`culture-${index}`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="career-cta-title">
                Ready to Transform Healthcare with Us?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="career-cta-description">
                Join a team that's making healthcare accessible, affordable, and effective for millions across Africa and beyond.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg">
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
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