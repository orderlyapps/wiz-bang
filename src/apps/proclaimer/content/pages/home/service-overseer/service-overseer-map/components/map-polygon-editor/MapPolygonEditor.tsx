import { useEffect } from "react";
import { useMap } from "react-map-gl/mapbox";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import type { IControl } from "mapbox-gl";
import { mapCollection } from "@shared/database/collections/map";
import { mapMasterCollection } from "@shared/database/collections/map-master";
import { boundaryToPolygonCoords } from "../../utils/boundary";
import type { SelectedMap } from "../../types";

type Props = {
  selection: SelectedMap;
};

export function MapPolygonEditor({ selection }: Props) {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;

    const coordinates = boundaryToPolygonCoords(selection.boundary);
    if (!coordinates) return;

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: { trash: true },
    });

    let added = false;
    let listeners_attached = false;
    let feature_id: string | null = null;
    let current_ring = coordinates[0];

    function handleUpdate(e: { features: GeoJSON.Feature[] }) {
      const updated = e.features[0];
      if (!updated || updated.geometry.type !== "Polygon") return;
      const updatedCoords = updated.geometry.coordinates[0];
      if (!updatedCoords) return;
      current_ring = updatedCoords;
      if (selection.type === "map") {
        mapCollection.update(selection.id, (draft) => {
          draft.boundary = updatedCoords;
        });
      } else {
        mapMasterCollection.update(selection.congregation_id, (draft) => {
          draft.boundary = updatedCoords;
        });
      }
    }

    function handleDelete(e: { features: GeoJSON.Feature[] }) {
      const deleted = e.features[0];
      if (!deleted || deleted.id !== feature_id) return;

      if (selection.type === "map") {
        mapCollection.update(selection.id, (draft) => {
          draft.boundary = null;
        });
        return;
      }

      // Master boundary is NOT NULL in the DB, so re-add the feature instead of clearing it.
      try {
        const feature = draw.add({
          type: "Feature",
          id: "editing-polygon",
          geometry: { type: "Polygon", coordinates: [current_ring] },
          properties: {},
        });
        feature_id = feature[0] ?? null;
        if (feature_id) {
          draw.changeMode("direct_select", { featureId: feature_id });
        }
      } catch {
        // ignore
      }
    }

    try {
      map.addControl(draw as unknown as IControl);
      added = true;

      const feature = draw.add({
        type: "Feature",
        id: "editing-polygon",
        geometry: { type: "Polygon", coordinates: coordinates },
        properties: {},
      });
      feature_id = feature[0] ?? null;

      if (feature_id) {
        draw.changeMode("direct_select", { featureId: feature_id });
      }

      map.on("draw.update", handleUpdate);
      map.on("draw.delete", handleDelete);
      listeners_attached = true;
    } catch {
      if (listeners_attached) {
        map.off("draw.update", handleUpdate);
        map.off("draw.delete", handleDelete);
      }
      if (added) {
        map.removeControl(draw as unknown as IControl);
      }
      return;
    }

    return () => {
      map.off("draw.update", handleUpdate);
      map.off("draw.delete", handleDelete);
      map.removeControl(draw as unknown as IControl);
    };
  }, [map, selection]);

  return null;
}
