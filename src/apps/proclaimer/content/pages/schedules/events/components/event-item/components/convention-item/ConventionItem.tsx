import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@shared/database/schemas/event";
import { formatEventDate } from "../../../../formatEventDate";

interface ConventionItemProps {
  event: EventRow;
  edit_href?: string;
}

export function ConventionItem({ event, edit_href }: ConventionItemProps) {
  return (
    <LabelValueItem
      value="Convention"
      label={formatEventDate(event.start_date, event.end_date)}
      value_2={event.name || undefined}
      router_link={edit_href}
    />
  );
}
