import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import type { Email } from "@shared/database/rxdb/collections/publisher";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { EmailInput } from "@ui/components/inputs/email/EmailInput";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { mailOutline } from "ionicons/icons";

interface Props {
  publisher_id: string;
  email: NonNullable<Email>;
  read_only?: boolean;
}

export function EmailList({ publisher_id, email, read_only = false }: Props) {
  return (
    <>
      {email.map((entry) =>
        read_only ? (
          <LabelValueItem
            key={entry.id}
            label={entry.label}
            value={entry.address}
            end_detail={
              <IonButton
                fill="clear"
                size="small"
                aria-label={`Email ${entry.label}`}
                onClick={() => {
                  window.location.href = `mailto:${entry.address}`;
                }}
              >
                <IonIcon slot="icon-only" icon={mailOutline} />
              </IonButton>
            }
          />
        ) : (
          <EmailInput
            key={entry.id}
            label={entry.label}
            value={entry.address}
            on_change={(value) =>
              publisherLocalCollection.update(publisher_id, (draft) => {
                const item = draft.email?.find((e) => e.id === entry.id);
                if (item) {
                  item.address = value;
                }
              })
            }
          />
        ),
      )}
      {email.length === 0 && (
        <IonItem>
          <IonLabel color="medium">No email addresses</IonLabel>
        </IonItem>
      )}
    </>
  );
}
