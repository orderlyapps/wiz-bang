import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function ClamOverseerContent() {
  return (
    <IonList>
      <NavItem label="Participation" to="/home/clam-overseer/participation" />
    </IonList>
  );
}
