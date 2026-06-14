import { IonItem, IonLabel, IonList, IonListHeader, IonRadio, IonRadioGroup } from "@ionic/react";
import type { PublisherSortOrder } from "../../../../../../hooks/use-presets/usePresets";
import { sortOrderLabels } from "../../../../../../hooks/use-publisher-sort/types";

const sort_options: PublisherSortOrder[] = [
  "alphabetical",
  "weeks_away_closest",
  "avg_weeks_between",
];

interface SortSectionProps {
  sort_order: PublisherSortOrder;
  disabled: boolean;
  on_change: (order: PublisherSortOrder) => void;
}

export function SortSection({ sort_order, disabled, on_change }: SortSectionProps) {
  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Sort</IonLabel>
      </IonListHeader>
      <IonRadioGroup
        value={sort_order}
        onIonChange={(e) => {
          if (!disabled) on_change(e.detail.value as PublisherSortOrder);
        }}
      >
        {sort_options.map((option) => (
          <IonItem key={option} disabled={disabled}>
            <IonRadio value={option} justify="start" labelPlacement="end">
              <IonLabel>{sortOrderLabels[option]}</IonLabel>
            </IonRadio>
          </IonItem>
        ))}
      </IonRadioGroup>
    </IonList>
  );
}
