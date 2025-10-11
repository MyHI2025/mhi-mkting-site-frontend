import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from '@/lib/api';

interface EditingContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  isAdmin: boolean;
  currentUser: any | null;
}

const EditingContext = createContext<EditingContextType | undefined>(undefined);

interface EditingProviderProps {
  children: ReactNode;
}

export function EditingProvider({ children }: EditingProviderProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasToken, setHasToken] = useState(() => !!localStorage.getItem('admin_access_token'));

  // Listen for storage changes to detect login/logout
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('admin_access_token');
      setHasToken(!!token);
    };
    
    // Check on mount and when storage changes
    window.addEventListener('storage', checkToken);
    
    // Also check periodically in case of same-tab changes
    const interval = setInterval(checkToken, 1000);
    
    return () => {
      window.removeEventListener('storage', checkToken);
      clearInterval(interval);
    };
  }, []);

  // Check if user is authenticated as admin
  const { data: currentUser } = useQuery({
    queryKey: [api.auth.me, hasToken],
    queryFn: async () => {
      const accessToken = localStorage.getItem('admin_access_token');
      if (!accessToken) {
        return null;
      }
      
      try {
        const response = await fetch(api.auth.me, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          return response.json();
        }
        return null;
      } catch (error) {
        return null;
      }
    },
    enabled: hasToken,
    retry: false,
    refetchOnWindowFocus: false
  });

  const isAdmin = Boolean(currentUser?.id);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Listen for escape key to exit edit mode
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isEditMode) {
        setIsEditMode(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isEditMode]);

  return (
    <EditingContext.Provider value={{
      isEditMode,
      toggleEditMode,
      isAdmin,
      currentUser
    }}>
      {children}
    </EditingContext.Provider>
  );
}

export function useEditing() {
  const context = useContext(EditingContext);
  if (context === undefined) {
    throw new Error("useEditing must be used within an EditingProvider");
  }
  return context;
}