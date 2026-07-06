import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function PdfsContent() {
  return (
    <IonList>
      <NavItem label="CLAM" to="/home/elder/clam" />
    </IonList>
  );
}
