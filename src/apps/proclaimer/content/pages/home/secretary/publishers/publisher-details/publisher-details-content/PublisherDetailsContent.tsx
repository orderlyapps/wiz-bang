import { IonContent, IonList, IonItem, IonLabel } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { ArchivePublisherButton } from "./components/archive-publisher-button/ArchivePublisherButton";
import { EditNameButton } from "./components/edit-name-button/EditNameButton";
import { Select } from "@ui/components/inputs/select/Select";

export function PublisherDetailsContent({ publisher_id }: { publisher_id: string }) {
  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisher_id)),
  );

  const publisher = data?.[0];

  if (isLoading) {
    return (
      <IonContent>
        <Spinner />
      </IonContent>
    );
  }

  if (!publisher) {
    return (
      <IonContent>
        <div className="ion-padding ion-text-center">
          <Body color="medium">Publisher not found.</Body>
        </div>
      </IonContent>
    );
  }

  return (
    <IonContent>
      <IonList>
        {publisher.display_name && (
          <IonItem>
            <IonLabel>
              <h2>Goes By</h2>
              <p>{publisher.display_name}</p>
            </IonLabel>
          </IonItem>
        )}
        <IonItem>
          <IonLabel>
            <h2>First Name</h2>
            <p>{publisher.first_name}</p>
          </IonLabel>
        </IonItem>
        {publisher.middle_name && (
          <IonItem>
            <IonLabel>
              <h2>Middle Name</h2>
              <p>{publisher.middle_name}</p>
            </IonLabel>
          </IonItem>
        )}
        <IonItem>
          <IonLabel>
            <h2>Last Name</h2>
            <p>{publisher.last_name}</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <EditNameButton
            publisher_id={publisher_id}
            first_name={publisher.first_name}
            middle_name={publisher.middle_name}
            last_name={publisher.last_name}
            display_name={publisher.display_name}
          />
        </IonItem>
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
            { label: "Inactive", value: "inactive" },
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
    </IonContent>
  );
}
