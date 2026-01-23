import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { useMediaPosition } from "@/hooks/use-media-position";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Play,
  BookOpen,
  Video,
  TrendingUp,
  Heart,
  Stethoscope,
  Shield,
  Globe,
  Search,
  Filter,
  Award,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  blogArticles,
  userTypes,
  topicCategories,
  filterArticles,
} from "@/data/blog";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { VideoContent } from "@myhi2025/shared";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import blogHeroFallback from "@assets/stock_images/professional_african_70f2d164.jpg";

export default function Blog() {
  const { data: heroBlogImage } = useMediaPosition("hero_blog");
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("All User Types");
  const [selectedTopicCategory, setSelectedTopicCategory] =
    useState("All Topics");
  const [trackedVideos, setTrackedVideos] = useState<Set<string>>(new Set());

  const { data: videos = [], isLoading: videosLoading } = useQuery<
    VideoContent[]
  >({
    queryKey: [api.public.videos],
  });

  // Fetch blog articles from database
  const { data: pages = [], isLoading: articlesLoading } = useQuery({
    queryKey: [api.public.pages],
    queryFn: () => fetch(api.public.pages).then((res) => res.json()),
  });

  // Filter blog articles from pages and convert to article format
  const dbArticles = useMemo(() => {
    if (!Array.isArray(pages)) return [];
    return pages
      .filter((p: any) => p.pageType === "blog" && p.isPublished)
      .map((p: any) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.description || "",
        content: p.description || "",
        author: p.metadata?.author || "MHI Team",
        date: p.metadata?.publishedDate || p.createdAt,
        readTime: p.metadata?.readTime || "5 min read",
        category: p.category || "General",
        userTypes: p.metadata?.userTypes || [],
        topicTags: p.metadata?.topicTags || [p.category].filter(Boolean),
        image: p.featuredImage || "",
        featured: p.metadata?.featured || false,
        trending: p.metadata?.trending || false,
      }));
  }, [pages]);

  // Use database articles
  const articles = dbArticles;

  // Scroll to top when component mounts or location changes to fix navigation issue
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Track video views when they're displayed
  const trackVideoView = async (videoId: string) => {
    if (trackedVideos.has(videoId)) return;

    try {
      const response = await fetch(api.public.videoView(videoId), {
        method: "POST",
      });
      if (response.ok) {
        setTrackedVideos((prev) => {
          const newSet = new Set(prev);
          newSet.add(videoId);
          return newSet;
        });
      } else {
        console.error(
          `Failed to track video view for ${videoId}: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Failed to track video view:", error);
    }
  };

  // Get featured article (first article marked as featured)
  const featuredArticle = useMemo(() => {
    return articles.find((article) => article.featured) || articles[0];
  }, [articles]);

  // Filter articles based on search and filters
  const filteredArticles = useMemo(() => {
    return filterArticles(
      articles,
      searchTerm,
      selectedUserType,
      selectedTopicCategory
    ).filter((article) => article.id !== featuredArticle?.id); // Exclude featured article from main list
  }, [
    articles,
    searchTerm,
    selectedUserType,
    selectedTopicCategory,
    featuredArticle,
  ]);

  console.log("filteredArticles:", filteredArticles);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedUserType("All User Types");
    setSelectedTopicCategory("All Topics");
  };

  const scrollToFilters = () => {
    const filtersSection = document.getElementById("filters-section");
    if (filtersSection) {
      filtersSection.scrollIntoView({ behavior: "smooth", block: "center" });
      // Briefly highlight the filters section
      filtersSection.classList.add("ring-2", "ring-primary", "ring-opacity-50");
      setTimeout(() => {
        filtersSection.classList.remove(
          "ring-2",
          "ring-primary",
          "ring-opacity-50"
        );
      }, 2000);
    }
  };

  useSEO({
    title: "Health & Technology Blog | My Health Integral",
    description:
      "Stay informed with the latest insights, case studies, and innovations in digital healthcare. Explore our blog and video content covering healthcare technology, patient care, and industry trends.",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
       <section className="relative text-white py-20 overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src={heroBlogImage?.mediaUrl || blogHeroFallback}
      alt=""
      className="w-full h-full object-cover"
    />
    {/* Overlay for readability */}
    <div className="absolute inset-0 bg-black/50" />
  </div>

  {/* Floating Badges */}
  <div className="absolute top-6 right-6 z-20 hidden sm:flex gap-3">
    <div className="backdrop-blur-md bg-white/90 text-primary px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
      <Award className="h-4 w-4" />
      <span className="text-sm font-semibold">Expert Insights</span>
    </div>

    <div className="backdrop-blur-md bg-primary/90 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
      <TrendingUp className="h-4 w-4" />
      <span className="text-sm font-semibold">Latest Research</span>
    </div>
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Hero Content */}
      <div className="text-center lg:text-left">
        <h1
          className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
          data-testid="blog-hero-title"
        >
          Insights & Innovation in
          <span className="block text-white/90">
            Digital Healthcare
          </span>
        </h1>

        <p
          className="text-xl text-white/90 mb-8"
          data-testid="blog-hero-description"
        >
          Explore the latest trends, case studies, and innovations shaping the
          future of healthcare accessibility. From technical deep-dives to
          patient success stories.
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <div className="text-3xl font-bold">100+</div>
            <div className="text-sm text-white/80">Articles</div>
          </div>
          <div>
            <div className="text-3xl font-bold">Weekly</div>
            <div className="text-sm text-white/80">Updates</div>
          </div>
          <div>
            <div className="text-3xl font-bold">Expert</div>
            <div className="text-sm text-white/80">Authors</div>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
            <Input
              placeholder="Search articles & videos..."
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            className="text-white border-2 border-white/60 bg-white/15 hover:bg-white/25"
            onClick={
              searchTerm ||
              selectedUserType !== "All User Types" ||
              selectedTopicCategory !== "All Topics"
                ? resetFilters
                : scrollToFilters
            }
          >
            <Filter className="h-4 w-4 mr-2" />
            {searchTerm ||
            selectedUserType !== "All User Types" ||
            selectedTopicCategory !== "All Topics"
              ? "Reset"
              : "Filter"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* Featured Article */}
        {featuredArticle && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2
                  className="text-2xl font-bold text-foreground mb-2"
                  data-testid="featured-title"
                >
                  Featured Article
                </h2>
                <p className="text-muted-foreground">
                  Our latest deep-dive into healthcare innovation
                </p>
              </div>

              <div
                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
                data-testid="featured-article"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-auto bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        {/* <div className="text-muted-foreground text-lg font-medium">
                          Featured Article Image
                        </div> */}
                        <div className="text-muted-foreground text-sm mt-1">
                          Hero image for "{featuredArticle.title}"
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                    {/* <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      Upload featured image
                    </div> */}
                  </div>

                  <div className="p-8 lg:p-12">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {featuredArticle.category}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {featuredArticle.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredArticle.readTime}
                      </span>
                      {featuredArticle.trending && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Trending!
                        </span>
                      )}
                    </div>

                    <h3
                      className="text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-4"
                      data-testid="featured-article-title"
                    >
                      {featuredArticle.title}
                    </h3>

                    <p
                      className="text-muted-foreground leading-relaxed mb-6"
                      data-testid="featured-article-excerpt"
                    >
                      {featuredArticle.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {/* Featured Author Photo Placeholder */}
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground/60" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">
                            {featuredArticle.author}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Author photo
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${
                          featuredArticle.slug?.startsWith("blog/")
                            ? featuredArticle.slug.substring(5)
                            : featuredArticle.slug || featuredArticle.id
                        }`}
                      >
                        <Button data-testid="read-featured">
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Videos Section */}
        <section className="py-20 section-peach">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                data-testid="videos-title"
              >
                Video Content & Webinars
              </h2>
              <p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                data-testid="videos-description"
              >
                Watch in-depth discussions, product demos, and success stories
                from our healthcare transformation journey.
              </p>
            </div>

            {videosLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading videos...
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No videos available yet.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    data-testid={`video-${video.id}`}
                    ref={(el) => {
                      if (el && !trackedVideos.has(video.id)) {
                        trackVideoView(video.id);
                      }
                    }}
                  >
                    <div className="relative">
                      <YouTubeEmbed
                        url={video.youtubeUrl}
                        title={video.title}
                      />
                      {video.duration && (
                        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                          <Video className="inline h-3 w-3 mr-1" />
                          {video.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3
                        className="text-lg font-bold text-foreground mb-3 leading-tight"
                        data-testid={`video-title-${video.id}`}
                      >
                        {video.title}
                      </h3>

                      {video.description && (
                        <p
                          className="text-muted-foreground text-sm mb-4 leading-relaxed"
                          data-testid={`video-description-${video.id}`}
                        >
                          {video.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {video.views || 0} views
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {video.createdAt
                            ? new Date(video.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="px-8 py-3"
                data-testid="view-all-videos"
              >
                <Video className="mr-2 h-4 w-4" />
                View All Videos
              </Button>
            </div>
          </div>
        </section>

        {/* Blog Articles */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
              <div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
                  data-testid="articles-title"
                >
                  Latest Articles
                </h2>
                <p
                  className="text-xl text-muted-foreground"
                  data-testid="articles-description"
                >
                  In-depth insights and analysis from our healthcare experts
                </p>
              </div>

              <div
                id="filters-section"
                className="mt-6 lg:mt-0 space-y-4 rounded-lg transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select
                    value={selectedUserType}
                    onValueChange={setSelectedUserType}
                  >
                    <SelectTrigger
                      className="w-full sm:w-48"
                      data-testid="user-type-filter"
                    >
                      <SelectValue placeholder="Select User Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {userTypes.map((userType) => (
                        <SelectItem key={userType} value={userType}>
                          {userType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedTopicCategory}
                    onValueChange={setSelectedTopicCategory}
                  >
                    <SelectTrigger
                      className="w-full sm:w-48"
                      data-testid="topic-category-filter"
                    >
                      <SelectValue placeholder="Select Topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topicCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(selectedUserType !== "All User Types" ||
                  selectedTopicCategory !== "All Topics" ||
                  searchTerm) && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      Showing {filteredArticles.length} of{" "}
                      {articles.length - (featuredArticle ? 1 : 0)} articles
                    </span>
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => {
                  // Extract slug portion after 'blog/' for URL
                  const articleSlug = article.slug || article.id;
                  const articlePath = articleSlug.startsWith("blog/")
                    ? articleSlug.substring(5)
                    : articleSlug;
                  return (
                    <Link
                      key={article.id}
                      href={`/blog/${articlePath}`}
                      data-testid={`article-link-${article.id}`}
                    >
                      <article
                        className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        data-testid={`article-${article.id}`}
                      >
                        <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                          <div className="text-center">
                            <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <div className="text-muted-foreground text-sm font-medium">
                              Article Thumbnail
                            </div>
                            <div className="text-muted-foreground text-xs mt-1">
                              {article.category} • {article.readTime}
                            </div>
                          </div>
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className="bg-white/90 text-primary px-2 py-1 rounded text-xs font-medium">
                              {article.category}
                            </span>
                            {article.trending && (
                              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                                Trending!
                              </span>
                            )}
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className="flex flex-wrap gap-1">
                              {article.userTypes.slice(0, 2).map((userType) => (
                                <span
                                  key={userType}
                                  className="bg-blue-500/80 text-white px-1 py-0.5 rounded text-[10px] font-medium"
                                >
                                  {userType}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-3">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {article.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {article.readTime}
                            </span>
                          </div>

                          <h3
                            className="text-lg font-bold text-foreground mb-3 leading-tight"
                            data-testid={`article-title-${article.id}`}
                          >
                            {article.title}
                          </h3>

                          <p
                            className="text-muted-foreground text-sm mb-4 leading-relaxed"
                            data-testid={`article-excerpt-${article.id}`}
                          >
                            {article.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {/* Author Photo Placeholder */}
                              <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-muted-foreground/60" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-medium text-foreground">
                                  {article.author}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Author photo
                                </span>
                              </div>
                            </div>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-primary hover:text-primary/80"
                              data-testid={`read-article-${article.id}`}
                            >
                              Read More
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No articles found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria.
                  </p>
                  <Button onClick={resetFilters}>Clear Filters</Button>
                </div>
              )}
            </div>

            <div className="text-center mt-12">
              <Button className="px-8 py-3" data-testid="view-all-articles">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 hero-gradient text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-6"
                data-testid="newsletter-title"
              >
                Stay Updated with Healthcare Innovation
              </h2>
              <p
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                data-testid="newsletter-description"
              >
                Get the latest insights, case studies, and product updates
                delivered directly to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                  data-testid="newsletter-email"
                />
                <Button
                  className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/95 transition-colors shadow-lg"
                  data-testid="newsletter-subscribe"
                >
                  Subscribe
                </Button>
              </div>

              <p className="text-sm text-white/70 mt-4">
                Join 5,000+ healthcare professionals staying informed about
                digital health trends.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
