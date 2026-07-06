import { IonItem, IonLabel } from "@ionic/react";
import type { EventRow } from "@shared/database/schemas/event";
import { EventDate } from "../event-date/EventDate";
import { EventType } from "../event-type/EventType";

interface CircuitVisitItemProps {
  event: EventRow;
  edit_href?: string;
}

export function CircuitVisitItem({ event, edit_href }: CircuitVisitItemProps) {
  return (
    <IonItem button={!!edit_href} routerLink={edit_href}>
      <IonLabel>
        <EventDate startDate={event.start_date} endDate={event.end_date} />
        <br />
        <EventType label="Circuit Overseer Visit" />
      </IonLabel>
    </IonItem>
  );
}
