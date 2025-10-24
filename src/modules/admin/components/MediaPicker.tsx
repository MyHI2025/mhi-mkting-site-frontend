import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { api } from "@/lib/api";
import { type MediaAsset } from "@myhi2025/shared";

interface MediaPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (media: MediaAsset) => void;
  selectedMediaId?: string | null;
}

export function MediaPicker({
  open,
  onOpenChange,
  onSelect,
  selectedMediaId,
}: MediaPickerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: mediaAssets = [], isLoading } = useQuery({
    queryKey: [api.admin.media, searchQuery],
    queryFn: () => {
      const params = searchQuery
        ? `?search=${encodeURIComponent(searchQuery)}`
        : "";
      return apiRequest(`${api.admin.media}${params}`);
    },
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
          <DialogDescription>
            Choose a photo from your media library
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              data-testid="input-media-search"
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading...
            </div>
          ) : mediaAssets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No media found. Upload some images first.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaAssets.map((media: MediaAsset) => (
                <button
                  key={media.id}
                  data-testid={`button-select-media-${media.id}`}
                  onClick={() => {
                    onSelect(media);
                    onOpenChange(false);
                  }}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    selectedMediaId === media.id
                      ? "border-primary ring-2 ring-primary"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <img
                    src={media.url}
                    alt={media.altText || media.filename}
                    className="w-full h-full object-cover"
                  />
                  {selectedMediaId === media.id && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs truncate">
                    {media.filename}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button
            data-testid="button-cancel-media-picker"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
