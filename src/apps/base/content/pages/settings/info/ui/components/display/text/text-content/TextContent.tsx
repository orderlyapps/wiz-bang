import { BodySection } from "@base-content/pages/settings/info/ui/components/display/text/text-content/components/body-section/BodySection";
import { HeadingSection } from "@base-content/pages/settings/info/ui/components/display/text/text-content/components/heading-section/HeadingSection";
import { LabelSection } from "@base-content/pages/settings/info/ui/components/display/text/text-content/components/label-section/LabelSection";
import { IonList } from "@ionic/react";

export function TextContent() {
  return (
    <IonList>
      <BodySection />
      <HeadingSection />
      <LabelSection />
    </IonList>
  );
}
