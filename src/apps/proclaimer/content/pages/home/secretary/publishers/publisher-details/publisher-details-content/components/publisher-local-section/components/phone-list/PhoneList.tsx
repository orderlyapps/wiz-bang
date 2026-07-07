import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { callOutline, chatbubbleEllipsesOutline } from "ionicons/icons";
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
    <>
      {phone.map((entry) =>
        read_only ? (
          <LabelValueItem
            key={entry.id}
            label={entry.label}
            value={entry.number}
            end_detail={
              <>
                <IonButton
                  fill="clear"
                  size="small"
                  aria-label={`SMS ${entry.label}`}
                  onClick={() => {
                    window.location.href = `sms:${entry.number}`;
                  }}
                >
                  <IonIcon slot="icon-only" icon={chatbubbleEllipsesOutline} />
                </IonButton>
                <IonButton
                  fill="clear"
                  size="small"
                  aria-label={`Call ${entry.label}`}
                  onClick={() => {
                    window.location.href = `tel:${entry.number}`;
                  }}
                >
                  <IonIcon slot="icon-only" icon={callOutline} />
                </IonButton>
              </>
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
    </>
  );
}
