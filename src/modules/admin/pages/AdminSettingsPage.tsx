import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BarChart3, 
  Cookie, 
  Settings as SettingsIcon,
  CheckCircle2,
  XCircle,
  Info,
  Loader2
} from "lucide-react";
import { isAnalyticsEnabled } from "@/components/cookie-consent";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { apiRequest as authApiRequest } from "@/lib/auth";
import type { SystemSetting } from "@myhealthintegral/shared";

export default function AdminSettingsPage() {
  const [gaId, setGaId] = useState("");
  const { toast } = useToast();
  const analyticsConsent = isAnalyticsEnabled();

  const { data: gaSetting, isLoading } = useQuery<SystemSetting | null>({
    queryKey: ["/api/v1/admin/settings/ga_measurement_id"],
    queryFn: async () => {
      const response = await authApiRequest("/api/v1/admin/settings/ga_measurement_id");
      if (response.status === 404) return null;
      if (!response.ok) {
        throw new Error("Failed to fetch GA setting");
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (gaSetting?.value) {
      setGaId(gaSetting.value);
    } else if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      setGaId(import.meta.env.VITE_GA_MEASUREMENT_ID);
    }
  }, [gaSetting]);

  const saveMutation = useMutation({
    mutationFn: async (measurementId: string) => {
      return apiRequest("/api/v1/admin/settings", "PUT", {
        key: "ga_measurement_id",
        value: measurementId,
        category: "analytics",
        description: "Google Analytics 4 Measurement ID",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/v1/admin/settings/ga_measurement_id"] });
      toast({
        title: "Settings saved",
        description: "Google Analytics measurement ID has been saved successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (!gaId.trim()) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid GA measurement ID",
        variant: "destructive",
      });
      return;
    }
    saveMutation.mutate(gaId.trim());
  };

  const hasGaId = !!gaSetting?.value || !!import.meta.env.VITE_GA_MEASUREMENT_ID;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure system settings and integrations
        </p>
      </div>

      <div className="grid gap-6">
        {/* Analytics Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Google Analytics Configuration
            </CardTitle>
            <CardDescription>
              Track website traffic and user behavior with Google Analytics 4
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status Badges */}
            <div className="flex flex-wrap gap-3">
              {hasGaId ? (
                <Badge variant="default" className="bg-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  GA ID Configured
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <XCircle className="h-3 w-3 mr-1" />
                  GA ID Not Set
                </Badge>
              )}
              
              {analyticsConsent ? (
                <Badge variant="default" className="bg-blue-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  User Consent: Granted
                </Badge>
              ) : (
                <Badge variant="outline">
                  <Info className="h-3 w-3 mr-1" />
                  User Consent: Pending
                </Badge>
              )}
            </div>

            {/* Configuration Priority Info */}
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Configuration Priority:</strong> Database value (below) takes precedence over environment variable. 
                If no database value is set, the system falls back to VITE_GA_MEASUREMENT_ID.
              </AlertDescription>
            </Alert>

            {/* Configuration */}
            <div className="space-y-6 pt-4 border-t">
              {/* Environment Variable Display */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Environment Variable (Fallback)
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={import.meta.env.VITE_GA_MEASUREMENT_ID || "Not set"}
                    disabled
                    className="font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    data-testid="input-env-ga-id"
                  />
                  <Badge variant="secondary" className="px-3 py-2">
                    Read-only
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  VITE_GA_MEASUREMENT_ID - Set this in your environment/secrets configuration
                </p>
              </div>

              {/* Database Configuration (Primary) */}
              <div className="space-y-2">
                <Label htmlFor="ga-id" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Database Configuration (Primary) {gaSetting?.value && <Badge className="ml-2 bg-green-600">Active</Badge>}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="ga-id"
                    data-testid="input-ga-measurement-id"
                    value={gaId}
                    onChange={(e) => setGaId(e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                    disabled={isLoading}
                    className="font-mono"
                  />
                  <Button 
                    data-testid="button-save-ga-id"
                    onClick={handleSave}
                    disabled={saveMutation.isPending || isLoading}
                  >
                    {saveMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {gaSetting?.value 
                    ? "✓ Database value is active and will override the environment variable" 
                    : "Enter a measurement ID to override the environment variable fallback"}
                </p>
              </div>

              {!hasGaId && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>How to set up Google Analytics:</strong>
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                      <li>Go to your Google Analytics account</li>
                      <li>Navigate to Admin → Property → Data Streams → Web</li>
                      <li>Select your web stream (or create one if it doesn't exist)</li>
                      <li>Copy the Measurement ID (starts with "G-")</li>
                      <li>Add it to the Secrets tab with key: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">VITE_GA_MEASUREMENT_ID</code></li>
                    </ol>
                  </AlertDescription>
                </Alert>
              )}

              {hasGaId && (
                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    Google Analytics is properly configured and will start tracking once users consent to analytics cookies.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Features */}
            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-semibold text-sm">Tracked Metrics:</h4>
              <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Page views and navigation
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Time spent on pages
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  User interactions & clicks
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Traffic sources
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Device & browser info
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Geographic location
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Consent Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              Cookie Consent & Privacy
            </CardTitle>
            <CardDescription>
              GDPR and CCPA compliant cookie management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">Cookie Consent Banner Active</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your website displays a cookie consent banner to all new visitors. Users can accept, reject, or customize their cookie preferences. Analytics tracking only activates after explicit user consent.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-semibold text-sm">Cookie Categories:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">Required</Badge>
                  <div>
                    <p className="font-medium">Necessary Cookies</p>
                    <p className="text-gray-600 dark:text-gray-400">Essential for website functionality (always enabled)</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">Optional</Badge>
                  <div>
                    <p className="font-medium">Analytics Cookies</p>
                    <p className="text-gray-600 dark:text-gray-400">Google Analytics for tracking user behavior and site performance</p>
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Additional Settings (Future) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Additional Settings
            </CardTitle>
            <CardDescription>
              More configuration options coming soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>Future settings will include:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Email configuration (SMTP settings)</li>
                <li>SEO defaults (meta tags, OG images)</li>
                <li>Security settings (2FA, password policies)</li>
                <li>Integration settings (third-party APIs)</li>
                <li>System settings (maintenance mode, backups)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
