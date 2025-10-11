import { type User, type Role } from "@myhealthintegral/shared";
import { api } from '@/lib/api';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  lastLoginAt: Date | null;
  roles: Role[];
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Token management
export const getAccessToken = (): string | null => {
  return localStorage.getItem("admin_access_token");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("admin_refresh_token");
};

export const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem("admin_access_token", accessToken);
  localStorage.setItem("admin_refresh_token", refreshToken);
};

export const clearTokens = (): void => {
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_refresh_token");
};

// API request helper with token handling
export const apiRequest = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const accessToken = getAccessToken();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const headersObj = new Headers(headers);
  if (accessToken) {
    headersObj.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(endpoint, {
    ...options,
    headers: headersObj,
  });

  // Handle token refresh if access token is expired
  if (response.status === 403 && accessToken) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(api.auth.refresh, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const { accessToken: newAccessToken } = await refreshResponse.json();
          setTokens(newAccessToken, refreshToken);
          
          // Retry original request with new token
          headersObj.set("Authorization", `Bearer ${newAccessToken}`);
          return fetch(endpoint, { ...options, headers: headersObj });
        } else {
          // Refresh failed, clear tokens and redirect to login
          clearTokens();
          window.location.href = "/admin/login";
        }
      } catch (error) {
        clearTokens();
        window.location.href = "/admin/login";
      }
    }
  }

  return response;
};

// Auth functions
export const login = async (username: string, password: string): Promise<AdminUser> => {
  const response = await fetch(api.auth.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Login failed");
  }

  const { accessToken, refreshToken, user } = await response.json();
  setTokens(accessToken, refreshToken);
  
  return user;
};

export const logout = async (): Promise<void> => {
  const refreshToken = getRefreshToken();
  
  if (refreshToken) {
    try {
      await fetch(api.auth.logout, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  
  clearTokens();
};

export const getCurrentUser = async (): Promise<AdminUser | null> => {
  try {
    const response = await apiRequest(api.auth.me);
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        clearTokens();
        return null;
      }
      throw new Error("Failed to get current user");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Get current user error:", error);
    clearTokens();
    return null;
  }
};

// Permission helpers
export const hasPermission = (user: AdminUser | null, resource: string, action: string): boolean => {
  if (!user || !user.roles) return false;
  
  return user.roles.some(role => 
    role.permissions && Array.isArray(role.permissions) &&
    role.permissions.some((permission: any) => 
      permission.resource === resource && 
      permission.actions.includes(action)
    )
  );
};