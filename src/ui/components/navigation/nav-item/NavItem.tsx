import { IonItem, IonLabel } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Icon } from "@ui/components/icons/Icon";

interface NavItemProps {
  label: string;
  to: string;
}

export function NavItem({ label, to }: NavItemProps) {
  return (
    <IonItem routerLink={to} detail={false} button>
      <IonLabel className="ion-margin ion-text-nowrap">
        <Heading color="primary">{label}</Heading>
      </IonLabel>
      <Icon name="chevronForwardJW" slot="end" />
    </IonItem>
  );
}
