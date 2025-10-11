import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Eye, EyeOff, Globe, Layout, Image, Type, Square, Zap, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MediaLibrary from "@/components/admin/MediaLibrary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { api } from "@/lib/api";
import type { Page, ContentSection, ContentBlock } from "@myhealthintegral/shared";

const createPageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

const createSectionSchema = z.object({
  sectionType: z.string().min(1, "Section type is required"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  content: z.record(z.any()).optional(),
});

const richContentSectionSchema = z.object({
  sectionType: z.string().min(1, "Section type is required"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  content: z.object({
    description: z.string().optional(),
    features: z.array(z.string()).optional(),
    buttonText: z.string().optional(),
    buttonUrl: z.string().optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
  }).optional(),
});

type CreatePageForm = z.infer<typeof createPageSchema>;
type CreateSectionForm = z.infer<typeof createSectionSchema>;
type RichContentSectionForm = z.infer<typeof richContentSectionSchema>;

interface SectionContentData {
  description?: string;
  features?: string[];
  buttonText?: string;
  buttonUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export default function AdminContentPage() {
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<Page | null>(null);
  
  // Content sections management state
  const [isContentSectionsOpen, setIsContentSectionsOpen] = useState(false);
  const [selectedPageForContent, setSelectedPageForContent] = useState<Page | null>(null);
  const [isCreateSectionOpen, setIsCreateSectionOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<ContentSection | null>(null);
  const [isEditSectionOpen, setIsEditSectionOpen] = useState(false);
  const [isDeleteSectionOpen, setIsDeleteSectionOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<ContentSection | null>(null);
  
  // Media library state
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [currentImageField, setCurrentImageField] = useState<'imageUrl' | null>(null);

  // Create page form
  const form = useForm<CreatePageForm>({
    resolver: zodResolver(createPageSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
    },
  });

  // Edit page form
  const editForm = useForm<CreatePageForm>({
    resolver: zodResolver(createPageSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
    },
  });

  // Edit section form
  const editSectionForm = useForm<RichContentSectionForm>({
    resolver: zodResolver(richContentSectionSchema),
    defaultValues: {
      sectionType: "",
      title: "",
      subtitle: "",
      content: {
        description: "",
        features: [],
        buttonText: "",
        buttonUrl: "",
        imageUrl: "",
        imageAlt: "",
      },
    },
  });

  // Fetch all pages
  const { data: pages = [], isLoading } = useQuery<Page[]>({
    queryKey: [api.admin.pages],
  });

  // Fetch content sections for selected page
  const { data: contentSections = [], isLoading: sectionsLoading } = useQuery<ContentSection[]>({
    queryKey: [api.admin.pages, selectedPageForContent?.id, "sections"],
    queryFn: () => selectedPageForContent ? apiRequest(api.admin.pageSections(selectedPageForContent.id)) : [],
    enabled: !!selectedPageForContent,
  });

  // Create page mutation
  const createPageMutation = useMutation({
    mutationFn: (data: CreatePageForm) => apiRequest(api.admin.pages, "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.pages] });
      setIsCreateDialogOpen(false);
      form.reset();
      toast({
        title: "Page created",
        description: "The new page has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create page",
        variant: "destructive",
      });
    },
  });

  // Migrate page mutation
  const migratePageMutation = useMutation({
    mutationFn: (pageId: string) => apiRequest(api.admin.pageMigrate(pageId), "POST"),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: [api.admin.pages, selectedPageForContent?.id, "sections"] 
      });
      toast({
        title: "Page migrated successfully",
        description: `Created ${data.sectionsCreated} content sections. You can now edit this page content!`,
      });
    },
    onError: (error: any) => {
      const isAlreadyMigrated = error.message?.includes("already has content sections");
      toast({
        title: isAlreadyMigrated ? "Page already migrated" : "Migration failed",
        description: isAlreadyMigrated 
          ? "This page already has content sections. Try refreshing the page to see them."
          : error.message || "Failed to migrate page",
        variant: isAlreadyMigrated ? "default" : "destructive",
      });
      
      // Refresh sections if page was already migrated
      if (isAlreadyMigrated && selectedPageForContent?.id) {
        queryClient.invalidateQueries({ 
          queryKey: [api.admin.pages, selectedPageForContent.id, "sections"] 
        });
      }
    },
  });

  // Update page mutation
  const updatePageMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreatePageForm }) => 
      apiRequest(api.admin.page(id), "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.pages] });
      setIsEditDialogOpen(false);
      setSelectedPage(null);
      editForm.reset();
      toast({
        title: "Page updated",
        description: "The page has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update page",
        variant: "destructive",
      });
    },
  });

  // Delete page mutation
  const deletePageMutation = useMutation({
    mutationFn: (pageId: string) => apiRequest(api.admin.page(pageId), "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.pages] });
      toast({
        title: "Page deleted",
        description: "The page has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete page",
        variant: "destructive",
      });
    },
  });

  // Toggle page publication mutation
  const togglePublishMutation = useMutation({
    mutationFn: ({ pageId, isPublished }: { pageId: string; isPublished: boolean }) =>
      apiRequest(api.admin.pagePublish(pageId), "PATCH", { isPublished }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.pages] });
      toast({
        title: "Page updated",
        description: "Page publication status updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update page",
        variant: "destructive",
      });
    },
  });

  const handleDeletePage = (page: Page) => {
    setPageToDelete(page);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePage = () => {
    if (pageToDelete) {
      deletePageMutation.mutate(pageToDelete.id);
      setIsDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };

  const handleTogglePublish = (page: Page) => {
    togglePublishMutation.mutate({
      pageId: page.id,
      isPublished: !page.isPublished,
    });
  };

  const onSubmit = (data: CreatePageForm) => {
    createPageMutation.mutate(data);
  };

  const onEditSubmit = (data: CreatePageForm) => {
    if (selectedPage) {
      updatePageMutation.mutate({ id: selectedPage.id, data });
    }
  };

  const handleEditPage = (page: Page) => {
    setSelectedPage(page);
    editForm.reset({
      title: page.title,
      slug: page.slug,
      description: page.description || "",
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleEditContent = (page: Page) => {
    setSelectedPageForContent(page);
    setIsContentSectionsOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString();
  };

  const getSectionIcon = (sectionType: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'hero': <Layout className="w-4 h-4" />,
      'services': <Square className="w-4 h-4" />,
      'features': <Type className="w-4 h-4" />,
      'about': <Edit className="w-4 h-4" />,
      'contact': <Globe className="w-4 h-4" />,
      'testimonials': <Eye className="w-4 h-4" />,
      'stats': <Plus className="w-4 h-4" />,
      'cta': <Image className="w-4 h-4" />,
    };
    return iconMap[sectionType] || <Layout className="w-4 h-4" />;
  };

  const getSectionTypes = () => [
    {
      type: 'hero',
      label: 'Hero Section',
      description: 'Main banner with title and CTA',
      icon: <Layout className="w-5 h-5" />
    },
    {
      type: 'services',
      label: 'Services',
      description: 'Service offerings grid',
      icon: <Square className="w-5 h-5" />
    },
    {
      type: 'features',
      label: 'Features',
      description: 'Feature highlights list',
      icon: <Type className="w-5 h-5" />
    },
    {
      type: 'about',
      label: 'About',
      description: 'About us content',
      icon: <Edit className="w-5 h-5" />
    },
    {
      type: 'testimonials',
      label: 'Testimonials',
      description: 'Customer reviews',
      icon: <Eye className="w-5 h-5" />
    },
    {
      type: 'contact',
      label: 'Contact',
      description: 'Contact information',
      icon: <Globe className="w-5 h-5" />
    },
    {
      type: 'stats',
      label: 'Statistics',
      description: 'Numbers and metrics',
      icon: <Plus className="w-5 h-5" />
    },
    {
      type: 'cta',
      label: 'Call to Action',
      description: 'Action buttons section',
      icon: <Image className="w-5 h-5" />
    },
  ];

  const createSection = async (sectionType: string) => {
    if (!selectedPageForContent) return;
    
    try {
      await apiRequest(api.admin.sections, "POST", {
        pageId: selectedPageForContent.id,
        sectionType: sectionType,
        title: getSectionTypes().find(s => s.type === sectionType)?.label || sectionType,
        subtitle: '',
        content: {},
        displayOrder: contentSections.length,
        isVisible: true
      });
      
      // Refresh sections
      queryClient.invalidateQueries({ 
        queryKey: ["api.admin.pages", selectedPageForContent.id, "sections"] 
      });
      
      setIsCreateSectionOpen(false);
      
      toast({
        title: "Section created",
        description: `${sectionType} section has been added to the page.`,
      });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create section",
        variant: "destructive",
      });
    }
  };

  const handleEditSection = (section: ContentSection) => {
    setSelectedSection(section);
    const content = (section.content || {}) as SectionContentData;
    editSectionForm.reset({
      sectionType: section.sectionType,
      title: section.title || "",
      subtitle: section.subtitle || "",
      content: {
        description: content.description || "",
        features: content.features || [],
        buttonText: content.buttonText || "",
        buttonUrl: content.buttonUrl || "",
        imageUrl: content.imageUrl || "",
        imageAlt: content.imageAlt || "",
      },
    });
    setIsEditSectionOpen(true);
  };

  const handleDeleteSection = (section: ContentSection) => {
    setSectionToDelete(section);
    setIsDeleteSectionOpen(true);
  };

  const updateSection = async (data: RichContentSectionForm) => {
    if (!selectedSection || !selectedPageForContent) return;
    
    try {
      await apiRequest(`/api/admin/sections/${selectedSection.id}`, "PUT", data);
      
      // Refresh sections
      queryClient.invalidateQueries({ 
        queryKey: ["api.admin.pages", selectedPageForContent.id, "sections"] 
      });
      
      setIsEditSectionOpen(false);
      setSelectedSection(null);
      editSectionForm.reset();
      
      toast({
        title: "Section updated",
        description: "The section has been updated successfully.",
      });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update section",
        variant: "destructive",
      });
    }
  };

  const confirmDeleteSection = async () => {
    if (!sectionToDelete || !selectedPageForContent) return;
    
    try {
      await apiRequest(`/api/admin/sections/${sectionToDelete.id}`, "DELETE");
      
      // Refresh sections
      queryClient.invalidateQueries({ 
        queryKey: ["api.admin.pages", selectedPageForContent.id, "sections"] 
      });
      
      setIsDeleteSectionOpen(false);
      setSectionToDelete(null);
      
      toast({
        title: "Section deleted",
        description: "The section has been deleted successfully.",
      });
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete section",
        variant: "destructive",
      });
    }
  };

  // Media library handlers
  const openMediaLibrary = (field: 'imageUrl') => {
    setCurrentImageField(field);
    setIsMediaLibraryOpen(true);
  };

  const handleSelectImage = (imageUrl: string, altText?: string) => {
    if (currentImageField === 'imageUrl') {
      editSectionForm.setValue('content.imageUrl', imageUrl);
      if (altText) {
        editSectionForm.setValue('content.imageAlt', altText);
      }
    }
    setIsMediaLibraryOpen(false);
    setCurrentImageField(null);
  };

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your website pages and content. Create, edit, and publish content for all user types.
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-page">
                <Plus className="w-4 h-4 mr-2" />
                Create New Page
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Page</DialogTitle>
                <DialogDescription>
                  Add a new page to your website. Pages are used to organize content for different user types.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Page Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter page title" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              if (!form.getValues("slug")) {
                                form.setValue("slug", generateSlug(e.target.value));
                              }
                            }}
                            data-testid="input-create-title" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="page-url-slug" {...field} data-testid="input-create-slug" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Brief description of the page" {...field} data-testid="input-create-description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsCreateDialogOpen(false)}
                      data-testid="button-cancel-create"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createPageMutation.isPending}
                      data-testid="button-submit-create"
                    >
                      {createPageMutation.isPending ? "Creating..." : "Create Page"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Page Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Page</DialogTitle>
              <DialogDescription>
                Update the page information. Changes will be saved to your website.
              </DialogDescription>
            </DialogHeader>
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <FormField
                  control={editForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter page title" 
                          {...field} 
                          data-testid="input-edit-title" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="page-url-slug" {...field} data-testid="input-edit-slug" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Brief description of the page" {...field} data-testid="input-edit-description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditDialogOpen(false)}
                    data-testid="button-cancel-edit"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={updatePageMutation.isPending}
                    data-testid="button-submit-edit"
                  >
                    {updatePageMutation.isPending ? "Updating..." : "Update Page"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <Card key={page.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold">{page.title}</CardTitle>
                      <CardDescription className="mt-1">
                        /{page.slug}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Badge 
                        variant={page.isPublished ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {page.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {page.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {page.description}
                    </p>
                  )}
                  
                  <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                    <div>Created: {formatDate(page.createdAt)}</div>
                    <div>Updated: {formatDate(page.updatedAt)}</div>
                    {page.publishedAt && (
                      <div>Published: {formatDate(page.publishedAt)}</div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditPage(page)}
                      data-testid={`button-edit-${page.slug}`}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    
                    <Link href={`/admin/edit-page/${page.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid={`button-edit-content-${page.slug}`}
                      >
                        <Layout className="w-3 h-3 mr-1" />
                        Content
                      </Button>
                    </Link>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTogglePublish(page)}
                      disabled={togglePublishMutation.isPending}
                      data-testid={`button-toggle-publish-${page.slug}`}
                    >
                      {page.isPublished ? (
                        <>
                          <EyeOff className="w-3 h-3 mr-1" />
                          Unpublish
                        </>
                      ) : (
                        <>
                          <Globe className="w-3 h-3 mr-1" />
                          Publish
                        </>
                      )}
                    </Button>
                    
                    {page.isPublished && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          let url = '/';
                          if (page.slug === 'home') {
                            url = '/';
                          } else if (page.pageType === 'job') {
                            url = `/career/${page.slug}`;
                          } else {
                            url = `/${page.slug}`;
                          }
                          window.open(url, '_blank');
                        }}
                        data-testid={`button-preview-${page.slug}`}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeletePage(page)}
                      disabled={deletePageMutation.isPending}
                      data-testid={`button-delete-${page.slug}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {pages.length === 0 && !isLoading && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    No pages yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Get started by creating your first page.
                  </p>
                </div>
                <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-create-first-page">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Page
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Page</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{pageToDelete?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
                data-testid="button-cancel-delete"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDeletePage}
                disabled={deletePageMutation.isPending}
                data-testid="button-confirm-delete"
              >
                {deletePageMutation.isPending ? "Deleting..." : "Delete Page"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Content Sections Management Dialog */}
        <Dialog open={isContentSectionsOpen} onOpenChange={setIsContentSectionsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Layout className="w-5 h-5" />
                <span>Content Sections - {selectedPageForContent?.title}</span>
              </DialogTitle>
              <DialogDescription>
                Manage the content sections and blocks for this page. Add, edit, and reorder sections to build your page content.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Add Section Button */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Page Sections</h3>
                <Button
                  onClick={() => setIsCreateSectionOpen(true)}
                  data-testid="button-add-section"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </div>

              {/* Content Sections List */}
              {sectionsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg h-24"></div>
                  ))}
                </div>
              ) : contentSections.length > 0 ? (
                <div className="space-y-4">
                  {contentSections.map((section) => (
                    <Card key={section.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                {getSectionIcon(section.sectionType)}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {section.title || section.sectionType}
                                  {!section.isVisible && (
                                    <Badge variant="secondary" className="ml-2">Hidden</Badge>
                                  )}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {section.subtitle || `${section.sectionType} section`}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditSection(section)}
                              data-testid={`button-edit-section-${section.id}`}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteSection(section)}
                              data-testid={`button-delete-section-${section.id}`}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                        <Layout className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          No content sections yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                          This page doesn't have editable content sections yet. You can migrate it to create sections based on existing content, or start fresh.
                        </p>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <Button 
                          onClick={() => {
                            if (selectedPageForContent?.id) {
                              migratePageMutation.mutate(selectedPageForContent.id);
                            }
                          }}
                          disabled={migratePageMutation.isPending || !selectedPageForContent?.id}
                          data-testid="button-migrate-page"
                        >
                          {migratePageMutation.isPending ? (
                            "Migrating..."
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Migrate Existing Content
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setIsCreateSectionOpen(true)} 
                          data-testid="button-add-first-section"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Start Fresh
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Create Section Dialog */}
        <Dialog open={isCreateSectionOpen} onOpenChange={setIsCreateSectionOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Content Section</DialogTitle>
              <DialogDescription>
                Choose a section type to add to your page. Each section type has different content options.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Select Section Type</h4>
              <div className="grid grid-cols-2 gap-3">
                {getSectionTypes().map((sectionType) => (
                  <Button
                    key={sectionType.type}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    onClick={() => createSection(sectionType.type)}
                    data-testid={`button-create-${sectionType.type}`}
                  >
                    {sectionType.icon}
                    <span className="text-sm font-medium">{sectionType.label}</span>
                    <span className="text-xs text-gray-500 text-center">{sectionType.description}</span>
                  </Button>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Section Dialog */}
        <Dialog open={isEditSectionOpen} onOpenChange={setIsEditSectionOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Section Content</DialogTitle>
              <DialogDescription>
                Update the section information and rich content using the WYSIWYG editor below.
              </DialogDescription>
            </DialogHeader>
            <Form {...editSectionForm}>
              <form onSubmit={editSectionForm.handleSubmit(updateSection)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editSectionForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter section title" 
                            {...field} 
                            data-testid="input-edit-section-title" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editSectionForm.control}
                    name="subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Subtitle (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter section subtitle" 
                            {...field} 
                            data-testid="input-edit-section-subtitle" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={editSectionForm.control}
                  name="content.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rich Content Description</FormLabel>
                      <FormControl>
                        <div className="border rounded-md">
                          <ReactQuill
                            theme="snow"
                            value={field.value || ""}
                            onChange={field.onChange}
                            placeholder="Write your content here..."
                            data-testid="editor-section-description"
                            modules={{
                              toolbar: [
                                [{ 'header': [1, 2, 3, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['blockquote', 'code-block'],
                                ['link', 'image'],
                                ['clean']
                              ],
                            }}
                            formats={[
                              'header', 'bold', 'italic', 'underline', 'strike',
                              'list', 'bullet', 'blockquote', 'code-block',
                              'link', 'image'
                            ]}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editSectionForm.control}
                    name="content.buttonText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Text (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Learn More, Get Started" 
                            {...field} 
                            data-testid="input-button-text" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editSectionForm.control}
                    name="content.buttonUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button URL (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., /contact, /services" 
                            {...field} 
                            data-testid="input-button-url" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editSectionForm.control}
                    name="content.imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL (Optional)</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input 
                              placeholder="https://example.com/image.jpg" 
                              {...field} 
                              data-testid="input-image-url" 
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => openMediaLibrary('imageUrl')}
                              data-testid="button-open-media-library"
                            >
                              <Image className="w-4 h-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editSectionForm.control}
                    name="content.imageAlt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Alt Text (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Describe the image for accessibility" 
                            {...field} 
                            data-testid="input-image-alt" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditSectionOpen(false)}
                    data-testid="button-cancel-edit-section"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    data-testid="button-submit-edit-section"
                  >
                    Update Section
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Delete Section Confirmation Dialog */}
        <Dialog open={isDeleteSectionOpen} onOpenChange={setIsDeleteSectionOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Section</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{sectionToDelete?.title || sectionToDelete?.sectionType}"? This will also delete all content blocks within this section. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteSectionOpen(false)}
                data-testid="button-cancel-delete-section"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDeleteSection}
                data-testid="button-confirm-delete-section"
              >
                Delete Section
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Media Library */}
        <MediaLibrary
          isOpen={isMediaLibraryOpen}
          onClose={() => {
            setIsMediaLibraryOpen(false);
            setCurrentImageField(null);
          }}
          onSelectImage={handleSelectImage}
          showSelectButton={true}
        />
      </div>
  );
}