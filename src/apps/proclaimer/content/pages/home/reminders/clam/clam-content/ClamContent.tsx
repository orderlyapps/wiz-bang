import { IonItem, IonLabel, IonList } from "@ionic/react";
import { WeekNavigation } from "@proclaimer-shared/components/navigation/week-navigation/WeekNavigation";

type ClamContentProps = {
  week_id: string;
};

export function ClamContent({ week_id }: ClamContentProps) {
  return (
    <IonList>
      <WeekNavigation week_id={week_id} />
      <IonItem>
        <IonLabel>CLAM content coming soon.</IonLabel>
      </IonItem>
    </IonList>
  );
}
