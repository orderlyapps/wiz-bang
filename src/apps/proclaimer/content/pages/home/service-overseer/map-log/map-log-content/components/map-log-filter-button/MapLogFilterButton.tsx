import { useState } from "react";
import { MapLogFilterModal } from "../map-log-filter-modal/MapLogFilterModal";
import type { MapLogFilters } from "../use-map-log-filters/useMapLogFilters";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";

interface MapLogFilterButtonProps {
  filters: MapLogFilters;
  has_active_filters: boolean;
  on_change: (filters: MapLogFilters) => void;
}

export function MapLogFilterButton({
  filters,
  has_active_filters,
  on_change,
}: MapLogFilterButtonProps) {
  const [is_open, set_is_open] = useState(false);

  return (
    <>
      <TextButton
        color={has_active_filters ? "primary" : "medium"}
        on_click={() => set_is_open(true)}
        label="Filter & Sort"
      ></TextButton>
      <MapLogFilterModal
        is_open={is_open}
        filters={filters}
        on_change={on_change}
        on_dismiss={() => set_is_open(false)}
      />
    </>
  );
}
