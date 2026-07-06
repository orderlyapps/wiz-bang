import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@shared/database/schemas/event";
import { formatEventDate } from "../../../../formatEventDate";

interface OtherEventItemProps {
  event: EventRow;
  edit_href?: string;
}

export function OtherEventItem({ event, edit_href }: OtherEventItemProps) {
  return (
    <LabelValueItem
      label={formatEventDate(event.start_date, event.end_date)}
      value={event.name || "Other"}
      value_2={event.description || undefined}
      router_link={edit_href}
    />
  );
}
