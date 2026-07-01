import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useLiveQuery } from "@tanstack/react-db";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";

function sortPublishers(publishers: Publisher[]) {
  return publishers.sort((a, b) => {
    const lastNameCompare = a.last_name.localeCompare(b.last_name);
    if (lastNameCompare !== 0) return lastNameCompare;

    if (a.display_name && b.display_name) {
      const displayNameCompare = a.display_name.localeCompare(b.display_name);
      if (displayNameCompare !== 0) return displayNameCompare;
    } else if (a.display_name) {
      return -1;
    } else if (b.display_name) {
      return 1;
    }

    return a.first_name.localeCompare(b.first_name);
  });
}

export function PublishersContent() {
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  const permissions = usePermissions();

  const elders = sortPublishers(
    publishers?.filter(
      (publisher) =>
        publisher.standing === "elder" && publisher.type !== "speaker" && !publisher.archived_at,
    ) || [],
  );
  const ministerialServants = sortPublishers(
    publishers?.filter(
      (publisher) =>
        publisher.standing === "ministerial_servant" &&
        publisher.type !== "speaker" &&
        !publisher.archived_at,
    ) || [],
  );
  const regularPioneers = sortPublishers(
    publishers?.filter(
      (publisher) => publisher.type === "regular_pioneer" && !publisher.archived_at,
    ) || [],
  );

  const can_see_locations =
    permissions.has_elder || permissions.has_congregation_admin || permissions.is_super_admin;

  return (
    <>
      {can_see_locations && (
        <IonList>
          <NavItem label="Locations" to="/publishers/locations" />

          <Space />
        </IonList>
      )}
      <IonAccordionGroup>
        <IonAccordion value="elders">
          <IonItem slot="header">
            <IonLabel>
              <Heading>Elders ({elders.length})</Heading>
            </IonLabel>
          </IonItem>
          <div slot="content">
            <IonList>
              {elders.map((elder) => (
                <IonItem key={elder.id}>
                  <IonLabel>{getPublisherDisplayName(elder)}</IonLabel>
                </IonItem>
              ))}

              <Space />
            </IonList>
          </div>
        </IonAccordion>

        <IonAccordion value="ministerial-servants">
          <IonItem slot="header">
            <IonLabel>
              <Heading>Ministerial Servants ({ministerialServants.length})</Heading>
            </IonLabel>
          </IonItem>
          <div slot="content">
            <IonList>
              {ministerialServants.map((servant) => (
                <IonItem key={servant.id}>
                  <IonLabel>{getPublisherDisplayName(servant)}</IonLabel>
                </IonItem>
              ))}

              <Space />
            </IonList>
          </div>
        </IonAccordion>

        <IonAccordion value="regular-pioneers">
          <IonItem slot="header">
            <IonLabel>
              <Heading>Regular Pioneers ({regularPioneers.length})</Heading>
            </IonLabel>
          </IonItem>
          <div slot="content">
            <IonList>
              {regularPioneers.map((pioneer) => (
                <IonItem key={pioneer.id}>
                  <IonLabel>{getPublisherDisplayName(pioneer)}</IonLabel>
                </IonItem>
              ))}

              <Space />
            </IonList>
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </>
  );
}
