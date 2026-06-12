import { useState } from "react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { FilterSelectModal } from "./components/filter-select-modal/FilterSelectModal";

export function FilterSelect() {
  const [is_open, set_is_open] = useState(false);

  return (
    <>
      <ModalSelect
        label="Filter"
        display_value=""
        placeholder="Filter..."
        on_open={() => set_is_open(true)}
      />
      <FilterSelectModal is_open={is_open} on_dismiss={() => set_is_open(false)} />
    </>
  );
}
