import { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { PhoneInput } from "@ui/components/inputs/phone/PhoneInput";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import type { EmergencyContact, Phone } from "@shared/database/rxdb/collections/publisher";

type Contact = NonNullable<EmergencyContact>[number];
type PhoneEntry = NonNullable<Phone>[number];

interface Props {
  is_open: boolean;
  on_dismiss: () => void;
  publisher_id: string;
  contact?: Contact | null;
}

export function EmergencyContactModal({ is_open, on_dismiss, publisher_id, contact }: Props) {
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [relationship, set_relationship] = useState("");
  const [phones, set_phones] = useState<PhoneEntry[]>([]);

  useEffect(() => {
    if (is_open) {
      set_first_name(contact?.first_name ?? "");
      set_last_name(contact?.last_name ?? "");
      set_relationship(contact?.relationship ?? "");
      set_phones(
        contact?.phone?.length
          ? contact.phone
          : [
              {
                id: crypto.randomUUID(),
                number: "",
                label: "Phone",
                version: {
                  created_by: "",
                  updated_by: "",
                  created_at: Date.now(),
                  updated_at: Date.now(),
                },
              },
            ],
      );
    }
  }, [is_open, contact]);

  function handle_save() {
    const id = contact?.id ?? crypto.randomUUID();
    const version = contact?.version ?? {
      created_by: "",
      updated_by: "",
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    publisherLocalCollection.update(publisher_id, (draft) => {
      if (!draft.emergency_contact) draft.emergency_contact = [];
      const existing = draft.emergency_contact.find((c) => c.id === id);
      if (existing) {
        Object.assign(existing, { first_name, last_name, relationship, phone: phones });
      } else {
        draft.emergency_contact.push({
          id,
          first_name,
          last_name,
          relationship,
          phone: phones,
          version,
        });
      }
    });
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{contact ? "Edit" : "Add"} Emergency Contact</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={on_dismiss}>Close</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton strong onClick={handle_save}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <TextInput label="First Name" value={first_name} on_change={set_first_name} />
          <TextInput label="Last Name" value={last_name} on_change={set_last_name} />
          <TextInput label="Relationship" value={relationship} on_change={set_relationship} />
          {phones.map((p, i) => (
            <PhoneInput
              key={p.id}
              label={`Phone${phones.length > 1 ? ` ${i + 1}` : ""}`}
              value={p.number}
              on_change={(value) =>
                set_phones(phones.map((ph) => (ph.id === p.id ? { ...ph, number: value } : ph)))
              }
            />
          ))}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
