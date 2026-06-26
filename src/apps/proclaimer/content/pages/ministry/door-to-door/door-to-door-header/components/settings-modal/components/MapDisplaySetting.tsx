import { IonList, IonItem, IonLabel, IonRadioGroup, IonRadio } from "@ionic/react";
import {
  useMapDisplayMode,
  type MapDisplayMode,
} from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useMapDisplayModeContext";

export function MapDisplaySetting() {
  const { displayMode, updateDisplayMode } = useMapDisplayMode();

  return (
    <IonList>
      <IonItem>
        <IonLabel>
          <h2>Map Display</h2>
          <p>Choose which maps to show on the door-to-door page</p>
        </IonLabel>
      </IonItem>
      <IonRadioGroup
        value={displayMode}
        onIonChange={(e) => updateDisplayMode(e.detail.value as MapDisplayMode)}
      >
        <IonItem>
          <IonLabel>Show All Maps</IonLabel>
          <IonRadio slot="start" value="all" />
        </IonItem>
        <IonItem>
          <IonLabel>Show Selected Map Only</IonLabel>
          <IonRadio slot="start" value="selected" />
        </IonItem>
      </IonRadioGroup>
    </IonList>
  );
}
