import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Edit, Trash2, FileText, Eye, EyeOff, ExternalLink } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import MediaLibrary from "@/components/admin/MediaLibrary";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { api } from "@/lib/api";
import { z } from "zod";
import type { Page } from "@myhealthintegral/shared";

const articleFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  topicTags: z.array(z.string()).min(1, "At least one topic tag is required"),
  targetUserTypes: z.array(z.string()).min(1, "At least one user type is required"),
  featuredImage: z.string().optional(),
  isPublished: z.boolean(),
});

type ArticleFormData = z.infer<typeof articleFormSchema>;

const topicTags = [
  "MHI Innovation",
  "Testimonials",
  "News and Update",
  "Telemedicine Tips",
  "Health and Wellness",
  "Faces of MHI"
];

const userTypes = [
  "Patients",
  "Private Physicians",
  "Hospitals/Health Facilities",
  "Pharmacies",
  "Medical Laboratories",
  "Health Insurance Providers",
  "Emergency Services Providers"
];

export default function AdminArticlesPage() {
  const { toast } = useToast();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Page | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<Page | null>(null);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);

  const { data: pages = [], isLoading } = useQuery<Page[]>({
    queryKey: [api.admin.pages],
  });

  const articlePages = pages.filter((p: Page) => p.pageType === "blog");

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      description: "",
      topicTags: [],
      targetUserTypes: [],
      featuredImage: "",
      isPublished: false,
    },
  });

  const saveArticleMutation = useMutation({
    mutationFn: async (data: ArticleFormData) => {
      const slug = editingArticle?.slug || `article-${Date.now()}-${data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      
      const pageData = {
        title: data.title,
        slug,
        description: data.description,
        pageType: "blog",
        topicTags: data.topicTags,
        targetUserTypes: data.targetUserTypes,
        metaTitle: `${data.title} | My Health Integral Blog`,
        metaDescription: data.description,
        featuredImage: data.featuredImage || null,
        isPublished: data.isPublished,
      };

      if (editingArticle) {
        return apiRequest(api.admin.page(editingArticle.id), "PUT", pageData);
      }
      return apiRequest(api.admin.pages, "POST", pageData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.public.pages] });
      queryClient.invalidateQueries({ queryKey: [api.admin.pages] });
      setIsFormDialogOpen(false);
      setEditingArticle(null);
      form.reset();
      toast({
        title: editingArticle ? "Article updated" : "Article created",
        description: `The article has been ${editingArticle ? "updated" : "created"} successfully.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save article",
        variant: "destructive",
      });
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: (id: string) => apiRequest(api.admin.page(id), "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.public.pages] });
      queryClient.invalidateQueries({ queryKey: [api.admin.pages] });
      setIsDeleteDialogOpen(false);
      setArticleToDelete(null);
      toast({
        title: "Article deleted",
        description: "The article has been removed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete article",
        variant: "destructive",
      });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      apiRequest(api.admin.page(id), "PUT", { isPublished }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.public.pages] });
      queryClient.invalidateQueries({ queryKey: [api.admin.pages] });
      toast({
        title: "Article status updated",
        description: "The article visibility has been updated.",
      });
    },
  });

  const handleEdit = (article: Page) => {
    setEditingArticle(article);
    form.reset({
      title: article.title,
      description: article.description || "",
      topicTags: article.topicTags || [],
      targetUserTypes: article.targetUserTypes || [],
      featuredImage: article.featuredImage || "",
      isPublished: article.isPublished || false,
    });
    setIsFormDialogOpen(true);
  };

  const handleDelete = (article: Page) => {
    setArticleToDelete(article);
    setIsDeleteDialogOpen(true);
  };

  const handleNewArticle = () => {
    setEditingArticle(null);
    form.reset({
      title: "",
      description: "",
      topicTags: [],
      targetUserTypes: [],
      featuredImage: "",
      isPublished: false,
    });
    setIsFormDialogOpen(true);
  };

  const handleImageSelect = (url: string) => {
    form.setValue("featuredImage", url);
    setIsMediaLibraryOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Hub Articles</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage blog posts and articles</p>
        </div>
        <Button onClick={handleNewArticle} data-testid="button-new-article">
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Loading articles...</p>
        </div>
      ) : articlePages.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No articles yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Get started by creating your first article</p>
            <Button onClick={handleNewArticle}>
              <Plus className="mr-2 h-4 w-4" />
              Create First Article
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {articlePages.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  {article.featuredImage && (
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      {article.isPublished ? (
                        <Badge variant="default" className="bg-green-600">
                          <Eye className="mr-1 h-3 w-3" />
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <EyeOff className="mr-1 h-3 w-3" />
                          Draft
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {article.topicTags?.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-blue-50 dark:bg-blue-900/30">
                          {tag}
                        </Badge>
                      ))}
                      {article.targetUserTypes?.slice(0, 2).map((type) => (
                        <Badge key={type} variant="secondary" className="bg-green-50 dark:bg-green-900/30">
                          {type}
                        </Badge>
                      ))}
                      {article.targetUserTypes && article.targetUserTypes.length > 2 && (
                        <Badge variant="secondary" className="bg-green-50 dark:bg-green-900/30">
                          +{article.targetUserTypes.length - 2} more
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{article.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/${article.slug}`} target="_blank">
                      <Button variant="ghost" size="sm" data-testid={`view-article-${article.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublishMutation.mutate({ id: article.id, isPublished: !article.isPublished })}
                      disabled={togglePublishMutation.isPending}
                    >
                      {article.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(article)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(article)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Article Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingArticle ? "Edit Article" : "New Article"}</DialogTitle>
            <DialogDescription>
              {editingArticle ? "Update the article details below" : "Fill in the details to create a new article"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => saveArticleMutation.mutate(data))} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Future of Telemedicine in Africa" {...field} />
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
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief overview or excerpt..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="topicTags"
                render={() => (
                  <FormItem>
                    <FormLabel>Topic Tags * (Select at least one)</FormLabel>
                    <div className="grid grid-cols-2 gap-3 border rounded-lg p-4">
                      {topicTags.map((tag) => (
                        <FormField
                          key={tag}
                          control={form.control}
                          name="topicTags"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={tag}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(tag)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, tag])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== tag
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {tag}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetUserTypes"
                render={() => (
                  <FormItem>
                    <FormLabel>Target User Types * (Select at least one)</FormLabel>
                    <div className="grid grid-cols-2 gap-3 border rounded-lg p-4">
                      {userTypes.map((type) => (
                        <FormField
                          key={type}
                          control={form.control}
                          name="targetUserTypes"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={type}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(type)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, type])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== type
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {type}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featuredImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input placeholder="Image URL" {...field} />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsMediaLibraryOpen(true)}
                          >
                            Browse
                          </Button>
                        </div>
                        {field.value && (
                          <img
                            src={field.value}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Publish Article</FormLabel>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Make this article visible on the blog
                      </div>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsFormDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saveArticleMutation.isPending}>
                  {saveArticleMutation.isPending ? "Saving..." : editingArticle ? "Update Article" : "Create Article"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Article</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{articleToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => articleToDelete && deleteArticleMutation.mutate(articleToDelete.id)}
              disabled={deleteArticleMutation.isPending}
            >
              {deleteArticleMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Media Library Dialog */}
      <MediaLibrary 
        isOpen={isMediaLibraryOpen} 
        onClose={() => setIsMediaLibraryOpen(false)}
        onSelectImage={handleImageSelect}
        showSelectButton={true}
      />
    </div>
  );
}
