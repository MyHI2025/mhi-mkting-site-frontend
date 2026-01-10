import { lazy, Suspense, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminProvider } from "@/contexts/AdminContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { LiveChatProvider } from "@/components/ui/live-chat-provider";
import LiveChatWidget from "@/components/ui/live-chat-widget";
import { EditingProvider } from "@/contexts/EditingContext";
import { EditModeToggle } from "@/components/editing/EditModeToggle";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { useInteractionTracking } from "./hooks/use-interaction-tracking";
import { CookieConsent, isAnalyticsEnabled } from "@/components/cookie-consent";

// Eager load only critical pages for better initial performance
import Home from "@/modules/marketing/pages/home";
import NotFound from "@/modules/marketing/pages/not-found";

// Lazy load all other pages for code splitting and faster initial load
const Patients = lazy(() => import("@/modules/marketing/pages/patients"));
const Providers = lazy(() => import("@/modules/marketing/pages/providers"));
const Physicians = lazy(() => import("@/modules/marketing/pages/physicians"));
const Hospitals = lazy(() => import("@/modules/marketing/pages/hospitals"));
const Laboratories = lazy(() => import("@/modules/marketing/pages/laboratories"));
const Pharmacies = lazy(() => import("@/modules/marketing/pages/pharmacies"));
const Emergency = lazy(() => import("@/modules/marketing/pages/emergency"));
const Insurance = lazy(() => import("@/modules/marketing/pages/insurance"));
const Corporates = lazy(() => import("@/modules/marketing/pages/corporates"));
const Investors = lazy(() => import("@/modules/marketing/pages/investors"));
const About = lazy(() => import("@/modules/marketing/pages/about"));
const Contact = lazy(() => import("@/modules/marketing/pages/contact"));
const Career = lazy(() => import("@/modules/marketing/pages/career"));
const JobDetail = lazy(() => import("@/modules/marketing/pages/job-detail"));
const Blog = lazy(() => import("@/modules/marketing/pages/blog"));
const BlogDetail = lazy(() => import("@/modules/marketing/pages/blog-detail"));
const PrivacyPolicy = lazy(() => import("@/modules/marketing/pages/privacy-policy"));
const TermsOfUse = lazy(() => import("@/modules/marketing/pages/terms-of-use"));
const Pricing = lazy(() => import("@/modules/marketing/pages/pricing"));

// Admin pages - AdminDashboardPage must be eagerly loaded due to complex internal routing
import AdminDashboardPage from "@/modules/admin/pages/AdminDashboardPage";
const AdminLoginPage = lazy(() => import("@/modules/admin/pages/AdminLoginPage"));

// Loading fallback component for better UX
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen" data-testid="loader-page">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" data-testid="spinner-loading"></div>
    </div>
  );
}

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  // Track user interactions (clicks)
  useInteractionTracking();
  
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Public marketing routes */}
        <Route path="/" component={Home} />
        <Route path="/patients" component={Patients} />
        <Route path="/providers" component={Providers} />
        <Route path="/physicians" component={Physicians} />
        <Route path="/hospitals" component={Hospitals} />
        <Route path="/laboratories" component={Laboratories} />
        <Route path="/pharmacies" component={Pharmacies} />
        <Route path="/emergency" component={Emergency} />
        <Route path="/insurance" component={Insurance} />
        <Route path="/corporates" component={Corporates} />
        <Route path="/investors" component={Investors} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/career" component={Career} />
        <Route path="/careers/:id" component={JobDetail} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:id" component={BlogDetail} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-use" component={TermsOfUse} />
        
        {/* Admin routes - explicitly handle all admin paths */}
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route path="/admin/dashboard">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/edit-page/:id">
          {(params) => (
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/admin/content">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/content/new">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/users">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/media">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/navigation">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/themes">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/team">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/media-positions">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/videos">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/careers">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/articles">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/audit-logs">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/contacts">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin/settings">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/admin">
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        </Route>
        
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  // Initialize Google Analytics when app loads (only if user has consented)
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Google Analytics: Missing VITE_GA_MEASUREMENT_ID environment variable');
      return;
    }

    // Only initialize if user has consented to analytics
    if (isAnalyticsEnabled()) {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <EditingProvider>
          <LiveChatProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
              <LiveChatWidget />
              <EditModeToggle />
              <CookieConsent />
            </TooltipProvider>
          </LiveChatProvider>
        </EditingProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
