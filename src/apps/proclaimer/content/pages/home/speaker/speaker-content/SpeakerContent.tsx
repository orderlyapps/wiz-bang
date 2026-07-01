import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function SpeakerContent() {
  return (
    <IonList>
      <NavItem to="/home/speaker/schedule" label="Schedule" />
    </IonList>
  );
}
