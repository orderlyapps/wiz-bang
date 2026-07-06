import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@shared/database/schemas/event";
import { formatEventDate } from "../../../../formatEventDate";

interface CircuitAssemblyItemProps {
  event: EventRow;
  edit_href?: string;
}

export function CircuitAssemblyItem({ event, edit_href }: CircuitAssemblyItemProps) {
  return (
    <LabelValueItem
      label={formatEventDate(event.start_date, event.end_date)}
      value="Circuit Assembly"
      value_2={event.name || undefined}
      router_link={edit_href}
    />
  );
}
