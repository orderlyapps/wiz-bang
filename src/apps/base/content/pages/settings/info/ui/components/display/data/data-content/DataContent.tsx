import { LabelValueItemSection } from "@base-content/pages/settings/info/ui/components/display/data/label-value-item-section/LabelValueItemSection";
import { VerticalTextSection } from "@base-content/pages/settings/info/ui/components/display/data/vertical-text-section/VerticalTextSection";
import { IonAccordionGroup } from "@ionic/react";

export function DataContent() {
  return (
    <IonAccordionGroup>
      <LabelValueItemSection />
      <VerticalTextSection />
    </IonAccordionGroup>
  );
}
