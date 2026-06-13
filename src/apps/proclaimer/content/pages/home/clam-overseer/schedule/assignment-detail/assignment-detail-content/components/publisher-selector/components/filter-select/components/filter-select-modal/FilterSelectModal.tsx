import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { Select } from "@ui/components/inputs/select/Select";
import { IncrementInput } from "@ui/components/inputs/increment-input/IncrementInput";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import type { PublisherFilter } from "../../../../hooks/use-publisher-filter/usePublisherFilter";
import { filterLabels } from "../../../../hooks/use-publisher-filter/usePublisherFilter";
import type { ParticipationType } from "../../../../utils/participationTypeMap";

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

const participationTypeLabels: Record<ParticipationType, string> = {
  prayer: "Prayer",
  treasures: "Treasures",
  gems: "Gems",
  bible_reading: "Bible Reading",
  apply: "Apply",
  assistant: "Assistant",
  chairman: "Chairman",
  counselor: "Counselor",
  living: "Living",
  cbs_conductor: "CBS Conductor",
  cbs_reader: "CBS Reader",
};

const participationTypes: ParticipationType[] = [
  "prayer",
  "treasures",
  "gems",
  "bible_reading",
  "apply",
  "assistant",
  "chairman",
  "counselor",
  "living",
  "cbs_conductor",
  "cbs_reader",
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
            label="Min weeks away from closest"
            value={filter.min_weeks_away_closest}
            min={0}
            on_change={(value) => on_change({ ...filter, min_weeks_away_closest: value })}
          />
          <IncrementInput
            label="Min avg weeks between"
            value={filter.min_avg_weeks_between}
            min={0}
            on_change={(value) => on_change({ ...filter, min_avg_weeks_between: value })}
          />
          <IonListHeader>
            <IonLabel>Show Assignment Types</IonLabel>
          </IonListHeader>
          {participationTypes.map((type) => (
            <ToggleInput
              key={`show-${type}`}
              label={participationTypeLabels[type]}
              checked={filter.participation_types.includes(type)}
              on_change={(checked) => {
                const current = filter.participation_types;
                const updated = checked ? [...current, type] : current.filter((t) => t !== type);
                on_change({ ...filter, participation_types: updated });
              }}
            />
          ))}
          <IonListHeader>
            <IonLabel>Include in Stats Calculation</IonLabel>
          </IonListHeader>
          {participationTypes.map((type) => (
            <ToggleInput
              key={`stats-${type}`}
              label={participationTypeLabels[type]}
              checked={filter.stat_participation_types.includes(type)}
              on_change={(checked) => {
                const current = filter.stat_participation_types;
                const updated = checked ? [...current, type] : current.filter((t) => t !== type);
                on_change({ ...filter, stat_participation_types: updated });
              }}
            />
          ))}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
