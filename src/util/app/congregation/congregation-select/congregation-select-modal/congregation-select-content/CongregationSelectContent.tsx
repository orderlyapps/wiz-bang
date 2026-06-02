import { IonItem, IonLabel, IonList, IonIcon } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { useLiveQuery, isNull } from "@tanstack/react-db";
import { congregationCollection } from "@shared/database/collections/congregation";
import type { Congregation } from "@shared/database/schemas/congregation";
import { setStoredCongregation } from "@util/app/congregation/utils";

interface CongregationSelectContentProps {
  onSelect?: () => void;
  selectedId?: string | null;
}

export function CongregationSelectContent({
  onSelect,
  selectedId,
}: CongregationSelectContentProps) {
  const { data, isLoading } = useLiveQuery((q) =>
    q
      .from({ c: congregationCollection })
      .where(({ c }) => isNull(c.congregation_id))
      .orderBy(({ c }) => c.name),
  );

  const handleSelect = (congregation: Congregation) => {
    setStoredCongregation(congregation);
    onSelect?.();
  };

  if (isLoading) {
    return (
      <IonList>
        {[1, 2, 3].map((i) => (
          <IonItem key={i}>
            <IonLabel>
              <div style={{ height: "1.25rem", background: "var(--ion-color-light)" }} />
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    );
  }

  if (!data || data.length === 0) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>No congregations available.</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <IonList>
      <MultiColumnList<Congregation>
        items={data}
        get_id={(c) => c.id ?? ""}
        gap="sm"
        render_item={(c) => {
          const isSelected = selectedId === c.id;
          return (
            <IonItem onClick={() => handleSelect(c)}>
              <IonLabel className="ion-margin-start ion-padding-start">{c.name}</IonLabel>
              {isSelected && <IonIcon icon={checkmark} slot="end" color="primary" />}
            </IonItem>
          );
        }}
      />
    </IonList>
  );
}
