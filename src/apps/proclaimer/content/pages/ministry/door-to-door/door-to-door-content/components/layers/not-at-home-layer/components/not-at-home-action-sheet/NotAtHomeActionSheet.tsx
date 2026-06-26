import { IonActionSheet } from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { notAtHomeCollection } from "@shared/database/collections/not-at-home";
import type { NotAtHome } from "@shared/database/schemas/not-at-home";

type NotAtHomeActionSheetProps = {
  id: string;
  is_open: boolean;
  on_dismiss: () => void;
};

export function NotAtHomeActionSheet({ id, is_open, on_dismiss }: NotAtHomeActionSheetProps) {
  const { data } = useLiveQuery((q) =>
    q.from({ nah: notAtHomeCollection }).where(({ nah }) => eq(nah.id, id)),
  );
  const record = data?.[0] as NotAtHome | undefined;
  const write = record?.write ?? false;

  function handleToggleWrite() {
    notAtHomeCollection.update(id, (draft) => {
      draft.write = !draft.write;
    });
  }

  function handleDelete() {
    notAtHomeCollection.delete(id);
  }

  return (
    <IonActionSheet
      isOpen={is_open}
      header="Not At Home"
      buttons={[
        {
          text: write ? "Mark as Return" : "Mark as Letter",
          icon: createOutline,
          handler: handleToggleWrite,
        },
        {
          text: "Delete",
          role: "destructive",
          icon: trashOutline,
          handler: handleDelete,
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: on_dismiss,
        },
      ]}
      onDidDismiss={on_dismiss}
    />
  );
}
