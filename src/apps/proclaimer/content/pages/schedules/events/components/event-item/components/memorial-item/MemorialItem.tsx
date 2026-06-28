import { IonItem, IonLabel } from "@ionic/react";
import type { EventRow } from "@shared/database/schemas/event";
import { EventDate } from "../event-date/EventDate";
import { EventType } from "../event-type/EventType";

interface MemorialItemProps {
  event: EventRow;
}

export function MemorialItem({ event }: MemorialItemProps) {
  return (
    <IonItem>
      <IonLabel>
        <EventDate startDate={event.start_date} endDate={event.end_date} />
        <br />
        <EventType label="Memorial" />
      </IonLabel>
    </IonItem>
  );
}
