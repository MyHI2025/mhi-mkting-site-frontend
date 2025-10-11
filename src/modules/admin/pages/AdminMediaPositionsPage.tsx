import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Image as ImageIcon, Layout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { api } from "@/lib/api";
import { MediaPicker } from "../components/MediaPicker";
import type { MediaAsset } from "@myhealthintegral/shared";

interface MediaPosition {
  id: string;
  positionKey: string;
  label: string;
  description: string;
  category: string;
  mediaUrl: string | null;
  mediaAlt: string | null;
  mediaAssetId: string | null;
  isActive: boolean;
  displayOrder: number;
}

export default function AdminMediaPositionsPage() {
  const { toast } = useToast();
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<MediaPosition | null>(null);

  // Fetch all media positions
  const { data: positions = [], isLoading } = useQuery<MediaPosition[]>({
    queryKey: [api.admin.mediaPositions],
  });

  // Update position mutation
  const updatePositionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { mediaUrl?: string | null; mediaAlt?: string | null; mediaAssetId?: string | null } }) =>
      apiRequest(api.admin.mediaPosition(id), "PUT", data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [api.admin.mediaPositions] });
      setIsMediaPickerOpen(false);
      setSelectedPosition(null);
      
      const isRemove = variables.data.mediaUrl === null;
      toast({
        title: isRemove ? "Media removed" : "Media position updated",
        description: isRemove 
          ? "The image has been removed successfully."
          : "The image has been assigned successfully.",
      });
    },
    onError: (error: any) => {
      const errorMessage = error.details 
        ? `Validation error: ${error.details.map((d: any) => d.message).join(', ')}`
        : error.message || "Failed to update media position";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleAssignMedia = (position: MediaPosition) => {
    setSelectedPosition(position);
    setIsMediaPickerOpen(true);
  };

  const handleMediaSelect = (media: MediaAsset) => {
    if (!selectedPosition) return;

    updatePositionMutation.mutate({
      id: selectedPosition.id,
      data: {
        mediaUrl: media.url,
        mediaAlt: media.altText || media.originalName,
        mediaAssetId: media.id,
      },
    });
  };

  const handleRemoveMedia = (position: MediaPosition) => {
    updatePositionMutation.mutate({
      id: position.id,
      data: {
        mediaUrl: null,
        mediaAlt: null,
        mediaAssetId: null,
      },
    });
  };

  // Group positions by category
  const positionsByCategory = positions.reduce((acc, position) => {
    if (!acc[position.category]) {
      acc[position.category] = [];
    }
    acc[position.category].push(position);
    return acc;
  }, {} as Record<string, MediaPosition[]>);

  const categoryLabels: Record<string, string> = {
    hero: "Hero Images",
    logo: "Logos",
    about: "About Page",
    services: "Services",
    features: "Features",
    backgrounds: "Backgrounds",
    social: "Social Media",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Layout className="h-8 w-8" />
          Media Positions
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage images for all positions across your website from one place
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <div className="space-y-8">
          {Object.entries(positionsByCategory).map(([category, categoryPositions]) => (
            <div key={category}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                {categoryLabels[category] || category}
                <Badge variant="secondary">{categoryPositions.length}</Badge>
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categoryPositions
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((position) => (
                    <Card
                      key={position.id}
                      data-testid={`card-media-position-${position.positionKey}`}
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold" data-testid={`text-position-label-${position.positionKey}`}>
                              {position.label}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {position.description}
                            </p>
                            <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
                              {position.positionKey}
                            </code>
                          </div>

                          {position.mediaUrl ? (
                            <div className="relative">
                              <img
                                src={position.mediaUrl}
                                alt={position.mediaAlt || position.label}
                                className="w-full h-32 object-cover rounded-md"
                                data-testid={`img-position-media-${position.positionKey}`}
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-2">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleAssignMedia(position)}
                                  data-testid={`button-change-media-${position.positionKey}`}
                                >
                                  Change
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleRemoveMedia(position)}
                                  data-testid={`button-remove-media-${position.positionKey}`}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed rounded-md p-8 text-center">
                              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground mb-3">No image assigned</p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAssignMedia(position)}
                                data-testid={`button-assign-media-${position.positionKey}`}
                              >
                                <ImageIcon className="h-4 w-4 mr-2" />
                                Assign Image
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <MediaPicker
        open={isMediaPickerOpen}
        onOpenChange={(open) => {
          setIsMediaPickerOpen(open);
          if (!open) {
            setSelectedPosition(null);
          }
        }}
        onSelect={handleMediaSelect}
      />
    </div>
  );
}
