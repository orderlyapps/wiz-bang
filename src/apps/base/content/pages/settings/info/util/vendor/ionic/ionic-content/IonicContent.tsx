import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonChip,
} from "@ionic/react";
import { folder, document, code, colorPalette, settings, informationCircle } from "ionicons/icons";

export function IonicContent() {
  return (
    <div style={{ padding: "16px" }}>
      {/* Header Section */}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            <IonIcon icon={informationCircle} style={{ marginRight: "8px" }} />
            Ionic Vendor Module Documentation
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>
            Comprehensive information about the <code>src/util/vendor/ionic</code> module, which
            serves as the centralized Ionic React configuration and utility system for the
            application.
          </p>
        </IonCardContent>
      </IonCard>

      {/* Module Structure */}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            <IonIcon icon={folder} style={{ marginRight: "8px" }} />
            Module Structure
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>
            The <code>src/util/vendor/ionic</code> module is organized into three main directories:
          </p>

          <IonList>
            <IonItem>
              <IonIcon icon={folder} color="primary" slot="start" />
              <IonLabel>
                <h3>css/</h3>
                <p>Contains Ionic CSS customizations and overrides</p>
                <div style={{ marginLeft: "16px", marginTop: "8px" }}>
                  <IonChip color="medium">
                    <IonIcon icon={document} />
                    <IonLabel>index.css</IonLabel>
                  </IonChip>
                  <IonChip color="medium">
                    <IonIcon icon={document} />
                    <IonLabel>overrides/content.css</IonLabel>
                  </IonChip>
                </div>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={folder} color="secondary" slot="start" />
              <IonLabel>
                <h3>helper/</h3>
                <p>Contains initialization and setup utilities</p>
                <div style={{ marginLeft: "16px", marginTop: "8px" }}>
                  <IonChip color="medium">
                    <IonIcon icon={code} />
                    <IonLabel>ionic-init.ts</IonLabel>
                  </IonChip>
                </div>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={folder} color="tertiary" slot="start" />
              <IonLabel>
                <h3>types/</h3>
                <p>Contains TypeScript type definitions</p>
                <div style={{ marginLeft: "16px", marginTop: "8px" }}>
                  <IonChip color="medium">
                    <IonIcon icon={code} />
                    <IonLabel>IonicColor.ts</IonLabel>
                  </IonChip>
                </div>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>

      {/* Key Features */}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            <IonIcon icon={settings} style={{ marginRight: "8px" }} />
            Key Features
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ color: "var(--ion-color-primary)", marginBottom: "8px" }}>
              <IonIcon icon={document} /> CSS Customizations
            </h4>
            <ul style={{ marginLeft: "16px" }}>
              <li>Custom bottom padding for ion-content elements (15rem default)</li>
              <li>
                Utility class <code>.remove-bottom-padding</code> to override default padding
              </li>
              <li>Centralized CSS import system for maintainability</li>
            </ul>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ color: "var(--ion-color-secondary)", marginBottom: "8px" }}>
              <IonIcon icon={code} /> Ionic React Setup
            </h4>
            <ul style={{ marginLeft: "16px" }}>
              <li>Automatic setupIonicReact() initialization</li>
              <li>Core Ionic CSS imports for proper component functionality</li>
              <li>Utility CSS imports (padding, flex, display, etc.)</li>
              <li>Dark theme palette support</li>
            </ul>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ color: "var(--ion-color-tertiary)", marginBottom: "8px" }}>
              <IonIcon icon={colorPalette} /> Type Safety
            </h4>
            <ul style={{ marginLeft: "16px" }}>
              <li>Comprehensive IonicColor type definition</li>
              <li>Support for all standard Ionic color variants</li>
            </ul>
          </div>
        </IonCardContent>
      </IonCard>

      {/* Usage Examples */}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            <IonIcon icon={code} style={{ marginRight: "8px" }} />
            Usage Examples
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div style={{ marginBottom: "16px" }}>
            <h4>CSS Overrides</h4>
            <pre
              style={{
                backgroundColor: "var(--ion-color-light)",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                overflow: "auto",
              }}
            >
              {`ion-content {
  --padding-bottom: 15rem;
}

ion-content.remove-bottom-padding {
  --padding-bottom: 0;
}`}
            </pre>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <h4>Type Usage</h4>
            <pre
              style={{
                backgroundColor: "var(--ion-color-light)",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                overflow: "auto",
              }}
            >
              {`import { IonicColor } from '@/util/vendor/ionic/types/IonicColor';

const buttonColor: IonicColor = 'primary';
const alertColor: IonicColor = 'danger';`}
            </pre>
          </div>

          <div>
            <h4>Initialization</h4>
            <p>
              The module is automatically initialized when imported, setting up: Ionic React
              framework, Core CSS dependencies, Dark theme support, and Utility CSS classes.
            </p>
          </div>
        </IonCardContent>
      </IonCard>

      {/* Integration Points */}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            <IonIcon icon={settings} style={{ marginRight: "8px" }} />
            Integration Points
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>This module integrates with:</p>
          <ul style={{ marginLeft: "16px" }}>
            <li>Ionic React components throughout the application</li>
            <li>Theme system for consistent styling</li>
            <li>Type system for color management</li>
            <li>CSS architecture for responsive design</li>
          </ul>
        </IonCardContent>
      </IonCard>

      {/* Maintenance Notes */}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            <IonIcon icon={informationCircle} style={{ marginRight: "8px" }} />
            Maintenance Notes
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <ul style={{ marginLeft: "16px" }}>
            <li>
              All Ionic-related CSS customizations should be placed in the css/overrides directory
            </li>
            <li>New Ionic utility types should be added to the types/ directory</li>
            <li>The initialization file should be imported early in the application bootstrap</li>
            <li>Color type updates should be synchronized with Ionic framework updates</li>
          </ul>
        </IonCardContent>
      </IonCard>
    </div>
  );
}
