import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "mhi_cookie_consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
    // Reload to initialize analytics
    window.location.reload();
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleCustomize = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6" data-testid="cookie-consent-banner">
      <Card className="max-w-4xl mx-auto bg-white dark:bg-[#00292E] border-[#64B2C1] shadow-2xl">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-[#64B2C1]/10 rounded-lg">
                <Cookie className="h-6 w-6 text-[#64B2C1]" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Cookie Preferences
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies for analytics purposes.
              </p>

              {isExpanded && (
                <div className="mb-4 space-y-3 p-4 bg-gray-50 dark:bg-[#054854] rounded-lg">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">
                        Necessary Cookies (Required)
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Essential for the website to function properly. Cannot be disabled.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="mt-1"
                      id="analytics-cookies"
                    />
                    <div className="flex-1">
                      <label htmlFor="analytics-cookies" className="font-medium text-sm text-gray-900 dark:text-white cursor-pointer">
                        Analytics Cookies
                      </label>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Help us understand how visitors interact with our website through Google Analytics.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleAccept}
                  className="bg-[#64B2C1] hover:bg-[#54A2B1] text-white"
                  data-testid="button-accept-cookies"
                >
                  Accept All
                </Button>
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="border-[#64B2C1] text-[#64B2C1] hover:bg-[#64B2C1]/10"
                  data-testid="button-reject-cookies"
                >
                  Reject All
                </Button>
                <Button
                  onClick={handleCustomize}
                  variant="ghost"
                  className="text-gray-600 dark:text-gray-300"
                  data-testid="button-customize-cookies"
                >
                  {isExpanded ? "Hide Details" : "Customize"}
                </Button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                Learn more in our{" "}
                <a href="/privacy-policy" className="text-[#64B2C1] hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              data-testid="button-close-cookie-banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Helper function to check if analytics is enabled
export const isAnalyticsEnabled = (): boolean => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!consent) return false;
  
  try {
    const parsed = JSON.parse(consent);
    return parsed.analytics === true;
  } catch {
    return false;
  }
};
