import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plus,
  Edit,
  Trash2,
  Move,
  ExternalLink,
  Home,
  FileText,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { api } from "@/lib/api";
import { type NavigationItem } from "@myhi2025/shared";

const createNavigationSchema = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().min(1, "URL is required"),
  isVisible: z.boolean().optional().default(true),
  target: z.enum(["_self", "_blank"]).optional().default("_self"),
  parentId: z.string().optional(),
});

type CreateNavigationForm = z.infer<typeof createNavigationSchema>;

export default function AdminNavigationPage() {
  const { toast } = useToast();
  const [selectedNav, setSelectedNav] = useState<NavigationItem | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [navToDelete, setNavToDelete] = useState<NavigationItem | null>(null);

  // Fetch navigation items
  const { data: navigationItems = [], isLoading } = useQuery({
    queryKey: [api.admin.navigation],
    queryFn: () => apiRequest(api.admin.navigation),
  });

  // Fetch pages for URL suggestions
  const { data: pages = [] } = useQuery({
    queryKey: [api.admin.pages],
    queryFn: () => apiRequest(api.admin.pages),
  });

  // Create navigation form
  const createForm = useForm<CreateNavigationForm>({
    resolver: zodResolver(createNavigationSchema),
    defaultValues: {
      label: "",
      href: "",
      isVisible: true,
      target: "_self",
      parentId: undefined,
    },
  });

  // Edit navigation form
  const editForm = useForm<CreateNavigationForm>({
    resolver: zodResolver(createNavigationSchema),
    defaultValues: {
      label: "",
      href: "",
      isVisible: true,
      target: "_self",
      parentId: undefined,
    },
  });

  // Create navigation mutation
  const createNavigationMutation = useMutation({
    mutationFn: (data: CreateNavigationForm) =>
      apiRequest(api.admin.navigation, "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.admin.navigation],
        exact: false,
      });
      setIsCreateDialogOpen(false);
      createForm.reset();
      toast({
        title: "Navigation created",
        description: "The navigation item has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create navigation item",
        variant: "destructive",
      });
    },
  });

  // Update navigation mutation
  const updateNavigationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateNavigationForm }) =>
      apiRequest(api.admin.navigationItem(id), "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.admin.navigation],
        exact: false,
      });
      setIsEditDialogOpen(false);
      setSelectedNav(null);
      editForm.reset();
      toast({
        title: "Navigation updated",
        description: "The navigation item has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update navigation item",
        variant: "destructive",
      });
    },
  });

  // Delete navigation mutation
  const deleteNavigationMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest(api.admin.navigationItem(id), "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [api.admin.navigation],
        exact: false,
      });
      setIsDeleteDialogOpen(false);
      setNavToDelete(null);
      toast({
        title: "Navigation deleted",
        description: "The navigation item has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete navigation item",
        variant: "destructive",
      });
    },
  });

  const handleEditNavigation = (nav: NavigationItem) => {
    setSelectedNav(nav);
    editForm.reset({
      label: nav.label,
      href: nav.href || "",
      isVisible: nav.isVisible ?? true,
      target: (nav.target as "_self" | "_blank") || "_self",
      parentId: nav.parentId || "none",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteNavigation = (nav: NavigationItem) => {
    setNavToDelete(nav);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteNavigation = () => {
    if (navToDelete) {
      deleteNavigationMutation.mutate(navToDelete.id);
    }
  };

  const onCreateSubmit = (data: CreateNavigationForm) => {
    const submitData = {
      ...data,
      parentId: data.parentId === "none" ? undefined : data.parentId,
    };
    createNavigationMutation.mutate(submitData);
  };

  const onEditSubmit = (data: CreateNavigationForm) => {
    if (selectedNav) {
      const submitData = {
        ...data,
        parentId: data.parentId === "none" ? undefined : data.parentId,
      };
      updateNavigationMutation.mutate({ id: selectedNav.id, data: submitData });
    }
  };

  // Helper function to organize navigation items by parent
  const organizeNavigationItems = (items: NavigationItem[]) => {
    const topLevel = items.filter((item) => !item.parentId);
    const children = items.filter((item) => item.parentId);

    return topLevel.map((parent) => ({
      ...parent,
      children: children.filter((child) => child.parentId === parent.id),
    }));
  };

  const organizedNavigation = organizeNavigationItems(navigationItems);

  const getNavIcon = (href: string) => {
    if (href?.startsWith("http")) return <ExternalLink className="w-4 h-4" />;
    if (href === "/" || href === "/home") return <Home className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Navigation Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure your website's navigation structure and menu items.
        </p>
      </div>

      {/* Create Navigation Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Navigation Items
        </h2>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          data-testid="button-create-navigation"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Navigation Item
        </Button>
      </div>

      {/* Navigation Items List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : organizedNavigation.length > 0 ? (
        <div className="space-y-4">
          {organizedNavigation.map((nav) => (
            <Card
              key={nav.id}
              className="group hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        nav.isVisible
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      {getNavIcon(nav.href || "")}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {nav.label}
                        {!nav.isVisible && (
                          <span className="ml-2 text-xs text-gray-500">
                            (Disabled)
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {nav.href} {nav.href?.startsWith("http") && "↗"}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            nav.href?.startsWith("http")
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {nav.href?.startsWith("http")
                            ? "external"
                            : "internal"}
                        </span>
                        {nav.target === "_blank" && (
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                            New Tab
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditNavigation(nav)}
                      data-testid={`button-edit-${nav.id}`}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteNavigation(nav)}
                      disabled={deleteNavigationMutation.isPending}
                      data-testid={`button-delete-${nav.id}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Child Navigation Items */}
                {nav.children && nav.children.length > 0 && (
                  <div className="mt-4 ml-8 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-4">
                    {nav.children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          {getNavIcon(child.href || "")}
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {child.label}
                            {!child.isVisible && (
                              <span className="ml-2 text-xs text-gray-500">
                                (Disabled)
                              </span>
                            )}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            → {child.href}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditNavigation(child)}
                            data-testid={`button-edit-${child.id}`}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteNavigation(child)}
                            data-testid={`button-delete-${child.id}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Menu className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  No navigation items yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Create your first navigation item to build your website menu.
                </p>
              </div>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                data-testid="button-create-first-navigation"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Navigation Item
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Navigation Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Navigation Item</DialogTitle>
            <DialogDescription>
              Add a new item to your website navigation menu.
            </DialogDescription>
          </DialogHeader>
          <Form {...createForm}>
            <form
              onSubmit={createForm.handleSubmit(onCreateSubmit)}
              className="space-y-4"
            >
              <FormField
                control={createForm.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menu Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Home, About, Contact..."
                        {...field}
                        data-testid="input-create-label"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createForm.control}
                name="href"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="/about or https://example.com"
                        {...field}
                        data-testid="input-create-href"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createForm.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Open In</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-create-target">
                          <SelectValue placeholder="Select target" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="_self">Same Tab</SelectItem>
                        <SelectItem value="_blank">New Tab</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createForm.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Menu (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-create-parent">
                          <SelectValue placeholder="None (Top-level menu)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">
                          None (Top-level menu)
                        </SelectItem>
                        {navigationItems
                          .filter((nav: NavigationItem) => !nav.parentId)
                          .map((nav: NavigationItem) => (
                            <SelectItem key={nav.id} value={nav.id}>
                              {nav.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createForm.control}
                name="isVisible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Navigation Item</FormLabel>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Disabled items won't appear in the navigation menu
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="switch-create-visible"
                      />
                    </FormControl>
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
                  disabled={createNavigationMutation.isPending}
                  data-testid="button-submit-create"
                >
                  {createNavigationMutation.isPending
                    ? "Creating..."
                    : "Create Navigation"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Navigation Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Navigation Item</DialogTitle>
            <DialogDescription>
              Update the navigation item details.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(onEditSubmit)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menu Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Home, About, Contact..."
                        {...field}
                        data-testid="input-edit-label"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="href"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="/about or https://example.com"
                        {...field}
                        data-testid="input-edit-href"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Open In</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-edit-target">
                          <SelectValue placeholder="Select target" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="_self">Same Tab</SelectItem>
                        <SelectItem value="_blank">New Tab</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Menu (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-edit-parent">
                          <SelectValue placeholder="None (Top-level menu)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">
                          None (Top-level menu)
                        </SelectItem>
                        {navigationItems
                          .filter(
                            (nav: NavigationItem) =>
                              !nav.parentId && nav.id !== selectedNav?.id
                          )
                          .map((nav: NavigationItem) => (
                            <SelectItem key={nav.id} value={nav.id}>
                              {nav.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="isVisible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Navigation Item</FormLabel>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Disabled items won't appear in the navigation menu
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="switch-edit-visible"
                      />
                    </FormControl>
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
                  disabled={updateNavigationMutation.isPending}
                  data-testid="button-submit-edit"
                >
                  {updateNavigationMutation.isPending
                    ? "Updating..."
                    : "Update Navigation"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Navigation Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{navToDelete?.label}"? This
              action cannot be undone.
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
              onClick={confirmDeleteNavigation}
              disabled={deleteNavigationMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteNavigationMutation.isPending
                ? "Deleting..."
                : "Delete Navigation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
