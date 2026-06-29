import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import type { Email } from "@shared/database/rxdb/collections/publisher";

interface Props {
  publisher_id: string;
  email: NonNullable<Email>;
}

export function EmailList({ publisher_id: _publisher_id, email }: Props) {
  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Email</IonLabel>
      </IonListHeader>
      {email.map((entry) => (
        <IonItem key={entry.id}>
          <IonLabel>
            <h2>{entry.label}</h2>
            <p>{entry.address}</p>
          </IonLabel>
        </IonItem>
      ))}
      {email.length === 0 && (
        <IonItem>
          <IonLabel color="medium">No email addresses</IonLabel>
        </IonItem>
      )}
    </IonList>
  );
}
