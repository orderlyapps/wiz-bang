import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import type { EventRow } from "@shared/database/schemas/event";
import { EventDate } from "../event-date/EventDate";
import { EventType } from "../event-type/EventType";

interface ConventionItemProps {
  event: EventRow;
  edit_href?: string;
}

export function ConventionItem({ event, edit_href }: ConventionItemProps) {
  return (
    <IonItem button={!!edit_href} routerLink={edit_href}>
      <IonLabel>
        <EventDate startDate={event.start_date} endDate={event.end_date} />
        <br />
        <EventType label="Convention" />
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
