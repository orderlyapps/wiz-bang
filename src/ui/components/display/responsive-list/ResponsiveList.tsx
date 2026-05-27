import { useBreakpoint } from "@util/hooks/use-breakpoint/use-breakpoint";
import { ResponsiveListCards } from "./components/responsive-list-cards/ResponsiveListCards";
import { ResponsiveListTable } from "./components/responsive-list-table/ResponsiveListTable";
import type { ResponsiveListProps } from "./types";

export function ResponsiveList<T>({
  items,
  columns,
  get_id,
  on_select,
  render_card,
  empty,
}: ResponsiveListProps<T>) {
  const { is_desktop } = useBreakpoint();

  if (items.length === 0 && empty) {
    return <>{empty}</>;
  }

  if (is_desktop) {
    return (
      <ResponsiveListTable items={items} columns={columns} get_id={get_id} on_select={on_select} />
    );
  }

  return (
    <ResponsiveListCards
      items={items}
      columns={columns}
      get_id={get_id}
      on_select={on_select}
      render_card={render_card}
    />
  );
}
