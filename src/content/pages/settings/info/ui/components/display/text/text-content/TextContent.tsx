import { IonList, IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Label } from "@ui/components/display/text/label/Label";
import { Space } from "@ui/components/layout/space/Space";

export function TextContent() {
  return (
    <IonList>
      <Space />

      <IonItem lines="none">
        <Heading size="xl">Body</Heading>
      </IonItem>

      <IonItem lines="none">
        <Body>
          A general-purpose inline text component built on IonText. Supports configurable size,
          color, weight, and style.
        </Body>
      </IonItem>

      <Space size="sm" />

      <IonItem>
        <Heading>Props</Heading>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>children</Label>
        </IonLabel>
        <Body>— The text content to display.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>color</Label>
        </IonLabel>
        <Body>— Ionic color token (e.g. "primary", "danger"). Optional.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>size</Label>
        </IonLabel>
        <Body>— Font size. One of xs | sm | md | lg | xl | 2xl. Defaults to "md".</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>bold</Label>
        </IonLabel>
        <Body>— Whether to render bold text. Defaults to false.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>italic</Label>
        </IonLabel>
        <Body>— Whether to render italic text. Defaults to false.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>className</Label>
        </IonLabel>
        <Body>— Additional CSS class names. Optional.</Body>
      </IonItem>

      <Space size="sm" />

      <IonItem>
        <Heading>Example</Heading>
      </IonItem>

      <IonItem lines="none">
        <Body size="sm" color="medium">
          Small medium body
        </Body>
      </IonItem>
      <IonItem lines="none">
        <Body bold>Bold body</Body>
      </IonItem>
      <IonItem lines="none">
        <Body italic color="primary">
          Italic primary body
        </Body>
      </IonItem>

      <Space />

      <IonItem lines="none">
        <Heading size="xl">Heading</Heading>
      </IonItem>

      <IonItem lines="none">
        <Body>
          A styled variant of Body for section headings. Defaults to size "lg" and bold text.
        </Body>
      </IonItem>

      <Space size="sm" />

      <IonItem>
        <Heading>Props</Heading>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>children</Label>
        </IonLabel>
        <Body>— The heading text content.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>color</Label>
        </IonLabel>
        <Body>— Ionic color token. Optional.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>size</Label>
        </IonLabel>
        <Body>— Font size. One of xs | sm | md | lg | xl | 2xl. Defaults to "lg".</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>bold</Label>
        </IonLabel>
        <Body>— Whether to render bold text. Defaults to true.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>italic</Label>
        </IonLabel>
        <Body>— Whether to render italic text. Defaults to false.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>className</Label>
        </IonLabel>
        <Body>— Additional CSS class names. Optional.</Body>
      </IonItem>

      <Space size="sm" />

      <IonItem>
        <Heading>Example</Heading>
      </IonItem>

      <IonItem lines="none">
        <Heading>Default heading</Heading>
      </IonItem>
      <IonItem lines="none">
        <Heading size="xl" color="warning">
          XL warning heading
        </Heading>
      </IonItem>

      <Space />

      <IonItem lines="none">
        <Heading size="xl">Label</Heading>
      </IonItem>

      <IonItem lines="none">
        <Body>
          A styled variant of Body for field labels and captions. Defaults to size "sm" and bold
          text.
        </Body>
      </IonItem>

      <Space size="sm" />

      <IonItem>
        <Heading>Props</Heading>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>children</Label>
        </IonLabel>
        <Body>— The label text content.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>color</Label>
        </IonLabel>
        <Body>— Ionic color token. Optional.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>size</Label>
        </IonLabel>
        <Body>— Font size. One of xs | sm | md | lg | xl | 2xl. Defaults to "sm".</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>bold</Label>
        </IonLabel>
        <Body>— Whether to render bold text. Defaults to true.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>italic</Label>
        </IonLabel>
        <Body>— Whether to render italic text. Defaults to false.</Body>
      </IonItem>

      <IonItem>
        <IonLabel>
          <Label>className</Label>
        </IonLabel>
        <Body>— Additional CSS class names. Optional.</Body>
      </IonItem>

      <Space size="sm" />

      <IonItem>
        <Heading>Example</Heading>
      </IonItem>

      <IonItem lines="none">
        <IonLabel>
          <Label>Field label</Label>
        </IonLabel>
        <Body>— Some value</Body>
      </IonItem>

      <Space />
    </IonList>
  );
}
