import { IonList, IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Label } from "@ui/components/display/text/label/Label";
import { Space } from "@ui/components/layout/space/Space";

export function LayoutContent() {
  return (
    <IonList>
      <Space />

      <IonItem lines="none">
        <Body>
          A blank spacer element that inserts vertical (or horizontal) whitespace between layout
          sections. Renders an aria-hidden div.
        </Body>
      </IonItem>

      <Space />

      <IonItem>
        <Heading>Props</Heading>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>size</Label>
        </IonLabel>
        <Body>
          — Amount of space. One of xs (0.5rem) | sm (1rem) | md (2.5rem) | lg (4rem) | xl (6rem) |
          2xl (8rem). Defaults to "md".
        </Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>horizontal</Label>
        </IonLabel>
        <Body>
          — When true, renders an inline-block element with the given width instead of a block
          element with the given height. Defaults to false.
        </Body>
      </IonItem>

      <Space />

      <IonItem>
        <Heading>Example</Heading>
      </IonItem>

      <IonItem lines="none">
        <Body>size="sm"</Body>
      </IonItem>
      <Space size="sm" />
      <IonItem lines="none">
        <Body>size="md" (default)</Body>
      </IonItem>
      <Space size="md" />
      <IonItem lines="none">
        <Body>size="lg"</Body>
      </IonItem>
      <Space size="lg" />
    </IonList>
  );
}
