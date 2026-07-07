import { IonItem, IonLabel, IonList } from "@ionic/react";
import type { EmergencyContact } from "@shared/database/rxdb/collections/publisher";
import { Heading } from "@ui/components/display/text/heading/Heading";

interface Props {
  publisher_id: string;
  emergency_contact: NonNullable<EmergencyContact>;
}

export function EmergencyContactList({ publisher_id: _publisher_id, emergency_contact }: Props) {
  return (
    <IonList>
      <IonItem>
        <IonLabel>
          <Heading>Emergency Contacts</Heading>
        </IonLabel>
      </IonItem>
      {emergency_contact.map((contact) => (
        <IonItem key={contact.id}>
          <IonLabel>
            <h2>
              {contact.first_name} {contact.last_name}
            </h2>
            <p>{contact.relationship}</p>
            {contact.phone.map((p) => (
              <p key={p.id}>{p.number}</p>
            ))}
          </IonLabel>
        </IonItem>
      ))}
      {emergency_contact.length === 0 && (
        <IonItem>
          <IonLabel color="medium">No emergency contacts</IonLabel>
        </IonItem>
      )}
    </IonList>
  );
}
