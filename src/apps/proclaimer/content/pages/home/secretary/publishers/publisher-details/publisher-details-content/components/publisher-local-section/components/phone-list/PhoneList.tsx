import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import type { Phone } from "@shared/database/rxdb/collections/publisher";

interface Props {
  publisher_id?: string;
  phone: NonNullable<Phone>;
}

export function PhoneList({ phone }: Props) {
  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Phone</IonLabel>
      </IonListHeader>
      {phone.map((entry) => (
        <IonItem key={entry.id}>
          <IonLabel>
            <h2>{entry.label}</h2>
            <p>{entry.number}</p>
          </IonLabel>
        </IonItem>
      ))}
      {phone.length === 0 && (
        <IonItem>
          <IonLabel color="medium">No phone numbers</IonLabel>
        </IonItem>
      )}
    </IonList>
  );
}
