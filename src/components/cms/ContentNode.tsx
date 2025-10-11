import { useState, useEffect } from "react";
import { useEditing } from "@/contexts/EditingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Check, X, Trash2, Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from "isomorphic-dompurify";

interface ContentNodeData {
  id: string;
  pageId: string;
  nodeType: string;
  content: Record<string, any>;
  displayOrder: number;
  parentNodeId?: string | null;
  metadata?: Record<string, any> | null;
}

interface ContentNodeProps {
  node: ContentNodeData;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export function ContentNode({ node, onUpdate, onDelete }: ContentNodeProps) {
  const { isEditMode } = useEditing();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(node.content);
  const { toast } = useToast();

  // Sync local state when node prop changes
  useEffect(() => {
    setEditedContent(node.content);
  }, [node.content]);

  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<ContentNodeData>) => {
      return apiRequest(api.admin.node(node.id), "PATCH", updates);
    },
    onSuccess: () => {
      // Invalidate queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: [api.admin.pageNodes(node.pageId)], refetchType: 'all' });
      queryClient.invalidateQueries({ queryKey: [api.public.pageNodes(node.pageId)], refetchType: 'all' });
      toast({ title: "Content updated successfully" });
      setIsEditing(false);
      onUpdate?.();
    },
    onError: () => {
      toast({ title: "Failed to update content", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return apiRequest(api.admin.node(node.id), "DELETE");
    },
    onSuccess: () => {
      // Invalidate queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: [api.admin.pageNodes(node.pageId)], refetchType: 'all' });
      queryClient.invalidateQueries({ queryKey: [api.public.pageNodes(node.pageId)], refetchType: 'all' });
      toast({ title: "Content deleted successfully" });
      onDelete?.();
    },
    onError: () => {
      toast({ title: "Failed to delete content", variant: "destructive" });
    },
  });

  const handleSave = () => {
    updateMutation.mutate({ content: editedContent });
  };

  const handleCancel = () => {
    setEditedContent(node.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this content?")) {
      deleteMutation.mutate();
    }
  };

  // Render edit controls
  const renderEditControls = () => {
    if (!isEditMode) return null;

    if (isEditing) {
      return (
        <div className="absolute top-0 right-0 flex gap-2 bg-primary text-white px-2 py-1 rounded-bl opacity-90 z-10">
          <button
            onClick={handleSave}
            className="hover:text-green-300"
            data-testid={`button-save-node-${node.id}`}
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="hover:text-red-300"
            data-testid={`button-cancel-node-${node.id}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }

    return (
      <div className="absolute top-0 right-0 flex gap-2 bg-primary text-white px-2 py-1 rounded-bl opacity-0 group-hover:opacity-90 transition-opacity z-10">
        <button
          onClick={() => setIsEditing(true)}
          className="hover:text-blue-300"
          data-testid={`button-edit-node-${node.id}`}
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="hover:text-red-300"
          data-testid={`button-delete-node-${node.id}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    );
  };

  // Render based on node type
  const renderContent = () => {
    const { nodeType, content } = node;

    // EDITING MODE
    if (isEditing) {
      switch (nodeType) {
        case "heading":
          return (
            <div className="space-y-2">
              <Input
                value={editedContent.text || ""}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, text: e.target.value })
                }
                placeholder="Heading text"
                data-testid={`input-heading-text-${node.id}`}
              />
              <select
                value={editedContent.level || "h2"}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, level: e.target.value })
                }
                className="w-full p-2 border rounded"
                data-testid={`select-heading-level-${node.id}`}
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
              </select>
            </div>
          );

        case "paragraph":
          return (
            <Textarea
              value={editedContent.text || ""}
              onChange={(e) =>
                setEditedContent({ ...editedContent, text: e.target.value })
              }
              placeholder="Paragraph text"
              rows={4}
              data-testid={`textarea-paragraph-${node.id}`}
            />
          );

        case "image":
          return (
            <div className="space-y-2">
              <Input
                value={editedContent.src || ""}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, src: e.target.value })
                }
                placeholder="Image URL"
                data-testid={`input-image-src-${node.id}`}
              />
              <Input
                value={editedContent.alt || ""}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, alt: e.target.value })
                }
                placeholder="Alt text"
                data-testid={`input-image-alt-${node.id}`}
              />
            </div>
          );

        case "button":
          return (
            <div className="space-y-2">
              <Input
                value={editedContent.text || ""}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, text: e.target.value })
                }
                placeholder="Button text"
                data-testid={`input-button-text-${node.id}`}
              />
              <Input
                value={editedContent.href || ""}
                onChange={(e) =>
                  setEditedContent({ ...editedContent, href: e.target.value })
                }
                placeholder="Button URL"
                data-testid={`input-button-href-${node.id}`}
              />
            </div>
          );

        case "list":
          return (
            <div className="space-y-2">
              <Textarea
                value={(editedContent.items || []).join("\n")}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    items: e.target.value.split("\n").filter((i) => i.trim()),
                  })
                }
                placeholder="List items (one per line)"
                rows={6}
                data-testid={`textarea-list-items-${node.id}`}
              />
            </div>
          );

        default:
          return (
            <Textarea
              value={JSON.stringify(editedContent, null, 2)}
              onChange={(e) => {
                try {
                  setEditedContent(JSON.parse(e.target.value));
                } catch {}
              }}
              placeholder="Content JSON"
              rows={4}
              data-testid={`textarea-json-${node.id}`}
            />
          );
      }
    }

    // VIEW MODE
    switch (nodeType) {
      case "heading": {
        const level = content.level || "h2";
        const HeadingTag = level as keyof JSX.IntrinsicElements;
        const classNames: Record<string, string> = {
          h1: "text-4xl font-bold mb-4",
          h2: "text-3xl font-bold mb-3",
          h3: "text-2xl font-semibold mb-2",
          h4: "text-xl font-semibold mb-2",
        };
        const className = classNames[level];

        return (
          <HeadingTag
            className={className}
            data-testid={`heading-${node.id}`}
          >
            {content.text}
          </HeadingTag>
        );
      }

      case "paragraph":
        return (
          <p
            className="mb-4 leading-relaxed"
            data-testid={`paragraph-${node.id}`}
          >
            {content.text}
          </p>
        );

      case "image":
        return (
          <img
            src={content.src}
            alt={content.alt || ""}
            className="max-w-full h-auto rounded-lg mb-4"
            data-testid={`image-${node.id}`}
          />
        );

      case "button":
        return (
          <Button
            asChild
            className="mb-4"
            data-testid={`button-${node.id}`}
          >
            <a 
              href={content.href || "#"}
              target={content.target}
              rel={content.rel}
            >
              {content.text}
            </a>
          </Button>
        );

      case "list": {
        const ListTag = content.ordered ? "ol" : "ul";
        return (
          <ListTag
            className={`mb-4 space-y-2 ${content.ordered ? "list-decimal" : "list-disc"} list-inside`}
            data-testid={`list-${node.id}`}
          >
            {(content.items || []).map((item: string, idx: number) => (
              <li key={idx} data-testid={`list-item-${node.id}-${idx}`}>
                {item}
              </li>
            ))}
          </ListTag>
        );
      }

      case "richtext":
        // Sanitize HTML to prevent XSS attacks
        const sanitizedHTML = DOMPurify.sanitize(content.html || "", {
          ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre'],
          ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
        });
        return (
          <div
            className="prose max-w-none mb-4"
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            data-testid={`richtext-${node.id}`}
          />
        );

      default:
        return (
          <div
            className="p-4 bg-gray-100 rounded mb-4"
            data-testid={`unknown-node-${node.id}`}
          >
            <code>{JSON.stringify(content)}</code>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative ${isEditMode ? "group border-2 border-dashed border-transparent hover:border-primary rounded p-2" : ""}`}
      data-node-id={node.id}
      data-node-type={node.nodeType}
    >
      {renderEditControls()}
      {renderContent()}
    </div>
  );
}
