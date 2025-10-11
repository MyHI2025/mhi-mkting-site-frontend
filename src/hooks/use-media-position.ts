import { useQuery } from "@tanstack/react-query";
import type { MediaPosition } from "@myhealthintegral/shared";
import { api } from '@/lib/api';

export function useMediaPosition(positionKey: string) {
  return useQuery<MediaPosition | null>({
    queryKey: [api.public.mediaPosition(positionKey)],
    enabled: !!positionKey,
  });
}

export function useMediaPositions() {
  return useQuery<MediaPosition[]>({
    queryKey: [api.public.mediaPositions],
  });
}
