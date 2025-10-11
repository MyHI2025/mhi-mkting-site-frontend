import { useQuery } from "@tanstack/react-query";
import { ContentNode } from "./ContentNode";
import { Skeleton } from "@/components/ui/skeleton";
import { useEditing } from "@/contexts/EditingContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface ContentNodeData {
  id: string;
  pageId: string;
  nodeType: string;
  content: Record<string, any>;
  displayOrder: number;
  parentNodeId?: string | null;
  metadata?: Record<string, any> | null;
}

interface CMSPageProps {
  pageId: string;
  className?: string;
}

const NODE_TYPES = [
  { value: "heading", label: "Heading" },
  { value: "paragraph", label: "Paragraph" },
  { value: "image", label: "Image" },
  { value: "button", label: "Button" },
  { value: "list", label: "List" },
  { value: "richtext", label: "Rich Text" },
];

export function CMSPage({ pageId, className = "" }: CMSPageProps) {
  const { isEditMode } = useEditing();
  const { toast } = useToast();
  const [showAddNode, setShowAddNode] = useState(false);
  const [newNodeType, setNewNodeType] = useState("paragraph");

  // Fetch content nodes for this page
  // Use public endpoint for non-edit mode, admin endpoint for edit mode
  const endpoint = isEditMode ? api.admin.pageNodes(pageId) : api.public.pageNodes(pageId);
  
  const { data: nodes = [], isLoading, refetch } = useQuery<ContentNodeData[]>({
    queryKey: [endpoint],
    enabled: !!pageId,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });

  // Sort nodes by display order
  const sortedNodes = [...nodes].sort((a, b) => a.displayOrder - b.displayOrder);

  const createNodeMutation = useMutation({
    mutationFn: async (nodeType: string) => {
      const defaultContent = {
        heading: { text: "New Heading", level: "h2" },
        paragraph: { text: "Enter your text here..." },
        image: { src: "", alt: "Image description" },
        button: { text: "Click Me", href: "#" },
        list: { items: ["Item 1", "Item 2", "Item 3"], ordered: false },
        richtext: { html: "<p>Rich text content</p>" },
      };

      return apiRequest(api.admin.pageNodes(pageId), "POST", {
        pageId,
        nodeType,
        content: defaultContent[nodeType as keyof typeof defaultContent] || {},
        displayOrder: nodes.length,
      });
    },
    onSuccess: async () => {
      // Force refetch to get the latest data from server
      await refetch();
      toast({ title: "Content block added successfully" });
      setShowAddNode(false);
    },
    onError: () => {
      toast({ title: "Failed to add content block", variant: "destructive" });
    },
  });

  const handleAddNode = () => {
    createNodeMutation.mutate(newNodeType);
  };

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className={className} data-testid={`cms-page-${pageId}`}>
      {sortedNodes.map((node) => (
        <ContentNode
          key={node.id}
          node={node}
        />
      ))}

      {sortedNodes.length === 0 && !isEditMode && (
        <div className="text-center py-12 text-muted-foreground">
          <p data-testid="text-no-content">No content available yet.</p>
        </div>
      )}

      {isEditMode && (
        <div className="mt-8 border-2 border-dashed border-primary rounded-lg p-6">
          {showAddNode ? (
            <div className="space-y-4">
              <h3 className="font-semibold">Add New Content Block</h3>
              <select
                value={newNodeType}
                onChange={(e) => setNewNodeType(e.target.value)}
                className="w-full p-2 border rounded"
                data-testid="select-node-type"
              >
                {NODE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddNode}
                  disabled={createNodeMutation.isPending}
                  data-testid="button-add-node"
                >
                  {createNodeMutation.isPending ? "Adding..." : "Add Block"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddNode(false)}
                  data-testid="button-cancel-add"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setShowAddNode(true)}
              variant="outline"
              className="w-full"
              data-testid="button-show-add-node"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Content Block
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
