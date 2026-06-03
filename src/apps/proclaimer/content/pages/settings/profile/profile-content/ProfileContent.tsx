import { IonList } from "@ionic/react";
import { PublisherSelect } from "./components/publisher-select/PublisherSelect";

export function ProfileContent() {
  return (
    <IonList inset lines="none">
      <PublisherSelect />
    </IonList>
  );
}
