import { IonItem, IonLabel, IonIcon } from "@ionic/react";
import { chevronForward } from "ionicons/icons";

interface NavItemProps {
  label: string;
  to: string;
}

export function NavItem({ label, to }: NavItemProps) {
  return (
    <IonItem routerLink={to} detail={false}>
      <IonLabel>{label}</IonLabel>
      <IonIcon icon={chevronForward} slot="end" />
    </IonItem>
  );
}
