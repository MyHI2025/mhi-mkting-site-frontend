// Google Analytics Integration - from blueprint:javascript_google_analytics
// Define the gtag function globally
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    _gaMeasurementId?: string;
  }
}

// Fetch GA measurement ID from database (priority) or env variable (fallback)
async function getGAMeasurementId(): Promise<string | null> {
  try {
    const response = await fetch('/api/v1/public/settings/ga');
    if (response.ok) {
      const data = await response.json();
      if (data?.value) {
        return data.value;
      }
    }
  } catch (error) {
    console.warn('Could not fetch GA measurement ID from database:', error);
  }
  
  return import.meta.env.VITE_GA_MEASUREMENT_ID || null;
}

// Initialize Google Analytics with a specific measurement ID
function initGAWithId(measurementId: string) {
  // Check if already initialized
  if (typeof window.gtag !== 'undefined' && document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
    return;
  }

  // Store measurement ID globally for later use
  window._gaMeasurementId = measurementId;

  // Add Google Analytics script to the head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(script2);
}

// Initialize Google Analytics (async version that checks database first)
export const initGA = async () => {
  const measurementId = await getGAMeasurementId();

  if (!measurementId) {
    console.warn('No Google Analytics measurement ID configured (checked database and env variable)');
    return;
  }

  initGAWithId(measurementId);
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const measurementId = window._gaMeasurementId || import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  
  window.gtag('config', measurementId, {
    page_path: url
  });
};

// Track events
export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track user interactions (clicks, time on page, etc.)
export const trackUserInteraction = (elementName: string, action: string = 'click') => {
  trackEvent(action, 'user_interaction', elementName);
};

// Track time spent on page
let pageStartTime = Date.now();
export const trackTimeOnPage = (pageName: string) => {
  const timeSpent = Math.floor((Date.now() - pageStartTime) / 1000); // in seconds
  if (timeSpent > 0) {
    trackEvent('time_on_page', 'engagement', pageName, timeSpent);
  }
  pageStartTime = Date.now(); // Reset for next page
};
