import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, RotateCcw, FileText, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import type { PageVersion } from "@myhealthintegral/shared";

interface PageVersionHistoryProps {
  pageId: string;
}

export function PageVersionHistory({ pageId }: PageVersionHistoryProps) {
  const { toast } = useToast();
  const [selectedVersion, setSelectedVersion] = useState<PageVersion | null>(null);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);

  const { data: versions = [], isLoading } = useQuery<PageVersion[]>({
    queryKey: [api.admin.pageVersions(pageId)],
  });

  const restoreMutation = useMutation({
    mutationFn: async (versionId: string) => {
      const response = await fetch(api.admin.pageVersionRestore(pageId, versionId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Failed to restore version" }));
        throw new Error(error.message || error.error || "Failed to restore version");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.pages] });
      queryClient.invalidateQueries({ queryKey: [api.admin.page(pageId)] });
      queryClient.invalidateQueries({ queryKey: [api.admin.pageVersions(pageId)] });
      toast({
        title: "Version restored",
        description: "The page has been successfully restored to the selected version.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Restore failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleRestore = (versionId: string) => {
    if (confirm("Are you sure you want to restore this version? This will create a new version with the content from the selected version.")) {
      restoreMutation.mutate(versionId);
    }
  };

  const getChangeTypeColor = (changeType: string) => {
    switch (changeType) {
      case "create":
        return "bg-green-500";
      case "update":
        return "bg-blue-500";
      case "publish":
        return "bg-purple-500";
      case "unpublish":
        return "bg-orange-500";
      case "restore":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading version history...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold">Version History</h3>
        </div>
        <Badge variant="outline">{versions.length} versions</Badge>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-3">
          {versions.map((version, index) => (
            <Card key={version.id} className={index === 0 ? "border-primary" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={getChangeTypeColor(version.changeType)}>
                      v{version.versionNumber}
                    </Badge>
                    <CardTitle className="text-base">{version.title}</CardTitle>
                    {index === 0 && (
                      <Badge variant="secondary">Current</Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedVersion(version)}
                      data-testid={`button-view-version-${version.id}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {index !== 0 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRestore(version.id)}
                        disabled={restoreMutation.isPending}
                        data-testid={`button-restore-version-${version.id}`}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <CardDescription className="flex items-center gap-2 text-xs">
                  <Badge variant="outline" className="capitalize">
                    {version.changeType}
                  </Badge>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(version.createdAt!), { addSuffix: true })}</span>
                </CardDescription>
              </CardHeader>
              {version.changeSummary && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{version.changeSummary}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Version Details Dialog */}
      <Dialog open={!!selectedVersion} onOpenChange={() => setSelectedVersion(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Version {selectedVersion?.versionNumber} Details
            </DialogTitle>
            <DialogDescription>
              {selectedVersion?.changeSummary}
            </DialogDescription>
          </DialogHeader>
          {selectedVersion && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <p className="text-sm text-muted-foreground">{selectedVersion.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Page Type</label>
                  <p className="text-sm text-muted-foreground capitalize">{selectedVersion.pageType}</p>
                </div>
                {selectedVersion.category && (
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <p className="text-sm text-muted-foreground">{selectedVersion.category}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium">Published</label>
                  <p className="text-sm text-muted-foreground">{selectedVersion.isPublished ? "Yes" : "No"}</p>
                </div>
              </div>
              {selectedVersion.description && (
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <p className="text-sm text-muted-foreground">{selectedVersion.description}</p>
                </div>
              )}
              {selectedVersion.metaDescription && (
                <div>
                  <label className="text-sm font-medium">Meta Description</label>
                  <p className="text-sm text-muted-foreground">{selectedVersion.metaDescription}</p>
                </div>
              )}
              {selectedVersion.featuredImage && (
                <div>
                  <label className="text-sm font-medium">Featured Image</label>
                  <img 
                    src={selectedVersion.featuredImage} 
                    alt="Featured" 
                    className="w-full h-48 object-cover rounded-md mt-2"
                  />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
