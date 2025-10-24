import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  FileText,
  Users,
  Image,
  Navigation,
  Palette,
  Settings,
  LogIn,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Clock,
  Activity,
  Filter,
  X,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { api, buildQueryString } from "@/lib/api";
import { apiRequest } from "@/lib/queryClient";
import type { AuditLog, User } from "@myhi2025/shared";

const actionIcons: Record<string, any> = {
  create: Plus,
  update: Pencil,
  delete: Trash2,
  login: LogIn,
  logout: LogOut,
  publish: Eye,
  view: Eye,
};

const resourceIcons: Record<string, any> = {
  users: Users,
  pages: FileText,
  content: FileText,
  media: Image,
  navigation: Navigation,
  themes: Palette,
  auth: Shield,
  settings: Settings,
};

export default function AdminAuditLogsPage() {
  const [filters, setFilters] = useState({
    userId: "all",
    resource: "all",
    action: "all",
    limit: "50",
  });

  const [activeFilters, setActiveFilters] = useState(filters);

  // Fetch users for the filter dropdown
  const { data: users = [] } = useQuery<User[]>({
    queryKey: [api.admin.users],
  });

  // Fetch audit logs with filters
  const {
    data: logs = [],
    isLoading,
    refetch,
  } = useQuery<AuditLog[]>({
    queryKey: [api.admin.auditLogs, activeFilters],
    queryFn: () => {
      const params: any = {};
      if (activeFilters.userId && activeFilters.userId !== "all")
        params.userId = activeFilters.userId;
      if (activeFilters.resource && activeFilters.resource !== "all")
        params.resource = activeFilters.resource;
      if (activeFilters.action && activeFilters.action !== "all")
        params.action = activeFilters.action;
      if (activeFilters.limit) params.limit = activeFilters.limit;

      const queryString = buildQueryString(params);
      return apiRequest(`${api.admin.auditLogs}${queryString}`);
    },
  });

  const handleApplyFilters = () => {
    setActiveFilters(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      userId: "all",
      resource: "all",
      action: "all",
      limit: "50",
    };
    setFilters(resetFilters);
    setActiveFilters(resetFilters);
  };

  const getActionIcon = (action: string) => {
    const Icon = actionIcons[action] || Activity;
    return Icon;
  };

  const getResourceIcon = (resource: string) => {
    const Icon = resourceIcons[resource] || FileText;
    return Icon;
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20";
      case "update":
        return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20";
      case "delete":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20";
      case "login":
        return "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20";
      case "logout":
        return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20";
      default:
        return "text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/20";
    }
  };

  const getUserDisplayName = (userId: string | null) => {
    if (!userId) return "System";
    const user = users.find((u) => u.id === userId);
    if (!user) return "Unknown User";
    return user.firstName
      ? `${user.firstName} ${user.lastName}`
      : user.username;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Audit Logs
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View and filter all administrative actions performed on the platform
        </p>
      </div>

      {/* Filters Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>
            Filter audit logs by user, resource, action, and limit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filter-user">User</Label>
              <Select
                value={filters.userId}
                onValueChange={(value) =>
                  setFilters({ ...filters, userId: value })
                }
              >
                <SelectTrigger
                  id="filter-user"
                  data-testid="select-user-filter"
                >
                  <SelectValue placeholder="All users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All users</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.firstName
                        ? `${user.firstName} ${user.lastName}`
                        : user.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter-resource">Resource</Label>
              <Select
                value={filters.resource}
                onValueChange={(value) =>
                  setFilters({ ...filters, resource: value })
                }
              >
                <SelectTrigger
                  id="filter-resource"
                  data-testid="select-resource-filter"
                >
                  <SelectValue placeholder="All resources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All resources</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="pages">Pages</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="navigation">Navigation</SelectItem>
                  <SelectItem value="themes">Themes</SelectItem>
                  <SelectItem value="auth">Authentication</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter-action">Action</Label>
              <Select
                value={filters.action}
                onValueChange={(value) =>
                  setFilters({ ...filters, action: value })
                }
              >
                <SelectTrigger
                  id="filter-action"
                  data-testid="select-action-filter"
                >
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                  <SelectItem value="publish">Publish</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter-limit">Limit</Label>
              <Select
                value={filters.limit}
                onValueChange={(value) =>
                  setFilters({ ...filters, limit: value })
                }
              >
                <SelectTrigger
                  id="filter-limit"
                  data-testid="select-limit-filter"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 logs</SelectItem>
                  <SelectItem value="50">50 logs</SelectItem>
                  <SelectItem value="100">100 logs</SelectItem>
                  <SelectItem value="250">250 logs</SelectItem>
                  <SelectItem value="500">500 logs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleApplyFilters}
              data-testid="button-apply-filters"
            >
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={handleResetFilters}
              data-testid="button-reset-filters"
            >
              <X className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activity Log
          </CardTitle>
          <CardDescription>
            Showing {logs.length} recent administrative actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No audit logs found</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="w-[120px]">IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => {
                    const ActionIcon = getActionIcon(log.action);
                    const ResourceIcon = getResourceIcon(log.resource);
                    return (
                      <TableRow
                        key={log.id}
                        data-testid={`audit-log-${log.id}`}
                      >
                        <TableCell className="font-mono text-xs">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>
                              {log.createdAt &&
                                formatDistanceToNow(new Date(log.createdAt), {
                                  addSuffix: true,
                                })}
                            </span>
                          </div>
                          <div className="text-muted-foreground mt-1">
                            {log.createdAt &&
                              new Date(log.createdAt).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">
                              {getUserDisplayName(log.userId)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${getActionColor(
                              log.action
                            )}`}
                          >
                            <ActionIcon className="h-3 w-3" />
                            <span className="text-xs font-semibold uppercase">
                              {log.action}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <ResourceIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{log.resource}</span>
                          </div>
                          {log.resourceId && (
                            <div className="text-xs text-muted-foreground mt-1 font-mono">
                              {log.resourceId.slice(0, 8)}...
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {log.details &&
                          typeof log.details === "object" &&
                          Object.keys(log.details).length > 0 ? (
                            <pre className="text-xs bg-muted p-2 rounded max-w-xs overflow-auto">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          ) : (
                            <span className="text-muted-foreground text-xs">
                              No details
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {log.ipAddress || "—"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
