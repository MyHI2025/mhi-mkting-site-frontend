import { useMemo } from "react";
import { useParams, Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/use-seo";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  BookOpen,
  Heart,
  ThumbsUp,
  MessageSquare
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CMSPage } from "@/components/cms/CMSPage";

export default function BlogDetail() {
  const params = useParams();
  const articleSlug = params.id || "";
  
  // Fetch article from database
  const { data: pages = [], isLoading } = useQuery({
    queryKey: [api.public.pages],
    queryFn: () => fetch(api.public.pages).then(res => res.json()),
  });

  const article = useMemo(() => {
    if (!Array.isArray(pages)) return null;
    // Reconstruct full slug: blog/article-slug
    const fullSlug = `blog/${articleSlug}`;
    const page = pages.find((p: any) => p.slug === fullSlug && p.pageType === 'blog');
    if (!page) return null;
    
    return {
      id: page.id,
      title: page.title,
      excerpt: page.description || '',
      content: page.description || '',
      author: page.metadata?.author || 'MHI Team',
      date: page.metadata?.publishedDate || page.createdAt,
      readTime: page.metadata?.readTime || '5 min read',
      category: page.category || 'General',
      userTypes: page.metadata?.userTypes || [],
      topicTags: page.metadata?.topicTags || [page.category].filter(Boolean),
      trending: page.metadata?.trending || false,
    };
  }, [pages, articleSlug]);

  useSEO({
    title: article ? `${article.title} | My Health Integral Blog` : "Article | My Health Integral",
    description: article ? article.excerpt : "Loading article...",
  });

  // Show loading state while fetching
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="animate-pulse">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show not found only after loading completes
  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
              <p className="text-muted-foreground mb-8">
                The article you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/blog">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
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
        {/* Breadcrumb and Back Navigation */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-foreground truncate">{article.title}</span>
            </div>
            <Link href="/blog">
              <Button variant="ghost" className="p-0 h-auto font-normal text-primary hover:text-primary/80" data-testid="back-to-blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Articles
              </Button>
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                      {article.trending && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Trending!
                        </span>
                      )}
                    </div>
                    <span className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {article.date}
                    </span>
                    <span className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Article Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6" data-testid="article-title">
                    {article.title}
                  </h1>

                  {/* Author and Share */}
                  <div className="flex items-center justify-between py-6 border-y border-border mb-8">
                    <div className="flex items-center space-x-3">
                      {/* Author Photo Placeholder */}
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center relative overflow-hidden">
                        <User className="h-6 w-6 text-muted-foreground/60" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors">
                          <div className="text-xs text-muted-foreground/80 font-medium opacity-0 hover:opacity-100 transition-opacity">
                            Photo
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{article.author}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-muted-foreground">Healthcare Writer</p>
                          <span className="text-muted-foreground text-xs">• Author headshot</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" data-testid="share-article">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  {/* User Type Tags */}
                  {article.userTypes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      <span className="text-sm font-medium text-muted-foreground">Relevant for:</span>
                      {article.userTypes.map((userType: string) => (
                        <span key={userType} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {userType}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-xl border border-border p-6 sticky top-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Article Tags</h3>
                    
                    <div className="space-y-3">
                      {article.topicTags.map((tag: string) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{tag}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-medium text-foreground mb-3">Share this article</h4>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Copy Link
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                  {/* Article Hero Image Placeholder */}
                  <div className="relative h-64 md:h-80 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl mb-8 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <div className="text-muted-foreground text-lg font-medium">Article Hero Image</div>
                        <div className="text-muted-foreground text-sm mt-1">Featured image for "{article.title}"</div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-2 rounded">
                      Upload article featured image
                    </div>
                  </div>

                  {/* Article Content - Rendered from CMS */}
                  <div className="prose prose-lg max-w-none" data-testid="article-content">
                    <CMSPage pageId={article.id} />
                  </div>

                  {/* Article Footer */}
                  <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Helpful
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Comment
                        </Button>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Healthcare Experience?</h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of patients and healthcare providers already using MHI to improve healthcare accessibility and quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Get Started with MHI
                </Button>
                <Link href="/blog">
                  <Button variant="outline" className="text-white border-2 border-white/60 bg-white/15 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/25 transition-colors">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Read More Articles
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