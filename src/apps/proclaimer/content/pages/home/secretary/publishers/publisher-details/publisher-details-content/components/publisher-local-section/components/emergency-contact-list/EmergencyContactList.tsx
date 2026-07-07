import { useState } from "react";
import { IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import type { EmergencyContact } from "@shared/database/rxdb/collections/publisher";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { EmergencyContactModal } from "./components/emergency-contact-modal/EmergencyContactModal";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";

type Contact = NonNullable<EmergencyContact>[number];

interface Props {
  publisher_id: string;
  emergency_contact: NonNullable<EmergencyContact>;
  read_only?: boolean;
}

export function EmergencyContactList({
  publisher_id,
  emergency_contact,
  read_only = false,
}: Props) {
  const [editing_contact, set_editing_contact] = useState<Contact | null>(null);
  const [is_modal_open, set_is_modal_open] = useState(false);

  function open_edit(contact: Contact) {
    set_editing_contact(contact);
    set_is_modal_open(true);
  }

  function open_add() {
    set_editing_contact(null);
    set_is_modal_open(true);
  }

  function close_modal() {
    set_is_modal_open(false);
    set_editing_contact(null);
  }

  return (
    <>
      <IonList>
        <Space />
        <IonItem>
          <IonLabel>
            <Heading size="sm">Emergency Contacts</Heading>
          </IonLabel>
        </IonItem>
        {emergency_contact.map((contact) => (
          <div key={contact.id} onClick={() => !read_only && open_edit(contact)}>
            <InputWrapper
              label={`${contact.first_name} ${contact.last_name} (${contact.relationship})`}
            >
              <Body>
                {contact.phone.map((p) => (
                  <p key={p.id}>{p.number}</p>
                ))}
              </Body>
            </InputWrapper>
          </div>
        ))}
        {emergency_contact.length === 0 && (
          <IonItem>
            <IonLabel color="medium">No emergency contacts</IonLabel>
          </IonItem>
        )}
        {!read_only && (
          <IonItem button detail={false} onClick={open_add}>
            <IonIcon icon={addOutline} slot="start" color="primary" />
            <IonLabel color="primary">Add Emergency Contact</IonLabel>
          </IonItem>
        )}
      </IonList>
      {!read_only && (
        <EmergencyContactModal
          is_open={is_modal_open}
          on_dismiss={close_modal}
          publisher_id={publisher_id}
          contact={editing_contact}
        />
      )}
    </>
  );
}
