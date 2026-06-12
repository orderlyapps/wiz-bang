import { useState } from "react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { FilterSelectModal } from "./components/filter-select-modal/FilterSelectModal";
import type { GenderFilter } from "../../hooks/use-publisher-filter/usePublisherFilter";
import { filterLabels } from "../../hooks/use-publisher-filter/usePublisherFilter";

interface FilterSelectProps {
  filter: GenderFilter;
  on_change: (filter: GenderFilter) => void;
}

export function FilterSelect({ filter, on_change }: FilterSelectProps) {
  const [is_open, set_is_open] = useState(false);

  return (
    <>
      <ModalSelect
        label="Filter"
        display_value={filterLabels[filter]}
        placeholder="Filter..."
        on_open={() => set_is_open(true)}
      />
      <FilterSelectModal
        is_open={is_open}
        filter={filter}
        on_change={on_change}
        on_dismiss={() => set_is_open(false)}
      />
    </>
  );
}
