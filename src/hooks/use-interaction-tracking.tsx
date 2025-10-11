import { useEffect } from 'react';
import { trackUserInteraction } from '../lib/analytics';
import { isAnalyticsEnabled } from '@/components/cookie-consent';

/**
 * Hook to track user interactions (clicks) on the page
 * Automatically tracks clicks on buttons, links, and other interactive elements
 */
export const useInteractionTracking = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Only track if analytics is enabled
      if (!isAnalyticsEnabled()) return;
      
      const target = event.target as HTMLElement;
      
      // Find the closest interactive element
      const interactiveElement = target.closest('button, a, [role="button"], [data-track]');
      
      if (interactiveElement) {
        // Get a meaningful identifier for the element
        const elementName = 
          (interactiveElement as HTMLElement).dataset.testid ||
          (interactiveElement as HTMLElement).dataset.track ||
          interactiveElement.getAttribute('aria-label') ||
          interactiveElement.textContent?.trim().slice(0, 50) ||
          interactiveElement.tagName.toLowerCase();

        trackUserInteraction(elementName, 'click');
      }
    };

    // Add click listener to document
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};
