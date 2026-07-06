import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@shared/database/schemas/event";
import { formatEventDate } from "../../../../formatEventDate";

interface SpecialMeetingItemProps {
  event: EventRow;
  edit_href?: string;
}

export function SpecialMeetingItem({ event, edit_href }: SpecialMeetingItemProps) {
  return (
    <LabelValueItem
      label={formatEventDate(event.start_date, event.end_date)}
      value="Special Meeting"
      router_link={edit_href}
    />
  );
}
