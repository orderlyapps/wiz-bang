import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function ElderContent() {
  return (
    <IonList>
      <NavItem label="Contacts List" to="/home/elder/contacts-list" />
      <NavItem label="PDFs" to="/home/elder/pdfs" />
    </IonList>
  );
}
