import { IonItem } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { PageGrid } from "@ui/components/layout/page-grid/PageGrid";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  {
    label: "cols",
    value:
      "— Number of columns to display at the tablet breakpoint (>= 768px). One of 2 | 3 | 4. Defaults to 2.",
  },
  {
    label: "gap",
    value: '— Optional CSS gap value (e.g. "1.5rem"). Defaults to 1rem.',
  },
  {
    label: "className",
    value: "— Additional class names to apply to the grid container. Optional.",
  },
  {
    label: "children",
    value: "— Items to render in the grid.",
  },
];

export function PageGridSection() {
  return (
    <ComponentSection
      title="PageGrid"
      description="A responsive CSS grid that renders a single column on mobile and expands to N columns at the tablet breakpoint (>= 768px). Use it to lay out forms and dashboards so they stay readable on phones but use more horizontal space on tablets and desktops."
      props={props}
    >
      <PageGrid cols={2}>
        <IonItem>
          <Body>Cell 1</Body>
        </IonItem>
        <IonItem>
          <Body>Cell 2</Body>
        </IonItem>
        <IonItem>
          <Body>Cell 3</Body>
        </IonItem>
        <IonItem>
          <Body>Cell 4</Body>
        </IonItem>
      </PageGrid>
    </ComponentSection>
  );
}
