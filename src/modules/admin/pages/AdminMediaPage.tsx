import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Search, Edit, Trash2, Image as ImageIcon, File, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { getAccessToken } from "@/lib/auth";
import { api } from "@/lib/api";
import { type MediaAsset } from "@myhealthintegral/shared";

const editMediaSchema = z.object({
  altText: z.string().optional(),
  caption: z.string().optional(),
});

type EditMediaForm = z.infer<typeof editMediaSchema>;

export default function AdminMediaPage() {
  const { toast } = useToast();
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState<MediaAsset | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // Fetch media assets
  const { data: mediaAssets = [], isLoading } = useQuery({
    queryKey: [api.admin.media, searchQuery],
    queryFn: () => {
      const params = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : "";
      return apiRequest(`${api.admin.media}${params}`);
    },
  });

  // Edit media form
  const editForm = useForm<EditMediaForm>({
    resolver: zodResolver(editMediaSchema),
    defaultValues: {
      altText: "",
      caption: "",
    },
  });

  // Upload media mutation
  const uploadMediaMutation = useMutation({
    mutationFn: async (data: { file: File; altText?: string; caption?: string }) => {
      const formData = new FormData();
      formData.append('file', data.file);
      if (data.altText) formData.append('altText', data.altText);
      if (data.caption) formData.append('caption', data.caption);

      // Custom upload with proper authentication for FormData
      const accessToken = getAccessToken();
      const headers: Record<string, string> = {};
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch(api.admin.media, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.media], exact: false });
      toast({
        title: "File uploaded",
        description: "The file has been uploaded successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload file",
        variant: "destructive",
      });
    },
  });

  // Update media mutation
  const updateMediaMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditMediaForm }) => 
      apiRequest(api.admin.mediaItem(id), "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.media], exact: false });
      setIsEditDialogOpen(false);
      setSelectedMedia(null);
      editForm.reset();
      toast({
        title: "Media updated",
        description: "The media has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update media",
        variant: "destructive",
      });
    },
  });

  // Delete media mutation
  const deleteMediaMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/admin/media/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.media], exact: false });
      setIsDeleteDialogOpen(false);
      setMediaToDelete(null);
      toast({
        title: "Media deleted",
        description: "The media has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete media",
        variant: "destructive",
      });
    },
  });

  const handleEditMedia = (media: MediaAsset) => {
    setSelectedMedia(media);
    editForm.reset({
      altText: media.altText || "",
      caption: media.caption || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteMedia = (media: MediaAsset) => {
    setMediaToDelete(media);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteMedia = () => {
    if (mediaToDelete) {
      deleteMediaMutation.mutate(mediaToDelete.id);
    }
  };

  const onEditSubmit = (data: EditMediaForm) => {
    if (selectedMedia) {
      updateMediaMutation.mutate({ id: selectedMedia.id, data });
    }
  };

  // File upload handlers
  const handleFileUpload = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Upload file directly using FormData
      uploadMediaMutation.mutate({
        file: file,
        altText: '',
        caption: '',
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImageFile = (mimeType: string) => {
    return mimeType.startsWith('image/');
  };

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Media Library</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Upload and manage images for your website (JPEG, PNG, GIF, WebP, SVG - max 10MB).
          </p>
        </div>

        {/* Upload Area */}
        <Card>
          <CardContent className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950" 
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              data-testid="upload-area"
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Upload Media Files
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Drag and drop files here, or click to select files
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                id="file-upload"
                data-testid="file-input"
              />
              <Button asChild data-testid="button-select-files">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Select Files
                </label>
              </Button>
            </div>
            {uploadMediaMutation.isPending && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uploading files...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search media files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-square mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : mediaAssets.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaAssets.map((media: MediaAsset) => (
              <Card key={media.id} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                    {isImageFile(media.mimeType) ? (
                      <img
                        src={media.url}
                        alt={media.altText || media.originalName}
                        className="w-full h-full object-cover"
                        data-testid={`media-image-${media.id}`}
                      />
                    ) : (
                      <File className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate" title={media.originalName}>
                      {media.originalName}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(media.size)}
                    </p>
                    {media.altText && (
                      <p className="text-xs text-gray-600 dark:text-gray-300 truncate" title={media.altText}>
                        {media.altText}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditMedia(media)}
                      data-testid={`button-edit-${media.id}`}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(media.url, '_blank')}
                      data-testid={`button-view-${media.id}`}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteMedia(media)}
                      disabled={deleteMediaMutation.isPending}
                      data-testid={`button-delete-${media.id}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
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
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    No media files yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Upload your first image or document to get started.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Media Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Media</DialogTitle>
              <DialogDescription>
                Update the alt text and caption for this media file.
              </DialogDescription>
            </DialogHeader>
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <FormField
                  control={editForm.control}
                  name="altText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alt Text</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Describe this image for accessibility" 
                          {...field} 
                          data-testid="input-edit-alttext" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="caption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caption</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Optional caption for this media" 
                          {...field} 
                          data-testid="input-edit-caption" 
                        />
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
                    disabled={updateMediaMutation.isPending}
                    data-testid="button-submit-edit"
                  >
                    {updateMediaMutation.isPending ? "Updating..." : "Update Media"}
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
              <DialogTitle>Delete Media</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{mediaToDelete?.originalName}"? This action cannot be undone.
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
                onClick={confirmDeleteMedia}
                disabled={deleteMediaMutation.isPending}
                data-testid="button-confirm-delete"
              >
                {deleteMediaMutation.isPending ? "Deleting..." : "Delete Media"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
}