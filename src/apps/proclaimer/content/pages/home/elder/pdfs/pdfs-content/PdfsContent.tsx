import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function PdfsContent() {
  return (
    <IonList>
      <NavItem label="Contacts List" to="/home/elder/contacts-list" />
      <NavItem label="CLAM" to="/home/elder/clam" />
      <NavItem label="Audio Video" to="/home/elder/audio-video" />
      <NavItem label="Cleaning" to="/home/elder/cleaning-schedule" />
      <NavItem label="Groups" to="/home/elder/pdfs/groups" />
    </IonList>
  );
}
