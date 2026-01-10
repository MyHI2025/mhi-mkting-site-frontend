import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CMSPage } from "@/components/cms/CMSPage";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { useSEO } from "@/hooks/use-seo";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  MapPin,
  Clock,
  Building,
  Send,
  Briefcase,
  Heart,
  Users
} from "lucide-react";

interface Page {
  id: string;
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  pageType: string;
  isPublished: boolean;
  metadata?: Record<string, any>;
}

export default function JobDetail() {
  const [, params] = useRoute("/careers/:id");
  const jobId = params?.id;
  const { toast } = useToast();
  
  // Fetch the job page by slug
  const { data: pages, isLoading, error } = useQuery<Page[]>({
    queryKey: [api.public.pages],
    enabled: !!jobId,
  });

  // Construct full slug from jobId (URL has /careers/1, but slug in DB is careers/1)
  const fullSlug = jobId ? `careers/${jobId}` : '';
  const job = Array.isArray(pages) ? pages.find((p: Page) => p.slug === fullSlug && p.pageType === "job") : undefined;

  useSEO({
    title: job ? `${job.title} - Careers | My Health Integral` : "Job Not Found - My Health Integral",
    description: job ? job.description : "Job position not found at My Health Integral.",
  });

  const copyJobLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Job link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually from your browser.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="py-8 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Skeleton className="h-8 w-32" />
            </div>
          </section>
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <Skeleton className="h-12 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-8" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-foreground mb-4">Job Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The job position you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/career">
                <Button data-testid="back-to-careers">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Careers
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const metadata = job.metadata || {};

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Breadcrumb and Back Navigation */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Link href="/career" className="hover:text-foreground transition-colors">
                Careers
              </Link>
              <span>/</span>
              <span className="text-foreground">{job.title}</span>
            </div>
            <Link href="/career">
              <Button variant="ghost" className="p-0 h-auto font-normal text-primary hover:text-primary/80" data-testid="back-to-careers">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Jobs
              </Button>
            </Link>
          </div>
        </section>

        {/* Job Header */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="job-detail-title">
                    {job.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                    {metadata.department && (
                      <span className="flex items-center" data-testid="job-department">
                        <Building className="h-5 w-5 mr-2" />
                        {metadata.department}
                      </span>
                    )}
                    {metadata.location && (
                      <span className="flex items-center" data-testid="job-location">
                        <MapPin className="h-5 w-5 mr-2" />
                        {metadata.location}
                      </span>
                    )}
                    {metadata.type && (
                      <span className="flex items-center" data-testid="job-type">
                        <Clock className="h-5 w-5 mr-2" />
                        {metadata.type}
                      </span>
                    )}
                  </div>

                  {job.description && (
                    <p className="text-lg text-muted-foreground leading-relaxed" data-testid="job-summary">
                      {job.description}
                    </p>
                  )}
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-card rounded-xl border border-border p-6 sticky top-8">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Apply for this Role</h3>
                    
                    <div className="space-y-4">
                      {metadata.applyUrl ? (
                        <a href={metadata.applyUrl} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full" size="lg" data-testid="apply-now-main">
                            <Send className="mr-2 h-5 w-5" />
                            Apply Now
                          </Button>
                        </a>
                      ) : metadata.type === "Internship" ? (
                        <a href="https://forms.gle/5Dq2dj5GaoXF4Q6LA" target="_blank" rel="noopener noreferrer">
                          <Button className="w-full" size="lg" data-testid="apply-now-main">
                            <Send className="mr-2 h-5 w-5" />
                            Apply Now
                          </Button>
                        </a>
                      ) : metadata.type === "Volunteer" ? (
                        <a href="https://forms.gle/aKhjNhp8THXJM9wM6" target="_blank" rel="noopener noreferrer">
                          <Button className="w-full" size="lg" data-testid="apply-now-main">
                            <Send className="mr-2 h-5 w-5" />
                            Apply Now
                          </Button>
                        </a>
                      ) : (
                        <a href={`mailto:recruitment@myhealthintegral.com?subject=Application for ${job.title} Position&body=Dear MHI Recruitment Team,%0A%0AI am interested in applying for the ${job.title} position. Please find my application details below.%0A%0AThank you for considering my application.%0A%0ABest regards,`}>
                          <Button className="w-full" size="lg" data-testid="apply-now-main">
                            <Send className="mr-2 h-5 w-5" />
                            Apply Now
                          </Button>
                        </a>
                      )}
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          Application will be processed within 48 hours
                        </p>
                      </div>
                      
                      <div className="border-t border-border pt-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>Join our mission to transform healthcare</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Details - CMS Content */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {/* Render content from CMS */}
                  <CMSPage pageId={job.id} />
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">About This Role</h3>
                    
                    <div className="space-y-4 text-sm">
                      {metadata.department && (
                        <div>
                          <span className="font-medium text-foreground">Department:</span>
                          <span className="text-muted-foreground ml-2">{metadata.department}</span>
                        </div>
                      )}
                      {metadata.location && (
                        <div>
                          <span className="font-medium text-foreground">Location:</span>
                          <span className="text-muted-foreground ml-2">{metadata.location}</span>
                        </div>
                      )}
                      {metadata.type && (
                        <div>
                          <span className="font-medium text-foreground">Type:</span>
                          <span className="text-muted-foreground ml-2">{metadata.type}</span>
                        </div>
                      )}
                    </div>
                    
                    {metadata.sideDescription && (
                      <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap" data-testid="job-side-description">
                          {metadata.sideDescription}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-medium text-foreground mb-3">Share this job</h4>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={copyJobLink}
                          data-testid="button-copy-link"
                        >
                          Copy Link
                        </Button>
                        <a href={`mailto:?subject=Check out this job at MHI: ${job.title}&body=I thought you might be interested in this ${job.title} position at My Health Integral:%0A%0Ahttps://myhealthintegral.com/career/${job.slug}%0A%0A${job.description}`}>
                          <Button variant="outline" size="sm" className="flex-1" data-testid="button-email-share">
                            Email
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 hero-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
              <p className="text-xl text-white/90 mb-8">
                Take the next step in your career and help us transform healthcare accessibility across Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {metadata.type === "Internship" ? (
                  <a href="https://forms.gle/5Dq2dj5GaoXF4Q6LA" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg" data-testid="apply-bottom">
                      <Send className="mr-2 h-5 w-5" />
                      Apply for {job.title}
                    </Button>
                  </a>
                ) : metadata.type === "Volunteer" ? (
                  <a href="https://forms.gle/aKhjNhp8THXJM9wM6" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg" data-testid="apply-bottom">
                      <Send className="mr-2 h-5 w-5" />
                      Apply for {job.title}
                    </Button>
                  </a>
                ) : (
                  <a href={`mailto:recruitment@myhealthintegral.com?subject=Application for ${job.title} Position&body=Dear MHI Recruitment Team,%0A%0AI am interested in applying for the ${job.title} position. Please find my application details below.%0A%0AThank you for considering my application.%0A%0ABest regards,`}>
                    <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg" data-testid="apply-bottom">
                      <Send className="mr-2 h-5 w-5" />
                      Apply for {job.title}
                    </Button>
                  </a>
                )}
                <Link href="/career">
                  <Button variant="outline" className="text-white border-2 border-white/60 bg-white/15 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/25 transition-colors">
                    <Users className="mr-2 h-5 w-5" />
                    View All Jobs
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
