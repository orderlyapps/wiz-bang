import { IonList } from "@ionic/react";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function SettingsContent() {
  return (
    <IonList>
      <NavItem label="Appearance" to="/settings/appearance" />
    </IonList>
  );
}
