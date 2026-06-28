import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import type { MonthGroup } from "../../groupEventsByMonth";
import { EventItem } from "../event-item/EventItem";

interface EventMonthGroupProps {
  group: MonthGroup;
}

export function EventMonthGroup({ group }: EventMonthGroupProps) {
  return (
    <IonList>
      <IonItem>
        <IonLabel className="ion-margin">
          <Body size="xl" color="primary">
            {group.label.toUpperCase()}
          </Body>
        </IonLabel>
      </IonItem>
      {group.events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      <Space size="sm" />
    </IonList>
  );
}
