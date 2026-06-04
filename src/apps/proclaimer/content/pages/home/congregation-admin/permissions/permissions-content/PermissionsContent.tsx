import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function PermissionsContent() {
  return (
    <IonList>
      <NavItem label="Clean Tables" to="/home/congregation-admin/permissions/clean-tables" />
      <NavItem label="Reports" to="/home/congregation-admin/permissions/reports" />
      <NavItem label="Secretary" to="/home/congregation-admin/permissions/secretary" />
    </IonList>
  );
}
