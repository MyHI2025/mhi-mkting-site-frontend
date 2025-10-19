/**
 * Centralized API Configuration
 * Single source of truth for all API endpoints and versioning
 */

// API version and base configuration
export const API_VERSION = 'v1';
export const API_BASE = `/api/${API_VERSION}`;

/**
 * API Endpoint Builder
 * Constructs versioned API paths
 */
export const api = {
  // Base paths
  base: API_BASE,
  adminBase: `${API_BASE}/admin`,
  publicBase: `${API_BASE}/public`,
  
  // Authentication endpoints
  auth: {
    login: `${API_BASE}/auth/login`,
    logout: `${API_BASE}/auth/logout`,
    refresh: `${API_BASE}/auth/refresh`,
    me: `${API_BASE}/auth/me`,
  },
  
  // Public endpoints
  public: {
    pages: `${API_BASE}/public/pages`,
    page: (pageId: string) => `${API_BASE}/public/pages/${pageId}`,
    pageNodes: (pageId: string) => `${API_BASE}/public/pages/${pageId}/nodes`,
    team: `${API_BASE}/public/team`,
    mediaPositions: `${API_BASE}/media-positions/public/positions`,
    mediaPosition: (key: string) => `${API_BASE}/media-positions/public/position/${key}`,
    videos: `${API_BASE}/videos/public/videos`,
    videoView: (id: string) => `${API_BASE}/videos/public/${id}/view`,
    contact: `${API_BASE}/public/contact`,
  },
  
  // Admin endpoints
  admin: {
    // Users
    users: `${API_BASE}/admin/users`,
    user: (id: string) => `${API_BASE}/admin/users/${id}`,
    userPassword: (id: string) => `${API_BASE}/admin/users/${id}/password`,
    userRoles: (id: string) => `${API_BASE}/admin/users/${id}/roles`,
    
    // Roles
    roles: `${API_BASE}/admin/users/roles`,
    
    // Pages/Content
    pages: `${API_BASE}/admin/pages`,
    page: (id: string) => `${API_BASE}/admin/pages/${id}`,
    pageSections: (pageId: string) => `${API_BASE}/admin/pages/${pageId}/sections`,
    pagePublish: (pageId: string) => `${API_BASE}/admin/pages/${pageId}/publish`,
    pageMigrate: (pageId: string) => `${API_BASE}/admin/pages/${pageId}/migrate`,
    pageNodes: (pageId: string) => `${API_BASE}/admin/pages/${pageId}/nodes`,
    pageVersions: (pageId: string) => `${API_BASE}/admin/pages/${pageId}/versions`,
    pageVersion: (pageId: string, versionId: string) => `${API_BASE}/admin/pages/${pageId}/versions/${versionId}`,
    pageVersionRestore: (pageId: string, versionId: string) => `${API_BASE}/admin/pages/${pageId}/versions/${versionId}/restore`,
    compareVersions: (version1: string, version2: string) => `${API_BASE}/admin/pages/versions/compare?version1=${version1}&version2=${version2}`,
    node: (id: string) => `${API_BASE}/admin/nodes/${id}`,
    nodeSections: (nodeId: string) => `${API_BASE}/admin/nodes/${nodeId}/sections`,
    sections: `${API_BASE}/admin/sections`,
    section: (id: string) => `${API_BASE}/admin/sections/${id}`,
    blocks: (sectionId: string) => `${API_BASE}/admin/sections/${sectionId}/blocks`,
    block: (id: string) => `${API_BASE}/admin/blocks/${id}`,
    
    // Navigation
    navigation: `${API_BASE}/admin/navigation`,
    navigationItem: (id: string) => `${API_BASE}/admin/navigation/${id}`,
    navigationReorder: `${API_BASE}/admin/navigation/reorder`,
    
    // Team
    team: `${API_BASE}/admin/team`,
    teamMember: (id: string) => `${API_BASE}/admin/team/${id}`,
    
    // Media
    media: `${API_BASE}/admin/media`,
    mediaUpload: `${API_BASE}/admin/media/upload`,
    mediaItem: (id: string) => `${API_BASE}/admin/media/${id}`,
    
    // Media Positions
    mediaPositions: `${API_BASE}/admin/media-positions`,
    mediaPosition: (id: string) => `${API_BASE}/admin/media-positions/${id}`,
    
    // Videos
    videos: `${API_BASE}/admin/videos`,
    video: (id: string) => `${API_BASE}/admin/videos/${id}`,
    
    // Themes
    themes: `${API_BASE}/admin/themes`,
    theme: (id: string) => `${API_BASE}/admin/themes/${id}`,
    activeTheme: `${API_BASE}/admin/themes/active`,
    activateTheme: (id: string) => `${API_BASE}/admin/themes/${id}/activate`,
    
    // Contacts
    contacts: `${API_BASE}/admin/contacts`,
    syncContactsToZoho: `${API_BASE}/admin/contacts/sync-zoho`,
    
    // Audit Logs
    auditLogs: `${API_BASE}/admin/audit-logs`,
    
    // Dashboard
    dashboard: `${API_BASE}/admin/dashboard`,
    dashboardStats: `${API_BASE}/admin/dashboard/stats`,
    dashboardWidgets: `${API_BASE}/admin/dashboard/widgets`,
    dashboardWidget: (id: string) => `${API_BASE}/admin/dashboard/widgets/${id}`,
    dashboardLayout: `${API_BASE}/admin/dashboard/widgets/layout`,
    dashboardReset: `${API_BASE}/admin/dashboard/widgets/reset`,
  },
} as const;

/**
 * Build query string from params
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}
