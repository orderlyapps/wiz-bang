import { IonItem, IonLabel } from "@ionic/react";
import type { EventRow } from "@shared/database/schemas/event";
import { EventDate } from "../event-date/EventDate";
import { EventType } from "../event-type/EventType";

interface SpecialTalkItemProps {
  event: EventRow;
}

export function SpecialTalkItem({ event }: SpecialTalkItemProps) {
  return (
    <IonItem>
      <IonLabel>
        <EventDate startDate={event.start_date} endDate={event.end_date} />
        <br />
        <EventType label="Special Talk" />
      </IonLabel>
    </IonItem>
  );
}
