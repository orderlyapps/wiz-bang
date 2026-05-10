import { IonItem } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { ModuleSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/shared/module-section/ModuleSection";

const items = [
  { label: "index.css", value: "Main entry point that imports all CSS modules." },
  { label: "responsive.css", value: "Responsive padding for ion-content across breakpoints." },
  { label: "safe-area.css", value: "Safe area insets for notched devices." },
  { label: "overrides/content.css", value: "Custom ion-content padding overrides." },
  { label: "overrides/modal.css", value: "Date picker modal styling." },
];

const code = `@import "./responsive.css";
@import "./safe-area.css";
@import "./overrides/content.css";
@import "./overrides/modal.css";`;

export function CssSection() {
  return (
    <ModuleSection
      title="CSS"
      path="src/util/vendor/ionic/css/"
      description="Contains Ionic CSS customizations and overrides for the application."
      items={items}
    >
      <IonItem>
        <Body>
          <strong>Source</strong>
        </Body>
      </IonItem>
      <IonItem lines="none">
        <pre
          style={{
            margin: 0,
            width: "100%",
            whiteSpace: "pre-wrap",
            fontSize: "0.8125rem",
          }}
        >
          {code}
        </pre>
      </IonItem>
    </ModuleSection>
  );
}
