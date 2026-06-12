import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { FilterSelect } from "../filter-select/FilterSelect";
import { SortSelect } from "../sort-select/SortSelect";
import type { PublisherSortOrder } from "../../hooks/use-publisher-sort/usePublisherSort";
import type { PublisherFilter } from "../../hooks/use-publisher-filter/usePublisherFilter";

type ControlItem = { id: string };

const control_items: ControlItem[] = [{ id: "filter" }, { id: "sort" }];

interface PublisherControlsProps {
  sort_order: PublisherSortOrder;
  on_sort_change: (order: PublisherSortOrder) => void;
  filter: PublisherFilter;
  on_filter_change: (filter: PublisherFilter) => void;
}

export function PublisherControls({
  sort_order,
  on_sort_change,
  filter,
  on_filter_change,
}: PublisherControlsProps) {
  return (
    <MultiColumnList<ControlItem>
      items={control_items}
      get_id={(item) => item.id}
      render_item={(item) => {
        if (item.id === "filter")
          return <FilterSelect filter={filter} on_change={on_filter_change} />;
        return <SortSelect sort_order={sort_order} on_change={on_sort_change} />;
      }}
    />
  );
}
