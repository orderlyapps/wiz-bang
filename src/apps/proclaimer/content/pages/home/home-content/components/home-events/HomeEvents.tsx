import { and, eq, gte, useLiveQuery } from "@tanstack/react-db";
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import { format } from "date-fns";
import { eventCollection } from "@shared/database/collections/event";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { EventItem } from "@proclaimer-content/pages/schedules/events/components/event-item/EventItem";

export function HomeEvents() {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;
  const today_str = format(new Date(), "yyyy-MM-dd");

  const { data: events } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ e: eventCollection })
            .where(({ e }) =>
              and(eq(e.congregation_id, congregation_id), gte(e.start_date, today_str)),
            )
            .orderBy(({ e }) => e.start_date)
        : undefined,
    [congregation_id, today_str],
  );

  const upcoming_events = events?.slice(0, 3) ?? [];

  if (!upcoming_events.length) {
    return null;
  }

  return (
    <IonAccordionGroup>
      <IonAccordion value="events">
        <IonItem slot="header">
          <IonLabel>
            <Heading>Events</Heading>
          </IonLabel>
        </IonItem>
        <div slot="content">
          <IonList>
            {upcoming_events.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </IonList>
          <NavItem label="See more" to="/home/events" />
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
}
