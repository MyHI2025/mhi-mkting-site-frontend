import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { apiRequest as authApiRequest } from "./auth";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Export the auth-aware API request function
export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  data?: unknown | undefined,
): Promise<any> {
  const response = await authApiRequest(endpoint, {
    method,
    body: data ? JSON.stringify(data) : undefined,
  });

  await throwIfResNotOk(response);
  
  // Handle 204 No Content responses explicitly
  if (response.status === 204) {
    return null;
  }
  
  // Only parse JSON if there's content and it's JSON
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    // Check if response has a body before parsing
    const text = await response.text();
    if (text) {
      return JSON.parse(text);
    }
  }
  
  return null;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const response = await authApiRequest(queryKey.join("/") as string);
      
      if (unauthorizedBehavior === "returnNull" && response.status === 401) {
        return null;
      }

      await throwIfResNotOk(response);
      return await response.json();
    } catch (error: any) {
      if (unauthorizedBehavior === "returnNull" && error.message?.includes("401")) {
        return null;
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
