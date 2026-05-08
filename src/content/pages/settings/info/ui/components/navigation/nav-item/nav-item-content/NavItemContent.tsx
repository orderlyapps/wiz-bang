import { IonList, IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Label } from "@ui/components/display/text/label/Label";
import { Space } from "@ui/components/layout/space/Space";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function NavItemContent() {
  return (
    <IonList>
      <Space />
      
      <IonItem lines="none">
        <Body>
          A tappable list item used for navigating to a child route. Renders a label on the left and
          a chevron icon on the right.
        </Body>
      </IonItem>

      <Space />

      <IonItem>
        <Heading>Props</Heading>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>label</Label>
        </IonLabel>
        <Body>— The text displayed in the list item.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>to</Label>
        </IonLabel>
        <Body>— The route path to navigate to when tapped.</Body>
      </IonItem>

      <Space />

      <IonItem>
        <Heading>Example</Heading>
      </IonItem>

      <NavItem label="Example" to="/settings" />
    </IonList>
  );
}
