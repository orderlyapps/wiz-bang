import { useState } from "react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { SortSelectModal } from "./components/sort-select-modal/SortSelectModal";

export function SortSelect() {
  const [is_open, set_is_open] = useState(false);

  return (
    <>
      <ModalSelect
        label="Sort"
        display_value=""
        placeholder="Sort..."
        on_open={() => set_is_open(true)}
      />
      <SortSelectModal is_open={is_open} on_dismiss={() => set_is_open(false)} />
    </>
  );
}
