import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAdmin } from "@/contexts/AdminContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: {
    resource: string;
    action: string;
  };
}

export default function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading, user } = useAdmin();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Check permissions if required
  if (requiredPermission && user) {
    const hasPermission = user.roles?.some(role => 
      role.permissions && Array.isArray(role.permissions) &&
      role.permissions.some((permission: any) => 
        permission.resource === requiredPermission.resource && 
        permission.actions.includes(requiredPermission.action)
      )
    );

    if (!hasPermission) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              You don't have permission to access this resource.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Required: {requiredPermission.action} on {requiredPermission.resource}
            </p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}