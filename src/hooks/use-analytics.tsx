// Google Analytics Hook - from blueprint:javascript_google_analytics
import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageView, trackTimeOnPage } from '../lib/analytics';

export const useAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string | null>(null);
  
  useEffect(() => {
    // Track initial page view on mount
    if (prevLocationRef.current === null) {
      trackPageView(location);
      prevLocationRef.current = location;
    }
    // Track subsequent page views
    else if (location !== prevLocationRef.current) {
      // Track time spent on previous page
      trackTimeOnPage(prevLocationRef.current);
      
      // Track new page view
      trackPageView(location);
      prevLocationRef.current = location;
    }

    // Set up cleanup handlers for final page time tracking
    const handleBeforeUnload = () => {
      if (prevLocationRef.current) {
        trackTimeOnPage(prevLocationRef.current);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && prevLocationRef.current) {
        trackTimeOnPage(prevLocationRef.current);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location]);
};
