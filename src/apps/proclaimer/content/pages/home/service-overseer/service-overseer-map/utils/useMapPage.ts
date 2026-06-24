import { useState } from "react";
import { mapCollection } from "@shared/database/collections/map";
import { mapMasterCollection } from "@shared/database/collections/map-master";
import type {
  Block,
  SelectedMap,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/types";

export function useMapPage(onFitBounds: (bounds: SelectedMap["bounds"]) => void) {
  const [selected_map, set_selected_map] = useState<SelectedMap | null>(null);
  const [selected_block, set_selected_block] = useState<Block | null>(null);
  const [pending_boundary, set_pending_boundary] = useState<GeoJSON.Position[] | null | undefined>(
    undefined,
  );
  const [pending_block, set_pending_block] = useState<Block | null | undefined>(undefined);

  function handleSelect(selection: SelectedMap) {
    set_selected_map(selection);
    set_selected_block(null);
    set_pending_boundary(undefined);
    set_pending_block(undefined);
    onFitBounds(selection.bounds);
  }

  function handlePendingChange(boundary: GeoJSON.Position[] | null) {
    set_pending_boundary(boundary);
  }

  function handleEditBlock(block: Block) {
    set_selected_block(block);
    set_pending_block(undefined);
  }

  function handleBlockPendingChange(block: Block | null) {
    set_pending_block(block);
  }

  function handleSave() {
    if (!selected_map) return;

    if (selected_map.type === "map") {
      if (pending_boundary !== undefined) {
        mapCollection.update(selected_map.id, (draft) => {
          draft.boundary = pending_boundary as [number, number][] | null;
        });
      }

      if (pending_block !== undefined) {
        const block_id = pending_block?.id ?? selected_block?.id;
        if (block_id) {
          mapCollection.update(selected_map.id, (draft) => {
            if (pending_block === null) {
              draft.blocks = draft.blocks?.filter((block) => block.id !== block_id) ?? null;
            } else {
              const index = draft.blocks?.findIndex((block) => block.id === pending_block.id);
              if (index !== undefined && index !== -1) {
                draft.blocks![index] = pending_block;
              }
            }
          });
        }

        set_selected_map((current) => {
          if (!current || current.type !== "map" || current.id !== selected_map.id) return current;
          if (pending_block === null) {
            return {
              ...current,
              blocks: current.blocks?.filter((block) => block.id !== block_id) ?? null,
            };
          }
          return {
            ...current,
            blocks:
              current.blocks?.map((block) =>
                block.id === pending_block.id ? pending_block : block,
              ) ?? null,
          };
        });
      }
    } else if (pending_boundary !== undefined) {
      mapMasterCollection.update(selected_map.congregation_id, (draft) => {
        draft.boundary = pending_boundary;
      });
    }

    set_pending_boundary(undefined);
    set_pending_block(undefined);
  }

  return {
    selected_map,
    selected_block,
    has_pending_changes: pending_boundary !== undefined || pending_block !== undefined,
    handleSelect,
    handlePendingChange,
    handleEditBlock,
    handleBlockPendingChange,
    handleSave,
  };
}
