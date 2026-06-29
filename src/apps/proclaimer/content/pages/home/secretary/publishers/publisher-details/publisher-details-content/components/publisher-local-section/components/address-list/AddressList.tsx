import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import type { Address } from "@shared/database/rxdb/collections/publisher";

interface Props {
  publisher_id: string;
  address: NonNullable<Address>;
}

export function AddressList({ publisher_id: _publisher_id, address }: Props) {
  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Address</IonLabel>
      </IonListHeader>
      {address.map((entry) => (
        <IonItem key={entry.id}>
          <IonLabel>
            <h2>{entry.label}</h2>
            <p>
              {[entry.unit_number, entry.house_number, entry.street, entry.suburb]
                .filter(Boolean)
                .join(" ")}
            </p>
          </IonLabel>
        </IonItem>
      ))}
      {address.length === 0 && (
        <IonItem>
          <IonLabel color="medium">No addresses</IonLabel>
        </IonItem>
      )}
    </IonList>
  );
}
