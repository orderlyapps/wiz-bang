import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import type { PublisherSortOrder } from "../../../../hooks/use-publisher-sort/usePublisherSort";
import { sortOrderLabels } from "../../../../hooks/use-publisher-sort/usePublisherSort";

const sort_options: PublisherSortOrder[] = [
  "alphabetical",
  "weeks_since_last",
  "avg_weeks_between",
];

interface SortSelectModalProps {
  is_open: boolean;
  sort_order: PublisherSortOrder;
  on_change: (order: PublisherSortOrder) => void;
  on_dismiss: () => void;
}

export function SortSelectModal({
  is_open,
  sort_order,
  on_change,
  on_dismiss,
}: SortSelectModalProps) {
  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sort</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={on_dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonRadioGroup
            value={sort_order}
            onIonChange={(e) => {
              on_change(e.detail.value as PublisherSortOrder);
              on_dismiss();
            }}
          >
            {sort_options.map((option) => (
              <IonItem key={option}>
                <IonRadio value={option} justify="start" labelPlacement="end">
                  <IonLabel>{sortOrderLabels[option]}</IonLabel>
                </IonRadio>
              </IonItem>
            ))}
          </IonRadioGroup>
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
