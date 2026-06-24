import { useState } from "react";
import { mapCollection } from "@shared/database/collections/map";
import { mapMasterCollection } from "@shared/database/collections/map-master";
import type { SelectedMap } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/types";

export function useMapPage(onFitBounds: (bounds: SelectedMap["bounds"]) => void) {
  const [selected_map, set_selected_map] = useState<SelectedMap | null>(null);
  const [pending_boundary, set_pending_boundary] = useState<GeoJSON.Position[] | null | undefined>(
    undefined,
  );

  function handleSelect(selection: SelectedMap) {
    set_selected_map(selection);
    set_pending_boundary(undefined);
    onFitBounds(selection.bounds);
  }

  function handlePendingChange(boundary: GeoJSON.Position[] | null) {
    set_pending_boundary(boundary);
  }

  function handleSave() {
    if (!selected_map || pending_boundary === undefined) return;
    if (selected_map.type === "map") {
      mapCollection.update(selected_map.id, (draft) => {
        draft.boundary = pending_boundary;
      });
    } else {
      mapMasterCollection.update(selected_map.congregation_id, (draft) => {
        draft.boundary = pending_boundary;
      });
    }
    set_pending_boundary(undefined);
  }

  return {
    selected_map,
    has_pending_changes: pending_boundary !== undefined,
    handleSelect,
    handlePendingChange,
    handleSave,
  };
}
