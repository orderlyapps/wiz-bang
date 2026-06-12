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
import { Select } from "@ui/components/inputs/select/Select";
import type { GenderFilter } from "../../../../hooks/use-publisher-filter/usePublisherFilter";
import { filterLabels } from "../../../../hooks/use-publisher-filter/usePublisherFilter";

interface FilterSelectModalProps {
  is_open: boolean;
  filter: GenderFilter;
  on_change: (filter: GenderFilter) => void;
  on_dismiss: () => void;
}

const genderOptions = [
  { label: filterLabels.all, value: "all" },
  { label: filterLabels.male, value: "male" },
  { label: filterLabels.female, value: "female" },
];

export function FilterSelectModal({
  is_open,
  filter,
  on_change,
  on_dismiss,
}: FilterSelectModalProps) {
  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={on_dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="ion-padding">
          <Select
            label="Gender"
            value={filter}
            options={genderOptions}
            on_change={(value) => on_change(value as GenderFilter)}
          />
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
