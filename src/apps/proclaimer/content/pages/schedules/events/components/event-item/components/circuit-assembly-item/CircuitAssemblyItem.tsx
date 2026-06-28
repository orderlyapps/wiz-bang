import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import type { EventRow } from "@shared/database/schemas/event";
import { EventDate } from "../event-date/EventDate";
import { EventType } from "../event-type/EventType";

interface CircuitAssemblyItemProps {
  event: EventRow;
}

export function CircuitAssemblyItem({ event }: CircuitAssemblyItemProps) {
  return (
    <IonItem>
      <IonLabel>
        <EventDate startDate={event.start_date} endDate={event.end_date} />
        <br />
        <EventType label="Circuit Assembly" />
        {event.name ? (
          <>
            <br />
            <Body size="sm">{event.name}</Body>
          </>
        ) : null}
      </IonLabel>
    </IonItem>
  );
}
