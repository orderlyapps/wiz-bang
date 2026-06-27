import { IonAlert } from "@ionic/react";
import { formatDistanceToNow, isValid } from "date-fns";
import type { DoNotCall } from "../../types";

type DoNotCallAlertProps = {
  selected: DoNotCall | null;
  onDismiss: () => void;
};

export function DoNotCallAlert({ selected, onDismiss }: DoNotCallAlertProps) {
  const address = selected
    ? `${selected.house_number}${selected.unit_number ? `/${selected.unit_number}` : ""} ${selected.street}, ${selected.suburb}`
    : "";

  const subHeader = selected?.notes || undefined;

  const addedText = selected?.created_at
    ? (() => {
        const date = new Date(selected.created_at);
        return isValid(date)
          ? `Added ${formatDistanceToNow(date, { addSuffix: true })}`
          : undefined;
      })()
    : undefined;

  return (
    <IonAlert
      isOpen={!!selected}
      header={address}
      subHeader={subHeader}
      message={addedText}
      buttons={[{ text: "OK", role: "cancel", handler: onDismiss }]}
      onDidDismiss={onDismiss}
    />
  );
}
