import { IonLabel, IonList, IonListHeader } from "@ionic/react";
import { Select } from "@ui/components/inputs/select/Select";
import { IncrementInput } from "@ui/components/inputs/increment-input/IncrementInput";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import type { PublisherFilter } from "../../../../../../hooks/use-presets/usePresets";
import { filterLabels } from "../../../../../../hooks/use-publisher-filter/usePublisherFilter";
import type { ParticipationType } from "../../../../../../utils/participationTypeMap";

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

interface FilterSectionProps {
  filter: PublisherFilter;
  disabled: boolean;
  on_change: (filter: PublisherFilter) => void;
}

export function FilterSection({ filter, disabled, on_change }: FilterSectionProps) {
  return (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>Filter</IonLabel>
        </IonListHeader>
        <Select
          label="Gender"
          value={filter.gender}
          options={genderOptions}
          on_change={(value) =>
            on_change({ ...filter, gender: value as PublisherFilter["gender"] })
          }
          disabled={disabled}
        />
        <IncrementInput
          label="Min weeks away from closest"
          value={filter.min_weeks_away_closest}
          min={0}
          on_change={(value) => on_change({ ...filter, min_weeks_away_closest: value })}
          disabled={disabled}
        />
        <IncrementInput
          label="Min avg weeks between"
          value={filter.min_avg_weeks_between}
          min={0}
          on_change={(value) => on_change({ ...filter, min_avg_weeks_between: value })}
          disabled={disabled}
        />
      </IonList>
      <IonList>
        <IonListHeader>
          <IonLabel>Show Assignment Types</IonLabel>
        </IonListHeader>
        {participationTypes.map((type) => (
          <ToggleInput
            key={`show-${type}`}
            label={participationTypeLabels[type]}
            checked={filter.participation_types.includes(type)}
            disabled={disabled}
            on_change={(checked) => {
              const current = filter.participation_types;
              const updated = checked ? [...current, type] : current.filter((t) => t !== type);
              on_change({ ...filter, participation_types: updated });
            }}
          />
        ))}
      </IonList>
      <IonList>
        <IonListHeader>
          <IonLabel>Include in Stats Calculation</IonLabel>
        </IonListHeader>
        {participationTypes.map((type) => (
          <ToggleInput
            key={`stats-${type}`}
            label={participationTypeLabels[type]}
            checked={filter.stat_participation_types.includes(type)}
            disabled={disabled}
            on_change={(checked) => {
              const current = filter.stat_participation_types;
              const updated = checked ? [...current, type] : current.filter((t) => t !== type);
              on_change({ ...filter, stat_participation_types: updated });
            }}
          />
        ))}
      </IonList>
    </>
  );
}
