import { IonList } from "@ionic/react";
import { BodySection } from "./components/body-section/BodySection";
import { HeadingSection } from "./components/heading-section/HeadingSection";
import { LabelSection } from "./components/label-section/LabelSection";

export function TextContent() {
  return (
    <IonList>
      <BodySection />
      <HeadingSection />
      <LabelSection />
    </IonList>
  );
}
