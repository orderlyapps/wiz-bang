import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@shared/database/schemas/event";
import { formatEventDate } from "../../../../formatEventDate";

interface CircuitVisitItemProps {
  event: EventRow;
  edit_href?: string;
}

export function CircuitVisitItem({ event, edit_href }: CircuitVisitItemProps) {
  return (
    <LabelValueItem
      label={formatEventDate(event.start_date, event.end_date)}
      value="Circuit Overseer Visit"
      router_link={edit_href}
    />
  );
}
