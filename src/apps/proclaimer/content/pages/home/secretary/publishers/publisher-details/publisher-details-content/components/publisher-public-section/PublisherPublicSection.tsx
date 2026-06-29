import { IonItem, IonLabel, IonList } from "@ionic/react";
import type { Publisher } from "@shared/database/schemas/publisher";
import { publisherCollection } from "@shared/database/collections/publisher";
import { PublisherNameInput } from "@proclaimer-shared/publisher/components/publisher-name-input/PublisherNameInput";
import { Select } from "@ui/components/inputs/select/Select";
import { ArchivePublisherButton } from "../archive-publisher-button/ArchivePublisherButton";

interface Props {
  publisher_id: string;
  publisher: Publisher & { id?: string };
}

export function PublisherPublicSection({ publisher_id, publisher }: Props) {
  return (
    <IonList>
      <PublisherNameInput
        publisher_id={publisher_id}
        value={{
          first_name: publisher.first_name,
          middle_name: publisher.middle_name ?? null,
          last_name: publisher.last_name,
          display_name: publisher.display_name ?? null,
        }}
      />
      <Select
        label="Gender"
        value={publisher.gender}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
        on_change={(value) => {
          if (!value || Array.isArray(value)) return;
          publisherCollection.update(publisher_id, (draft) => {
            draft.gender = value as typeof publisher.gender;
          });
        }}
      />
      <Select
        label="Type"
        value={publisher.type}
        options={[
          { label: "Publisher", value: "publisher" },
          { label: "Continuous Auxiliary", value: "continuous_auxiliary" },
          { label: "Regular Pioneer", value: "regular_pioneer" },
          { label: "Special Pioneer", value: "special_pioneer" },
          { label: "Inactive", value: "inactive" },
          { label: "Associate", value: "associate" },
          { label: "Speaker", value: "speaker" },
        ]}
        on_change={(value) => {
          if (!value || Array.isArray(value)) return;
          publisherCollection.update(publisher_id, (draft) => {
            draft.type = value as typeof publisher.type;
          });
        }}
      />
      <Select
        label="Standing"
        value={publisher.standing}
        options={[
          { label: "Publisher", value: "publisher" },
          { label: "Unbaptised Publisher", value: "unbaptised_publisher" },
          { label: "Ministerial Servant", value: "ministerial_servant" },
          { label: "Elder", value: "elder" },
          { label: "Associate", value: "associate" },
        ]}
        on_change={(value) => {
          if (!value || Array.isArray(value)) return;
          publisherCollection.update(publisher_id, (draft) => {
            draft.standing = value as typeof publisher.standing;
          });
        }}
      />
      {publisher.archived_at && (
        <IonItem>
          <IonLabel>
            <h2>Archived</h2>
            <p>{new Date(publisher.archived_at).toLocaleDateString()}</p>
          </IonLabel>
        </IonItem>
      )}
      <IonItem>
        <ArchivePublisherButton publisher_id={publisher_id} archived_at={publisher.archived_at} />
      </IonItem>
    </IonList>
  );
}
