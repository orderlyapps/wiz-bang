import { IonList } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { PhoneList } from "./components/phone-list/PhoneList";
import { AddressList } from "./components/address-list/AddressList";
import { EmailList } from "./components/email-list/EmailList";
import { EmergencyContactList } from "./components/emergency-contact-list/EmergencyContactList";

interface Props {
  publisher_id: string;
  read_only?: boolean;
}

export function PublisherLocalSection({ publisher_id, read_only = false }: Props) {
  const { data } = useLiveQuery((q) =>
    q.from({ p: publisherLocalCollection }).where(({ p }) => eq(p.publisher_id, publisher_id)),
  );

  const local = data?.[0];

  if (!local) return null;

  return (
    <>
      <IonList>
        {read_only ? (
          <>
            <LabelValueItem
              label="Date of Birth"
              value={local.birth_date ? new Date(local.birth_date).toLocaleDateString() : ""}
            />
            <LabelValueItem
              label="Baptism Date"
              value={local.baptism_date ? new Date(local.baptism_date).toLocaleDateString() : ""}
            />
          </>
        ) : (
          <>
            <DateInput
              label="Date of Birth"
              value={local.birth_date ?? ""}
              on_change={(value) =>
                publisherLocalCollection.update(publisher_id, (draft) => {
                  draft.birth_date = value;
                })
              }
            />
            <DateInput
              label="Baptism Date"
              value={local.baptism_date ?? ""}
              on_change={(value) =>
                publisherLocalCollection.update(publisher_id, (draft) => {
                  draft.baptism_date = value;
                })
              }
            />
          </>
        )}
      </IonList>
      <PhoneList publisher_id={publisher_id} phone={local.phone ?? []} read_only={read_only} />
      <AddressList
        publisher_id={publisher_id}
        address={local.address ?? []}
        read_only={read_only}
      />
      <EmailList publisher_id={publisher_id} email={local.email ?? []} read_only={read_only} />
      <EmergencyContactList
        publisher_id={publisher_id}
        emergency_contact={local.emergency_contact ?? []}
      />
    </>
  );
}
