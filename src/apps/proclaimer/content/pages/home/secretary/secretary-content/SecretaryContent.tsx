import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function SecretaryContent() {
  return (
    <>
      <IonList>
        <NavItem label="Publishers" to="/home/secretary/publishers" />
      </IonList>
    </>
  );
}
