import { useState, useRef, useEffect } from "react";
import { useEditing } from "@/contexts/EditingContext";
import { Button } from "@/components/ui/button";
import { Edit, Save, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface EditableTextProps {
  children: React.ReactNode;
  pageId?: string;
  sectionId?: string;
  field: "title" | "subtitle" | "description" | "buttonText" | "buttonUrl";
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  placeholder?: string;
}

export function EditableText({
  children,
  pageId,
  sectionId,
  field,
  className = "",
  as: Component = "div",
  placeholder = "Click to edit..."
}: EditableTextProps) {
  const { isEditMode, isAdmin } = useEditing();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [originalValue, setOriginalValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Extract text content for editing
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return node.toString();
    if (!node) return "";
    if (Array.isArray(node)) return node.map(getTextContent).join("");
    if (typeof node === "object" && "props" in node) {
      return getTextContent(node.props.children);
    }
    return "";
  };

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
        title: "Content updated",
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
    const textContent = getTextContent(children);
    setOriginalValue(textContent);
    setEditValue(textContent);
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
    
    if (!editValue.trim()) {
      setIsEditing(false);
      return;
    }

    // Get current section content and update the specific field
    try {
      const section = await apiRequest(api.admin.section(sectionId), "GET");
      const updatedContent = {
        ...section.content,
        [field]: editValue.trim()
      };

      updateSectionMutation.mutate({ content: updatedContent });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    }
  };

  const cancelEditing = () => {
    setEditValue(originalValue);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const showEditControls = isAdmin && isEditMode && !isEditing && sectionId;
  const showEditingInterface = isAdmin && isEditMode && isEditing && sectionId;

  if (showEditingInterface) {
    return (
      <div className="relative group">
        <textarea
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className={`${className} border-2 border-blue-500 bg-white dark:bg-gray-800 rounded p-2 resize-none w-full`}
          rows={Math.max(2, editValue.split('\n').length)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.ctrlKey) {
              e.preventDefault();
              saveChanges();
            } else if (e.key === "Escape") {
              e.preventDefault();
              cancelEditing();
            }
          }}
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="sm"
            onClick={saveChanges}
            disabled={updateSectionMutation.isPending}
            className="h-6 w-6 p-0"
          >
            <Save className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={cancelEditing}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Press Ctrl+Enter to save, Esc to cancel
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative group ${showEditControls ? "bg-blue-50 dark:bg-blue-950 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded p-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900" : ""}`}
      onClick={showEditControls ? startEditing : undefined}
    >
      <Component className={className}>
        {children || <span className="text-gray-400 italic">{placeholder}</span>}
      </Component>
      
      {showEditControls && (
        <>
          <div className="absolute -top-3 -left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full opacity-90">
            Click to edit
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              startEditing();
            }}
            className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-blue-500 text-white hover:bg-blue-600 shadow-md"
          >
            <Edit className="h-3 w-3" />
          </Button>
        </>
      )}
    </div>
  );
}