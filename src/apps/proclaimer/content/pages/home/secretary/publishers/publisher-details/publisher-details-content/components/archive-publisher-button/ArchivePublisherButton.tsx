import { IonButton, IonIcon, useIonAlert } from "@ionic/react";
import { archiveOutline, archiveSharp } from "ionicons/icons";
import { publisherCollection } from "@shared/database/collections/publisher";

export function ArchivePublisherButton({
  publisher_id,
  archived_at,
}: {
  publisher_id: string;
  archived_at: string | null | undefined;
}) {
  const [presentAlert] = useIonAlert();

  const isArchived = !!archived_at;

  const handlePress = () => {
    void presentAlert({
      header: isArchived ? "Unarchive Publisher" : "Archive Publisher",
      message: isArchived
        ? "Restore this publisher to active status?"
        : "Archive this publisher? They will no longer appear in active lists.",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: isArchived ? "Unarchive" : "Archive",
          role: "confirm",
          handler: () => {
            publisherCollection.update(publisher_id, (draft) => {
              draft.archived_at = isArchived ? null : new Date().toISOString();
            });
          },
        },
      ],
    });
  };

  return (
    <IonButton color={isArchived ? "medium" : "danger"} fill="clear" onClick={handlePress}>
      <IonIcon slot="start" ios={archiveOutline} md={archiveSharp} />
      {isArchived ? "Unarchive" : "Archive"}
    </IonButton>
  );
}
