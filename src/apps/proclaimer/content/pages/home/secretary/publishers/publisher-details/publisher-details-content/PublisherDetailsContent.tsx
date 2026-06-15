import { IonContent, IonList, IonItem, IonLabel } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";

export function PublisherDetailsContent({ publisher_id }: { publisher_id: string }) {
  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisher_id)),
  );

  const publisher = data?.[0];

  if (isLoading) {
    return (
      <IonContent>
        <Spinner />
      </IonContent>
    );
  }

  if (!publisher) {
    return (
      <IonContent>
        <div className="ion-padding ion-text-center">
          <Body color="medium">Publisher not found.</Body>
        </div>
      </IonContent>
    );
  }

  return (
    <IonContent>
      <IonList>
        <IonItem>
          <IonLabel>
            <h2>First Name</h2>
            <p>{publisher.first_name}</p>
          </IonLabel>
        </IonItem>
        {publisher.middle_name && (
          <IonItem>
            <IonLabel>
              <h2>Middle Name</h2>
              <p>{publisher.middle_name}</p>
            </IonLabel>
          </IonItem>
        )}
        <IonItem>
          <IonLabel>
            <h2>Last Name</h2>
            <p>{publisher.last_name}</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h2>Gender</h2>
            <p style={{ textTransform: "capitalize" }}>{publisher.gender}</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h2>Type</h2>
            <p>{publisher.type}</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h2>Standing</h2>
            <p>{publisher.standing}</p>
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  );
}
