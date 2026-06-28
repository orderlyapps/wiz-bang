import { IonItem, IonLabel } from "@ionic/react";
import type { EventRow } from "@shared/database/schemas/event";
import { EventDate } from "../event-date/EventDate";
import { EventType } from "../event-type/EventType";

interface CircuitVisitItemProps {
  event: EventRow;
}

export function CircuitVisitItem({ event }: CircuitVisitItemProps) {
  return (
    <IonItem>
      <IonLabel>
        <EventDate startDate={event.start_date} endDate={event.end_date} />
        <br />
        <EventType label="Circuit Overseer Visit" />
      </IonLabel>
    </IonItem>
  );
}
