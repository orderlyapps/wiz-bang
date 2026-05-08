import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Label } from "@ui/components/display/text/label/Label";
import { Space } from "@ui/components/layout/space/Space";
import type { ReactNode } from "react";
import type { LabelValue } from "@util/types/LabelValue";

type Props = {
  title: string;
  description: string;
  props: LabelValue[];
  children: ReactNode;
};

export function ComponentSection({ title, description, props, children }: Props) {
  return (
    <>
      <Space />

      <IonItem lines="none">
        <Heading size="xl">{title}</Heading>
      </IonItem>

      <IonItem lines="none">
        <Body>{description}</Body>
      </IonItem>

      <Space size="sm" />

      <IonItem>
        <Heading>Props</Heading>
      </IonItem>

      {props.map((prop) => (
        <IonItem key={prop.label}>
          <IonLabel>
            <Label>{prop.label}</Label>
          </IonLabel>
          <Body>{prop.value}</Body>
        </IonItem>
      ))}

      <Space size="sm" />

      <IonItem>
        <Heading>Example</Heading>
      </IonItem>

      {children}
    </>
  );
}
