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
import { IncrementInput } from "@ui/components/inputs/increment-input/IncrementInput";
import type { PublisherFilter } from "../../../../hooks/use-publisher-filter/usePublisherFilter";
import { filterLabels } from "../../../../hooks/use-publisher-filter/usePublisherFilter";

interface FilterSelectModalProps {
  is_open: boolean;
  filter: PublisherFilter;
  on_change: (filter: PublisherFilter) => void;
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
            value={filter.gender}
            options={genderOptions}
            on_change={(value) =>
              on_change({ ...filter, gender: value as PublisherFilter["gender"] })
            }
          />
          <IncrementInput
            label="Min weeks since last"
            value={filter.min_weeks_since_last}
            min={0}
            on_change={(value) => on_change({ ...filter, min_weeks_since_last: value })}
          />
          <IncrementInput
            label="Min avg weeks between"
            value={filter.min_avg_weeks_between}
            min={0}
            on_change={(value) => on_change({ ...filter, min_avg_weeks_between: value })}
          />
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
