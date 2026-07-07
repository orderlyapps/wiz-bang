import { IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import type { Phone } from "@shared/database/rxdb/collections/publisher";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { PhoneInput } from "@ui/components/inputs/phone/PhoneInput";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";

interface Props {
  publisher_id: string;
  phone: NonNullable<Phone>;
  read_only?: boolean;
}

export function PhoneList({ publisher_id, phone, read_only = false }: Props) {
  return (
    <IonList>
      {phone.map((entry) =>
        read_only ? (
          <LabelValueItem
            key={entry.id}
            label={entry.label}
            value={entry.number}
            end_detail={
              <IonButton
                slot="end"
                fill="clear"
                href={`tel:${entry.number}`}
                aria-label={`Call ${entry.label}`}
              >
                Call
              </IonButton>
            }
          />
        ) : (
          <PhoneInput
            key={entry.id}
            label={entry.label}
            value={entry.number}
            on_change={(value) =>
              publisherLocalCollection.update(publisher_id, (draft) => {
                const item = draft.phone?.find((p) => p.id === entry.id);
                if (item) item.number = value;
              })
            }
          />
        ),
      )}
      {phone.length === 0 && (
        <IonItem>
          <IonLabel color="medium">No phone numbers</IonLabel>
        </IonItem>
      )}
    </IonList>
  );
}
