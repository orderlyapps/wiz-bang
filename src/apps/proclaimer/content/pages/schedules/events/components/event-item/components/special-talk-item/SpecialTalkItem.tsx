import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@shared/database/schemas/event";
import { formatEventDate } from "../../../../formatEventDate";

interface SpecialTalkItemProps {
  event: EventRow;
  edit_href?: string;
}

export function SpecialTalkItem({ event, edit_href }: SpecialTalkItemProps) {
  return (
    <LabelValueItem
      label={formatEventDate(event.start_date, event.end_date)}
      value="Special Talk"
      value_2={event.name || undefined}
      router_link={edit_href}
    />
  );
}
