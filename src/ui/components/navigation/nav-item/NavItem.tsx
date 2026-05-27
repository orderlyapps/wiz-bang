import { IonItem, IonLabel, IonIcon } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { chevronForward } from "ionicons/icons";

interface NavItemProps {
  label: string;
  to: string;
}

export function NavItem({ label, to }: NavItemProps) {
  return (
    <IonItem routerLink={to} detail={false} button>
      <IonLabel className="ion-margin">
        <Heading>{label}</Heading>
      </IonLabel>
      <IonIcon icon={chevronForward} slot="end" />
    </IonItem>
  );
}
