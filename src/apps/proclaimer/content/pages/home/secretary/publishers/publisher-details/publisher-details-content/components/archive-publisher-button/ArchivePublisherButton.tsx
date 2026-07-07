import { IonItem, IonLabel, useIonAlert } from "@ionic/react";
import { publisherCollection } from "@shared/database/collections/publisher";
import { Body } from "@ui/components/display/text/body/Body";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";

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
    <>
      {isArchived && (
        <IonItem className="ion-text-center">
          <IonLabel>
            <Body color="medium" size="sm" style={{ textAlign: "center" }}>
              Archived on{" "}
              {new Date(archived_at!).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Body>
          </IonLabel>
        </IonItem>
      )}
      <TextButton
        color={isArchived ? "medium" : "danger"}
        fill="clear"
        on_click={handlePress}
        label={isArchived ? "Unarchive" : "Archive"}
      />
    </>
  );
}
