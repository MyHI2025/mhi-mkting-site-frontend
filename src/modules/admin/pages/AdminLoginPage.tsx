import { useEffect } from "react";
import { useLocation } from "wouter";
import AdminLogin from "@/components/admin/AdminLogin";
import { useAdmin } from "@/contexts/AdminContext";

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, login } = useAdmin();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/admin/dashboard");
    }
  }, [isAuthenticated, setLocation]);

  if (isAuthenticated) {
    return null; // Prevent flash while redirecting
  }

  return <AdminLogin onLogin={login} />;
}