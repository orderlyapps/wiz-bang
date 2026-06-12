import { type ReactNode } from "react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { FilterSelect } from "../filter-select/FilterSelect";
import { SortSelect } from "../sort-select/SortSelect";

type ControlItem = { id: string; component: ReactNode };

const controls: ControlItem[] = [
  { id: "filter", component: <FilterSelect /> },
  { id: "sort", component: <SortSelect /> },
];

export function PublisherControls() {
  return (
    <MultiColumnList<ControlItem>
      items={controls}
      get_id={(item) => item.id}
      render_item={(item) => item.component}
    />
  );
}
