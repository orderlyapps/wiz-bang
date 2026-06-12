import { useState } from "react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { SortSelectModal } from "./components/sort-select-modal/SortSelectModal";
import type { PublisherSortOrder } from "../../hooks/use-publisher-sort/usePublisherSort";
import { sortOrderLabels } from "../../hooks/use-publisher-sort/usePublisherSort";

interface SortSelectProps {
  sort_order: PublisherSortOrder;
  on_change: (order: PublisherSortOrder) => void;
}

export function SortSelect({ sort_order, on_change }: SortSelectProps) {
  const [is_open, set_is_open] = useState(false);

  return (
    <>
      <ModalSelect
        label="Sort"
        display_value={sortOrderLabels[sort_order]}
        placeholder="Sort..."
        on_open={() => set_is_open(true)}
      />
      <SortSelectModal
        is_open={is_open}
        sort_order={sort_order}
        on_change={on_change}
        on_dismiss={() => set_is_open(false)}
      />
    </>
  );
}
