import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import type { MapRow } from "@shared/database/schemas/map";
import {
  blockToLineStringCoords,
  blockToPolygonCoords,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/boundary";
import { useSelectedMap } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useSelectedMapContext";

type BlockFeature =
  | {
      type: "Feature";
      geometry: { type: "Polygon"; coordinates: number[][][] };
      properties: { id: string; name: string; block_type: "block" };
    }
  | {
      type: "Feature";
      geometry: { type: "LineString"; coordinates: number[][] };
      properties: { id: string; name: string; block_type: "face" };
    };

export type BlocksGeoJSON = {
  type: "FeatureCollection";
  features: BlockFeature[];
};

export function useSelectedMapBlocks(): BlocksGeoJSON {
  const { data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const publisher = useStoredPublisher();
  const congregation_id = publisher?.congregation_id;
  const { selectedMapId } = useSelectedMap();

  const selectedMap = ((data ?? []) as MapRow[]).find(
    (row) => row.id === selectedMapId && row.congregation_id === congregation_id,
  );

  if (!selectedMap || !selectedMap.blocks) {
    return { type: "FeatureCollection", features: [] };
  }

  const features = selectedMap.blocks
    .map((block) => {
      if (block.type === "face") {
        const coordinates = blockToLineStringCoords(block.coordinates);
        if (!coordinates) return null;
        return {
          type: "Feature" as const,
          geometry: { type: "LineString" as const, coordinates },
          properties: {
            id: block.id,
            name: block.name,
            block_type: block.type,
          },
        };
      }

      const coordinates = blockToPolygonCoords(block.coordinates);
      if (!coordinates) return null;
      return {
        type: "Feature" as const,
        geometry: { type: "Polygon" as const, coordinates },
        properties: {
          id: block.id,
          name: block.name,
          block_type: block.type,
        },
      };
    })
    .filter((feature): feature is BlockFeature => feature !== null);

  return { type: "FeatureCollection", features };
}
