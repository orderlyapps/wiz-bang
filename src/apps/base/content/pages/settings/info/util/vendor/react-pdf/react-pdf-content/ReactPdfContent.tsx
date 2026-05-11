import { IonAccordionGroup, IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { ExampleSection } from "@base-content/pages/settings/info/util/vendor/react-pdf/react-pdf-content/components/example-section/ExampleSection";
import { UsageSection } from "@base-content/pages/settings/info/util/vendor/react-pdf/react-pdf-content/components/usage-section/UsageSection";

export function ReactPdfContent() {
  return (
    <>
      <IonItem lines="none">
        <IonLabel>
          <Body>
            The <code>src/util/vendor/react-pdf</code> module provides the <code>PdfViewer</code>{" "}
            component for rendering and previewing PDF documents built with{" "}
            <code>@react-pdf/renderer</code>.
          </Body>
        </IonLabel>
      </IonItem>

      <Space size="md" />

      <IonAccordionGroup>
        <UsageSection />
        <ExampleSection />
      </IonAccordionGroup>
    </>
  );
}
