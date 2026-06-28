import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import type { EventRow } from "@shared/database/schemas/event";
import { EventDate } from "../event-date/EventDate";
import { EventType } from "../event-type/EventType";

interface OtherEventItemProps {
  event: EventRow;
}

export function OtherEventItem({ event }: OtherEventItemProps) {
  return (
    <IonItem>
      <IonLabel>
        <EventDate startDate={event.start_date} endDate={event.end_date} />
        <br />
        <EventType label={event.name || "Other"} />
        {event.description ? (
          <>
            <br />
            <Body size="sm">{event.description}</Body>
          </>
        ) : null}
      </IonLabel>
    </IonItem>
  );
}
