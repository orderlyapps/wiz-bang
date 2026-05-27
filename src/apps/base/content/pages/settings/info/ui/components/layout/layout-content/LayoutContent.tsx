import { IonAccordionGroup } from "@ionic/react";
import { PageGridSection } from "@base-content/pages/settings/info/ui/components/layout/components/page-grid-section/PageGridSection";
import { SpaceSection } from "@base-content/pages/settings/info/ui/components/layout/components/space-section/SpaceSection";

export function LayoutContent() {
  return (
    <IonAccordionGroup>
      <SpaceSection />
      <PageGridSection />
    </IonAccordionGroup>
  );
}
