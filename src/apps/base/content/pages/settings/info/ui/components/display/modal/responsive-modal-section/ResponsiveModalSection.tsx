import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { Body } from "@ui/components/display/text/body/Body";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { ComponentSection } from "@base-content/pages/settings/info/ui/components/shared/component-section/ComponentSection";

const props = [
  { label: "is_open", value: "— Whether the modal is open." },
  { label: "on_dismiss", value: "— Called when the modal is dismissed." },
  {
    label: "size",
    value:
      '— Tablet/desktop card size. One of "sm" (420px) | "md" (640px) | "lg" (960px). Defaults to "md". Ignored on mobile.',
  },
  {
    label: "mobile_breakpoints",
    value:
      "— Sheet stop positions on mobile, as fractions of viewport height (e.g. [0, 0.5, 1]). Defaults to [0, 1].",
  },
  {
    label: "initial_breakpoint",
    value: "— Initial sheet position on mobile. Defaults to 1 (fully expanded).",
  },
  { label: "class_name", value: "— Additional class names. Optional." },
  {
    label: "ion_modal_props",
    value: "— Escape hatch: extra props forwarded to the underlying IonModal.",
  },
];

export function ResponsiveModalSection() {
  const [open, set_open] = useState(false);
  return (
    <ComponentSection
      title="ResponsiveModal"
      description="A wrapper around IonModal that renders as a sheet on mobile (<768px) and as a centered card on tablet/desktop. Use it for any modal so it adapts to the device automatically."
      props={props}
    >
      <IonButton expand="block" onClick={() => set_open(true)}>
        Open ResponsiveModal
      </IonButton>
      <ResponsiveModal is_open={open} on_dismiss={() => set_open(false)} size="md">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Example</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <Body>
            On a phone this slides up as a sheet. On a tablet or desktop it appears as a centered
            card with the chosen size.
          </Body>
          <IonButton expand="block" onClick={() => set_open(false)} style={{ marginTop: "1rem" }}>
            Close
          </IonButton>
        </IonContent>
      </ResponsiveModal>
    </ComponentSection>
  );
}
