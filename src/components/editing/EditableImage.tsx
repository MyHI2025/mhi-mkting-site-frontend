import { useState } from "react";
import { useEditing } from "@/contexts/EditingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Save, X, Image as ImageIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface EditableImageProps {
  src?: string;
  alt?: string;
  className?: string;
  pageId?: string;
  sectionId?: string;
  placeholder?: string;
}

export function EditableImage({
  src,
  alt,
  className = "",
  pageId,
  sectionId,
  placeholder = "Add image..."
}: EditableImageProps) {
  const { isEditMode, isAdmin } = useEditing();
  const [isEditing, setIsEditing] = useState(false);
  const [editSrc, setEditSrc] = useState(src || "");
  const [editAlt, setEditAlt] = useState(alt || "");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateSectionMutation = useMutation({
    mutationFn: async (data: { content: any }) => {
      if (!sectionId) throw new Error("Section ID required");
      return apiRequest(api.admin.section(sectionId), "PUT", data);
    },
    onSuccess: () => {
      if (pageId && sectionId) {
        queryClient.invalidateQueries({
          queryKey: [api.admin.pages, pageId, "sections"]
        });
      }
      toast({
        title: "Image updated",
        description: "Your changes have been saved successfully.",
      });
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to save changes",
        variant: "destructive",
      });
    },
  });

  const startEditing = () => {
    setEditSrc(src || "");
    setEditAlt(alt || "");
    setIsEditing(true);
  };

  const saveChanges = async () => {
    if (!sectionId) {
      toast({
        title: "Error",
        description: "Cannot save: No section ID available. Please migrate this page first.",
        variant: "destructive",
      });
      setIsEditing(false);
      return;
    }

    try {
      const section = await apiRequest(api.admin.section(sectionId), "GET");
      const updatedContent = {
        ...section.content,
        imageUrl: editSrc.trim(),
        imageAlt: editAlt.trim()
      };

      updateSectionMutation.mutate({ content: updatedContent });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save image changes",
        variant: "destructive",
      });
    }
  };

  const cancelEditing = () => {
    setEditSrc(src || "");
    setEditAlt(alt || "");
    setIsEditing(false);
  };

  const showEditControls = isAdmin && isEditMode && !isEditing && sectionId;
  const showEditingInterface = isAdmin && isEditMode && isEditing && sectionId;

  if (showEditingInterface) {
    return (
      <div className="relative group border-2 border-blue-500 rounded p-4 bg-white dark:bg-gray-800">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
            <Input
              value={editSrc}
              onChange={(e) => setEditSrc(e.target.value)}
              placeholder="Enter image URL..."
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Alt Text</label>
            <Input
              value={editAlt}
              onChange={(e) => setEditAlt(e.target.value)}
              placeholder="Describe the image..."
              className="mt-1"
            />
          </div>
          {editSrc && (
            <div className="mt-3">
              <img 
                src={editSrc} 
                alt={editAlt}
                className={`${className} max-h-32 object-cover`}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            onClick={saveChanges}
            disabled={updateSectionMutation.isPending}
          >
            <Save className="h-3 w-3 mr-1" />
            Save
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={cancelEditing}
          >
            <X className="h-3 w-3 mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  if (!src && showEditControls) {
    return (
      <div 
        className="relative group border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
        onClick={startEditing}
      >
        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">{placeholder}</p>
        <Button
          size="sm"
          variant="outline"
          className="mt-2"
        >
          <Edit className="h-3 w-3 mr-1" />
          Add Image
        </Button>
      </div>
    );
  }

  if (!src && !showEditControls) {
    return null;
  }

  return (
    <div className={`relative group ${showEditControls ? "border border-blue-200 dark:border-blue-800 rounded p-1" : ""}`}>
      <img 
        src={src} 
        alt={alt}
        className={className}
      />
      
      {showEditControls && (
        <Button
          size="sm"
          variant="outline"
          onClick={startEditing}
          className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-white dark:bg-gray-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}