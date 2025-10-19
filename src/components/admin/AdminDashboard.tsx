import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Image, 
  Navigation, 
  Palette, 
  Settings, 
  LogOut,
  Menu,
  X,
  Shield,
  UserCog,
  Video,
  Briefcase,
  BookOpen,
  Activity,
  Mail
} from "lucide-react";
import AdminContentPage from "@/modules/admin/pages/AdminContentPage";
import AdminUsersPage from "@/modules/admin/pages/AdminUsersPage";
import AdminMediaPage from "@/modules/admin/pages/AdminMediaPage";
import AdminNavigationPage from "@/modules/admin/pages/AdminNavigationPage";
import AdminThemePage from "@/modules/admin/pages/AdminThemePage";
import AdminTeamPage from "@/modules/admin/pages/AdminTeamPage";
import AdminMediaPositionsPage from "@/modules/admin/pages/AdminMediaPositionsPage";
import AdminVideosPage from "@/modules/admin/pages/AdminVideosPage";
import AdminCareersPage from "@/modules/admin/pages/AdminCareersPage";
import AdminArticlesPage from "@/modules/admin/pages/AdminArticlesPage";
import AdminAuditLogsPage from "@/modules/admin/pages/AdminAuditLogsPage";
import AdminContactsPage from "@/modules/admin/pages/AdminContactsPage";
import AdminSettingsPage from "@/modules/admin/pages/AdminSettingsPage";
import { CMSPage } from "@/components/cms/CMSPage";
import { ArrowLeft } from "lucide-react";
import { useEditing } from "@/contexts/EditingContext";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmin } from "@/contexts/AdminContext";
import { logout } from "@/lib/auth";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  children?: React.ReactNode;
}

export default function AdminDashboard({ children }: AdminDashboardProps) {
  const [location, navigate] = useLocation();
  const { user, logout: logoutUser } = useAdmin();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      logoutUser();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, clear local state
      logoutUser();
      navigate("/admin/login");
    }
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      description: "Overview and analytics"
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      description: "Manage admin users and roles"
    },
    {
      name: "Content",
      href: "/admin/content",
      icon: FileText,
      description: "Edit pages and content blocks"
    },
    {
      name: "Media",
      href: "/admin/media",
      icon: Image,
      description: "Upload and manage images"
    },
    {
      name: "Team",
      href: "/admin/team",
      icon: UserCog,
      description: "Manage team member profiles"
    },
    {
      name: "Media Positions",
      href: "/admin/media-positions",
      icon: Image,
      description: "Manage website images"
    },
    {
      name: "Videos",
      href: "/admin/videos",
      icon: Video,
      description: "Manage vlog and webinar videos"
    },
    {
      name: "Careers",
      href: "/admin/careers",
      icon: Briefcase,
      description: "Manage job postings"
    },
    {
      name: "Articles",
      href: "/admin/articles",
      icon: BookOpen,
      description: "Manage blog articles"
    },
    {
      name: "Navigation",
      href: "/admin/navigation",
      icon: Navigation,
      description: "Configure site navigation"
    },
    {
      name: "Themes",
      href: "/admin/themes",
      icon: Palette,
      description: "Customize site appearance"
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      description: "System configuration"
    },
    {
      name: "Audit Logs",
      href: "/admin/audit-logs",
      icon: Activity,
      description: "View admin activity logs"
    },
    {
      name: "Contacts",
      href: "/admin/contacts",
      icon: Mail,
      description: "View contact form submissions"
    },
  ];

  const isActive = (href: string) => location === href || location?.startsWith(href + "/");

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar with MHI Brand Colors */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#00292E] shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-[#054854]">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-md text-white hover:text-[#64B2C1] hover:bg-[#054854]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-[#64B2C1] text-[#00292E]"
                    : "text-white hover:bg-[#054854]"
                }`}
                data-testid={`nav-${item.name.toLowerCase()}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* User info and logout */}
        <div className="p-4 border-t border-[#054854]">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-[#64B2C1] rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#00292E]" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.username}
              </p>
              <p className="text-xs text-[#64B2C1] truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="w-full bg-[#054854] border-[#64B2C1] text-white hover:bg-[#107082] hover:border-[#64B2C1]"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white dark:bg-[#00292E] shadow-sm border-b border-[#DDDDDD] dark:border-[#054854]">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-md text-[#00292E] hover:text-[#054854] hover:bg-[#DDDDDD] dark:text-white dark:hover:text-[#64B2C1] dark:hover:bg-[#054854]"
              data-testid="button-mobile-menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[#00292E] dark:text-white">
                {navigation.find(item => isActive(item.href))?.name || "Dashboard"}
              </h2>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 bg-[#F5F5F5] dark:bg-[#054854]">
          {children || <DashboardContent />}
        </main>
      </div>
    </div>
  );
}

// Route-based content rendering
function DashboardContent() {
  const [location] = useLocation();
  
  // Handle dynamic routes
  if (location.startsWith('/admin/edit-page/')) {
    const pageId = location.replace('/admin/edit-page/', '');
    return <AdminEditPageContent pageId={pageId} />;
  }
  
  // Handle routes that start with certain paths
  if (location.startsWith('/admin/content')) {
    return <AdminContentPageContent />;
  }
  
  switch (location) {
    case "/admin/users":
      return <AdminUsersPageContent />;
    case "/admin/media":
      return <AdminMediaPageContent />;
    case "/admin/team":
      return <AdminTeamPageContent />;
    case "/admin/media-positions":
      return <AdminMediaPositionsPageContent />;
    case "/admin/videos":
      return <AdminVideosPageContent />;
    case "/admin/careers":
      return <AdminCareersPageContent />;
    case "/admin/articles":
      return <AdminArticlesPageContent />;
    case "/admin/navigation":
      return <AdminNavigationPageContent />;
    case "/admin/themes":
      return <AdminThemePageContent />;
    case "/admin/audit-logs":
      return <AdminAuditLogsPageContent />;
    case "/admin/contacts":
      return <AdminContactsPageContent />;
    case "/admin/settings":
      return <AdminSettingsPageContent />;
    default:
      return <DashboardHome />;
  }
}

// Import content-only components
function AdminContentPageContent() {
  return <AdminContentPage />;
}

function AdminUsersPageContent() {
  return <AdminUsersPage />;
}

function AdminMediaPageContent() {
  return <AdminMediaPage />;
}

function AdminNavigationPageContent() {
  return <AdminNavigationPage />;
}

function AdminThemePageContent() {
  return <AdminThemePage />;
}

function AdminTeamPageContent() {
  return <AdminTeamPage />;
}

function AdminMediaPositionsPageContent() {
  return <AdminMediaPositionsPage />;
}

function AdminVideosPageContent() {
  return <AdminVideosPage />;
}

function AdminCareersPageContent() {
  return <AdminCareersPage />;
}

function AdminArticlesPageContent() {
  return <AdminArticlesPage />;
}

function AdminAuditLogsPageContent() {
  return <AdminAuditLogsPage />;
}

function AdminContactsPageContent() {
  return <AdminContactsPage />;
}

function AdminSettingsPageContent() {
  return <AdminSettingsPage />;
}

function AdminEditPageContent({ pageId }: { pageId: string }) {
  const [, navigate] = useLocation();
  const { isEditMode, toggleEditMode } = useEditing();
  const didEnableEditMode = useRef(false);
  
  const { data: page } = useQuery({
    queryKey: [api.admin.pages, pageId],
    queryFn: async () => {
      const res = await fetch(api.admin.page(pageId));
      if (!res.ok) throw new Error('Failed to fetch page');
      return res.json();
    }
  });

  // Automatically enable edit mode when entering this page
  useEffect(() => {
    if (!isEditMode) {
      toggleEditMode();
      didEnableEditMode.current = true;
    }
    return () => {
      // Only toggle off if we were the ones who enabled it
      if (didEnableEditMode.current) {
        toggleEditMode();
        didEnableEditMode.current = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount/unmount

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/admin/content')}
          data-testid="button-back-to-content"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Content
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {page?.title || 'Edit Page'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Edit content inline - click any element to modify it
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <CMSPage pageId={pageId} />
      </div>
    </div>
  );
}

// Default dashboard home content
function DashboardHome() {
  const { user } = useAdmin();
  const [, navigate] = useLocation();

  // Fetch dashboard stats
  const { data: stats, isLoading } = useQuery<{
    pages: number;
    articles: number;
    videos: number;
    jobs: number;
    contacts: number;
    teamMembers: number;
    mediaPositions: number;
    navigationItems: number;
    totalContent: number;
  }>({
    queryKey: [`${api.admin.dashboard}/stats`],
  });

  const statCards = [
    { label: "Marketing Pages", value: stats?.pages || 0, icon: FileText, color: "bg-blue-500", href: "/admin/content" },
    { label: "Blog Articles", value: stats?.articles || 0, icon: BookOpen, color: "bg-purple-500", href: "/admin/articles" },
    { label: "Job Postings", value: stats?.jobs || 0, icon: Briefcase, color: "bg-green-500", href: "/admin/careers" },
    { label: "Videos", value: stats?.videos || 0, icon: Video, color: "bg-red-500", href: "/admin/videos" },
    { label: "Media Positions", value: stats?.mediaPositions || 0, icon: Image, color: "bg-yellow-500", href: "/admin/media-positions" },
    { label: "Contact Submissions", value: stats?.contacts || 0, icon: Mail, color: "bg-pink-500", href: "/admin/contacts" },
    { label: "Team Members", value: stats?.teamMembers || 0, icon: UserCog, color: "bg-indigo-500", href: "/admin/team" },
    { label: "Navigation Items", value: stats?.navigationItems || 0, icon: Navigation, color: "bg-teal-500", href: "/admin/navigation" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.firstName || user?.username}!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Here's an overview of your My Health Integral admin panel.
        </p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat) => (
            <Card
              key={stat.label}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(stat.href)}
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <div className={`${stat.color} p-2 rounded-md`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Click to manage
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center space-y-2"
            onClick={() => navigate("/admin/content")}
            data-testid="quick-action-create-page"
          >
            <FileText className="h-6 w-6" />
            <span>Create New Page</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center space-y-2"
            onClick={() => navigate("/admin/navigation")}
            data-testid="quick-action-manage-navigation"
          >
            <Navigation className="h-6 w-6" />
            <span>Manage Navigation</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center space-y-2"
            onClick={() => navigate("/admin/media")}
            data-testid="quick-action-upload-media"
          >
            <Image className="h-6 w-6" />
            <span>Upload Media</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center space-y-2"
            onClick={() => navigate("/admin/settings")}
            data-testid="quick-action-settings"
          >
            <Settings className="h-6 w-6" />
            <span>View Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
