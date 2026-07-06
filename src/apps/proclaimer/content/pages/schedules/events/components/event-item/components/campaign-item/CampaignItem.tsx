import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { EventRow } from "@shared/database/schemas/event";
import { formatEventDate } from "../../../../formatEventDate";

interface CampaignItemProps {
  event: EventRow;
  edit_href?: string;
}

export function CampaignItem({ event, edit_href }: CampaignItemProps) {
  return (
    <LabelValueItem
      label={formatEventDate(event.start_date, event.end_date)}
      value={event.name || undefined}
      router_link={edit_href}
    />
  );
}
