import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  Mail,
  Plus,
  Video,
  Image,
  BarChart3,
  Clock,
  Eye,
} from "lucide-react";
import { Link } from "wouter";
import { api } from "@/lib/api";
import type { Page, Contact, VideoContent } from "@myhi2025/shared";
import { formatDistanceToNow } from "date-fns";

// Quick Stats Widget
export function QuickStatsWidget() {
  const { data: pages = [] } = useQuery<Page[]>({
    queryKey: [api.admin.pages],
  });

  const { data: contacts = [] } = useQuery<Contact[]>({
    queryKey: [api.admin.contacts],
  });

  const { data: videos = [] } = useQuery<VideoContent[]>({
    queryKey: [api.admin.videos],
  });

  const { data: mediaPositions = [] } = useQuery<any[]>({
    queryKey: [api.admin.mediaPositions],
  });

  // Calculate content type counts
  const articleCount = pages.filter((p) => p.pageType === "blog").length;
  const jobCount = pages.filter((p) => p.pageType === "job").length;
  const marketingPageCount = pages.filter(
    (p) => p.pageType === "marketing"
  ).length;

  const stats = [
    {
      title: "Articles",
      value: articleCount,
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Job Postings",
      value: jobCount,
      icon: FileText,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
    {
      title: "Videos",
      value: videos.length,
      icon: Video,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Media Positions",
      value: mediaPositions.length,
      icon: Image,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-100 dark:bg-pink-900/20",
    },
    {
      title: "Marketing Pages",
      value: marketingPageCount,
      icon: FileText,
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-100 dark:bg-cyan-900/20",
    },
    {
      title: "Contacts",
      value: contacts.length,
      icon: Mail,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
  ];

  return (
    <Card data-testid="widget-quick-stats">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Recent Pages Widget
export function RecentPagesWidget({ limit = 5 }: { limit?: number }) {
  const { data: pages = [], isLoading } = useQuery<Page[]>({
    queryKey: [api.admin.pages],
  });

  const recentPages = pages
    .sort((a, b) => {
      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, limit);

  return (
    <Card data-testid="widget-recent-pages">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Recent Pages
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        ) : recentPages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pages yet</p>
        ) : (
          <div className="space-y-3">
            {recentPages.map((page) => (
              <Link
                key={page.id}
                href={`/admin/content/${page.id}`}
                data-testid={`recent-page-${page.id}`}
              >
                <div className="flex items-start justify-between p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{page.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          page.isPublished
                            ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {page.isPublished ? "Published" : "Draft"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {page.pageType}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {page.updatedAt &&
                      formatDistanceToNow(new Date(page.updatedAt), {
                        addSuffix: true,
                      })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Recent Contacts Widget
export function RecentContactsWidget({ limit = 5 }: { limit?: number }) {
  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: [api.admin.contacts],
  });

  const recentContacts = contacts
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, limit);

  return (
    <Card data-testid="widget-recent-contacts">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Recent Contacts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        ) : recentContacts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No contacts yet</p>
        ) : (
          <div className="space-y-3">
            {recentContacts.map((contact) => (
              <div
                key={contact.id}
                className="p-3 rounded-lg border"
                data-testid={`recent-contact-${contact.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">
                      {contact.title ? `${contact.title} ` : ""}
                      {contact.firstName} {contact.lastName}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.email}
                    </p>
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                      {contact.userType}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {contact.createdAt &&
                      formatDistanceToNow(new Date(contact.createdAt), {
                        addSuffix: true,
                      })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Quick Actions Widget
export function QuickActionsWidget() {
  const actions = [
    {
      label: "New Page",
      icon: Plus,
      href: "/admin/content/new",
      color: "bg-blue-600 hover:bg-blue-700 text-white",
      testId: "action-new-page",
    },
    {
      label: "Upload Media",
      icon: Image,
      href: "/admin/media",
      color: "bg-purple-600 hover:bg-purple-700 text-white",
      testId: "action-upload-media",
    },
    {
      label: "Add Video",
      icon: Video,
      href: "/admin/videos",
      color: "bg-green-600 hover:bg-green-700 text-white",
      testId: "action-add-video",
    },
    {
      label: "View Contacts",
      icon: Users,
      href: "/admin/contacts",
      color: "bg-teal-600 hover:bg-teal-700 text-white",
      testId: "action-view-contacts",
    },
  ];

  return (
    <Card data-testid="widget-quick-actions">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <Button
                  className={`w-full ${action.color}`}
                  data-testid={action.testId}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
