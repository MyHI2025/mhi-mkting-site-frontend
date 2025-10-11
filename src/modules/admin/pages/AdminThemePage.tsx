import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Palette, Save, RotateCcw, Eye, Brush, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/api";

const colorSchema = z.object({
  primary: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  secondary: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  accent: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  background: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  foreground: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  muted: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
  border: z.string().regex(/^#[0-9A-F]{6}$/i, "Must be a valid hex color"),
});

const typographySchema = z.object({
  fontFamily: z.string().min(1, "Font family is required"),
  headingFont: z.string().optional(),
  fontSize: z.enum(["small", "medium", "large"]).default("medium"),
  lineHeight: z.enum(["tight", "normal", "relaxed"]).default("normal"),
});

type ColorForm = z.infer<typeof colorSchema>;
type TypographyForm = z.infer<typeof typographySchema>;

interface ThemePreview {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  fontFamily: string;
  headingFont?: string;
  fontSize: string;
  lineHeight: string;
}

export default function AdminThemePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("colors");
  const [previewMode, setPreviewMode] = useState(false);

  // Default theme values
  const defaultTheme = {
    primary: "#3B82F6",
    secondary: "#6B7280",
    accent: "#10B981",
    background: "#FFFFFF",
    foreground: "#111827",
    muted: "#F3F4F6",
    border: "#E5E7EB",
    fontFamily: "Inter, sans-serif",
    headingFont: "Inter, sans-serif",
    fontSize: "medium" as const,
    lineHeight: "normal" as const,
  };

  // Fetch current theme
  const { data: currentTheme = defaultTheme, isLoading } = useQuery({
    queryKey: [api.admin.activeTheme],
    queryFn: () => apiRequest(api.admin.activeTheme),
  });

  // Extract theme settings from backend response
  const themeData = currentTheme?.settings || currentTheme || defaultTheme;

  // Color form
  const colorForm = useForm<ColorForm>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      primary: themeData.primary || defaultTheme.primary,
      secondary: themeData.secondary || defaultTheme.secondary,
      accent: themeData.accent || defaultTheme.accent,
      background: themeData.background || defaultTheme.background,
      foreground: themeData.foreground || defaultTheme.foreground,
      muted: themeData.muted || defaultTheme.muted,
      border: themeData.border || defaultTheme.border,
    },
  });

  // Typography form
  const typographyForm = useForm<TypographyForm>({
    resolver: zodResolver(typographySchema),
    defaultValues: {
      fontFamily: themeData.fontFamily || defaultTheme.fontFamily,
      headingFont: themeData.headingFont || defaultTheme.headingFont,
      fontSize: themeData.fontSize || defaultTheme.fontSize,
      lineHeight: themeData.lineHeight || defaultTheme.lineHeight,
    },
  });

  // Sync forms with loaded theme data
  useEffect(() => {
    if (!isLoading && currentTheme) {
      const loadedThemeData = currentTheme?.settings || currentTheme || defaultTheme;
      
      // Reset color form with loaded data
      colorForm.reset({
        primary: loadedThemeData.primary || defaultTheme.primary,
        secondary: loadedThemeData.secondary || defaultTheme.secondary,
        accent: loadedThemeData.accent || defaultTheme.accent,
        background: loadedThemeData.background || defaultTheme.background,
        foreground: loadedThemeData.foreground || defaultTheme.foreground,
        muted: loadedThemeData.muted || defaultTheme.muted,
        border: loadedThemeData.border || defaultTheme.border,
      });
      
      // Reset typography form with loaded data
      typographyForm.reset({
        fontFamily: loadedThemeData.fontFamily || defaultTheme.fontFamily,
        headingFont: loadedThemeData.headingFont || defaultTheme.headingFont,
        fontSize: loadedThemeData.fontSize || defaultTheme.fontSize,
        lineHeight: loadedThemeData.lineHeight || defaultTheme.lineHeight,
      });
    }
  }, [isLoading, currentTheme, colorForm, typographyForm]);

  // Update theme mutation
  const updateThemeMutation = useMutation({
    mutationFn: (data: Partial<ThemePreview>) => apiRequest(api.admin.activeTheme, "PUT", { settings: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.activeTheme], exact: false });
      toast({
        title: "Theme updated",
        description: "Your website theme has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update theme",
        variant: "destructive",
      });
    },
  });

  // Reset to default theme mutation
  const resetThemeMutation = useMutation({
    mutationFn: () => apiRequest(api.admin.activeTheme, "PUT", { settings: defaultTheme }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.activeTheme], exact: false });
      colorForm.reset(defaultTheme);
      typographyForm.reset(defaultTheme);
      toast({
        title: "Theme reset",
        description: "Your theme has been reset to default settings.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to reset theme",
        variant: "destructive",
      });
    },
  });

  const onColorSubmit = (data: ColorForm) => {
    updateThemeMutation.mutate(data);
  };

  const onTypographySubmit = (data: TypographyForm) => {
    updateThemeMutation.mutate(data);
  };

  const handleSaveAll = () => {
    const combinedData = {
      ...colorForm.getValues(),
      ...typographyForm.getValues(),
    };
    updateThemeMutation.mutate(combinedData);
  };

  const handleResetTheme = () => {
    if (window.confirm("Are you sure you want to reset all theme settings to default? This action cannot be undone.")) {
      resetThemeMutation.mutate();
    }
  };

  // Color presets
  const colorPresets = [
    {
      name: "Default Blue",
      colors: {
        primary: "#3B82F6",
        secondary: "#6B7280",
        accent: "#10B981",
        background: "#FFFFFF",
        foreground: "#111827",
        muted: "#F3F4F6",
        border: "#E5E7EB",
      }
    },
    {
      name: "Purple Theme",
      colors: {
        primary: "#8B5CF6",
        secondary: "#6B7280",
        accent: "#F59E0B",
        background: "#FFFFFF",
        foreground: "#111827",
        muted: "#F3F4F6",
        border: "#E5E7EB",
      }
    },
    {
      name: "Green Healthcare",
      colors: {
        primary: "#059669",
        secondary: "#6B7280",
        accent: "#3B82F6",
        background: "#FFFFFF",
        foreground: "#111827",
        muted: "#F0FDF4",
        border: "#D1FAE5",
      }
    },
    {
      name: "Dark Mode",
      colors: {
        primary: "#60A5FA",
        secondary: "#9CA3AF",
        accent: "#34D399",
        background: "#111827",
        foreground: "#F9FAFB",
        muted: "#1F2937",
        border: "#374151",
      }
    },
  ];

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    colorForm.reset(preset.colors);
  };

  // Get preview values for live preview
  const getPreviewValues = (): ThemePreview => ({
    ...colorForm.watch(),
    ...typographyForm.watch(),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Theme Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Customize your website's appearance, colors, and typography.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleSaveAll}
            disabled={updateThemeMutation.isPending}
            data-testid="button-save-theme"
          >
            <Save className="w-4 h-4 mr-2" />
            {updateThemeMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleResetTheme}
            disabled={resetThemeMutation.isPending}
            data-testid="button-reset-theme"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={() => setPreviewMode(!previewMode)}
          data-testid="button-toggle-preview"
        >
          <Eye className="w-4 h-4 mr-2" />
          {previewMode ? "Exit Preview" : "Preview Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Editor */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="colors" data-testid="tab-colors">
                <Palette className="w-4 h-4 mr-2" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" data-testid="tab-typography">
                <Type className="w-4 h-4 mr-2" />
                Typography
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-6">
              {/* Color Presets */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Color Presets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {colorPresets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        className="h-auto p-3 flex flex-col items-start"
                        onClick={() => applyColorPreset(preset)}
                        data-testid={`preset-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="flex space-x-1 mb-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: preset.colors.primary }}
                          ></div>
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: preset.colors.accent }}
                          ></div>
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: preset.colors.secondary }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{preset.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Color Editor */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Custom Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={colorForm.handleSubmit(onColorSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(colorForm.watch()).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <Label htmlFor={key} className="capitalize">
                            {key === "foreground" ? "Text" : key}
                          </Label>
                          <div className="flex space-x-2">
                            <Input
                              id={key}
                              type="color"
                              className="w-12 h-10 p-1 border-2"
                              {...colorForm.register(key as keyof ColorForm)}
                              data-testid={`color-${key}`}
                            />
                            <Input
                              type="text"
                              placeholder="#000000"
                              className="flex-1"
                              {...colorForm.register(key as keyof ColorForm)}
                              data-testid={`input-${key}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Typography Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={typographyForm.handleSubmit(onTypographySubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fontFamily">Body Font</Label>
                      <select
                        id="fontFamily"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        {...typographyForm.register("fontFamily")}
                        data-testid="select-font-family"
                      >
                        <option value="Inter, sans-serif">Inter (Default)</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Helvetica, sans-serif">Helvetica</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="Times New Roman, serif">Times New Roman</option>
                        <option value="Roboto, sans-serif">Roboto</option>
                        <option value="Open Sans, sans-serif">Open Sans</option>
                        <option value="Lato, sans-serif">Lato</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="headingFont">Heading Font</Label>
                      <select
                        id="headingFont"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        {...typographyForm.register("headingFont")}
                        data-testid="select-heading-font"
                      >
                        <option value="Inter, sans-serif">Inter (Default)</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Helvetica, sans-serif">Helvetica</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="Times New Roman, serif">Times New Roman</option>
                        <option value="Playfair Display, serif">Playfair Display</option>
                        <option value="Montserrat, sans-serif">Montserrat</option>
                        <option value="Poppins, sans-serif">Poppins</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fontSize">Font Size</Label>
                        <select
                          id="fontSize"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                          {...typographyForm.register("fontSize")}
                          data-testid="select-font-size"
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lineHeight">Line Height</Label>
                        <select
                          id="lineHeight"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                          {...typographyForm.register("lineHeight")}
                          data-testid="select-line-height"
                        >
                          <option value="tight">Tight</option>
                          <option value="normal">Normal</option>
                          <option value="relaxed">Relaxed</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Brush className="w-5 h-5 mr-2" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ThemePreviewComponent theme={getPreviewValues()} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Theme Preview Component
function ThemePreviewComponent({ theme }: { theme: ThemePreview }) {
  const previewStyle = {
    backgroundColor: theme.background,
    color: theme.foreground,
    fontFamily: theme.fontFamily,
    lineHeight: theme.lineHeight === "tight" ? "1.25" : theme.lineHeight === "relaxed" ? "1.75" : "1.5",
    fontSize: theme.fontSize === "small" ? "14px" : theme.fontSize === "large" ? "18px" : "16px",
  };

  return (
    <div 
      className="p-6 rounded-lg border-2 space-y-4 min-h-[400px]" 
      style={{ 
        ...previewStyle, 
        borderColor: theme.border,
      }}
      data-testid="theme-preview"
    >
      {/* Header */}
      <header className="pb-4" style={{ borderBottomColor: theme.border, borderBottomWidth: "1px" }}>
        <h1 
          className="text-3xl font-bold mb-2" 
          style={{ 
            color: theme.primary,
            fontFamily: theme.headingFont || theme.fontFamily,
          }}
        >
          My Health Integral
        </h1>
        <p style={{ color: theme.secondary }}>
          Your comprehensive digital healthcare platform
        </p>
      </header>

      {/* Navigation */}
      <nav className="flex space-x-6 pb-4" style={{ borderBottomColor: theme.border, borderBottomWidth: "1px" }}>
        {["Home", "Services", "About", "Contact"].map((item, index) => (
          <a
            key={item}
            className="hover:underline transition-colors"
            style={{ 
              color: index === 0 ? theme.primary : theme.foreground,
              fontWeight: index === 0 ? "600" : "normal",
            }}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Content */}
      <main className="space-y-4">
        <div 
          className="p-4 rounded-lg"
          style={{ backgroundColor: theme.muted }}
        >
          <h2 
            className="text-xl font-semibold mb-2"
            style={{ 
              color: theme.primary,
              fontFamily: theme.headingFont || theme.fontFamily,
            }}
          >
            Welcome to Digital Healthcare
          </h2>
          <p style={{ color: theme.foreground }}>
            Experience modern healthcare through our comprehensive digital platform. 
            Connect with healthcare providers, manage your health records, and access 
            AI-powered diagnostic tools.
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            className="px-4 py-2 rounded-md font-medium transition-colors"
            style={{ 
              backgroundColor: theme.primary,
              color: theme.background,
            }}
          >
            Get Started
          </button>
          <button
            className="px-4 py-2 rounded-md font-medium border transition-colors"
            style={{ 
              borderColor: theme.border,
              color: theme.foreground,
            }}
          >
            Learn More
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {[
            { title: "Telemedicine", desc: "Connect with healthcare providers remotely" },
            { title: "Health Records", desc: "Secure digital health record management" },
            { title: "AI Diagnostics", desc: "Advanced AI-powered health assessments" },
            { title: "Emergency Care", desc: "24/7 emergency care coordination" },
          ].map((service) => (
            <div
              key={service.title}
              className="p-4 rounded-lg border"
              style={{ 
                borderColor: theme.border,
                backgroundColor: theme.background,
              }}
            >
              <h3 
                className="font-semibold mb-1"
                style={{ 
                  color: theme.accent,
                  fontFamily: theme.headingFont || theme.fontFamily,
                }}
              >
                {service.title}
              </h3>
              <p 
                className="text-sm"
                style={{ color: theme.secondary }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}