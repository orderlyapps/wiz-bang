import { Source, Layer } from "react-map-gl/mapbox";
import type { SelectedMap } from "../../../utils/types";
import {
  isValidBoundary,
  blockToLineStringCoords,
  blockToPolygonCoords,
} from "../../../utils/boundary";

type Props = {
  selectedMap: SelectedMap;
};

export function ScreenshotMapLayer({ selectedMap }: Props) {
  if (selectedMap.type !== "map") return null;

  const boundaryFeatures = isValidBoundary(selectedMap.boundary)
    ? [
        {
          type: "Feature" as const,
          geometry: {
            type: "Polygon" as const,
            coordinates: [selectedMap.boundary as number[][]],
          },
          properties: {},
        },
      ]
    : [];

  const blockFeatures = (selectedMap.blocks ?? [])
    .map((block) => {
      if (block.type === "face") {
        const coords = blockToLineStringCoords(block.coordinates);
        if (!coords) return null;
        return {
          type: "Feature" as const,
          geometry: { type: "LineString" as const, coordinates: coords },
          properties: { name: block.name },
        };
      }
      const coords = blockToPolygonCoords(block.coordinates);
      if (!coords) return null;
      return {
        type: "Feature" as const,
        geometry: { type: "Polygon" as const, coordinates: coords },
        properties: { name: block.name },
      };
    })
    .filter((f): f is NonNullable<typeof f> => f !== null);

  return (
    <>
      <Source
        id="screenshot-boundary"
        type="geojson"
        data={{ type: "FeatureCollection", features: boundaryFeatures }}
      >
        <Layer
          id="screenshot-boundary-fill"
          type="fill"
          paint={{ "fill-color": "#10b981", "fill-opacity": 0 }}
        />
        <Layer
          id="screenshot-boundary-line"
          type="line"
          paint={{ "line-color": "#F00", "line-width": 2.5 }}
        />
      </Source>
      <Source
        id="screenshot-blocks"
        type="geojson"
        data={{ type: "FeatureCollection", features: blockFeatures }}
      >
        <Layer
          id="screenshot-blocks-line"
          type="line"
          paint={{ "line-color": "#4f46e5", "line-width": 2 }}
        />
        <Layer
          id="screenshot-blocks-label"
          type="symbol"
          layout={{
            "text-field": ["get", "name"],
            "text-size": 13,
            "text-anchor": "center",
            "text-allow-overlap": true,
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          }}
          paint={{
            "text-color": "#1f2937",
            "text-halo-color": "#ffffff",
            "text-halo-width": 2,
          }}
        />
      </Source>
    </>
  );
}
