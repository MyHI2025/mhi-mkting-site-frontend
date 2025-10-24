import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Upload,
  Search,
  Image as ImageIcon,
  Trash2,
  Edit,
  X,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { getAccessToken } from "@/lib/auth";
import { api } from "@/lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { MediaAsset } from "@myhi2025/shared";

const uploadMediaSchema = z.object({
  altText: z.string().optional(),
  caption: z.string().optional(),
});

const updateMediaSchema = z.object({
  altText: z.string().optional(),
  caption: z.string().optional(),
});

type UploadMediaForm = z.infer<typeof uploadMediaSchema>;
type UpdateMediaForm = z.infer<typeof updateMediaSchema>;

interface MediaLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage?: (imageUrl: string, altText?: string) => void;
  showSelectButton?: boolean;
}

export default function MediaLibrary({
  isOpen,
  onClose,
  onSelectImage,
  showSelectButton = false,
}: MediaLibraryProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<MediaAsset | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);

  // Upload form
  const uploadForm = useForm<UploadMediaForm>({
    resolver: zodResolver(uploadMediaSchema),
    defaultValues: {
      altText: "",
      caption: "",
    },
  });

  // Edit form
  const editForm = useForm<UpdateMediaForm>({
    resolver: zodResolver(updateMediaSchema),
    defaultValues: {
      altText: "",
      caption: "",
    },
  });

  // Fetch media assets
  const { data: mediaAssets = [], isLoading } = useQuery<MediaAsset[]>({
    queryKey: [api.admin.media],
    enabled: isOpen,
  });

  // Filter media assets based on search
  const filteredAssets = mediaAssets.filter(
    (asset) =>
      asset.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.altText ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.caption ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (data: {
      file: File;
      altText?: string;
      caption?: string;
    }) => {
      const formData = new FormData();
      formData.append("file", data.file);
      if (data.altText) formData.append("altText", data.altText);
      if (data.caption) formData.append("caption", data.caption);

      // Custom upload with proper authentication for FormData
      const accessToken = getAccessToken();
      const headers: Record<string, string> = {};
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await fetch(api.admin.media, {
        method: "POST",
        headers,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.media] });
      setIsUploadDialogOpen(false);
      setUploadingFile(null);
      uploadForm.reset();
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; updates: UpdateMediaForm }) => {
      return apiRequest(api.admin.mediaItem(data.id), "PUT", data.updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.media] });
      setIsEditDialogOpen(false);
      setSelectedImage(null);
      editForm.reset();
      toast({
        title: "Image updated",
        description: "Image information has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update image",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/media/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.media] });
      setIsDeleteDialogOpen(false);
      setSelectedImage(null);
      toast({
        title: "Image deleted",
        description: "The image has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete image",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingFile(file);
      setIsUploadDialogOpen(true);
    }
  };

  const handleUpload = (data: UploadMediaForm) => {
    if (uploadingFile) {
      uploadMutation.mutate({
        file: uploadingFile,
        altText: data.altText,
        caption: data.caption,
      });
    }
  };

  const handleEdit = (asset: MediaAsset) => {
    setSelectedImage(asset);
    editForm.reset({
      altText: asset.altText || "",
      caption: asset.caption || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (data: UpdateMediaForm) => {
    if (selectedImage) {
      updateMutation.mutate({
        id: selectedImage.id,
        updates: data,
      });
    }
  };

  const handleDelete = (asset: MediaAsset) => {
    setSelectedImage(asset);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedImage) {
      deleteMutation.mutate(selectedImage.id);
    }
  };

  const handleSelectImage = (asset: MediaAsset) => {
    if (onSelectImage) {
      onSelectImage(asset.url, asset.altText || undefined);
      onClose();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
          <DialogDescription>
            Browse, upload, and manage your image assets. Click on images to
            view details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search images by name, alt text, or caption..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
                data-testid="input-media-search"
              />
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              data-testid="button-upload-media"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Media Grid */}
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading images...</p>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="text-center py-8">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">
                {searchQuery
                  ? "No images match your search"
                  : "No images uploaded yet"}
              </p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload your first image
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredAssets.map((asset) => (
                <Card
                  key={asset.id}
                  className="group hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-2">
                    <div className="aspect-square relative">
                      <img
                        src={asset.url}
                        alt={asset.altText || asset.originalName}
                        className="w-full h-full object-cover rounded cursor-pointer"
                        onClick={() => handleSelectImage(asset)}
                        data-testid={`image-asset-${asset.id}`}
                      />
                      <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 bg-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(asset);
                          }}
                          data-testid={`button-edit-media-${asset.id}`}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(asset);
                          }}
                          data-testid={`button-delete-media-${asset.id}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p
                        className="text-xs font-medium truncate"
                        title={asset.originalName}
                      >
                        {asset.originalName}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {formatFileSize(asset.size)}
                        </Badge>
                        {showSelectButton && (
                          <Button
                            size="sm"
                            onClick={() => handleSelectImage(asset)}
                            data-testid={`button-select-media-${asset.id}`}
                          >
                            Select
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Upload Dialog */}
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
              <DialogDescription>
                Add details for your image to improve accessibility and
                organization.
              </DialogDescription>
            </DialogHeader>
            {uploadingFile && (
              <div className="space-y-4">
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(uploadingFile)}
                    alt="Preview"
                    className="max-h-40 mx-auto rounded"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    {uploadingFile.name}
                  </p>
                </div>
                <Form {...uploadForm}>
                  <form
                    onSubmit={uploadForm.handleSubmit(handleUpload)}
                    className="space-y-4"
                  >
                    <FormField
                      control={uploadForm.control}
                      name="altText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alt Text (Recommended)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Describe the image for accessibility"
                              {...field}
                              data-testid="input-upload-alt-text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={uploadForm.control}
                      name="caption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Caption (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add a caption for the image"
                              {...field}
                              data-testid="input-upload-caption"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsUploadDialogOpen(false)}
                        data-testid="button-cancel-upload"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={uploadMutation.isPending}
                        data-testid="button-confirm-upload"
                      >
                        {uploadMutation.isPending ? "Uploading..." : "Upload"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Image Details</DialogTitle>
              <DialogDescription>
                Update the image information and metadata.
              </DialogDescription>
            </DialogHeader>
            {selectedImage && (
              <div className="space-y-4">
                <div className="text-center">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.altText || selectedImage.originalName}
                    className="max-h-40 mx-auto rounded"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedImage.originalName}
                  </p>
                </div>
                <Form {...editForm}>
                  <form
                    onSubmit={editForm.handleSubmit(handleUpdate)}
                    className="space-y-4"
                  >
                    <FormField
                      control={editForm.control}
                      name="altText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alt Text</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Describe the image for accessibility"
                              {...field}
                              data-testid="input-edit-alt-text"
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
                              placeholder="Add a caption for the image"
                              {...field}
                              data-testid="input-edit-caption"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(false)}
                        data-testid="button-cancel-edit-media"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={updateMutation.isPending}
                        data-testid="button-update-media"
                      >
                        {updateMutation.isPending ? "Updating..." : "Update"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Image</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedImage?.originalName}"?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                data-testid="button-cancel-delete-media"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                data-testid="button-confirm-delete-media"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
