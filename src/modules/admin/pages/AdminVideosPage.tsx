import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Edit, Trash2, Video, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { api } from "@/lib/api";
import { insertVideoContentSchema, type VideoContent } from "@myhealthintegral/shared";
import { z } from "zod";

type VideoForm = z.infer<typeof insertVideoContentSchema>;

export default function AdminVideosPage() {
  const { toast } = useToast();
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoContent | null>(null);
  const [videoToDelete, setVideoToDelete] = useState<VideoContent | null>(null);

  const { data: videos = [], isLoading } = useQuery<VideoContent[]>({
    queryKey: [api.admin.videos],
  });

  const form = useForm<VideoForm>({
    resolver: zodResolver(insertVideoContentSchema),
    defaultValues: {
      title: "",
      description: "",
      youtubeUrl: "",
      thumbnailUrl: null,
      duration: null,
      category: "Webinar",
      isPublished: false,
      views: 0,
      displayOrder: 0,
    },
  });

  const saveVideoMutation = useMutation({
    mutationFn: (data: VideoForm) => {
      if (editingVideo) {
        return apiRequest(api.admin.video(editingVideo.id), "PUT", data);
      }
      return apiRequest(api.admin.videos, "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.videos] });
      queryClient.invalidateQueries({ queryKey: [api.public.videos] });
      setIsFormDialogOpen(false);
      setEditingVideo(null);
      form.reset();
      toast({
        title: editingVideo ? "Video updated" : "Video added",
        description: `The video has been ${editingVideo ? "updated" : "added"} successfully.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save video",
        variant: "destructive",
      });
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: (id: string) => apiRequest(api.admin.video(id), "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.videos] });
      queryClient.invalidateQueries({ queryKey: [api.public.videos] });
      setIsDeleteDialogOpen(false);
      setVideoToDelete(null);
      toast({
        title: "Video deleted",
        description: "The video has been removed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete video",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (video: VideoContent) => {
    setEditingVideo(video);
    form.reset({
      title: video.title,
      description: video.description || "",
      youtubeUrl: video.youtubeUrl,
      thumbnailUrl: video.thumbnailUrl,
      duration: video.duration,
      category: video.category,
      isPublished: video.isPublished,
      views: video.views || 0,
      displayOrder: video.displayOrder || 0,
    });
    setIsFormDialogOpen(true);
  };

  const handleDelete = (video: VideoContent) => {
    setVideoToDelete(video);
    setIsDeleteDialogOpen(true);
  };

  const handleNewVideo = () => {
    setEditingVideo(null);
    form.reset({
      title: "",
      description: "",
      youtubeUrl: "",
      thumbnailUrl: null,
      duration: null,
      category: "Webinar",
      isPublished: false,
      views: 0,
      displayOrder: videos.length,
    });
    setIsFormDialogOpen(true);
  };

  const onSubmit = (data: VideoForm) => {
    saveVideoMutation.mutate(data);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Video className="h-8 w-8" />
              Video Content
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage vlog and webinar videos with YouTube embedding
            </p>
          </div>
          <Button data-testid="button-add-video" onClick={handleNewVideo}>
            <Plus className="h-4 w-4 mr-2" />
            Add Video
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : videos.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No videos yet. Add your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {videos.map((video) => (
            <Card key={video.id} data-testid={`video-card-${video.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {video.title}
                      {video.isPublished ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {video.category} • {video.duration || "Duration not set"} • {video.views} views
                    </p>
                    {video.description && (
                      <p className="text-sm text-muted-foreground mt-2">{video.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      {video.youtubeUrl}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(video)}
                      data-testid={`button-edit-${video.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(video)}
                      data-testid={`button-delete-${video.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingVideo ? "Edit Video" : "Add Video"}</DialogTitle>
            <DialogDescription>
              Add a YouTube video URL to embed it on your website
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Platform Demo" {...field} data-testid="input-title" />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A comprehensive overview of our platform..."
                        {...field}
                        value={field.value || ""}
                        data-testid="input-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="youtubeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube URL *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                        {...field}
                        data-testid="input-youtube-url"
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Enter the full YouTube URL or just the video ID
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Webinar">Webinar</SelectItem>
                          <SelectItem value="Tutorial">Tutorial</SelectItem>
                          <SelectItem value="Product Demo">Product Demo</SelectItem>
                          <SelectItem value="Success Story">Success Story</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="10:45"
                          {...field}
                          value={field.value || ""}
                          data-testid="input-duration"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="views"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Views</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          value={field.value ?? 0}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          data-testid="input-views"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          value={field.value ?? 0}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          data-testid="input-display-order"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Published</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Make this video visible on the public website
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value ?? false}
                        onCheckedChange={field.onChange}
                        data-testid="switch-is-published"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormDialogOpen(false)}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saveVideoMutation.isPending}
                  data-testid="button-save"
                >
                  {saveVideoMutation.isPending ? "Saving..." : editingVideo ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Video</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{videoToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              data-testid="button-cancel-delete"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => videoToDelete && deleteVideoMutation.mutate(videoToDelete.id)}
              disabled={deleteVideoMutation.isPending}
              data-testid="button-confirm-delete"
            >
              {deleteVideoMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
